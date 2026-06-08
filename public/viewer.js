const socket = io();

const remoteVideo = document.getElementById("remoteVideo");

const peer = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
});

peer.ontrack = (event) => {

  console.log("Track received");

  remoteVideo.srcObject = event.streams[0];

};

peer.onicecandidate = (event) => {

  if (event.candidate) {

    socket.emit("ice-candidate", event.candidate);

  }

};

socket.on("offer", async (offer) => {

  console.log("Offer received");

  await peer.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  socket.emit("answer", answer);

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