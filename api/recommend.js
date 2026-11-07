export default function handler(req, res) {
  const values = String(req.query.avatar || '').split(',').map(Number);
  const categories = ['성장', '사랑', '상상', '사유'];
  const bookCategories = ['성장', '사랑', '상상', '사유', '성장', '사랑', '상상', '사유'];
  const tags = values.map((n, i) => categories[(n + i) % 4]);
  const ids = bookCategories.map((category, i) => ({ id: i + 1, score: tags.filter(t => t === category).length })).sort((a, b) => b.score - a.score).map(x => x.id);
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(ids);
}
