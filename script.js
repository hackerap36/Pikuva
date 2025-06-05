document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const micBtn = document.getElementById("micBtn");
  const trendItems = document.getElementById("trendItems");
  const chatInput = document.getElementById("chatInput");
  const chatResponse = document.getElementById("chatResponse");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") search();
  });

  micBtn.onclick = () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = event => {
      input.value = event.results[0][0].transcript;
      search();
    };
  };

  const trending = ["ChatGPT", "Python", "YouTube", "AI Tools", "Linux", "BeatsLine"];
  trending.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    span.onclick = () => {
      input.value = item;
      search();
    };
    trendItems.appendChild(span);
  });

  window.search = function () {
    const query = input.value.trim();
    if (query) {
      window.location.href = `results.html?q=${encodeURIComponent(query)}`;
    }
  };

  window.askChat = function () {
    const q = chatInput.value.trim().toLowerCase();
    let answer = "Sorry, I’m still learning...";
    if (q.includes("your name")) answer = "I am Pikuva, your smart search assistant!";
    else if (q.includes("ajit")) answer = "Ajit is my creator 🔥";
    else if (q.includes("openai")) answer = "OpenAI builds AI tools like ChatGPT.";
    chatResponse.textContent = answer;
  };
});
