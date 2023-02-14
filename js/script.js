"use strick"
const music = document.querySelector('audio'),
    prevBtn = document.querySelector('#prev'),
    playBtn = document.querySelector('#play'),
    nextBtn = document.querySelector('#next'),
    image = document.querySelector('img'),
    title = document.querySelector('#title'),
    artist = document.querySelector('#artist'),
    progressContainer = document.querySelector('#progress-container'),
    progress = document.querySelector('#progress'),
    currentTimeEl = document.querySelector('#current-time'),
    durationEl = document.querySelector('#duration')





// Music 
const songs = [
    {
        name: 'object1',
        displayName: 'Sauq bi lu ya | Nasheed',
        artist: 'Unknown'
    },
    {
        name: 'object2',
        displayName: 'La yaza al khayr | Nasheed',
        artist: 'Unknown'
    },
    {
        name: 'object3',
        displayName: 'Mavla ya qod | Nasheed',
        artist: 'Unknown'
    },
    {
        name: 'object4',
        displayName: 'Fi Qolbi | Nasheed',
        artist: 'Unknown'
    },
    {
        name: 'object5',
        displayName: 'Ummiy | Nasheed',
        artist: 'Unknown'
    },
    {
        name: 'object6',
        displayName: 'Unknown | Nasheed',
        artist: 'Unknown'
    },
]



// check if playong
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}


// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause Event listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//  Current Song
let songIndex = 0

// Prev song
function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// on load - Select first Song
loadSong(songs[songIndex])



// Update Progress Bar And Time

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;

        // Update progress bar with
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;


        console.log('minute: ', currentMinutes);
        console.log('seconds: ', currentSeconds);
    }
}

// SET PROGRESS BAR

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}



// Event listener 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)