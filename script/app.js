const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');


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

music.addEventListener('timeupdate', () => {
    if (music_play) {

        //duration update
        let duration_sec = music.duration;
        let sec = Math.floor(duration_sec);
        let min = Math.floor(sec / 60);
        sec = Math.round(duration_sec % 60);
        min = min > 10 ? min : '0' + min;
        sec = sec > 10 ? sec : '0' + sec;
        // console.log(music.duration);
        document.getElementById('duration').innerText = (min + ':' + sec);

        //current time update
        let current_sec = music.currentTime;
        let c_sec = Math.floor(current_sec);
        let c_min = Math.floor(current_sec / 60);
        c_sec = c_sec % 60;
        c_min = c_min > 10 ? c_min : '0' + c_min;
        c_sec = c_sec > 10 ? c_sec : '0' + c_sec;
        document.getElementById('current-time').innerText = (c_min + ':' + c_sec);

        //setting the progress width
        let total_duration = music.duration;
        let value = (current_sec / total_duration) * 100;
        console.log(value);
        progress.style.width = value + "%";
    }

});

//aliter for setting up the duration ,current time and width


// music.addEventListener('timeupdate', () => {
//     //duration update
//     music.onloadedmetadata = () => {
//         let duration_sec = music.duration;
//         let sec = Math.floor(duration_sec);
//         let min = Math.floor(sec / 60);
//         sec = Math.round(duration_sec % 60);
//         min = min > 10 ? min : '0' + min;
//         sec = sec > 10 ? sec : '0' + sec;
//         // console.log(music.duration);
//         document.getElementById('duration').innerText = (min + ':' + sec);

//         //setting the progress width
//     let total_duration = music.currentTime;
//     let value = (total_duration / duration_sec) * 100;
//     console.log(value);
//     progress.style.width = value + "%";
//     }


//     //current time update
//     let current_sec = music.currentTime;
//     let c_sec = Math.floor(current_sec);
//     let c_min = Math.floor(current_sec / 60);
//     c_sec = c_sec % 60;
//     c_min = c_min > 10 ? c_min : '0' + c_min;
//     c_sec = c_sec > 10 ? c_sec : '0' + c_sec;
//     document.getElementById('current-time').innerText = (c_min + ':' + c_sec);

//      //setting the progress width
//      let total_duration = music.duration;
//      let value = (current_sec / total_duration) * 100;
//      console.log(value);
//      progress.style.width = value + "%";
// });
