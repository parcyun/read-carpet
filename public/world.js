// Deterministic, bounded chunks keep the same furniture in the same place on return.
const SIZE=185;
let displayed=[];let latest=null;const sourceMap=new Image();sourceMap.onload=()=>{if(latest)drawLibrary(latest.canvas,latest.camera)};sourceMap.src='/assets/lobby/lobby-bg.svg';
const seed=(x,y)=>{let n=Math.imul(x,374761393)+Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967296};
const poly=(ctx,points,color)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill()};
function furniture(c,x,y,type){
 c.save();c.translate(x,y);
 if(type===0){ // isometric bookcase
  poly(c,[[-37,5],[0,-13],[37,5],[0,24]],'#321722');poly(c,[[-37,5],[0,24],[0,68],[-37,49]],'#6e1a2c');poly(c,[[0,24],[37,5],[37,49],[0,68]],'#4e1220');
  if(sourceMap.complete&&sourceMap.naturalWidth){c.save();c.transform(1,.5,0,1,-37,5);c.drawImage(sourceMap,32,224,64,96,0,0,37,44);c.restore()}
  c.strokeStyle='#24161a';c.lineWidth=4;c.beginPath();c.moveTo(-37,25);c.lineTo(0,44);c.lineTo(37,25);c.stroke();
  for(let i=0;i<4;i++){c.fillStyle=['#e8ddce','#a9adb3','#a83c4a','#eee6d8'][i];c.fillRect(-30+i*7,10+i*3.5,5,14)}
 }else if(type===1){poly(c,[[-40,0],[0,-19],[40,0],[0,20]],'#76503f');poly(c,[[-40,0],[0,20],[0,29],[-40,9]],'#4b2a25');poly(c,[[0,20],[40,0],[40,9],[0,29]],'#5c382d');poly(c,[[-12,-3],[1,-9],[13,-3],[0,3]],'#f4eee4');c.strokeStyle='#24161a';c.lineWidth=4;[[-29,7],[-4,20],[30,6]].forEach(([a,b])=>{c.beginPath();c.moveTo(a,b);c.lineTo(a,b+21);c.stroke()})
 }else if(type===2){poly(c,[[-14,6],[0,13],[14,6],[10,25],[0,30],[-10,25]],'#7a1022');c.fillStyle='#36513a';[[-11,-2],[0,-9],[11,-3],[-3,2],[7,4]].forEach(([a,b])=>c.fillRect(a-7,b-9,14,18));
 }else{poly(c,[[-25,0],[0,-12],[25,0],[0,12]],'#a9adb3');poly(c,[[-25,0],[0,12],[0,20],[-25,8]],'#4e1220');poly(c,[[0,12],[25,0],[25,8],[0,20]],'#7a1022');c.fillStyle='#eee4d7';c.fillRect(-10,-5,19,5)}
 c.restore();
}
export function drawLibrary(canvas,camera){if(!canvas)return;latest={canvas,camera:{...camera}};const box=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.round(box.width),h=Math.round(box.height);if(!w||!h)return;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.imageSmoothingEnabled=false;c.fillStyle='#eee5d8';c.fillRect(0,0,w,h);
 // Diamond floor stays anchored to world coordinates as the camera moves.
 const tw=96,th=48,ox=w/2-camera.x,oy=h/2-camera.y;
 for(let row=Math.floor((-oy)/th)-2;row<Math.ceil((h-oy)/th)+2;row++)for(let col=Math.floor((-ox)/tw)-2;col<Math.ceil((w-ox)/tw)+2;col++){let x=col*tw+(Math.abs(row%2)?tw/2:0)+ox,y=row*th+oy;poly(c,[[x,y-th/2],[x+tw/2,y],[x,y+th/2],[x-tw/2,y]],(col+row)%2?'#efe6d8':'#e5dacb');c.strokeStyle='#d8cbba';c.lineWidth=.7;c.stroke()}
 // The brand-red carpet is a continuous path through the world.
 c.fillStyle='#7a1022';c.fillRect(ox-57,0,114,h);c.fillStyle='#c8102e';c.fillRect(ox-49,0,98,h);c.fillStyle='#e6d9c6';c.fillRect(ox-48,0,3,h);c.fillRect(ox+45,0,3,h);
 const minX=Math.floor((camera.x-w/2)/SIZE)-1,maxX=Math.floor((camera.x+w/2)/SIZE)+1,minY=Math.floor((camera.y-h/2)/SIZE)-1,maxY=Math.floor((camera.y+h/2)/SIZE)+1,objects=[];
 for(let cy=minY;cy<=maxY;cy++)for(let cx=minX;cx<=maxX;cx++){let r=seed(cx,cy);if(r<.14)continue;let x=cx*SIZE+25+seed(cx+29,cy-7)*135,y=cy*SIZE+25+seed(cx-9,cy+41)*135;if(Math.abs(x)<110)continue;objects.push({x:x+ox,y:y+oy,type:(t=>t<.52?0:t<.75?1:t<.9?2:3)(seed(cx+13,cy+83))})}
 objects.sort((a,b)=>a.y-b.y);displayed=objects;objects.forEach(o=>furniture(c,o.x,o.y,o.type));
}

export function libraryObjectAt(x,y){return displayed.some(o=>o.type===0&&x>=o.x-40&&x<=o.x+40&&y>=o.y-16&&y<=o.y+70)}
