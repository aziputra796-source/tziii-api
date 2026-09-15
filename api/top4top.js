export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "url kosong" });
  try {
    const r = await fetch(`https://ytdl-api.siputzx.my.id/api/mp3?url=${url}`);
    const j = await r.json();
    return res.status(200).json(j);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
                      }
