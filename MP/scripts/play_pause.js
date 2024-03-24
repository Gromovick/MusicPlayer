const play = document.querySelector(".play_arrow");
const stop = document.querySelector(".pause");
let isPaused = true;

function playPause() {
  if (isPaused === false) {
    if (isDragging === false) {
      stop.classList.add("hidden");
      play.classList.remove("hidden");
    }
    player.pause();
    isPaused = true;
  } else {
    if (isDragging === false) {
      play.classList.add("hidden");
      stop.classList.remove("hidden");
    }
    isPaused = false;
    player.play();
  }
}

window.addEventListener("load", () => {
  isPaused = true;
  player.pause();
});
play.addEventListener("click", playPause);
stop.addEventListener("click", playPause);
