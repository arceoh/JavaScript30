const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const getVdieo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((error) => console.log(error));
};

const paintToCanvas = () => {
  width = video.videoWidth;
  height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height); // get pixel data
    // alter pixels
    // pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels); // alter pixels
    // ctx.globalAlpha = 0.2;

    pixels = bwEffect(pixels); // alter pixels

    ctx.putImageData(pixels, 0, 0); // add pixels back
  }, 60);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "Handsom");
  link.innerHTML = `<img src="${data}" alt="Handsom Man" />`;
  strip.insertBefore(link, strip.firstChild);
};

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //r
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //b
    pixels.data[i + 3] = pixels.data[i + 3]; //a
  }
  return pixels;
};

const bwEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const rgb = pixels.data[i + 0] + pixels.data[i + 1] + pixels.data[i + 2];
    const lum = 3;
    pixels.data[i + 0] = rgb / lum; //r
    pixels.data[i + 1] = rgb / lum; //g
    pixels.data[i + 2] = rgb / lum; //b
    pixels.data[i + 3] = pixels.data[i + 3]; //a
  }
  return pixels;
};

const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 550] = pixels.data[i + 0]; //r
    pixels.data[i + 300] = pixels.data[i + 1]; //g
    pixels.data[i + 900] = pixels.data[i + 2]; //b
    pixels.data[i + 3] = pixels.data[i + 3]; //a
  }
  return pixels;
};

getVdieo();
video.addEventListener("canplay", paintToCanvas);
