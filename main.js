const fetchBtn = document.getElementById("fetchBtn");
const profileDiv = document.getElementById("profile");
const matchesDiv = document.getElementById("matches");

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI2ZDU5OWQ4LTQwNTktNGVjMS1iYjkwLWUzOTZhM2Y2NDYzNiIsImlhdCI6MTc3NDU1NzgyOCwic3ViIjoiZGV2ZWxvcGVyLzlkNjI1NmUwLWNhMDYtMTQyNy0xM2ZlLWQyNTBjN2Y1YmM0NCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTUuMjIzLjExMi41OCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.jZQ2etOuwrUOssl1uX3B5a3wonFsrX7QOs8earUcYCj_F4GPo01m2JnUN26YLN0JkOCzAkoJZjhEiRNEsY0uAA"; // Für später Backend nutzen
const API_URL = "https://api.brawlstars.com/v1";

fetchBtn.addEventListener("click", async () => {
  let tag = document.getElementById("playerTag").value.trim();
  if (!tag) return alert("Bitte Player Tag eingeben");
  tag = tag.replace("#","%23"); // URL encode

  try {
    // Player info
    const profileRes = await fetch(`${API_URL}/players/${tag}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const profile = await profileRes.json();

    profileDiv.innerHTML = `
      <h2>${profile.name} (${profile.tag})</h2>
      <p>Trophäen: ${profile.trophies} | Club: ${profile.club?.name || 'Kein Club'}</p>
    `;

    // Battle log
    const battleRes = await fetch(`${API_URL}/players/${tag}/battlelog`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const battles = await battleRes.json();

    matchesDiv.innerHTML = "<h3>Letzte Matches:</h3>";
    battles.items.slice(0, 25).forEach(match => {
      const matchEl = document.createElement("div");
      matchEl.classList.add("match");
      matchEl.innerHTML = `
        <strong>${match.battle.mode} - ${match.battle.map}</strong><br>
        Brawler: ${match.battle.brawler.name} | Platzierung: ${match.battle.rank} | Sieg: ${match.battle.result === "victory" ? "✅" : "❌"}
      `;
      matchesDiv.appendChild(matchEl);
    });

  } catch (err) {
    console.error(err);
    alert("Fehler beim Laden der Daten. API-Key prüfen oder Player Tag korrekt?");
  }
});