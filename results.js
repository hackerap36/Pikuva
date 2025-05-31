const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";
const resultsContainer = document.getElementById("results");

fetch("results.json")
  .then(res => res.json())
  .then(data => {
    const matched = data.filter(item =>
      item.keywords.some(k => k.toLowerCase().includes(query))
    );

    if (matched.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
      matched.forEach(result => {
        const div = document.createElement("div");
        div.classList.add("result-item");

        const title = document.createElement("h3");
        const link = document.createElement("a");
        const snippet = document.createElement("p");

        link.href = result.url;
        link.textContent = result.title;
        link.target = "_blank";
        title.appendChild(link);

        snippet.textContent = result.snippet;

        // 🔊 Voice playback
        snippet.onclick = () => {
          const msg = new SpeechSynthesisUtterance(result.snippet);
          speechSynthesis.speak(msg);
        };

        div.appendChild(title);
        div.appendChild(snippet);
        resultsContainer.appendChild(div);
      });
    }
  });
