document.addEventListener("DOMContentLoaded", () => {
  const players = document.querySelectorAll(".player");

  players.forEach((player) => {
    const audioElement = player.querySelector("audio");
    const audioCtx = new AudioContext();
    const track = audioCtx.createMediaElementSource(audioElement);
    const playButton = player.querySelector(".player-play-btn");
    const playIcon = playButton.querySelector(".player-icon-play");
    const pauseIcon = playButton.querySelector(".player-icon-pause");
    const progress = player.querySelector(".player-progress");
    const progressFilled = player.querySelector(".player-progress-filled");
    const playerCurrentTime = player.querySelector(".player-time-current");
    const playerDuration = player.querySelector(".player-time-duration");
    const volumeControl = player.querySelector(".player-volume");
    const trackMeta = player.querySelector(".player-track-meta p");

    let currentTrackElement = null;

    // Set times after page load
    setTimes();
    // Update progress bar and time values as audio plays
    audioElement.addEventListener("timeupdate", () => {
      progressUpdate();
      setTimes();
    });
    // Play button toggle
    playButton.addEventListener("click", () => {
      // check if context is in suspended state (autoplay policy)
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      // Play or pause track depending on state
      if (playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        if (!trackMeta.innerText) {
          trackMeta.innerText = "Playing...";
        }
        updateMediaSession(player.id);
        if (currentTrackElement) {
          currentTrackElement.querySelector(".play-btn").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <title>pause</title>
              <g>
                <rect class="icon-pause" x="6" y="3.26" width="4" height="17.48" />
                <rect class="icon-pause" x="14" y="3.26" width="4" height="17.48" />
              </g>
              <rect class="icon-container" width="24" height="24" />
            </svg>
          `;
        }
      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        if (currentTrackElement) {
          currentTrackElement.querySelector(".play-btn").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <title>play</title>
              <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
              <rect class="icon-container" width="24" height="24" />
            </svg>
          `;
        }
      }
    });
    // if the track ends, reset the player
    audioElement.addEventListener("ended", () => {
      playButton.dataset.playing = "false";
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
      progressFilled.style.flexBasis = "0%";
      audioElement.currentTime = 0;
      audioElement.duration = audioElement.duration;
      if (currentTrackElement) {
        currentTrackElement.querySelector(".play-btn").innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>play</title>
            <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
            <rect class="icon-container" width="24" height="24" />
          </svg>
        `;
      }
    });
    // Bridge the gap between gainNode and AudioContext so we can manipulate volume (gain)
    const gainNode = audioCtx.createGain();
    volumeControl.addEventListener("input", (event) => {
      gainNode.gain.value = event.target.value;
      event.target.style.setProperty(
        "--volume-level",
        `${event.target.value * 100}%`
      );
    });
    track.connect(gainNode).connect(audioCtx.destination);
    // Display currentTime and duration properties in real-time
    function setTimes() {
      if (!isNaN(audioElement.duration)) {
        playerCurrentTime.textContent = formatTime(audioElement.currentTime);
        playerDuration.textContent = formatTime(audioElement.duration);
      }
    }
    // Update player timeline progress visually
    function progressUpdate() {
      const percent = (audioElement.currentTime / audioElement.duration) * 100;
      progressFilled.style.flexBasis = `${percent}%`;
    }
    // Scrub player timeline to skip forward and back on click for easier UX
    let mousedown = false;
    function scrub(event) {
      const scrubTime =
        (event.offsetX / progress.offsetWidth) * audioElement.duration;
      audioElement.currentTime = scrubTime;
    }
    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));

    // Update Media Session API
    function updateMediaSession(playerId) {
      if ("mediaSession" in navigator) {
        const metadata = getMetadata(playerId);
        navigator.mediaSession.metadata = new MediaMetadata(metadata);

        navigator.mediaSession.setActionHandler("play", () => {
          audioElement.play();
          playButton.dataset.playing = "true";
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        });

        navigator.mediaSession.setActionHandler("pause", () => {
          audioElement.pause();
          playButton.dataset.playing = "false";
          pauseIcon.classList.add("hidden");
          playIcon.classList.remove("hidden");
        });

        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
          audioElement.currentTime = Math.max(
            audioElement.currentTime - (details.seekOffset || 10),
            0
          );
        });

        navigator.mediaSession.setActionHandler("seekforward", (details) => {
          audioElement.currentTime = Math.min(
            audioElement.currentTime + (details.seekOffset || 10),
            audioElement.duration
          );
        });

        navigator.mediaSession.setActionHandler("seekto", (details) => {
          if (details.fastSeek && "fastSeek" in audioElement) {
            audioElement.fastSeek(details.seekTime);
            return;
          }
          audioElement.currentTime = details.seekTime;
        });

        navigator.mediaSession.setActionHandler("stop", () => {
          audioElement.pause();
          audioElement.currentTime = 0;
          playButton.dataset.playing = "false";
          pauseIcon.classList.add("hidden");
          playIcon.classList.remove("hidden");
        });
      }
    }

    // Get metadata based on player ID
    function getMetadata(playerId) {
      const metadata = {
        "audiobook-eng": {
          title: "A Glimpse into the Religion of Islam Audiobook",
          artist: "AudioDeen",
          album: "A Glimpse into the Religion of Islam",
          artwork: [
            {
              src: "/assets/audio/cgnm/album0cover.jpeg",
              sizes: "500x500",
              type: "image/jpeg",
            },
          ],
        },
        "arabic-fatihah": {
          title: "The Opening Chapter of the Qur'ān (Arabic)",
          artist: "MTWS Audio",
          album: "Opening Chapter of the Qurān",
          artwork: [
            {
              src: "/assets/audio/quran/album-cover.jpeg",
              sizes: "500x500",
              type: "image/jpeg",
            },
          ],
        },
        // Add more metadata entries for other players here
      };
      return metadata[playerId] || {};
    }

    // Format time as MM:SS
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  });
});
