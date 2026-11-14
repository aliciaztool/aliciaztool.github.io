function loadLocalSummaries() {
  const raidSummaryEl = document.getElementById('raidStatusSummary');
  try {
    const rawRaid = localStorage.getItem('artale_raid_planner_v3');
    if (rawRaid) {
      const parsed = JSON.parse(rawRaid);
      const members = Array.isArray(parsed.members) ? parsed.members : [];
      const totalChars = members.reduce((sum, m) => sum + ((m.chars && m.chars.length) || 0), 0);
      const lockedCount = Array.isArray(parsed.lockedLineups) ? parsed.lockedLineups.length : 0;
      raidSummaryEl.innerHTML = `<span class="text-emerald-300 font-semibold">本機紀錄：</span>目前已有 <strong>${members.length}</strong> 位團員、<strong>${totalChars}</strong> 隻角色、<strong>${lockedCount}</strong> 團已鎖定陣容。`;
    } else {
      raidSummaryEl.innerHTML = `<span class="text-sky-300 font-semibold">首次使用 / 預設團隊：</span>進入排團分頁後將自動載入預設成員名單並可自由新增或匯入 JSON。`;
    }
  } catch (_) {
    raidSummaryEl.textContent = '點擊下方按鈕進入突襲王排團工具。';
  }

  const simSummaryEl = document.getElementById('simStatusSummary');
  const btnContinueSim = document.getElementById('btnContinueSim');
  try {
    const lastRaw = localStorage.getItem('artale_skill_sim_last_state');
    if (lastRaw) {
      const last = JSON.parse(lastRaw);
      const meta = PROFESSION_META.find(m => m.slug === last.slug);
      if (meta) {
        const verText = last.version === 'v1' ? 'V1 舊版' : 'V2 改版後';
        simSummaryEl.innerHTML = `<span class="text-emerald-300 font-semibold">上次模擬紀錄：</span><strong>${escapeHtml(meta.profKey)}</strong>（${escapeHtml(verText)}），共收錄 17 職業 266 項官方技能與平衡資料、161 組逐級對照。`;
        btnContinueSim.href = `simulator.html?prof=${encodeURIComponent(meta.slug)}&ver=${encodeURIComponent(last.version || 'v2')}`;
        btnContinueSim.textContent = `繼續模擬：${meta.shortName} →`;
      }
    }
  } catch (_) {}
}

function renderClassesDirectory() {
  const container = document.getElementById('classesDirectoryGrid');
  const groups = ['劍士', '法師', '弓箭手', '盜賊', '海盜', '皇家騎士團'];

  container.innerHTML = groups.map(groupName => {
    const isCygnus = groupName === '皇家騎士團';
    const members = PROFESSION_META.filter(m => m.group === groupName);
    const cards = members.map(meta => {
      const profData = allProfessionsData[meta.profKey];
      const patchProf = balancePatchV2Data[meta.slug];
      const patchSkills = patchProf ? patchProf.skills : [];
      const newCnt = patchSkills.filter(s => s.tags.includes('新增')).length;
      const delCnt = patchSkills.filter(s => s.tags.includes('刪除')).length;
      const renCnt = patchSkills.filter(s => s.oldName || s.tags.includes('名稱變更')).length;
      const adjCnt = patchSkills.length - newCnt - delCnt;
      const badgesHtml = meta.faction === 'cygnus'
        ? `<span class="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">👑 皇家新職 · ${patchSkills.length} 招技能</span>`
        : `
            ${newCnt > 0 ? `<span class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">新增 ${newCnt}</span>` : ''}
            ${renCnt > 0 ? `<span class="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">更名 ${renCnt}</span>` : ''}
            <span class="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">調整 ${adjCnt}</span>
            ${delCnt > 0 ? `<span class="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">刪除 ${delCnt}</span>` : ''}
          `;

      return `
        <div class="rounded-xl bg-[var(--background)] border ${isCygnus ? 'border-purple-500/35' : 'border-[var(--border)]'} p-3.5 flex flex-col justify-between gap-3 hover:border-slate-500 transition">
          <div class="flex items-start gap-3">
            <img src="${escapeHtml(profData?.emblemUrl || '')}" alt="" width="64" height="44" loading="lazy" onerror="this.src='${FALLBACK_ICON_SVG}'" style="--job-color: ${escapeHtml(meta.color || profData?.themeColor || '#d98a1f')}" class="prof-emblem-banner w-16 h-11 rounded-lg border border-[var(--border)] object-cover object-right shrink-0" />
            <div class="min-w-0 flex-1 space-y-1">
              <div class="text-sm font-bold text-[var(--foreground)] truncate">${escapeHtml(meta.profKey)}</div>
              <div class="flex flex-wrap gap-1 text-[10px] font-semibold">${badgesHtml}</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1.5 pt-2 border-t border-[var(--border)]/60">
            <a href="simulator.html?prof=${escapeHtml(meta.slug)}" class="text-center px-2 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition">🎯 技能模擬</a>
            <a href="simulator.html?prof=${escapeHtml(meta.slug)}&amp;view=patch" class="text-center px-2 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 hover:bg-sky-500/25 transition">📜 V2 改版</a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="space-y-2">
        <h3 class="text-xs font-bold uppercase tracking-wider ${isCygnus ? 'text-purple-300' : 'text-[var(--muted-foreground)]'} px-1">${isCygnus ? '👑 ' : ''}${escapeHtml(groupName)}系列</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">${cards}</div>
      </div>
    `;
  }).join('');
}

initThemeToggle();
initBackToTop();
loadLocalSummaries();
renderClassesDirectory();
