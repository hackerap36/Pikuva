const input = document.getElementById("searchInput");
const micBtn = document.getElementById("micBtn");
const trendItems = document.getElementById("trendItems");
const chatInput = document.getElementById("chatInput");
const chatResponse = document.getElementById("chatResponse");

function search() {
  const query = input.value.trim();
  if (query) {
    window.location.href = `results.html?q=${encodeURIComponent(query)}`;
  }
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    search();
  }
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

const trending = ["Ajit", "BeatsLine", "ChatGPT", "Python", "Termux"];
trending.forEach(item => {
  const span = document.createElement("span");
  span.textContent = item;
  span.onclick = () => {
    input.value = item;
    search();
  };
  trendItems.appendChild(span);
});

function askChat() {
  const q = chatInput.value.trim().toLowerCase();
  let answer = "Sorry, I’m still learning...";
  if (q.includes("your name")) answer = "I am Pikuva!";
  else if (q.includes("ajit")) answer = "Ajit is my creator 💙";
  else if (q.includes("openai")) answer = "OpenAI created ChatGPT!";
  chatResponse.textContent = answer;
}
