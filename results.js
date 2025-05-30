const params = new URLSearchParams(window.location.search);
const query = params.get("query")?.toLowerCase() || "";

fetch("results.json")
  .then(res => res.json())
  .then(data => {
    const matched = data.filter(item =>
      item.keywords.some(k => k.toLowerCase().includes(query))
    );

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (matched.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
      matched.forEach(result => {
        const a = document.createElement("a");
        a.href = result.url;
        a.textContent = result.title;
        a.target = "_blank";
        resultsContainer.appendChild(a);
      });
    }
  });
