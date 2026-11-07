const STORAGE_KEY = 'read-carpet-qr-panel-v1';
const DESTINATION = 'https://read-carpet.vercel.app/';
const panel = document.createElement('section');
panel.id = 'read-carpet-qr';
panel.className = 'qr-panel';
panel.setAttribute('role', 'dialog');
panel.setAttribute('aria-label', 'Read Carpet QR 코드');
panel.hidden = true;
panel.innerHTML = `<div class="qr-head"><button class="qr-handle" type="button" aria-label="QR 창 이동" title="QR 창 이동"></button><button class="qr-tool qr-pin" type="button" aria-label="QR 창 고정" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-4 4v2h12v-2l-4-4V3M12 15v6"/></svg></button><button class="qr-tool qr-close" type="button" aria-label="QR 창 닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg></button></div><a class="qr-art" href="${DESTINATION}" target="_blank" rel="noopener noreferrer" aria-label="Read Carpet 열기"><img src="/assets/qr/read-carpet.svg?v=1" alt="Read Carpet 웹사이트 QR 코드"></a><button class="qr-resize" type="button" aria-label="QR 창 크기 조절" title="QR 창 크기 조절"></button>`;
document.body.append(panel);
let saved = {};
try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { /* Private browsing can disable storage. */ }
let pinned = saved.pinned === true;
let geometry = saved.geometry && ['left','top','width'].every(key => Number.isFinite(saved.geometry[key])) ? saved.geometry : null;
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({pinned, geometry, open: !panel.hidden})); } catch { /* The panel remains usable without storage. */ }
}
function clamp(left, top, width) {
  const vw = document.documentElement.clientWidth, vh = window.innerHeight;
  width = Math.max(1, Math.min(Math.max(190, width), vw - 16, vh - 64));
  const height = width + 48;
  left = Math.max(8, Math.min(left, vw - width - 8));
  top = Math.max(8, Math.min(top, vh - height - 8));
  geometry = {left, top, width};
  Object.assign(panel.style, {left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`, right:'auto', bottom:'auto'});
}
function position() {
  if (geometry) clamp(geometry.left, geometry.top, geometry.width);
  else { let width = Math.min(260, document.documentElement.clientWidth - 16, window.innerHeight - 64); clamp(document.documentElement.clientWidth - width - 16, 116, width); }
}
function setPinned(value) {
  pinned = value;
  const button = panel.querySelector('.qr-pin');
  button.setAttribute('aria-pressed', String(value));
  button.setAttribute('aria-label', value ? 'QR 창 고정 해제' : 'QR 창 고정');
  button.title = value ? 'QR 창 고정 해제' : 'QR 창 고정';
  if (!panel.hidden && typeof panel.showPopover === 'function') {
    if (value && !panel.hasAttribute('popover')) { panel.setAttribute('popover', 'manual'); panel.showPopover(); }
    else if (!value && panel.hasAttribute('popover')) { panel.hidePopover(); panel.removeAttribute('popover'); }
  }
  save();
}
function updateTrigger() { document.querySelector('[data-action="qr-open"]')?.setAttribute('aria-expanded', String(!panel.hidden)); }
function closeQr(restoreFocus = false) {
  if (panel.hasAttribute('popover')) { panel.hidePopover(); panel.removeAttribute('popover'); }
  panel.hidden = true; updateTrigger(); save();
  if (restoreFocus) document.querySelector('[data-action="qr-open"]')?.focus();
}
export function isQrOpen() { return !panel.hidden; }
export function toggleQr() {
  if (!panel.hidden) { closeQr(); return; }
  panel.hidden = false; position(); setPinned(pinned); updateTrigger(); save();
}
panel.querySelector('.qr-close').addEventListener('click', () => closeQr(true));
panel.querySelector('.qr-pin').addEventListener('click', () => setPinned(!pinned));
function setupHandle(handle, resizing) {
  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault(); handle.setPointerCapture(event.pointerId);
    const start = {...geometry}, x = event.clientX, y = event.clientY;
    panel.classList.add('is-manipulating');
    function move(next) { let dx = next.clientX-x, dy = next.clientY-y; if (resizing) clamp(start.left,start.top,start.width+Math.max(dx,dy)); else clamp(start.left+dx,start.top+dy,start.width); }
    function end() { handle.removeEventListener('pointermove',move); handle.removeEventListener('pointerup',end); handle.removeEventListener('pointercancel',end); panel.classList.remove('is-manipulating'); save(); }
    handle.addEventListener('pointermove',move); handle.addEventListener('pointerup',end); handle.addEventListener('pointercancel',end);
  });
  handle.addEventListener('keydown', event => {
    let delta = {ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]}[event.key];
    if (!delta) return;
    event.preventDefault(); event.stopPropagation();
    if (resizing) clamp(geometry.left,geometry.top,geometry.width+delta[0]+delta[1]);
    else clamp(geometry.left+delta[0],geometry.top+delta[1],geometry.width);
    save();
  });
}
setupHandle(panel.querySelector('.qr-handle'),false);
setupHandle(panel.querySelector('.qr-resize'),true);
document.addEventListener('pointerdown', event => { if (!panel.hidden && !pinned && !panel.contains(event.target) && !event.target.closest('[data-action="qr-open"]')) closeQr(); }, true);
document.addEventListener('keydown', event => { if (event.key==='Escape' && !panel.hidden && !pinned) { event.preventDefault(); event.stopImmediatePropagation(); closeQr(true); } }, true);
window.addEventListener('resize', () => { if (geometry) { position(); save(); } });
if (saved.open === true) { panel.hidden = false; position(); setPinned(pinned); }
