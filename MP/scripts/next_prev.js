const next = document.querySelector(".skip_next");
const prev = document.querySelector(".skip_previous");

function skipNext() {
  current_music++;
  console.log(current_music);
  if (current_music > music.length - 1) {
    current_music = 0;
  }
  renderMusic(music);
  isPaused = true;
  playPause();
}
function skipPrev() {
  current_music--;
  console.log(current_music);
  if (current_music < 0) {
    current_music = music.length - 1;
  }
  renderMusic(music);
  isPaused = true;
  playPause();
}

next.addEventListener("click", skipNext);
prev.addEventListener("click", skipPrev);
