// One decoded image and one viewport-sized map cache are reused throughout the session.
const mapImage = new Image();
mapImage.src = '/assets/lobby/lobby.png';
let mapCache, cacheWidth = 0, cacheHeight = 0, lastDraw;
mapImage.onload = () => { mapCache = null; if (lastDraw) drawLibrary(lastDraw.canvas, lastDraw.position); };

export function mapBounds(canvas) {
  const rect = canvas?.getBoundingClientRect();
  return { x: (rect?.width || 0) / 2, y: (rect?.height || 0) / 2 };
}
export function drawLibrary(canvas, position) {
  if (!canvas) return;
  const {width, height} = canvas.getBoundingClientRect();
  if (!width || !height) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.imageSmoothingEnabled = false;
  lastDraw = {canvas, position: {...position}};
  if (!mapImage.complete || !mapImage.naturalWidth) { ctx.fillStyle = '#d9c3a5'; ctx.fillRect(0,0,width,height); return; }
  const w = Math.round(width * 2), h = Math.round(height * 2);
  if (!mapCache || cacheWidth !== w || cacheHeight !== h) {
    mapCache = document.createElement('canvas'); mapCache.width = w; mapCache.height = h;
    const map = mapCache.getContext('2d'); map.imageSmoothingEnabled = false;
    map.drawImage(mapImage, 0, 0, w, h);
    // Replace the old place name on the cached map without altering the supplied image.
    map.fillStyle = '#4e1e26'; map.strokeStyle = '#e9d8be'; map.lineWidth = Math.max(2,w*.002);
    map.beginPath(); map.roundRect(w*.232,h*.395,w*.12,h*.043,Math.max(3,w*.004)); map.fill(); map.stroke();
    map.fillStyle = '#fff4e5'; map.font = `bold ${Math.max(12,h*.025)}px "Nanum Gothic", sans-serif`; map.textAlign='center'; map.textBaseline='middle'; map.fillText('도서 검색',w*.292,h*.417);
    cacheWidth = w; cacheHeight = h;
  }
  ctx.drawImage(mapCache, -width / 2 - position.x, -height / 2 - position.y, width * 2, height * 2);
}
export function libraryObjectAt(x, y) {
  if (!lastDraw) return null;
  const {canvas, position} = lastDraw, {width, height} = canvas.getBoundingClientRect();
  const px = (x + width / 2 + position.x) / (width * 2), py = (y + height / 2 + position.y) / (height * 2);
  if (py >= .24 && py < .35 && px > .43 && px < .57) return 'arena-demo';
  if (py >= .25 && py < .35 && px >= .24 && px < .34) return 'bookshelf';
  if (py >= .25 && py < .35 && px > .68 && px <= .76) return 'inventory';
  if (py > .4 && py < .62 && px > .28 && px < .4) return 'categories';
  if (py > .4 && py < .62 && px > .6 && px < .74) return 'desk';
  return null;
}
