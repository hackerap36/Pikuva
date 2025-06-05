const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";
const resultsContainer = document.getElementById("results");

// 🔗 Check if it's a download query first
const downloadKeywords = ["download", "movie", "apk", "setup", "mp3", "software"];
const isDownloadQuery = downloadKeywords.some(kw => query.includes(kw));

if (isDownloadQuery) {
  resultsContainer.innerHTML = "<h3>🔗 External Download Results</h3>";
  const links = [
    { title: "Google Search", url: `https://www.google.com/search?q=${query}+download` },
    { title: "1337x Torrents", url: `https://1337x.to/search/${query}/1/` },
    { title: "MoviesFlix", url: `https://moviesflix.bio/?s=${query}` },
    { title: "APKPure", url: `https://apkpure.com/search?q=${query}` },
    { title: "Filehippo", url: `https://filehippo.com/search/?q=${query}` }
  ];

  links.forEach(link => {
    const div = document.createElement("div");
    div.classList.add("result-item");
    div.innerHTML = `<h3><a href="${link.url}" target="_blank">${link.title}</a></h3>`;
    resultsContainer.appendChild(div);
  });
} else {
  // 🔍 JSON local search
  fetch("results.json")
    .then(res => res.json())
    .then(data => {
      const matched = data.filter(item =>
        item.keywords.some(k => k.toLowerCase().includes(query))
      );

      if (matched.length > 0) {
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
          snippet.onclick = () => {
            const msg = new SpeechSynthesisUtterance(result.snippet);
            speechSynthesis.speak(msg);
          };

          div.appendChild(title);
          div.appendChild(snippet);
          resultsContainer.appendChild(div);
        });
      } else {
        // 🌐 Wikipedia fallback redirect
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(wiki => {
            if (wiki.content_urls && wiki.content_urls.desktop && wiki.content_urls.desktop.page) {
              window.location.href = wiki.content_urls.desktop.page;
            } else {
              resultsContainer.innerHTML = "<p>No results found.</p>";
            }
          });
      }
    });
}
