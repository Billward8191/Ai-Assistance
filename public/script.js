const statusDiv = document.getElementById("status");

statusDiv.innerHTML = `
Browser:<br>${navigator.userAgent}<br><br>
Secure Context:<br>${window.isSecureContext}<br><br>
Media Devices:<br>${!!navigator.mediaDevices}<br><br>
getDisplayMedia:<br>${!!(navigator.mediaDevices &&
navigator.mediaDevices.getDisplayMedia)}
`;