// Loads a JSON playlist and attaches it to a specific player container

function loadPlaylist(playlistUrl, playerContainerSelector) {
  const container = document.querySelector(playerContainerSelector);
  if (!container) return;

  const audio = container.querySelector("audio");
  const playButton = container.querySelector(".player-play-btn");
  const playIcon = playButton.querySelector(".player-icon-play");
  const pauseIcon = playButton.querySelector(".player-icon-pause");
  const trackMeta = container.querySelector(".player-track-meta p");

  let currentTrackElement = null;

  // Create a track list container
  const trackList = document.createElement("ul");
  trackList.classList.add("playlist");

  fetch(playlistUrl)
    .then((res) => res.json())
    .then((data) => {
      data.tracks.forEach((track) => {
        const li = document.createElement("li");

        const title = document.createElement("span");
        title.classList.add("track-title");
        title.textContent = track.title;

        const playBtn = document.createElement("button");
        playBtn.classList.add("play-btn");
        playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>play</title>
            <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
            <rect class="icon-container" width="24" height="24" />
          </svg>
        `;

        const togglePlayPause = () => {
          if (audio.src === track.url && !audio.paused) {
            audio.pause();
            playBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>play</title>
                <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
                <rect class="icon-container" width="24" height="24" />
              </svg>
            `;
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
          } else {
            if (currentTrackElement && currentTrackElement !== li) {
              currentTrackElement.querySelector(".play-btn").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <title>play</title>
                  <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
                  <rect class="icon-container" width="24" height="24" />
                </svg>
              `;
            }
            currentTrackElement = li;
            if (audio.src !== track.url) {
              audio.src = track.url;
              trackMeta.innerText = `${track.title}`;
            }
            audio.play();
            playBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>pause</title>
                <g>
                  <rect class="icon-pause" x="6" y="3.26" width="4" height="17.48" />
                  <rect class="icon-pause" x="14" y="3.26" width="4" height="17.48" />
                </g>
                <rect class="icon-container" width="24" height="24" />
              </svg>
            `;
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
          }
        };

        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          togglePlayPause();
        });

        li.appendChild(title);
        li.appendChild(playBtn);
        li.addEventListener("click", () => {
          if (audio.src === track.url && !audio.paused) {
            audio.pause();
            playBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>play</title>
                <polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" />
                <rect class="icon-container" width="24" height="24" />
              </svg>
            `;
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
          } else {
            togglePlayPause();
          }
        });

        trackList.appendChild(li);
      });
      container.appendChild(trackList);
    })
    .catch((err) => console.error(err));
}
