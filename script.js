function search() {
    const query = document.getElementById("searchBox").value.trim();
    if (query) {
        window.location.href = `results.html?query=${encodeURIComponent(query)}`;
    }
}

document.getElementById("searchBox").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        search();
    }
});
