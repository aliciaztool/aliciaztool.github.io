const STORAGE_KEY_PREFIX = 'artale_skill_sim_v2_';
const STORAGE_KEY_LAST_STATE = 'artale_skill_sim_last_state';
const STORAGE_KEY_SAVED_BUILDS = 'artale_skill_sim_saved_builds_v1';

const mergedByVersion = {
  v2: getMergedProfessionsData('v2'),
  v1: getMergedProfessionsData('v1')
};

const state = {
  slug: 'hero',
  version: 'v2', // 'v2' | 'v1'
  view: 'sim', // 'sim' | 'patch'
  showDeleted: true,
  level: 200,
  skillLevels: {}, // { [skillId]: number }
  expandedDescSkills: new Set(),
  patchFilter: 'all', // 'all' | 'new' | 'rename' | 'adjust' | 'deleted'
  patchSearch: '',
  panelSelectedLevels: {}, // { [panelKey]: number }
  activeBuildGuide: null // { name, level, description, priority, applied }
};


let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toastBanner');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add('hidden');
  }, 2800);
}

function getMetaBySlug(slug) {
  return PROFESSION_META.find(m => m.slug === slug) || PROFESSION_META[0];
}

function resolveMetaFromParam(param) {
  if (!param) return null;
  const lower = param.toLowerCase();
  return PROFESSION_META.find(m =>
    m.slug === lower ||
    m.enKey === lower ||
    m.profKey.toLowerCase() === lower ||
    m.shortName === param
  ) || null;
}

function getCurrentProfData() {
  const meta = getMetaBySlug(state.slug);
  return mergedByVersion[state.version][meta.profKey];
}

function calculateTotalSp(profData, level) {
  const startLv = profData.startingLevelForSp || 10;
  if (level < startLv) return 0;

  let total = (level - startLv) * 3;
  const bonuses = profData.jobAdvancementSpBonuses || [];
  if (Array.isArray(bonuses)) {
    for (const bonusLevel of bonuses) {
      if (level >= bonusLevel) {
        total += bonusLevel === 120 ? 3 : 1;
      }
    }
  } else {
    for (const [advLvStr, bonus] of Object.entries(bonuses)) {
      if (level >= Number(advLvStr)) {
        total += bonus;
      }
    }
  }
  return total;
}

function getAllSkillsList(profData) {
  const out = [];
  for (const stageKey of profData.jobStagesOrder) {
    for (const s of (profData.skills[stageKey] || [])) {
      out.push({ stageKey, skill: s });
    }
  }
  return out;
}

function getStageSpentSp(profData, stageKey) {
  return (profData.skills[stageKey] || []).reduce((sum, s) => sum + (state.skillLevels[s.id] || 0), 0);
}

function getTotalSpentSp(profData) {
  return profData.jobStagesOrder.reduce((sum, st) => sum + getStageSpentSp(profData, st), 0);
}

function checkSkillConditions(profData, skill, stageKey) {
  if (state.version === 'v2' && skill.v2Status === 'deleted') {
    return { ok: false, reason: 'V2 已移除此技能' };
  }
  if (state.level < (skill.requiredLevel || 1)) {
    return { ok: false, reason: `需角色 Lv.${skill.requiredLevel}` };
  }
  for (const [reqId, reqLv] of Object.entries(skill.preRequisite || {})) {
    if ((state.skillLevels[reqId] || 0) < reqLv) {
      const reqSkill = getAllSkillsList(profData).find(x => x.skill.id === reqId)?.skill;
      return { ok: false, reason: `需先點 ${reqSkill ? reqSkill.name : reqId} Lv.${reqLv}` };
    }
  }
  const stageIdx = profData.jobStagesOrder.indexOf(stageKey);
  const s1 = getStageSpentSp(profData, profData.jobStagesOrder[1] || '');
  const s2 = getStageSpentSp(profData, profData.jobStagesOrder[2] || '');
  const s3 = getStageSpentSp(profData, profData.jobStagesOrder[3] || '');
  if (stageIdx === 2 && s1 < (profData.spRequiredFor2ndJob || 0)) {
    return { ok: false, reason: `1轉需先配置 ${profData.spRequiredFor2ndJob} 點（目前 ${s1}）` };
  }
  if (stageIdx === 3 && (s1 + s2) < (profData.spRequiredFor3rdJob || 0)) {
    return { ok: false, reason: `1+2轉需先配置 ${profData.spRequiredFor3rdJob} 點（目前 ${s1 + s2}）` };
  }
  if (stageIdx === 4 && (s1 + s2 + s3) < (profData.spRequiredFor4thJob || 0)) {
    return { ok: false, reason: `1~3轉需先配置 ${profData.spRequiredFor4thJob} 點（目前 ${s1 + s2 + s3}）` };
  }
  return { ok: true, reason: '' };
}

function getSkillStorageKey() {
  return `${STORAGE_KEY_PREFIX}${state.version}_${state.slug}`;
}

function saveCurrentBuildToStorage() {
  try {
    localStorage.setItem(getSkillStorageKey(), JSON.stringify({
      level: state.level,
      skillLevels: state.skillLevels
    }));
    localStorage.setItem(STORAGE_KEY_LAST_STATE, JSON.stringify({
      slug: state.slug,
      version: state.version,
      view: state.view
    }));
  } catch (_) {}
}

function loadBuildFromStorage(preserveEmpty = false) {
  const profData = getCurrentProfData();
  const fresh = {};
  for (const { skill } of getAllSkillsList(profData)) {
    fresh[skill.id] = 0;
  }
  state.skillLevels = fresh;
  if (preserveEmpty) return;

  try {
    const raw = localStorage.getItem(getSkillStorageKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.level && parsed.level >= 1 && parsed.level <= 200) {
        state.level = parsed.level;
      }
      if (parsed.skillLevels && typeof parsed.skillLevels === 'object') {
        for (const { skill } of getAllSkillsList(profData)) {
          const lv = Number(parsed.skillLevels[skill.id] || 0);
          if (lv > 0 && !(state.version === 'v2' && skill.v2Status === 'deleted')) {
            state.skillLevels[skill.id] = Math.min(skill.maxLevel, Math.max(0, lv));
          }
        }
      }
    }
  } catch (_) {}
}

function syncUrlParams() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('prof', state.slug);
    url.searchParams.set('ver', state.version);
    if (state.view === 'patch') {
      url.searchParams.set('view', 'patch');
    } else {
      url.searchParams.delete('view');
    }
    url.searchParams.delete('lvl');
    url.searchParams.delete('skills');
    window.history.replaceState({}, '', url.toString());
  } catch (_) {}
}

function canReduceSkillTo(profData, skillId, targetLv) {
  const oldLv = state.skillLevels[skillId] || 0;
  if (targetLv >= oldLv) return { ok: true };
  state.skillLevels[skillId] = targetLv;

  for (const { stageKey, skill } of getAllSkillsList(profData)) {
    if ((state.skillLevels[skill.id] || 0) <= 0 || skill.id === skillId) continue;
    // 直接前置檢查
    if (skill.preRequisite && Object.prototype.hasOwnProperty.call(skill.preRequisite, skillId)) {
      if (targetLv < skill.preRequisite[skillId]) {
        state.skillLevels[skillId] = oldLv;
        return { ok: false, reason: `「${skill.name}」需要此技能 Lv.${skill.preRequisite[skillId]}` };
      }
    }
    // 轉職 SP 門檻檢查
    const stageIdx = profData.jobStagesOrder.indexOf(stageKey);
    const s1 = getStageSpentSp(profData, profData.jobStagesOrder[1] || '');
    const s2 = getStageSpentSp(profData, profData.jobStagesOrder[2] || '');
    const s3 = getStageSpentSp(profData, profData.jobStagesOrder[3] || '');
    if (stageIdx === 2 && s1 < (profData.spRequiredFor2ndJob || 0)) {
      state.skillLevels[skillId] = oldLv;
      return { ok: false, reason: `2轉技能已配點，1轉總點數不可低於 ${profData.spRequiredFor2ndJob}` };
    }
    if (stageIdx === 3 && (s1 + s2) < (profData.spRequiredFor3rdJob || 0)) {
      state.skillLevels[skillId] = oldLv;
      return { ok: false, reason: `3轉技能已配點，1+2轉總點數不可低於 ${profData.spRequiredFor3rdJob}` };
    }
    if (stageIdx === 4 && (s1 + s2 + s3) < (profData.spRequiredFor4thJob || 0)) {
      state.skillLevels[skillId] = oldLv;
      return { ok: false, reason: `4轉技能已配點，1~3轉總點數不可低於 ${profData.spRequiredFor4thJob}` };
    }
  }
  state.skillLevels[skillId] = oldLv;
  return { ok: true };
}

function setSkillLevelSafe(skillId, requestedLv) {
  const profData = getCurrentProfData();
  const entry = getAllSkillsList(profData).find(x => x.skill.id === skillId);
  if (!entry) return;
  const { skill, stageKey } = entry;
  const clamped = Math.max(0, Math.min(skill.maxLevel, Math.floor(Number(requestedLv) || 0)));
  const currentLv = state.skillLevels[skillId] || 0;
  if (clamped === currentLv) return;

  if (clamped > currentLv) {
    const cond = checkSkillConditions(profData, skill, stageKey);
    if (!cond.ok) {
      showToast(cond.reason);
      return;
    }
    const remainingSp = calculateTotalSp(profData, state.level) - getTotalSpentSp(profData);
    const add = Math.min(clamped - currentLv, remainingSp);
    if (add <= 0) {
      showToast('可用 SP 點數不足，請先提升角色等級或減少其他技能點數');
      return;
    }
    state.skillLevels[skillId] = currentLv + add;
  } else {
    const check = canReduceSkillTo(profData, skillId, clamped);
    if (!check.ok) {
      showToast(check.reason);
      return;
    }
    state.skillLevels[skillId] = clamped;
  }
  saveCurrentBuildToStorage();
  renderSimulatorView();
}

function getStatusBadgeHtml(skill) {
  if (!skill.v2Status) return '';
  if (skill.v2Status === 'cygnus') {
    return `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">👑 皇家新職</span>`;
  }
  if (skill.v2Status === 'new') {
    return `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🆕 V2新增</span>`;
  }
  if (skill.v2Status === 'deleted') {
    return `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">❌ V2移除</span>`;
  }
  if (skill.v2Status === 'reworked') {
    const label = skill.v2Patch && skill.v2Patch.oldName ? '✏️ 名稱變更' : '⚡ V2重製';
    return `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/40">${label}</span>`;
  }
  return `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">⚡ V2調整</span>`;
}

function renderProfessionSelector() {
  const container = document.getElementById('professionGroupsGrid');
  const groups = ['劍士', '法師', '弓箭手', '盜賊', '海盜', '皇家騎士團'];
  const mergedV2 = mergedByVersion.v2;

  container.innerHTML = groups.map(groupName => {
    const isCygnus = groupName === '皇家騎士團';
    const members = PROFESSION_META.filter(m => m.group === groupName);
    const buttonsHtml = members.map(m => {
      const isActive = state.slug === m.slug;
      const profV2 = mergedV2[m.profKey];
      const emblem = profV2?.emblemUrl || '';
      const jobColor = m.color || profV2?.themeColor || '#d98a1f';
      return `
        <button type="button" data-select-prof="${escapeHtml(m.slug)}" data-active="${isActive ? 'true' : 'false'}" style="--job-color: ${escapeHtml(jobColor)}" class="prof-tile relative overflow-hidden w-full min-h-[54px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-[var(--border)] text-left transition">
          <img src="${escapeHtml(emblem)}" alt="" width="112" height="54" loading="lazy" onerror="this.src='${FALLBACK_ICON_SVG}'" class="prof-tile-img absolute right-0 top-0 h-full w-24 sm:w-28 object-cover object-right pointer-events-none select-none" />
          <span aria-hidden="true" class="prof-tile-scrim absolute inset-0 pointer-events-none"></span>
          <span class="relative z-10 text-xs font-bold leading-tight text-white drop-shadow truncate max-w-[64%]">${escapeHtml(m.shortName)}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="bg-[var(--background)]/60 border ${isCygnus ? 'border-purple-500/35' : 'border-[var(--border)]'} rounded-xl p-2.5 space-y-1.5">
        <div class="text-[11px] font-bold px-1 ${isCygnus ? 'text-purple-300' : 'text-[var(--muted-foreground)]'}">${isCygnus ? '👑 ' : ''}${escapeHtml(groupName)}</div>
        <div class="space-y-1.5">${buttonsHtml}</div>
      </div>
    `;
  }).join('');
}

function renderSimulatorView() {
  const meta = getMetaBySlug(state.slug);
  const profData = getCurrentProfData();

  document.getElementById('currentProfTitle').textContent = meta.profKey;
  const emblemEl = document.getElementById('currentProfEmblem');
  emblemEl.src = profData.emblemUrl || FALLBACK_ICON_SVG;
  emblemEl.style.setProperty('--job-color', meta.color || profData.themeColor || '#d98a1f');
  emblemEl.onerror = () => { emblemEl.src = FALLBACK_ICON_SVG; };

  const verBadge = document.getElementById('currentVersionBadge');
  const btnV2 = document.getElementById('btnVerV2');
  const btnV1 = document.getElementById('btnVerV1');
  if (state.version === 'v2') {
    verBadge.textContent = '⚡ V2 平衡改版後（最新技能樹）';
    verBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    btnV2.className = 'px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/25 text-emerald-200 border border-emerald-500/40 transition';
    btnV1.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition';
  } else {
    verBadge.textContent = '🕰️ V1 改版前（舊版對照）';
    verBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-slate-700/60 text-slate-200 border border-slate-600';
    btnV1.className = 'px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/25 text-amber-200 border border-amber-500/40 transition';
    btnV2.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition';
  }

  document.getElementById('charLevelInput').value = state.level;
  document.getElementById('charLevelRange').value = state.level;
  document.getElementById('toggleShowDeleted').checked = state.showDeleted;

  const totalSp = calculateTotalSp(profData, state.level);
  const spentSp = getTotalSpentSp(profData);
  const remainingSp = totalSp - spentSp;

  document.getElementById('totalSpVal').textContent = totalSp;
  document.getElementById('spentSpVal').textContent = spentSp;
  const remEl = document.getElementById('remainingSpVal');
  remEl.textContent = remainingSp;
  remEl.className = `text-lg font-bold tabular-nums ${remainingSp < 0 ? 'text-rose-400' : 'text-emerald-400'}`;

  const floatingSpEl = document.getElementById('floatingSpBadge');
  if (floatingSpEl) {
    const remCls = remainingSp < 0 ? 'text-rose-400' : 'text-emerald-400';
    floatingSpEl.classList.toggle('border-rose-500/45', remainingSp < 0);
    floatingSpEl.classList.toggle('border-[var(--border)]', remainingSp >= 0);
    floatingSpEl.innerHTML = `<span>Lv.${state.level}</span><span class="text-[var(--muted-foreground)]">｜</span><span>已用 <strong class="text-sky-300">${spentSp}</strong> / ${totalSp}</span><span class="text-[var(--muted-foreground)]">｜</span><span>剩餘 SP：<strong class="${remCls}">${remainingSp}</strong></span>`;
  }
  updateFloatingDockVisibility();

  // Saved user builds dropdown (empty by default until user saves or imports)
  const buildSelect = document.getElementById('recommendedBuildSelect');
  const prevSelectVal = buildSelect.value;
  const builds = getSavedBuildsForSlug(meta.slug);
  if (builds.length === 0) {
    buildSelect.innerHTML = '<option value="">— 尚無已儲存配點 —</option>';
    buildSelect.value = '';
  } else {
    buildSelect.innerHTML = '<option value="">— 選擇已儲存的配點（' + builds.length + '）—</option>' +
      builds.map(b => {
        const verBadge = b.version === 'v1' ? 'V1' : 'V2';
        return `<option value="${escapeHtml(b.id)}">${escapeHtml(b.name)}（Lv.${escapeHtml(b.level || 200)}・${verBadge}）</option>`;
      }).join('');
    if (prevSelectVal && builds.some(b => b.id === prevSelectVal)) {
      buildSelect.value = prevSelectVal;
    }
  }
  const hasSelectedBuild = Boolean(buildSelect.value);
  const applyBtn = document.getElementById('btnApplyBuild');
  const delBtn = document.getElementById('btnDeleteSavedBuild');
  if (applyBtn) applyBtn.disabled = !hasSelectedBuild;
  if (delBtn) delBtn.disabled = !hasSelectedBuild;
  renderRecommendedBuildGuideBox();

  // Job advancement SP thresholds
  const stages = profData.jobStagesOrder;
  const s1 = getStageSpentSp(profData, stages[1] || '');
  const s2 = getStageSpentSp(profData, stages[2] || '');
  const s3 = getStageSpentSp(profData, stages[3] || '');
  const req2 = profData.spRequiredFor2ndJob || 61;
  const req3 = profData.spRequiredFor3rdJob || 182;
  const req4 = profData.spRequiredFor4thJob || 333;
  const spThresholdState = { s1, s2, s3, req2, req3, req4 };

  const thresholdItems = [
    { label: `1轉已點 (開啟2轉門檻 ${req2})`, val: s1, req: req2 },
    { label: `1+2轉累計 (開啟3轉門檻 ${req3})`, val: s1 + s2, req: req3 },
    { label: `1~3轉累計 (開啟4轉門檻 ${req4})`, val: s1 + s2 + s3, req: req4 }
  ];
  document.getElementById('jobSpThresholdsBar').innerHTML = thresholdItems.map(item => {
    const ok = item.val >= item.req;
    return `
      <div class="flex items-center justify-between px-3 py-1.5 rounded-lg border ${ok ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]'}">
        <span>${escapeHtml(item.label)}</span>
        <span class="font-bold tabular-nums">${item.val} / ${item.req} ${ok ? '✓' : ''}</span>
      </div>
    `;
  }).join('');

  // Render skill stages (1轉 ~ 4轉, skip empty stages)
  const stagesContainer = document.getElementById('skillStagesContainer');
  const allSkillsMap = new Map(getAllSkillsList(profData).map(x => [x.skill.id, x.skill]));

  const nonEmptyStages = stages.filter(st => {
    const list = profData.skills[st] || [];
    return list.some(s => state.showDeleted || state.version !== 'v2' || s.v2Status !== 'deleted');
  });

  stagesContainer.innerHTML = nonEmptyStages.map(stageKey => {
    const stageIdx = stages.indexOf(stageKey);
    const stageSkills = (profData.skills[stageKey] || []).filter(s =>
      state.showDeleted || state.version !== 'v2' || s.v2Status !== 'deleted'
    );
    const stageSpent = getStageSpentSp(profData, stageKey);
    const stageMaxSum = stageSkills.filter(s => !(state.version === 'v2' && s.v2Status === 'deleted')).reduce((a, b) => a + b.maxLevel, 0);
    const thresholdBadgeHtml = renderStageThresholdBadge(stageIdx, stageSpent, spThresholdState);
    const remainingBadgeCls = remainingSp < 0
      ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
    const remainingBadgeHtml = `<span class="px-2.5 py-0.5 rounded-lg border text-xs font-semibold tabular-nums ${remainingBadgeCls}">剩餘 SP：${remainingSp}</span>`;

    const cardsHtml = stageSkills.map(skill => {
      const curLv = state.skillLevels[skill.id] || 0;
      const isDeleted = state.version === 'v2' && skill.v2Status === 'deleted';
      const cond = checkSkillConditions(profData, skill, stageKey);
      const canInc = !isDeleted && curLv < skill.maxLevel && remainingSp > 0 && cond.ok;
      const canDec = !isDeleted && curLv > 0;
      const spNeedMax = skill.maxLevel - curLv;
      const canMax = !isDeleted && spNeedMax > 0 && remainingSp >= spNeedMax && cond.ok;

      // Prerequisite badges
      const preReqHtml = Object.entries(skill.preRequisite || {}).map(([reqId, reqLv]) => {
        const reqSkill = allSkillsMap.get(reqId);
        const met = (state.skillLevels[reqId] || 0) >= reqLv;
        return `<span class="text-[11px] ${met ? 'text-emerald-300' : 'text-rose-300'}">${met ? '✓' : '•'} 前置：${escapeHtml(reqSkill ? reqSkill.name : reqId)} Lv.${reqLv}</span>`;
      }).join(' ');

      const showDesc = state.expandedDescSkills.has(skill.id);
      const lvData = curLv > 0 && skill.levels && skill.levels[curLv] ? skill.levels[curLv] : null;
      const lv1Data = skill.levels && skill.levels[1] ? skill.levels[1] : null;
      const maxData = skill.levels && skill.levels[skill.maxLevel] ? skill.levels[skill.maxLevel] : null;

      const cardBorder = isDeleted
        ? 'border-rose-500/30 bg-slate-900/50 opacity-70'
        : skill.v2Status === 'new'
          ? 'border-emerald-500/40 bg-[var(--background)]'
          : curLv > 0
            ? 'border-amber-500/50 bg-[var(--background)]'
            : skill.v2Status === 'cygnus'
              ? 'border-purple-500/35 bg-[var(--background)]'
              : 'border-[var(--border)] bg-[var(--background)]';

      const oldNameNote = (state.version === 'v2' && skill.v2Patch && skill.v2Patch.oldName)
        ? `<span class="text-[11px] text-[var(--muted-foreground)] line-through mr-1">${escapeHtml(skill.v2Patch.oldName)}</span>`
        : '';

      const statusHint = isDeleted
        ? '<span class="text-[11px] text-rose-300/90">• 已於 V2 移除或整併</span>'
        : (!cond.ok && !cond.reason.startsWith('需先點 ')
            ? `<span class="text-[11px] text-rose-300/90">• ${escapeHtml(cond.reason)}</span>`
            : '');
      const reqAndStatusHtml = [preReqHtml, statusHint].filter(Boolean).join(' ');

      return `
        <article class="skill-card rounded-xl border px-3 py-2.5 transition ${cardBorder}">
          <!-- Row 1: Header + Prerequisites & Status -->
          <div class="space-y-1.5 min-w-0">
            <div class="flex items-start gap-2.5">
              <img src="${escapeHtml(skill.imageUrl)}" alt="" width="36" height="36" loading="lazy" onerror="this.src='${FALLBACK_ICON_SVG}'" class="w-9 h-9 rounded-lg bg-slate-950 border border-[var(--border)] object-contain p-0.5 shrink-0" />
              <div class="min-w-0 flex-1 space-y-0.5">
                <div class="flex flex-wrap items-center justify-between gap-1.5">
                  <h3 class="text-sm font-bold text-[var(--foreground)] leading-snug">
                    ${oldNameNote}<span>${escapeHtml(skill.name)}</span>
                  </h3>
                  ${getStatusBadgeHtml(skill)}
                </div>
                <div class="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[var(--muted-foreground)]">
                  <span>等級限制：Lv.${skill.requiredLevel || 1}</span>
                  <span>最高等級：${skill.maxLevel}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 leading-tight content-start">
              ${reqAndStatusHtml || '<span class="text-[11px] text-[var(--muted-foreground)]/60">前置：無</span>'}
            </div>
          </div>

          <!-- Row 2: Controls (aligned on exact same Y axis) -->
          <div class="flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-1">
              <button type="button" data-skill-dec="${escapeHtml(skill.id)}" ${canDec ? '' : 'disabled'} aria-label="減少 ${escapeHtml(skill.name)} 等級" class="w-7 h-7 rounded-md bg-[var(--card)] border border-[var(--border)] text-sm font-bold disabled:opacity-35 hover:border-amber-400 transition">-</button>
              <input type="number" min="0" max="${skill.maxLevel}" value="${curLv}" data-skill-input="${escapeHtml(skill.id)}" ${isDeleted ? 'disabled' : ''} aria-label="${escapeHtml(skill.name)} 技能等級" class="w-12 h-7 rounded-md bg-[var(--card)] border border-[var(--border)] text-center text-xs font-bold tabular-nums text-amber-300" />
              <button type="button" data-skill-inc="${escapeHtml(skill.id)}" ${canInc ? '' : 'disabled'} aria-label="增加 ${escapeHtml(skill.name)} 等級" class="w-7 h-7 rounded-md bg-[var(--card)] border border-[var(--border)] text-sm font-bold disabled:opacity-35 hover:border-amber-400 transition">+</button>
              <span class="text-xs text-[var(--muted-foreground)] ml-1 tabular-nums">/ ${skill.maxLevel}</span>
            </div>
            <button type="button" data-skill-max="${escapeHtml(skill.id)}" ${canMax ? '' : 'disabled'} class="px-2.5 h-7 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold disabled:opacity-30 hover:bg-amber-500/30 transition">點滿</button>
          </div>

          <!-- Row 3: Footer + Expandable description -->
          <div class="flex flex-col gap-1.5 min-w-0">
            <div class="pt-1.5 border-t border-[var(--border)]/70 flex flex-wrap items-center justify-between gap-2">
              <button type="button" data-toggle-desc="${escapeHtml(skill.id)}" class="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline-offset-2 hover:underline">
                ${showDesc ? '▲ 收合說明' : '📖 技能效果'}
              </button>
              ${skill.v2Patch ? `
                <button type="button" data-open-v2="${escapeHtml(skill.id)}" class="px-2 py-0.5 rounded-md text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 hover:bg-sky-500/25 transition">
                  📊 V2 改版明細
                </button>
              ` : ''}
            </div>

            ${showDesc ? `
              <div class="pt-1.5 border-t border-[var(--border)]/50 text-xs space-y-1.5 text-[var(--muted-foreground)]">
                <div class="leading-relaxed">${escapeHtml(stripHtmlTagsSimple(skill.description || '無詳細描述'))}</div>
                ${lvData ? `<div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-200"><strong>目前 Lv.${curLv}：</strong>${escapeHtml(lvData.effect)}</div>` : ''}
                ${!lvData && maxData ? `<div class="p-2 rounded-lg bg-slate-800/80 border border-[var(--border)] text-slate-300"><strong>滿級 Lv.${skill.maxLevel}：</strong>${escapeHtml(maxData.effect)}</div>` : ''}
                ${curLv > 0 && curLv < skill.maxLevel && skill.levels && skill.levels[curLv + 1] ? `<div class="text-[11px] text-sky-300"><strong>下一級 Lv.${curLv + 1}：</strong>${escapeHtml(skill.levels[curLv + 1].effect)}</div>` : ''}
                ${curLv === 0 && lv1Data ? `<div class="text-[11px] text-slate-400"><strong>Lv.1：</strong>${escapeHtml(lv1Data.effect)}</div>` : ''}
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--border)]">
          <h3 class="text-base font-bold text-[var(--foreground)]">${escapeHtml(stageKey)}</h3>
          <div class="flex flex-wrap items-center gap-2.5">
            ${thresholdBadgeHtml}
            ${remainingBadgeHtml}
            <span class="text-xs font-semibold text-amber-300 tabular-nums">本轉已配點：${stageSpent} / 總上限 ${stageMaxSum}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');
}

function renderStageThresholdBadge(stageIdx, stageSpent, spState) {
  const { s1, s2, s3, req2, req3, req4 } = spState;
  const configs = {
    1: { nextStage: '2轉', cumulLabel: '', cumulVal: s1, reqTotal: req2, needInStage: req2 },
    2: { nextStage: '3轉', cumulLabel: '1+2轉 ', cumulVal: s1 + s2, reqTotal: req3, needInStage: Math.max(0, req3 - s1) },
    3: { nextStage: '4轉', cumulLabel: '1~3轉 ', cumulVal: s1 + s2 + s3, reqTotal: req4, needInStage: Math.max(0, req4 - (s1 + s2)) }
  };
  const cfg = configs[stageIdx];
  if (!cfg) return '';
  const ok = cfg.cumulVal >= cfg.reqTotal;
  const diff = cfg.reqTotal - cfg.cumulVal;
  const text = stageIdx === 1
    ? `開啟2轉門檻：${s1} / ${req2}${ok ? ' ✓' : `，還差 ${diff} 點`}`
    : `開啟${cfg.nextStage}門檻：本轉 ${stageSpent} / ${cfg.needInStage}（${cfg.cumulLabel}${cfg.cumulVal} / ${cfg.reqTotal}${ok ? ' ✓' : `，還差 ${diff} 點`}）`;
  const cls = ok
    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
    : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]';
  return `<span class="px-2.5 py-0.5 rounded-lg border text-xs font-semibold tabular-nums ${cls}">${text}</span>`;
}

function stripHtmlTagsSimple(str) {
  return String(str || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '');
}

function getChipClass(tag) {
  if (tag === '新增') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  if (tag === '刪除') return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  if (tag === '名稱變更') return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
  if (tag === '便利性') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  if (tag === '特效調整') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
  if (tag === '錯誤修正') return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
  return 'bg-slate-700/60 text-slate-200 border-slate-600';
}

function renderPanelWidget(panel, panelKey) {
  const from = panel.from || 1;
  const to = panel.to || 20;
  const selectedLv = state.panelSelectedLevels[panelKey] || Math.min(to, Math.max(from, panel.to || to));
  const idx = Math.max(0, Math.min((to - from), selectedLv - from));

  const quickButtons = (panel.quick || [from, to]).map(lv => {
    const active = lv === selectedLv;
    return `<button type="button" data-panel-key="${escapeHtml(panelKey)}" data-panel-lv="${lv}" class="px-2 py-0.5 rounded text-[11px] font-semibold border transition ${active ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]'}">Lv.${lv}</button>`;
  }).join('');

  const rowsHtml = (panel.stats || []).map(st => {
    const bef = st.beforeText && st.beforeText[idx] !== undefined ? st.beforeText[idx] : (st.beforeRange || '-');
    const aft = st.afterText && st.afterText[idx] !== undefined ? st.afterText[idx] : (st.afterRange || '-');
    const isSame = bef === aft;
    return `
      <tr class="border-t border-[var(--border)]/60">
        <th scope="row" class="py-1.5 px-2.5 text-left text-xs font-medium text-[var(--foreground)]">${escapeHtml(st.label)}</th>
        <td class="py-1.5 px-2.5 text-xs text-[var(--muted-foreground)] tabular-nums">${escapeHtml(bef)}</td>
        <td class="py-1.5 px-2.5 text-xs font-semibold tabular-nums ${isSame ? 'text-slate-300' : 'text-emerald-300'}">${escapeHtml(aft)}</td>
      </tr>
    `;
  }).join('');

  // Full comparison table inside collapsible details
  const allLevelsRows = [];
  for (let lv = from; lv <= to; lv++) {
    const lvIdx = lv - from;
    const cells = (panel.stats || []).map(st => {
      const bef = st.beforeText[lvIdx] || '-';
      const aft = st.afterText[lvIdx] || '-';
      return `<td class="py-1 px-2 text-[11px] tabular-nums border-l border-[var(--border)]/40">${bef === aft ? escapeHtml(aft) : `<span class="text-slate-400">${escapeHtml(bef)}</span> → <span class="text-emerald-300 font-semibold">${escapeHtml(aft)}</span>`}</td>`;
    }).join('');
    allLevelsRows.push(`<tr class="border-t border-[var(--border)]/40"><th scope="row" class="py-1 px-2 text-left text-[11px] font-semibold text-amber-300">Lv.${lv}</th>${cells}</tr>`);
  }

  return `
    <div class="rounded-xl bg-[var(--background)] border border-[var(--border)] p-3 space-y-2.5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="text-xs font-bold text-amber-300">${escapeHtml(panel.title || '各等級數值')}</div>
        <div class="flex flex-wrap items-center gap-1.5">
          ${quickButtons}
          <span class="px-2 py-0.5 rounded bg-slate-800 text-xs font-bold text-amber-200 border border-slate-700 tabular-nums">目前檢視：Lv.${selectedLv}</span>
        </div>
      </div>
      <input type="range" min="${from}" max="${to}" value="${selectedLv}" data-panel-slider="${escapeHtml(panelKey)}" aria-label="${escapeHtml(panel.title || '等級')}滑桿" class="w-full cursor-pointer accent-amber-500" />
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[11px] text-[var(--muted-foreground)]">
              <th scope="col" class="py-1 px-2.5">項目</th>
              <th scope="col" class="py-1 px-2.5">調整前</th>
              <th scope="col" class="py-1 px-2.5">調整後</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
      <details class="text-xs">
        <summary class="cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] select-none">展開完整 Lv.${from}~${to} 逐級數值表</summary>
        <div class="mt-2 max-h-60 overflow-auto rounded-lg border border-[var(--border)]">
          <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 bg-slate-900 text-[11px] text-[var(--muted-foreground)]">
              <tr>
                <th scope="col" class="py-1.5 px-2">等級</th>
                ${(panel.stats || []).map(st => `<th scope="col" class="py-1.5 px-2 border-l border-[var(--border)]/40">${escapeHtml(st.label)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>${allLevelsRows.join('')}</tbody>
          </table>
        </div>
      </details>
    </div>
  `;
}

function renderPatchSkillCardContent(ps, keyPrefix) {
  const chipsHtml = (ps.tags || []).map(t => `<span class="px-1.5 py-0.5 rounded text-[11px] font-semibold border ${getChipClass(t)}">${escapeHtml(t)}</span>`).join('');
  const nameHtml = ps.oldName
    ? `<span class="text-[var(--muted-foreground)] line-through mr-1.5">${escapeHtml(ps.oldName)}</span><span class="text-amber-300 mr-1.5">→</span><span>${escapeHtml(ps.name)}</span>`
    : `<span>${escapeHtml(ps.name)}</span>`;

  const textLinesHtml = (ps.textLines || []).length > 0 ? `
    <dl class="space-y-1.5 rounded-xl bg-[var(--background)]/70 border border-[var(--border)] p-3 text-xs">
      ${ps.textLines.map(tl => `
        <div class="space-y-0.5">
          <dt class="font-bold text-slate-200 flex items-center gap-1.5">
            ${tl.tag ? `<span class="px-1.5 py-0.5 rounded text-[10px] border ${getChipClass(tl.tag)}">${escapeHtml(tl.tag)}</span>` : ''}
            <span>${escapeHtml(tl.title)}</span>
          </dt>
          <dd class="text-[var(--muted-foreground)] leading-relaxed">${escapeHtml(tl.text)}</dd>
        </div>
      `).join('')}
    </dl>
  ` : '';

  const changesHtml = (ps.changes || []).length > 0 ? `
    <div class="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--background)]/70">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="bg-slate-900/70 text-[11px] text-[var(--muted-foreground)]">
            <th scope="col" class="py-2 px-3">調整項目</th>
            <th scope="col" class="py-2 px-3">調整前</th>
            <th scope="col" class="py-2 px-3">調整後</th>
          </tr>
        </thead>
        <tbody>
          ${ps.changes.map(ch => `
            <tr class="border-t border-[var(--border)]/60">
              <th scope="row" class="py-2 px-3 font-medium text-[var(--foreground)]">
                ${ch.tag ? `<span class="px-1.5 py-0.5 rounded text-[10px] border mr-1.5 ${getChipClass(ch.tag)}">${escapeHtml(ch.tag)}</span>` : ''}
                ${escapeHtml(ch.label)}
              </th>
              <td class="py-2 px-3 text-[var(--muted-foreground)]">${escapeHtml(ch.before)}</td>
              <td class="py-2 px-3 text-emerald-300 font-medium">
                <div>${escapeHtml(ch.after)}</div>
                ${ch.note ? `<div class="text-[11px] text-amber-300/90 mt-0.5">${escapeHtml(ch.note)}</div>` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  ` : '';

  const panelsHtml = (ps.panels || []).map((panel, pIdx) =>
    renderPanelWidget(panel, `${keyPrefix}_${ps.id}_${pIdx}`)
  ).join('');

  return `
    <div class="space-y-3">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">${escapeHtml(ps.grade || '')}</span>
            ${ps.maxLevel ? `<span class="text-xs text-[var(--muted-foreground)]">最高等級：${ps.maxLevel}</span>` : ''}
            ${chipsHtml}
          </div>
          <div class="text-xs text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">${escapeHtml(ps.desc)}</div>
        </div>
      </div>
      ${ps.comment ? `<blockquote class="rounded-xl bg-amber-500/10 border-l-4 border-amber-400 px-3.5 py-2.5 text-xs text-amber-100 leading-relaxed whitespace-pre-line">${escapeHtml(ps.comment)}</blockquote>` : ''}
      ${textLinesHtml}
      ${changesHtml}
      ${panelsHtml}
    </div>
  `;
}

function matchesPatchFilter(ps) {
  if (state.patchFilter === 'new' && !ps.tags.includes('新增')) return false;
  if (state.patchFilter === 'deleted' && !ps.tags.includes('刪除')) return false;
  if (state.patchFilter === 'rename' && !ps.oldName && !ps.tags.includes('名稱變更')) return false;
  if (state.patchFilter === 'adjust' && (ps.tags.includes('新增') || ps.tags.includes('刪除'))) return false;
  if (state.patchSearch.trim()) {
    const q = state.patchSearch.trim().toLowerCase();
    const hay = [ps.name, ps.oldName, ps.desc, ps.comment, ...(ps.changes || []).map(c => c.label + c.before + c.after)].join(' ').toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function renderPatchOverviewView() {
  const meta = getMetaBySlug(state.slug);
  const patchProf = balancePatchV2Data[meta.slug];
  if (!patchProf) return;
  const profData = mergedByVersion.v2[meta.profKey] || allProfessionsData[meta.profKey];

  const patchEmblemEl = document.getElementById('patchProfEmblem');
  if (patchEmblemEl) {
    patchEmblemEl.src = profData?.emblemUrl || FALLBACK_ICON_SVG;
    patchEmblemEl.style.setProperty('--job-color', meta.color || profData?.themeColor || '#d98a1f');
    patchEmblemEl.onerror = () => { patchEmblemEl.src = FALLBACK_ICON_SVG; };
  }

  document.getElementById('patchProfTitle').textContent = `${meta.profKey} — Balance Patch v2 官方改版明細（共 ${patchProf.skills.length} 項）`;
  document.getElementById('patchOfficialLink').href = patchProf.officialUrl;
  document.getElementById('patchProfIntro').textContent = patchProf.intro || '';
  document.getElementById('patchSearchInput').value = state.patchSearch;

  const allSkills = patchProf.skills;
  const counts = {
    all: allSkills.length,
    new: allSkills.filter(s => s.tags.includes('新增')).length,
    rename: allSkills.filter(s => s.oldName || s.tags.includes('名稱變更')).length,
    adjust: allSkills.filter(s => !s.tags.includes('新增') && !s.tags.includes('刪除')).length,
    deleted: allSkills.filter(s => s.tags.includes('刪除')).length
  };

  const filters = [
    { id: 'all', label: `全部 (${counts.all})` },
    { id: 'new', label: `🆕 新增 (${counts.new})` },
    { id: 'rename', label: `✏️ 名稱變更 (${counts.rename})` },
    { id: 'adjust', label: `⚡ 調整/重製 (${counts.adjust})` },
    { id: 'deleted', label: `❌ 刪除 (${counts.deleted})` }
  ];

  document.getElementById('patchFilterPills').innerHTML = filters.map(f => {
    const active = state.patchFilter === f.id;
    return `<button type="button" data-patch-filter="${f.id}" class="px-3 py-1 rounded-lg text-xs font-semibold border transition ${active ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]'}">${escapeHtml(f.label)}</button>`;
  }).join('');

  const filtered = allSkills.filter(matchesPatchFilter);
  const grades = [...new Set(filtered.map(s => s.grade))];

  document.getElementById('patchStageAnchors').innerHTML = grades.map(g =>
    `<a href="#patch-grade-${escapeHtml(g)}" class="px-2.5 py-1 rounded-md bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-amber-400 transition">${escapeHtml(g)}</a>`
  ).join('');

  const container = document.getElementById('patchCardsContainer');
  if (filtered.length === 0) {
    container.innerHTML = `<div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 text-center text-sm text-[var(--muted-foreground)]">找不到符合目前篩選條件的 V2 平衡調整項目。</div>`;
    return;
  }

  container.innerHTML = grades.map(grade => {
    const list = filtered.filter(s => s.grade === grade);
    const itemsHtml = list.map(ps => `
      <article class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3">
        <div class="flex items-center gap-3 pb-2.5 border-b border-[var(--border)]">
          <img src="${escapeHtml(ps.icon)}" alt="" width="36" height="36" loading="lazy" onerror="this.src='${FALLBACK_ICON_SVG}'" class="w-9 h-9 rounded-lg bg-[var(--background)] border border-[var(--border)] object-contain p-0.5 shrink-0" />
          <div class="min-w-0 flex-1">
            <h4 class="text-base font-bold text-[var(--foreground)]">
              ${ps.oldName ? `<span class="text-[var(--muted-foreground)] line-through mr-1.5">${escapeHtml(ps.oldName)}</span><span class="text-amber-300 mr-1.5">→</span>` : ''}
              <span>${escapeHtml(ps.name)}</span>
            </h4>
          </div>
          <button type="button" data-jump-sim-skill="${escapeHtml(ps.mappedSkillId)}" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition shrink-0">🎯 去模擬器配點</button>
        </div>
        ${renderPatchSkillCardContent(ps, 'overview')}
      </article>
    `).join('');

    return `
      <section id="patch-grade-${escapeHtml(grade)}" class="space-y-3">
        <h3 class="text-base font-bold text-amber-300 px-1">${escapeHtml(grade)}（${list.length} 項）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">${itemsHtml}</div>
      </section>
    `;
  }).join('');
}

let activeModalSkillId = null;
function openV2SkillModal(skillId) {
  const profData = getCurrentProfData();
  const entry = getAllSkillsList(profData).find(x => x.skill.id === skillId);
  if (!entry || !entry.skill.v2Patch) return;
  const ps = entry.skill.v2Patch;
  activeModalSkillId = skillId;

  const iconEl = document.getElementById('v2DialogIcon');
  iconEl.src = ps.icon || entry.skill.imageUrl || FALLBACK_ICON_SVG;
  iconEl.onerror = () => { iconEl.src = FALLBACK_ICON_SVG; };

  document.getElementById('v2DialogTitle').textContent = ps.oldName ? `${ps.oldName} → ${ps.name}` : ps.name;
  document.getElementById('v2DialogSub').textContent = `${getMetaBySlug(state.slug).profKey} · ${ps.grade}`;
  document.getElementById('v2DialogBody').innerHTML = renderPatchSkillCardContent(ps, 'modal');

  const dialog = document.getElementById('v2DetailDialog');
  if (!dialog.open) dialog.showModal();
}

function refreshViewTabsAndRender() {
  const simTab = document.getElementById('viewTabSim');
  const patchTab = document.getElementById('viewTabPatch');
  const simView = document.getElementById('simulatorView');
  const patchView = document.getElementById('patchView');

  if (state.view === 'sim') {
    simTab.setAttribute('aria-selected', 'true');
    patchTab.setAttribute('aria-selected', 'false');
    simTab.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] transition';
    patchTab.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition';
    simView.classList.remove('hidden');
    patchView.classList.add('hidden');
    renderSimulatorView();
  } else {
    simTab.setAttribute('aria-selected', 'false');
    patchTab.setAttribute('aria-selected', 'true');
    patchTab.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] transition';
    simTab.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition';
    patchView.classList.remove('hidden');
    simView.classList.add('hidden');
    renderPatchOverviewView();
    updateFloatingDockVisibility();
  }
  renderProfessionSelector();
}

function selectProfession(newSlug, loadStorage = true) {
  state.slug = newSlug;
  state.expandedDescSkills.clear();
  state.activeBuildGuide = null;
  const buildSelect = document.getElementById('recommendedBuildSelect');
  if (buildSelect) buildSelect.value = '';
  if (loadStorage) loadBuildFromStorage();
  syncUrlParams();
  refreshViewTabsAndRender();
}

function loadAllSavedBuilds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_BUILDS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveAllSavedBuilds(map) {
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_BUILDS, JSON.stringify(map));
  } catch (_) {
    showToast('無法寫入瀏覽器本機存檔，請檢查儲存空間限制');
  }
}

function getSavedBuildsForSlug(slug) {
  const map = loadAllSavedBuilds();
  return Array.isArray(map[slug]) ? map[slug] : [];
}

function renderRecommendedBuildGuideBox() {
  const box = document.getElementById('recommendedBuildGuideBox');
  if (!box) return;
  const g = state.activeBuildGuide;
  if (!g) {
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }
  box.classList.remove('hidden');
  const badge = g.applied
    ? '<span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">已套用配點</span>'
    : '<span class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px]">存檔預覽（按右側「套用」填入技能點）</span>';
  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-2 font-bold text-amber-300">
        <span>📌 ${escapeHtml(g.name)}</span>
        <span class="text-[11px] font-medium text-[var(--muted-foreground)]">目標 Lv.${escapeHtml(g.level || 200)}</span>
        ${badge}
      </div>
      <button type="button" id="btnCloseBuildGuide" class="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] shrink-0">✕ 收合</button>
    </div>
    ${g.description ? `<div class="text-[var(--foreground)] leading-relaxed whitespace-pre-line">${escapeHtml(g.description)}</div>` : ''}
    ${g.priority ? `<div class="p-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[11px] text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line"><strong class="text-sky-300">筆記 / 順序：</strong>\n${escapeHtml(g.priority)}</div>` : ''}
  `;
}

function resolveSkillLevelsForProf(profData, rawSkills, versionMode) {
  const allSkills = getAllSkillsList(profData).map(x => x.skill);
  const resolved = {};
  for (const s of allSkills) resolved[s.id] = 0;

  const assignEntry = (rawKey, rawLv) => {
    const key = String(rawKey || '').trim();
    const lv = parseInt(rawLv, 10);
    if (!key || Number.isNaN(lv) || lv <= 0) return;
    const sk = allSkills.find(s =>
      s.id === key ||
      s.name === key ||
      s.v1Name === key ||
      (s.v2Patch && s.v2Patch.oldName === key)
    );
    if (sk && !(versionMode === 'v2' && sk.v2Status === 'deleted')) {
      resolved[sk.id] = Math.min(sk.maxLevel, lv);
    }
  };

  if (typeof rawSkills === 'string') {
    for (const pair of rawSkills.split(/[,\n]/)) {
      const match = pair.match(/^\s*([^:：\n]+?)\s*[:：]\s*(\d+)\s*$/);
      if (match) assignEntry(match[1], match[2]);
    }
  } else if (rawSkills && typeof rawSkills === 'object') {
    for (const [k, v] of Object.entries(rawSkills)) {
      assignEntry(k, v);
    }
  }
  return resolved;
}

function applyBuildObject(build) {
  const targetMeta = resolveMetaFromParam(build.slug || build.profKey) || getMetaBySlug(state.slug);
  state.slug = targetMeta.slug;
  if (build.version === 'v1' || build.version === 'v2') {
    state.version = build.version;
  }
  const profData = getCurrentProfData();
  state.level = Math.max(1, Math.min(200, Number(build.level) || 200));
  state.skillLevels = resolveSkillLevelsForProf(
    profData,
    build.skillLevels || build.skills || {},
    state.version
  );
  state.activeBuildGuide = (build.name || build.note || build.description) ? {
    name: build.name || `${targetMeta.shortName} Lv.${state.level}`,
    level: state.level,
    description: build.note || build.description || '',
    priority: build.priority || '',
    applied: true
  } : null;
  saveCurrentBuildToStorage();
  syncUrlParams();
  refreshViewTabsAndRender();
}

function applySavedBuildById(buildId) {
  const meta = getMetaBySlug(state.slug);
  const builds = getSavedBuildsForSlug(meta.slug);
  const build = builds.find(b => b.id === buildId);
  if (!build) {
    showToast('請先選擇要套用的已儲存配點');
    return;
  }
  applyBuildObject(build);
  showToast(`已套用存檔「${build.name}」`);
}

function openSaveBuildDialog() {
  const meta = getMetaBySlug(state.slug);
  const badgeEl = document.getElementById('saveBuildProfBadge');
  const nameInput = document.getElementById('saveBuildNameInput');
  const noteInput = document.getElementById('saveBuildNoteInput');
  const verLabel = state.version === 'v1' ? 'V1' : 'V2';
  badgeEl.textContent = meta.shortName;

  const buildSelect = document.getElementById('recommendedBuildSelect');
  const existing = buildSelect && buildSelect.value
    ? getSavedBuildsForSlug(meta.slug).find(b => b.id === buildSelect.value)
    : null;

  nameInput.value = existing ? existing.name : `${meta.shortName} Lv.${state.level} (${verLabel})`;
  noteInput.value = existing ? (existing.note || '') : '';
  document.getElementById('saveBuildDialog').showModal();
  nameInput.focus();
  nameInput.select();
}

function saveCurrentBuildPreset() {
  const nameInput = document.getElementById('saveBuildNameInput');
  const noteInput = document.getElementById('saveBuildNoteInput');
  const name = (nameInput.value || '').trim();
  if (!name) {
    showToast('請輸入配點方案名稱');
    nameInput.focus();
    return;
  }
  const meta = getMetaBySlug(state.slug);
  const map = loadAllSavedBuilds();
  const list = Array.isArray(map[meta.slug]) ? [...map[meta.slug]] : [];

  const compactSkills = {};
  for (const [id, lv] of Object.entries(state.skillLevels)) {
    if (lv > 0) compactSkills[id] = lv;
  }

  const existingIdx = list.findIndex(b => b.name === name);
  const entry = {
    id: existingIdx >= 0 ? list[existingIdx].id : ('b_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6)),
    name,
    slug: meta.slug,
    profKey: meta.profKey,
    version: state.version,
    level: state.level,
    skillLevels: compactSkills,
    note: (noteInput.value || '').trim(),
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) list[existingIdx] = entry;
  else list.unshift(entry);
  map[meta.slug] = list;
  saveAllSavedBuilds(map);

  document.getElementById('saveBuildDialog').close();
  state.activeBuildGuide = {
    name: entry.name,
    level: entry.level,
    description: entry.note,
    priority: '',
    applied: true
  };
  renderSimulatorView();
  const buildSelect = document.getElementById('recommendedBuildSelect');
  if (buildSelect) buildSelect.value = entry.id;
  const applyBtn = document.getElementById('btnApplyBuild');
  const delBtn = document.getElementById('btnDeleteSavedBuild');
  if (applyBtn) applyBtn.disabled = false;
  if (delBtn) delBtn.disabled = false;
  showToast(existingIdx >= 0 ? `已覆蓋更新「${name}」` : `已儲存配點「${name}」`);
}

function deleteSelectedSavedBuild() {
  const buildSelect = document.getElementById('recommendedBuildSelect');
  const id = buildSelect ? buildSelect.value : '';
  if (!id) return;
  const meta = getMetaBySlug(state.slug);
  const map = loadAllSavedBuilds();
  const list = Array.isArray(map[meta.slug]) ? map[meta.slug] : [];
  const target = list.find(b => b.id === id);
  if (!target) return;

  map[meta.slug] = list.filter(b => b.id !== id);
  if (map[meta.slug].length === 0) delete map[meta.slug];
  saveAllSavedBuilds(map);

  buildSelect.value = '';
  if (state.activeBuildGuide && state.activeBuildGuide.name === target.name) {
    state.activeBuildGuide = null;
  }
  renderSimulatorView();
  showToast(`已刪除存檔「${target.name}」`);
}

function serializeCurrentBuild() {
  const meta = getMetaBySlug(state.slug);
  const compactSkills = {};
  for (const [id, lv] of Object.entries(state.skillLevels)) {
    if (lv > 0) compactSkills[id] = lv;
  }
  const buildSelect = document.getElementById('recommendedBuildSelect');
  const selected = buildSelect && buildSelect.value
    ? getSavedBuildsForSlug(meta.slug).find(b => b.id === buildSelect.value)
    : null;
  return {
    type: 'artale-skill-build',
    schemaVersion: 1,
    name: selected ? selected.name : `${meta.shortName} Lv.${state.level}`,
    slug: meta.slug,
    profKey: meta.profKey,
    version: state.version,
    level: state.level,
    note: selected ? (selected.note || '') : '',
    skillLevels: compactSkills,
    exportedAt: new Date().toISOString()
  };
}

function buildExportPayload(scope) {
  if (scope === 'all') {
    const saved = loadAllSavedBuilds();
    return {
      type: 'artale-skill-builds',
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      savedBuilds: saved
    };
  }
  return serializeCurrentBuild();
}

function refreshExportPreview() {
  const scope = document.getElementById('exportScopeSelect').value;
  const payload = buildExportPayload(scope);
  document.getElementById('exportBuildTextarea').value = JSON.stringify(payload, null, 2);
}

function openIoBuildDialog() {
  refreshExportPreview();
  document.getElementById('buildIoDialog').showModal();
}

function parseImportedBuildPayload(rawText) {
  const text = String(rawText || '').trim();
  if (!text) return { error: '請先選擇檔案或貼上配點內容' };

  // 1. URL format (?prof=...&ver=...&lvl=...&skills=...)
  if (/^(https?:\/\/|\?)/i.test(text) || (text.includes('skills=') && text.includes('prof='))) {
    try {
      let urlStr = text;
      if (!/^https?:\/\//i.test(urlStr)) {
        urlStr = urlStr.includes('?')
          ? ('https://local.invalid/' + urlStr.slice(urlStr.indexOf('?')))
          : ('https://local.invalid/?' + urlStr);
      }
      const url = new URL(urlStr);
      const slugMeta = resolveMetaFromParam(url.searchParams.get('prof')) || getMetaBySlug(state.slug);
      const ver = url.searchParams.get('ver') === 'v1' ? 'v1' : 'v2';
      const lvl = Math.max(1, Math.min(200, parseInt(url.searchParams.get('lvl'), 10) || 200));
      const skillsRaw = url.searchParams.get('skills') || '';
      return {
        builds: [{
          name: `${slugMeta.shortName} Lv.${lvl} (連結匯入)`,
          slug: slugMeta.slug,
          profKey: slugMeta.profKey,
          version: ver,
          level: lvl,
          note: '',
          skills: skillsRaw
        }]
      };
    } catch (_) {}
  }

  // 2. JSON format
  if (text.startsWith('{') || text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);
      const builds = [];
      const pushEntry = (raw, fallbackSlug) => {
        if (!raw || typeof raw !== 'object') return;
        const meta = resolveMetaFromParam(raw.slug || raw.profKey || fallbackSlug) || getMetaBySlug(state.slug);
        builds.push({
          id: raw.id,
          name: String(raw.name || `${meta.shortName} Lv.${raw.level || 200}`).trim(),
          slug: meta.slug,
          profKey: meta.profKey,
          version: raw.version === 'v1' ? 'v1' : 'v2',
          level: Math.max(1, Math.min(200, Number(raw.level) || 200)),
          note: String(raw.note || raw.description || '').trim(),
          skillLevels: raw.skillLevels,
          skills: raw.skills
        });
      };

      if (Array.isArray(parsed)) {
        parsed.forEach(item => pushEntry(item));
      } else if (parsed && typeof parsed === 'object') {
        if (parsed.savedBuilds && typeof parsed.savedBuilds === 'object') {
          for (const [slugKey, arr] of Object.entries(parsed.savedBuilds)) {
            if (Array.isArray(arr)) arr.forEach(item => pushEntry(item, slugKey));
          }
        } else if (parsed.skillLevels || parsed.skills || parsed.slug || parsed.profKey) {
          pushEntry(parsed);
        } else {
          for (const [slugKey, arr] of Object.entries(parsed)) {
            if (Array.isArray(arr)) arr.forEach(item => pushEntry(item, slugKey));
          }
        }
      }

      if (builds.length === 0) return { error: 'JSON 內找不到有效的技能配點資料' };
      return { builds };
    } catch (err) {
      return { error: 'JSON 格式解析失敗，請確認內容完整無誤' };
    }
  }

  // 3. Skill string format ("生命淨化:16, 魔天一擊:20")
  const curMeta = getMetaBySlug(state.slug);
  const hasPairs = text.split(/[,\n]/).some(p => /^\s*[^:：\n]+\s*[:：]\s*\d+\s*$/.test(p));
  if (hasPairs) {
    return {
      builds: [{
        name: `${curMeta.shortName} Lv.${state.level} (文字匯入)`,
        slug: curMeta.slug,
        profKey: curMeta.profKey,
        version: state.version,
        level: state.level,
        note: '',
        skills: text
      }]
    };
  }

  return { error: '無法辨識匯入內容格式，請貼上 JSON、分享連結或「技能名:等級」文字' };
}

function handleImportBuilds(saveToList) {
  const rawText = document.getElementById('importBuildTextarea').value;
  const result = parseImportedBuildPayload(rawText);
  if (result.error) {
    showToast(result.error);
    return;
  }

  if (!saveToList) {
    const preferred = result.builds.find(b => b.slug === state.slug) || result.builds[0];
    applyBuildObject(preferred);
    document.getElementById('buildIoDialog').close();
    const extraHint = result.builds.length > 1 ? `（共包含 ${result.builds.length} 筆，已套用第一筆對應職業）` : '';
    showToast(`⚡ 已匯入並套用「${preferred.name}」${extraHint}`);
    return;
  }

  const map = loadAllSavedBuilds();
  let importedCount = 0;
  let firstAdded = null;
  for (const rawBuild of result.builds) {
    const meta = getMetaBySlug(rawBuild.slug);
    const ver = rawBuild.version === 'v1' ? 'v1' : 'v2';
    const profData = mergedByVersion[ver][meta.profKey];
    if (!profData) continue;

    const resolvedSkills = resolveSkillLevelsForProf(profData, rawBuild.skillLevels || rawBuild.skills || {}, ver);
    const compactSkills = {};
    for (const [id, lv] of Object.entries(resolvedSkills)) {
      if (lv > 0) compactSkills[id] = lv;
    }

    const list = Array.isArray(map[meta.slug]) ? [...map[meta.slug]] : [];
    const existingIdx = list.findIndex(b => (rawBuild.id && b.id === rawBuild.id) || b.name === rawBuild.name);
    const entry = {
      id: existingIdx >= 0 ? list[existingIdx].id : ('b_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6) + importedCount),
      name: rawBuild.name,
      slug: meta.slug,
      profKey: meta.profKey,
      version: ver,
      level: rawBuild.level,
      skillLevels: compactSkills,
      note: rawBuild.note || '',
      updatedAt: new Date().toISOString()
    };
    if (existingIdx >= 0) list[existingIdx] = entry;
    else list.unshift(entry);
    map[meta.slug] = list;
    importedCount++;
    if (!firstAdded) firstAdded = entry;
  }

  if (importedCount === 0) {
    showToast('沒有可匯入的有效配點資料');
    return;
  }

  saveAllSavedBuilds(map);
  document.getElementById('buildIoDialog').close();
  if (firstAdded && !getSavedBuildsForSlug(state.slug).length) {
    state.slug = firstAdded.slug;
    syncUrlParams();
  }
  refreshViewTabsAndRender();
  const matching = getSavedBuildsForSlug(state.slug).find(b => firstAdded && b.id === firstAdded.id);
  const buildSelect = document.getElementById('recommendedBuildSelect');
  if (buildSelect && matching) {
    buildSelect.value = matching.id;
    document.getElementById('btnApplyBuild').disabled = false;
    document.getElementById('btnDeleteSavedBuild').disabled = false;
  }
  showToast(`📥 已匯入 ${importedCount} 筆配點至已儲存清單`);
}

function initFromUrlOrStorage() {
  const params = new URLSearchParams(window.location.search);
  let loadedLast = null;
  try {
    loadedLast = JSON.parse(localStorage.getItem(STORAGE_KEY_LAST_STATE) || 'null');
  } catch (_) {}

  const paramProf = resolveMetaFromParam(params.get('prof'));
  if (paramProf) {
    state.slug = paramProf.slug;
  } else if (loadedLast && resolveMetaFromParam(loadedLast.slug)) {
    state.slug = loadedLast.slug;
  }

  const paramVer = params.get('ver');
  if (paramVer === 'v1' || paramVer === 'v2') {
    state.version = paramVer;
  } else if (loadedLast && (loadedLast.version === 'v1' || loadedLast.version === 'v2')) {
    state.version = loadedLast.version;
  }

  const paramView = params.get('view');
  if (paramView === 'patch' || paramView === 'sim') {
    state.view = paramView;
  }

  loadBuildFromStorage();

  // URL shared build override
  const paramLvl = parseInt(params.get('lvl'), 10);
  if (paramLvl >= 1 && paramLvl <= 200) {
    state.level = paramLvl;
  }
  const paramSkills = params.get('skills');
  if (paramSkills) {
    loadBuildFromStorage(true);
    const profData = getCurrentProfData();
    const skillMap = new Map(getAllSkillsList(profData).map(x => [x.skill.id, x.skill]));
    for (const pair of paramSkills.split(',')) {
      const [id, lvStr] = pair.split(':');
      const lv = parseInt(lvStr, 10);
      const sk = skillMap.get(id);
      if (sk && !isNaN(lv) && lv > 0 && !(state.version === 'v2' && sk.v2Status === 'deleted')) {
        state.skillLevels[id] = Math.min(sk.maxLevel, lv);
      }
    }
    saveCurrentBuildToStorage();
  }

  refreshViewTabsAndRender();
}

// Event bindings
document.addEventListener('click', (e) => {
  const profBtn = e.target.closest('[data-select-prof]');
  if (profBtn) {
    selectProfession(profBtn.dataset.selectProf);
    return;
  }

  const quickLvlBtn = e.target.closest('[data-quick-lvl]');
  if (quickLvlBtn) {
    state.level = parseInt(quickLvlBtn.dataset.quickLvl, 10);
    saveCurrentBuildToStorage();
    renderSimulatorView();
    return;
  }

  const incBtn = e.target.closest('[data-skill-inc]');
  if (incBtn) {
    const id = incBtn.dataset.skillInc;
    setSkillLevelSafe(id, (state.skillLevels[id] || 0) + 1);
    return;
  }

  const decBtn = e.target.closest('[data-skill-dec]');
  if (decBtn) {
    const id = decBtn.dataset.skillDec;
    setSkillLevelSafe(id, (state.skillLevels[id] || 0) - 1);
    return;
  }

  const maxBtn = e.target.closest('[data-skill-max]');
  if (maxBtn) {
    const id = maxBtn.dataset.skillMax;
    const sk = getAllSkillsList(getCurrentProfData()).find(x => x.skill.id === id)?.skill;
    if (sk) setSkillLevelSafe(id, sk.maxLevel);
    return;
  }

  const descBtn = e.target.closest('[data-toggle-desc]');
  if (descBtn) {
    const id = descBtn.dataset.toggleDesc;
    if (state.expandedDescSkills.has(id)) state.expandedDescSkills.delete(id);
    else state.expandedDescSkills.add(id);
    renderSimulatorView();
    return;
  }

  const v2Btn = e.target.closest('[data-open-v2]');
  if (v2Btn) {
    openV2SkillModal(v2Btn.dataset.openV2);
    return;
  }

  const filterBtn = e.target.closest('[data-patch-filter]');
  if (filterBtn) {
    state.patchFilter = filterBtn.dataset.patchFilter;
    renderPatchOverviewView();
    return;
  }

  const jumpSimBtn = e.target.closest('[data-jump-sim-skill]');
  if (jumpSimBtn) {
    state.view = 'sim';
    state.expandedDescSkills.add(jumpSimBtn.dataset.jumpSimSkill);
    syncUrlParams();
    refreshViewTabsAndRender();
    return;
  }

  if (e.target && e.target.id === 'btnCloseBuildGuide') {
    state.activeBuildGuide = null;
    renderRecommendedBuildGuideBox();
    return;
  }

  const panelBtn = e.target.closest('[data-panel-key]');
  if (panelBtn) {
    state.panelSelectedLevels[panelBtn.dataset.panelKey] = parseInt(panelBtn.dataset.panelLv, 10);
    if (document.getElementById('v2DetailDialog').open && activeModalSkillId) {
      openV2SkillModal(activeModalSkillId);
    } else {
      renderPatchOverviewView();
    }
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'charLevelRange') {
    state.level = Math.max(1, Math.min(200, parseInt(e.target.value, 10) || 1));
    saveCurrentBuildToStorage();
    renderSimulatorView();
    return;
  }
  if (e.target.id === 'patchSearchInput') {
    state.patchSearch = e.target.value;
    renderPatchOverviewView();
    return;
  }
  if (e.target.dataset && e.target.dataset.panelSlider) {
    state.panelSelectedLevels[e.target.dataset.panelSlider] = parseInt(e.target.value, 10);
    if (document.getElementById('v2DetailDialog').open && activeModalSkillId) {
      openV2SkillModal(activeModalSkillId);
    } else {
      renderPatchOverviewView();
    }
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'charLevelInput') {
    state.level = Math.max(1, Math.min(200, parseInt(e.target.value, 10) || 1));
    saveCurrentBuildToStorage();
    renderSimulatorView();
    return;
  }
  if (e.target.id === 'toggleShowDeleted') {
    state.showDeleted = e.target.checked;
    renderSimulatorView();
    return;
  }
  if (e.target.id === 'recommendedBuildSelect') {
    const buildId = e.target.value;
    const meta = getMetaBySlug(state.slug);
    const builds = getSavedBuildsForSlug(meta.slug);
    const b = buildId ? builds.find(x => x.id === buildId) : null;
    const applyBtn = document.getElementById('btnApplyBuild');
    const delBtn = document.getElementById('btnDeleteSavedBuild');
    if (applyBtn) applyBtn.disabled = !b;
    if (delBtn) delBtn.disabled = !b;
    state.activeBuildGuide = b ? {
      name: b.name,
      level: b.level,
      description: b.note || '',
      priority: '',
      applied: false
    } : null;
    renderRecommendedBuildGuideBox();
    return;
  }
  if (e.target.id === 'exportScopeSelect') {
    refreshExportPreview();
    return;
  }
  if (e.target.id === 'importBuildFileInput') {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('importBuildTextarea').value = String(reader.result || '');
      showToast(`已讀取檔案「${file.name}」，請選擇套用或存入清單`);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
    return;
  }
  if (e.target.dataset && e.target.dataset.skillInput) {
    setSkillLevelSafe(e.target.dataset.skillInput, e.target.value);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.isComposing) return;
  if (e.key === 'Enter' && e.target.dataset && e.target.dataset.skillInput) {
    setSkillLevelSafe(e.target.dataset.skillInput, e.target.value);
  } else if (e.key === 'Enter' && e.target.id === 'saveBuildNameInput') {
    e.preventDefault();
    saveCurrentBuildPreset();
  }
});

document.getElementById('viewTabSim').addEventListener('click', () => {
  state.view = 'sim';
  syncUrlParams();
  refreshViewTabsAndRender();
});

document.getElementById('viewTabPatch').addEventListener('click', () => {
  state.view = 'patch';
  syncUrlParams();
  refreshViewTabsAndRender();
});

document.getElementById('btnVerV2').addEventListener('click', () => {
  if (state.version === 'v2') return;
  state.version = 'v2';
  loadBuildFromStorage();
  syncUrlParams();
  refreshViewTabsAndRender();
});

document.getElementById('btnVerV1').addEventListener('click', () => {
  if (state.version === 'v1') return;
  state.version = 'v1';
  loadBuildFromStorage();
  syncUrlParams();
  refreshViewTabsAndRender();
});

document.getElementById('btnApplyBuild').addEventListener('click', () => {
  applySavedBuildById(document.getElementById('recommendedBuildSelect').value);
});

document.getElementById('btnOpenSaveBuild').addEventListener('click', openSaveBuildDialog);
document.getElementById('btnCancelSaveBuild').addEventListener('click', () => {
  document.getElementById('saveBuildDialog').close();
});
document.getElementById('btnConfirmSaveBuild').addEventListener('click', saveCurrentBuildPreset);
document.getElementById('btnDeleteSavedBuild').addEventListener('click', deleteSelectedSavedBuild);

document.getElementById('btnOpenIoBuild').addEventListener('click', openIoBuildDialog);
document.getElementById('btnCloseIoDialog').addEventListener('click', () => {
  document.getElementById('buildIoDialog').close();
});
document.getElementById('btnCopyExportJson').addEventListener('click', async () => {
  const txt = document.getElementById('exportBuildTextarea').value;
  try {
    await navigator.clipboard.writeText(txt);
    showToast('📋 已複製配點 JSON 到剪貼簿！');
  } catch (_) {
    showToast('無法存取剪貼簿，請手動全選複製上方 JSON');
  }
});
document.getElementById('btnDownloadExportJson').addEventListener('click', () => {
  const scope = document.getElementById('exportScopeSelect').value;
  const payload = buildExportPayload(scope);
  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = scope === 'all'
    ? `artale-all-skill-builds-${dateStr}.json`
    : `artale-skill-${state.slug}-lv${state.level}-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('💾 已下載 JSON 配點檔');
});
document.getElementById('btnImportApplyNow').addEventListener('click', () => handleImportBuilds(false));
document.getElementById('btnImportSaveToList').addEventListener('click', () => handleImportBuilds(true));

document.getElementById('btnShareBuild').addEventListener('click', async () => {
  const url = new URL(window.location.href);
  url.searchParams.set('prof', state.slug);
  url.searchParams.set('ver', state.version);
  url.searchParams.set('lvl', String(state.level));
  const skillsParam = Object.entries(state.skillLevels)
    .filter(([, lv]) => lv > 0)
    .map(([id, lv]) => `${id}:${lv}`)
    .join(',');
  if (skillsParam) url.searchParams.set('skills', skillsParam);
  else url.searchParams.delete('skills');
  try {
    await navigator.clipboard.writeText(url.toString());
    showToast('🔗 配點分享連結已複製到剪貼簿！');
  } catch (_) {
    showToast('無法存取剪貼簿，請從網址列手動複製');
  }
});

document.getElementById('btnResetBuild').addEventListener('click', () => {
  document.getElementById('resetConfirmDialog').showModal();
});

document.getElementById('btnCancelReset').addEventListener('click', () => {
  document.getElementById('resetConfirmDialog').close();
});

document.getElementById('btnConfirmReset').addEventListener('click', () => {
  state.activeBuildGuide = null;
  const buildSelect = document.getElementById('recommendedBuildSelect');
  if (buildSelect) buildSelect.value = '';
  loadBuildFromStorage(true);
  saveCurrentBuildToStorage();
  document.getElementById('resetConfirmDialog').close();
  renderSimulatorView();
  showToast('已重置目前職業所有技能點數');
});

document.getElementById('btnCloseV2Dialog').addEventListener('click', () => {
  document.getElementById('v2DetailDialog').close();
});

function updateFloatingDockVisibility() {
  const btn = document.getElementById('backToTopBtn');
  const spBadge = document.getElementById('floatingSpBadge');
  const showTop = window.scrollY > 300;
  if (btn) {
    btn.classList.toggle('hidden', !showTop);
    btn.classList.toggle('inline-flex', showTop);
  }
  if (spBadge) {
    const remCard = document.getElementById('remainingSpVal');
    const scrolledPastTopSp = remCard && state.view === 'sim'
      ? remCard.getBoundingClientRect().bottom < 8
      : false;
    const showSp = state.view === 'sim' && (scrolledPastTopSp || showTop);
    spBadge.classList.toggle('hidden', !showSp);
    spBadge.classList.toggle('inline-flex', showSp);
  }
}

function initSimulatorBackToTop() {
  initBackToTop(updateFloatingDockVisibility);
}

initThemeToggle();
initSimulatorBackToTop();
initFromUrlOrStorage();
