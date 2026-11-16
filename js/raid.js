const STORAGE_KEY = 'artale_raid_members_custom_v1';


const CLASSES = [
  { id: 'nl', name: '夜使者 (標)', short: '標賊', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { id: 'shad', name: '暗影神偷 (刀)', short: '刀賊', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40' },
  { id: 'bm', name: '箭神 (弓)', short: '箭神', role: 'SE_DPS', hasSE: true, isBishop: false, hasHB: false, badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'mm', name: '神射手 (弩)', short: '弩手', role: 'SE_DPS', hasSE: true, isBishop: false, hasHB: false, badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40' },
  { id: 'bs', name: '主教 / 祈禱', short: '主教', role: 'SUPPORT', hasSE: false, isBishop: true, hasHB: false, badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'il', name: '冰雷魔導士', short: '冰雷', role: 'MAGE', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
  { id: 'fp', name: '火毒魔導士', short: '火毒', role: 'MAGE', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
  { id: 'dk', name: '黑騎士 (火)', short: '黑騎(火)', role: 'HB_DPS', hasSE: false, isBishop: false, hasHB: true, badge: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { id: 'hero', name: '英雄 (戰士)', short: '英雄', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  { id: 'pala', name: '聖騎士 (騎士)', short: '聖騎士', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40' },
  { id: 'bucc', name: '拳霸 (打手)', short: '拳霸', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  { id: 'cors', name: '槍神 (槍手)', short: '槍神', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
  { id: 'sm', name: '聖魂劍士 (皇家)', short: '聖魂', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'fw', name: '烈焰巫師 (皇家)', short: '烈焰', role: 'MAGE', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
  { id: 'wb', name: '破風使者 (皇家)', short: '破風', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { id: 'nw', name: '暗夜行者 (皇家)', short: '暗夜', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { id: 'st', name: '閃雷悍將 (皇家)', short: '閃雷', role: 'DPS', hasSE: false, isBishop: false, hasHB: false, badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40' }
];

const CLASS_MAP = Object.fromEntries(CLASSES.map(c => [c.id, c]));

const BOSSES = [
  {
    id: 'zakum',
    name: '炎魔 (Zakum)',
    tag: '廢礦副本｜需 Lv.135+',
    tagClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    idealSize: 6,
    minSize: 4,
    minLevel: 135,
    desc: '最低等級限制：135 等以上。建議配置：1 主教(祈禱/補血/復活) + 1 弓/弩(會心之眼) + 1 黑騎(神聖之火) + 標賊/英雄/法師，並配置 1 位 🍁 楓葉祝福 20。',
    requireBishop: true,
    requireMage: false,
    requireSE: true,
    requireHB: true,
    preferMw20: true,
    allowDualBox: false
  },
  {
    id: 'pap',
    name: '拉圖斯 (Papulatus)',
    tag: '玩具城副本｜需 Lv.80+',
    tagClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    idealSize: 6,
    minSize: 2,
    minLevel: 80,
    desc: '最低等級限制：80 等以上。人數彈性高且可「最多 3 人都雙開」（例如 3 人各開 2 隻角色直接湊滿 6 角滿編）！平日人少或拆兩隊皆可輕鬆滿陣容（可免楓葉祝福 20）。',
    requireBishop: false,
    requireMage: false,
    requireSE: false,
    requireHB: false,
    preferMw20: false,
    allowDualBox: true
  },
  {
    id: 'hpap',
    name: '困難拉圖斯 (Hard Papulatus)',
    tag: '玩具城副本｜需 Lv.140+',
    tagClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    idealSize: 6,
    minSize: 6,
    minLevel: 140,
    desc: '最低等級限制：140 等以上。指定配置：1 主教 ＋ 1 冰雷或火毒（法師清場/控場），搭配會心之眼(弓/弩)、神聖之火(黑騎)、高單體爆發與 1 位 🍁 楓葉祝福 20！',
    requireBishop: true,
    requireMage: true,
    requireSE: true,
    requireHB: true,
    preferMw20: true,
    allowDualBox: false
  },
  {
    id: 'epinea',
    name: '蝴蝶王 (艾畢奈亞)',
    tag: '艾靈森林副本｜需 Lv.170+',
    tagClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    idealSize: 6,
    minSize: 6,
    minLevel: 170,
    desc: '最低等級限制：170 等以上。指定配置：必備 1 黑騎(火)、1~2 位標賊(夜使者)、1 弓/弩(會心之眼)，搭配高單體輸出與 1 位 🍁 楓葉祝福 20！',
    requireBishop: false,
    requireMage: false,
    requireSE: true,
    requireHB: true,
    requireBucc: false,
    requireShad: false,
    requireNL: true,
    preferMw20: true,
    allowDualBox: false
  },
  {
    id: 'krexel',
    name: '樹王 (克雷賽爾)',
    tag: '烏魯城副本｜需 Lv.170+',
    tagClass: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
    idealSize: 6,
    minSize: 6,
    minLevel: 170,
    desc: '最低等級限制：170 等以上（改版後門檻，入場需靈魂燈籠）。指定配置：必備至少 2 位冰雷/火毒（樹王左右打怪暈怪控場），搭配會心之眼(弓/弩)、神聖之火(黑騎)、高爆發打手與 1 位 🍁 楓葉祝福 20。',
    requireBishop: false,
    requireMage: true,
    requireSE: true,
    requireHB: true,
    preferMw20: true,
    allowDualBox: false
  },
  {
    id: 'horntail',
    name: '闇黑龍王 (Horntail)',
    tag: '遠征隊 12 人 (2 隊)｜需 Lv.160+ (劍士/拳霸/刀賊155+)',
    shortTag: '12人遠征｜需 Lv.155+/160+',
    tagClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    idealSize: 12,
    minSize: 6,
    isExpedition12: true,
    minLevel: 160,
    desc: '最低等級：建議 160+、劍士/拳霸/刀賊只需 155+。遠征隊編制：12 人拆成 2 隊協同作戰，必備兩火 (每隊各 1 黑騎)、1 箭神、1 神射手、1 拳霸、兩刀賊，每隊至少1刀賊或標賊，並盡量兩隊各配置 1 位 🍁 楓葉祝福 20，外找補齊必要職業後優先劍士、減少敏職（支援「2刀賊配拳霸同隊」或「兩隊各1刀賊」）！',
    requireBishop: false,
    requireMage: false,
    requireSE: true,
    requireHB: true,
    requireBucc: true,
    requireShad: true,
    preferMw20: true,
    allowDualBox: false
  }
];

const ALL_BOSS_IDS = BOSSES.map(b => b.id);
const BOSS_SHORT_MAP = {
  zakum: '炎魔',
  pap: '普拉',
  hpap: '困拉',
  epinea: '蝴蝶王',
  krexel: '樹王',
  horntail: '龍王'
};

function getClassLevel(member, cid) {
  if (member && member.classLevels && typeof member.classLevels[cid] === 'number') {
    return member.classLevels[cid];
  }
  return 140;
}

function getClassBosses(member, cid) {
  if (member && member.classBosses && Array.isArray(member.classBosses[cid])) {
    return member.classBosses[cid];
  }
  return ALL_BOSS_IDS;
}

function isClassEnabledForBoss(member, cid, bossOrId = state.selectedBossId) {
  if (!member || member.isPug) return true;
  const bId = typeof bossOrId === 'string'
    ? bossOrId
    : (bossOrId?.id || state.selectedBossId);
  if (!bId) return true;
  if (member.classBosses && Array.isArray(member.classBosses[cid])) {
    return member.classBosses[cid].includes(bId);
  }
  return true;
}

function hasClassMw20(member, cid) {
  return Boolean(member && !member.isPug && member.classMw20 && member.classMw20[cid]);
}

function bossNeedsMw20(bossOrId = state.selectedBossId) {
  const bObj = typeof bossOrId === 'string'
    ? BOSSES.find(b => b.id === bossOrId)
    : (bossOrId || BOSSES.find(b => b.id === state.selectedBossId));
  return bObj ? bObj.preferMw20 !== false : true;
}

const DAYS = [
  { id: 'mon', label: '週一', fullLabel: '星期一' },
  { id: 'tue', label: '週二', fullLabel: '星期二' },
  { id: 'wed', label: '週三', fullLabel: '星期三' },
  { id: 'thu', label: '週四', fullLabel: '星期四' },
  { id: 'fri', label: '週五', fullLabel: '星期五' },
  { id: 'sat', label: '週六', fullLabel: '星期六' },
  { id: 'sun', label: '週日', fullLabel: '星期日' }
];

const PERIODS = [
  { id: 'h14', label: '14:00 ~ 15:00', short: '14:00-15:00', timeRange: '14:00 ~ 15:00' },
  { id: 'h15', label: '15:00 ~ 16:00', short: '15:00-16:00', timeRange: '15:00 ~ 16:00' },
  { id: 'h16', label: '16:00 ~ 17:00', short: '16:00-17:00', timeRange: '16:00 ~ 17:00' },
  { id: 'h17', label: '17:00 ~ 18:00', short: '17:00-18:00', timeRange: '17:00 ~ 18:00' },
  { id: 'h18', label: '18:00 ~ 19:00', short: '18:00-19:00', timeRange: '18:00 ~ 19:00' },
  { id: 'h19', label: '19:00 ~ 20:00', short: '19:00-20:00', timeRange: '19:00 ~ 20:00' },
  { id: 'h20', label: '20:00 ~ 21:00', short: '20:00-21:00', timeRange: '20:00 ~ 21:00' },
  { id: 'h21', label: '21:00 ~ 22:00', short: '21:00-22:00', timeRange: '21:00 ~ 22:00' },
  { id: 'h22', label: '22:00 ~ 23:00', short: '22:00-23:00', timeRange: '22:00 ~ 23:00' },
  { id: 'h23', label: '23:00 ~ 24:00', short: '23:00-24:00', timeRange: '23:00 ~ 24:00' }
];

const ALL_DAY_HOURS = ['h14', 'h15', 'h16', 'h17', 'h18', 'h19', 'h20', 'h21', 'h22', 'h23'];
const EVENING_19_PLUS = ['h19', 'h20', 'h21', 'h22', 'h23'];
const EVENING_20_PLUS = ['h20', 'h21', 'h22', 'h23'];
const LATE_22_PLUS = ['h22', 'h23'];
const AFTERNOON_14_17 = ['h14', 'h15', 'h16'];

const LOCKED_LINEUPS_KEY = 'artale_raid_locked_lineups_v1';

function createDefaultMembers() {
  return [];
}

function loadMembers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return createDefaultMembers();
}

function saveMembers(members) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (e) {}
}

function loadLockedLineups() {
  try {
    const saved = localStorage.getItem(LOCKED_LINEUPS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveLockedLineups(list) {
  try {
    localStorage.setItem(LOCKED_LINEUPS_KEY, JSON.stringify(list));
  } catch (e) {}
}

let state = {
  members: loadMembers(),
  lockedLineups: loadLockedLineups(),
  lockExcludeMode: 'character', // 'character' = 排除該玩家已鎖定角色(分身仍可排其他團), 'member' = 排除整位玩家(一人限一團)
  selectedBossId: 'zakum',
  selectedPreset: 'custom',
  activeMemberIds: [],
  partyMode: 'single',
  requireBishop: true,
  requireMage: false,
  requireSE: true,
  requireHB: true,
  requireBucc: false,
  requireShad: false,
  requireNL: false,
  preferMw20: true,
  allowDualBox: false,
  allowPug: false,
  pugCount: 'auto',
  pugClass: 'auto',
  expandedGroupKey: null,
  showAllSplitPlans: false,
  plannerMode: 'single',
  selectedMultiJobUid: 'mb_init_1',
  multiBossQueue: [
    { uid: 'mb_init_1', bossId: 'zakum', slotKey: 'custom' },
    { uid: 'mb_init_2', bossId: 'zakum', slotKey: 'custom' },
    { uid: 'mb_init_3', bossId: 'pap', slotKey: 'custom' }
  ],
  multiBossResults: null
};

const RUN_COUNT_CN = { 1: '單', 2: '雙', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' };

function getRequestedRunCount(mode = state.partyMode) {
  const modeMap = {
    single: 1,
    tworuns: 2,
    threeruns: 3,
    fourruns: 4,
    fiveruns: 5
  };
  if (modeMap[mode]) return modeMap[mode];
  const n = Number(mode);
  if (Number.isFinite(n) && n >= 1) return Math.min(10, Math.round(n));
  return 1;
}

function runCountToPartyMode(count) {
  const n = Math.max(1, Math.min(10, Math.round(Number(count) || 1)));
  const reverseMap = { 1: 'single', 2: 'tworuns', 3: 'threeruns', 4: 'fourruns', 5: 'fiveruns' };
  return reverseMap[n] || String(n);
}

function setPartyRunCount(count) {
  const nextCount = Math.max(1, Math.min(10, Math.round(Number(count) || 1)));
  state.partyMode = runCountToPartyMode(nextCount);
  state.showAllSplitPlans = false;
  renderAll();
}

function getLockedUsage() {
  const lockedMemberIds = new Set();
  const lockedClassesByMember = new Map();
  const activeLineups = (state.lockedLineups || []).filter(l => l.enabled !== false);

  activeLineups.forEach(lineup => {
    if (state.lockExcludeMode === 'none') return;
    (lineup.members || []).forEach(entry => {
      if (entry.isPug || !entry.memberId) return;
      lockedMemberIds.add(entry.memberId);
      if (!lockedClassesByMember.has(entry.memberId)) {
        lockedClassesByMember.set(entry.memberId, []);
      }
      lockedClassesByMember.get(entry.memberId).push({
        classId: entry.classId,
        classShort: entry.classShort || CLASS_MAP[entry.classId]?.short || entry.classId,
        lineupId: lineup.id,
        lineupTitle: lineup.title,
        slotLabel: lineup.slotLabel,
        bossName: lineup.bossName
      });
    });
  });

  function isClassLocked(memberId, classId) {
    if (state.lockExcludeMode === 'member') {
      return lockedMemberIds.has(memberId);
    }
    const entries = lockedClassesByMember.get(memberId);
    if (!entries) return false;
    return entries.some(e => e.classId === classId);
  }

  function getClassLockEntries(memberId, classId) {
    const entries = lockedClassesByMember.get(memberId) || [];
    if (state.lockExcludeMode === 'member') return entries;
    return entries.filter(e => e.classId === classId);
  }

  function getAvailableClasses(member) {
    if (state.lockExcludeMode === 'member' && lockedMemberIds.has(member.id)) {
      return [];
    }
    return (member.classes || []).filter(cid => !isClassLocked(member.id, cid));
  }

  function isMemberFullyExcluded(member) {
    return getAvailableClasses(member).length === 0;
  }

  return {
    activeLineups,
    lockedMemberIds,
    lockedClassesByMember,
    isClassLocked,
    getClassLockEntries,
    getAvailableClasses,
    isMemberFullyExcluded
  };
}

function getEffectiveMembersForPlanning(memberList, bossOrId = state.selectedBossId) {
  const usage = getLockedUsage();
  const boss = typeof bossOrId === 'string'
    ? BOSSES.find(b => b.id === bossOrId)
    : (bossOrId || BOSSES.find(b => b.id === state.selectedBossId));
  const result = [];
  for (const m of memberList) {
    const availClasses = usage.getAvailableClasses(m).filter(cid => isClassEnabledForBoss(m, cid, boss));
    if (availClasses.length === 0) continue;
    const effectiveLocked = (m.lockedClass && availClasses.includes(m.lockedClass)) ? m.lockedClass : null;
    const hasManualPref = !!(m.manualPref && m.preferredClass && availClasses.includes(m.preferredClass));
    const eligibleAvail = availClasses.filter(cid => isClassEligibleForBoss(m, cid, boss));
    const effectivePref = hasManualPref
      ? m.preferredClass
      : (m.preferredClass && eligibleAvail.includes(m.preferredClass))
      ? m.preferredClass
      : (m.mainClass && eligibleAvail.includes(m.mainClass))
      ? m.mainClass
      : (eligibleAvail[0] || (m.mainClass && availClasses.includes(m.mainClass) ? m.mainClass : availClasses[0]));
    result.push({
      ...m,
      classes: availClasses,
      lockedClass: effectiveLocked,
      preferredClass: effectivePref,
      manualPref: hasManualPref
    });
  }
  return result;
}

function lockLineup(boss, slotKey, slotLabel, compSig, assignment, customSuffix = '') {
  const teamNum = state.lockedLineups.length + 1;
  const defaultTitle = `第 ${teamNum} 團${customSuffix ? ` (${customSuffix})` : ''}｜${boss.name}`;
  const newLock = {
    id: `lock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title: defaultTitle,
    bossId: boss.id,
    bossName: boss.name,
    slotKey: slotKey || state.selectedPreset || 'custom',
    slotLabel: slotLabel || '自訂時段',
    compSig,
    enabled: true,
    members: assignment.map(item => ({
      memberId: item.member.baseMemberId || item.member.id,
      memberName: item.member.name,
      baseName: item.member.baseName || item.member.name,
      classId: item.classId,
      classShort: item.classObj?.short || item.classId,
      className: item.classObj?.name || item.classId,
      badge: item.classObj?.badge || '',
      level: item.level || getClassLevel(item.member, item.classId),
      hasMw20: hasClassMw20(item.member, item.classId),
      isPug: !!item.member.isPug,
      isDualPrimary: !!item.isDualPrimary,
      isDualSecondary: !!item.isDualSecondary
    }))
  };
  state.lockedLineups.push(newLock);
  saveLockedLineups(state.lockedLineups);

  // Automatically uncheck members who now have 0 remaining unlocked characters
  const usage = getLockedUsage();
  state.activeMemberIds = state.activeMemberIds.filter(id => {
    const m = state.members.find(x => x.id === id);
    return m && !usage.isMemberFullyExcluded(m);
  });
  renderAll();
}

function createPugMembers(count = 1, minLevel = 140) {
  const pCount = Math.max(1, count);
  const lvl = Math.max(140, minLevel);
  const classLevels = Object.fromEntries(CLASSES.map(c => [c.id, lvl]));
  const pugs = [];

  for (let i = 1; i <= pCount; i++) {
    const isSpecific = (i === 1 && state.pugClass !== 'auto');
    const classes = isSpecific ? [state.pugClass] : CLASSES.map(c => c.id);
    pugs.push({
      id: `__pug_${i}__`,
      name: pCount === 1 ? '📢外找路人' : `📢外找路人#${i}`,
      classes,
      mainClass: classes[0],
      preferredClass: null,
      lockedClass: isSpecific ? state.pugClass : null,
      classLevels,
      priorityAttend: true,
      occasional: false,
      isPug: true
    });
  }
  return pugs;
}

function createPugMember(minLevel = 140) {
  return createPugMembers(1, minLevel)[0];
}

function applyPreset(presetKey) {
  state.selectedPreset = presetKey;
  state.showAllSplitPlans = false;
  const usage = getLockedUsage();
  if (presetKey !== 'custom') {
    const [dayId, periodId] = presetKey.split('_');
    if (dayId && periodId) {
      state.activeMemberIds = state.members
        .filter(m => m.slots[dayId] && m.slots[dayId].includes(periodId) && !usage.isMemberFullyExcluded(m))
        .map(m => m.id);
    }
  }
}

function renderPresetSlotOptions() {
  const select = document.getElementById('presetSlotSelect');
  const usage = getLockedUsage();
  const activeJob = state.plannerMode === 'multi' ? getActiveMultiBossJob() : null;
  const boss = BOSSES.find(b => b.id === (activeJob ? activeJob.bossId : state.selectedBossId));
  const allSlots = [];
  DAYS.forEach(day => {
    PERIODS.forEach(period => {
      const totalRaw = state.members.filter(m => m.slots[day.id] && m.slots[day.id].includes(period.id));
      const avail = getEffectiveMembersForPlanning(totalRaw, boss);
      const count = avail.length;
      const charCount = avail.reduce((acc, m) => acc + m.classes.length, 0);
      const mw20Count = avail.filter(m => m.classes.some(cid => hasClassMw20(m, cid) && isClassAllowedForMember(m, cid, boss))).length;
      const excludedCount = totalRaw.length - count;
      if (count >= 3 || totalRaw.length >= 3) {
        const key = `${day.id}_${period.id}`;
        const lockedHere = usage.activeLineups.filter(l => l.slotKey === key).length;
        const mw20Note = mw20Count > 0 ? `・🍁${mw20Count}` : '';
        const lockNote = lockedHere > 0 ? ` 🔒${lockedHere}團` : '';
        const exclNote = excludedCount > 0 ? `・排${excludedCount}` : '';
        allSlots.push({
          key,
          label: `${day.label} ${period.short}｜${count}人/${charCount}角${mw20Note}${exclNote}${lockNote}`,
          count
        });
      }
    });
  });

  const fullGroup = allSlots.filter(s => s.count >= 6);
  const midGroup = allSlots.filter(s => s.count >= 4 && s.count < 6);
  const smallGroup = allSlots.filter(s => s.count > 0 && s.count <= 3);

  const renderGroup = (title, items) => {
    if (items.length === 0) return '';
    return `<optgroup label="${title}">${items.map(s => `<option value="${s.key}">${s.label}</option>`).join('')}</optgroup>`;
  };

  select.innerHTML =
    renderGroup('🔥 熱門滿團時段（可用 6 人以上）', fullGroup) +
    renderGroup('⭐ 中型團時段（可用 4 ~ 5 人）', midGroup) +
    renderGroup('📅 小型/雙開團時段（可用 1 ~ 3 人）', smallGroup) +
    `<option value="custom">🛠️ 手動自由勾選出席人員</option>`;

  if (activeJob) {
    if (activeJob.slotKey !== 'custom' && !allSlots.some(s => s.key === activeJob.slotKey)) {
      activeJob.slotKey = 'custom';
    }
    select.value = activeJob.slotKey || 'custom';
    return;
  }

  if (state.selectedPreset !== 'custom' && !allSlots.some(s => s.key === state.selectedPreset)) {
    state.selectedPreset = allSlots[0] ? allSlots[0].key : 'custom';
  }
  select.value = state.selectedPreset;
}

state.activeMemberIds = state.members.filter(m => !getLockedUsage().isMemberFullyExcluded(m)).map(m => m.id);

function getCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  const withFirst = getCombinations(rest, k - 1).map(c => [first, ...c]);
  const withoutFirst = getCombinations(rest, k);
  return [...withFirst, ...withoutFirst];
}

function isHorntail155Class(cid) {
  return ['hero', 'pala', 'dk', 'bucc', 'shad'].includes(cid);
}
const isWarriorClass = isHorntail155Class;

function getMinLevelForClass(bossOrId, cid) {
  const bObj = typeof bossOrId === 'string'
    ? BOSSES.find(b => b.id === bossOrId)
    : (bossOrId || BOSSES.find(b => b.id === state.selectedBossId));
  if (bObj && bObj.id === 'horntail' && isHorntail155Class(cid)) {
    return 155;
  }
  return bObj ? (bObj.minLevel || 1) : 1;
}

function isClassEligibleForBoss(member, cid, bossOrId) {
  const req = getMinLevelForClass(bossOrId, cid);
  return getClassLevel(member, cid) >= req;
}

function isClassAllowedForMember(member, cid, bossOrId) {
  if (member.isPug) return true;
  if (!isClassEnabledForBoss(member, cid, bossOrId)) return false;
  if (member.lockedClass === cid) return true;
  if (member.manualPref && member.preferredClass === cid) return true;
  return isClassEligibleForBoss(member, cid, bossOrId);
}

function pickSmartPugClassesForParty(guildAssignment, pugMembers, boss, hintTargets = null) {
  if (pugMembers.length === 0) return [[]];
  const bId = boss ? boss.id : state.selectedBossId;

  // If only 1 PUG and not locked, allow exploring key candidate classes so single-party view shows rich options
  if (pugMembers.length === 1 && !hintTargets) {
    const p0 = pugMembers[0];
    if (p0.lockedClass) return [[p0.lockedClass]];
    const candidatePool = bId === 'horntail'
      ? ['dk', 'bm', 'mm', 'bucc', 'shad', 'hero', 'pala', 'bs']
      : bId === 'krexel'
      ? ['il', 'fp', 'dk', 'bm', 'mm', 'nl', 'hero', 'bs']
      : bId === 'epinea'
      ? ['dk', 'nl', 'bm', 'mm', 'hero', 'shad', 'cors', 'bucc', 'bs']
      : ['bs', 'dk', 'bm', 'mm', 'il', 'fp', 'nl', 'hero', 'bucc', 'shad'];
    return candidatePool.filter(c => p0.classes.includes(c)).map(c => [c]);
  }

  // For multiple PUGs (or guided party target filling), deterministically compute needed classes + top DPS variants
  const counts = {};
  CLASSES.forEach(c => counts[c.id] = 0);
  guildAssignment.forEach(a => counts[a.classId] = (counts[a.classId] || 0) + 1);

  const neededQueue = [];
  if (hintTargets) {
    // Explicit role targets passed from 2-party Horntail coordinator
    for (const reqCid of hintTargets) {
      neededQueue.push(reqCid);
    }
  } else if (bId === 'horntail') {
    if (counts.dk < 1) neededQueue.push('dk');
    if (counts.bm + counts.mm < 1) neededQueue.push('bm');
    if (counts.bucc < 1) neededQueue.push('bucc');
    if (counts.shad < 1) neededQueue.push('shad');
  } else if (bId === 'krexel') {
    const mages = counts.il + counts.fp;
    for (let m = mages; m < 2; m++) neededQueue.push(m === 0 ? 'il' : 'fp');
    if (counts.dk < 1) neededQueue.push('dk');
    if (counts.bm + counts.mm < 1) neededQueue.push('bm');
  } else if (bId === 'epinea') {
    if (state.requireHB && counts.dk < 1) neededQueue.push('dk');
    if (state.requireSE && (counts.bm + counts.mm) < 1) neededQueue.push('bm');
    if (state.requireNL) {
      for (let n = counts.nl; n < 2; n++) neededQueue.push('nl');
    }
    if (state.requireBishop && counts.bs < 1) neededQueue.push('bs');
    if (state.requireShad && counts.shad < 1) neededQueue.push('shad');
    if (state.requireBucc && counts.bucc < 1) neededQueue.push('bucc');
  } else {
    if (state.requireBishop && counts.bs < 1) neededQueue.push('bs');
    if (state.requireMage && (counts.il + counts.fp) < 1) neededQueue.push('il');
    if (state.requireHB && counts.dk < 1) neededQueue.push('dk');
    if (state.requireSE && (counts.bm + counts.mm) < 1) neededQueue.push('bm');
    if (state.requireBucc && counts.bucc < 1) neededQueue.push('bucc');
    if (state.requireShad && counts.shad < 1) neededQueue.push('shad');
    if (state.requireNL && counts.nl < 1) neededQueue.push('nl');
  }

  const buildSeq = (primaryDps, secondaryDps) => {
    const q = [...neededQueue];
    const chosen = [];
    for (let i = 0; i < pugMembers.length; i++) {
      const pm = pugMembers[i];
      if (pm.lockedClass) {
        chosen.push(pm.lockedClass);
        const qIdx = q.indexOf(pm.lockedClass);
        if (qIdx !== -1) q.splice(qIdx, 1);
      } else if (q.length > 0) {
        chosen.push(q.shift());
      } else {
        chosen.push((i % 2 === 0) ? primaryDps : secondaryDps);
      }
    }
    return chosen;
  };

  // Horntail: fill required support roles first, then recruit warriors for spare DPS slots.
  const seq1 = bId === 'horntail' ? buildSeq('hero', 'hero') : buildSeq('nl', 'hero');
  if (hintTargets) return [seq1];
  const seq2 = bId === 'horntail' ? buildSeq('hero', 'pala') : buildSeq('hero', 'nl');
  const sig1 = seq1.slice().sort().join(',');
  const sig2 = seq2.slice().sort().join(',');
  return sig1 === sig2 ? [seq1] : [seq1, seq2];
}

function generateAssignmentsForParty(partyMembers, minLevel = 1, boss = null, hintTargets = null) {
  const bObj = boss || BOSSES.find(b => b.id === boss || b.id === state.selectedBossId);
  const realMembers = partyMembers.filter(m => !m.isPug);
  const pugMembers = partyMembers.filter(m => m.isPug);
  const results = [];

  function backtrack(idx, currentAssignment) {
    if (idx === realMembers.length) {
      if (pugMembers.length === 0) {
        results.push([...currentAssignment]);
        return;
      }
      const pugClassSeqs = pickSmartPugClassesForParty(currentAssignment, pugMembers, bObj, hintTargets);
      for (const seq of pugClassSeqs) {
        const fullAsn = [...currentAssignment];
        for (let i = 0; i < pugMembers.length; i++) {
          const pm = pugMembers[i];
          const cid = seq[i];
          fullAsn.push({ member: pm, classId: cid, classObj: CLASS_MAP[cid], level: getClassLevel(pm, cid) });
        }
        results.push(fullAsn);
      }
      return;
    }
    const member = realMembers[idx];
    const eligibleClasses = member.classes.filter(cid => isClassAllowedForMember(member, cid, bObj));
    const allowedClasses = (member.lockedClass && eligibleClasses.includes(member.lockedClass))
      ? [member.lockedClass]
      : eligibleClasses;
    for (const cid of allowedClasses) {
      currentAssignment.push({ member, classId: cid, classObj: CLASS_MAP[cid], level: getClassLevel(member, cid) });
      backtrack(idx + 1, currentAssignment);
      currentAssignment.pop();
    }
  }
  backtrack(0, []);
  return results;
}

function generateDualBoxAssignmentsForParty(partyMembers, exactDualCount = null, minLevel = 1, boss = null) {
  const bObj = boss || BOSSES.find(b => b.id === boss || b.id === state.selectedBossId);
  if (partyMembers.length === 0 || partyMembers.length >= 6) return [];
  const maxDualBoxers = Math.min(3, 6 - partyMembers.length);
  const eligibleDualIndices = [];
  partyMembers.forEach((m, idx) => {
    if (m.isPug) return;
    const eligibleClasses = m.classes.filter(cid => isClassAllowedForMember(m, cid, bObj));
    if (eligibleClasses.length >= 2) eligibleDualIndices.push(idx);
  });
  if (eligibleDualIndices.length === 0) return [];

  const results = [];
  const maxK = Math.min(maxDualBoxers, eligibleDualIndices.length);
  const minK = exactDualCount !== null ? exactDualCount : 1;
  const topK = exactDualCount !== null ? Math.min(exactDualCount, maxK) : maxK;

  for (let k = topK; k >= minK; k--) {
    if (k < 1 || k > maxK) continue;
    const dualIndexSets = getCombinations(eligibleDualIndices, k);
    for (const dualIndices of dualIndexSets) {
      const dualSet = new Set(dualIndices);

      function backtrack(idx, currentAssignment) {
        if (idx === partyMembers.length) {
          results.push([...currentAssignment]);
          return;
        }
        const member = partyMembers[idx];
        const eligibleClasses = member.classes.filter(cid => isClassAllowedForMember(member, cid, bObj));
        if (dualSet.has(idx)) {
          const classPairs = getCombinations(eligibleClasses, 2).filter(([c1, c2]) => {
            if (member.lockedClass && eligibleClasses.includes(member.lockedClass)) {
              return c1 === member.lockedClass || c2 === member.lockedClass;
            }
            return true;
          });
          for (const [c1, c2] of classPairs) {
            const primaryCid = (member.lockedClass === c2 || (!member.lockedClass && member.preferredClass === c2)) ? c2 : c1;
            const secondaryCid = primaryCid === c1 ? c2 : c1;
            const dualCloneMember = {
              ...member,
              baseMemberId: member.id,
              name: `${member.name}(雙開)`,
              baseName: member.name,
              isDualClone: true
            };
            currentAssignment.push({
              member,
              classId: primaryCid,
              classObj: CLASS_MAP[primaryCid],
              level: getClassLevel(member, primaryCid),
              isDualPrimary: true,
              dualPartnerShort: CLASS_MAP[secondaryCid]?.short || secondaryCid
            });
            currentAssignment.push({
              member: dualCloneMember,
              classId: secondaryCid,
              classObj: CLASS_MAP[secondaryCid],
              level: getClassLevel(member, secondaryCid),
              isDualSecondary: true,
              primaryShort: CLASS_MAP[primaryCid]?.short || primaryCid
            });
            backtrack(idx + 1, currentAssignment);
            currentAssignment.pop();
            currentAssignment.pop();
          }
        } else {
          const allowedClasses = (member.lockedClass && eligibleClasses.includes(member.lockedClass))
            ? [member.lockedClass]
            : eligibleClasses;
          for (const cid of allowedClasses) {
            currentAssignment.push({ member, classId: cid, classObj: CLASS_MAP[cid], level: getClassLevel(member, cid) });
            backtrack(idx + 1, currentAssignment);
            currentAssignment.pop();
          }
        }
      }

      backtrack(0, []);
    }
  }

  return results;
}

function scoreAssignment(assignment, boss, options = {}) {
  const { isSplitSubParty = false } = options;
  let bishops = 0;
  let seCount = 0;
  let hbCount = 0;
  let physicalDps = 0;
  let mageDps = 0;
  let nlCount = 0;
  let heroCount = 0;
  let buccCount = 0;
  let shadCount = 0;
  let bmCount = 0;
  let mmCount = 0;
  let pureNlCount = 0;
  let mw20Count = 0;
  const mw20Members = [];

  for (const item of assignment) {
    const cid = item.classId;
    if (hasClassMw20(item.member, cid)) {
      mw20Count++;
      mw20Members.push(`${item.member.baseName || item.member.name}-${CLASS_MAP[cid]?.short || cid}`);
    }
    if (cid === 'bs') bishops++;
    if (cid === 'bm') {
      bmCount++;
      seCount++;
      physicalDps++;
    }
    if (cid === 'mm') {
      mmCount++;
      seCount++;
      physicalDps++;
    }
    if (cid === 'dk') {
      hbCount++;
      physicalDps++;
    }
    if (cid === 'nl') {
      pureNlCount++;
      nlCount++;
      physicalDps++;
    }
    if (cid === 'cors') {
      nlCount++;
      physicalDps++;
    }
    if (cid === 'hero' || cid === 'pala') {
      heroCount++;
      physicalDps++;
    }
    if (cid === 'bucc') {
      buccCount++;
      heroCount++;
      physicalDps++;
    }
    if (cid === 'shad') {
      shadCount++;
      heroCount++;
      physicalDps++;
    }
    if (cid === 'il' || cid === 'fp') {
      mageDps++;
    }
  }

  if (state.requireBishop) {
    if (boss.id === 'hpap') {
      if (bishops !== 1) return null;
    } else if (bishops < 1) {
      return null;
    }
  }
  if (state.requireMage) {
    if (boss.id === 'hpap') {
      if (mageDps !== 1) return null;
    } else if (boss.id === 'krexel') {
      if (mageDps < 2) return null;
    } else if (mageDps < 1) {
      return null;
    }
  }
  // Every Horntail party needs a Shadower or Night Lord (Corsair does not count).
  if (boss.id === 'horntail' && !assignment.some(x => x.classId === 'shad' || x.classId === 'nl')) return null;
  if (state.requireSE && seCount < 1) return null;
  if (state.requireHB && hbCount < 1) return null;
  if (state.requireNL && pureNlCount < 1) return null;
  // For Horntail 12-person split, 1 Buccaneer and 2 Shadowers are checked at expedition level (since 2 Shadowers can both be in the Buccaneer party)
  if (state.requireShad && !(isSplitSubParty && boss.id === 'horntail') && shadCount < 1) return null;
  if (state.requireBucc && !(isSplitSubParty && boss.id === 'horntail') && buccCount < 1) return null;

  let score = 50;
  const tags = [];

  if (boss.id === 'horntail') {
    if (hbCount === 1) {
      score += 30;
      tags.push('1 黑騎士 (神聖之火防秒殺)');
    } else if (hbCount > 1) {
      score += 18;
      tags.push(`${hbCount} 黑騎士 (神聖之火)`);
    }
    if (bmCount >= 1 && mmCount >= 1) {
      score += 24;
      tags.push('箭神 + 神射手 (雙會心)');
    } else if (bmCount >= 1) {
      score += 26;
      tags.push('1 箭神 (會心之眼)');
    } else if (mmCount >= 1) {
      score += 26;
      tags.push('1 神射手 (會心之眼)');
    }
    if (seCount >= 1) {
      const seBeneficiaries = nlCount + heroCount + hbCount + seCount;
      score += seBeneficiaries * 5;
    }
    if (buccCount === 1) {
      score += 24;
      tags.push('1 拳霸 (時間置換 Time Leap)');
    } else if (buccCount > 1) {
      score += 14;
      tags.push(`${buccCount} 拳霸 (時間置換)`);
    }
    if (shadCount === 1) {
      score += 22;
      tags.push('1 刀賊 (煙霧彈防護)');
    } else if (shadCount > 1) {
      score += buccCount >= 1 ? 46 : 34;
      tags.push(buccCount >= 1 ? `★ ${shadCount} 刀賊 + 拳霸同隊 (時間置換雙煙霧彈)` : `${shadCount} 刀賊 (雙煙霧彈)`);
    }
    if (nlCount + (heroCount - buccCount - shadCount) >= 1) {
      score += (nlCount + (heroCount - buccCount - shadCount)) * 10;
      tags.push('高單體遠征輸出');
    }
    if (bishops === 1) {
      score += state.requireBishop ? 20 : 8;
      tags.push('1 主教 (祈禱/補血)');
    } else if (bishops > 1) {
      score -= 15;
      tags.push(`${bishops} 主教`);
    }
  } else if (boss.id === 'krexel') {
    if (mageDps >= 2) {
      score += 36;
      tags.push(`★ ${mageDps} 法師 (樹王左右打怪暈怪控場)`);
    } else if (mageDps === 1) {
      score += 15;
      tags.push('1 法師 (冰雷/火毒)');
    }
    if (seCount >= 1) {
      const seBeneficiaries = nlCount + heroCount + hbCount + seCount;
      score += 22 + seBeneficiaries * 5;
      tags.push(`會心之眼 (強化 ${seBeneficiaries} 物理職)`);
    }
    if (hbCount >= 1) {
      score += 22;
      tags.push('神聖之火 (全隊+60%血魔防秒殺)');
    }
    if (nlCount + heroCount >= 2) {
      score += 15;
      tags.push('主力高單體輸出');
    }
    if (bishops === 1) {
      score += state.requireBishop ? 20 : 8;
      tags.push('1 主教輔助 (非必備)');
    } else if (bishops > 1) {
      score -= 15;
      tags.push(`${bishops} 主教`);
    }
  } else if (boss.id === 'epinea') {
    if (pureNlCount >= 2) {
      score += 38;
      tags.push(`★ ${pureNlCount} 標賊 (蝴蝶王雙標主力爆發)`);
    } else if (pureNlCount === 1) {
      score += 28;
      tags.push('★ 1 標賊 (蝴蝶王必備主力輸出)');
    }
    if (hbCount >= 1) {
      score += 28;
      tags.push('神聖之火 (1火黑騎必備防秒殺)');
    }
    if (seCount >= 1) {
      const seBeneficiaries = nlCount + heroCount + hbCount + seCount;
      score += 26 + seBeneficiaries * 6;
      tags.push(`會心之眼 (強化 ${seBeneficiaries} 物理職)`);
    }
    if (shadCount >= 1) {
      score += 16;
      tags.push(`${shadCount} 刀賊 (煙霧彈減壓)`);
    }
    if (nlCount + heroCount >= 2) {
      score += (nlCount + heroCount) * 8;
      tags.push('高單體輸出');
    }
    if (bishops === 1) {
      score += state.requireBishop ? 20 : 8;
      tags.push('1 主教 (祈禱/補血)');
    } else if (bishops > 1) {
      score -= 15;
      tags.push(`${bishops} 主教`);
    }
  } else {
    if (bishops === 1) {
      score += 22;
      tags.push('1 主教 (祈禱/復活/補血)');
    } else if (bishops > 1) {
      score += 10;
      tags.push(`${bishops} 主教`);
    }

    if (mageDps === 1) {
      score += 18;
      tags.push('1 法師 (冰雷/火毒)');
    } else if (mageDps > 1) {
      score += 12;
      tags.push(`${mageDps} 法師`);
    }

    if (seCount >= 1) {
      score += 20;
      const seBeneficiaries = nlCount + heroCount + hbCount + seCount;
      score += seBeneficiaries * 6;
      tags.push(`會心之眼 (強化 ${seBeneficiaries} 物理職)`);
    }
    if (hbCount >= 1) {
      score += 18;
      tags.push('神聖之火 (全隊+60%血魔防秒殺)');
    }

    if (boss.id === 'zakum') {
      if (mageDps >= 1) score += 10;
      if (hbCount >= 1) score += 8;
      if (bishops === 1 && seCount >= 1) score += 12;
      if (bishops > 1) score -= 15;
    } else if (boss.id === 'hpap') {
      if (bishops === 1 && mageDps === 1) {
        score += 25;
        tags.unshift('★ 1主教 + 1法師(冰雷/火毒) 標準配置');
      }
      if (hbCount >= 1) score += 16;
      if (nlCount + heroCount + hbCount >= 2 && seCount >= 1) {
        score += 15;
        tags.push('高單體爆發');
      }
    } else if (boss.id === 'pap') {
      if (nlCount + heroCount + hbCount >= 1 && seCount >= 1) score += 12;
      if (bishops === 1) score += 10;
      score += assignment.length * 4;
    }
  }

  if (bishops >= 2) score -= 20;
  if (seCount >= 3) score -= 10;

  if (state.preferMw20) {
    if (mw20Count === 1) {
      score += 45;
      tags.push(`🍁 楓葉祝福20 (${mw20Members.join('、')})`);
    } else if (mw20Count >= 2) {
      score += 45 - (mw20Count - 1) * 18;
      tags.push(`🍁 楓葉祝福20×${mw20Count} (${mw20Members.join('、')})`);
    } else {
      tags.push('⚠️ 無楓葉祝福20');
    }
  } else if (mw20Count >= 1) {
    tags.push(`🍁 楓葉祝福20${mw20Count > 1 ? `×${mw20Count}` : ''} (${mw20Members.join('、')})`);
  }

  const dualSecList = assignment.filter(a => a.isDualSecondary);
  const dualCount = dualSecList.length;
  const isDualBox = dualCount > 0;
  const humanCount = assignment.length - dualCount;
  let dualBoxSummary = null;
  if (isDualBox) {
    const dualDetail = dualSecList.map(d => `${d.member.baseName}(${d.primaryShort}+${d.classObj.short})`).join('、');
    dualBoxSummary = `🖥️ ${dualCount}人雙開【${humanCount}人控${assignment.length}角】：${dualDetail}`;
    tags.unshift(dualBoxSummary);
    if (boss.id === 'pap') score += dualCount * 5;
  }

  const pugItems = assignment.filter(a => a.member.isPug);
  if (pugItems.length > 0) {
    score -= pugItems.length * 20;
  }
  if (boss.id === 'horntail') {
    // Prefer warrior recruits over additional ranged DEX jobs; required roles remain valid.
    const warriorPugs = pugItems.filter(p => ['hero', 'pala', 'dk'].includes(p.classId)).length;
    const dexPugs = pugItems.filter(p => ['nl', 'bm', 'mm', 'cors'].includes(p.classId)).length;
    score += warriorPugs * 8 - dexPugs * 12;
    if (warriorPugs > 0) tags.push('龍王外找優先劍士 (減少敏職)');
  }
  let pugSummary = null;
  if (pugItems.length > 0) {
    pugSummary = `📢 外找 ${pugItems.length} 位：${pugItems.map(p => p.classObj.name).join('、')}`;
    tags.unshift(pugSummary);
  }

  let prefMatchCount = 0;
  let levelSum = 0;
  for (const item of assignment) {
    levelSum += (item.level || getClassLevel(item.member, item.classId));
    if (!item.isDualSecondary && !item.member.isPug && item.member.preferredClass && item.classId === item.member.preferredClass) {
      prefMatchCount++;
    }
  }
  const avgLevel = assignment.length > 0 ? levelSum / assignment.length : 140;
  score += Math.round((avgLevel - 140) * 0.05 * 100) / 100;

  const countMap = {};
  CLASSES.forEach(c => countMap[c.id] = 0);
  assignment.forEach(a => countMap[a.classId]++);
  const baseSig = CLASSES
    .filter(c => countMap[c.id] > 0)
    .map(c => `${c.short}×${countMap[c.id]}`)
    .join(' + ');
  let compSig = isDualBox ? `${baseSig} 【${humanCount}人控${assignment.length}角｜${dualCount}人雙開】` : baseSig;
  if (pugItems.length > 0) {
    compSig += ` 【📢外找：${pugItems.map(p => p.classObj.short).join('+')}】`;
  }

  return {
    assignment,
    score,
    prefMatchCount,
    isDualBox,
    dualCount,
    humanCount,
    dualBoxSummary,
    pugSummary,
    tags,
    bishops,
    seCount,
    physicalDps,
    mageDps,
    mw20Count,
    mw20Members,
    compSig,
    countMap
  };
}

function computeAllSinglePartyOptions() {
  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const minLevel = boss?.minLevel || 1;
  const rawCheckedMembers = state.members.filter(m => state.activeMemberIds.includes(m.id));
  const allActiveMembers = getEffectiveMembersForPlanning(rawCheckedMembers);
  const activeMembers = allActiveMembers.filter(m => m.classes.some(cid => isClassAllowedForMember(m, cid, boss)));
  if (activeMembers.length === 0 && !state.allowPug) return { groups: [], totalAssignments: 0, activeMembers: allActiveMembers, mw20FallbackUsed: false };

  const mustIncludeIds = activeMembers.filter(m => m.priorityAttend).map(m => m.id);
  const validScored = [];

  if (state.allowPug) {
    let pCountsToTry;
    if (state.pugCount === 'auto') {
      if (activeMembers.length >= 6) {
        pCountsToTry = [0, 1, 2];
      } else {
        const basePugCount = Math.max(1, 6 - activeMembers.length);
        pCountsToTry = basePugCount < 5 ? [basePugCount, basePugCount + 1] : [basePugCount];
      }
    } else {
      pCountsToTry = [Math.min(5, Math.max(1, Number(state.pugCount) || 1))];
    }

    for (let idxP = 0; idxP < pCountsToTry.length; idxP++) {
      const pCount = pCountsToTry[idxP];
      if (state.pugCount === 'auto' && idxP > 0 && activeMembers.length < 6 && validScored.length > 0) {
        break;
      }
      const guildSlots = Math.min(Math.max(0, 6 - pCount), activeMembers.length);
      if (state.pugCount === 'auto' && mustIncludeIds.length > guildSlots && mustIncludeIds.length <= Math.min(6, activeMembers.length) && validScored.length > 0) {
        continue;
      }
      const pugMembers = pCount > 0 ? createPugMembers(pCount, minLevel) : [];
      const rawPugSubsets = getCombinations(activeMembers, guildSlots);
      const pugMemberSubsets = mustIncludeIds.length > 0 && mustIncludeIds.length <= guildSlots
        ? rawPugSubsets.filter(sub => {
            const ids = new Set(sub.map(m => m.id));
            return mustIncludeIds.every(reqId => ids.has(reqId));
          })
        : rawPugSubsets;

      for (const subset of pugMemberSubsets) {
        const partyWithPug = [...subset, ...pugMembers];
        const rawAssignments = generateAssignmentsForParty(partyWithPug, minLevel, boss);
        for (const asn of rawAssignments) {
          const evaluated = scoreAssignment(asn, boss);
          if (evaluated) validScored.push(evaluated);
        }
      }
    }
  } else {
    const targetSize = Math.min(6, activeMembers.length);
    if (targetSize === 0) return { groups: [], totalAssignments: 0, activeMembers: allActiveMembers, mw20FallbackUsed: false };
    const rawSubsets = getCombinations(activeMembers, targetSize);
    const memberSubsets = mustIncludeIds.length > 0 && mustIncludeIds.length <= targetSize
      ? rawSubsets.filter(sub => {
          const ids = new Set(sub.map(m => m.id));
          return mustIncludeIds.every(reqId => ids.has(reqId));
        })
      : rawSubsets;

    for (const subset of memberSubsets) {
      const rawAssignments = generateAssignmentsForParty(subset, minLevel, boss);
      for (const asn of rawAssignments) {
        const evaluated = scoreAssignment(asn, boss);
        if (evaluated) validScored.push(evaluated);
      }
    }
  }

  if (state.allowDualBox) {
    const minH = Math.max(1, Math.min(3, activeMembers.length));
    const maxH = Math.min(state.allowPug ? 4 : 5, activeMembers.length);
    for (let hSize = minH; hSize <= maxH; hSize++) {
      const rawDualSubsets = getCombinations(activeMembers, hSize);
      const dualMemberSubsets = mustIncludeIds.length > 0 && mustIncludeIds.length <= hSize
        ? rawDualSubsets.filter(sub => {
            const ids = new Set(sub.map(m => m.id));
            return mustIncludeIds.every(reqId => ids.has(reqId));
          })
        : rawDualSubsets;

      const effectiveTotal = activeMembers.length + (state.allowPug ? 1 : 0);
      const requiredDualCount = effectiveTotal >= 6 ? (6 - hSize - (state.allowPug ? 1 : 0)) : null;
      for (const subset of dualMemberSubsets) {
        const partyPool = state.allowPug ? [...subset, createPugMember(minLevel)] : subset;
        const dualAssignments = generateDualBoxAssignmentsForParty(partyPool, requiredDualCount, minLevel, boss);
        for (const asn of dualAssignments) {
          const evaluated = scoreAssignment(asn, boss);
          if (evaluated) validScored.push(evaluated);
        }
      }
    }
  }

  let mw20FallbackUsed = false;
  let filteredScored = validScored;
  if (state.preferMw20 && validScored.length > 0) {
    const withMw20 = validScored.filter(item => item.mw20Count >= 1);
    if (withMw20.length > 0) {
      filteredScored = withMw20;
    } else {
      mw20FallbackUsed = true;
    }
  }

  const groupMap = new Map();
  for (const item of filteredScored) {
    if (!groupMap.has(item.compSig)) {
      groupMap.set(item.compSig, {
        compSig: item.compSig,
        score: item.score,
        maxPrefMatch: item.prefMatchCount,
        isDualBox: item.isDualBox,
        tags: item.tags,
        bishops: item.bishops,
        seCount: item.seCount,
        mw20Count: item.mw20Count,
        countMap: item.countMap,
        variants: []
      });
    }
    const g = groupMap.get(item.compSig);
    if (item.prefMatchCount > g.maxPrefMatch) g.maxPrefMatch = item.prefMatchCount;
    const occasionalCount = item.assignment.filter(x => !x.isDualSecondary && x.member.occasional).length;
    g.variants.push({ ...item, occasionalCount });
  }

  const getMw20VariantRank = (v) => {
    if (!state.preferMw20) return 0;
    if (v.mw20Count === 1) return 2;
    if (v.mw20Count > 1) return 1;
    return 0;
  };

  const groups = Array.from(groupMap.values());
  groups.forEach(g => {
    g.variants.sort((a, b) =>
      (getMw20VariantRank(b) - getMw20VariantRank(a)) ||
      (b.score - a.score) ||
      (a.occasionalCount - b.occasionalCount) ||
      (b.prefMatchCount - a.prefMatchCount)
    );
    const bestVariant = g.variants[0];
    if (bestVariant) {
      g.score = bestVariant.score;
      g.tags = bestVariant.tags;
      g.mw20Count = bestVariant.mw20Count;
    }
  });
  groups.sort((a, b) =>
    (b.score + b.maxPrefMatch * 4) - (a.score + a.maxPrefMatch * 4) ||
    b.maxPrefMatch - a.maxPrefMatch ||
    b.variants.length - a.variants.length
  );

  return {
    groups,
    totalAssignments: filteredScored.length,
    activeMembers,
    mw20FallbackUsed
  };
}

function selectHorntailGuildPool(guildMembers, maxSlots, boss) {
  if (guildMembers.length <= maxSlots) return [...guildMembers];
  const canPlay = (m, cid) => m.classes.includes(cid) && isClassAllowedForMember(m, cid, boss);
  const baseRank = (m) => {
    const pri = m.priorityAttend ? 1000 : 0;
    const manual = (m.lockedClass || m.manualPref) ? 300 : 0;
    const maxLvl = Math.max(...m.classes.map(c => getClassLevel(m, c)));
    return pri + manual + maxLvl * 0.1;
  };
  const sorted = [...guildMembers].sort((a, b) => baseRank(b) - baseRank(a));
  const picked = [];
  const pickedIds = new Set();
  const tryPick = (predicate, limit) => {
    let count = 0;
    for (const m of sorted) {
      if (picked.length >= maxSlots || count >= limit) break;
      if (!pickedIds.has(m.id) && predicate(m)) {
        picked.push(m);
        pickedIds.add(m.id);
        count++;
      }
    }
  };
  // 1. Must-attend members first
  tryPick(m => m.priorityAttend, maxSlots);
  // 2. Reserve critical Horntail quotas (2 dk, 1 bm, 1 mm, 1 bucc, 2 shad)
  tryPick(m => canPlay(m, 'dk'), 2);
  tryPick(m => canPlay(m, 'bm'), 1);
  tryPick(m => canPlay(m, 'mm'), 1);
  // If either bm or mm was missing, ensure at least 2 total bow/xbow if available
  const sePicked = picked.filter(m => canPlay(m, 'bm') || canPlay(m, 'mm')).length;
  if (sePicked < 2) tryPick(m => canPlay(m, 'bm') || canPlay(m, 'mm'), 2 - sePicked);
  tryPick(m => canPlay(m, 'bucc'), 1);
  tryPick(m => canPlay(m, 'shad'), 2);
  // 2.5 Reserve at least 2 members carrying Maple Warrior 20 so each party gets 1
  if (state.preferMw20) {
    const hasEligibleMw20 = (m) => m.classes.some(c => hasClassMw20(m, c) && isClassAllowedForMember(m, c, boss));
    const mw20Picked = picked.filter(hasEligibleMw20).length;
    if (mw20Picked < 2) {
      tryPick(hasEligibleMw20, 2 - mw20Picked);
    }
  }
  // 3. Prefer main single-target DPS before duplicate supports or optional bishops
  tryPick(m => canPlay(m, 'nl') || canPlay(m, 'hero') || canPlay(m, 'cors') || canPlay(m, 'pala'), maxSlots);
  // 4. Fill any remaining slots with highest ranked eligible members
  tryPick(m => m.classes.some(c => isClassAllowedForMember(m, c, boss)), maxSlots);
  tryPick(() => true, maxSlots);
  return picked.slice(0, maxSlots);
}

function getMultiPartyMw20Bonus(parties) {
  if (!Array.isArray(parties) || parties.length < 2) return 0;
  const coveredRuns = parties.filter(p => (p?.mw20Count || 0) >= 1).length;
  const totalMw20Chars = parties.reduce((sum, p) => sum + (p?.mw20Count || 0), 0);
  if (totalMw20Chars === 0) return 0;
  if (parties.length === 2) {
    if (coveredRuns === 2) return 60;
    if (totalMw20Chars >= 2) return -35;
    return coveredRuns === 1 ? 20 : 0;
  }
  return coveredRuns * 60 - Math.max(0, totalMw20Chars - coveredRuns) * 35;
}

function appendSplitMw20Note(baseText, parties, unit = '兩隊') {
  if (!Array.isArray(parties) || parties.length === 0) return baseText;
  const totalRuns = parties.length;
  const coveredRuns = parties.filter(p => (p?.mw20Count || 0) >= 1).length;
  if (coveredRuns === totalRuns) return `${baseText} ｜ 🍁 ${unit}皆有楓葉祝福 20！`;
  if (coveredRuns >= 1) {
    if (totalRuns === 2 && coveredRuns === 1) return `${baseText} ｜ 🍁 僅 1 場/隊有楓祝20`;
    return `${baseText} ｜ 🍁 覆蓋 ${coveredRuns}/${totalRuns} 場楓祝20`;
  }
  return state.preferMw20 ? `${baseText} ｜ ⚠️ 尚無楓祝20` : baseText;
}

function buildSplitSummarySubtitle(baseText, parties, unit = '兩隊') {
  const withMwNote = appendSplitMw20Note(baseText, parties, unit);
  const getHolders = (scored, pred) => (scored?.assignment || [])
    .filter(pred)
    .map(a => a.member.isPug ? '外找' : (a.member.baseName || a.member.name.replace(/ \(換分身\)$/, '')))
    .join('、');
  const bsList = parties.map(p => getHolders(p, a => a.classId === 'bs'));
  const bsNote = bsList.some(Boolean) ? ` ｜ ✨ 主教：${bsList.map(x => x || '無').join(' / ')}` : '';
  const mwList = parties.map(p => getHolders(p, a => !a.member.isPug && hasClassMw20(a.member, a.classId)));
  const mwNote = (state.preferMw20 || mwList.some(Boolean)) && mwList.some(Boolean)
    ? `（${mwList.map(x => x || '無').join(' / ')}）`
    : '';
  return `${withMwNote}${mwNote}${bsNote}`;
}

function normalizeCidForDedup(cid) {
  return (cid === 'bm' || cid === 'mm') ? 'se' : cid;
}

function getPartyDedupKey(scoredParty) {
  return (scoredParty?.assignment || [])
    .map(a => {
      const mKey = a.member.isPug
        ? 'PUG'
        : (a.member.baseMemberId || a.member.id || a.member.baseName || a.member.name.replace(/ \(換分身\)$/, ''));
      return `${mKey}:${normalizeCidForDedup(a.classId)}`;
    })
    .sort()
    .join(',');
}

function getPairDedupKey(parties) {
  return parties.map(getPartyDedupKey).sort().join(' || ');
}

function upsertUniquePlan(planMap, entry) {
  const parties = entry.parties || [entry.party1, entry.party2];
  const key = getPairDedupKey(parties);
  const prev = planMap.get(key);
  if (!prev ||
      entry.totalSize > prev.totalSize ||
      (entry.totalSize === prev.totalSize && entry.totalPugs < prev.totalPugs) ||
      (entry.totalSize === prev.totalSize && entry.totalPugs === prev.totalPugs && entry.combinedScore > prev.combinedScore)) {
    planMap.set(key, entry);
  }
}

function finalizeRankedPlans(planMap, limit, formatTitleFn) {
  const sorted = Array.from(planMap.values())
    .sort((a, b) =>
      (b.totalSize - a.totalSize) ||
      (a.totalPugs - b.totalPugs) ||
      (b.combinedScore - a.combinedScore)
    )
    .slice(0, limit);
  return sorted.map((p, idx) => ({
    ...p,
    title: formatTitleFn(p, idx, sorted.length)
  }));
}

function combCount(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  const r = Math.min(k, n - k);
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = Math.round((res * (n - r + i)) / i);
    if (res > 1000000) return res;
  }
  return res;
}

function getBoundedCombinations(arr, k, maxCount = 48) {
  if (k === 0) return [[]];
  if (arr.length < k || k < 0) return [];
  if (combCount(arr.length, k) <= maxCount) return getCombinations(arr, k);
  const out = [];
  const seen = new Set();
  const n = arr.length;
  for (let start = 0; start < n && out.length < maxCount; start++) {
    for (let step = 1; step < n && out.length < maxCount; step++) {
      const pickedSet = new Set();
      let cur = start;
      for (let guard = 0; guard < n * 2 && pickedSet.size < k; guard++) {
        if (!pickedSet.has(cur)) {
          pickedSet.add(cur);
          cur = (cur + step) % n;
        } else {
          cur = (cur + 1) % n;
        }
      }
      if (pickedSet.size !== k) continue;
      const sortedIdxs = Array.from(pickedSet).sort((a, b) => a - b);
      const sig = sortedIdxs.join(',');
      if (!seen.has(sig)) {
        seen.add(sig);
        out.push(sortedIdxs.map(i => arr[i]));
      }
    }
  }
  return out;
}

function buildUnusedMemberView(member, usedPairSet, alreadyPlayed, boss) {
  if (!alreadyPlayed) {
    const eligClasses = member.classes.filter(cid => isClassAllowedForMember(member, cid, boss));
    return eligClasses.length > 0 ? { ...member, classes: eligClasses } : null;
  }
  const clone = {
    ...member,
    name: `${member.name} (換分身)`,
    baseName: member.name,
    baseMemberId: member.id,
    lockedClass: null,
    preferredClass: (member.preferredClass && !usedPairSet.has(`${member.id}:${member.preferredClass}`)) ? member.preferredClass : null,
    manualPref: Boolean(member.manualPref && member.preferredClass && !usedPairSet.has(`${member.id}:${member.preferredClass}`)),
    priorityAttend: false
  };
  const altClasses = member.classes.filter(cid => !usedPairSet.has(`${member.id}:${cid}`) && isClassAllowedForMember(clone, cid, boss));
  return altClasses.length > 0 ? { ...clone, classes: altClasses } : null;
}

function computeTwoPartySplits() {
  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const minLevel = boss?.minLevel || 1;
  const rawChecked = state.members.filter(m => state.activeMemberIds.includes(m.id));
  const baseActive = getEffectiveMembersForPlanning(rawChecked);
  const eligibleGuild = baseActive.filter(m => m.classes.some(cid => isClassAllowedForMember(m, cid, boss)));

  let pugList = [];
  if (state.allowPug) {
    let pCount = 1;
    if (boss.id === 'horntail') {
      if (state.pugCount === 'auto') {
        pCount = Math.max(1, Math.min(8, 12 - eligibleGuild.length));
      } else {
        pCount = Math.min(8, Math.max(1, Number(state.pugCount) || 1));
      }
    } else {
      if (state.pugCount === 'auto') {
        pCount = Math.max(1, Math.min(4, 12 - eligibleGuild.length));
      } else {
        pCount = Math.min(4, Math.max(1, Number(state.pugCount) || 1));
      }
    }
    pugList = createPugMembers(pCount, minLevel);
  }

  const activeMembers = [...eligibleGuild, ...pugList];
  if (activeMembers.length < 4) return [];

  const plans = [];

  // Special 12-member split optimization for Horntail (闇黑龍王 12 人遠征隊)
  if (boss.id === 'horntail') {
    let maxGuildSlots = 12;
    let effectivePugs = [];
    if (state.allowPug) {
      if (state.pugCount === 'auto') {
        // Only fill missing slots up to 12 with PUGs (or if 12+ guild members lack mandatory role, reserve 1~2 PUGs)
        if (eligibleGuild.length < 12) {
          effectivePugs = pugList.slice(0, Math.min(pugList.length, 12 - eligibleGuild.length));
          maxGuildSlots = 12 - effectivePugs.length;
        } else {
          const dkAvail = eligibleGuild.filter(m => m.classes.some(c => c === 'dk' && isClassAllowedForMember(m, c, boss))).length;
          const seAvail = eligibleGuild.filter(m => m.classes.some(c => (c === 'bm' || c === 'mm') && isClassAllowedForMember(m, c, boss))).length;
          const buccAvail = eligibleGuild.filter(m => m.classes.some(c => c === 'bucc' && isClassAllowedForMember(m, c, boss))).length;
          const shadAvail = eligibleGuild.filter(m => m.classes.some(c => c === 'shad' && isClassAllowedForMember(m, c, boss))).length;
          const missingRoles = Math.max(0, 2 - dkAvail) + Math.max(0, 2 - seAvail) + Math.max(0, 1 - buccAvail) + Math.max(0, 2 - shadAvail);
          const neededPugs = Math.min(pugList.length, Math.max(1, missingRoles));
          effectivePugs = pugList.slice(0, neededPugs);
          maxGuildSlots = 12 - effectivePugs.length;
        }
      } else {
        // User explicitly selected N PUGs
        effectivePugs = pugList.slice(0, Math.min(8, pugList.length));
        maxGuildSlots = Math.max(0, 12 - effectivePugs.length);
      }
    }

    const guildPool = selectHorntailGuildPool(eligibleGuild, maxGuildSlots, boss);
    const totalSize = guildPool.length + effectivePugs.length;
    if (totalSize < 6) return [];

    const p1TargetSize = Math.ceil(totalSize / 2);
    const minG1 = Math.max(0, p1TargetSize - effectivePugs.length);
    const maxG1 = Math.min(guildPool.length, p1TargetSize);
    // PUG slots may need a 3+1 split to put two Shadowers and a Buccaneer together.
    // Enumerate every guild/PUG distribution that fills Party 1 to its target size.
    const g1Candidates = [];
    for (let size = minG1; size <= maxG1; size++) {
      if (totalSize % 2 === 0 && guildPool.length > 0) {
        // Equal party sizes are interchangeable; anchor one guild member to avoid duplicates.
        if (size > 0) {
          g1Candidates.push(...getCombinations(guildPool.slice(1), size - 1).map(others => [guildPool[0], ...others]));
        }
      } else {
        g1Candidates.push(...getCombinations(guildPool, size));
      }
    }

    const pickDistinctTop = (asnList, limit = 4) => {
      const scored = [];
      for (const a of asnList) {
        const s = scoreAssignment(a, boss, { isSplitSubParty: true });
        if (s) scored.push(s);
      }
      scored.sort((a, b) => (b.score + b.prefMatchCount * 3) - (a.score + a.prefMatchCount * 3));
      const distinct = [];
      const seen = new Set();
      for (const s of scored) {
        if (!seen.has(s.compSig)) {
          seen.add(s.compSig);
          distinct.push(s);
          if (distinct.length >= limit) break;
        }
      }
      return distinct;
    };

    const htPlans = [];

    for (const g1 of g1Candidates) {
      const g1Set = new Set(g1.map(m => m.id));
      const g2 = guildPool.filter(m => !g1Set.has(m.id));
      const p1Pugs = effectivePugs.slice(0, p1TargetSize - g1.length);
      const p2Pugs = effectivePugs.slice(p1Pugs.length);

      if (p1Pugs.length === 0 && p2Pugs.length === 0) {
        const top1List = pickDistinctTop(generateAssignmentsForParty(g1, minLevel, boss), 4);
        const top2List = pickDistinctTop(generateAssignmentsForParty(g2, minLevel, boss), 4);
        for (const topA1 of top1List) {
          for (const topA2 of top2List) {
            evaluateAndPushHtPair(topA1, topA2);
          }
        }
      } else {
        // Generate real guild assignments first, then coordinate PUG classes across Party 1 & Party 2
        const g1Asns = generateAssignmentsForParty(g1, minLevel, boss);
        const g2Asns = generateAssignmentsForParty(g2, minLevel, boss);
        const rankGuildPartial = (asn) => {
          let sc = 0;
          let mw = 0;
          const cMap = {};
          asn.forEach(x => {
            cMap[x.classId] = (cMap[x.classId] || 0) + 1;
            if (x.member.preferredClass === x.classId) sc += 4;
            if (hasClassMw20(x.member, x.classId)) mw++;
          });
          if (cMap.dk >= 1) sc += 30;
          if ((cMap.bm || 0) + (cMap.mm || 0) >= 1) sc += 26;
          if (cMap.bucc >= 1) sc += 22;
          if (cMap.shad >= 1) sc += 20;
          if (state.preferMw20 && mw >= 1) sc += (mw === 1 ? 24 : 14);
          sc += ((cMap.nl || 0) + (cMap.hero || 0)) * 10;
          return sc;
        };
        g1Asns.sort((a, b) => rankGuildPartial(b) - rankGuildPartial(a));
        g2Asns.sort((a, b) => rankGuildPartial(b) - rankGuildPartial(a));

        for (const ga1 of g1Asns.slice(0, 3)) {
          for (const ga2 of g2Asns.slice(0, 3)) {
            const cnt1 = {}, cnt2 = {};
            CLASSES.forEach(c => { cnt1[c.id] = 0; cnt2[c.id] = 0; });
            ga1.forEach(x => cnt1[x.classId]++);
            ga2.forEach(x => cnt2[x.classId]++);

            const t1 = [], t2 = [];
            if (cnt1.dk < 1) t1.push('dk');
            if (cnt2.dk < 1) t2.push('dk');

            const se1 = cnt1.bm + cnt1.mm;
            const se2 = cnt2.bm + cnt2.mm;
            if (se1 < 1 && se2 < 1) {
              t1.push('bm');
              t2.push('mm');
            } else if (se1 < 1) {
              t1.push(cnt2.bm >= 1 && cnt1.mm === 0 ? 'mm' : 'bm');
            } else if (se2 < 1) {
              t2.push(cnt1.bm >= 1 && cnt2.mm === 0 ? 'mm' : 'bm');
            }

            for (const smokeParty of [0, 1, 2]) {
              const targets1 = [...t1], targets2 = [...t2];
              if (smokeParty === 0) {
                if (cnt1.shad < 1) targets1.push('shad');
                if (cnt2.shad < 1) targets2.push('shad');
                if (cnt1.bucc + cnt2.bucc < 1) {
                  if (p1Pugs.length - targets1.length >= p2Pugs.length - targets2.length) targets1.push('bucc');
                  else targets2.push('bucc');
                }
              } else {
                const counts = smokeParty === 1 ? cnt1 : cnt2;
                const targets = smokeParty === 1 ? targets1 : targets2;
                for (let n = counts.shad; n < 2; n++) targets.push('shad');
                if (counts.bucc < 1) targets.push('bucc');
              }
              // With both Shadowers together, recruit a Night Lord if the other party has no thief.
              if (cnt1.shad + cnt1.nl === 0 && !targets1.includes('shad')) targets1.push('nl');
              if (cnt2.shad + cnt2.nl === 0 && !targets2.includes('shad')) targets2.push('nl');
              const full1List = generateAssignmentsForParty([...g1, ...p1Pugs], minLevel, boss, targets1);
              const full2List = generateAssignmentsForParty([...g2, ...p2Pugs], minLevel, boss, targets2);
              for (const a1 of full1List) {
                const s1 = scoreAssignment(a1, boss, { isSplitSubParty: true });
                if (!s1) continue;
                for (const a2 of full2List) {
                  const s2 = scoreAssignment(a2, boss, { isSplitSubParty: true });
                  if (!s2) continue;
                  evaluateAndPushHtPair(s1, s2);
                }
              }
            }
          }
        }
      }
    }

    function evaluateAndPushHtPair(topA1, topA2) {
      const dk1 = topA1.assignment.filter(x => x.classId === 'dk').length;
      const dk2 = topA2.assignment.filter(x => x.classId === 'dk').length;
      const bm1 = topA1.assignment.filter(x => x.classId === 'bm').length;
      const bm2 = topA2.assignment.filter(x => x.classId === 'bm').length;
      const mm1 = topA1.assignment.filter(x => x.classId === 'mm').length;
      const mm2 = topA2.assignment.filter(x => x.classId === 'mm').length;
      const bucc1 = topA1.assignment.filter(x => x.classId === 'bucc').length;
      const bucc2 = topA2.assignment.filter(x => x.classId === 'bucc').length;
      const shad1 = topA1.assignment.filter(x => x.classId === 'shad').length;
      const shad2 = topA2.assignment.filter(x => x.classId === 'shad').length;
      const mw1 = topA1.mw20Count || 0;
      const mw2 = topA2.mw20Count || 0;

      if (state.requireBucc && (bucc1 + bucc2) < 1) return;
      const stackedSmoke = (shad1 >= 2 && bucc1 >= 1) || (shad2 >= 2 && bucc2 >= 1);
      if (state.requireShad && !((shad1 >= 1 && shad2 >= 1) || stackedSmoke)) return;

      let balanceBonus = 0;
      const highlights = ['✓ 每隊至少1刀賊或標賊'];

      // 1. 必備兩火（每隊各 1 黑騎）
      if (dk1 >= 1 && dk2 >= 1) {
        balanceBonus += 50;
        highlights.push('✓ 兩火分配 (兩隊各1火防秒殺)');
      } else if (dk1 + dk2 >= 2) {
        balanceBonus += 20;
        highlights.push('△ 滿2火 (但集中同隊)');
      } else if (dk1 + dk2 === 1) {
        highlights.push('⚠️ 僅1火 (缺1火)');
      } else {
        highlights.push('⚠️ 缺黑騎(火)');
      }

      // 2. 必備一箭神 ＋ 一神射手（兩隊各一會心之眼）
      if ((bm1 >= 1 && mm2 >= 1) || (mm1 >= 1 && bm2 >= 1)) {
        balanceBonus += 55;
        highlights.push('✓ 雙會心分配 (1箭神 + 1神射手)');
      } else if ((bm1 + bm2 >= 1) && (mm1 + mm2 >= 1)) {
        balanceBonus += 30;
        highlights.push('✓ 1箭神 + 1神射手');
      } else if ((bm1 + mm1 >= 1) && (bm2 + mm2 >= 1)) {
        balanceBonus += 25;
        highlights.push('✓ 兩隊皆有會心之眼');
      }

      // 3. 必備一拳霸（全遠征 1 位即可，超過 1 位微幅扣分避免擠掉單體輸出）
      if (bucc1 + bucc2 === 1) {
        balanceBonus += 45;
        highlights.push('✓ 1 拳霸 (時間置換 Time Leap)');
      } else if (bucc1 + bucc2 > 1) {
        balanceBonus += 25;
        highlights.push(`✓ ${bucc1 + bucc2} 拳霸 (時間置換 Time Leap)`);
      } else {
        highlights.push('⚠️ 缺拳霸');
      }

      // 4. 兩刀可分隊，或與拳霸同隊搭配時間置換
      if (stackedSmoke) {
        balanceBonus += 50;
        highlights.push('✓ 2刀賊配拳霸同隊 (時間置換雙煙霧彈)');
      } else if (shad1 >= 1 && shad2 >= 1) {
        balanceBonus += 50;
        highlights.push('✓ 兩刀賊分配 (兩隊各1煙霧彈保護)');
      } else if (shad1 + shad2 >= 2) {
        balanceBonus += 20;
        highlights.push('△ 滿2刀賊 (但集中同隊)');
      } else if (shad1 + shad2 === 1) {
        highlights.push('⚠️ 僅1刀賊 (缺1刀賊)');
      } else {
        highlights.push('⚠️ 缺刀賊(煙霧彈)');
      }

      if (state.preferMw20) {
        if (mw1 >= 1 && mw2 >= 1) {
          balanceBonus += 60;
          highlights.push('🍁 兩隊皆有楓祝20');
        } else if (mw1 + mw2 >= 2) {
          balanceBonus -= 25;
          highlights.push('⚠️ 楓祝20集中同隊');
        } else if (mw1 + mw2 === 1) {
          balanceBonus += 25;
          highlights.push('🍁 1 隊有楓祝20 (僅1位持書)');
        } else {
          highlights.push('⚠️ 兩隊皆無楓祝20');
        }
      }

      if (effectivePugs.length > 0) {
        const pugInPlan = [...topA1.assignment, ...topA2.assignment].filter(x => x.member.isPug).length;
        if (pugInPlan > 0) {
          highlights.push(`📢 含 ${pugInPlan} 位外找路人補位`);
        }
      }

      const totalScore = topA1.score + topA2.score + balanceBonus;
      const sigKey = [topA1.compSig, topA2.compSig].sort().join('___');

      htPlans.push({
        title: totalSize >= 12
          ? `🐉 龍王 12 人遠征隊最佳配置（第 1 隊 ${topA1.assignment.length} 人 ＋ 第 2 隊 ${topA2.assignment.length} 人）`
          : `🐉 龍王遠征隊配置（目前 ${totalSize} 人：第 1 隊 ${topA1.assignment.length} 人 ＋ 第 2 隊 ${topA2.assignment.length} 人）`,
        subtitle: `編制亮點：${highlights.join(' ｜ ')}`,
        party1: topA1,
        party2: topA2,
        combinedScore: totalScore,
        smokeLayout: stackedSmoke ? 'stacked' : shad1 >= 1 && shad2 >= 1 ? 'split' : 'other',
        sigKey
      });
    }

    htPlans.sort((a, b) => b.combinedScore - a.combinedScore);

    // Reserve the best plan of each feasible smoke layout within the three results.
    const distinctSigs = new Set();
    const distinctPlans = htPlans.filter(p => {
      if (distinctSigs.has(p.sigKey)) return false;
      distinctSigs.add(p.sigKey);
      return true;
    });
    const layoutBest = ['stacked', 'split'].map(layout => distinctPlans.find(p => p.smokeLayout === layout)).filter(Boolean);
    const selectedPlans = [...new Set([...layoutBest, ...distinctPlans.slice(0, 3)])].slice(0, 3).sort((a, b) => b.combinedScore - a.combinedScore);
    const uniqueHtPlans = [];
    const seenSigs = new Set();
    for (const p of selectedPlans) {
      if (!seenSigs.has(p.sigKey)) {
        seenSigs.add(p.sigKey);
        if (uniqueHtPlans.length === 0) {
          p.title = totalSize >= 12
            ? `🐉 龍王 12 人遠征隊推薦首選（第 1 隊 ${p.party1.assignment.length} 人 ＋ 第 2 隊 ${p.party2.assignment.length} 人）`
            : p.title;
        } else {
          p.title = `🐉 龍王 12 人遠征隊備選方案 #${uniqueHtPlans.length + 1}（第 1 隊 ${p.party1.assignment.length} 人 ＋ 第 2 隊 ${p.party2.assignment.length} 人）`;
        }
        uniqueHtPlans.push(p);
        if (uniqueHtPlans.length >= 3) break;
      }
    }

    return uniqueHtPlans;
  }

  const planMapA = new Map();
  const planMapAPlus = new Map();

  if (eligibleGuild.length >= 10) {
    const p1GuildSize = Math.min(6, Math.ceil(eligibleGuild.length / 2));
    const party1GuildSubsets = getBoundedCombinations(eligibleGuild, p1GuildSize, 252);
    const maxPugsForSplit = state.allowPug
      ? (state.pugCount === 'auto' ? 2 : Math.min(2, Math.max(1, Number(state.pugCount) || 1)))
      : 0;
    const evalPartyBestList = (pool) => {
      const byRole = new Map();
      for (const asn of generateAssignmentsForParty(pool, minLevel, boss)) {
        const s = scoreAssignment(asn, boss);
        if (!s) continue;
        const rKey = getPartyDedupKey(s);
        const prev = byRole.get(rKey);
        if (!prev || s.score > prev.score) byRole.set(rKey, s);
      }
      return Array.from(byRole.values()).sort((a, b) => b.score - a.score).slice(0, 6);
    };

    for (const p1Guild of party1GuildSubsets) {
      const p1Ids = new Set(p1Guild.map(m => m.id));
      const remGuild = eligibleGuild.filter(m => !p1Ids.has(m.id));
      const p2GuildCandidates = remGuild.length <= 6 ? [remGuild] : getBoundedCombinations(remGuild.slice(0, 8), 6, 28);

      const list1Base = evalPartyBestList(p1Guild);
      const list1Pug = (maxPugsForSplit >= 1 && p1Guild.length < 6)
        ? evalPartyBestList([...p1Guild, ...createPugMembers(1, minLevel)])
        : [];

      for (const p2Guild of p2GuildCandidates) {
        if (p2Guild.length < 5) continue;
        const list2Base = evalPartyBestList(p2Guild);
        const list2Pug = (maxPugsForSplit >= 1 && p2Guild.length < 6)
          ? evalPartyBestList([...p2Guild, ...createPugMembers(1, minLevel)])
          : [];

        const candGroups = [
          [list1Base, list2Base, 0],
          [list1Pug, list2Base, 1],
          [list1Base, list2Pug, 1],
          [list1Pug, list2Pug, 2]
        ];
        for (const [arr1, arr2, usedPugs] of candGroups) {
          if (usedPugs > maxPugsForSplit || arr1.length === 0 || arr2.length === 0) continue;
          for (const s1 of arr1) {
            for (const s2 of arr2) {
              const combinedScore = s1.score + s2.score + getMultiPartyMw20Bonus([s1, s2]);
              upsertUniquePlan(planMapA, {
                subtitle: buildSplitSummarySubtitle('所有人只開 1 隻角色、不重複進場，兩隊皆滿 5 位以上團員且具備完整輔助！', [s1, s2], '兩隊'),
                party1: s1,
                party2: s2,
                totalSize: s1.assignment.length + s2.assignment.length,
                totalPugs: usedPugs,
                combinedScore
              });
            }
          }
        }
      }
    }
  }

  if (state.allowDualBox && eligibleGuild.length >= 6) {
    const dualHalf = Math.min(6, Math.ceil(eligibleGuild.length / 2));
    const dualSubsets = getBoundedCombinations(eligibleGuild, dualHalf, 128);
    for (const p1 of dualSubsets) {
      const p1Ids = new Set(p1.map(m => m.id));
      const rem = eligibleGuild.filter(m => !p1Ids.has(m.id));
      const p2Candidates = rem.length <= 6 ? [rem] : getBoundedCombinations(rem.slice(0, 8), 6, 28);

      const dualAsn1 = [
        ...generateAssignmentsForParty(p1, minLevel, boss),
        ...generateDualBoxAssignmentsForParty(p1, null, minLevel, boss)
      ];
      let bestDA1 = null;
      for (const a1 of dualAsn1) {
        const s1 = scoreAssignment(a1, boss);
        if (s1 && s1.assignment.length >= 5 && (!bestDA1 || s1.score > bestDA1.score)) bestDA1 = s1;
      }
      if (!bestDA1) continue;

      for (const p2 of p2Candidates) {
        const dualAsn2 = [
          ...generateAssignmentsForParty(p2, minLevel, boss),
          ...generateDualBoxAssignmentsForParty(p2, null, minLevel, boss)
        ];
        let bestDA2 = null;
        for (const a2 of dualAsn2) {
          const s2 = scoreAssignment(a2, boss);
          if (s2 && s2.assignment.length >= 5 && (!bestDA2 || s2.score > bestDA2.score)) bestDA2 = s2;
        }
        if (bestDA2 && (bestDA1.isDualBox || bestDA2.isDualBox)) {
          const combinedScore = bestDA1.score + bestDA2.score + getMultiPartyMw20Bonus([bestDA1, bestDA2]);
          upsertUniquePlan(planMapAPlus, {
            subtitle: buildSplitSummarySubtitle('利用「每隊最多 3 人雙開」讓拆開的兩隊都能達 5~6 角色並補齊輔助！', [bestDA1, bestDA2], '兩隊'),
            party1: bestDA1,
            party2: bestDA2,
            totalSize: bestDA1.assignment.length + bestDA2.assignment.length,
            totalPugs: 0,
            combinedScore
          });
        }
      }
    }
  }

  plans.push(...finalizeRankedPlans(planMapA, 8, (p, idx, total) => {
    const tag = total > 1 ? (idx === 0 ? '🏆 方案 A #1（推薦首選）' : `方案 A #${idx + 1}`) : '方案 A';
    return `${tag}：拆成兩隊同時/接力打（第 1 隊 ${p.party1.assignment.length} 人 ＋ 第 2 隊 ${p.party2.assignment.length} 人）`;
  }));
  plans.push(...finalizeRankedPlans(planMapAPlus, 8, (p, idx, total) => {
    const tag = total > 1 ? (idx === 0 ? '🏆 方案 A+ #1（雙開推薦）' : `方案 A+ #${idx + 1}`) : '方案 A+（含 1~3 人雙開補位）';
    return `${tag}：拆成兩隊（第 1 隊 ${p.party1.humanCount}人控${p.party1.assignment.length}角 ＋ 第 2 隊 ${p.party2.humanCount}人控${p.party2.assignment.length}角）`;
  }));

  if (eligibleGuild.length >= 4) {
    const maxPugAllowed = state.allowPug
      ? (state.pugCount === 'auto' ? 5 : Math.min(5, Math.max(1, Number(state.pugCount) || 1)))
      : 0;
    const minR1Pugs = state.allowPug ? Math.max(0, 6 - eligibleGuild.length) : 0;
    const planMapB = new Map();

    for (let r1PugCount = minR1Pugs; r1PugCount <= maxPugAllowed; r1PugCount++) {
      const r1GuildSize = state.allowPug
        ? Math.min(eligibleGuild.length, Math.max(1, 6 - r1PugCount))
        : Math.min(6, eligibleGuild.length);
      const r1Pugs = r1PugCount > 0 ? createPugMembers(r1PugCount, minLevel) : [];
      const run1GuildSubsets = getBoundedCombinations(eligibleGuild, r1GuildSize, 128);
      const maxR1Cands = run1GuildSubsets.length <= 28 ? 20 : run1GuildSubsets.length <= 84 ? 8 : 4;
      let foundWithThisR1Pug = false;

      for (const r1GuildMembers of run1GuildSubsets) {
        const r1Ids = new Set(r1GuildMembers.map(m => m.id));
        const leftOutGuild = eligibleGuild.filter(m => !r1Ids.has(m.id));
        const r1Pool = [...r1GuildMembers, ...r1Pugs];

        const r1Assignments = generateAssignmentsForParty(r1Pool, minLevel, boss);
        const r1Scored = [];
        for (const a1 of r1Assignments) {
          const s1 = scoreAssignment(a1, boss);
          if (s1) r1Scored.push(s1);
        }
        if (r1Scored.length === 0) continue;
        foundWithThisR1Pug = true;
        r1Scored.sort((a, b) => b.score - a.score || b.prefMatchCount - a.prefMatchCount);

        const r1Candidates = [];
        const seenR1Key = new Set();
        const seenDiversityKey = new Set();
        const getR1DiversityKey = (s1) => {
          const bsHolders = s1.assignment.filter(x => x.classId === 'bs').map(x => x.member.id).sort().join(',');
          const mageHolders = s1.assignment.filter(x => x.classId === 'il' || x.classId === 'fp').map(x => x.member.id).sort().join(',');
          const hbHolders = s1.assignment.filter(x => x.classId === 'dk').map(x => x.member.id).sort().join(',');
          const mwSig = (s1.mw20Members || []).slice().sort().join(',');
          return `${bsHolders}|${mageHolders}|${hbHolders}|${mwSig}`;
        };
        const pushR1 = (cand) => {
          if (!cand || r1Candidates.length >= maxR1Cands) return;
          const key = cand.assignment.map(x => `${x.member.id}:${normalizeCidForDedup(x.classId)}`).sort().join('|');
          if (!seenR1Key.has(key)) {
            seenR1Key.add(key);
            r1Candidates.push(cand);
          }
        };
        for (const cand of r1Scored) {
          if (r1Candidates.length >= maxR1Cands) break;
          const dKey = getR1DiversityKey(cand);
          if (!seenDiversityKey.has(dKey)) {
            seenDiversityKey.add(dKey);
            pushR1(cand);
          }
        }
        pushR1(r1Scored.find(s => s.mw20Count === 0));
        for (const cand of r1Scored) {
          if (r1Candidates.length >= maxR1Cands) break;
          pushR1(cand);
        }

        for (const candR1 of r1Candidates) {
          const usedSet1 = new Set(
            candR1.assignment.filter(x => !x.member.isPug).map(x => `${x.member.id}:${x.classId}`)
          );
          const availHelpers = r1GuildMembers
            .map(h => buildUnusedMemberView(h, usedSet1, true, boss))
            .filter(Boolean);

          const availSlotsR2 = leftOutGuild.length + availHelpers.length;
          if (state.allowPug) {
            const minR2Pugs = Math.max(0, 6 - availSlotsR2);
            const maxR2Pugs = Math.min(maxPugAllowed, 6 - leftOutGuild.length);
            for (let r2PugCount = minR2Pugs; r2PugCount <= maxR2Pugs; r2PugCount++) {
              const neededHelpers = 6 - leftOutGuild.length - r2PugCount;
              if (neededHelpers < 0 || neededHelpers > availHelpers.length) continue;
              const r2Pugs = r2PugCount > 0 ? createPugMembers(r2PugCount, minLevel) : [];
              const helperSubsets = getBoundedCombinations(availHelpers, neededHelpers, 64);
              let foundR2ForPugCount = false;

              for (const helpers of helperSubsets) {
                const r2Pool = [...leftOutGuild, ...helpers, ...r2Pugs];
                const r2Assignments = generateAssignmentsForParty(r2Pool, minLevel, boss);
                for (const a2 of r2Assignments) {
                  const s2 = scoreAssignment(a2, boss);
                  if (s2) {
                    foundR2ForPugCount = true;
                    const totalSize = candR1.assignment.length + s2.assignment.length;
                    const totalScore = candR1.score + s2.score + totalSize * 30 + getMultiPartyMw20Bonus([candR1, s2]);
                    upsertUniquePlan(planMapB, {
                      subtitle: buildSplitSummarySubtitle('利用多角色團員的優勢，第一場打完換分身再組第二場，儘量優先由團員補滿、僅補最少外找！', [candR1, s2], '兩場'),
                      party1: candR1,
                      party2: s2,
                      totalSize,
                      totalPugs: r1PugCount + r2PugCount,
                      combinedScore: totalScore
                    });
                  }
                }
              }
              if (foundR2ForPugCount) break;
            }
          } else {
            const targetR2Size = Math.min(6, availSlotsR2);
            if (targetR2Size < (boss.minSize || 1)) continue;
            const neededHelpers = Math.max(0, targetR2Size - leftOutGuild.length);
            if (neededHelpers > availHelpers.length) continue;
            const helperSubsets = getBoundedCombinations(availHelpers, neededHelpers, 64);
            for (const helpers of helperSubsets) {
              const r2Pool = [...leftOutGuild, ...helpers];
              const r2Assignments = generateAssignmentsForParty(r2Pool, minLevel, boss);
              for (const a2 of r2Assignments) {
                const s2 = scoreAssignment(a2, boss);
                if (s2) {
                  const totalSize = candR1.assignment.length + s2.assignment.length;
                  const totalScore = candR1.score + s2.score + totalSize * 30 + getMultiPartyMw20Bonus([candR1, s2]);
                  upsertUniquePlan(planMapB, {
                    subtitle: buildSplitSummarySubtitle('利用多角色團員的優勢，第一場打完換分身再組第二場，兩場都滿編！', [candR1, s2], '兩場'),
                    party1: candR1,
                    party2: s2,
                    totalSize,
                    totalPugs: 0,
                    combinedScore: totalScore
                  });
                }
              }
            }
          }
        }
      }
      if (foundWithThisR1Pug && planMapB.size > 0) break;
    }
    const bSchemeLabel = plans.length === 0 ? '方案 A' : '方案 B';
    plans.push(...finalizeRankedPlans(planMapB, 8, (p, idx, total) => {
      const tag = total > 1 ? (idx === 0 ? `🏆 ${bSchemeLabel} #1（推薦首選）` : `${bSchemeLabel} #${idx + 1}`) : bSchemeLabel;
      return `${tag}：雙滿團連打兩場（多角色團員換第 2 隻分身帶隊，${p.party1.assignment.length} 人 ＋ ${p.party2.assignment.length} 人）`;
    }));
  }

  return plans;
}

function computeThreePartySplits(runCount = 3) {
  const K = Math.max(3, Math.min(10, Math.round(Number(runCount) || 3)));
  const cnUnit = RUN_COUNT_CN[K] || String(K);
  const cnTeamUnit = `${cnUnit}隊`;
  const cnRunUnit = `${cnUnit}場`;

  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const minLevel = boss?.minLevel || 1;
  const rawChecked = state.members.filter(m => state.activeMemberIds.includes(m.id));
  const baseActive = getEffectiveMembersForPlanning(rawChecked, boss);
  const eligibleGuild = baseActive.filter(m => m.classes.some(cid => isClassAllowedForMember(m, cid, boss)));
  if (eligibleGuild.length < 4) return [];

  const plans = [];
  const maxPugPerRun = state.allowPug
    ? (state.pugCount === 'auto' ? 5 : Math.min(5, Math.max(1, Number(state.pugCount) || 1)))
    : 0;
  const assignPartyProps = (parties) => {
    const props = { parties };
    parties.forEach((pt, idx) => { props[`party${idx + 1}`] = pt; });
    return props;
  };

  // 1. 方案 A：拆成 K 隊同時／接力打（每人只開 1 隻角色，每隊至少 5 位真實公會團員，共需 5*K 人以上）
  const planMapAK = new Map();
  if (eligibleGuild.length >= 5 * K) {
    const cappedPool = eligibleGuild.slice(0, 6 * K);
    const teamTargets = [];
    let remTotal = cappedPool.length;
    for (let r = 0; r < K; r++) {
      const t = Math.min(6, Math.ceil(remTotal / (K - r)));
      teamTargets.push(t);
      remTotal -= t;
    }
    const evalDiverse = (pool, pugCnt) => {
      const fullPool = pugCnt > 0 ? [...pool, ...createPugMembers(pugCnt, minLevel)] : pool;
      const byKey = new Map();
      for (const a of generateAssignmentsForParty(fullPool, minLevel, boss)) {
        const s = scoreAssignment(a, boss);
        if (!s) continue;
        const rk = getPartyDedupKey(s);
        const prev = byKey.get(rk);
        if (!prev || s.score > prev.score) byKey.set(rk, s);
      }
      return Array.from(byKey.values()).sort((a, b) => b.score - a.score).slice(0, K === 3 ? 2 : 1);
    };

    const searchSplitA = (rIdx, remPool, chosenParties) => {
      if (rIdx === K - 1) {
        if (remPool.length < 5) return;
        const lastArr = [
          ...evalDiverse(remPool, 0),
          ...(state.allowPug && remPool.length < 6 ? evalDiverse(remPool, 1) : [])
        ];
        for (const sLast of lastArr) {
          const parties = [...chosenParties, sLast];
          const usedPugs = parties.reduce((acc, p) => acc + p.assignment.filter(x => x.member.isPug).length, 0);
          const totalSize = parties.reduce((acc, p) => acc + p.assignment.length, 0);
          const combinedScore = parties.reduce((acc, p) => acc + p.score, 0) + getMultiPartyMw20Bonus(parties);
          upsertUniquePlan(planMapAK, {
            subtitle: buildSplitSummarySubtitle(`所有人只開 1 隻角色、不重複進場，${cnTeamUnit}皆滿 5 位以上團員！`, parties, cnTeamUnit),
            ...assignPartyProps(parties),
            totalSize,
            totalPugs: usedPugs,
            combinedScore
          });
        }
        return;
      }

      const subCap = K === 3 ? (rIdx === 0 ? 24 : 18) : (rIdx === 0 ? 6 : 4);
      const subsets = getBoundedCombinations(remPool, teamTargets[rIdx], subCap);
      for (const gCur of subsets) {
        const gIds = new Set(gCur.map(m => m.id));
        const remNext = remPool.filter(m => !gIds.has(m.id));
        if (remNext.length < (K - 1 - rIdx) * 5) continue;
        const curArr = [
          ...evalDiverse(gCur, 0),
          ...(state.allowPug && teamTargets[rIdx] < 6 ? evalDiverse(gCur, 1) : [])
        ];
        for (const sCur of curArr) {
          searchSplitA(rIdx + 1, remNext, [...chosenParties, sCur]);
        }
      }
    };

    searchSplitA(0, cappedPool, []);
    plans.push(...finalizeRankedPlans(planMapAK, 6, (p, idx, total) => {
      const tag = total > 1 ? (idx === 0 ? `🏆 方案 A #1（${cnTeamUnit}推薦）` : `方案 A #${idx + 1}`) : '方案 A';
      const sizesDetail = p.parties.map((pt, i) => `第 ${i + 1} 隊 ${pt.assignment.length} 人`).join(' ＋ ');
      return `${tag}：拆成${cnTeamUnit}同時/接力打（${sizesDetail}）`;
    }));
  }

  // 2. 方案 B：K 團分身連打 K 場規劃（多角色團員換第 2 ～ 第 K 隻分身帶隊）
  const maxTotalGuildSlots = eligibleGuild.reduce(
    (sum, m) => sum + Math.min(K, m.classes.filter(cid => isClassAllowedForMember(m, cid, boss)).length),
    0
  );
  const minTeamSize = boss.minSize || 1;
  if (!state.allowPug && maxTotalGuildSlots < K * minTeamSize) {
    return plans;
  }
  if (state.allowPug && maxTotalGuildSlots < K * Math.max(1, 6 - maxPugPerRun)) {
    return plans;
  }

  const guildInfos = eligibleGuild.map(m => {
    const eligClasses = m.classes.filter(cid => isClassAllowedForMember(m, cid, boss));
    const lockedOk = Boolean(m.lockedClass && eligClasses.includes(m.lockedClass));
    return {
      id: m.id,
      lockedClass: lockedOk ? m.lockedClass : null,
      eligClasses
    };
  });
  const singleCharIdsSorted = guildInfos.filter(gi => gi.eligClasses.length === 1).map(gi => gi.id).sort();
  const totalCapacity = 6 * K;
  const maxUnplayedAtEnd = Math.max(0, eligibleGuild.length - totalCapacity);

  const canRemainingCoverRuns = (usedPairs, playedSet, runsLeft, remGuildNeeded, targetLastRunSize) => {
    let remSlotCapacity = 0;
    let remBs = 0;
    let remMage = 0;
    let remSE = 0;
    let remHB = 0;
    let remNL = 0;
    let remShad = 0;
    let remBucc = 0;
    let unplayedCount = 0;

    for (let i = 0; i < guildInfos.length; i++) {
      const gi = guildInfos[i];
      const played = playedSet.has(gi.id);
      if (!played) unplayedCount++;

      const restrictLocked = !played && gi.lockedClass && runsLeft === 1;
      let availCnt = 0;
      let hasBs = false;
      let hasMage = false;
      let hasSE = false;
      let hasHB = false;
      let hasNL = false;
      let hasShad = false;
      let hasBucc = false;

      if (restrictLocked) {
        const cid = gi.lockedClass;
        if (!usedPairs.has(`${gi.id}:${cid}`)) {
          availCnt = 1;
          if (cid === 'bs') hasBs = true;
          else if (cid === 'il' || cid === 'fp') hasMage = true;
          else if (cid === 'bm' || cid === 'mm') hasSE = true;
          else if (cid === 'dk') hasHB = true;
          else if (cid === 'nl') hasNL = true;
          else if (cid === 'shad') hasShad = true;
          else if (cid === 'bucc') hasBucc = true;
        }
      } else {
        const classes = gi.eligClasses;
        for (let j = 0; j < classes.length; j++) {
          const cid = classes[j];
          if (usedPairs.has(`${gi.id}:${cid}`)) continue;
          availCnt++;
          if (cid === 'bs') hasBs = true;
          else if (cid === 'il' || cid === 'fp') hasMage = true;
          else if (cid === 'bm' || cid === 'mm') hasSE = true;
          else if (cid === 'dk') hasHB = true;
          else if (cid === 'nl') hasNL = true;
          else if (cid === 'shad') hasShad = true;
          else if (cid === 'bucc') hasBucc = true;
        }
      }

      if (availCnt === 0) continue;
      remSlotCapacity += availCnt < runsLeft ? availCnt : runsLeft;
      if (hasBs) remBs++;
      if (hasMage) remMage++;
      if (hasSE) remSE++;
      if (hasHB) remHB++;
      if (hasNL) remNL++;
      if (hasShad) remShad++;
      if (hasBucc) remBucc++;
    }

    const pugCap = runsLeft * maxPugPerRun;
    if (remSlotCapacity + pugCap < remGuildNeeded) return false;
    if (state.allowPug && remSlotCapacity < runsLeft * Math.max(1, 6 - maxPugPerRun)) return false;

    if (runsLeft === 1 && unplayedCount > targetLastRunSize + maxUnplayedAtEnd) return false;
    if (unplayedCount > runsLeft * 6 + maxUnplayedAtEnd) return false;

    if (state.requireBishop && remBs + pugCap < runsLeft) return false;
    const magesNeededPerRun = boss.id === 'krexel' ? 2 : (state.requireMage ? 1 : 0);
    if (magesNeededPerRun > 0 && remMage + pugCap < magesNeededPerRun * runsLeft) return false;
    if (state.requireSE && remSE + pugCap < runsLeft) return false;
    if (state.requireHB && remHB + pugCap < runsLeft) return false;
    if (state.requireNL && remNL + pugCap < runsLeft) return false;
    if (state.requireShad && remShad + pugCap < runsLeft) return false;
    if (state.requireBucc && remBucc + pugCap < runsLeft) return false;

    return true;
  };

  const getStageDiversityKey = (scoredParty, usedPairs, playedSet) => {
    const bsHolders = [];
    const mageHolders = [];
    const hbHolders = [];
    let pugLen = 0;
    const asn = scoredParty.assignment;
    for (let i = 0; i < asn.length; i++) {
      const x = asn[i];
      if (x.member.isPug) pugLen++;
      const tag = x.member.isPug ? 'PUG' : x.member.id;
      if (x.classId === 'bs') bsHolders.push(tag);
      else if (x.classId === 'il' || x.classId === 'fp') mageHolders.push(tag);
      else if (x.classId === 'dk') hbHolders.push(tag);
    }
    const mwSig = (scoredParty.mw20Members || []).slice().sort().join(',');
    const remSingles = singleCharIdsSorted.filter(id => !playedSet.has(id)).join(',');
    return `${pugLen}|${bsHolders.sort().join(',')}|${mageHolders.sort().join(',')}|${hbHolders.sort().join(',')}|${mwSig}|${remSingles}`;
  };

  // Build candidate size-configs for Run 1 .. K
  const sizeConfigs = [];
  if (!state.allowPug) {
    const upperSum = Math.min(totalCapacity, maxTotalGuildSlots);
    const lowerSum = Math.max(K * minTeamSize, upperSum - K);
    for (let sum = upperSum; sum >= lowerSum; sum--) {
      const tuplesAtSum = [];
      const seenTuples = new Set();
      const pushTuple = (arr) => {
        if (arr.length === K && arr[K - 1] >= minTeamSize && arr.every((v, i) => i === 0 || arr[i - 1] >= v)) {
          const sig = arr.join(',');
          if (!seenTuples.has(sig)) {
            seenTuples.add(sig);
            tuplesAtSum.push(arr);
          }
        }
      };

      const bal = [];
      let remBal = sum;
      for (let i = 0; i < K; i++) {
        const val = Math.min(6, Math.ceil(remBal / (K - i)));
        bal.push(val);
        remBal -= val;
      }
      pushTuple(bal);

      const front = [];
      let remFront = sum;
      for (let i = 0; i < K; i++) {
        const minForRest = (K - 1 - i) * minTeamSize;
        const val = Math.min(6, remFront - minForRest);
        front.push(val);
        remFront -= val;
      }
      pushTuple(front);

      if (tuplesAtSum.length > 0) sizeConfigs.push({ sum, tuples: tuplesAtSum });
    }
  } else {
    sizeConfigs.push({ sum: totalCapacity, tuples: [Array(K).fill(6)] });
  }

  const mw20GuildEntries = eligibleGuild
    .map(m => {
      const mwClasses = m.classes.filter(cid => hasClassMw20(m, cid) && isClassAllowedForMember(m, cid, boss));
      if (mwClasses.length === 0) return null;
      return {
        id: m.id,
        lockedClass: m.lockedClass || null,
        lockedEligible: Boolean(m.lockedClass && isClassAllowedForMember(m, m.lockedClass, boss)),
        mwClasses
      };
    })
    .filter(Boolean);

  const countRemainingMw20 = (usedPairs, playedSet, capPerMember) => {
    let total = 0;
    for (const entry of mw20GuildEntries) {
      if (!playedSet.has(entry.id) && entry.lockedEligible) {
        const lockedIsMw = (entry.mwClasses.includes(entry.lockedClass) && !usedPairs.has(`${entry.id}:${entry.lockedClass}`)) ? 1 : 0;
        let otherMw = 0;
        if (capPerMember > 1) {
          for (const cid of entry.mwClasses) {
            if (cid !== entry.lockedClass && !usedPairs.has(`${entry.id}:${cid}`)) otherMw++;
          }
        }
        total += Math.min(capPerMember, lockedIsMw + otherMw);
      } else {
        let mwCnt = 0;
        for (const cid of entry.mwClasses) {
          if (!usedPairs.has(`${entry.id}:${cid}`)) mwCnt++;
        }
        total += Math.min(capPerMember, mwCnt);
      }
    }
    return total;
  };

  const KEY_SUPPORT_CIDS = new Set(['bs', 'dk', 'bm', 'mm', 'il', 'fp']);
  const getClassMultiStageRank = (member, cid) => {
    let rank = getClassLevel(member, cid);
    if (member.preferredClass === cid) rank += 500;
    if (KEY_SUPPORT_CIDS.has(cid)) rank += 2000;
    if (hasClassMw20(member, cid)) rank += 5000;
    if (member.lockedClass === cid) rank += 20000;
    return rank;
  };
  const limitPoolForMultiStage = (pool) => {
    if (K < 4) return pool;
    return pool.map(m => {
      if (m.isPug || m.classes.length <= 1) return m;
      const sorted = m.classes.slice().sort((a, b) => getClassMultiStageRank(m, b) - getClassMultiStageRank(m, a));
      return { ...m, classes: sorted.slice(0, 3) };
    });
  };
  const asnSampleLimit = K >= 6 ? 160 : 280;
  const getStageAssignments = (pool) => {
    const prepped = limitPoolForMultiStage(pool);
    const allAsns = generateAssignmentsForParty(prepped, minLevel, boss);
    if (K < 4 || allAsns.length <= asnSampleLimit) return allAsns;
    const sampled = [];
    for (let i = 0; i < asnSampleLimit; i++) {
      sampled.push(allAsns[Math.floor((i * allAsns.length) / asnSampleLimit)]);
    }
    return sampled;
  };

  const planMapBK = new Map();

  for (const cfg of sizeConfigs) {
    for (const targetSizes of cfg.tuples) {
      let beam = [{
        parties: [],
        used: new Set(),
        played: new Set(),
        totalPugs: 0,
        sumScore: 0
      }];

      for (let r = 0; r < K - 1 && beam.length > 0; r++) {
        const targetS = targetSizes[r];
        const targetLast = targetSizes[K - 1];
        const runsLeftAfter = K - 1 - r;
        let remGuildNeeded = 0;
        for (let j = r + 1; j < K; j++) remGuildNeeded += targetSizes[j];

        const subsetCap = K === 3 ? (r === 0 ? 21 : 16) : K >= 6 ? 3 : (r === 0 ? 5 : 4);
        const perParentBucketCap = K === 3 ? (r === 0 ? 10 : 4) : (r === 0 ? 4 : 2);
        const nextBeamMap = new Map();
        const nextBeamList = [];

        for (const st of beam) {
          const poolR = eligibleGuild
            .map(m => buildUnusedMemberView(m, st.used, st.played.has(m.id), boss))
            .filter(Boolean);
          const minP = state.allowPug ? Math.max(0, targetS - poolR.length) : 0;
          const maxP = state.allowPug ? Math.min(maxPugPerRun, targetS - 1) : 0;
          const bucketMap = new Map();

          for (let pCnt = minP; pCnt <= maxP; pCnt++) {
            const gSize = targetS - pCnt;
            if (gSize > poolR.length) continue;
            const rPugs = pCnt > 0 ? createPugMembers(pCnt, minLevel) : [];
            const subsetsR = getBoundedCombinations(poolR, gSize, subsetCap);

            for (const subR of subsetsR) {
              const playedNext = new Set(st.played);
              for (let i = 0; i < subR.length; i++) {
                playedNext.add(subR[i].baseMemberId || subR[i].id);
              }
              if (r > 0) {
                let unplayedAfterCount = 0;
                for (let i = 0; i < guildInfos.length; i++) {
                  if (!playedNext.has(guildInfos[i].id)) unplayedAfterCount++;
                }
                if (unplayedAfterCount > (runsLeftAfter === 1 ? targetLast : runsLeftAfter * 6) + maxUnplayedAtEnd) continue;
              }

              const rPool = [...subR, ...rPugs];
              for (const asn of getStageAssignments(rPool)) {
                const sCur = scoreAssignment(asn, boss);
                if (!sCur) continue;
                const dKey = getStageDiversityKey(sCur, null, playedNext);
                const prev = bucketMap.get(dKey);
                if (prev && sCur.score <= prev.sCur.score) continue;
                const usedNext = new Set(st.used);
                for (let i = 0; i < sCur.assignment.length; i++) {
                  const item = sCur.assignment[i];
                  if (!item.member.isPug) {
                    const mid = item.member.baseMemberId || item.member.id;
                    usedNext.add(`${mid}:${item.classId}`);
                  }
                }
                if (!canRemainingCoverRuns(usedNext, playedNext, runsLeftAfter, (state.allowPug ? 0 : remGuildNeeded), targetLast)) continue;
                bucketMap.set(dKey, { sCur, usedNext, playedNext, pCnt });
              }
            }
            if (bucketMap.size >= 4) break;
          }

          const localStates = Array.from(bucketMap.values())
            .map(entry => {
              const nextParties = [...st.parties, entry.sCur];
              const coveredSoFar = nextParties.filter(p => p.mw20Count >= 1).length;
              const totalMwSoFar = nextParties.reduce((acc, p) => acc + p.mw20Count, 0);
              const remMwCap = runsLeftAfter === 1
                ? Math.min(1, countRemainingMw20(entry.usedNext, entry.playedNext, 1))
                : Math.min(runsLeftAfter, countRemainingMw20(entry.usedNext, entry.playedNext, runsLeftAfter));
              const mwPossible = coveredSoFar + remMwCap;
              const mwRank = mwPossible * 50 - Math.max(0, totalMwSoFar - coveredSoFar) * 35;
              const totalPugs = st.totalPugs + entry.pCnt;
              const sumScore = st.sumScore + entry.sCur.score;
              return {
                parties: nextParties,
                used: entry.usedNext,
                played: entry.playedNext,
                totalPugs,
                sumScore,
                rankScore: (K === 3 && r === 1 ? entry.sCur.score + mwRank : sumScore + mwRank)
              };
            })
            .sort((a, b) => (a.totalPugs - b.totalPugs) || (b.rankScore - a.rankScore))
            .slice(0, perParentBucketCap);

          if (K === 3) {
            nextBeamList.push(...localStates);
          } else {
            for (const ls of localStates) {
              const dedupK = getPairDedupKey(ls.parties);
              const existing = nextBeamMap.get(dedupK);
              if (!existing || ls.totalPugs < existing.totalPugs || (ls.totalPugs === existing.totalPugs && ls.rankScore > existing.rankScore)) {
                nextBeamMap.set(dedupK, ls);
              }
            }
          }
        }

        if (K === 3) {
          beam = nextBeamList;
        } else {
          const globalCap = K >= 6 ? 2 : 3;
          beam = Array.from(nextBeamMap.values())
            .sort((a, b) => (a.totalPugs - b.totalPugs) || (b.rankScore - a.rankScore))
            .slice(0, globalCap);
        }
      }

      const targetLast = targetSizes[K - 1];
      for (const st of beam) {
        const unplayedForLast = [];
        const helpersForLast = [];
        for (const m of eligibleGuild) {
          const view = buildUnusedMemberView(m, st.used, st.played.has(m.id), boss);
          if (!st.played.has(m.id)) {
            if (view) unplayedForLast.push(view);
          } else if (view) {
            helpersForLast.push(view);
          }
        }
        const missingUnplayableCount = eligibleGuild.filter(m => !st.played.has(m.id)).length - unplayedForLast.length;
        if (missingUnplayableCount > maxUnplayedAtEnd) continue;

        const minPLast = state.allowPug
          ? Math.max(0, targetLast - (unplayedForLast.length + helpersForLast.length))
          : 0;
        const maxPLast = state.allowPug
          ? Math.min(maxPugPerRun, targetLast - unplayedForLast.length)
          : 0;

        for (let pLast = minPLast; pLast <= maxPLast; pLast++) {
          const gLastSize = targetLast - pLast;
          const fixedGuildLast = unplayedForLast.slice(0, gLastSize);
          if (unplayedForLast.length - fixedGuildLast.length + missingUnplayableCount > maxUnplayedAtEnd) continue;
          const remHelperSeats = gLastSize - fixedGuildLast.length;
          if (remHelperSeats < 0 || helpersForLast.length < remHelperSeats) continue;

          const rLastPugs = pLast > 0 ? createPugMembers(pLast, minLevel) : [];
          const helperSubsetsLast = getBoundedCombinations(helpersForLast, remHelperSeats, K === 3 ? 12 : K >= 6 ? 3 : 4);
          let foundAtThisPLast = false;

          for (const hSub of helperSubsetsLast) {
            const rLastPool = [...fixedGuildLast, ...hSub, ...rLastPugs];
            for (const asnLast of getStageAssignments(rLastPool)) {
              const sLast = scoreAssignment(asnLast, boss);
              if (!sLast) continue;
              foundAtThisPLast = true;
              const parties = [...st.parties, sLast];
              const partySizes = parties.map(p => p.assignment.length);
              const totalSize = partySizes.reduce((acc, n) => acc + n, 0);
              const sizeSpread = Math.max(...partySizes) - Math.min(...partySizes);
              const totalPugs = st.totalPugs + pLast;
              const combinedScore = st.sumScore + sLast.score + totalSize * 30 - sizeSpread * 8 + getMultiPartyMw20Bonus(parties);
              const swapNote = K === 3
                ? '多角色團員依序換第 2、第 3 隻分身帶隊，盡量分散主教與楓祝 20！'
                : `多角色團員依序換第 2 ～ 第 ${K} 隻分身帶隊，盡量分散主教與楓祝 20！`;
              upsertUniquePlan(planMapBK, {
                subtitle: buildSplitSummarySubtitle(swapNote, parties, cnRunUnit),
                ...assignPartyProps(parties),
                totalSize,
                totalPugs,
                combinedScore
              });
            }
          }
          if (foundAtThisPLast) break;
        }
      }
    }
    if (!state.allowPug && planMapBK.size > 0) break;
  }

  const bKSchemeLabel = plans.length === 0 ? '方案 A' : '方案 B';
  plans.push(...finalizeRankedPlans(planMapBK, 8, (p, idx, total) => {
    const tag = total > 1 ? (idx === 0 ? `🏆 ${bKSchemeLabel} #1（${cnUnit}團首選）` : `${bKSchemeLabel} #${idx + 1}`) : bKSchemeLabel;
    const sizesStr = p.parties.map(pt => `${pt.assignment.length} 人`).join(' ＋ ');
    return `${tag}：${cnUnit}滿團分身連打 ${K} 場（${sizesStr}）`;
  }));

  return plans;
}

function withBossRuleState(boss, fn, overrides = {}) {
  const saved = {
    selectedBossId: state.selectedBossId,
    requireBishop: state.requireBishop,
    requireMage: state.requireMage,
    requireSE: state.requireSE,
    requireHB: state.requireHB,
    requireBucc: state.requireBucc,
    requireShad: state.requireShad,
    requireNL: state.requireNL,
    preferMw20: state.preferMw20,
    allowDualBox: state.allowDualBox
  };
  try {
    state.selectedBossId = boss.id;
    state.requireBishop = overrides.requireBishop !== undefined ? overrides.requireBishop : !!boss.requireBishop;
    state.requireMage = overrides.requireMage !== undefined ? overrides.requireMage : !!boss.requireMage;
    state.requireSE = overrides.requireSE !== undefined ? overrides.requireSE : !!boss.requireSE;
    state.requireHB = overrides.requireHB !== undefined ? overrides.requireHB : !!boss.requireHB;
    state.requireBucc = overrides.requireBucc !== undefined ? overrides.requireBucc : !!boss.requireBucc;
    state.requireShad = overrides.requireShad !== undefined ? overrides.requireShad : !!boss.requireShad;
    state.requireNL = overrides.requireNL !== undefined ? overrides.requireNL : !!boss.requireNL;
    state.preferMw20 = overrides.preferMw20 !== undefined ? overrides.preferMw20 : (boss.preferMw20 !== undefined ? !!boss.preferMw20 : bossNeedsMw20(boss));
    state.allowDualBox = overrides.allowDualBox !== undefined ? overrides.allowDualBox : !!boss.allowDualBox;
    return fn();
  } finally {
    Object.assign(state, saved);
  }
}

function getSlotLabelForKey(slotKey) {
  if (!slotKey || slotKey === 'custom') return '手動勾選名單';
  const [dayId, periodId] = String(slotKey).split('_');
  const day = DAYS.find(d => d.id === dayId);
  const period = PERIODS.find(p => p.id === periodId);
  if (day && period) return `${day.label} ${period.short}`;
  return '自訂時段';
}

function getDefaultSlotKeyForBoss(bossId) {
  if (state.selectedPreset && state.selectedPreset !== 'custom') return state.selectedPreset;
  const boss = BOSSES.find(b => b.id === bossId) || BOSSES[0];
  let bestKey = 'custom';
  let bestChars = 0;
  DAYS.forEach(d => {
    PERIODS.forEach(p => {
      const raw = state.members.filter(m => m.slots[d.id] && m.slots[d.id].includes(p.id));
      const eff = getEffectiveMembersForPlanning(raw, boss);
      const cnt = eff.reduce((sum, m) => sum + m.classes.filter(cid => isClassAllowedForMember(m, cid, boss)).length, 0);
      if (cnt > bestChars) {
        bestChars = cnt;
        bestKey = `${d.id}_${p.id}`;
      }
    });
  });
  return bestChars >= 1 ? bestKey : 'custom';
}

function createDefaultRulesForBoss(boss) {
  return {
    requireBishop: !!boss.requireBishop,
    requireMage: !!boss.requireMage,
    requireSE: !!boss.requireSE,
    requireHB: !!boss.requireHB,
    requireBucc: !!boss.requireBucc,
    requireShad: !!boss.requireShad,
    requireNL: !!boss.requireNL,
    preferMw20: boss.preferMw20 !== undefined ? !!boss.preferMw20 : bossNeedsMw20(boss),
    allowDualBox: !!boss.allowDualBox
  };
}

function getActiveMultiBossJob() {
  if (!state.multiBossQueue || state.multiBossQueue.length === 0) return null;
  let job = state.multiBossQueue.find(j => j.uid === state.selectedMultiJobUid);
  if (!job) {
    job = state.multiBossQueue[0];
    state.selectedMultiJobUid = job.uid;
  }
  if (!job.rules) {
    const boss = BOSSES.find(b => b.id === job.bossId) || BOSSES[0];
    job.rules = createDefaultRulesForBoss(boss);
  }
  return job;
}

function getSlotRawMemberIds(slotKey) {
  if (!slotKey || slotKey === 'custom') return [...state.activeMemberIds];
  const [dayId, periodId] = String(slotKey).split('_');
  return state.members
    .filter(m => m.slots[dayId] && m.slots[dayId].includes(periodId))
    .map(m => m.id);
}

function getSlotAvailableMembersForBoss(slotKey, boss, usedCharPairs, customMemberIds = null) {
  let rawList;
  if (!slotKey || slotKey === 'custom') {
    const allowedIds = new Set(Array.isArray(customMemberIds) ? customMemberIds : state.activeMemberIds);
    rawList = state.members.filter(m => allowedIds.has(m.id));
  } else {
    const [dayId, periodId] = String(slotKey).split('_');
    rawList = state.members.filter(m => m.slots[dayId] && m.slots[dayId].includes(periodId));
  }
  const effective = getEffectiveMembersForPlanning(rawList, boss);
  const out = [];
  for (const m of effective) {
    const availClasses = m.classes.filter(cid =>
      isClassAllowedForMember(m, cid, boss) && (!usedCharPairs || !usedCharPairs.has(`${m.id}:${cid}`))
    );
    if (availClasses.length === 0) continue;
    const lockedClass = (m.lockedClass && availClasses.includes(m.lockedClass)) ? m.lockedClass : null;
    const preferredClass = (m.preferredClass && availClasses.includes(m.preferredClass)) ? m.preferredClass : availClasses[0];
    out.push({
      ...m,
      classes: availClasses,
      lockedClass,
      preferredClass,
      manualPref: Boolean(m.manualPref && m.preferredClass && availClasses.includes(m.preferredClass))
    });
  }
  return out;
}

function analyzeMissingForMultiBoss(parties, boss, jobRules = null) {
  const r = jobRules || createDefaultRulesForBoss(boss);
  const targetSize = boss.isExpedition12 ? 12 : 6;
  const filledCount = parties.reduce((sum, p) => sum + (p?.assignment?.length || 0), 0);
  const missingSeats = Math.max(0, targetSize - filledCount);

  let bishops = 0;
  let mages = 0;
  let se = 0;
  let hb = 0;
  let nl = 0;
  let shad = 0;
  let bucc = 0;
  let mw20 = 0;

  parties.forEach(p => {
    (p?.assignment || []).forEach(item => {
      const cid = item.classId;
      if (cid === 'bs') bishops++;
      if (cid === 'il' || cid === 'fp') mages++;
      if (cid === 'bm' || cid === 'mm') se++;
      if (cid === 'dk') hb++;
      if (cid === 'nl') nl++;
      if (cid === 'shad') shad++;
      if (cid === 'bucc') bucc++;
      if (!item.member.isPug && hasClassMw20(item.member, cid)) mw20++;
    });
  });

  const missingRoles = [];
  if (boss.isExpedition12) {
    if (r.requireHB && hb < 2) missingRoles.push(`黑騎士(火)×${2 - hb}`);
    if (r.requireSE && se < 2) missingRoles.push(`弓/弩手(會心)×${2 - se}`);
    if (r.requireBucc && bucc < 1) missingRoles.push('拳霸');
    if (r.requireShad && shad < 2) missingRoles.push(`刀賊×${2 - shad}`);
  } else {
    if (r.requireBishop && bishops < 1) missingRoles.push('主教');
    if (r.requireMage) {
      const needMage = boss.id === 'krexel' ? 2 : 1;
      if (mages < needMage) missingRoles.push(`冰雷/火毒×${needMage - mages}`);
    }
    if (r.requireSE && se < 1) missingRoles.push('弓/弩手(會心)');
    if (r.requireHB && hb < 1) missingRoles.push('黑騎士(火)');
    if (r.requireNL && nl < 1) missingRoles.push('標賊');
    if (r.requireShad && shad < 1) missingRoles.push('刀賊');
    if (r.requireBucc && bucc < 1) missingRoles.push('拳霸');
  }

  const mw20Missing = r.preferMw20 && mw20 < 1;
  const isComplete = missingSeats === 0 && missingRoles.length === 0;

  let statusText;
  if (isComplete) {
    statusText = `✅ 滿編 (${filledCount}/${targetSize} 人)`;
  } else if (missingSeats > 0) {
    statusText = `⚠️ 缺 ${missingSeats} 人 (${filledCount}/${targetSize})${missingRoles.length > 0 ? `｜建議外找：${missingRoles.join('、')}` : '｜可外找補位'}`;
  } else {
    statusText = `⚠️ 缺少輔助｜建議調整/外找：${missingRoles.join('、')}`;
  }

  return {
    targetSize,
    filledCount,
    missingSeats,
    missingRoles,
    mw20Missing,
    isComplete,
    statusText
  };
}

function buildMultiBossScarcityMap(remainingQueue, usedCharPairs) {
  const futureDemand = [];
  for (const rj of remainingQueue.slice(0, 4)) {
    const rBoss = BOSSES.find(b => b.id === rj.bossId);
    if (!rBoss) continue;
    const rRules = rj.rules || createDefaultRulesForBoss(rBoss);
    const avail = getSlotAvailableMembersForBoss(rj.slotKey, rBoss, usedCharPairs, rj.customMemberIds);
    const carriers = {
      bs: 0, mage: 0, se: 0, hb: 0, nl: 0, shad: 0, bucc: 0, mw20: 0, totalChars: 0
    };
    const memberIdsByRole = {
      bs: new Set(), mage: new Set(), se: new Set(), hb: new Set(), nl: new Set(), shad: new Set(), bucc: new Set(), mw20: new Set()
    };
    avail.forEach(m => {
      m.classes.forEach(cid => {
        carriers.totalChars++;
        if (cid === 'bs') { carriers.bs++; memberIdsByRole.bs.add(`${m.id}:${cid}`); }
        if (cid === 'il' || cid === 'fp') { carriers.mage++; memberIdsByRole.mage.add(`${m.id}:${cid}`); }
        if (cid === 'bm' || cid === 'mm') { carriers.se++; memberIdsByRole.se.add(`${m.id}:${cid}`); }
        if (cid === 'dk') { carriers.hb++; memberIdsByRole.hb.add(`${m.id}:${cid}`); }
        if (cid === 'nl') { carriers.nl++; memberIdsByRole.nl.add(`${m.id}:${cid}`); }
        if (cid === 'shad') { carriers.shad++; memberIdsByRole.shad.add(`${m.id}:${cid}`); }
        if (cid === 'bucc') { carriers.bucc++; memberIdsByRole.bucc.add(`${m.id}:${cid}`); }
        if (hasClassMw20(m, cid)) { carriers.mw20++; memberIdsByRole.mw20.add(`${m.id}:${cid}`); }
      });
    });
    futureDemand.push({ boss: rBoss, rules: rRules, carriers, memberIdsByRole });
  }
  return futureDemand;
}

function computeFutureScarcityPenalty(assignment, futureDemand) {
  if (!futureDemand || futureDemand.length === 0) return 0;
  let penalty = 0;
  for (const item of assignment) {
    if (item.member.isPug) continue;
    const mid = item.member.baseMemberId || item.member.id;
    const pairKey = `${mid}:${item.classId}`;
    for (const fd of futureDemand) {
      const b = fd.boss;
      const r = fd.rules;
      if (r.requireBishop && fd.memberIdsByRole.bs.has(pairKey) && fd.carriers.bs <= 2) penalty += 18;
      if ((r.requireHB || b.isExpedition12) && fd.memberIdsByRole.hb.has(pairKey) && fd.carriers.hb <= (b.isExpedition12 ? 3 : 2)) penalty += 16;
      if ((r.requireSE || b.isExpedition12) && fd.memberIdsByRole.se.has(pairKey) && fd.carriers.se <= (b.isExpedition12 ? 3 : 2)) penalty += 16;
      if (r.requireMage && fd.memberIdsByRole.mage.has(pairKey) && fd.carriers.mage <= (b.id === 'krexel' ? 3 : 2)) penalty += 16;
      if (r.requireNL && fd.memberIdsByRole.nl.has(pairKey) && fd.carriers.nl <= 2) penalty += 14;
      if (r.requireShad && fd.memberIdsByRole.shad.has(pairKey) && fd.carriers.shad <= (b.isExpedition12 ? 3 : 2)) penalty += 14;
      if (r.requireBucc && fd.memberIdsByRole.bucc.has(pairKey) && fd.carriers.bucc <= 2) penalty += 14;
      if (r.preferMw20 && fd.memberIdsByRole.mw20.has(pairKey) && fd.carriers.mw20 <= 2) penalty += 15;
    }
  }
  return penalty;
}

function pickCandidatesForMultiBoss(availMembers, boss, futureDemand, maxCandidates = 6, jobRules = null) {
  if (!availMembers || availMembers.length === 0) return [];
  const baseRules = jobRules || createDefaultRulesForBoss(boss);

  const getCandidateDiversifyKey = (s) => {
    const humanIds = s.assignment.filter(a => !a.member.isPug).map(a => a.member.baseMemberId || a.member.id).sort().join(',');
    const bsIds = s.assignment.filter(a => a.classId === 'bs').map(a => a.member.id).sort().join(',');
    const hbIds = s.assignment.filter(a => a.classId === 'dk').map(a => a.member.id).sort().join(',');
    const mwIds = (s.mw20Members || []).slice().sort().join(',');
    return `${humanIds}|${bsIds}|${hbIds}|${mwIds}`;
  };

  const evalSinglePool = (evalBoss, relaxRules) => {
    const overrides = relaxRules
      ? { ...baseRules, requireBishop: false, requireMage: false, requireSE: false, requireHB: false, requireBucc: false, requireShad: false, requireNL: false }
      : baseRules;
    return withBossRuleState(evalBoss, () => {
      const targetSize = Math.min(6, availMembers.length);
      if (targetSize === 0) return [];
      const subsets = getBoundedCombinations(availMembers, targetSize, 28);
      const bucket = new Map();

      const consider = (s) => {
        const rank = s.score + s.assignment.length * 25 - computeFutureScarcityPenalty(s.assignment, futureDemand);
        const key = getCandidateDiversifyKey(s);
        const prev = bucket.get(key);
        if (!prev || rank > prev.rank) {
          bucket.set(key, { s, rank });
        }
      };

      for (const sub of subsets) {
        const asns = generateAssignmentsForParty(sub, evalBoss.minLevel || 1, evalBoss);
        const cap = asns.length > 240 ? 240 : asns.length;
        for (let i = 0; i < cap; i++) {
          const asn = asns.length > 240 ? asns[Math.floor((i * asns.length) / 240)] : asns[i];
          const s = scoreAssignment(asn, evalBoss);
          if (s) consider(s);
        }
      }

      if (baseRules.allowDualBox && availMembers.length < 6) {
        const maxH = Math.min(5, availMembers.length);
        for (let h = 1; h <= maxH; h++) {
          const dualSubs = getBoundedCombinations(availMembers, h, 16);
          const reqDual = Math.min(3, 6 - h);
          for (const sub of dualSubs) {
            const dualAsns = generateDualBoxAssignmentsForParty(sub, reqDual, evalBoss.minLevel || 1, evalBoss);
            for (const asn of dualAsns) {
              const s = scoreAssignment(asn, evalBoss);
              if (s) consider(s);
            }
          }
        }
      }

      return Array.from(bucket.values())
        .sort((a, b) => b.rank - a.rank)
        .slice(0, maxCandidates)
        .map(x => x.s);
    }, overrides);
  };

  if (boss.isExpedition12) {
    const p1List = evalSinglePool(boss, false);
    const p1Pool = p1List.length > 0 ? p1List : evalSinglePool({ ...boss, id: '_relaxed_ht', minSize: 1 }, true);
    if (p1Pool.length === 0) return [];
    const results = [];
    for (const bestP1 of p1Pool.slice(0, 2)) {
      const used1Ids = new Set(bestP1.assignment.map(a => a.member.baseMemberId || a.member.id));
      const remMembers = availMembers.filter(m => !used1Ids.has(m.id));
      if (remMembers.length === 0) {
        results.push({ parties: [bestP1], isStrict: false });
        continue;
      }
      const evalSecond = (evalBoss, relaxRules) => {
        const overrides = relaxRules
          ? { ...baseRules, requireBishop: false, requireMage: false, requireSE: false, requireHB: false, requireBucc: false, requireShad: false, requireNL: false }
          : baseRules;
        return withBossRuleState(evalBoss, () => {
          const target2 = Math.min(6, remMembers.length);
          const subs2 = getBoundedCombinations(remMembers, target2, 20);
          let best2 = null;
          let bestRank2 = -Infinity;
          for (const sub2 of subs2) {
            const asns2 = generateAssignmentsForParty(sub2, evalBoss.minLevel || 1, evalBoss);
            const cap2 = asns2.length > 200 ? 200 : asns2.length;
            for (let i = 0; i < cap2; i++) {
              const asn2 = asns2.length > 200 ? asns2[Math.floor((i * asns2.length) / 200)] : asns2[i];
              const s2 = scoreAssignment(asn2, evalBoss, { isSplitSubParty: true });
              if (!s2) continue;
              const rank2 = s2.score + s2.assignment.length * 25 - computeFutureScarcityPenalty(s2.assignment, futureDemand);
              if (rank2 > bestRank2) {
                bestRank2 = rank2;
                best2 = s2;
              }
            }
          }
          return best2;
        }, overrides);
      };
      const bestP2 = evalSecond(boss, false) || evalSecond({ ...boss, id: '_relaxed_ht', minSize: 1 }, true);
      const parties = bestP2 ? [bestP1, bestP2] : [bestP1];
      const missCheck = analyzeMissingForMultiBoss(parties, boss, baseRules);
      results.push({ parties, isStrict: missCheck.isComplete });
    }
    return results;
  }

  const strictList = evalSinglePool(boss, false);
  if (strictList.length > 0) {
    return strictList.map(s => ({ parties: [s], isStrict: true }));
  }

  const relaxedList = evalSinglePool({ ...boss, minSize: 1 }, true);
  return relaxedList.map(s => ({ parties: [s], isStrict: false }));
}

function computeMultiBossSchedule() {
  const queue = state.multiBossQueue || [];
  if (queue.length === 0) return [];

  const beamWidth = queue.length <= 4 ? 8 : 5;
  const candPerStep = queue.length <= 4 ? 6 : 4;
  let beam = [{
    scheduled: [],
    allParties: [],
    usedCharPairs: new Set(),
    priorityScore: 0,
    rawScoreSum: 0,
    totalRank: 0
  }];

  for (let idx = 0; idx < queue.length; idx++) {
    const job = queue[idx];
    const boss = BOSSES.find(b => b.id === job.bossId);
    if (!boss) continue;
    const jobRules = job.rules || createDefaultRulesForBoss(boss);

    const priorityWeight = queue.length - idx;
    const nextBeamMap = new Map();

    for (const st of beam) {
      const availMembers = getSlotAvailableMembersForBoss(job.slotKey, boss, st.usedCharPairs, job.customMemberIds);
      const futureDemand = buildMultiBossScarcityMap(queue.slice(idx + 1), st.usedCharPairs);
      const candidates = pickCandidatesForMultiBoss(availMembers, boss, futureDemand, candPerStep, jobRules);
      const stepOptions = candidates.length > 0 ? candidates : [{ parties: [], isStrict: false }];

      for (const cand of stepOptions) {
        const nextUsed = new Set(st.usedCharPairs);
        let candRawScore = 0;
        cand.parties.forEach(p => {
          candRawScore += p.score;
          p.assignment.forEach(item => {
            if (!item.member.isPug) {
              const mid = item.member.baseMemberId || item.member.id;
              nextUsed.add(`${mid}:${item.classId}`);
            }
          });
        });

        const missingInfo = analyzeMissingForMultiBoss(cand.parties, boss, jobRules);
        const stepPriorityScore =
          (missingInfo.isComplete ? priorityWeight * 400 : 0) +
          missingInfo.filledCount * (priorityWeight * 25 + 80) -
          missingInfo.missingRoles.length * 40;
        const nextPriorityScore = st.priorityScore + stepPriorityScore;
        const nextRawScoreSum = st.rawScoreSum + candRawScore;
        const nextAllParties = [...st.allParties, ...cand.parties];
        const mwBonus = getMultiPartyMw20Bonus(nextAllParties);
        const totalRank = nextPriorityScore + mwBonus + nextRawScoreSum;

        const entryObj = {
          uid: job.uid,
          order: idx + 1,
          boss,
          slotKey: job.slotKey,
          slotLabel: getSlotLabelForKey(job.slotKey),
          parties: cand.parties,
          ...missingInfo
        };

        const stateSig = Array.from(nextUsed).sort().join('|') + '::' + missingInfo.filledCount;
        const prev = nextBeamMap.get(stateSig);
        if (!prev || totalRank > prev.totalRank) {
          nextBeamMap.set(stateSig, {
            scheduled: [...st.scheduled, entryObj],
            allParties: nextAllParties,
            usedCharPairs: nextUsed,
            priorityScore: nextPriorityScore,
            rawScoreSum: nextRawScoreSum,
            totalRank
          });
        }
      }
    }

    beam = Array.from(nextBeamMap.values())
      .sort((a, b) => b.totalRank - a.totalRank)
      .slice(0, beamWidth);
  }

  return beam[0]?.scheduled || [];
}

function addBossToMultiQueue(bossId) {
  const boss = BOSSES.find(b => b.id === bossId);
  if (!boss) return;
  const uid = `mb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const existing = (state.multiBossQueue || []).find(j => j.bossId === bossId);
  const slotKey = existing ? existing.slotKey : getDefaultSlotKeyForBoss(bossId);
  const rules = existing && existing.rules ? { ...existing.rules } : createDefaultRulesForBoss(boss);
  const customMemberIds = existing && Array.isArray(existing.customMemberIds) ? [...existing.customMemberIds] : null;
  state.multiBossQueue.push({ uid, bossId, slotKey, rules, customMemberIds });
  state.selectedMultiJobUid = uid;
  state.multiBossResults = null;
  renderAll();
}

function removeBossFromMultiQueue(bossId) {
  const idx = [...state.multiBossQueue].reverse().findIndex(j => j.bossId === bossId);
  if (idx === -1) return;
  const realIdx = state.multiBossQueue.length - 1 - idx;
  const [removed] = state.multiBossQueue.splice(realIdx, 1);
  if (removed && state.selectedMultiJobUid === removed.uid) {
    state.selectedMultiJobUid = state.multiBossQueue[0]?.uid || null;
  }
  state.multiBossResults = null;
  renderAll();
}

function removeMultiQueueItemByUid(uid) {
  state.multiBossQueue = state.multiBossQueue.filter(j => j.uid !== uid);
  if (state.selectedMultiJobUid === uid) {
    state.selectedMultiJobUid = state.multiBossQueue[0]?.uid || null;
  }
  state.multiBossResults = null;
  renderAll();
}

function moveMultiQueueItem(uid, delta) {
  const idx = state.multiBossQueue.findIndex(j => j.uid === uid);
  const targetIdx = idx + delta;
  if (idx < 0 || targetIdx < 0 || targetIdx >= state.multiBossQueue.length) return;
  const tmp = state.multiBossQueue[idx];
  state.multiBossQueue[idx] = state.multiBossQueue[targetIdx];
  state.multiBossQueue[targetIdx] = tmp;
  state.multiBossResults = null;
  renderAll();
}

function setMultiQueueItemSlot(uid, slotKey) {
  const item = state.multiBossQueue.find(j => j.uid === uid);
  if (!item) return;
  item.slotKey = slotKey;
  if (slotKey === 'custom' && !Array.isArray(item.customMemberIds)) {
    item.customMemberIds = [...state.activeMemberIds];
  }
  state.selectedMultiJobUid = uid;
  state.multiBossResults = null;
  renderAll();
}

function isJobRulesCustomized(job) {
  const boss = BOSSES.find(b => b.id === job.bossId);
  if (!boss || !job.rules) return false;
  const def = createDefaultRulesForBoss(boss);
  return Object.keys(def).some(k => Boolean(job.rules[k]) !== Boolean(def[k]));
}

function getMultiQueueLabels() {
  const bossRunIndexMap = {};
  return (state.multiBossQueue || []).map((job, idx) => {
    const b = BOSSES.find(x => x.id === job.bossId);
    bossRunIndexMap[job.bossId] = (bossRunIndexMap[job.bossId] || 0) + 1;
    const runNum = bossRunIndexMap[job.bossId];
    const shortName = BOSS_SHORT_MAP[job.bossId] || b?.name || job.bossId;
    return {
      uid: job.uid,
      order: idx + 1,
      shortName,
      runNum,
      label: `#${idx + 1} ${shortName} 第${runNum}團`,
      pillText: `#${idx + 1} ${shortName}${runNum > 1 || (state.multiBossQueue.filter(x => x.bossId === job.bossId).length > 1) ? ` #${runNum}` : ''}`
    };
  });
}

function renderMultiStep2And3() {
  const step2Bar = document.getElementById('multiStep2Bar');
  const step3Header = document.getElementById('multiStep3Header');
  const singlePartySec = document.getElementById('singlePartyModeSection');
  const step3Title = document.getElementById('step3Title');

  const isMulti = state.plannerMode === 'multi';
  if (singlePartySec) singlePartySec.classList.toggle('hidden', isMulti);
  if (step3Title) {
    step3Title.textContent = isMulti ? 'STEP 3：各別王團組隊條件' : 'STEP 3：組隊條件與分隊模式';
  }

  if (!isMulti) {
    if (step2Bar) { step2Bar.classList.add('hidden'); step2Bar.innerHTML = ''; }
    if (step3Header) { step3Header.classList.add('hidden'); step3Header.innerHTML = ''; }
    return;
  }

  const activeJob = getActiveMultiBossJob();
  const labels = getMultiQueueLabels();

  if (!activeJob) {
    const emptyMsg = `<div class="p-2 rounded-lg border border-dashed border-[var(--border)] text-[11px] text-[var(--muted-foreground)]">請先在 STEP 1 加入要排的王團，再點選各團設定時段與條件。</div>`;
    if (step2Bar) { step2Bar.classList.remove('hidden'); step2Bar.innerHTML = emptyMsg; }
    if (step3Header) { step3Header.classList.remove('hidden'); step3Header.innerHTML = emptyMsg; }
    return;
  }

  const activeMeta = labels.find(l => l.uid === activeJob.uid) || labels[0];
  const pillsHtml = labels.map(l => {
    const selected = l.uid === activeJob.uid;
    return `<button type="button" data-mb-pill="${l.uid}" class="btn-mb-pill px-2 py-1 rounded-md text-[11px] font-bold border transition ${
      selected
        ? 'border-amber-500 bg-amber-500 text-black shadow-sm'
        : 'border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-amber-500/50 hover:text-[var(--foreground)]'
    }">${l.label}</button>`;
  }).join('');

  if (step2Bar) {
    step2Bar.classList.remove('hidden');
    step2Bar.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <span class="text-[11px] font-bold text-amber-300">目前設定：${activeMeta.label}</span>
        <button type="button" id="btnApplySlotAllJobs" class="text-[11px] text-amber-300 hover:underline">套用此時段/名單至全部團</button>
      </div>
      <div class="flex flex-wrap gap-1">${pillsHtml}</div>
    `;
    step2Bar.querySelectorAll('.btn-mb-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedMultiJobUid = btn.getAttribute('data-mb-pill');
        renderAll();
      });
    });
    document.getElementById('btnApplySlotAllJobs')?.addEventListener('click', () => {
      const srcSlot = activeJob.slotKey;
      const srcMembers = srcSlot === 'custom'
        ? [...(Array.isArray(activeJob.customMemberIds) ? activeJob.customMemberIds : state.activeMemberIds)]
        : null;
      state.multiBossQueue.forEach(j => {
        j.slotKey = srcSlot;
        if (srcSlot === 'custom') j.customMemberIds = [...srcMembers];
      });
      state.multiBossResults = null;
      renderAll();
    });
  }

  if (step3Header) {
    step3Header.classList.remove('hidden');
    const sameBossCount = state.multiBossQueue.filter(j => j.bossId === activeJob.bossId).length;
    step3Header.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <span class="text-[11px] font-bold text-amber-300">正在設定條件：${activeMeta.label}</span>
        <div class="flex items-center gap-2">
          ${sameBossCount > 1 ? `<button type="button" id="btnApplyRulesSameBoss" class="text-[11px] text-amber-300 hover:underline">套用到所有${activeMeta.shortName}</button>` : ''}
          <button type="button" id="btnResetJobRules" class="text-[11px] text-[var(--muted-foreground)] hover:text-amber-300 underline">還原建議預設</button>
        </div>
      </div>
      <div class="flex flex-wrap gap-1">${pillsHtml}</div>
    `;
    step3Header.querySelectorAll('.btn-mb-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedMultiJobUid = btn.getAttribute('data-mb-pill');
        renderAll();
      });
    });
    document.getElementById('btnApplyRulesSameBoss')?.addEventListener('click', () => {
      const srcRules = { ...activeJob.rules };
      state.multiBossQueue.forEach(j => {
        if (j.bossId === activeJob.bossId) {
          j.rules = { ...srcRules };
        }
      });
      state.multiBossResults = null;
      renderAll();
    });
    document.getElementById('btnResetJobRules')?.addEventListener('click', () => {
      const boss = BOSSES.find(b => b.id === activeJob.bossId);
      if (boss) {
        activeJob.rules = createDefaultRulesForBoss(boss);
        state.multiBossResults = null;
        renderAll();
      }
    });
  }
}

function runMultiBossPlanning() {
  state.multiBossResults = computeMultiBossSchedule();
  renderResults();
}

function renderMultiBossPanel() {
  const singleBtn = document.getElementById('btnPlannerModeSingle');
  const multiBtn = document.getElementById('btnPlannerModeMulti');
  const bossSelectorEl = document.getElementById('bossSelector');
  const multiPanelEl = document.getElementById('multiBossPanel');
  if (!multiPanelEl || !bossSelectorEl) return;

  const isMulti = state.plannerMode === 'multi';
  if (singleBtn && multiBtn) {
    singleBtn.className = `py-1.5 px-2 rounded-md text-xs font-bold transition ${
      !isMulti ? 'bg-amber-500 text-black' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
    }`;
    multiBtn.className = `py-1.5 px-2 rounded-md text-xs font-bold transition ${
      isMulti ? 'bg-amber-500 text-black' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
    }`;
  }

  bossSelectorEl.classList.toggle('hidden', isMulti);
  multiPanelEl.classList.toggle('hidden', !isMulti);
  if (!isMulti) return;

  const activeJob = getActiveMultiBossJob();
  const countsByBoss = {};
  BOSSES.forEach(b => { countsByBoss[b.id] = 0; });
  state.multiBossQueue.forEach(j => {
    if (countsByBoss[j.bossId] !== undefined) countsByBoss[j.bossId]++;
  });

  // Build available slot options for dropdowns
  const slotOptions = [];
  DAYS.forEach(d => {
    PERIODS.forEach(p => {
      const raw = state.members.filter(m => m.slots[d.id] && m.slots[d.id].includes(p.id));
      if (raw.length >= 1) {
        slotOptions.push({ key: `${d.id}_${p.id}`, label: `${d.label} ${p.short} (${raw.length}人)` });
      }
    });
  });

  const bossStepperRows = BOSSES.map(b => {
    const cnt = countsByBoss[b.id] || 0;
    const shortName = BOSS_SHORT_MAP[b.id] || b.name;
    return `
      <div class="flex items-center justify-between gap-2 p-2 rounded-lg border ${cnt > 0 ? 'border-amber-500/60 bg-amber-500/10' : 'border-[var(--border)] bg-[var(--background)]'}">
        <div class="min-w-0">
          <div class="text-xs font-bold text-[var(--foreground)] truncate">${shortName} <span class="text-[10px] font-normal text-[var(--muted-foreground)]">${b.isExpedition12 ? '(12人)' : `(Lv.${b.minLevel}+)`}</span></div>
        </div>
        <div class="shrink-0 inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <button type="button" data-mb-dec="${b.id}" class="btn-mb-dec px-2 py-1 text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] disabled:opacity-30" ${cnt <= 0 ? 'disabled' : ''}>−</button>
          <span class="px-2 text-xs font-bold ${cnt > 0 ? 'text-amber-300' : 'text-[var(--muted-foreground)]'}">${cnt}</span>
          <button type="button" data-mb-inc="${b.id}" class="btn-mb-inc px-2 py-1 text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)]">＋</button>
        </div>
      </div>
    `;
  }).join('');

  const bossRunIndexMap = {};
  const queueRows = state.multiBossQueue.length === 0
    ? `<div class="p-3 rounded-lg border border-dashed border-[var(--border)] text-center text-xs text-[var(--muted-foreground)]">請先點擊上方各王的「＋」加入要排的團次</div>`
    : state.multiBossQueue.map((job, idx) => {
        const b = BOSSES.find(x => x.id === job.bossId);
        bossRunIndexMap[job.bossId] = (bossRunIndexMap[job.bossId] || 0) + 1;
        const runNum = bossRunIndexMap[job.bossId];
        const shortName = BOSS_SHORT_MAP[job.bossId] || b?.name || job.bossId;
        const isSelected = activeJob && activeJob.uid === job.uid;
        const customized = isJobRulesCustomized(job);
        const optHtml = [
          `<option value="custom" ${job.slotKey === 'custom' ? 'selected' : ''}>🛠️ 使用 STEP 2 勾選名單</option>`,
          ...slotOptions.map(o => `<option value="${o.key}" ${job.slotKey === o.key ? 'selected' : ''}>${o.label}</option>`)
        ].join('');
        return `
          <div data-mb-select="${job.uid}" class="mb-job-row cursor-pointer p-2 rounded-lg border transition space-y-1.5 ${
            isSelected
              ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40'
              : 'border-[var(--border)] bg-[var(--background)] hover:border-amber-500/40'
          }">
            <div class="flex items-center justify-between gap-1.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold shrink-0">#${idx + 1}</span>
                <span class="text-xs font-bold text-[var(--foreground)] truncate">${shortName} 第${runNum}團</span>
                ${isSelected ? `<span class="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold shrink-0">設定中</span>` : ''}
                ${customized ? `<span class="px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[9px] shrink-0">自訂條件</span>` : ''}
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <button type="button" data-mb-up="${job.uid}" class="btn-mb-up px-1.5 py-0.5 rounded border border-[var(--border)] text-[10px] hover:border-amber-500/60 disabled:opacity-30" ${idx === 0 ? 'disabled' : ''} title="提高優先順序">↑</button>
                <button type="button" data-mb-down="${job.uid}" class="btn-mb-down px-1.5 py-0.5 rounded border border-[var(--border)] text-[10px] hover:border-amber-500/60 disabled:opacity-30" ${idx === state.multiBossQueue.length - 1 ? 'disabled' : ''} title="降低優先順序">↓</button>
                <button type="button" data-mb-del="${job.uid}" class="btn-mb-del px-1.5 py-0.5 rounded border border-rose-500/40 text-rose-300 text-[10px] hover:bg-rose-500/20" title="移除此團">✕</button>
              </div>
            </div>
            <select data-mb-slot="${job.uid}" class="sel-mb-slot w-full px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)] text-[11px] text-[var(--foreground)] focus:outline-none">
              ${optHtml}
            </select>
          </div>
        `;
      }).join('');

  multiPanelEl.innerHTML = `
    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="text-xs text-[var(--muted-foreground)]">選擇各王團數：</span>
        <button type="button" id="btnMultiBossClear" class="text-[11px] text-[var(--muted-foreground)] hover:text-rose-300 underline">清空</button>
      </div>
      <div class="grid grid-cols-2 gap-1.5">${bossStepperRows}</div>
    </div>
    <div class="space-y-1.5 pt-1 border-t border-[var(--border)]">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-semibold text-[var(--foreground)]">優先順序與各團設定（點擊可切至 STEP 2/3）：</span>
        ${state.selectedPreset !== 'custom' ? `<button type="button" id="btnMultiBossApplyPresetAll" class="text-[11px] text-amber-300 hover:underline shrink-0">全套用 STEP 2 時段</button>` : ''}
      </div>
      <div class="space-y-1.5 max-h-60 overflow-y-auto pr-0.5">${queueRows}</div>
    </div>
    <p class="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
      💡 參數變更即會自動重算排團；點擊任一團即可於右側 STEP 2/3 個別微調該團時段、名單與必備職業條件（同一隻角色只出戰 1 次，分身可跨團）。
    </p>
  `;

  multiPanelEl.querySelectorAll('.mb-job-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target && e.target.closest && e.target.closest('button, select')) return;
      state.selectedMultiJobUid = row.getAttribute('data-mb-select');
      renderAll();
    });
  });

  multiPanelEl.querySelectorAll('.btn-mb-inc').forEach(btn => {
    btn.addEventListener('click', () => addBossToMultiQueue(btn.getAttribute('data-mb-inc')));
  });
  multiPanelEl.querySelectorAll('.btn-mb-dec').forEach(btn => {
    btn.addEventListener('click', () => removeBossFromMultiQueue(btn.getAttribute('data-mb-dec')));
  });
  multiPanelEl.querySelectorAll('.btn-mb-up').forEach(btn => {
    btn.addEventListener('click', () => moveMultiQueueItem(btn.getAttribute('data-mb-up'), -1));
  });
  multiPanelEl.querySelectorAll('.btn-mb-down').forEach(btn => {
    btn.addEventListener('click', () => moveMultiQueueItem(btn.getAttribute('data-mb-down'), 1));
  });
  multiPanelEl.querySelectorAll('.btn-mb-del').forEach(btn => {
    btn.addEventListener('click', () => removeMultiQueueItemByUid(btn.getAttribute('data-mb-del')));
  });
  multiPanelEl.querySelectorAll('.sel-mb-slot').forEach(sel => {
    sel.addEventListener('change', (e) => setMultiQueueItemSlot(sel.getAttribute('data-mb-slot'), e.target.value));
  });
  document.getElementById('btnMultiBossClear')?.addEventListener('click', () => {
    state.multiBossQueue = [];
    state.multiBossResults = null;
    renderAll();
  });
  document.getElementById('btnMultiBossApplyPresetAll')?.addEventListener('click', () => {
    if (state.selectedPreset) {
      state.multiBossQueue.forEach(j => { j.slotKey = state.selectedPreset; });
      state.multiBossResults = null;
      renderAll();
    }
  });
}

function renderMultiBossResults() {
  const container = document.getElementById('resultsContainer');
  if (!container) return;

  const results = computeMultiBossSchedule();
  state.multiBossResults = results;
  if (!results || results.length === 0) {
    container.innerHTML = `
      <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center space-y-2">
        <p class="text-sm font-semibold text-[var(--foreground)]">目前多王排團清單為空</p>
        <p class="text-xs text-[var(--muted-foreground)]">請於左上 STEP 1 的「🗂️ 多王排團」點擊各王「＋」新增團次，系統將自動計算最佳配置。</p>
      </div>
    `;
    return;
  }

  const fullCount = results.filter(r => r.isComplete).length;
  const incompleteCount = results.length - fullCount;
  const totalAssignedChars = results.reduce((sum, r) => sum + r.filledCount, 0);
  const usedHumanIds = new Set();
  results.forEach(r => r.parties.forEach(p => p.assignment.forEach(a => {
    if (!a.member.isPug) usedHumanIds.add(a.member.baseMemberId || a.member.id);
  })));

  const summaryHtml = `
    <div class="bg-[var(--card)] border border-amber-500/50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div class="space-y-1">
        <h3 class="text-base font-bold text-[var(--foreground)]">
          🗂️ 多王綜合排團結果（共 ${results.length} 團｜✅ 滿編 ${fullCount} 團${incompleteCount > 0 ? `｜⚠️ 待補位 ${incompleteCount} 團` : ''}）
        </h3>
        <p class="text-xs text-[var(--muted-foreground)]">
          已分配 <strong>${usedHumanIds.size} 位團員</strong> 共 <strong>${totalAssignedChars} 隻角色</strong>（全程不重複使用同一角色）
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2 shrink-0">
        <button type="button" id="btnLockAllMultiBoss" class="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-500/60 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30">
          🔒 一鍵鎖定全部 ${results.length} 團
        </button>
        <button type="button" id="btnCopyAllMultiBoss" class="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">
          複製全部出團名單 (Discord)
        </button>
      </div>
    </div>
  `;

  const bossSeqCounter = {};
  const cardsHtml = results.map((res, rIdx) => {
    bossSeqCounter[res.boss.id] = (bossSeqCounter[res.boss.id] || 0) + 1;
    const bossRunIdx = bossSeqCounter[res.boss.id];
    const shortName = BOSS_SHORT_MAP[res.boss.id] || res.boss.name;

    const partiesHtml = res.parties.length === 0
      ? `<div class="p-3 rounded-lg border border-dashed border-rose-500/40 bg-rose-500/10 text-xs text-rose-300">目前該時段剩餘可用角色為 0 人（全部角色已被前序團次或鎖定陣容佔用），需全數外找（缺 ${res.targetSize} 人）。</div>`
      : `<div class="grid grid-cols-1 ${res.parties.length >= 2 ? 'lg:grid-cols-2' : ''} gap-3">
          ${res.parties.map((p, pIdx) => `
            <div class="bg-[var(--background)] border border-[var(--border)] rounded-lg p-3 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-bold text-[var(--foreground)]">${res.parties.length > 1 ? `🚩 第 ${pIdx + 1} 隊（${p.assignment.length}/6 人）` : `🚩 出團陣容（${p.assignment.length}/6 人）`}</span>
                <span class="text-xs text-amber-400 font-medium">${p.compSig}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${p.tags.map(t => `<span class="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${t}</span>`).join('')}
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 pt-0.5">
                ${p.assignment.map(item => {
                  const hasMw = !item.member.isPug && hasClassMw20(item.member, item.classId);
                  return `
                    <div class="p-2 rounded border border-[var(--border)] bg-[var(--card)] flex items-center justify-between gap-1.5">
                      <span class="text-xs font-semibold truncate text-[var(--foreground)]" title="${escapeHtml(item.member.name)}">${escapeHtml(item.member.name)}</span>
                      <span class="px-2 py-0.5 rounded text-xs border shrink-0 whitespace-nowrap ${item.classObj.badge}">${item.classObj.short} Lv.${item.level || getClassLevel(item.member, item.classId)}${hasMw ? ' 🍁20' : ''}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>`;

    return `
      <div class="bg-[var(--card)] border ${res.isComplete ? 'border-emerald-500/40' : 'border-rose-500/50'} rounded-xl p-4 space-y-3">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-black">優先 #${res.order}</span>
              <span class="text-sm font-bold text-[var(--foreground)]">${shortName} 第 ${bossRunIdx} 團</span>
              <span class="px-2 py-0.5 rounded text-xs border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]">🕒 ${res.slotLabel}</span>
              <span class="px-2 py-0.5 rounded text-xs font-semibold ${res.isComplete ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-200 border border-rose-500/50'}">${res.statusText}</span>
              ${res.mw20Missing ? `<span class="px-2 py-0.5 rounded text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30">⚠️ 缺 🍁楓祝20</span>` : ''}
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            ${res.filledCount > 0 ? `
              <button type="button" data-mb-lock-idx="${rIdx}" class="btn-mb-lock-single shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-semibold border border-rose-500/50 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30">
                🔒 鎖定此團
              </button>
              <button type="button" data-mb-copy-idx="${rIdx}" class="btn-mb-copy-single shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-amber-500/60">
                複製此團
              </button>
            ` : ''}
          </div>
        </div>
        ${partiesHtml}
      </div>
    `;
  }).join('');

  container.innerHTML = `${summaryHtml}${cardsHtml}`;

  const formatOneRunDiscord = (res, idxNum) => {
    const header = `**【#${res.order} ${res.boss.name}｜${res.slotLabel}｜${res.statusText}】**`;
    if (res.parties.length === 0) return `${header}\n（目前無可用公會角色，需外找 ${res.targetSize} 人）`;
    const body = res.parties.map((p, pIdx) =>
      formatDiscordText(res.parties.length > 1 ? `第${pIdx + 1}隊` : `第${idxNum}團`, res.boss.name, res.slotLabel, p.assignment)
    ).join('\n');
    return `${header}\n${body}`;
  };

  document.getElementById('btnCopyAllMultiBoss')?.addEventListener('click', () => {
    const blocks = results.map((res, i) => formatOneRunDiscord(res, i + 1));
    showCopyModal(`🗂️ **【Artale 多王排團總表】**\n────────────────────────\n\n${blocks.join('\n\n')}`);
  });

  document.getElementById('btnLockAllMultiBoss')?.addEventListener('click', () => {
    results.forEach((res) => {
      res.parties.forEach((p, pIdx) => {
        if (p.assignment.length > 0) {
          lockLineup(res.boss, res.slotKey, res.slotLabel, p.compSig, p.assignment, res.parties.length > 1 ? `多王#${res.order}-第${pIdx + 1}隊` : `多王#${res.order}`);
        }
      });
    });
  });

  container.querySelectorAll('.btn-mb-copy-single').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-mb-copy-idx'));
      const res = results[idx];
      if (res) showCopyModal(formatOneRunDiscord(res, idx + 1));
    });
  });

  container.querySelectorAll('.btn-mb-lock-single').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-mb-lock-idx'));
      const res = results[idx];
      if (!res) return;
      res.parties.forEach((p, pIdx) => {
        if (p.assignment.length > 0) {
          lockLineup(res.boss, res.slotKey, res.slotLabel, p.compSig, p.assignment, res.parties.length > 1 ? `多王#${res.order}-第${pIdx + 1}隊` : `多王#${res.order}`);
        }
      });
    });
  });
}

function renderBossSelector() {
  const container = document.getElementById('bossSelector');
  const badge = document.getElementById('bossPartyLimitBadge');
  if (badge) {
    badge.textContent = state.selectedBossId === 'horntail' ? '遠征隊上限 12 人（2 隊）' : '隊伍上限 6 人';
  }
  const singleLabel = document.getElementById('partyModeSingleLabel');
  const twoRunsLabel = document.getElementById('partyModeTwoRunsLabel');
  const threeRunsLabel = document.getElementById('partyModeThreeRunsLabel');
  const fourRunsLabel = document.getElementById('partyModeFourRunsLabel');
  const fiveRunsLabel = document.getElementById('partyModeFiveRunsLabel');
  const partyModeDesc = document.getElementById('partyModeDesc');
  if (singleLabel) singleLabel.textContent = '1 團';
  if (twoRunsLabel) twoRunsLabel.textContent = state.selectedBossId === 'horntail' ? '2 團 (遠征)' : '2 團';
  if (threeRunsLabel) threeRunsLabel.textContent = '3 團';
  if (fourRunsLabel) fourRunsLabel.textContent = '4 團';
  if (fiveRunsLabel) fiveRunsLabel.textContent = '5 團';

  const runCount = getRequestedRunCount(state.partyMode);
  const activeModeVal = runCountToPartyMode(runCount);
  document.querySelectorAll('input[name="partyMode"]').forEach(r => {
    r.checked = (r.value === activeModeVal);
  });
  const stepper = document.getElementById('partyCustomStepper');
  const runInput = document.getElementById('partyRunCountInput');
  const decBtn = document.getElementById('btnDecRunCount');
  const incBtn = document.getElementById('btnIncRunCount');
  if (runInput && document.activeElement !== runInput) {
    runInput.value = String(runCount);
  }
  if (decBtn) decBtn.disabled = runCount <= 1;
  if (incBtn) incBtn.disabled = runCount >= 10;
  if (stepper) {
    const isCustomHigh = runCount >= 5;
    stepper.classList.toggle('border-amber-500/80', isCustomHigh);
    stepper.classList.toggle('bg-amber-500/15', isCustomHigh);
    stepper.classList.toggle('border-[var(--border)]', !isCustomHigh);
    stepper.classList.toggle('bg-[var(--background)]', !isCustomHigh);
    if (runInput) {
      runInput.classList.toggle('text-amber-300', isCustomHigh);
      runInput.classList.toggle('text-[var(--foreground)]', !isCustomHigh);
    }
  }

  if (partyModeDesc) {
    if (runCount === 1) {
      partyModeDesc.textContent = state.selectedBossId === 'horntail'
        ? '單隊試打 / 前哨模式（選 6 人組成 1 隊，非完整 12 人遠征隊）'
        : '單隊最佳排列組合（選最多 6 人組成 1 隊）';
    } else if (runCount === 2) {
      partyModeDesc.textContent = state.selectedBossId === 'horntail'
        ? '🐉 龍王 12 人遠征隊編制（推薦）：自動配置第 1 隊 6 人 ＋ 第 2 隊 6 人'
        : '雙團 / 分身連打 2 場規劃（超過 6 人時全員參與，10 人以上可直接拆 2 隊！）';
    } else {
      const cnU = RUN_COUNT_CN[runCount] || String(runCount);
      partyModeDesc.textContent = `${cnU}團 / 分身連打 ${runCount} 場規劃（多角色連打 ${runCount} 場或 ${runCount * 5} 人以上直接拆 ${runCount} 隊，盡量分散主教與楓祝 20！）`;
    }
  }
  const activeMultiJob = state.plannerMode === 'multi' ? getActiveMultiBossJob() : null;
  const effectiveBossId = activeMultiJob ? activeMultiJob.bossId : state.selectedBossId;

  const seLabel = document.getElementById('labelRequireSE');
  if (seLabel) {
    seLabel.innerHTML = effectiveBossId === 'horntail'
      ? '必備 <strong>1 箭神 ＋ 1 神射手</strong>（龍王遠征兩隊各分配 1 會心之眼）'
      : '必備至少 1 位 <strong>弓 / 弩手</strong>（會心之眼）';
  }
  const hbLabel = document.getElementById('labelRequireHB');
  if (hbLabel) {
    hbLabel.innerHTML = effectiveBossId === 'horntail'
      ? '必備 <strong>兩火 (黑騎士)</strong>（龍王遠征每隊各分配 1 火防秒殺）'
      : '必備至少 1 位 <strong>黑騎士 (火)</strong>（神聖之火）';
  }
  const buccLabel = document.getElementById('labelRequireBucc');
  if (buccLabel) {
    buccLabel.innerHTML = effectiveBossId === 'horntail'
      ? '必備至少 1 位 <strong>拳霸</strong>（時間置換 Time Leap，龍王必備）'
      : '必備至少 1 位 <strong>拳霸</strong>（時間置換 Time Leap）';
  }
  const shadLabel = document.getElementById('labelRequireShad');
  if (shadLabel) {
    shadLabel.innerHTML = effectiveBossId === 'horntail'
      ? '必備 <strong>兩刀賊 (暗影神偷)</strong>（可兩隊各1刀，或2刀與拳霸同隊）'
      : '必備至少 1 位 <strong>刀賊 (暗影神偷)</strong>（煙霧彈防護）';
  }
  const nlLabel = document.getElementById('labelRequireNL');
  if (nlLabel) {
    nlLabel.innerHTML = effectiveBossId === 'epinea'
      ? '必備 <strong>1~2 位 標賊 (夜使者)</strong>（蝴蝶王必備主力輸出）'
      : '必備至少 1 位 <strong>標賊 (夜使者)</strong>（高單體爆發）';
  }
  const mw20Label = document.getElementById('labelPreferMw20');
  if (mw20Label) {
    mw20Label.innerHTML = effectiveBossId === 'pap'
      ? '優先排入 <strong>🍁 楓葉祝福 20</strong>（普通拉圖斯預設可免，勾選則一樣優先配置）'
      : effectiveBossId === 'horntail'
      ? '必備 / 優先排入 <strong>🍁 楓葉祝福 20</strong>（龍王盡量兩隊各配置 1 位並避免集中同隊）'
      : '必備 / 優先排入 <strong>🍁 楓葉祝福 20</strong>（每場配置 1 位並分散隊伍，普拉可免）';
  }
  const mageLabel = document.getElementById('labelRequireMage');
  if (mageLabel) {
    mageLabel.innerHTML = effectiveBossId === 'krexel'
      ? '必備至少 2 位 <strong>冰雷 / 火毒</strong>（樹王左右打怪暈怪控場）'
      : '必備 <strong>冰雷 / 火毒</strong>（困拉需1位、樹王需2位）';
  }

  const ruleSource = activeMultiJob
    ? (activeMultiJob.rules || createDefaultRulesForBoss(BOSSES.find(b => b.id === activeMultiJob.bossId)))
    : state;
  const ruleCheckboxMap = [
    ['ruleRequireBishop', 'requireBishop'],
    ['ruleRequireMage', 'requireMage'],
    ['ruleRequireSE', 'requireSE'],
    ['ruleRequireHB', 'requireHB'],
    ['ruleRequireBucc', 'requireBucc'],
    ['ruleRequireShad', 'requireShad'],
    ['ruleRequireNL', 'requireNL'],
    ['rulePreferMw20', 'preferMw20'],
    ['ruleAllowDualBox', 'allowDualBox']
  ];
  ruleCheckboxMap.forEach(([elId, prop]) => {
    const el = document.getElementById(elId);
    if (el) el.checked = Boolean(ruleSource[prop]);
  });

  container.innerHTML = BOSSES.map(b => {
    const active = b.id === state.selectedBossId;
    return `
      <button type="button" data-boss="${b.id}" aria-pressed="${active ? 'true' : 'false'}" class="boss-card w-full text-left cursor-pointer p-3 rounded-lg border transition ${
        active
          ? 'border-amber-500 bg-amber-500/10'
          : 'border-[var(--border)] bg-[var(--background)] hover:opacity-85'
      }">
        <div class="flex flex-wrap items-center justify-between gap-1.5">
          <span class="text-sm font-bold text-[var(--foreground)] break-words">${b.name}</span>
          <span class="px-2 py-0.5 rounded text-xs border break-words ${b.tagClass}">${b.shortTag || b.tag}</span>
        </div>
        <p class="text-xs text-[var(--muted-foreground)] mt-1">${b.desc}</p>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.boss-card').forEach(el => {
    el.addEventListener('click', () => {
      selectBoss(el.getAttribute('data-boss'));
    });
  });

  const heatmapBossContainer = document.getElementById('heatmapBossSelector');
  const heatmapBossNote = document.getElementById('heatmapCurrentBossNote');
  const currentBossObj = BOSSES.find(x => x.id === state.selectedBossId);
  if (heatmapBossNote && currentBossObj) {
    heatmapBossNote.textContent = `目前檢視：${currentBossObj.name}（${currentBossObj.tag}）`;
  }
  if (heatmapBossContainer) {
    heatmapBossContainer.innerHTML = BOSSES.map(b => {
      const active = b.id === state.selectedBossId;
      return `
        <button type="button" data-boss="${b.id}" class="heatmap-boss-btn p-2.5 rounded-lg border text-left transition flex flex-col justify-between gap-1 ${
          active
            ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/40'
            : 'border-[var(--border)] bg-[var(--card)] hover:opacity-85'
        }">
          <div class="flex items-center justify-between gap-1 min-w-0">
            <span class="text-xs font-bold ${active ? 'text-amber-300' : 'text-[var(--foreground)]'} break-words leading-snug">${active ? '✓ ' : ''}${b.name}</span>
          </div>
          <span class="px-1.5 py-0.5 rounded text-[10px] border w-fit max-w-full break-words leading-snug ${b.tagClass}">${b.shortTag || b.tag}</span>
        </button>
      `;
    }).join('');
    heatmapBossContainer.querySelectorAll('.heatmap-boss-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectBoss(btn.getAttribute('data-boss'));
      });
    });
  }
}

function selectBoss(bid) {
  if (!bid) return;
  state.selectedBossId = bid;
  state.showAllSplitPlans = false;
  const bObj = BOSSES.find(x => x.id === bid);
  if (bObj) {
    state.requireBishop = bObj.requireBishop;
    state.requireMage = bObj.requireMage;
    state.requireSE = bObj.requireSE;
    state.requireHB = !!bObj.requireHB;
    state.requireBucc = !!bObj.requireBucc;
    state.requireShad = !!bObj.requireShad;
    state.requireNL = !!bObj.requireNL;
    state.preferMw20 = bObj.preferMw20 !== undefined ? !!bObj.preferMw20 : bossNeedsMw20(bObj);
    state.allowDualBox = !!bObj.allowDualBox;
    document.getElementById('ruleRequireBishop').checked = state.requireBishop;
    document.getElementById('ruleRequireMage').checked = state.requireMage;
    document.getElementById('ruleRequireSE').checked = state.requireSE;
    document.getElementById('ruleRequireHB').checked = state.requireHB;
    document.getElementById('ruleRequireBucc').checked = state.requireBucc;
    document.getElementById('ruleRequireShad').checked = state.requireShad;
    document.getElementById('ruleRequireNL').checked = state.requireNL;
    const mw20RuleEl = document.getElementById('rulePreferMw20');
    if (mw20RuleEl) mw20RuleEl.checked = state.preferMw20;
    document.getElementById('ruleAllowDualBox').checked = state.allowDualBox;
    const mageLabel = document.getElementById('labelRequireMage');
    if (mageLabel) {
      mageLabel.innerHTML = bid === 'krexel'
        ? '必備至少 2 位 <strong>冰雷 / 火毒</strong>（樹王左右打怪暈怪控場）'
        : '必備 <strong>冰雷 / 火毒</strong>（困拉需1位、樹王需2位）';
    }
    if (bid === 'horntail') {
      state.partyMode = 'tworuns';
      const rTwo = document.querySelector('input[name="partyMode"][value="tworuns"]');
      if (rTwo) rTwo.checked = true;
    } else {
      state.partyMode = 'single';
      const rSingle = document.querySelector('input[name="partyMode"][value="single"]');
      if (rSingle) rSingle.checked = true;
    }
  }
  renderAll();
}

function renderActiveMemberPills() {
  const container = document.getElementById('activeMemberPills');
  const countBadge = document.getElementById('slotAvailableCount');
  const activeMultiJob = state.plannerMode === 'multi' ? getActiveMultiBossJob() : null;
  const targetBossId = activeMultiJob ? activeMultiJob.bossId : state.selectedBossId;
  const boss = BOSSES.find(b => b.id === targetBossId);
  const usage = getLockedUsage();
  const memberIdList = activeMultiJob
    ? (activeMultiJob.slotKey === 'custom'
        ? (Array.isArray(activeMultiJob.customMemberIds) ? activeMultiJob.customMemberIds : state.activeMemberIds)
        : getSlotRawMemberIds(activeMultiJob.slotKey))
    : state.activeMemberIds;

  const effectiveActive = getEffectiveMembersForPlanning(
    state.members.filter(m => memberIdList.includes(m.id)),
    boss
  );
  const effectiveCount = effectiveActive.length;
  const effectiveChars = effectiveActive.reduce((acc, m) => acc + m.classes.length, 0);
  const mw20PeopleCount = effectiveActive.filter(m => m.classes.some(cid => hasClassMw20(m, cid) && isClassAllowedForMember(m, cid, boss))).length;
  countBadge.textContent = `目前可出席：${effectiveCount} 人 / ${effectiveChars} 角${mw20PeopleCount > 0 ? `｜🍁×${mw20PeopleCount}` : ''}`;

  if (state.members.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-[var(--muted-foreground)] py-1">
        尚無團員資料，請前往「3. 團員職業與時間設定」或 <button id="btnInlineAddMember" class="text-amber-400 font-semibold underline hover:opacity-80">+ 點此新增/匯入團員</button>
      </div>
    `;
    document.getElementById('btnInlineAddMember')?.addEventListener('click', () => {
      switchTab('members');
    });
    return;
  }

  container.innerHTML = state.members.map(m => {
    const fullyExcluded = usage.isMemberFullyExcluded(m);
    const noBossChar = !fullyExcluded && !m.classes.some(cid => !usage.isClassLocked(m.id, cid) && isClassEnabledForBoss(m, cid, targetBossId));
    const active = !fullyExcluded && !noBossChar && memberIdList.includes(m.id);
    const mainCid = m.mainClass || m.preferredClass || m.classes[0];
    const classNames = m.classes.map(cid => {
      const lockedHere = usage.isClassLocked(m.id, cid);
      const bossEnabled = isClassEnabledForBoss(m, cid, targetBossId);
      const hasMw = !lockedHere && bossEnabled && hasClassMw20(m, cid);
      const spanClass = lockedHere
        ? 'line-through text-rose-400/80'
        : !bossEnabled
        ? 'line-through opacity-40'
        : '';
      const icon = lockedHere ? '🔒' : !bossEnabled ? '🚫' : (cid === mainCid ? '★' : '');
      const spanTitle = !bossEnabled
        ? '此角色於團員設定中未勾選打目前選擇的 BOSS'
        : hasMw
        ? '此角色已學「🍁 楓葉祝福 20」'
        : '';
      return `<span class="whitespace-nowrap ${spanClass}" title="${spanTitle}">${icon}${CLASS_MAP[cid]?.short || cid}(Lv.${getClassLevel(m, cid)})${hasMw ? '🍁' : ''}</span>`;
    }).join(' / ');
    return `
      <button data-mid="${m.id}" class="member-pill px-2.5 py-1.5 rounded-lg text-xs text-left border transition flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${
        fullyExcluded
          ? 'bg-rose-950/30 text-rose-300/70 border-rose-500/30 opacity-65'
          : noBossChar
          ? 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] opacity-45'
          : active
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
          : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] opacity-60'
      }" title="${fullyExcluded ? '此團員角色已於其他鎖定陣容排定（自動排除）' : noBossChar ? '此團員目前沒有勾選要打這隻王的角色' : '點擊切換本場是否出席'}">
        <span class="shrink-0 whitespace-nowrap">${fullyExcluded ? '🔒' : noBossChar ? '🚫' : active ? '✓' : '+'} ${escapeHtml(m.name)}</span>
        <span class="opacity-75">[${classNames}]</span>
        ${fullyExcluded ? '<span class="shrink-0 whitespace-nowrap px-1 rounded bg-rose-500/25 text-rose-300">已排團排除</span>' : ''}
        ${noBossChar ? '<span class="shrink-0 whitespace-nowrap px-1 rounded bg-slate-500/25 text-slate-300">未勾此王</span>' : ''}
        ${m.occasional ? '<span class="shrink-0 whitespace-nowrap px-1 rounded bg-amber-500/30 text-amber-300">偶爾</span>' : ''}
      </button>
    `;
  }).join('');

  container.querySelectorAll('.member-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const m = state.members.find(x => x.id === mid);
      if (m && (usage.isMemberFullyExcluded(m) || !m.classes.some(cid => !usage.isClassLocked(m.id, cid) && isClassEnabledForBoss(m, cid, targetBossId)))) return;
      if (activeMultiJob) {
        if (activeMultiJob.slotKey !== 'custom') {
          activeMultiJob.customMemberIds = [...getSlotRawMemberIds(activeMultiJob.slotKey)];
          activeMultiJob.slotKey = 'custom';
        } else if (!Array.isArray(activeMultiJob.customMemberIds)) {
          activeMultiJob.customMemberIds = [...state.activeMemberIds];
        }
        if (activeMultiJob.customMemberIds.includes(mid)) {
          activeMultiJob.customMemberIds = activeMultiJob.customMemberIds.filter(id => id !== mid);
        } else {
          activeMultiJob.customMemberIds.push(mid);
        }
        state.multiBossResults = null;
        renderAll();
        return;
      }
      if (state.activeMemberIds.includes(mid)) {
        state.activeMemberIds = state.activeMemberIds.filter(id => id !== mid);
      } else {
        state.activeMemberIds.push(mid);
      }
      state.selectedPreset = 'custom';
      document.getElementById('presetSlotSelect').value = 'custom';
      renderAll();
    });
  });
}

function renderPriorityPanel() {
  const grid = document.getElementById('priorityMemberGrid');
  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const minLevel = boss ? (boss.minLevel || 1) : 1;
  const usage = getLockedUsage();
  const activeMembers = state.members.filter(m =>
    state.activeMemberIds.includes(m.id) &&
    !usage.isMemberFullyExcluded(m) &&
    m.classes.some(cid => !usage.isClassLocked(m.id, cid) && isClassEnabledForBoss(m, cid, boss))
  );
  if (activeMembers.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-xs text-[var(--muted-foreground)]">請先於上方新增並勾選本場可出席團員（或確認角色有勾選打此 BOSS）</div>`;
    return;
  }

  grid.innerHTML = activeMembers.map(m => {
    const isMust = !!m.priorityAttend;
    return `
      <div class="p-2.5 rounded-lg border ${isMust ? 'border-sky-500/60 bg-sky-500/10' : 'border-[var(--border)] bg-[var(--background)]'} space-y-2">
        <div class="flex items-center justify-between gap-1">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold text-[var(--foreground)]">${escapeHtml(m.name)}</span>
            ${m.occasional ? '<span class="px-1 rounded bg-amber-500/20 text-amber-300 text-xs">偶爾</span>' : ''}
          </div>
          <button data-mid="${m.id}" class="btn-toggle-must px-2 py-0.5 rounded text-xs border transition ${
            isMust
              ? 'bg-sky-500/30 border-sky-400 text-sky-200 font-bold'
              : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }" title="超過6人時優先排入第一隊">
            ${isMust ? '📌 必上正選' : '+ 設為必上'}
          </button>
        </div>
        <div class="flex flex-wrap gap-1">
          ${m.classes.map(cid => {
            const cObj = CLASS_MAP[cid];
            const lvl = getClassLevel(m, cid);
            const reqLvl = getMinLevelForClass(boss, cid);
            const underLevel = lvl < reqLvl;
            const lockedInOther = usage.isClassLocked(m.id, cid);
            const bossEnabled = isClassEnabledForBoss(m, cid, boss);
            const lockEntries = usage.getClassLockEntries(m.id, cid);
            const hasMw = !lockedInOther && bossEnabled && hasClassMw20(m, cid);
            const isLocked = !lockedInOther && bossEnabled && m.lockedClass === cid;
            const isPref = !lockedInOther && bossEnabled && !isLocked && m.preferredClass === cid && (!underLevel || !!m.manualPref);
            let pillStyle = 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]';
            let prefix = '';
            if (lockedInOther) {
              pillStyle = 'bg-rose-950/40 text-rose-300/70 border-rose-500/40 line-through opacity-60 cursor-not-allowed';
              prefix = '🔒已排 ';
            } else if (!bossEnabled) {
              pillStyle = 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] line-through opacity-40 cursor-not-allowed';
              prefix = '🚫不打 ';
            } else if (isLocked) {
              pillStyle = underLevel
                ? 'bg-rose-500/30 text-rose-200 border-rose-400 font-bold ring-1 ring-amber-400/50'
                : 'bg-rose-500/25 text-rose-200 border-rose-400 font-bold';
              prefix = '🔒 ';
            } else if (isPref) {
              pillStyle = underLevel
                ? 'bg-amber-500/30 text-amber-200 border-amber-400 font-bold ring-1 ring-amber-400/50'
                : 'bg-amber-500/25 text-amber-200 border-amber-400 font-bold';
              prefix = '★ ';
            } else if (underLevel) {
              pillStyle = 'bg-rose-950/20 text-rose-400/80 border-rose-500/30 hover:bg-rose-950/40 hover:text-rose-200';
              prefix = '⚠️ ';
            }
            const baseTitle = lockedInOther
              ? `已於「${lockEntries.map(e => `${e.lineupTitle} (${e.slotLabel})`).join('、')}」鎖定出團，自動排除`
              : !bossEnabled
              ? `此角色於「3. 團員職業與時間設定」未勾選打 ${boss?.name || '此王'}`
              : isLocked
              ? `已鎖定必開（${underLevel ? `等級 Lv.${lvl} 未達要求 Lv.${reqLvl}，手動強制指定上場` : '點擊切換解除'}）`
              : isPref
              ? `已設為優先（${underLevel ? `等級 Lv.${lvl} 未達要求 Lv.${reqLvl}，手動強制指定上場` : '點擊切換為鎖定必開'}）`
              : underLevel
              ? `等級 Lv.${lvl} 未達要求 Lv.${reqLvl}（點擊仍可手動強制指定優先/鎖定）`
              : '點擊切換：優先上 ➔ 鎖定必開 ➔ 一般補位';
            const titleText = hasMw ? `${baseTitle}｜🍁 楓葉祝福 20` : baseTitle;
            return `
              <button data-mid="${m.id}" data-cid="${cid}" ${(lockedInOther || !bossEnabled) ? 'disabled' : ''} class="btn-cycle-pref px-2 py-1 rounded text-xs border transition ${pillStyle}" title="${titleText}">
                ${prefix}${cObj ? cObj.short : cid} <span class="opacity-80">Lv.${lvl}</span>${hasMw ? ' <span title="已學楓葉祝福 20">🍁</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-toggle-must').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const m = state.members.find(x => x.id === mid);
      if (m) {
        m.priorityAttend = !m.priorityAttend;
        saveMembers(state.members);
        renderAll();
      }
    });
  });

  grid.querySelectorAll('.btn-cycle-pref').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const cid = btn.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m || usage.isClassLocked(m.id, cid)) return;
      const underLevel = getClassLevel(m, cid) < getMinLevelForClass(boss, cid);
      const isCurrentlyPref = m.preferredClass === cid && (!underLevel || !!m.manualPref);
      if (m.lockedClass === cid) {
        m.lockedClass = null;
        m.preferredClass = null;
        m.manualPref = false;
      } else if (isCurrentlyPref) {
        m.lockedClass = cid;
        m.manualPref = true;
      } else {
        m.preferredClass = cid;
        m.manualPref = true;
        m.lockedClass = null;
      }
      saveMembers(state.members);
      renderAll();
    });
  });
}

function getLockedMemberLevel(entry) {
  const member = !entry.isPug && state.members.find(m => m.id === entry.memberId);
  return member && member.classes.includes(entry.classId)
    ? getClassLevel(member, entry.classId)
    : entry.level;
}

function getLockedMemberHasMw20(entry) {
  const member = !entry.isPug && state.members.find(m => m.id === entry.memberId);
  return member && member.classes.includes(entry.classId)
    ? hasClassMw20(member, entry.classId)
    : !!entry.hasMw20;
}

function isSlotCompatibleWithLineup(lineup, dayId, periodId) {
  const realMemberIds = [...new Set((lineup.members || []).filter(item => !item.isPug && item.memberId).map(item => item.memberId))];
  if (realMemberIds.length === 0) return true;
  return realMemberIds.every(mid => {
    const m = state.members.find(x => x.id === mid);
    if (!m) return true;
    return Array.isArray(m.slots?.[dayId]) && m.slots[dayId].includes(periodId);
  });
}

function applyLockExcludeModeChange(newMode) {
  const previousUsage = getLockedUsage();
  const previouslyExcluded = state.members.filter(m => previousUsage.isMemberFullyExcluded(m));
  state.lockExcludeMode = newMode;
  if (state.selectedPreset !== 'custom') {
    applyPreset(state.selectedPreset);
  } else {
    if (state.lockExcludeMode === 'none') {
      state.activeMemberIds = [...new Set([...state.activeMemberIds, ...previouslyExcluded.map(m => m.id)])];
    }
    const u = getLockedUsage();
    state.activeMemberIds = state.activeMemberIds.filter(id => {
      const m = state.members.find(x => x.id === id);
      return m && !u.isMemberFullyExcluded(m);
    });
  }
  renderAll();
}

function updateLockedLineupSlot(lineupId, slotKey) {
  const lineup = state.lockedLineups.find(l => l.id === lineupId);
  if (!lineup) return false;
  let slotLabel = '自訂時段';
  if (slotKey !== 'custom') {
    const [dayId, periodId] = slotKey.split('_');
    const day = DAYS.find(d => d.id === dayId);
    const period = PERIODS.find(p => p.id === periodId);
    if (!day || !period || slotKey !== `${day.id}_${period.id}`) return false;
    slotLabel = `${day.fullLabel} ${period.timeRange}`;
  }
  lineup.slotKey = slotKey;
  lineup.slotLabel = slotLabel;
  saveLockedLineups(state.lockedLineups);
  return true;
}

function renderLockedLineupsPanel() {
  const container = document.getElementById('lockedLineupsContainer');
  if (!container) return;

  const lineups = state.lockedLineups || [];
  if (lineups.length === 0) {
    container.innerHTML = `
      <div class="bg-[var(--card)] border border-dashed border-[var(--border)] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold shrink-0">🔒 陣容鎖定功能</span>
          <span>在下方推薦結果中點擊「<strong>🔒 鎖定此陣容</strong>」，即可將該團名單鎖定；切換至其他天或其他時段排團時，會<strong>自動排除已鎖定的玩家角色</strong>！</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button id="btnIoLockedLineups" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:opacity-80 transition whitespace-nowrap inline-flex items-center gap-1">
            📤 匯出入鎖定陣容
          </button>
        </div>
      </div>
    `;
    document.getElementById('btnIoLockedLineups')?.addEventListener('click', () => openIoModal('lockedLineups'));
    return;
  }

  const usage = getLockedUsage();
  const totalLockedChars = Array.from(usage.lockedClassesByMember.values()).reduce((acc, arr) => acc + arr.length, 0);
  const remMembers = getEffectiveMembersForPlanning(state.members);
  const remChars = remMembers.reduce((acc, m) => acc + m.classes.length, 0);

  container.innerHTML = `
    <div class="bg-[var(--card)] border border-rose-500/50 rounded-xl p-4 space-y-3.5 shadow-sm overflow-hidden">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[var(--border)] pb-3 min-w-0">
        <div class="space-y-1 flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-500 text-white">🔒 已鎖定出團陣容（${lineups.length} 團）</span>
            <span class="text-xs text-rose-300 font-semibold">${state.lockExcludeMode === 'none' ? `試排模式：不排除已鎖定玩家或角色（剩餘 ${remMembers.length} 人 / ${remChars} 角）` : `已排除 ${usage.lockedMemberIds.size} 人 / ${totalLockedChars} 角 ｜ <span class="text-emerald-400">剩餘 ${remMembers.length} 人 / ${remChars} 角</span>`}</span>
          </div>
          <p class="text-xs text-[var(--muted-foreground)]">
            ${state.lockExcludeMode === 'none' ? '可使用已鎖定玩家與角色試排其他突襲王；原鎖定陣容仍保留。切回排除規則即可恢復自動排除。' : '安排其他天或其他時段時，系統已自動排除下方鎖定陣容中的玩家角色，避免重複排班。可隨時點擊「解除鎖定」或暫停排除。'}
          </p>
        </div>
        <div class="flex flex-wrap items-center lg:justify-end gap-2 min-w-0 max-w-full lg:shrink-0">
          <select id="lockExcludeModeSelect" class="w-full sm:w-auto max-w-full min-w-0 truncate px-2.5 py-1.5 rounded-lg text-xs bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none">
            <option value="character" ${state.lockExcludeMode === 'character' ? 'selected' : ''}>🎯 排除已鎖角色（分身可排）</option>
            <option value="member" ${state.lockExcludeMode === 'member' ? 'selected' : ''}>👤 排除整位玩家（限排一團）</option>
            <option value="none" ${state.lockExcludeMode === 'none' ? 'selected' : ''}>🧪 不排除（試排模式）</option>
          </select>
          <button id="btnIoLockedLineups" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:opacity-80 transition whitespace-nowrap inline-flex items-center gap-1">
            📤 匯出入鎖定陣容
          </button>
          <button id="btnCopyAllLockedLineups" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 whitespace-nowrap">
            📋 複製全部已鎖定團表
          </button>
          <button id="btnClearAllLockedLineups" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 whitespace-nowrap">
            🗑️ 解除全部鎖定
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        ${lineups.map((l, idx) => {
          const isEnabled = l.enabled !== false;
          const lockedMwCount = (l.members || []).filter(item => !item.isPug && getLockedMemberHasMw20(item)).length;
          return `
            <div class="p-3.5 rounded-xl border ${isEnabled ? 'border-rose-500/40 bg-[var(--background)]' : 'border-[var(--border)] bg-[var(--background)] opacity-60'} space-y-2.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                  <span class="px-2 py-0.5 rounded text-xs font-bold ${isEnabled ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50' : 'bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)]'}">
                    #${idx + 1}
                  </span>
                  <input type="text" data-lock-id="${l.id}" value="${escapeHtml(l.title)}" class="locked-title-input px-2 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)] flex-1" title="可點擊修改團名備註" />
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button data-lock-id="${l.id}" class="btn-toggle-lock-enabled px-2 py-1 rounded text-xs border transition ${
                    isEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                      : 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)]'
                  }" title="切換是否要在排其他團時自動排除此團角色">
                    ${isEnabled ? (state.lockExcludeMode === 'none' ? '試排中・不排除' : '✓ 自動排除中') : '已暫停排除'}
                  </button>
                  <button data-lock-id="${l.id}" class="btn-copy-locked px-2 py-1 rounded text-xs border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:opacity-80">
                    複製
                  </button>
                  <button data-lock-id="${l.id}" class="btn-remove-locked px-2 py-1 rounded text-xs border border-rose-500/40 bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 font-semibold">
                    🔓 解除
                  </button>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)] min-w-0">
                <label class="flex items-center gap-2 min-w-0 max-w-full">
                  <span class="shrink-0">🕒 時段：</span>
                  <select data-lock-id="${l.id}" aria-label="調整第 ${idx + 1} 團時段" class="locked-slot-select min-w-0 max-w-full truncate px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-amber-300" title="僅列出此陣容全員皆可出席之時段">
                    <option value="custom" ${l.slotKey === 'custom' ? 'selected' : ''}>自訂時段</option>
                    ${!['custom', ...DAYS.flatMap(d => PERIODS.map(p => `${d.id}_${p.id}`))].includes(l.slotKey) ? '<option value="" selected disabled>原時段（請重新選擇）</option>' : ''}
                    ${DAYS.map(day => {
                      const matchingPeriods = PERIODS.filter(period => {
                        const key = `${day.id}_${period.id}`;
                        return key === l.slotKey || isSlotCompatibleWithLineup(l, day.id, period.id);
                      });
                      if (matchingPeriods.length === 0) return '';
                      return `<optgroup label="${day.fullLabel}">${matchingPeriods.map(period => {
                        const key = `${day.id}_${period.id}`;
                        const compat = isSlotCompatibleWithLineup(l, day.id, period.id);
                        const suffix = !compat && key === l.slotKey ? '（原選・部分未勾）' : '';
                        return `<option value="${key}" ${l.slotKey === key ? 'selected' : ''}>${day.fullLabel} ${period.timeRange}${suffix}</option>`;
                      }).join('')}</optgroup>`;
                    }).join('')}
                  </select>
                </label>
                <div class="flex flex-wrap items-center gap-1.5">
                  ${lockedMwCount > 0 ? `<span class="px-1.5 py-0.5 rounded text-[11px] bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold whitespace-nowrap">🍁 楓祝20×${lockedMwCount}</span>` : ''}
                  <span class="text-[11px] break-words">${l.compSig}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
                ${(l.members || []).map(item => {
                  const hasMw = !item.isPug && getLockedMemberHasMw20(item);
                  return `
                    <div class="px-2.5 py-1.5 rounded border ${item.isPug ? 'border-fuchsia-400/60 bg-fuchsia-500/10' : 'border-[var(--border)] bg-[var(--card)]'} flex items-center justify-between gap-1.5">
                      <span class="text-xs font-bold ${item.isPug ? 'text-fuchsia-200' : 'text-[var(--foreground)]'} truncate" title="${escapeHtml(item.memberName)}">${escapeHtml(item.memberName)}</span>
                      <span class="px-1.5 py-0.5 rounded text-[11px] border shrink-0 whitespace-nowrap ${item.badge || CLASS_MAP[item.classId]?.badge || ''}">${item.classShort}${item.isPug ? '' : ` Lv.${getLockedMemberLevel(item)}`}${hasMw ? ' 🍁20' : ''}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.getElementById('lockExcludeModeSelect')?.addEventListener('change', (e) => {
    applyLockExcludeModeChange(e.target.value);
  });

  document.getElementById('btnIoLockedLineups')?.addEventListener('click', () => openIoModal('lockedLineups'));

  document.getElementById('btnClearAllLockedLineups')?.addEventListener('click', () => {
    state.lockedLineups = [];
    saveLockedLineups(state.lockedLineups);
    if (state.selectedPreset !== 'custom') {
      applyPreset(state.selectedPreset);
    } else {
      state.activeMemberIds = state.members.map(m => m.id);
    }
    renderAll();
  });

  document.getElementById('btnCopyAllLockedLineups')?.addEventListener('click', () => {
    const blocks = lineups.map((l, i) => {
      const header = [
        `📢 **【${l.title || `第 ${i + 1} 團`}】**`,
        `🎯 目標：**${l.bossName}**`,
        `🕒 時段：${l.slotLabel}`,
        `📋 陣容配置（${(l.members || []).length}角色）：`
      ];
      (l.members || []).forEach((m, idx) => {
        if (m.isPug) {
          header.push(`${idx + 1}. **📢 外找路人** ➔ ${m.className}`);
        } else {
          const mwNote = getLockedMemberHasMw20(m) ? ' [🍁楓祝20]' : '';
          header.push(`${idx + 1}. **${m.memberName}** ➔ ${m.className} (Lv.${getLockedMemberLevel(m)})${mwNote}`);
        }
      });
      return header.join('\n');
    });
    showCopyModal(blocks.join('\n\n====================\n\n'));
  });

  container.querySelectorAll('.locked-title-input').forEach(inp => {
    inp.addEventListener('change', () => {
      const lid = inp.getAttribute('data-lock-id');
      const found = state.lockedLineups.find(x => x.id === lid);
      if (found) {
        found.title = inp.value.trim() || found.title;
        saveLockedLineups(state.lockedLineups);
        renderAll();
      }
    });
  });

  container.querySelectorAll('.locked-slot-select').forEach(select => {
    select.addEventListener('change', () => {
      if (updateLockedLineupSlot(select.getAttribute('data-lock-id'), select.value)) renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-lock-enabled').forEach(btn => {
    btn.addEventListener('click', () => {
      const lid = btn.getAttribute('data-lock-id');
      const found = state.lockedLineups.find(x => x.id === lid);
      if (found) {
        found.enabled = found.enabled === false ? true : false;
        saveLockedLineups(state.lockedLineups);
        if (state.selectedPreset !== 'custom') applyPreset(state.selectedPreset);
        renderAll();
      }
    });
  });

  container.querySelectorAll('.btn-copy-locked').forEach(btn => {
    btn.addEventListener('click', () => {
      const lid = btn.getAttribute('data-lock-id');
      const l = state.lockedLineups.find(x => x.id === lid);
      if (!l) return;
      const lines = [
        `📢 **【${l.title}】**`,
        `🎯 目標：**${l.bossName}**`,
        `🕒 時段：${l.slotLabel}`,
        `📋 陣容配置（${(l.members || []).length}角色）：`
      ];
      (l.members || []).forEach((m, idx) => {
        if (m.isPug) {
          lines.push(`${idx + 1}. **📢 外找路人** ➔ ${m.className}`);
        } else {
          const mwNote = getLockedMemberHasMw20(m) ? ' [🍁楓祝20]' : '';
          lines.push(`${idx + 1}. **${m.memberName}** ➔ ${m.className} (Lv.${getLockedMemberLevel(m)})${mwNote}`);
        }
      });
      showCopyModal(lines.join('\n'));
    });
  });

  container.querySelectorAll('.btn-remove-locked').forEach(btn => {
    btn.addEventListener('click', () => {
      const lid = btn.getAttribute('data-lock-id');
      state.lockedLineups = state.lockedLineups.filter(x => x.id !== lid);
      saveLockedLineups(state.lockedLineups);
      if (state.selectedPreset !== 'custom') {
        applyPreset(state.selectedPreset);
      } else {
        const u = getLockedUsage();
        state.activeMemberIds = state.members.filter(m => !u.isMemberFullyExcluded(m)).map(m => m.id);
      }
      renderAll();
    });
  });
}

function formatDiscordText(title, bossName, slotText, assignment) {
  const lines = [
    `📢 **【Artale 突襲王出團表${title ? `｜${title}` : ''}】**`,
    `🎯 目標：**${bossName}**`,
    `🕒 時段：${slotText}`,
    `📋 陣容配置（${assignment.length}角色）：`
  ];
  assignment.forEach((item, idx) => {
    if (item.member.isPug) {
      lines.push(`${idx + 1}. **${item.member.name}** ➔ ${item.classObj.name}`);
    } else {
      const lvl = item.level || getClassLevel(item.member, item.classId);
      const mwNote = hasClassMw20(item.member, item.classId) ? ' [🍁楓祝20]' : '';
      lines.push(`${idx + 1}. **${item.member.name}** ➔ ${item.classObj.name} (Lv.${lvl})${mwNote}`);
    }
  });
  return lines.join('\n');
}

function showCopyModal(text) {
  const modal = document.getElementById('copyModal');
  const textarea = document.getElementById('copyTextarea');
  textarea.value = text;
  modal.classList.remove('hidden');
  textarea.select();
  try {
    navigator.clipboard.writeText(text);
  } catch (e) {}
}

function renderResults() {
  if (state.plannerMode === 'multi') {
    renderMultiBossResults();
    return;
  }
  const container = document.getElementById('resultsContainer');
  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const presetSelect = document.getElementById('presetSlotSelect');
  const rawSlotLabel = presetSelect.options[presetSelect.selectedIndex]?.text || '自訂時段';
  const slotLabel = rawSlotLabel.replace(/（.*）$/, '');

  const runCount = getRequestedRunCount(state.partyMode);
  if (runCount >= 2) {
    const splitPlans = runCount === 2 ? computeTwoPartySplits() : computeThreePartySplits(runCount);
    const unitLabel = `${RUN_COUNT_CN[runCount] || runCount}團`;
    if (splitPlans.length === 0) {
      container.innerHTML = `
        <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center space-y-2">
          <p class="text-sm font-semibold text-[var(--foreground)]">目前可用人數或剩餘未鎖定職業不足以拆成符合條件的 ${runCount} 隊</p>
          <p class="text-xs text-[var(--muted-foreground)]">建議切換其他熱門時段、解除部分已鎖定陣容，或勾選允許外找／放寬職業限制條件。</p>
        </div>
      `;
      return;
    }

    const visibleSplitPlans = (state.showAllSplitPlans || splitPlans.length <= 3)
      ? splitPlans
      : splitPlans.slice(0, 3);
    const hiddenSplitCount = splitPlans.length - visibleSplitPlans.length;
    const toggleMoreSplitHtml = splitPlans.length > 3
      ? `<div class="flex justify-center pt-1">
           <button id="btnToggleMoreSplitPlans" type="button" class="px-4 py-2 rounded-lg text-xs font-semibold border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-amber-500/60 hover:text-amber-300 transition">
             ${state.showAllSplitPlans ? `收合備選${unitLabel}配法（僅顯示前 3 組） ▲` : `展開其餘 ${hiddenSplitCount} 組${unitLabel}配法（共 ${splitPlans.length} 組） ▼`}
           </button>
         </div>`
      : '';

    const getPlanParties = (plan) => plan.parties || [plan.party1, plan.party2, plan.party3, plan.party4, plan.party5].filter(Boolean);

    container.innerHTML = visibleSplitPlans.map((plan, pIdx) => {
      const parties = getPlanParties(plan);
      const teamCount = parties.length;
      const planUnitLabel = `${RUN_COUNT_CN[teamCount] || teamCount}團`;
      const memberGridCols = teamCount >= 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
      const splitGridCols = (teamCount === 2 || teamCount === 4) ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
      const renderPartyTable = (partyObj, partyTitle, teamIdx) => `
        <div class="split-party-card bg-[var(--background)] border border-[var(--border)] rounded-lg p-3.5 space-y-2.5 lg:space-y-0">
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-bold text-[var(--foreground)] whitespace-nowrap">${partyTitle}</span>
              <button data-plan-idx="${pIdx}" data-team-idx="${teamIdx}" class="btn-lock-split-single shrink-0 whitespace-nowrap px-2 py-0.5 rounded text-xs font-semibold border border-rose-500/50 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30">
                🔒 鎖定此隊
              </button>
            </div>
            <div class="text-xs text-amber-400 font-medium leading-relaxed">${partyObj.compSig}</div>
          </div>
          <div class="flex flex-wrap content-start gap-1.5">
            ${partyObj.tags.map(t => `<span class="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${t}</span>`).join('')}
          </div>
          <div class="grid ${memberGridCols} content-start gap-2 pt-1">
            ${partyObj.assignment.map(item => {
              const hasMw = !item.member.isPug && hasClassMw20(item.member, item.classId);
              return `
                <div class="p-2 rounded border border-[var(--border)] bg-[var(--card)] flex items-center justify-between gap-1.5">
                  <span class="text-xs font-semibold truncate ${item.member.isPug ? 'text-fuchsia-300 font-bold' : 'text-[var(--foreground)]'}" title="${escapeHtml(item.member.name)}">${escapeHtml(item.member.name)}</span>
                  <span class="px-2 py-0.5 rounded text-xs border shrink-0 whitespace-nowrap ${item.classObj.badge}">${item.classObj.short} Lv.${item.level || getClassLevel(item.member, item.classId)}${hasMw ? ' 🍁20' : ''}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      return `
        <div class="bg-[var(--card)] border ${pIdx === 0 ? 'border-amber-500/60' : 'border-[var(--border)]'} rounded-xl p-5 space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 class="text-base font-bold text-[var(--foreground)]">${plan.title}</h3>
              <p class="text-xs text-[var(--muted-foreground)]">${plan.subtitle}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2 shrink-0">
              <button data-plan-idx="${pIdx}" class="btn-lock-split-both shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-500/60 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30">
                🔒 同時鎖定${planUnitLabel}
              </button>
              <button data-plan-idx="${pIdx}" class="btn-copy-split shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">
                ${boss.id === 'horntail' && teamCount === 2 ? '複製 12 人遠征名單 (Discord)' : `複製${planUnitLabel}名單 (Discord)`}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 ${splitGridCols} gap-4">
            ${parties.map((partyObj, tIdx) => renderPartyTable(partyObj, `🚩 第 ${tIdx + 1} 隊配置`, tIdx)).join('')}
          </div>
        </div>
      `;
    }).join('') + toggleMoreSplitHtml;

    document.getElementById('btnToggleMoreSplitPlans')?.addEventListener('click', () => {
      state.showAllSplitPlans = !state.showAllSplitPlans;
      renderResults();
    });

    container.querySelectorAll('.btn-copy-split').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = splitPlans[Number(btn.getAttribute('data-plan-idx'))];
        const parties = getPlanParties(p);
        if (boss.id === 'horntail' && parties.length === 2) {
          const t1 = formatDiscordText('第 1 隊 (6人)', boss.name, slotLabel, parties[0].assignment);
          const t2 = formatDiscordText('第 2 隊 (6人)', boss.name, slotLabel, parties[1].assignment);
          const totalCount = parties[0].assignment.length + parties[1].assignment.length;
          const header = `🐉 **【Artale 闇黑龍王 12 人遠征隊出團表】**\n🎯 目標：**${boss.name}**\n🕒 時段：${slotLabel}\n👥 總出團人數：${totalCount} / 12 人\n────────────────────────`;
          showCopyModal(`${header}\n\n${t1}\n\n${t2}`);
        } else {
          const blocks = parties.map((pt, idx) => formatDiscordText(`第${idx + 1}隊`, boss.name, slotLabel, pt.assignment));
          showCopyModal(blocks.join('\n\n'));
        }
      });
    });

    container.querySelectorAll('.btn-lock-split-single').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = splitPlans[Number(btn.getAttribute('data-plan-idx'))];
        const teamIdx = Number(btn.getAttribute('data-team-idx'));
        const parties = getPlanParties(p);
        const partyObj = parties[teamIdx];
        if (partyObj) lockLineup(boss, state.selectedPreset, slotLabel, partyObj.compSig, partyObj.assignment, `第${teamIdx + 1}隊`);
      });
    });

    container.querySelectorAll('.btn-lock-split-both').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = splitPlans[Number(btn.getAttribute('data-plan-idx'))];
        const parties = getPlanParties(p);
        parties.forEach((pt, idx) => {
          lockLineup(boss, state.selectedPreset, slotLabel, pt.compSig, pt.assignment, `第${idx + 1}隊`);
        });
      });
    });
    return;
  }

  const { groups, totalAssignments, activeMembers, mw20FallbackUsed } = computeAllSinglePartyOptions();

  if (groups.length === 0) {
    container.innerHTML = `
      <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center space-y-2">
        <p class="text-sm font-semibold text-[var(--foreground)]">找不到符合目前篩選條件的組隊排列組合</p>
        <p class="text-xs text-[var(--muted-foreground)]">請確認剩餘未鎖定團員、角色等級是否達到 ${boss.name} 要求（${boss.minLevel > 1 ? `需 Lv.${boss.minLevel} 以上` : '無等級限制'}），或勾選「📢 允許外找 1 個職業」/ 放寬職業必備條件。</p>
      </div>
    `;
    return;
  }

  const mw20FallbackNote = (state.preferMw20 && mw20FallbackUsed)
    ? `<div class="bg-amber-500/10 border border-amber-500/40 rounded-xl p-3 text-xs text-amber-300">
         ⚠️ <strong>楓葉祝福 20 提示：</strong>目前出席名單與未鎖定職業中尚無具備「<strong>🍁 楓葉祝福 20</strong>」的角色，以下顯示不含楓祝 20 的替代陣容（可前往「3. 團員職業與時間設定」標記角色楓祝 20，或切換含 🍁 的時段）。
       </div>`
    : '';

  const extraNote = boss.id === 'horntail'
    ? `<div class="bg-purple-500/15 border border-purple-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
         <div class="space-y-1">
           <div class="text-sm font-bold text-purple-200 flex items-center gap-2">
             <span>🐉</span> 闇黑龍王為 12 人遠征隊編制（2 隊協同作戰）
           </div>
           <div class="text-xs text-purple-300/90 leading-relaxed">
             目前處於「單隊模式（6 人）」，僅展示單隊 6 人最佳試打配置；強烈建議切換至「<strong>龍王 12 人遠征隊模式</strong>」，系統將自動為您從出席名單中挑選 12 人並分配至第 1 隊與第 2 隊！
           </div>
         </div>
         <button id="btnSwitchToTwoRuns" class="shrink-0 px-4 py-2 rounded-lg text-xs font-bold bg-purple-500 text-white hover:bg-purple-600 transition shadow">
           切換至 12 人遠征隊 (2 隊) ➔
         </button>
       </div>`
    : activeMembers.length > 6
    ? `<div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
         <div class="text-xs text-amber-300">
           💡 <strong>提示：</strong>目前時段共有 <strong>${activeMembers.length} 人</strong>可出席（超過 1 隊 6 人上限）。以下列出從 ${activeMembers.length} 人中挑出 6 人的最佳排列組合；您可直接點擊「<strong>🔒 鎖定此陣容</strong>」排定第 1 團，剩下的團員與分身就會自動留給下一團！
         </div>
         <button id="btnSwitchToTwoRuns" class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-black hover:opacity-90">
           切換看雙團方案 ➔
         </button>
       </div>`
    : '';

  const headerSummary = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <div class="space-y-0.5">
        <h3 class="text-sm font-bold text-[var(--foreground)]">
          🎯 ${boss.name} — 共計算出 <span class="text-amber-400">${totalAssignments}</span> 種角色分配方案（歸納為 <span class="text-emerald-400">${groups.length}</span> 種職業陣容）
        </h3>
        <p class="text-xs text-[var(--muted-foreground)]">
          決定好某個排法後，點擊右側「<strong class="text-rose-300">🔒 鎖定此陣容</strong>」即可將該隊成員角色鎖定，切換至其他天或其他時段時會自動排除他們！
        </p>
      </div>
    </div>
  `;

  const groupCards = groups.slice(0, 12).map((g, idx) => {
    const isExpanded = state.expandedGroupKey === g.compSig || (state.expandedGroupKey === null && idx === 0);
    const topVariant = g.variants[0];

    return `
      <div class="bg-[var(--card)] border ${idx === 0 ? 'border-amber-500/60' : 'border-[var(--border)]'} rounded-xl p-4 space-y-3">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded text-xs font-bold ${idx === 0 ? 'bg-amber-500 text-black' : 'bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)]'}">
                ${idx === 0 ? '🏆 最佳推薦陣容 #1' : `陣容選項 #${idx + 1}`}
              </span>
              <span class="text-sm font-bold text-[var(--foreground)]">${g.compSig}</span>
              <span class="text-xs text-[var(--muted-foreground)]">（共有 ${g.variants.length} 種人員調度排法）</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${g.tags.map(t => `<span class="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${t}</span>`).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button data-comp="${g.compSig}" class="btn-toggle-variants px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--background)] hover:opacity-80">
              ${isExpanded ? '收合排法 ▲' : `展開全部 ${g.variants.length} 種排法 ▼`}
            </button>
          </div>
        </div>

        <div class="space-y-2 pt-1">
          ${(isExpanded ? g.variants.slice(0, 10) : [topVariant]).map((v, vIdx) => {
            const activeIdsInVariant = new Set(v.assignment.map(a => a.member.id));
            const benchMembers = activeMembers.filter(m => !activeIdsInVariant.has(m.id));
            return `
              <div class="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div class="space-y-1.5 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-semibold text-[var(--muted-foreground)]">排法 ${vIdx + 1}：</span>
                    ${v.mw20Count > 0
                      ? `<span class="px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold">🍁 楓祝20×${v.mw20Count}：${escapeHtml(v.mw20Members.join('、'))}</span>`
                      : state.preferMw20
                      ? `<span class="px-1.5 py-0.5 rounded text-xs bg-rose-500/15 text-rose-300 border border-rose-500/30">⚠️ 無楓祝20</span>`
                      : ''}
                    ${v.pugSummary
                      ? `<span class="px-1.5 py-0.5 rounded text-xs bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 font-semibold">${v.pugSummary}</span>`
                      : ''}
                    ${v.dualBoxSummary
                      ? `<span class="px-1.5 py-0.5 rounded text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">${v.dualBoxSummary}</span>`
                      : ''}
                    ${v.prefMatchCount > 0
                      ? `<span class="px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">★ 符合 ${v.prefMatchCount} 人優先角色</span>`
                      : ''}
                    ${v.occasionalCount === 0
                      ? '<span class="text-xs text-emerald-400">✓ 全員穩定出席</span>'
                      : '<span class="text-xs text-amber-400">含偶爾出席團員</span>'}
                    ${benchMembers.length > 0
                      ? `<span class="text-xs text-[var(--muted-foreground)]">｜待命/第2團：${benchMembers.map(m => m.name).join('、')}</span>`
                      : ''}
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
                    ${v.assignment.map(item => {
                      const isPug = !!item.member.isPug;
                      const isDual = item.isDualPrimary || item.isDualSecondary;
                      const hasMw = !isPug && hasClassMw20(item.member, item.classId);
                      const isLocked = !isPug && !item.isDualSecondary && item.member.lockedClass === item.classId;
                      const isPref = !isPug && !item.isDualSecondary && !isLocked && item.member.preferredClass === item.classId;
                      const lvl = item.level || getClassLevel(item.member, item.classId);
                      return `
                        <div class="px-2.5 py-1.5 rounded border ${isPug ? 'border-fuchsia-400/70 bg-fuchsia-500/10' : isDual ? 'border-cyan-400/70 bg-cyan-500/10' : isLocked ? 'border-rose-400/60 bg-[var(--card)]' : isPref ? 'border-amber-400/60 bg-[var(--card)]' : 'border-[var(--border)] bg-[var(--card)]'} flex items-center justify-between gap-1.5">
                          <span class="text-xs font-bold ${isPug ? 'text-fuchsia-200' : isDual ? 'text-cyan-200' : 'text-[var(--foreground)]'} truncate" title="${escapeHtml(item.member.name)}">${!isPug && item.member.priorityAttend ? '📌' : ''}${isDual ? '🖥️' : ''}${escapeHtml(item.member.name)}</span>
                          <span class="px-1.5 py-0.5 rounded text-xs border shrink-0 whitespace-nowrap ${item.classObj.badge}">${isLocked ? '🔒' : isPref ? '★' : ''}${item.classObj.short}${isPug ? '' : ` <span class="opacity-80">Lv.${lvl}</span>`}${hasMw ? ' 🍁20' : ''}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 shrink-0">
                  <button data-comp="${g.compSig}" data-vidx="${vIdx}" class="btn-lock-variant px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-500/60 bg-rose-500/20 text-rose-200 hover:bg-rose-500/35 transition" title="鎖定此陣容，其他天或其他時段排團時自動排除這些角色">
                    🔒 鎖定此陣容
                  </button>
                  <button data-comp="${g.compSig}" data-vidx="${vIdx}" class="btn-copy-variant px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">
                    複製此排法
                  </button>
                </div>
              </div>
            `;
          }).join('')}
          ${isExpanded && g.variants.length > 10
            ? `<p class="text-xs text-[var(--muted-foreground)] pl-1">（僅顯示前 10 種最佳人員排法，共 ${g.variants.length} 種）</p>`
            : ''}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `${mw20FallbackNote}${extraNote}${headerSummary}<div class="space-y-3">${groupCards}</div>`;

  const btnSwitch = document.getElementById('btnSwitchToTwoRuns');
  if (btnSwitch) {
    btnSwitch.addEventListener('click', () => {
      state.partyMode = 'tworuns';
      document.querySelector('input[name="partyMode"][value="tworuns"]').checked = true;
      renderAll();
    });
  }

  container.querySelectorAll('.btn-toggle-variants').forEach(btn => {
    btn.addEventListener('click', () => {
      const comp = btn.getAttribute('data-comp');
      state.expandedGroupKey = state.expandedGroupKey === comp ? '__NONE__' : comp;
      renderResults();
    });
  });

  container.querySelectorAll('.btn-lock-variant').forEach(btn => {
    btn.addEventListener('click', () => {
      const comp = btn.getAttribute('data-comp');
      const vIdx = Number(btn.getAttribute('data-vidx'));
      const grp = groups.find(x => x.compSig === comp);
      if (grp && grp.variants[vIdx]) {
        lockLineup(boss, state.selectedPreset, slotLabel, comp, grp.variants[vIdx].assignment);
      }
    });
  });

  container.querySelectorAll('.btn-copy-variant').forEach(btn => {
    btn.addEventListener('click', () => {
      const comp = btn.getAttribute('data-comp');
      const vIdx = Number(btn.getAttribute('data-vidx'));
      const grp = groups.find(x => x.compSig === comp);
      if (grp && grp.variants[vIdx]) {
        const text = formatDiscordText(comp, boss.name, slotLabel, grp.variants[vIdx].assignment);
        showCopyModal(text);
      }
    });
  });
}

function renderScheduleHeatmap() {
  const table = document.getElementById('heatmapTable');
  const usage = getLockedUsage();
  const heatmapExcludeSelect = document.getElementById('heatmapLockExcludeSelect');
  if (heatmapExcludeSelect) {
    heatmapExcludeSelect.value = state.lockExcludeMode;
  }
  const heatmapLockBadge = document.getElementById('heatmapLockStatusBadge');
  if (heatmapLockBadge) {
    const totalLockedChars = Array.from(usage.lockedClassesByMember.values()).reduce((acc, arr) => acc + arr.length, 0);
    const remMembers = getEffectiveMembersForPlanning(state.members);
    const remChars = remMembers.reduce((acc, m) => acc + m.classes.length, 0);
    if ((state.lockedLineups || []).length === 0) {
      heatmapLockBadge.innerHTML = `<span class="text-[var(--muted-foreground)]">目前未鎖定陣容（可打此王 ${remMembers.length} 人 / ${remChars} 角）</span>`;
    } else if (state.lockExcludeMode === 'none') {
      heatmapLockBadge.innerHTML = `🔒 已鎖 ${state.lockedLineups.length} 團（試排不排除｜<span class="text-emerald-400">剩餘 ${remMembers.length} 人 / ${remChars} 角</span>）`;
    } else {
      heatmapLockBadge.innerHTML = `🔒 已鎖 ${state.lockedLineups.length} 團（已排除 ${usage.lockedMemberIds.size} 人 / ${totalLockedChars} 角｜<span class="text-emerald-400">剩餘 ${remMembers.length} 人 / ${remChars} 角</span>）`;
    }
  }
  const headerRow = `
    <thead>
      <tr class="border-b border-[var(--border)] text-[var(--muted-foreground)]">
        <th scope="col" class="w-28 p-2.5 font-semibold whitespace-nowrap">時段 ＼ 星期</th>
        ${DAYS.map(d => `<th scope="col" class="p-2.5 font-semibold text-center">${d.label}</th>`).join('')}
      </tr>
    </thead>
  `;

  const boss = BOSSES.find(b => b.id === state.selectedBossId);
  const bodyRows = PERIODS.map(period => {
    const cells = DAYS.map(day => {
      const slotKey = `${day.id}_${period.id}`;
      const rawAvail = state.members.filter(m => m.slots[day.id] && m.slots[day.id].includes(period.id));
      const effectiveAvail = getEffectiveMembersForPlanning(rawAvail, boss)
        .map(m => ({
          ...m,
          classes: m.classes.filter(cid => isClassAllowedForMember(m, cid, boss))
        }))
        .filter(m => m.classes.length > 0);
      const count = effectiveAvail.length;
      const totalCharCount = effectiveAvail.reduce((sum, m) => sum + m.classes.length, 0);
      const lockedLineupsHere = usage.activeLineups.filter(l => l.slotKey === slotKey);
      const mw20Count = effectiveAvail.filter(m => m.classes.some(cid => hasClassMw20(m, cid))).length;
      const bsCount = effectiveAvail.filter(m => m.classes.includes('bs')).length;
      const bmCount = effectiveAvail.filter(m => m.classes.includes('bm')).length;
      const mmCount = effectiveAvail.filter(m => m.classes.includes('mm')).length;
      const seCount = effectiveAvail.filter(m => m.classes.includes('bm') || m.classes.includes('mm')).length;
      const hbCount = effectiveAvail.filter(m => m.classes.includes('dk')).length;
      const otherClassBadges = [
        ['nl', '標'], ['shad', '刀'], ['il', '冰'], ['fp', '毒'],
        ['hero', '英'], ['pala', '聖'], ['bucc', '拳'], ['cors', '槍']
      ].map(([cid, label]) => [cid, label, effectiveAvail.filter(m => m.classes.includes(cid)).length])
       .filter(([, , cCount]) => cCount > 0);

      const isHt = state.selectedBossId === 'horntail';
      const isClickable = rawAvail.length >= 3 || lockedLineupsHere.length > 0;
      let cellStyle = 'bg-[var(--background)] border-[var(--border)] opacity-30 cursor-not-allowed select-none';
      let badgeColor = 'text-[var(--muted-foreground)]';
      if (isHt) {
        if (count >= 12) {
          cellStyle = 'heatmap-cell cursor-pointer bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30';
          badgeColor = 'text-purple-300 font-bold';
        } else if (count >= 6) {
          cellStyle = 'heatmap-cell cursor-pointer bg-emerald-500/15 border-emerald-500/40 hover:bg-emerald-500/25';
          badgeColor = 'text-emerald-400 font-bold';
        } else if (count >= 4) {
          cellStyle = 'heatmap-cell cursor-pointer bg-amber-500/15 border-amber-500/40 hover:bg-amber-500/25';
          badgeColor = 'text-amber-300 font-bold';
        } else if (count === 3) {
          cellStyle = 'heatmap-cell cursor-pointer bg-sky-500/15 border-sky-500/40 hover:bg-sky-500/25';
          badgeColor = 'text-sky-300 font-semibold';
        } else if (isClickable) {
          cellStyle = 'heatmap-cell cursor-pointer bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20';
          badgeColor = 'text-rose-300 font-semibold';
        }
      } else {
        if (count >= 6) {
          cellStyle = 'heatmap-cell cursor-pointer bg-emerald-500/15 border-emerald-500/40 hover:bg-emerald-500/25';
          badgeColor = 'text-emerald-400 font-bold';
        } else if (count >= 4) {
          cellStyle = 'heatmap-cell cursor-pointer bg-amber-500/15 border-amber-500/40 hover:bg-amber-500/25';
          badgeColor = 'text-amber-300 font-bold';
        } else if (count === 3) {
          cellStyle = 'heatmap-cell cursor-pointer bg-sky-500/15 border-sky-500/40 hover:bg-sky-500/25';
          badgeColor = 'text-sky-300 font-semibold';
        } else if (isClickable) {
          cellStyle = 'heatmap-cell cursor-pointer bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20';
          badgeColor = 'text-rose-300 font-semibold';
        }
      }

      const lockedExcludedCount = rawAvail.filter(m => usage.isMemberFullyExcluded(m)).length;
      const CellTag = isClickable ? 'button type="button"' : 'div';
      const CellCloseTag = isClickable ? 'button' : 'div';
      return `
        <td class="p-1.5 align-top">
          <${CellTag} ${isClickable ? `data-day="${day.id}" data-period="${period.id}"` : ''} class="p-2.5 rounded-lg border transition w-full text-left space-y-1.5 overflow-hidden ${cellStyle}">
            <div class="flex items-center justify-between gap-1">
              <span class="text-xs whitespace-nowrap truncate ${badgeColor}">${count > 0 ? `${count} 人 / ${totalCharCount} 角` : '0 人可用'}${isHt && count >= 12 ? ' (滿遠征)' : isHt && count >= 6 ? ' (滿1隊)' : ''}${lockedExcludedCount > 0 ? ` <span class="text-[10px] opacity-75">(${lockedExcludedCount}已排)</span>` : ''}</span>
            </div>
              <div class="flex flex-wrap gap-1">
                ${mw20Count > 0 ? `<span class="px-1 rounded bg-amber-500/25 text-amber-200 border border-amber-500/40 font-semibold text-xs" title="有楓葉祝福20角色 ${mw20Count} 人">🍁×${mw20Count}</span>` : ''}
                ${bsCount > 0 ? `<span class="px-1 rounded bg-amber-500/20 text-amber-300 text-xs" title="有主教/祈禱 ${bsCount} 人">祈×${bsCount}</span>` : ''}
                ${seCount > 0 ? `<span class="px-1 rounded bg-emerald-500/20 text-emerald-300 text-xs" title="有會心之眼 ${seCount} 人（箭神×${bmCount}、神射手×${mmCount}）">眼×${seCount}</span>` : ''}
                ${hbCount > 0 ? `<span class="px-1 rounded bg-red-500/20 text-red-300 text-xs" title="有黑騎士/神聖之火 ${hbCount} 人">火×${hbCount}</span>` : ''}
                ${otherClassBadges.map(([cid, label, cCount]) => `<span class="px-1 rounded border text-xs ${CLASS_MAP[cid].badge}" title="有${CLASS_MAP[cid].name} ${cCount} 人">${label}×${cCount}</span>`).join('')}
              </div>
            ${lockedLineupsHere.length > 0
              ? `<div class="px-1.5 py-0.5 rounded bg-rose-500/25 border border-rose-500/40 text-[11px] text-rose-200 font-semibold truncate">🔒 已鎖定 ${lockedLineupsHere.length} 團</div>`
              : ''}
            <div class="flex flex-wrap gap-1">
              ${rawAvail.map(m => {
                const excluded = usage.isMemberFullyExcluded(m);
                const bossCheckedClasses = !excluded ? m.classes.filter(cid => !usage.isClassLocked(m.id, cid) && isClassEnabledForBoss(m, cid, boss)) : [];
                const noBossChar = !excluded && bossCheckedClasses.length === 0;
                const underLevel = !excluded && !noBossChar && !bossCheckedClasses.some(cid => isClassAllowedForMember(m, cid, boss));
                const safeName = escapeHtml(m.name);
                return `<span class="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] text-xs max-w-full truncate ${excluded ? 'line-through text-rose-400/70 opacity-60' : (noBossChar || underLevel) ? 'line-through text-[var(--muted-foreground)] opacity-40' : m.occasional ? 'text-amber-300' : 'text-[var(--foreground)]'}" title="${noBossChar ? `${safeName}：角色未勾選打目前選擇的 BOSS` : underLevel ? `${safeName}：勾選的角色等級未達目前 BOSS 門檻` : safeName}">${excluded ? '🔒' : ''}${safeName}${m.occasional ? '*' : ''}</span>`;
              }).join('')}
            </div>
          </${CellCloseTag}>
        </td>
      `;
    }).join('');

    return `
      <tr class="border-b border-[var(--border)]">
        <th scope="row" class="p-2.5 font-semibold text-left text-[var(--foreground)] whitespace-nowrap">${period.label}</th>
        ${cells}
      </tr>
    `;
  }).join('');

  table.innerHTML = `${headerRow}<tbody>${bodyRows}</tbody>`;

  table.querySelectorAll('.heatmap-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const dayId = cell.getAttribute('data-day');
      const periodId = cell.getAttribute('data-period');
      applyPreset(`${dayId}_${periodId}`);
      switchTab('planner');
      renderAll();
    });
  });
}

function renderMemberEditor() {
  document.getElementById('memberCountBadge').textContent = state.members.length;
  const container = document.getElementById('memberEditorList');

  if (state.members.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)] text-center space-y-3">
        <p class="text-sm font-semibold text-[var(--foreground)]">目前尚未新增任何團員</p>
        <p class="text-xs text-[var(--muted-foreground)]">點擊下方按鈕即可手動新增團員並設定可開職業與每小時出團時段</p>
        <button id="btnEmptyStateAddMember" class="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition">
          + 新增第一位團員
        </button>
      </div>
    `;
    document.getElementById('btnEmptyStateAddMember')?.addEventListener('click', () => {
      document.getElementById('btnAddMember').click();
    });
    return;
  }

  container.innerHTML = state.members.map((m) => `
    <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-3">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 flex-1">
          <input type="text" data-mid="${m.id}" value="${escapeHtml(m.name)}" aria-label="團員名稱" class="member-name-input px-2.5 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-sm font-bold text-[var(--foreground)] w-32" />
          <label class="flex items-center gap-1 text-xs text-[var(--muted-foreground)] cursor-pointer">
            <input type="checkbox" data-mid="${m.id}" class="member-occasional-toggle accent-amber-500" ${m.occasional ? 'checked' : ''} />
            <span>偶爾出席</span>
          </label>
        </div>
        <button data-mid="${m.id}" class="btn-delete-member text-xs text-rose-400 hover:underline">刪除</button>
      </div>

      <div class="space-y-1.5">
        <span class="text-xs text-[var(--muted-foreground)]">1. 勾選擁有的職業（點擊新增 / 移除）：</span>
        <div class="flex flex-wrap gap-1.5">
          ${CLASSES.map(c => {
            const has = m.classes.includes(c.id);
            return `
              <button data-mid="${m.id}" data-cid="${c.id}" class="btn-toggle-class px-2 py-1 rounded text-xs border transition ${
                has ? c.badge + ' font-semibold' : 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] opacity-50'
              }">
                ${has ? '✓ ' : '+ '}${c.short}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="space-y-1.5">
        <span class="text-xs text-[var(--muted-foreground)]">2. 設定各角色「主要職業 ★」、「楓祝 20 🍁」、「等級 Lv.」與「要打哪些王 ☑」（炎魔 135+、困拉 140+、龍王 160+/劍士拳霸刀賊155+、樹王/蝴蝶王 170+）：</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${m.classes.map(cid => {
            const cObj = CLASS_MAP[cid];
            const mainCid = m.mainClass || m.preferredClass || m.classes[0];
            const isMain = mainCid === cid;
            const hasMw = hasClassMw20(m, cid);
            const lvl = getClassLevel(m, cid);
            const isLowLvlHt = isHorntail155Class(cid);
            const checkedBosses = getClassBosses(m, cid);
            const allBossesChecked = BOSSES.every(b => checkedBosses.includes(b.id));
            const levelTag = lvl >= 170
              ? '<span class="text-lime-300">✓ 可全王 (含樹王/蝴蝶王/龍王)</span>'
              : (lvl >= 160 || (isLowLvlHt && lvl >= 155))
              ? `<span class="text-purple-300">✓ 可龍王/困拉/炎魔${isLowLvlHt && lvl < 160 ? ' (155+)' : ''}</span>`
              : lvl >= 140
              ? '<span class="text-emerald-400">✓ 可困拉/炎魔</span>'
              : lvl >= 135
              ? '<span class="text-amber-300">✓ 可炎魔 (未滿140)</span>'
              : '<span class="text-rose-400">未滿135 (僅普拉)</span>';
            return `
              <div class="p-2.5 rounded-lg border ${isMain ? 'border-amber-500/60 bg-amber-500/10' : 'border-[var(--border)] bg-[var(--card)]'} space-y-2 overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-1.5">
                  <span class="px-2 py-0.5 rounded text-xs border ${cObj?.badge || ''} font-semibold whitespace-nowrap shrink-0">${cObj?.short || cid}</span>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" data-mid="${m.id}" data-cid="${cid}" aria-pressed="${hasMw ? 'true' : 'false'}" class="btn-toggle-mw20 px-2 py-0.5 rounded text-xs border transition whitespace-nowrap shrink-0 ${
                      hasMw
                        ? 'bg-amber-500/25 text-amber-200 border-amber-400 font-bold'
                        : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]'
                    }" title="切換此角色是否已學習「楓葉祝福 20」">
                      ${hasMw ? '🍁 楓祝20 ✓' : '+ 楓祝20'}
                    </button>
                    <button type="button" data-mid="${m.id}" data-cid="${cid}" class="btn-set-main-class px-2.5 py-0.5 rounded text-xs border transition whitespace-nowrap shrink-0 ${
                      isMain
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]'
                    }">
                      ${isMain ? '★ 主要職業' : '設為主要'}
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-1.5 shrink-0">
                    <span class="text-xs text-[var(--muted-foreground)] whitespace-nowrap">Lv.</span>
                    <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" data-mid="${m.id}" data-cid="${cid}" value="${lvl}" class="member-class-level-input w-16 px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] focus:border-amber-400 focus:outline-none text-sm font-bold text-[var(--foreground)] text-center" />
                  </div>
                  <span data-level-tag="${m.id}_${cid}" class="text-[11px] whitespace-nowrap truncate">${levelTag}</span>
                </div>
                <div class="pt-1.5 border-t border-[var(--border)] space-y-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="text-[11px] text-[var(--muted-foreground)]">🎯 此角色要打的王：</span>
                    <button type="button" data-mid="${m.id}" data-cid="${cid}" class="btn-toggle-all-class-bosses text-[11px] text-amber-400 hover:underline">
                      ${allBossesChecked ? '取消全選' : '全選全王'}
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    ${BOSSES.map(b => {
                      const checked = checkedBosses.includes(b.id);
                      const shortName = BOSS_SHORT_MAP[b.id] || b.name;
                      return `
                        <label class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] border cursor-pointer select-none transition ${
                          checked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                            : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] opacity-50 hover:opacity-80'
                        }">
                          <input type="checkbox" data-mid="${m.id}" data-cid="${cid}" data-bid="${b.id}" class="member-class-boss-checkbox accent-emerald-500 w-3 h-3 cursor-pointer" ${checked ? 'checked' : ''} />
                          <span>${shortName}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="space-y-1">
        <span class="text-xs text-[var(--muted-foreground)]">可出團時段（每 1 小時為基準，點擊星期或時段標題可整排快速全選/取消）：</span>
        <div class="overflow-x-auto">
          <table class="w-full text-center text-xs border-collapse">
            <thead>
              <tr class="text-[var(--muted-foreground)]">
                <th class="p-1 text-left">時段</th>
                ${DAYS.map(d => `<th class="p-1"><button data-mid="${m.id}" data-day="${d.id}" class="btn-toggle-day-col hover:text-[var(--foreground)] underline decoration-dotted" title="點擊切換整天">${d.label.replace('週', '')}</button></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${PERIODS.map(p => `
                <tr>
                  <td class="p-1 text-left text-[var(--muted-foreground)] whitespace-nowrap">
                    <button data-mid="${m.id}" data-period="${p.id}" class="btn-toggle-period-row hover:text-[var(--foreground)]" title="點擊切換全週此時段">${p.short}</button>
                  </td>
                  ${DAYS.map(d => {
                    const on = m.slots[d.id] && m.slots[d.id].includes(p.id);
                    return `
                      <td class="p-0.5">
                        <button data-mid="${m.id}" data-day="${d.id}" data-period="${p.id}" class="btn-toggle-slot w-6 h-5 rounded border text-xs transition ${
                          on ? 'bg-emerald-500/30 border-emerald-500 text-emerald-300 font-bold' : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] opacity-40'
                        }">
                          ${on ? '✓' : '·'}
                        </button>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.member-name-input').forEach(inp => {
    inp.addEventListener('change', () => {
      const m = state.members.find(x => x.id === inp.getAttribute('data-mid'));
      if (m) {
        m.name = inp.value.trim() || '未命名';
        saveMembers(state.members);
        renderAll();
      }
    });
  });

  container.querySelectorAll('.member-occasional-toggle').forEach(chk => {
    chk.addEventListener('change', () => {
      const m = state.members.find(x => x.id === chk.getAttribute('data-mid'));
      if (m) {
        m.occasional = chk.checked;
        saveMembers(state.members);
        renderAll();
      }
    });
  });

  container.querySelectorAll('.btn-delete-member').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      state.members = state.members.filter(x => x.id !== mid);
      state.activeMemberIds = state.activeMemberIds.filter(id => id !== mid);
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-class').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const cid = btn.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.classLevels = m.classLevels || {};
      m.classBosses = m.classBosses || {};
      m.classMw20 = m.classMw20 || {};
      if (m.classes.includes(cid)) {
        if (m.classes.length > 1) {
          m.classes = m.classes.filter(x => x !== cid);
          delete m.classMw20[cid];
        }
      } else {
        m.classes.push(cid);
        if (!m.classLevels[cid]) m.classLevels[cid] = 140;
        if (!Array.isArray(m.classBosses[cid])) m.classBosses[cid] = [...ALL_BOSS_IDS];
      }
      if (!m.mainClass || !m.classes.includes(m.mainClass)) {
        m.mainClass = m.classes[0] || null;
      }
      if (!m.preferredClass || !m.classes.includes(m.preferredClass)) {
        m.preferredClass = m.mainClass;
      }
      if (m.lockedClass && !m.classes.includes(m.lockedClass)) {
        m.lockedClass = null;
      }
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.member-class-boss-checkbox').forEach(chk => {
    chk.addEventListener('change', () => {
      const mid = chk.getAttribute('data-mid');
      const cid = chk.getAttribute('data-cid');
      const bid = chk.getAttribute('data-bid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.classBosses = m.classBosses || {};
      const current = Array.isArray(m.classBosses[cid]) ? [...m.classBosses[cid]] : [...ALL_BOSS_IDS];
      if (chk.checked) {
        if (!current.includes(bid)) current.push(bid);
      } else {
        const idx = current.indexOf(bid);
        if (idx !== -1) current.splice(idx, 1);
      }
      m.classBosses[cid] = current;
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-all-class-bosses').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const cid = btn.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.classBosses = m.classBosses || {};
      const current = Array.isArray(m.classBosses[cid]) ? m.classBosses[cid] : ALL_BOSS_IDS;
      const allChecked = BOSSES.every(b => current.includes(b.id));
      m.classBosses[cid] = allChecked ? [] : [...ALL_BOSS_IDS];
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-mw20').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const cid = btn.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.classMw20 = m.classMw20 || {};
      if (m.classMw20[cid]) {
        delete m.classMw20[cid];
      } else {
        m.classMw20[cid] = true;
      }
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.btn-set-main-class').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const cid = btn.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.mainClass = cid;
      m.preferredClass = cid;
      saveMembers(state.members);
      renderAll();
    });
  });

  container.querySelectorAll('.member-class-level-input').forEach(inp => {
    inp.addEventListener('focus', () => {
      inp.select();
    });
    inp.addEventListener('input', () => {
      const digits = inp.value.replace(/[^0-9]/g, '');
      if (inp.value !== digits) inp.value = digits;
      const mid = inp.getAttribute('data-mid');
      const cid = inp.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m || !digits) return;
      m.classLevels = m.classLevels || {};
      const val = Math.max(1, Math.min(200, Number(digits)));
      m.classLevels[cid] = val;
      saveMembers(state.members);
      const tagEl = container.querySelector(`[data-level-tag="${mid}_${cid}"]`);
      if (tagEl) {
        const isLowLvlHt = isHorntail155Class(cid);
        tagEl.innerHTML = val >= 170
          ? '<span class="text-lime-300">✓ 可全王 (含樹王/蝴蝶王/龍王)</span>'
          : (val >= 160 || (isLowLvlHt && val >= 155))
          ? `<span class="text-purple-300">✓ 可龍王/困拉/炎魔${isLowLvlHt && val < 160 ? ' (155+)' : ''}</span>`
          : val >= 140
          ? '<span class="text-emerald-400">✓ 可困拉/炎魔</span>'
          : val >= 135
          ? '<span class="text-amber-300">✓ 可炎魔 (未滿140)</span>'
          : '<span class="text-rose-400">未滿135 (僅普拉)</span>';
      }
      renderActiveMemberPills();
      renderPriorityPanel();
      renderLockedLineupsPanel();
      renderResults();
    });
    inp.addEventListener('blur', () => {
      const mid = inp.getAttribute('data-mid');
      const cid = inp.getAttribute('data-cid');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      m.classLevels = m.classLevels || {};
      const val = Math.max(1, Math.min(200, Number(inp.value) || 140));
      m.classLevels[cid] = val;
      inp.value = val;
      saveMembers(state.members);
      renderAll();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) inp.blur();
    });
  });

  container.querySelectorAll('.btn-toggle-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const day = btn.getAttribute('data-day');
      const period = btn.getAttribute('data-period');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      if (!m.slots[day]) m.slots[day] = [];
      if (m.slots[day].includes(period)) {
        m.slots[day] = m.slots[day].filter(x => x !== period);
      } else {
        m.slots[day].push(period);
      }
      saveMembers(state.members);
      if (state.selectedPreset !== 'custom') {
        applyPreset(state.selectedPreset);
      }
      renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-day-col').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const day = btn.getAttribute('data-day');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      const current = m.slots[day] || [];
      m.slots[day] = current.length === PERIODS.length ? [] : PERIODS.map(p => p.id);
      saveMembers(state.members);
      if (state.selectedPreset !== 'custom') applyPreset(state.selectedPreset);
      renderAll();
    });
  });

  container.querySelectorAll('.btn-toggle-period-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-mid');
      const period = btn.getAttribute('data-period');
      const m = state.members.find(x => x.id === mid);
      if (!m) return;
      const allHas = DAYS.every(d => m.slots[d.id] && m.slots[d.id].includes(period));
      DAYS.forEach(d => {
        if (!m.slots[d.id]) m.slots[d.id] = [];
        if (allHas) {
          m.slots[d.id] = m.slots[d.id].filter(x => x !== period);
        } else if (!m.slots[d.id].includes(period)) {
          m.slots[d.id].push(period);
        }
      });
      saveMembers(state.members);
      if (state.selectedPreset !== 'custom') applyPreset(state.selectedPreset);
      renderAll();
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const active = btn.getAttribute('data-tab') === tabName;
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.className = `tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition ${
      active
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
        : 'bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--foreground)]'
    }`;
  });
}

function renderAll() {
  renderPresetSlotOptions();
  renderBossSelector();
  renderMultiBossPanel();
  renderMultiStep2And3();
  renderActiveMemberPills();
  renderPriorityPanel();
  renderLockedLineupsPanel();
  renderResults();
  renderScheduleHeatmap();
  renderMemberEditor();
}

document.getElementById('btnPlannerModeSingle')?.addEventListener('click', () => {
  state.plannerMode = 'single';
  renderAll();
});

document.getElementById('btnPlannerModeMulti')?.addEventListener('click', () => {
  state.plannerMode = 'multi';
  if (state.selectedPreset && state.selectedPreset !== 'custom') {
    state.multiBossQueue.forEach(j => {
      if (j.uid.startsWith('mb_init_') && j.slotKey === 'custom') {
        j.slotKey = state.selectedPreset;
      }
    });
  }
  const activeJob = getActiveMultiBossJob();
  if (activeJob) state.selectedMultiJobUid = activeJob.uid;
  state.multiBossResults = null;
  renderAll();
});

document.getElementById('btnApplyDefaultPref').addEventListener('click', () => {
  state.members.forEach(m => {
    m.lockedClass = null;
    m.manualPref = false;
    m.priorityAttend = false;
    m.preferredClass = m.mainClass || m.classes[0] || null;
  });
  saveMembers(state.members);
  renderAll();
});

document.getElementById('btnClearAllPref').addEventListener('click', () => {
  state.members.forEach(m => {
    m.preferredClass = null;
    m.lockedClass = null;
    m.manualPref = false;
    m.priorityAttend = false;
  });
  saveMembers(state.members);
  renderAll();
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
});

document.getElementById('presetSlotSelect').addEventListener('change', (e) => {
  if (state.plannerMode === 'multi') {
    const activeJob = getActiveMultiBossJob();
    if (activeJob) {
      setMultiQueueItemSlot(activeJob.uid, e.target.value);
      return;
    }
  }
  applyPreset(e.target.value);
  renderAll();
});

document.getElementById('heatmapLockExcludeSelect')?.addEventListener('change', (e) => {
  applyLockExcludeModeChange(e.target.value);
});

document.getElementById('btnSelectAllMembers').addEventListener('click', () => {
  const usage = getLockedUsage();
  const allIds = state.members.filter(m => !usage.isMemberFullyExcluded(m)).map(m => m.id);
  if (state.plannerMode === 'multi') {
    const activeJob = getActiveMultiBossJob();
    if (activeJob) {
      activeJob.slotKey = 'custom';
      activeJob.customMemberIds = allIds;
      state.multiBossResults = null;
      renderAll();
      return;
    }
  }
  state.activeMemberIds = allIds;
  state.selectedPreset = 'custom';
  document.getElementById('presetSlotSelect').value = 'custom';
  renderAll();
});

document.querySelectorAll('input[name="partyMode"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    state.partyMode = e.target.value;
    state.showAllSplitPlans = false;
    renderAll();
  });
});

document.getElementById('btnDecRunCount')?.addEventListener('click', () => {
  setPartyRunCount(getRequestedRunCount() - 1);
});

document.getElementById('btnIncRunCount')?.addEventListener('click', () => {
  setPartyRunCount(getRequestedRunCount() + 1);
});

const runCountInputEl = document.getElementById('partyRunCountInput');
if (runCountInputEl) {
  runCountInputEl.addEventListener('input', (e) => {
    const raw = String(e.target.value || '').trim();
    const n = Number(raw);
    if (Number.isInteger(n) && n >= 1 && n <= 10 && String(n) === raw) {
      setPartyRunCount(n);
    }
  });
  runCountInputEl.addEventListener('change', (e) => {
    const n = Math.max(1, Math.min(10, Math.round(Number(e.target.value) || 1)));
    e.target.value = String(n);
    setPartyRunCount(n);
  });
}

function bindRuleCheckbox(elId, propName) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.addEventListener('change', (e) => {
    const checked = e.target.checked;
    if (state.plannerMode === 'multi') {
      const activeJob = getActiveMultiBossJob();
      if (activeJob) {
        if (!activeJob.rules) {
          const b = BOSSES.find(x => x.id === activeJob.bossId);
          activeJob.rules = createDefaultRulesForBoss(b);
        }
        activeJob.rules[propName] = checked;
        state.multiBossResults = null;
        renderAll();
        return;
      }
    }
    state[propName] = checked;
    renderAll();
  });
}

bindRuleCheckbox('ruleRequireBishop', 'requireBishop');
bindRuleCheckbox('ruleRequireSE', 'requireSE');
bindRuleCheckbox('ruleRequireHB', 'requireHB');
bindRuleCheckbox('ruleRequireBucc', 'requireBucc');
bindRuleCheckbox('ruleRequireShad', 'requireShad');
bindRuleCheckbox('ruleRequireNL', 'requireNL');
bindRuleCheckbox('rulePreferMw20', 'preferMw20');
bindRuleCheckbox('ruleRequireMage', 'requireMage');
bindRuleCheckbox('ruleAllowDualBox', 'allowDualBox');
document.getElementById('ruleAllowPug').addEventListener('change', (e) => {
  state.allowPug = e.target.checked;
  document.getElementById('pugClassSelectWrap').classList.toggle('hidden', !state.allowPug);
  renderAll();
});
document.getElementById('pugClassSelect').addEventListener('change', (e) => {
  state.pugClass = e.target.value;
  renderAll();
});
document.getElementById('pugCountSelect')?.addEventListener('change', (e) => {
  state.pugCount = e.target.value;
  renderAll();
});

document.getElementById('btnAddMember').addEventListener('click', () => {
  const newId = 'member_' + Date.now();
  state.members.push({
    id: newId,
    name: `團員 ${state.members.length + 1}`,
    classes: ['nl'],
    mainClass: 'nl',
    classLevels: { nl: 140 },
    classBosses: { nl: [...ALL_BOSS_IDS] },
    classMw20: {},
    preferredClass: 'nl',
    lockedClass: null,
    priorityAttend: false,
    note: '自訂新增團員',
    occasional: false,
    slots: {
      mon: [], tue: [], wed: [], thu: [], fri: [...EVENING_20_PLUS], sat: [...EVENING_20_PLUS], sun: [...EVENING_20_PLUS]
    }
  });
  state.activeMemberIds.push(newId);
  saveMembers(state.members);
  switchTab('members');
  renderAll();
});

document.getElementById('closeCopyModal').addEventListener('click', () => {
  document.getElementById('copyModal').classList.add('hidden');
});

// --- IMPORT / EXPORT MEMBERS & LOCKED LINEUPS ---
let currentIoTarget = 'members'; // 'members' | 'lockedLineups'

function normalizeImportedMembers(raw) {
  const arr = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.members) ? raw.members : null);
  if (!arr) throw new Error('格式錯誤：找不到團員陣列資料');
  if (arr.length > 0 && arr[0] && (arr[0].bossId || arr[0].compSig) && !arr[0].classes) {
    throw new Error('此 JSON 為「已鎖定陣容」資料，請於上方資料類型切換為「🔒 已鎖定出團陣容」後再匯入');
  }
  const validClassIds = new Set(CLASSES.map(c => c.id));
  const validDayIds = DAYS.map(d => d.id);
  const validPeriodIds = new Set(PERIODS.map(p => p.id));

  return arr.map((item, idx) => {
    const classes = Array.isArray(item.classes)
      ? item.classes.filter(cid => validClassIds.has(cid))
      : ['nl'];
    if (classes.length === 0) classes.push('nl');

    const validBossIds = new Set(BOSSES.map(b => b.id));
    const classLevels = {};
    const classBosses = {};
    const classMw20 = {};
    classes.forEach(cid => {
      const rawLvl = item.classLevels && Number(item.classLevels[cid]);
      classLevels[cid] = (Number.isFinite(rawLvl) && rawLvl >= 1 && rawLvl <= 200) ? Math.round(rawLvl) : 140;
      if (item.classBosses && Array.isArray(item.classBosses[cid])) {
        classBosses[cid] = item.classBosses[cid].filter(bid => validBossIds.has(bid));
      } else {
        classBosses[cid] = [...ALL_BOSS_IDS];
      }
      if (item.classMw20 && item.classMw20[cid]) {
        classMw20[cid] = true;
      }
    });

    const mainClass = (item.mainClass && classes.includes(item.mainClass))
      ? item.mainClass
      : (item.preferredClass && classes.includes(item.preferredClass))
      ? item.preferredClass
      : classes[0];

    const preferredClass = (item.preferredClass && classes.includes(item.preferredClass))
      ? item.preferredClass
      : mainClass;

    const lockedClass = (item.lockedClass && classes.includes(item.lockedClass))
      ? item.lockedClass
      : null;

    const slots = {};
    validDayIds.forEach(dId => {
      const dayArr = item.slots && Array.isArray(item.slots[dId]) ? item.slots[dId] : [];
      slots[dId] = dayArr.filter(pId => validPeriodIds.has(pId));
    });

    return {
      id: (typeof item.id === 'string' && item.id.trim()) ? item.id.trim() : `member_${Date.now()}_${idx}`,
      name: (typeof item.name === 'string' && item.name.trim()) ? item.name.trim() : `團員 ${idx + 1}`,
      classes,
      mainClass,
      classLevels,
      classBosses,
      classMw20,
      preferredClass,
      lockedClass,
      priorityAttend: !!item.priorityAttend,
      note: typeof item.note === 'string' ? item.note : '',
      occasional: !!item.occasional,
      slots
    };
  });
}

function normalizeImportedLockedLineups(raw) {
  const arr = Array.isArray(raw)
    ? raw
    : (raw && Array.isArray(raw.lockedLineups))
    ? raw.lockedLineups
    : (raw && Array.isArray(raw.lineups))
    ? raw.lineups
    : null;
  if (!arr) throw new Error('格式錯誤：找不到已鎖定陣容陣列資料');
  if (arr.length > 0 && arr[0] && Array.isArray(arr[0].classes) && arr[0].slots && !Array.isArray(arr[0].members)) {
    throw new Error('此 JSON 為「團員名單」資料，請於上方資料類型切換為「👥 團員職業與時段名單」後再匯入');
  }

  const validClassIds = new Set(CLASSES.map(c => c.id));
  const validSlotKeys = new Set(['custom', ...DAYS.flatMap(d => PERIODS.map(p => `${d.id}_${p.id}`))]);

  return arr.map((item, idx) => {
    if (!item || typeof item !== 'object') throw new Error(`第 ${idx + 1} 筆鎖定陣容格式不正確`);
    const bossObj = BOSSES.find(b => b.id === item.bossId) || BOSSES.find(b => b.name === item.bossName) || BOSSES[0];
    const slotKey = (typeof item.slotKey === 'string' && validSlotKeys.has(item.slotKey)) ? item.slotKey : 'custom';
    let slotLabel = typeof item.slotLabel === 'string' && item.slotLabel.trim() ? item.slotLabel.trim() : '自訂時段';
    if (slotKey !== 'custom') {
      const [dId, pId] = slotKey.split('_');
      const dObj = DAYS.find(d => d.id === dId);
      const pObj = PERIODS.find(p => p.id === pId);
      if (dObj && pObj) slotLabel = `${dObj.fullLabel} ${pObj.timeRange}`;
    }

    const rawMembers = Array.isArray(item.members) ? item.members : [];
    if (rawMembers.length === 0) throw new Error(`第 ${idx + 1} 團缺少成員資料 (members)`);

    const members = rawMembers.map((mEntry, mIdx) => {
      const cid = validClassIds.has(mEntry.classId) ? mEntry.classId : 'nl';
      const cObj = CLASS_MAP[cid];
      const isPug = !!mEntry.isPug;
      const rawName = (typeof mEntry.memberName === 'string' && mEntry.memberName.trim())
        ? mEntry.memberName.trim()
        : `成員 ${mIdx + 1}`;
      const baseName = (typeof mEntry.baseName === 'string' && mEntry.baseName.trim())
        ? mEntry.baseName.trim()
        : rawName.replace(/\(雙開\)$/, '').trim();

      let resolvedMemberId = typeof mEntry.memberId === 'string' ? mEntry.memberId : null;
      if (!isPug) {
        const exactById = resolvedMemberId && state.members.find(x => x.id === resolvedMemberId);
        if (!exactById) {
          const byName = state.members.find(x => x.name === baseName || x.name === rawName);
          if (byName) resolvedMemberId = byName.id;
        }
      }

      const rawLvl = Number(mEntry.level);
      const level = (Number.isFinite(rawLvl) && rawLvl >= 1 && rawLvl <= 200) ? Math.round(rawLvl) : 140;

      return {
        memberId: isPug ? (resolvedMemberId || `__pug_${mIdx + 1}__`) : (resolvedMemberId || `member_unknown_${mIdx}`),
        memberName: rawName,
        baseName,
        classId: cid,
        classShort: cObj?.short || mEntry.classShort || cid,
        className: cObj?.name || mEntry.className || cid,
        badge: cObj?.badge || mEntry.badge || '',
        level,
        hasMw20: !!mEntry.hasMw20,
        isPug,
        isDualPrimary: !!mEntry.isDualPrimary,
        isDualSecondary: !!mEntry.isDualSecondary
      };
    });

    let compSig = typeof item.compSig === 'string' && item.compSig.trim() ? item.compSig.trim() : '';
    if (!compSig) {
      const countMap = {};
      CLASSES.forEach(c => countMap[c.id] = 0);
      members.forEach(m => countMap[m.classId] = (countMap[m.classId] || 0) + 1);
      compSig = CLASSES.filter(c => countMap[c.id] > 0).map(c => `${c.short}×${countMap[c.id]}`).join(' + ');
    }

    return {
      id: (typeof item.id === 'string' && item.id.trim()) ? item.id.trim() : `lock_${Date.now()}_${idx}`,
      title: (typeof item.title === 'string' && item.title.trim()) ? item.title.trim() : `第 ${idx + 1} 團｜${bossObj.name}`,
      bossId: bossObj.id,
      bossName: bossObj.name,
      slotKey,
      slotLabel,
      compSig,
      enabled: item.enabled !== false,
      members
    };
  });
}

function refreshIoModalContent(clearImportText = false) {
  const targetSelect = document.getElementById('ioTargetSelect');
  const exportTitle = document.getElementById('ioExportSectionTitle');
  const exportCountBadge = document.getElementById('ioExportCountBadge');
  const exportTextarea = document.getElementById('ioExportTextarea');
  const importTitle = document.getElementById('ioImportSectionTitle');
  const importLabel = document.getElementById('ioImportLabel');
  const importTextarea = document.getElementById('ioImportTextarea');
  const status = document.getElementById('ioStatusMsg');
  const btnMerge = document.getElementById('btnConfirmImportMerge');
  const btnReplace = document.getElementById('btnConfirmImportReplace');

  const isLockedTarget = currentIoTarget === 'lockedLineups';
  if (targetSelect) targetSelect.value = isLockedTarget ? 'lockedLineups' : 'members';

  if (isLockedTarget) {
    exportTitle.textContent = '📤 匯出已鎖定出團陣容（JSON）';
    exportCountBadge.textContent = `目前共 ${state.lockedLineups.length} 團`;
    exportTextarea.value = JSON.stringify(state.lockedLineups, null, 2);
    importTitle.textContent = '📥 匯入已鎖定出團陣容（JSON）';
    importLabel.textContent = '貼上已鎖定陣容 JSON 代碼：';
    importTextarea.placeholder = '請在此貼上匯出的已鎖定陣容 JSON 資料...';
    if (btnMerge) btnMerge.textContent = '➕ 合併加入現有鎖定陣容';
    if (btnReplace) btnReplace.textContent = '🔄 覆蓋現有鎖定陣容';
  } else {
    exportTitle.textContent = '📤 匯出團員資料（JSON）';
    exportCountBadge.textContent = `目前共 ${state.members.length} 人`;
    exportTextarea.value = JSON.stringify(state.members, null, 2);
    importTitle.textContent = '📥 匯入團員資料（JSON）';
    importLabel.textContent = '貼上團員資料 JSON 代碼：';
    importTextarea.placeholder = '請在此貼上匯出的團員 JSON 資料...';
    if (btnMerge) btnMerge.textContent = '➕ 合併加入現有名單';
    if (btnReplace) btnReplace.textContent = '🔄 覆蓋現有名單';
  }

  if (clearImportText) {
    importTextarea.value = '';
  }
  status.textContent = '';
  status.className = 'text-xs font-semibold text-emerald-400';
}

function openIoModal(target = 'members') {
  currentIoTarget = target === 'lockedLineups' ? 'lockedLineups' : 'members';
  const modal = document.getElementById('ioModal');
  refreshIoModalContent(true);
  if (typeof modal?.showModal === 'function') {
    if (!modal.open) modal.showModal();
  } else if (typeof modal?.setAttribute === 'function') {
    modal.setAttribute('open', '');
  }
}

function closeIoModal() {
  const modal = document.getElementById('ioModal');
  if (typeof modal?.close === 'function') {
    if (modal.open) modal.close();
  } else if (typeof modal?.removeAttribute === 'function') {
    modal.removeAttribute('open');
  }
}

function applyImportedLockedLineups(importedList, mergeMode) {
  if (mergeMode) {
    const existingById = new Map((state.lockedLineups || []).map(l => [l.id, l]));
    importedList.forEach(item => {
      if (existingById.has(item.id)) {
        Object.assign(existingById.get(item.id), item);
      } else {
        state.lockedLineups.push(item);
      }
    });
  } else {
    state.lockedLineups = importedList;
  }
  saveLockedLineups(state.lockedLineups);
  if (state.selectedPreset !== 'custom') {
    applyPreset(state.selectedPreset);
  } else {
    const usage = getLockedUsage();
    state.activeMemberIds = state.members.filter(m => !usage.isMemberFullyExcluded(m)).map(m => m.id);
  }
  renderAll();
  closeIoModal();
}

function applyImportedMembers(importedList, mergeMode) {
  if (mergeMode) {
    const existingMap = new Map(state.members.map(m => [m.id, m]));
    importedList.forEach(m => {
      if (existingMap.has(m.id)) {
        const existingByName = state.members.find(x => x.name === m.name);
        if (existingByName) {
          Object.assign(existingByName, m, { id: existingByName.id });
        } else {
          m.id = `${m.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          state.members.push(m);
        }
      } else {
        const existingByName = state.members.find(x => x.name === m.name);
        if (existingByName) {
          Object.assign(existingByName, m, { id: existingByName.id });
        } else {
          state.members.push(m);
        }
      }
    });
  } else {
    state.members = importedList;
  }
  state.activeMemberIds = state.members.map(m => m.id);
  state.selectedPreset = 'custom';
  saveMembers(state.members);
  renderAll();
  closeIoModal();
}

const ioModalEl = document.getElementById('ioModal');
document.getElementById('btnIoMembers').addEventListener('click', () => openIoModal('members'));
document.getElementById('ioTargetSelect').addEventListener('change', (e) => {
  currentIoTarget = e.target.value === 'lockedLineups' ? 'lockedLineups' : 'members';
  refreshIoModalContent(false);
});
document.getElementById('closeIoModal').addEventListener('click', closeIoModal);
if (ioModalEl && !('closedBy' in HTMLDialogElement.prototype)) {
  const outsideDialog = (e) => {
    const r = ioModalEl.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  let pressedOutside = false;
  ioModalEl.addEventListener('pointerdown', (e) => {
    pressedOutside = outsideDialog(e);
  });
  ioModalEl.addEventListener('pointerup', (e) => {
    if (pressedOutside && outsideDialog(e)) closeIoModal();
    pressedOutside = false;
  });
}

document.getElementById('btnCopyExportJson').addEventListener('click', () => {
  const textarea = document.getElementById('ioExportTextarea');
  const status = document.getElementById('ioStatusMsg');
  textarea.select();
  try {
    navigator.clipboard.writeText(textarea.value);
    status.className = 'text-xs font-semibold text-emerald-400';
    status.textContent = '✅ 已複製匯出 JSON 到剪貼簿！';
  } catch (e) {}
});

document.getElementById('btnDownloadExportJson').addEventListener('click', () => {
  const isLockedTarget = currentIoTarget === 'lockedLineups';
  const dataStr = JSON.stringify(isLockedTarget ? state.lockedLineups : state.members, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = isLockedTarget ? `artale_locked_lineups_${dateStr}.json` : `artale_members_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  const status = document.getElementById('ioStatusMsg');
  status.className = 'text-xs font-semibold text-emerald-400';
  status.textContent = '✅ 已開始下載 JSON 檔案！';
});

document.getElementById('importFileInput').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('ioImportTextarea').value = String(reader.result || '');
    const status = document.getElementById('ioStatusMsg');
    status.className = 'text-xs font-semibold text-emerald-400';
    status.textContent = `📂 已載入檔案：${file.name}（請點右下角確認匯入）`;
  };
  reader.readAsText(file, 'utf-8');
  e.target.value = '';
});

function handleConfirmImport(mergeMode) {
  const status = document.getElementById('ioStatusMsg');
  const rawText = document.getElementById('ioImportTextarea').value.trim();
  if (!rawText) {
    status.className = 'text-xs font-semibold text-rose-400';
    status.textContent = '⚠️ 請先貼上 JSON 代碼或選擇 .json 檔案';
    return;
  }
  try {
    const parsed = JSON.parse(rawText);
    if (currentIoTarget === 'lockedLineups') {
      const list = normalizeImportedLockedLineups(parsed);
      status.className = 'text-xs font-semibold text-emerald-400';
      applyImportedLockedLineups(list, mergeMode);
    } else {
      const list = normalizeImportedMembers(parsed);
      status.className = 'text-xs font-semibold text-emerald-400';
      applyImportedMembers(list, mergeMode);
    }
  } catch (err) {
    status.className = 'text-xs font-semibold text-rose-400';
    status.textContent = `❌ JSON 解析失敗：${err.message || '格式不正確'}`;
  }
}

document.getElementById('btnConfirmImportReplace').addEventListener('click', () => handleConfirmImport(false));
document.getElementById('btnConfirmImportMerge').addEventListener('click', () => handleConfirmImport(true));

initThemeToggle();
initBackToTop();
renderAll();
