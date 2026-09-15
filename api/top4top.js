import ytdl from "@distube/ytdl-core";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "url kosong zip" });
  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    return res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      formats: formats.map(f => ({ quality: f.qualityLabel, ext: f.container, url: f.url })).slice(0,5),
      mp3: info.formats.filter(f=>f.hasAudio && !f.hasVideo).pop()?.url || null
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
        }
