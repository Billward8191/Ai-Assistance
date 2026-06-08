const shareBtn = document.getElementById("shareBtn");
const statusDiv = document.getElementById("status");

console.log("script loaded");

shareBtn.addEventListener("click", () => {
    console.log("button clicked");
    statusDiv.innerHTML = "Button click detected";
});