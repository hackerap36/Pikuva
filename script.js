const input = document.getElementById("searchInput");
const micBtn = document.getElementById("micBtn");
const resultsContainer = document.getElementById("results");
const chatInput = document.getElementById("chatInput");
const chatResponse = document.getElementById("chatResponse");

// Mic Input
micBtn.onclick = () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();
  recognition.onresult = event => {
    input.value = event.results[0][0].transcript;
    search();
  };
};

// Trending
const trending = ["ChatGPT", "YouTube", "Python", "BeatsLine", "Termux"];
const trendItems = document.getElementById("trendItems");
trending.forEach(item => {
  const span = document.createElement("span");
  span.textContent = item;
  span.onclick = () => {
    input.value = item;
    search();
  };
  trendItems.appendChild(span);
});

// Main Search
function search() {
  const query = input.value.trim().toLowerCase();
  resultsContainer.innerHTML = "<p>Searching...</p>";

  fetch("results.json")
    .then(res => res.json())
    .then(data => {
      const matched = data.filter(item =>
        item.keywords.some(k => k.toLowerCase().includes(query))
      );
      if (matched.length > 0) {
        resultsContainer.innerHTML = "<h3>📁 Local Results</h3>";
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
      }

      // Wikipedia Fallback
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(wiki => {
          if (wiki.extract) {
            const div = document.createElement("div");
            div.classList.add("result-item");
            div.innerHTML = `
              <h3><a href="${wiki.content_urls.desktop.page}" target="_blank">🌐 Wikipedia: ${wiki.title}</a></h3>
              <p>${wiki.extract}</p>
            `;
            resultsContainer.appendChild(div);
          }
        });
    });
}

// Chatbot (simple)
function askChat() {
  const q = chatInput.value.trim().toLowerCase();
  let answer = "Sorry, I’m still learning...";
  if (q.includes("your name")) answer = "I am Pikuva – World’s smallest search engine!";
  else if (q.includes("ajit")) answer = "Ajit is my creator. 💙";
  else if (q.includes("openai")) answer = "OpenAI developed ChatGPT.";
  chatResponse.textContent = answer;
}
