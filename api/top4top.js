export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "url kosong" });

  const id = url.split("v=")[1]?.split("&")[0] || url.split("/").pop().split("?")[0];
  if (!id) return res.status(400).json({ error: "id youtube gak kebaca" });

  const invidious = [
    "https://vid.puffyan.us",
    "https://inv.nadeko.net",
    "https://yewtu.be",
    "https://inv.tux.pizza"
  ];

  for (const host of invidious) {
    try {
      const r = await fetch(`${host}/api/v1/videos/${id}`, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      if (!r.ok) continue;
      const j = await r.json();
      if (!j.formatStreams) continue;

      return res.json({
        title: j.title,
        thumbnail: j.videoThumbnails?.pop()?.url || j.thumbnailUrl,
        duration: j.lengthSeconds,
        author: j.author,
        formats: j.formatStreams.slice(0,6).map(f=>({ quality: f.qualityLabel, ext: "mp4", url: f.url })),
        mp3: j.adaptiveFormats?.filter(f=>f.type?.includes("audio"))[0]?.url || null,
        source: host
      });
    } catch(e){ continue; }
  }

  return res.status(500).json({ error: "Semua invidious down, coba lagi 1 menit" });
    }
