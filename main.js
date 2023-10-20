const musicContainer = document.getElementById('music-container');
const body = document.querySelector('bigbody');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const nameArtist = document.getElementById('artist');

// Song titles
const songs = ['Aidan', 'Autumn_Sun', 'BestPart', 'BetterDays', 'Fraggle', 'i_cant_make_you_love_me', 'JustRelax', 'paranormal-is-real', 'perfect', 'Polarity', 'Your_Shoulder']
const artist = ['Addison Addcock', 'Bryce Green', 'Kaylee Odom', 'Priscilla Harris', 'Levi Holland', 'Bryce Green', 'Avery Harris', 'Wesley Baker', 'Austin Applegate', 'Abbie Vance', 'Kaitlyn Thompson']

const color1 = ['#3d5375', '#BA5333', '#5178b4', '#b45309', '#C9BEC8', '#D85B7B', '#75663e', '#DEE4EC', '#71797E', '#334007c']
const color2 = ['#151d29', '#411d12', '#1c4075', '#3f1d03', '#4b3e4a', '#571526', '#292416', '#3b4d66', '#282a2c', '#34007c']

let songIndex = 0;
let artistIndex = 0;

let firstColorIndex = 0;
let secondColorIndex = 0;

loadArtist(artist[artistIndex]);

// Initially load song details into DOM
loadSong(songs[songIndex]);

function setGradient(){
    musicContainer.style.background = "linear-gradient(to bottom," + color1[firstColorIndex] + "," + color2[secondColorIndex] + ")";
    CSS.textContent = musicContainer.style.background + ";";
}

function setBack(){
    bigbody.style.background = "linear-gradient(to bottom," + color1[firstColorIndex] + "," + color2[secondColorIndex] + ")";
    CSS.textContent = bigbody.style.background + ";";
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `albumart/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  setGradient();
  setBack();
  audio.play();
}

function loadArtist(artist){
    nameArtist.innerText = artist;
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;
  artistIndex--;
  firstColorIndex--;
  secondColorIndex--;


  if (songIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = artist.length - 1;
    firstColorIndex = color1.length - 1;
    secondColorIndex = color2.length - 1;
  }

  loadSong(songs[songIndex]);
  loadArtist(artist[artistIndex]);
  

  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  artistIndex++;
  firstColorIndex++;
  secondColorIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    artistIndex = 0;
    firstColorIndex = 0;
    secondColorIndex = 0;
  }

  loadSong(songs[songIndex]);
  loadArtist(artist[artistIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);