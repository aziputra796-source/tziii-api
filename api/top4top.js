export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const youtubeUrl = req.query.url;
  if (!youtubeUrl) return res.status(400).json({ error: "url kosong" });

  const id = youtubeUrl.split("v=")[1]?.split("&")[0] || youtubeUrl.split("youtu.be/")[1]?.split("?")[0];

  try {
    // LANGKAH 1: Ambil audio lewat Invidious (bypass blokir Vercel)
    const invRes = await fetch(`https://vid.puffyan.us/api/v1/videos/${id}`);
    const invJson = await invRes.json();
    const audioUrl = invJson.adaptiveFormats?.find(f => f.type.includes("audio"))?.url;
    const title = invJson.title;
    const thumb = invJson.videoThumbnails?.[0]?.url;

    if (!audioUrl) throw new Error("gagal ambil audio dari invidious");

    // LANGKAH 2: Download audionya jadi buffer
    const audioBufferRes = await fetch(audioUrl);
    const arrayBuffer = await audioBufferRes.arrayBuffer();

    // LANGKAH 3: Upload ke Top4Top biar jadi e.top4top.io
    const form = new FormData();
    form.append("file", new Blob([arrayBuffer]), `${id}.mp3`);

    const uploadRes = await fetch("https://top4top.io/index.php?do=upload", {
      method: "POST",
      body: form,
      headers: { "User-Agent": "tziii-bb" }
    });

    const uploadJson = await uploadRes.json().catch(async () => {
      const text = await uploadRes.text();
      // top4top kadang ngasih link di text html, kita cari manual
      const match = text.match(/https?:\/\/[a-z]\.top4top\.io\/m_[^\s"']+/);
      return { link: match?.[0] || null };
    });

    const top4topLink = uploadJson.link || uploadJson.url || uploadJson.file;

    return res.json({
      status: "success",
      title: title,
      url: top4topLink, // <-- INI YANG BAKAL JADI e.top4top.io
      link: top4topLink,
      thumbnail: thumb
    });

  } catch (e) {
    // FALLBACK: kalo upload top4top gagal (limit 4.5MB di Vercel), kasih direct link dulu
    return res.status(200).json({
      status: "fallback",
      title: "fallback audio",
      url: `https://vid.puffyan.us/latest_version?id=${id}&itag=140`,
      link: `https://vid.puffyan.us/latest_version?id=${id}&itag=140`,
      error: e.message,
      note: "upload top4top gagal, pake link direct dulu. Coba lagu yang durasinya < 3 menit biar kekejar upload top4top"
    });
  }
      }
