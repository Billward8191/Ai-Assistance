const shareBtn = document.getElementById("shareBtn");
const localVideo = document.getElementById("localVideo");
const statusDiv = document.getElementById("status");

shareBtn.addEventListener("click", startSharing);

async function startSharing() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    localVideo.srcObject = stream;

    statusDiv.innerHTML = "Screen sharing started!";
  } catch (err) {
    statusDiv.innerHTML =
      "ERROR: " + err.name + " - " + err.message;
  }
}