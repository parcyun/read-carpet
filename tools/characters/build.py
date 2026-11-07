"""픽셀 캐릭터 카드 이미지 → 스프라이트(PNG) + 색 영역 마스크(PNG) + 기준색(JSON) 변환.
사용법: python3 tools/characters/build.py tools/characters/cards public/characters  (numpy, pillow, scipy 필요)
그다음 출력된 meta.json 내용을 public/characters.js 의 SPRITES 에 붙여 넣습니다.
원본 파일명: hong.png, chunhyang.png ... (카드 이미지 그대로)
마스크 R 채널: 0 변경 없음, 1 머리, 2 피부, 3 상의, 4 하의, 5 신발
"""
import sys, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

def hx(h): return np.array([int(h[i:i+2], 16) for i in (1, 3, 5)], float)

# 캐릭터별 옷 색 설정: role -> (기준색 목록, y 범위). keep = 바꾸지 않을 색
CFG = {
 'hong':      dict(top=(['#6d2a37'], (0, 1)), bottom=(['#f2e8d4', '#cbc0b2'], (0.78, 0.93)), keep=['#f2e8d4']),
 'chunhyang': dict(skin_top=(0.455, 0.655), top=(['#f0e3cc', '#f8f0e0', '#cec4b8'], (0.4, 0.66)), bottom=(['#9e565c', '#7b444a'], (0.55, 0.95)), keep=['#b96859', '#9a806d']),
 'elizabeth': dict(top=(['#f4e7d3', '#ceb89e', '#e0d0bb'], (0.45, 0.95)), keep=['#694943']),
 'jane':      dict(top=(['#6f4239', '#3f2823'], (0.45, 0.95)), keep=['#f5ead7', '#e5b997']),
 'valjean':   dict(top=(['#6e4d3c', '#875c44'], (0.42, 0.86)), bottom=(['#5b453b'], (0.8, 0.93)), keep=['#733431', '#e6d0b0']),
 'quixote':   dict(top=(['#733c41'], (0.4, 0.95)), bottom=(['#d5bd99'], (0.7, 0.88)), keep=['#998a83', '#f1e7d5', '#baa894']),
 'holmes':    dict(top=(['#a97d5d', '#896851'], (0.42, 0.95)), bottom=(['#4e3833'], (0.8, 0.93)), keep=['#6e4f3c', '#f5ebd9']),
 'victor':    dict(top=(['#6c3f31', '#4f3129'], (0.42, 0.95)), bottom=(['#ab866a'], (0.75, 0.93)), keep=['#f5ebd9']),
 'santiago':  dict(top=(['#895940'], (0.42, 0.75)), bottom=(['#8c6654', '#5f463c'], (0.7, 0.92)), keep=['#efe3cf', '#d2bda8']),
 'atticus':   dict(top=(['#66483c', '#96745f'], (0.42, 0.78)), bottom=(['#7e5c4b'], (0.72, 0.93)), keep=['#f5ebd9']),
}
SKIN = hx('#f9ddc2')
SHOE_Y = {'quixote': 0.885, 'santiago': 0.935}
HAIR_EXTRA = {'chunhyang': 0.075}
meta = {}
for name, cfg in CFG.items():
    im = np.array(Image.open(f'{SRC}/{name}.png').convert('RGB')).astype(float)
    inner = im[100:1050, 100:1020]
    bg = np.median(inner[5:30, 5:30].reshape(-1, 3), axis=0)
    notbg = np.abs(inner - bg).sum(2) > 45
    ys, xs = np.where(notbg)
    pad = 8
    crop = inner[ys.min()-pad:ys.max()+pad+1, xs.min()-pad:xs.max()+pad+1]
    H, W = crop.shape[:2]
    yy = np.repeat((np.arange(H) / H)[:, None], W, 1)
    near = np.abs(crop - bg).sum(2) <= 45
    lab, _ = ndimage.label(near)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    trans = np.isin(lab, list(border))
    lum = crop @ np.array([.299, .587, .114])
    role = np.zeros((H, W), np.uint8)

    skin = (~trans) & (np.abs(crop - SKIN).sum(2) < 70) & ((crop[..., 0] - crop[..., 2]) > 42)
    rows = skin.sum(1)
    faceB = max(r for r in range(H) if r < 0.55 * H and rows[r] > 0.25 * W) / H
    hairY = faceB + HAIR_EXTRA.get(name, 0.012)
    # 머리: 머리 영역의 어두운 덩어리(열림 연산으로 얇은 외곽선·눈 제거)
    dark = (~trans) & (~skin) & (lum < 95) & (yy < hairY)
    core = ndimage.binary_opening(dark, structure=np.ones((19, 19)))
    labc, n = ndimage.label(core)
    sizes = ndimage.sum(core, labc, range(1, n + 1))
    core = np.isin(labc, [i + 1 for i, s in enumerate(sizes) if s > 2500])
    nearbg = ndimage.binary_dilation(trans, iterations=9)
    hair = core & ~nearbg
    role[hair] = 1
    role[skin & (role == 0)] = 2
    if 'skin_top' in cfg:
        a, b = cfg['skin_top']; role[(role == 2) & (yy > a) & (yy < b)] = 3

    # 옷: 가장 가까운 기준색이 해당 role이고 y 범위 안이면 지정
    cands = []
    for rid, key in ((3, 'top'), (4, 'bottom')):
        if key in cfg:
            for c in cfg[key][0]: cands.append((rid, hx(c), cfg[key][1]))
    for c in cfg.get('keep', []): cands.append((0, hx(c), (0, 1)))
    cands.append((0, np.array([25., 20, 20]), (0, 1)))  # 외곽선
    cands.append((0, SKIN, (0, 1)))
    dists = np.stack([np.abs(crop - c).sum(2) for _, c, _ in cands])
    best = dists.argmin(0); bestd = dists.min(0)
    free = (~trans) & (role == 0)
    shoes = free & (yy > SHOE_Y.get(name, 0.925)) & (lum > 50) & (lum < 200)
    role[shoes] = 5
    free &= ~shoes
    for idx, (rid, c, (a, b)) in enumerate(cands):
        if rid == 0: continue
        m = free & (best == idx) & (bestd < 80) & (yy >= a) & (yy <= b)
        role[m] = rid

    base = {}
    for rid in range(1, 6):
        px = crop[role == rid]
        if len(px) > 200:
            l = px @ np.array([.299, .587, .114])
            base[rid] = '#%02x%02x%02x' % tuple(int(v) for v in np.median(px[l >= np.percentile(l, 40)], 0))
    # 절반 크기로 저장
    rgba = np.dstack([crop, np.where(trans, 0, 255)]).astype(np.uint8)
    w2, h2 = W // 2, H // 2
    Image.fromarray(rgba).resize((w2, h2), Image.LANCZOS).save(f'{OUT}/{name}.png', optimize=True)
    mk = np.dstack([role, role, role, np.full_like(role, 255)])
    Image.fromarray(mk).resize((w2, h2), Image.NEAREST).save(f'{OUT}/{name}-mask.png', optimize=True)
    meta[name] = dict(w=w2, h=h2, base=base)
    # 확인용 미리보기
    pal = np.array([[0, 0, 0], [40, 200, 255], [255, 150, 120], [80, 220, 80], [240, 220, 40], [200, 60, 220]])
    vis = crop.copy(); m = role > 0
    vis[m] = vis[m] * 0.3 + pal[role[m]] * 0.7
    vis[trans] = 255
    Image.fromarray(vis.astype(np.uint8)).resize((w2, h2)).save(f'preview_{name}.png')
json.dump(meta, open(f'{OUT}/meta.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(meta, ensure_ascii=False))
