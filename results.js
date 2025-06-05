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
        window.location.href = result.url;
      });
    } else {
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
