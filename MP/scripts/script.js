const player = document.querySelector(".music");
const full_time = document.querySelector(".full-time");
const dot = document.querySelector(".dot");
const seekBar = document.querySelector(".slider");
const slider_line = document.querySelector(".slider-line");
let isDragging = false;
let current_music = 0;

seekBar.addEventListener("mousedown", (e) => {
  startDragging();
  setDotPos(e);
});
document.addEventListener("mousemove", drag);
// seekBar.addEventListener("click", setDotPos);
seekBar.addEventListener("mouseup", stopDragging);

function startDragging() {
  isDragging = true;
  isPaused = false;
  playPause();
}

function setDotPos(e) {
  const rect = seekBar.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;

  const percent = offsetX / rect.width; //70/300=0.23

  const newTime = percent * player.duration;

  player.currentTime = newTime;
  updateDotPosition(offsetX);
}

function drag(e) {
  if (isDragging) {
    const rect = seekBar.getBoundingClientRect();
    let offsetX = 0;
    if (e.clientX < rect.left) {
      offsetX = 0;
    } else if (e.clientX > rect.left + rect.width) {
      offsetX = rect.width;
    } else {
      offsetX = e.clientX - rect.left;
    }

    const percent = offsetX / rect.width;

    const newTime = percent * player.duration;

    player.currentTime = newTime;
    updateDotPosition(offsetX);
  }
}

function stopDragging() {
  isDragging = false;
  isPaused = true;
  playPause();
}

function updateDotPosition(offsetX) {
  dot.style.left = `${offsetX}px`;
  slider_line.style.width = `${offsetX}px`;
}

window.addEventListener("load", () => {
  renderMusic(music);
  player.addEventListener("loadedmetadata", () => {
    let full_minutes = Math.floor(player.duration / 60);
    let full_seconds = Math.floor(player.duration % 60);
    full_seconds = full_seconds.toString().padStart(2, "0");
    full_time.innerText = `${full_minutes}:${full_seconds}`;
    console.log(player.duration);
    player.addEventListener("timeupdate", () => {
      const cur_time = document.querySelector(".curent-time");
      let cur_minutes = Math.floor(player.currentTime / 60);
      let cur_seconds = Math.floor(player.currentTime % 60);
      cur_seconds = cur_seconds.toString().padStart(2, "0");
      cur_time.innerText = `${cur_minutes}:${cur_seconds}`;

      if (player.currentTime >= player.duration && isDragging === false) {
        if (current_music > music.length - 1) {
          current_music = 0;
        } else {
          current_music++;
        }
        renderMusic(music);
        player.play();
      }

      const percentPlayed = player.currentTime / player.duration;
      const rect = seekBar.getBoundingClientRect();
      const dotPosition = percentPlayed * rect.width;
      updateDotPosition(dotPosition);
    });
  });
});

function renderMusic(music_list) {
  player.src = music_list[current_music].src;
  const title = document.querySelector(".title");
  const singer = document.querySelector(".singer");
  const img = document.querySelector(".img");
  title.innerText = music_list[current_music].name;
  singer.innerText = music_list[current_music].singer;
  img.src = music_list[current_music].img;
}
