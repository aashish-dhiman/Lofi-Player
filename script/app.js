const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

//event listeners
playBtn.addEventListener('click', () => (isMusicPlaying ? pause() : play()));

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setSongDuration);

music.addEventListener('timeupdate', updateProgress);

document.addEventListener('keydown', keyFunction);

//songs collection
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

var isMusicPlaying = false;

function play() {
    isMusicPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
function pause() {
    isMusicPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

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
    // console.log(musicIndex);
    loadSong(songs[musicIndex]);
    if (isMusicPlaying) {
        play();
    }
}

function nextSong() {
    musicIndex++;
    if (musicIndex == songs.length) {
        musicIndex = 0;
    }
    // console.log(musicIndex);
    loadSong(songs[musicIndex]);
    if (isMusicPlaying) {
        play();
    }
}

function updateProgress() {
    if (isMusicPlaying) {

        //duration update
        let duration_sec = music.duration;
        let sec = Math.floor(duration_sec);
        let min = Math.floor(sec / 60);
        let hr = Math.floor(min / 60);
        // console.log(hr);
        sec = Math.round(duration_sec % 60);
        min = min >= 10 ? min : '0' + min;
        sec = sec >= 10 ? sec : '0' + sec;
        hr = hr > 10 ? hr : '0' + hr;
        // console.log(music.duration);
        //to avoid NaN error
        if (duration_sec) {
            if (min < 60) {
                document.getElementById('duration').innerText = (min + ':' + sec);
            }
            else {
                min = Math.round(min % 60);
                min = min >= 10 ? min : '0' + min;
                document.getElementById('duration').innerText = (hr + ':' + min + ':' + sec);
            }
        }

        //current time update
        let current_sec = music.currentTime;
        let c_sec = Math.floor(current_sec);
        let c_min = Math.floor(current_sec / 60);
        let c_hr = Math.floor(c_min / 60);
        c_sec = c_sec % 60;
        c_min = c_min >= 10 ? c_min : '0' + c_min;
        c_sec = c_sec >= 10 ? c_sec : '0' + c_sec;

        if (c_min < 60) {
            document.getElementById('current-time').innerText = (c_min + ':' + c_sec);
        }
        else {
            c_min = Math.round(c_min % 60);
            c_min = c_min >= 10 ? c_min : '0' + c_min;
            document.getElementById('current-time').innerText = (c_hr + ':' + c_min + ':' + c_sec);
        }

        //setting the progress width
        let total_duration = music.duration;
        let value = (current_sec / total_duration) * 100;
        // console.log(value);
        progress.style.width = value + "%";
    }

}

function setSongDuration(e) {
    console.log(e);
    let width = this.clientWidth;
    // console.log('width',width);
    let offsetX = e.offsetX;
    // console.log('offsetX',offsetX);
    music.currentTime = (offsetX / width) * music.duration;
    play();
}

function keyFunction(e) {
    //keyCodes- 32-spaceBar, 78- N, 80-P

    switch (e.keyCode) {
        case 32:
            if (isMusicPlaying)
                pause();
            else
                play();
            break;
        case 78:
            nextSong();
            break;
        case 80:
            prevSong();
            break;
        default:
            console.log("Not valid key");
    }
}




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
