// backend/api.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: 'Kein Player Tag' });

  const API_KEY = process.env.BRAWLSTARS_KEY; // Setze Key in Vercel Environment

  try {
    const playerRes = await fetch(`https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const player = await playerRes.json();

    const battlesRes = await fetch(`https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}/battlelog`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const battles = await battlesRes.json();

    res.status(200).json({ player, battles });
  } catch (err) {
    res.status(500).json({ error: 'API Fehler', details: err.message });
  }
}
