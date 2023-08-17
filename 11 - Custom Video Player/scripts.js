const body = document.getElementsByTagName("body")[0];

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const toggleFullScreenBtn = player.querySelector(".full-screen");

// Pause Play
const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

const updateButton = () => {
  toggle.textContent = video.paused ? "►" : "❚❚";
};

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

// Skip Buttons
const skipVideo = (e) => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};
skipButtons.forEach((button) => {
  button.addEventListener("click", skipVideo);
});

// Ranges
const handleRanges = (e) => {
  video[e.target.name] = e.target.value;
};
ranges.forEach((range) => {
  range.addEventListener("change", handleRanges);
});

// Video Progress Bar
const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};
video.addEventListener("timeupdate", handleProgress);

// Scrub
const scrub = (e) => {
  const scrubTo = parseInt((e.offsetX / e.target.clientWidth) * video.duration);
  video.currentTime = scrubTo;
};
let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mouseout", () => (mouseDown = false));

// Full Screen Toggle
let isFullWidth = false;
const toggleFullScreen = () => {
  if (isFullWidth) {
    body.classList.remove("full-width");
    player.classList.remove("full-width");
  } else {
    body.classList.add("full-width");
    player.classList.add("full-width");
  }
  isFullWidth = !isFullWidth;
  //   player.classlist.add("full-width");
};
toggleFullScreenBtn.addEventListener("click", toggleFullScreen);
document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape") {
    body.classList.remove("full-width");
    player.classList.remove("full-width");
  }
});
