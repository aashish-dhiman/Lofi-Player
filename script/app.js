const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');


playBtn.addEventListener('click', () => (music_play ? pause() : play()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

let music_play = false;

function play() {
    music_play = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
function pause() {
    music_play = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

const songs = [
    {
        name: 'lofi-1',
        displayName: 'Arijit Singh Lofi',
        artist: 'Arijit-Singh'

    },
    {
        name: 'lofi-2',
        displayName: 'Love Lofi',
        artist: 'Various-Artist'
    },
    {
        name: 'lofi-3',
        displayName: 'Study Lofi',
        artist: 'Mix-Artist'
    }
];


function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = './audio/' + song.name + '.mp3';
}

let musicIndex = 0;

function prevSong() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = songs.length - 1;
    }
    console.log(musicIndex);
    loadSong(songs[musicIndex]);
    if (music_play == true) {
        play();
    }
}
function nextSong() {
    musicIndex++;
    if (musicIndex == songs.length) {
        musicIndex = 0;
    }
    console.log(musicIndex);
    loadSong(songs[musicIndex]);
    if (music_play == true) {
        play();
    }
}

