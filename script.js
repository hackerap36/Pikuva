const input = document.getElementById("searchInput");
const micBtn = document.getElementById("micBtn");
const loader = document.getElementById("loader");
const resultsContainer = document.getElementById("results");
const chatInput = document.getElementById("chatInput");
const chatResponse = document.getElementById("chatResponse");

// 🔄 Dark mode toggle
const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

// 🎙 Mic Input
if (micBtn) {
  micBtn.onclick = () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = event => {
      input.value = event.results[0][0].transcript;
      search();
    };
  };
}

// 🔍 Search function
function search() {
  const query = input.value.trim().toLowerCase();
  if (!query) return;
  loader.style.display = "block";
  fetch("results.json")
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      resultsContainer.innerHTML = "";
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

          // 🔊 Text-to-speech on click
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
}

// 📈 Trending Search
const trending = ["ChatGPT", "Python", "BeatsLine", "Ajit", "Termux", "YouTube"];
const trendContainer = document.getElementById("trendItems");
if (trendContainer) {
  trending.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    span.onclick = () => {
      input.value = item;
      search();
    };
    trendContainer.appendChild(span);
  });
}

// 🤖 Chatbot (Dummy Logic)
function askChat() {
  const q = chatInput.value.trim().toLowerCase();
  if (!q) return;
  let answer = "Sorry, I’m still learning...";
  if (q.includes("your name")) answer = "I am Pikuva Ultra 🤖";
  else if (q.includes("ajit")) answer = "Ajit is my creator and master 🔥";
  else if (q.includes("openai")) answer = "OpenAI builds ChatGPT and smart AIs.";
  chatResponse.textContent = answer;
}
