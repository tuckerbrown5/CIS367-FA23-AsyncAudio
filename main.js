let currentTrackIndex = 0;
const tracks = [
    { title: "Fraggle", artist: "Levi Holland", src: "path-to-track.mp3", cover: "Fraggle.jpeg" },
    { title: "Aidan", artist: "Artist Name", src: "path-to-track.mp3", cover: "Aidan.jpg" },
    { title: "autumn_sun", artist: "Artist Name", src: "path-to-track.mp3", cover: "autumn_sun.png" },
    { title: "BestF", artist: "Artist Name", src: "path-to-track.mp3", cover: "BestF.jpg" },
    { title: "Better Days", artist: "Artist Name", src: "path-to-track.mp3", cover: "Better Days.jpg" },
    { title: "i_cant_make_you_love_me_co", artist: "Artist Name", src: "path-to-track.mp3", cover: "i_cant_make_you_love_me_co.jpg" },
    { title: "justRelax_img", artist: "Artist Name", src: "path-to-track.mp3", cover: "justRelax_img.jpeg" },
    { title: "mountain", artist: "Artist Name", src: "path-to-track.mp3", cover: "mountain.jpg" },
    { title: "paranormal_real_500", artist: "Artist Name", src: "path-to-track.mp3", cover: "paranormal_real_500.jpg" },
    { title: "perfect", artist: "Artist Name", src: "path-to-track.mp3", cover: "perfect.jpg" },
    { title: "Polarity", artist: "Artist Name", src: "path-to-track.mp3", cover: "Polarity.jpg" },
    { title: "Your_Shoulder_Album_Art", artist: "Artist Name", src: "path-to-track.mp3", cover: "Your_Shoulder_Album_Art.jpg" }
];



const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

playBtn.addEventListener('click', playPauseAudio);
prevBtn.addEventListener('click', prevAudio);
nextBtn.addEventListener('click', nextAudio);
audio.addEventListener('ended', nextAudio);  // Move to the next track when current ends

function loadTrack(index) {
    title.textContent = tracks[index].title;
    artist.textContent = tracks[index].artist;
    audio.src = tracks[index].src;
    cover.src = tracks[index].cover;
}

function playPauseAudio() {
    if (audio.paused) {
        audio.play();
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');
    } else {
        audio.pause();
        playBtn.querySelector('i.fas').classList.remove('fa-pause');
        playBtn.querySelector('i.fas').classList.add('fa-play');
    }
}

function prevAudio() {
    currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : tracks.length - 1;
    loadTrack(currentTrackIndex);
    playPauseAudio();  // Optionally auto-play the previous track
}

function nextAudio() {
    currentTrackIndex = (currentTrackIndex < tracks.length - 1) ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    playPauseAudio();  // Optionally auto-play the next track
}

// Initialize the audio player with the first track
loadTrack(currentTrackIndex);
