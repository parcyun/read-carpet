// 고전 문학 인물 설문 데이터와 픽셀 캐릭터 색 바꾸기
// 선택지·인물 대사는 원문 인용이 아닌 성격 기반 창작 문장입니다.

export const characters = [
  {id:'hong',name:'홍길동',book:'홍길동전',author:'허균(전해짐)',title:'의로운 개혁가',type:'자유를 여는 개척자',bits:[1,1,1,1,1],intro:'불합리한 질서를 당연하게 여기지 않고, 새로운 길을 만들어 내는 사람.',line:'“정해진 규칙이 불공평하다면, 바꿀 길을 찾겠어.”',strength:'불의에 맞서는 용기와 실행력',growth:'혼자 모든 문제를 해결하려 하지 않기',why:'당연한 규칙에도 질문을 던지고 직접 움직이려는 선택이 닮았습니다.'},
  {id:'chunhyang',name:'성춘향',book:'춘향전',author:'작자 미상',title:'당당한 신념가',type:'신념을 지키는 수호자',bits:[0,1,0,1,1],intro:'어려움 앞에서도 자신의 존엄과 약속을 쉽게 내주지 않는 사람.',line:'“마음과 약속은 누군가의 힘으로 바꿀 수 없어요.”',strength:'흔들리지 않는 신념과 자기 존중',growth:'혼자 견디기보다 도움을 요청하는 연습',why:'압박을 받는 상황에서도 자신이 옳다고 믿는 가치를 놓지 않는 점이 닮았습니다.'},
  {id:'elizabeth',name:'엘리자베스 베넷',book:'오만과 편견',author:'제인 오스틴',title:'재치 있는 통찰가',type:'편견을 깨는 관찰가',bits:[1,0,0,1,1],intro:'재치와 독립심으로 세상을 바라보고, 스스로의 오해도 고칠 줄 아는 사람.',line:'“남들의 평가보다 내 눈으로 직접 판단할래요.”',strength:'솔직함과 자기 성찰, 날카로운 관찰',growth:'첫인상만으로 결론 내리지 않기',why:'다른 사람의 말보다 자신의 판단을 믿되 새로운 사실 앞에 생각을 수정하는 태도가 닮았습니다.'},
  {id:'jane',name:'제인 에어',book:'제인 에어',author:'샬럿 브론테',title:'자존감 있는 독립가',type:'존엄을 지키는 독립가',bits:[0,1,1,1,1],intro:'자신의 마음을 소중히 여기면서도 평등과 양심을 포기하지 않는 사람.',line:'“사랑하더라도 나 자신을 잃을 수는 없어요.”',strength:'자기 존중과 도덕적 용기',growth:'자신을 지키면서 마음도 충분히 표현하기',why:'관계 속에서도 자신이 지킬 원칙과 독립성을 우선하는 선택이 닮았습니다.'},
  {id:'victor',name:'빅터 프랑켄슈타인',book:'프랑켄슈타인',author:'메리 셸리',title:'집요한 탐구자',type:'경계를 넘는 탐구자',bits:[0,1,1,1,0],intro:'거대한 질문과 가능성에 몰입하는 탐구자. 발견 뒤의 책임도 배워야 합니다.',line:'“불가능해 보이는 일이라도 원리부터 알아내고 싶어.”',strength:'집요한 호기심과 탐구력',growth:'결과의 책임과 주변 사람의 마음까지 보기',why:'일상적 답보다 새로운 가능성을 탐구하는 선택이 닮았습니다.'},
  {id:'santiago',name:'산티아고',book:'노인과 바다',author:'어니스트 헤밍웨이',title:'끈질긴 도전자',type:'끝까지 버티는 실천가',bits:[0,1,0,1,0],intro:'결과가 불확실해도 자신의 기술과 경험을 믿고 묵묵히 나아가는 사람.',line:'“오늘도 내가 할 수 있는 일을 끝까지 해 보겠네.”',strength:'끈기와 숙련, 평정심',growth:'도움받는 일을 약함으로 여기지 않기',why:'요란한 말보다 꾸준한 실천과 인내를 택하는 모습이 닮았습니다.'},
  {id:'atticus',name:'애티커스 핀치',book:'앵무새 죽이기',author:'하퍼 리',title:'공정한 수호자',type:'공정을 실천하는 조력자',bits:[0,0,0,0,1],intro:'사람을 이해하려 노력하면서도 옳지 않은 일 앞에서는 물러서지 않는 사람.',line:'“판단하기 전에 그 사람의 입장에서 생각해 보자.”',strength:'공감과 정의감, 차분한 설득',growth:'모든 사람을 설득할 수 없다는 점 받아들이기',why:'다른 사람의 사정을 듣고 공정한 해결을 찾으려는 태도가 닮았습니다.'},
  {id:'valjean',name:'장 발장',book:'레 미제라블',author:'빅토르 위고',title:'따뜻한 구원자',type:'행동으로 증명하는 보호자',bits:[1,0,0,0,1],intro:'과거에 머물지 않고 누군가의 삶을 바꾸는 선택으로 자신을 새롭게 만드는 사람.',line:'“누군가에게 도움이 된다면 내가 먼저 움직이겠소.”',strength:'책임감과 관대함, 행동하는 연민',growth:'타인을 돌보는 만큼 자신도 돌보기',why:'사람을 외면하지 않고 작은 행동으로 변화를 만들려는 선택이 닮았습니다.'},
  {id:'quixote',name:'돈키호테',book:'돈키호테',author:'미겔 데 세르반테스',title:'낭만적 이상가',type:'이상을 좇는 모험가',bits:[1,0,1,0,1],intro:'세상이 비웃어도 더 나은 세계를 상상하고 모험을 시작하는 사람.',line:'“누군가는 꿈이라고 웃겠지만, 나는 가 보겠네!”',strength:'상상력과 도전 정신',growth:'이상과 현실의 차이를 확인하기',why:'불가능해 보이는 일에도 의미를 발견하고 도전하는 모습이 닮았습니다.'},
  {id:'holmes',name:'셜록 홈즈',book:'주홍색 연구',author:'아서 코넌 도일',title:'냉철한 관찰자',type:'단서를 꿰뚫는 분석가',bits:[0,1,0,0,0],intro:'작은 단서도 놓치지 않고 가설을 검증하며 답을 찾아가는 사람.',line:'“추측부터 하지 말고, 먼저 증거를 살펴보죠.”',strength:'관찰력과 논리적 문제 해결',growth:'논리만큼 상대의 감정에도 관심 갖기',why:'결정 전에 근거를 모으고 상황을 분석하는 선택이 닮았습니다.'}
];

export const questions = [
  {scene:'친구들이 불공평한 규칙 때문에 의견이 갈렸어요.',tag:'01 · 문제를 마주할 때',title:'이 상황에서 나는?',choices:[{text:'“왜 이런 규칙이 생겼는지 먼저 살펴보자.”',sub:'차분하게 상황을 이해한다'},{text:'“불공평하다면 우리가 바꿔 보자!”',sub:'먼저 행동하며 변화를 만든다'}]},
  {scene:'친구가 약속을 어겼지만, 그럴 만한 사정이 있었다고 해요.',tag:'02 · 판단의 기준',title:'내가 먼저 할 말은?',choices:[{text:'“먼저 네가 어떤 상황이었는지 듣고 싶어.”',sub:'사람의 마음과 사정을 살핀다'},{text:'“사정을 듣더라도 약속의 의미는 지켜야 해.”',sub:'원칙과 일관성을 중시한다'}]},
  {scene:'우리 반이 새로운 공간을 꾸미게 되었어요.',tag:'03 · 생각의 방향',title:'어떤 아이디어가 끌릴까?',choices:[{text:'“지금 불편한 곳부터 실제로 고쳐 보자.”',sub:'현실의 문제에 집중한다'},{text:'“아직 없는 공간을 상상해 보면 어때?”',sub:'새로운 가능성을 펼친다'}]},
  {scene:'중요한 결정을 앞두고 친구들이 서로 다른 의견을 냈어요.',tag:'04 · 함께하는 방식',title:'나는 어떻게 결정할까?',choices:[{text:'“서로의 생각을 엮어서 같이 정해 보자.”',sub:'협력하고 조율한다'},{text:'“의견은 듣되 마지막에는 내 기준으로 정할래.”',sub:'독립적인 판단을 지킨다'}]},
  {scene:'해 본 적 없는 도전적인 프로젝트 제안이 들어왔어요.',tag:'05 · 낯선 도전 앞에서',title:'내가 선택할 한마디는?',choices:[{text:'“우선 가능한 방법부터 시험해 보자.”',sub:'안정적으로 검증하며 전진한다'},{text:'“실패할 수도 있지만 해 보며 배우자!”',sub:'새로운 도전에 뛰어든다'}]}
];

export const characterById = id => characters.find(c => c.id === id);

// 선택(0/1 다섯 개)과 인물 성향 비트를 비교해 일치 수가 많은 순으로 정렬
export function rankCharacters(choices) {
  return characters.map((c, index) => ({...c, index, score: c.bits.reduce((n, b, i) => n + (b === choices[i] ? 1 : 0), 0)}))
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

// ── 픽셀 스프라이트 ───────────────────────────────────────────
// 마스크 PNG의 R 값: 1 머리, 2 피부, 3 상의(옷), 4 하의, 5 신발 / base는 영역별 기준색
const SPRITES = {"hong":{"w":201,"h":379,"base":{"1":"#1d1618","2":"#fae0c5","3":"#6f2c38","4":"#f3e8d5","5":"#604b48"}},"chunhyang":{"w":187,"h":380,"base":{"1":"#1e1616","2":"#f9e0c6","3":"#f0e3ce","4":"#9f575d","5":"#a88368"}},"elizabeth":{"w":200,"h":400,"base":{"1":"#3e2d29","2":"#fde1c5","3":"#f4e7d3","5":"#6a4d44"}},"jane":{"w":194,"h":393,"base":{"1":"#4e322a","2":"#fbdec3","3":"#71433a","5":"#583931"}},"valjean":{"w":203,"h":382,"base":{"1":"#251c1b","2":"#fbdcc0","3":"#714f3e","4":"#5f473c","5":"#5a453e"}},"quixote":{"w":203,"h":386,"base":{"1":"#251e1e","2":"#fde0c6","3":"#743d43","4":"#d6be99","5":"#5e4239"}},"holmes":{"w":202,"h":379,"base":{"1":"#3f2f2d","2":"#fbdcc0","3":"#ab7e5e","4":"#4d3933","5":"#513d39"}},"victor":{"w":201,"h":388,"base":{"1":"#392a25","2":"#fce2c8","3":"#6e4132","4":"#af896c","5":"#4e3229"}},"santiago":{"w":205,"h":383,"base":{"1":"#201919","2":"#fbdcbf","3":"#8c5b40","4":"#906754","5":"#64443a"}},"atticus":{"w":190,"h":383,"base":{"1":"#261c1a","2":"#fbe1ca","3":"#6f4e40","4":"#805d4c","5":"#60453c"}}};

// 꾸미기 옵션: avatar 배열 위치(slot)와 마스크 영역(role). 색 목록의 0번은 '원래 색'
export const colorOptions = [
  {slot:0, role:1, label:'머리색', colors:[['원래 색'],['검정','#2a2124'],['갈색','#6b3f2a'],['금발','#d9a441'],['붉은색','#a8452f'],['은빛','#b9b4c7'],['파랑','#3f5fa8']]},
  {slot:2, role:2, label:'피부색', colors:[['원래 색'],['밝은 살구','#fde7d4'],['살구','#f1c3a0'],['구릿빛','#c88c6f'],['갈색','#9c624e'],['짙은 갈색','#654239']]},
  {slot:3, role:3, label:'상의 색', dressLabel:'옷 색', colors:[['원래 색'],['레드','#b42e41'],['크림','#f2e5cc'],['네이비','#3d5366'],['그린','#5d7a58'],['핑크','#d49a9d'],['머스터드','#d9a63a']]},
  {slot:4, role:4, label:'하의 색', colors:[['원래 색'],['브라운','#725445'],['블랙','#37313a'],['청색','#536a83'],['크림','#ddd1bc'],['자주','#814453']]},
  {slot:5, role:5, label:'신발 색', colors:[['원래 색'],['검정','#29252b'],['갈색','#684e40'],['빨강','#9d3540'],['흰색','#ede4d7'],['파랑','#465d77']]}
];
export const accessoryOption = {slot:6, label:'머리 장식', items:['없음','리본','모자','별','꽃']};

// 캐릭터마다 있는 영역만 꾸미기 옵션으로 보여 줍니다 (드레스 인물은 하의 없음)
export function optionsFor(id) {
  const base = SPRITES[id]?.base || {};
  const hasBottom = Boolean(base[4]);
  return colorOptions.filter(o => base[o.role]).map(o => ({...o, label: !hasBottom && o.dressLabel ? o.dressLabel : o.label}));
}
export const baseColor = (id, role) => SPRITES[id]?.base?.[role];
export const hasSprite = id => Boolean(SPRITES[id]);

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = (r, g, b) => .299 * r + .587 * g + .114 * b;
const images = new Map(), cache = new Map(), jobs = new Map();
function loadImage(src) {
  if (!images.has(src)) images.set(src, new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; }));
  return images.get(src);
}
const spriteKey = (id, a) => id + ':' + colorOptions.map(o => a[o.slot] || 0).join('-');

async function paint(id, a) {
  const [img, mask] = await Promise.all([loadImage(`/characters/${id}.png`), loadImage(`/characters/${id}-mask.png`)]);
  const {w, h, base} = SPRITES[id];
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  ctx.drawImage(mask, 0, 0, w, h); const roles = ctx.getImageData(0, 0, w, h).data;
  ctx.clearRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
  const pixels = ctx.getImageData(0, 0, w, h); const d = pixels.data;
  const targets = {};
  for (const o of colorOptions) {
    const color = o.colors[a[o.slot] || 0]?.[1];
    if (color && base[o.role]) targets[o.role] = {rgb: hex(color), base: Math.max(lum(...hex(base[o.role])), 8)};
  }
  for (let i = 0; i < d.length; i += 4) {
    const t = targets[roles[i]]; if (!t || !d[i + 3]) continue;
    const ratio = lum(d[i], d[i + 1], d[i + 2]) / t.base;
    if (roles[i] === 1 && ratio > 2.2) continue; // 머리와 얼굴 경계의 흐린 픽셀은 그대로
    const f = Math.min(1.25, Math.max(.35, ratio));
    d[i] = Math.min(255, t.rgb[0] * f); d[i + 1] = Math.min(255, t.rgb[1] * f); d[i + 2] = Math.min(255, t.rgb[2] * f);
  }
  ctx.putImageData(pixels, 0, 0);
  return canvas.toDataURL('image/png');
}

// 색을 바꾼 이미지는 비동기로 만들고, 준비되면 같은 키의 <img>를 모두 교체합니다
export function spriteSrc(id, a = []) {
  const original = `/characters/${id}.png`;
  const key = spriteKey(id, a);
  if (colorOptions.every(o => !a[o.slot])) return {src: original, key};
  if (cache.has(key)) return {src: cache.get(key), key};
  if (!jobs.has(key)) jobs.set(key, paint(id, a).then(url => {
    cache.set(key, url);
    document.querySelectorAll('img[data-sprite]').forEach(img => { if (img.dataset.sprite === key) img.src = url; });
  }).catch(() => jobs.delete(key)));
  return {src: original, key};
}
