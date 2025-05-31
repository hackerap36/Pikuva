const input = document.getElementById("searchInput");
const micBtn = document.getElementById("micBtn");

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
