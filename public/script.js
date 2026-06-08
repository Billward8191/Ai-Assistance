const socket = io();

const shareBtn = document.getElementById("shareBtn");
const localVideo = document.getElementById("localVideo");
const statusDiv = document.getElementById("status");

shareBtn.addEventListener("click", startSharing);

const peer = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
});

peer.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit("ice-candidate", event.candidate);
  }
};

socket.on("answer", async (answer) => {

  console.log("Answer received");

  await peer.setRemoteDescription(
    new RTCSessionDescription(answer)
  );

});

socket.on("ice-candidate", async (candidate) => {

  try {

    await peer.addIceCandidate(
      new RTCIceCandidate(candidate)
    );

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

    console.log("Offer sent");

    socket.emit("offer", offer);

    statusDiv.innerHTML = "Sharing screen";

  } catch (err) {

    console.error(err);

    statusDiv.innerHTML =
      "ERROR: " + err.name + " - " + err.message;

  }

}