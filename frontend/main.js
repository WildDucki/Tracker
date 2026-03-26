const fetchBtn = document.getElementById("fetchBtn");
const profileDiv = document.getElementById("profile");
const matchesDiv = document.getElementById("matches");

fetchBtn.addEventListener("click", async () => {
  let tag = document.getElementById("playerTag").value.trim();
  if (!tag) return alert("Bitte Player Tag eingeben");
  
  tag = tag.replace("#", "%23");

  try {
    const res = await fetch(`/api?tag=${tag}`); // ruft dein Backend auf
    const data = await res.json();

    const profile = data.player;
    const battles = data.battles.items;

    profileDiv.innerHTML = `
      <h2>${profile.name} (${profile.tag})</h2>
      <p>Trophäen: ${profile.trophies} | Club: ${profile.club?.name || 'Kein Club'}</p>
    `;

    matchesDiv.innerHTML = "<h3>Letzte Matches:</h3>";
    battles.slice(0, 25).forEach(match => {
      const el = document.createElement("div");
      el.className = "match";
      el.innerHTML = `
        <div>
          <strong>${match.battle.mode} - ${match.battle.map}</strong><br>
          Brawler: ${match.battle.brawler.name} | Platzierung: ${match.battle.rank}
        </div>
        <div class="${match.battle.result === "victory" ? 'win' : 'lose'}">
          ${match.battle.result === "victory" ? "✅ Sieg" : "❌ Niederlage"}
        </div>
      `;
      matchesDiv.appendChild(el);
    });
  } catch (err) {
    console.error(err);
    alert("Fehler beim Laden der Daten.");
  }
});