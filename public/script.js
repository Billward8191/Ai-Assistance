const shareBtn = document.getElementById("shareBtn");
const localVideo = document.getElementById("localVideo");
const statusDiv = document.getElementById("status");

shareBtn.addEventListener("click", startSharing);

async function startSharing() {

    statusDiv.innerHTML = "Attempting screen share...";

    try {

        console.log("mediaDevices:", navigator.mediaDevices);

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });

        console.log("Stream received:", stream);

        localVideo.srcObject = stream;

        statusDiv.innerHTML = "Screen sharing started!";

    } catch (err) {

        console.error(err);

        statusDiv.innerHTML =
            "ERROR: " + err.name + " - " + err.message;
    }
}