const socket = io();

const remoteVideo = document.getElementById("remoteVideo");

const peer = new RTCPeerConnection();

peer.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

peer.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit("ice-candidate", event.candidate);
  }
};

socket.on("offer", async (offer) => {
  await peer.setRemoteDescription(offer);

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  socket.emit("answer", answer);
});

socket.on("ice-candidate", async (candidate) => {
  try {
    await peer.addIceCandidate(candidate);
  } catch (err) {
    console.error(err);
  }
});