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
    map.drawImage(mapImage, 0, 0, w, h); cacheWidth = w; cacheHeight = h;
  }
  ctx.drawImage(mapCache, -width / 2 - position.x, -height / 2 - position.y, width * 2, height * 2);
}
export function libraryObjectAt(x, y) {
  if (!lastDraw) return null;
  const {canvas, position} = lastDraw, {width, height} = canvas.getBoundingClientRect();
  const px = (x + width / 2 + position.x) / (width * 2), py = (y + height / 2 + position.y) / (height * 2);
  if (py < .26 && py > .04 && px > .4 && px < .61) return 'arena-demo';
  if (py > .34 && py < .64 && px > .1 && px < .47) return 'categories';
  return null;
}
