const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";
const resultsContainer = document.getElementById("results");

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
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(wiki => {
          if (wiki.extract) {
            const div = document.createElement("div");
            div.classList.add("result-item");
            div.innerHTML = `
              <h3><a href="${wiki.content_urls.desktop.page}" target="_blank">🌐 Wikipedia: ${wiki.title}</a></h3>
              <p>${wiki.extract}</p>`;
            resultsContainer.appendChild(div);
          } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
          }
        });
    }
  });
