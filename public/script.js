const socket = io();

const shareBtn = document.getElementById("shareBtn");
const localVideo = document.getElementById("localVideo");
const statusDiv = document.getElementById("status");

shareBtn.addEventListener("click", startSharing);

const peer = new RTCPeerConnection();

peer.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit("ice-candidate", event.candidate);
  }
};

socket.on("answer", async (answer) => {
  await peer.setRemoteDescription(answer);
});

socket.on("ice-candidate", async (candidate) => {
  try {
    await peer.addIceCandidate(candidate);
  } catch (err) {
    console.error(err);
  }
});

async function startSharing() {

  try {

    const stream =
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });

    localVideo.srcObject = stream;

    stream.getTracks().forEach(track => {
      peer.addTrack(track, stream);
    });

    const offer = await peer.createOffer();

    await peer.setLocalDescription(offer);

    socket.emit("offer", offer);

    statusDiv.innerHTML = "Sharing screen";

  } catch (err) {

    statusDiv.innerHTML =
      "ERROR: " + err.name + " - " + err.message;
  }
}