// api/top4top.js
// Vercel Serverless Function (ESM)
// Endpoint: GET /api/top4top?url=YOUTUBE_URL

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  const youtubeUrl = req.query?.url;

  if (!youtubeUrl || typeof youtubeUrl !== "string") {
    return res.status(400).json({
      error: "Parameter ?url= wajib diisi."
    });
  }

  try {
    const yupraUrl =
      `https://api.yupra.my.id/api/downloader/ytmp3?url=${encodeURIComponent(youtubeUrl)}`;

    const response = await fetch(yupraUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Vercel-Top4Top-API/1.0"
      }
    });

    if (!response.ok) {
      return res.status(502).json({
        error: "Yupra API gagal merespons.",
        status: response.status
      });
    }

    const json = await response.json();

    // Sesuai format Yupra:
    // data.data.url -> https://e.top4top.io/xxx.mp3
    const data = json?.data;

    if (!data?.url) {
      return res.status(502).json({
        error: "URL Top4Top tidak ditemukan pada response Yupra."
      });
    }

    const top4topUrl = data.url;

    const title =
      data.title ??
      data.name ??
      json?.title ??
      "";

    const thumbnail =
      data.thumbnail ??
      data.thumb ??
      data.image ??
      json?.thumbnail ??
      "";

    return res.status(200).json({
      title,
      url: top4topUrl,
      thumbnail
    });
  } catch (error) {
    console.error("Top4Top API error:", error);

    return res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data."
    });
  }
      }
