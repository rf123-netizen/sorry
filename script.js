/* =========================================================
   ❤️ BUSHRA APOLOGY WEBSITE
   Complete script.js
========================================================= */


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

const screens = [...document.querySelectorAll(".screen")];
const progressBar = document.getElementById("progressBar");

let currentScreen = 0;

function showScreen(index) {
  if (!screens.length) return;

  currentScreen = Math.max(
    0,
    Math.min(index, screens.length - 1)
  );

  screens.forEach((screen, i) => {
    screen.classList.toggle(
      "active",
      i === currentScreen
    );
  });

  if (progressBar) {
    const percentage =
      ((currentScreen + 1) / screens.length) * 100;

    progressBar.style.width = `${percentage}%`;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   NEXT BUTTONS
========================================================= */

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(currentScreen + 1);
  });
});


/* =========================================================
   BACK BUTTONS
========================================================= */

document.querySelectorAll("[data-prev]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(currentScreen - 1);
  });
});


/* =========================================================
   🎁 SURPRISE GIFT BOX
========================================================= */

const giftArea = document.getElementById("giftArea");
const giftBox = document.getElementById("giftBox");
const giftHint = document.getElementById("giftHint");

let giftOpened = false;

function openGift() {

  if (!giftArea || giftOpened) {
    return;
  }

  giftOpened = true;

  /*
    Open gift box
  */

  giftArea.classList.add("open");

  /*
    Change hint
  */

  if (giftHint) {
    giftHint.textContent =
      "♡ for you, Bushra ♡";
  }

  /*
    Create hearts
  */

  setTimeout(() => {
    createHearts(18);
  }, 600);

  /*
    Show toast
  */

  setTimeout(() => {
    showToast(
      "A little piece of my heart, just for you 🌻❤️"
    );
  }, 500);
}


/*
  Gift box click
*/

if (giftBox) {

  giftBox.addEventListener(
    "click",
    openGift
  );


  /*
    Keyboard support
  */

  giftBox.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openGift();
      }

    }
  );
}


/* =========================================================
   ❤️ HEART PUZZLE
========================================================= */

const heartButtons =
  document.querySelectorAll("[data-heart]");

const puzzleStatus =
  document.getElementById("puzzleStatus");


heartButtons.forEach(button => {

  button.addEventListener("click", () => {

    /*
      Correct heart
    */

    if (button.dataset.heart === "4") {

      heartButtons.forEach(item => {
        item.classList.remove("correct");
      });

      button.classList.add("correct");

      if (puzzleStatus) {
        puzzleStatus.textContent =
          "You found it! Maybe my heart was always with you. ❤️";
      }

      createHearts(18);

      showToast(
        "Correct! You found the heart ♡"
      );

    }

    /*
      Wrong heart
    */

    else {

      button.animate(
        [
          {
            transform: "translateX(-5px)"
          },
          {
            transform: "translateX(5px)"
          },
          {
            transform: "translateX(-3px)"
          },
          {
            transform: "translateX(0)"
          }
        ],
        {
          duration: 250
        }
      );

      if (puzzleStatus) {
        puzzleStatus.textContent =
          "Not this one… try again 🥺";
      }
    }

  });

});


/* =========================================================
   🎵 MUSIC PLAYLIST
========================================================= */


/*
===========================================================
   ADD MORE SONGS HERE
===========================================================

Example:

{
  title: "Your Song",
  artist: "Movie / Singer ♡",
  file: "music/your-song.mp3",
  emoji: "❤️"
}

Bas ye object songs ke andar add kar dena.
===========================================================
*/


const songs = [

  {
    title: "Tum Ho Toh",
    artist: "Saiyaara ♡",
    file: "music/tum-ho-toh.mp3",
    emoji: "🌻"
  },

  {
    title: "Satranga",
    artist: "Animal ♡",
    file: "music/Satranga.mp3",
    emoji: "❤️"
  },

  {
    title: "Hawayein",
    artist: "Jab Harry Met Sejal ♡",
    file: "music/Hawaein.mp3",
    emoji: "🌸"
  },

  {
    title: "Tujhe Kitna Chahne Lage",
    artist: "Kabir Singh ♡",
    file: "music/Tujhy kitna chahna Lage hn.mp3",
    emoji: "🥺"
  },

  {
    title: "Agar Tum Saath Ho",
    artist: "Tamasha ♡",
    file: "music/Agar tum sath ho.mp3",
    emoji: "💔"
  },

  {
    title: "Apna Bana Le",
    artist: "Bhediya ♡",
    file: "music/APNA bana le.mp3",
    emoji: "❤️"
  }

];


/* =========================================================
   MUSIC ELEMENTS
========================================================= */

const song =
  document.getElementById("song");

const playBtn =
  document.getElementById("playBtn");

const musicCard =
  document.getElementById("musicCard");

const progress =
  document.getElementById("progress");

const currentTimeText =
  document.getElementById("currentTime");

const durationText =
  document.getElementById("duration");

const songTitle =
  document.getElementById("songTitle");

const songArtist =
  document.getElementById("songArtist");

const albumFlower =
  document.getElementById("albumFlower");

const playlist =
  document.getElementById("playlist");

const songCount =
  document.getElementById("songCount");


let currentSongIndex = 0;


/* =========================================================
   CREATE PLAYLIST
========================================================= */

function createPlaylist() {

  if (!playlist) {
    return;
  }

  playlist.innerHTML = "";

  if (songCount) {

    songCount.textContent =
      `${songs.length} ${
        songs.length === 1
          ? "song"
          : "songs"
      }`;

  }


  songs.forEach((track, index) => {

    const item =
      document.createElement("button");

    item.type = "button";

    item.className =
      "playlist-item";

    item.dataset.index =
      index;


    item.innerHTML = `

      <span class="song-number">
        ${index + 1}
      </span>

      <span class="song-details">

        <strong>
          ${track.title}
        </strong>

        <small>
          ${track.artist}
        </small>

      </span>

      <span class="song-play-icon">
        ▶
      </span>

    `;


    item.addEventListener(
      "click",
      () => {

        /*
          Same song
        */

        if (
          index === currentSongIndex
        ) {

          if (
            song &&
            song.paused
          ) {

            playSong();

          } else {

            pauseSong();

          }

          return;
        }


        /*
          Different song
        */

        loadSong(index);

        playSong();

      }
    );


    playlist.appendChild(item);

  });

}


/* =========================================================
   LOAD SONG
========================================================= */

function loadSong(index) {

  if (
    !song ||
    !songs.length
  ) {
    return;
  }


  currentSongIndex = index;

  const track =
    songs[currentSongIndex];


  song.pause();

  song.src =
    track.file;


  if (songTitle) {
    songTitle.textContent =
      track.title;
  }


  if (songArtist) {
    songArtist.textContent =
      track.artist;
  }


  if (albumFlower) {
    albumFlower.textContent =
      track.emoji;
  }


  if (progress) {
    progress.value = 0;
  }


  if (currentTimeText) {
    currentTimeText.textContent =
      "0:00";
  }


  if (durationText) {
    durationText.textContent =
      "0:00";
  }


  if (musicCard) {
    musicCard.classList.remove(
      "playing"
    );
  }


  if (playBtn) {
    playBtn.textContent =
      "▶";
  }


  updateActiveSong();
}


/* =========================================================
   UPDATE ACTIVE SONG
========================================================= */

function updateActiveSong() {

  if (!playlist) {
    return;
  }


  const items =
    document.querySelectorAll(
      ".playlist-item"
    );


  items.forEach(
    (item, index) => {

      const icon =
        item.querySelector(
          ".song-play-icon"
        );


      item.classList.toggle(
        "active",
        index === currentSongIndex
      );


      if (!icon) {
        return;
      }


      if (
        index === currentSongIndex
      ) {

        icon.textContent =
          song &&
          !song.paused
            ? "❚❚"
            : "▶";

      } else {

        icon.textContent =
          "▶";

      }

    }
  );
}


/* =========================================================
   PLAY SONG
========================================================= */

async function playSong() {

  if (!song) {
    return;
  }


  try {

    await song.play();


    if (musicCard) {
      musicCard.classList.add(
        "playing"
      );
    }


    if (playBtn) {
      playBtn.textContent =
        "❚❚";
    }


    updateActiveSong();


  } catch (error) {

    console.error(
      "Audio error:",
      error
    );


    showToast(
      "Song file nahi mili. Music folder check karo 🎵"
    );

  }

}


/* =========================================================
   PAUSE SONG
========================================================= */

function pauseSong() {

  if (!song) {
    return;
  }


  song.pause();


  if (musicCard) {
    musicCard.classList.remove(
      "playing"
    );
  }


  if (playBtn) {
    playBtn.textContent =
      "▶";
  }


  updateActiveSong();
}


/* =========================================================
   MAIN PLAY BUTTON
========================================================= */

if (playBtn) {

  playBtn.addEventListener(
    "click",
    () => {

      if (!song) {
        return;
      }


      if (song.paused) {

        playSong();

      } else {

        pauseSong();

      }

    }
  );

}


/* =========================================================
   NEXT SONG
========================================================= */

function nextSong() {

  if (!songs.length) {
    return;
  }


  currentSongIndex++;


  if (
    currentSongIndex >=
    songs.length
  ) {

    currentSongIndex = 0;

  }


  loadSong(
    currentSongIndex
  );

  playSong();
}


/* =========================================================
   PREVIOUS SONG
========================================================= */

function previousSong() {

  if (!songs.length) {
    return;
  }


  currentSongIndex--;


  if (
    currentSongIndex < 0
  ) {

    currentSongIndex =
      songs.length - 1;

  }


  loadSong(
    currentSongIndex
  );

  playSong();
}


/* =========================================================
   SONG METADATA
========================================================= */

if (song) {

  song.addEventListener(
    "loadedmetadata",
    () => {

      if (durationText) {

        durationText.textContent =
          formatTime(
            song.duration
          );

      }

    }
  );

}


/* =========================================================
   SONG PROGRESS
========================================================= */

if (song) {

  song.addEventListener(
    "timeupdate",
    () => {

      if (
        !song.duration
      ) {
        return;
      }


      const percentage =
        (
          song.currentTime /
          song.duration
        ) * 100;


      if (progress) {
        progress.value =
          percentage;
      }


      if (currentTimeText) {

        currentTimeText.textContent =
          formatTime(
            song.currentTime
          );

      }

    }
  );

}


/* =========================================================
   SEEK SONG
========================================================= */

if (progress) {

  progress.addEventListener(
    "input",
    () => {

      if (
        !song ||
        !song.duration
      ) {
        return;
      }


      const time =
        (
          progress.value / 100
        ) *
        song.duration;


      song.currentTime =
        time;

    }
  );

}


/* =========================================================
   WHEN SONG ENDS
========================================================= */

if (song) {

  song.addEventListener(
    "ended",
    () => {

      nextSong();

    }
  );

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

  if (
    !isFinite(seconds)
  ) {
    return "0:00";
  }


  const minutes =
    Math.floor(
      seconds / 60
    );


  const remainingSeconds =
    Math.floor(
      seconds % 60
    )
    .toString()
    .padStart(
      2,
      "0"
    );


  return `${minutes}:${remainingSeconds}`;
}


/* =========================================================
   ⌨️ KEYBOARD MUSIC CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    const active =
      document.activeElement;


    /*
      Don't trigger while
      typing/clicking controls
    */

    if (
      active &&
      (
        active.tagName === "INPUT" ||
        active.tagName === "BUTTON"
      )
    ) {
      return;
    }


    if (
      event.key === "ArrowRight"
    ) {

      nextSong();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousSong();

    }


    if (
      event.code === "Space"
    ) {

      event.preventDefault();


      if (
        song &&
        song.paused
      ) {

        playSong();

      } else {

        pauseSong();

      }

    }

  }
);


/* =========================================================
   ❤️ FINAL FORGIVENESS
========================================================= */

const answer =
  document.getElementById(
    "answer"
  );

const yesBtn =
  document.getElementById(
    "yesBtn"
  );

const maybeBtn =
  document.getElementById(
    "maybeBtn"
  );


/*
  YES BUTTON
*/

if (yesBtn) {

  yesBtn.addEventListener(
    "click",
    () => {

      if (answer) {

        answer.textContent =
          "YAY 🥺❤️ Thank you, Bushra. I promise I will do better.";

      }


      createHearts(30);


      showToast(
        "Best. Answer. Ever. ❤️"
      );

    }
  );

}


/*
  STILL MAD BUTTON
*/

if (maybeBtn) {

  maybeBtn.addEventListener(
    "click",
    () => {

      if (answer) {

        answer.textContent =
          "I understand, my Bushra. 🥺 You have every right to be upset. Take your time… I'll be here, hoping that one day I can make it up to you. ❤️";

      }


      showToast(
        "I’m sorry, truly. Take your time. 🌻❤️"
      );

    }
  );

}


/* =========================================================
   🔄 RESTART
========================================================= */

const restart =
  document.getElementById(
    "restart"
  );


if (restart) {

  restart.addEventListener(
    "click",
    () => {

      /*
        Reset gift
      */

      giftOpened = false;


      if (giftArea) {

        giftArea.classList.remove(
          "open"
        );

      }


      if (giftHint) {

        giftHint.textContent =
          "Tap the box to open ♡";

      }


      /*
        Reset puzzle
      */

      heartButtons.forEach(
        button => {

          button.classList.remove(
            "correct"
          );

        }
      );


      if (puzzleStatus) {

        puzzleStatus.textContent =
          "There is a secret one hiding here…";

      }


      /*
        Reset answer
      */

      if (answer) {

        answer.textContent =
          "";

      }


      /*
        Stop music
      */

      if (song) {

        song.pause();

        song.currentTime = 0;

      }


      if (musicCard) {

        musicCard.classList.remove(
          "playing"
        );

      }


      if (playBtn) {

        playBtn.textContent =
          "▶";

      }


      if (progress) {

        progress.value = 0;

      }


      if (currentTimeText) {

        currentTimeText.textContent =
          "0:00";

      }


      /*
        Load first song
      */

      loadSong(0);


      /*
        Go to first screen
      */

      showScreen(0);

    }
  );

}


/* =========================================================
   🍞 TOAST
========================================================= */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2300
    );

}


/* =========================================================
   ❤️ FLOATING HEARTS
========================================================= */

function createHearts(
  count = 5
) {

  const holder =
    document.getElementById(
      "hearts"
    );


  if (!holder) {
    return;
  }


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "floating-heart";


    heart.textContent =
      Math.random() > 0.3
        ? "♡"
        : "♥";


    heart.style.left =
      `${Math.random() * 100}%`;


    heart.style.fontSize =
      `${12 + Math.random() * 18}px`;


    heart.style.animationDuration =
      `${4 + Math.random() * 4}s`;


    heart.style.animationDelay =
      `${Math.random() * 0.8}s`;


    holder.appendChild(
      heart
    );


    setTimeout(
      () => {
        heart.remove();
      },
      8500
    );

  }

}


/* =========================================================
   ❤️ AMBIENT HEARTS
========================================================= */

setInterval(
  () => {

    if (
      Math.random() > 0.35
    ) {

      createHearts(1);

    }

  },
  5000
);


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

createPlaylist();

loadSong(0);

showScreen(0);