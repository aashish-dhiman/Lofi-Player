const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const wishlist = document.getElementById('like');
const volumeChange = document.getElementById('volume');
const mute_icon = document.getElementById('mute');
const volume_icon = document.getElementById('volume-icon');

//event listeners
playBtn.addEventListener('click', () => (isMusicPlaying ? pause() : play()));

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setSongDuration);

music.addEventListener('timeupdate', updateProgress);

document.addEventListener('keydown', keyFunction);

wishlist.addEventListener('click', like);

volumeChange.addEventListener('input', changeVolume);

volumeChange, addEventListener('wheel', mouseWheel);
volume_icon.addEventListener('click', mute);

mute_icon.addEventListener('click', mute);

//variables
var isMusicPlaying = false;
let musicIndex = 0;

//songs collection
const songs = [
    {
        name: 'lofi-1',
        displayName: 'Agar Tum Sath Ho ',
        artist: 'Arijit Singh x Alka Yagnik'

    },
    {
        name: 'lofi-2',
        displayName: 'Kesariya',
        artist: 'Arijit Singh'
    },
    {
        name: 'lofi-3',
        displayName: 'Maan Meri Jaan',
        artist: 'KING'
    },
    {
        name: 'lofi-4',
        displayName: 'No Love X Aaja We Mahiya',
        artist: 'Shubh ft AP Dhillon'
    },
    {
        name: 'lofi-5',
        displayName: 'Excuses',
        artist: 'AP Dhillon & Gurinder Gill'
    },
    {
        name: 'lofi-6',
        displayName: 'WOH',
        artist: 'Ikka x Dino James x Badshah'
    },
    {
        name: 'lofi-7',
        displayName: 'Study Lofi',
        artist: 'Various Artist'
    }
];

//functions

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
    progress.style.width = 0 + '%';
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
    progress.style.width = 0 + '%';

}

function increaseVolume() {
    if (music.volume < 1) {
        music.volume += 0.1;
        volumeChange.value = music.volume * 100;
        volumeChange.title = Math.round(music.volume * 100);
    }
    // console.log(music.volume);
}
function decreaseVolume() {
    if (music.volume > 0.01) {
        music.volume -= 0.1;
        volumeChange.value = music.volume * 100;
        volumeChange.title = Math.round(music.volume * 100);
    }
    // console.log(music.volume);
}

function forward() {
    music.currentTime += 10;
}

function backward() {
    music.currentTime -= 10;
}


function mute() {
    if (music.muted === true) {
        music.muted = false;
        mute_icon.style.display = 'none';
        volume_icon.style.display = 'inline';
        volumeChange.value = music.volume * 100;
        volumeChange.title = Math.round(music.volume * 100);

    }
    else {
        music.muted = true;
        mute_icon.style.display = 'inline';
        volume_icon.style.display = 'none';
        volumeChange.value = '0';
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
    // console.log(e);
    let width = this.clientWidth;
    // console.log('width',width);
    let offsetX = e.offsetX;
    // console.log('offsetX',offsetX);
    music.currentTime = (offsetX / width) * music.duration;
    progress.style.width = (music.currentTime / music.duration) * 100 + "%";
}

function changeVolume(e) {
    // console.log(e.currentTarget.value);
    music.volume = e.currentTarget.value / 100;
    volumeChange.title = e.currentTarget.value;
}

function mouseWheel(e) {
    // console.log(e);
    var delta = e.deltaY;

    if (delta < 0) {
        increaseVolume();
    }
    else {
        decreaseVolume();
    }
}

function like() {
    if (wishlist.style.color) {
        wishlist.style.removeProperty("color");
    }
    else {
        wishlist.style.color = 'rgb(236, 31, 31)';
    }
}





//keypress events section

function keyFunction(e) {
    //keyCodes- 32-spaceBar, 78- N, 80-P, 38-arrow up, 40- arrow down

    switch (e.keyCode) {
        case 32:
            if (isMusicPlaying)
                pause();
            else
                play();
            break;
        case 77:
            mute();
            break;
        case 78:
            nextSong();
            break;
        case 80:
            prevSong();
            break;
        case 38:
            increaseVolume();
            break;
        case 40:
            decreaseVolume();
            break;
        case 37:
            backward();
            break;
        case 39:
            forward();
            break;
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
