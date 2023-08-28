let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endtimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

const leadingZero = (time) => {
  return `${time < 10 ? "0" : ""}${time}`;
};
const twelveHourTime = (hours) => {
  return `${hours > 12 ? leadingZero(hours - 12) : hours}`;
};

const displayTimeLeft = (seconds) => {
  let secondsRemaning = seconds;
  const hours = Math.floor(seconds / 3600);
  secondsRemaning = seconds % 3600;

  const minutes = Math.floor(secondsRemaning / 60);
  secondsRemaning = seconds % 60;

  const display = `${hours > 0 ? hours + ":" : ""}${minutes}:${leadingZero(
    secondsRemaning
  )}`;
  timerDisplay.textContent = display;
  document.title = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const display = `Be back at ${twelveHourTime(hour)}:${leadingZero(minutes)}`;
  endtimeDisplay.textContent = display;
};

const timer = (seconds) => {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      displayTimeLeft(0);
      return;
    } else {
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) =>
    timer(parseInt(e.target.dataset.time))
  );
});

document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const seconds = parseInt(e.target.minutes.value) * 60;
  timer(seconds);
  e.target.reset();
});
