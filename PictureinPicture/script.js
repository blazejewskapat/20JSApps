const videoElement = document.getElementById("video");
const startButton = document.getElementById("start-button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("Error: ", error);
  }
}

// On Load
startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  try {
    await selectMediaStream();
    await videoElement.requestPictureInPicture();
  } catch (error) {
    console.error("Error requesting Picture-in-Picture:", error);
  }
  startButton.disabled = false;
  videoElement.hidden = false;
});
