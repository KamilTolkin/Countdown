let interval = null;
let remainingSeconds = 0;

document.getElementById("control").addEventListener("click", () => {
  if (interval === null) {
    start();
  } else {
    stop();
  }
});

document.getElementById("reset").addEventListener("click", () => {
  const inputHours = parseInt(document.getElementById("inputhours").value);
  const inputMinutes = parseInt(document.getElementById("inputminutes").value);
  const inputSeconds = parseInt(document.getElementById("inputseconds").value);

  if (inputHours < 100) {
    stop();
    remainingSeconds = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
    updateInterfaceTime();
    document.getElementById("inputhours").value= ""
    document.getElementById("inputminutes").value= ""
    document.getElementById("inputseconds").value= ""
  }
});

function updateInterfaceTime() {
  let hours = 0;
  let minutes = 0;
  let seconds = 0
  if (remainingSeconds >= 3600) {
    hours = Math.floor(remainingSeconds / 3600);
    minutes = Math.floor((remainingSeconds % 3600)/60);
    seconds = remainingSeconds % 60
  } else{  minutes = Math.floor(remainingSeconds / 60);
        seconds = remainingSeconds % 60;}

  document.getElementById("hours").innerHTML = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");
}

function updateInterfaceControls() {
  if (interval === null) {
    document.querySelector(".timer__btn--control").innerHTML =
      '<span class="material-icons">play_arrow</span>';
    document.querySelector(".timer__btn--control").classList.add("timer__btn--start");
    document.querySelector(".timer__btn--control").classList.remove("timer__btn--stop");
  } else {
    document.querySelector(".timer__btn--control").innerHTML =
      '<span class="material-icons">pause</span>';
    document.querySelector(".timer__btn--control").classList.add("timer__btn--stop");
    document.querySelector(".timer__btn--control").classList.remove("timer__btn--start");
  }
}

function start() {
  if (remainingSeconds === 0) return;

  interval = setInterval(() => {
    remainingSeconds--;
    updateInterfaceTime();

    if (remainingSeconds === 0) {
      stop();
    }
  }, 1000);

  updateInterfaceControls();
}

function stop() {
  clearInterval(interval);

  interval = null;

  updateInterfaceControls();
}