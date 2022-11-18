//// Variables --------------->>>

// import classes
const player = new Player();
const message = new Message();
const favorites = new Favorites();
const playlist = new Playlist();
const setThemes = new SetThemes();


// access to the audio
const audio = document.querySelector('#audio');
// access to the DOM Elements
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const timeLine = document.querySelector('#timeline');
const timlineFill = document.querySelector('#timeline-fill');
const prevBtn = document.querySelector('.prev');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('.next');
const repeatBtn = document.querySelector('.repeat-song');
const randomBtn = document.querySelector('.random-song');
const addFavoritsBtn = document.querySelector('.add-favorits');
const quickMenuBtn = document.querySelector('#quick-menu-btn');
const downloadBtn = document.querySelector('#download');
// access to quick menu childes
const myFavoritesListBtn = document.querySelector('#openFavoritesList');
// access to the quick menu
const menu = document.querySelector('#quick-menu');

// access to favorites list
const favoritesList = document.querySelector('#favorites-list');
const favoritesListCloseBtn = document.querySelector('#favorites-list .close');

// access to the volume button
const volumeBtn = document.querySelector('#volume-btn');
//access to the bg-blur in volume box
const bgVolumeBox = document.querySelector('#volume-bg');
// access to the volume box
const volumeBox = document.getElementById('volume-box');

// access to the playlist
const palylist = document.querySelector('#playlist');
const palylistOpenBtn = document.querySelector('#playlist-btn');
const palylistCloseBtn = document.querySelector('#playlist .back');
const miniPlayerBody = document.querySelector('.mini-player-body');

// access to the mini player control buttons
const miniPlayerNextBtn = document.querySelector('.mini-player .controls .next-song');
const miniPlayerPrevBtn = document.querySelector('.mini-player .controls .perv-song');
const miniPlayerPlayAndPauseBtn = document.querySelector('.mini-player .controls .play-pause-btn');


// access to the loading
const loading = document.querySelector('#loading');


// loading and set songs data in player and playlist
firstLoadData();


// run sliders
setTimeout(() => {
    // active time line
    timelineSlider();
    // active volume slider
    volumeSlider();
    // set timeline first value
    timeLine.value = 0;
    // set player theme
    setPlayerTheme();
}, 50);


//// EventListeners ------------------>>>
eventListeners();
function eventListeners(){
    // hide loading 
    window.addEventListener('load', () => {
        loading.classList.add('hide');
    })

    // play and pause music
    playPauseBtn.addEventListener('click' , playAndPause);
    miniPlayerPlayAndPauseBtn.addEventListener('click' , playAndPause);
    

    // go next song
    nextBtn.addEventListener('click', goNextSong);
    miniPlayerNextBtn.addEventListener('click', goNextSong);

    // go prev song
    prevBtn.addEventListener('click', goPrevSong);
    miniPlayerPrevBtn.addEventListener('click', goPrevSong);

    // audio time update
    audio.addEventListener('timeupdate', audioTimeUpdate);


    // active and deactive random song
    randomBtn.addEventListener('click', randomSong);
    
    // active and deactive repeat song
    repeatBtn.addEventListener('click', repeatSong);

    // add to favorits
    addFavoritsBtn.addEventListener('click', addToFavorites);

    // open quick menu
    quickMenuBtn.addEventListener('click', quickMenuOpener);
    
    // close quick menu
    document.querySelector('#quick-menu').addEventListener('click', quickMenuCloser)

    // open favorites list
    myFavoritesListBtn.addEventListener('click', openMyFavoritesList);

    // close favorites list
    favoritesListCloseBtn.addEventListener('click', () => favoritesList.classList.remove('active'));

    // close quick menu after click on download button
    downloadBtn.addEventListener('click', () => {
        // access to the quick menu
        const menu = document.querySelector('#quick-menu');
        // add and remove active class to menu
        menu.classList.remove('active');
        quickMenuBtn.classList.remove('active');
    })

    // open volume box
    volumeBtn.addEventListener('click', openVolumeBox);

    // close volume box
    bgVolumeBox.addEventListener('click', () => volumeBox.classList.remove('active'));

    // open playlist
    palylistOpenBtn.addEventListener('click', () =>{
        // access to the quick menu
        const quickMenu = document.querySelector('#quick-menu');
        // access to the quick menu button
        const quickMenuBtn = document.querySelector('#quick-menu-btn');
        if(quickMenu.classList.contains('active')){
            quickMenu.classList.remove('active');
            quickMenuBtn.classList.remove('active');
        }
        palylist.classList.add('active');
    });
    
    // close playlist with back button
    palylistCloseBtn.addEventListener('click', () => palylist.classList.remove('active'));
    // close playlist with mini player body
    miniPlayerBody.addEventListener('click', () => palylist.classList.remove('active'));
}   






//// Functions --------------->>>

// loading and set songs data in player and playlist
function firstLoadData(){
    // cheacking localstorage
    const songsExist = localStorage.getItem('songsData');
    
    // if songs not exist
    if(songsExist == null ){
        // send request to api
        fetch('./data.json').then((response) => {
            response.json().then((finallyR) => {
                setData(finallyR);
            });
        }).catch((err) => {
            console.log(err);
        });
    }else{
        // set first song data in player 
        player.changeSong(0, 'pause');
        // created playlist
        playlist.createdPlaylist();
    }

        // set data to LS and run first song
        function setData(data){
            // set songs to the local storage
            localStorage.setItem('songsData', JSON.stringify(data));
            // set first song data in player 
            player.changeSong(0, 'pause');
            // created playlist
            playlist.createdPlaylist();
        }
    
}


function audioTimeUpdate(){
    // set current time to DOM
    currentTimeElement.textContent = player.changeFormat(audio.currentTime);

    // set timeline fill width
    timlineFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    // set timeline thumb position
    timeLine.value = (audio.currentTime / audio.duration) * 100;
    // set value in DOM
    timeLine.setAttribute('value', timeLine.value);
    

    // if music ended go to next music
    if(audio.ended){
        // chacking repeat is enable
        if(audio.getAttribute('repeat') === 'true'){
            // repeat current song
            audio.play();
        }else{
            // // chacking random is enable
            if(audio.getAttribute('random')){
                player.playRandom();
             }else{
                goNextSong();
            }
        }
    }
}

// Go next song
function goNextSong(){
    const songId = document.querySelector('#player').getAttribute('song-id');
    player.goNextSong(Number(songId));
}

// Go prev song
function goPrevSong(){
    const songId = document.querySelector('#player').getAttribute('song-id');
    player.goPrevSong(Number(songId));
}

// play and pause music
function playAndPause(){
    // access to the song id
    const songId = document.querySelector('#player').getAttribute('song-id');
    // checking now play
    if(playPauseBtn.classList.contains('play')){
        audio.play();
        //  remove play class
        playPauseBtn.classList.remove('play');
        miniPlayerPlayAndPauseBtn.classList.remove('play');
        // change button image
        playPauseBtn.firstElementChild.classList = 'fa-solid fa-pause';
        miniPlayerPlayAndPauseBtn.firstElementChild.classList = 'fa-solid fa-pause';
        // set play now song in playlist
        playlist.setNowPlaySong(songId, 'play');
    }else{
        audio.pause();
        //  remove play class
        playPauseBtn.classList.add('play');
        miniPlayerPlayAndPauseBtn.classList.add('play');
        // change button image
        playPauseBtn.firstElementChild.classList = 'fa-solid fa-play';
        miniPlayerPlayAndPauseBtn.firstElementChild.classList = 'fa-solid fa-play';
        // set play now song in playlist
        playlist.setNowPlaySong(songId, 'pause');
    }
}


// created random heart after like song
function createdRandomHearts(){
    
    // created hearts box
    const heartsBox = document.createElement('div');
    heartsBox.classList = 'heart-box';
    // append heartbox to add to favorits btn
    addFavoritsBtn.appendChild(heartsBox);

    
    // created 10 heart and append to heart box after .1s
    const addHeart = setInterval(() => {
        // created single heart
        const heart = document.createElement('i');
        heart.classList = 'heart fa-solid fa-heart';
        heartsBox.appendChild(heart);
        // access to random position
        const position = randomPos();
        // set random positions to html
        heart.setAttribute('x', position[0]);
        heart.setAttribute('y', position[1]);
    }, 10);


    // created heart stoped
    setTimeout(() => {
        // stop create
        clearInterval(addHeart);
        // move hearts in display
        changePosition();
    }, 150);

    // change position
    function changePosition(){
        // access to all hearts
        const allHearts = document.querySelectorAll('.heart-box .heart');

        // each in hearts
        allHearts.forEach(element => {
            // move hearts after (random time)
            setTimeout(() => {
                // move
                move(element);
            }, player.createdRandomNum(150, 500));
        });

        // move hearts
        function move(element){
            // add up class to heart
            element.classList.add('up');
            // change heart position ----- with random Scale
            element.style.transform = `translate(${element.getAttribute('x')}px, ${element.getAttribute('y') }px) scale(${player.createdRandomNum(1.5, 2.8)})`;

            // hide heart after (Random time)
            setTimeout(() => {
                // add hide class to heart
                element.classList.add('hide');
            }, player.createdRandomNum(500, 450));
        }
    }

    // created ranom position
    function randomPos(){
        const x = player.createdRandomNum(-60,60);
        const y = player.createdRandomNum(-90,-210);
        const pos = [x,y];
        return pos;
    }

    setTimeout(() => {
        heartsBox.remove();
    }, 2000);
    
}

// add to favorites
function addToFavorites(){
    // access to player tag
    const mainPlayerTag = document.querySelector('#player');
    // access to songId
    const songId = mainPlayerTag.getAttribute('song-id');
    // access to the favorits
    if(mainPlayerTag.getAttribute('favorits') === "false"){
        addFavoritsBtn.firstElementChild.classList = 'fa-solid fa-heart';
        mainPlayerTag.setAttribute('favorits', 'true');
        // created heartes
        createdRandomHearts();
        // add song to favorites
        favorites.addToFavorites(songId);
    }else{
        addFavoritsBtn.firstElementChild.classList = 'fa-light fa-heart';
        mainPlayerTag.setAttribute('favorits', 'false');
        // remove song from favorites
        favorites.removeFromFavorites(songId);
    }
}


// active and deactive random song
function randomSong(){
    // access to the random value
    const randomValue = audio.getAttribute('random');

    // active random
    if(randomValue === 'false'){
        audio.setAttribute('random', 'true');
        randomBtn.classList.add('active');
        message.showMessage('Random music playback Enabled');
    }else{
        audio.setAttribute('random', 'false');
        randomBtn.classList.remove('active')
        message.showMessage('Random music playback Disabled');
    }
}



// active and deactive repeat song
function repeatSong(){
    // access to the repeat value
    const repeatValue = audio.getAttribute('repeat');

    // active repeat
    if(repeatValue === 'false'){
        audio.setAttribute('repeat', 'true');
        repeatBtn.classList.add('active');
        message.showMessage('Repeat this music Enabled');
    }else{
        audio.setAttribute('repeat', 'false');
        repeatBtn.classList.remove('active')
        message.showMessage('Repeat this music Disabled');
    }
}

// open and close quick menu
function quickMenuOpener(){
    // access to the quick menu
    const menu = document.querySelector('#quick-menu');

    // add and remove active class to menu
    menu.classList.toggle('active');
    quickMenuBtn.classList.toggle('active');
}

// quick menu closer
function quickMenuCloser(clickEvent){
    if(clickEvent.target.classList.contains('quick-bg')){
        // access to the quick menu
        const menu = document.querySelector('#quick-menu');

        // add and remove active class to menu
        menu.classList.toggle('active');
        quickMenuBtn.classList.toggle('active');
    }
}


// open my favorites list
function openMyFavoritesList(){
    // access to the quick menu
    const menu = document.querySelector('#quick-menu');
    // add and remove active class to menu
    menu.classList.remove('active');
    quickMenuBtn.classList.remove('active');
    favoritesList.classList.add('active');
}

// open volume box
function openVolumeBox(){
    // add active class to the volume box
    volumeBox.classList.add('active');
    // remove active class to menu
    menu.classList.remove('active');
    quickMenuBtn.classList.remove('active');
}


// set player color theme
function setPlayerTheme(){

    ///// after load window --------------> auto set color theme
    // access to the loaclstorage current theme
    const currentThemeFromLocalStorage = localStorage.getItem('currentTheme');

    // if current Theme From LocalStorage is NULL ---> SET default theme
    if(currentThemeFromLocalStorage == null || currentThemeFromLocalStorage == 'system'){
        // set system theme
        setThemes.systemTheme();
    }else if(currentThemeFromLocalStorage == 'dark'){
        // set dark theme
        setThemes.darkTheme();
    }else if(currentThemeFromLocalStorage == 'light'){
        // set light theme
        setThemes.lightTheme();
    }
    

    ///// with buttons  -----------> manual set color theme
    // access to the dark mode button
    const switchThemeBtn = document.querySelector('#switch-theme-btn');
    // access to the choose them box
    const chooseThemeBox = document.querySelector('#choose-theme-box');
    // access to the choose theme box Background
    const background = document.querySelector('#choose-theme-box > #background');

    // add click event on switch button
    switchThemeBtn.addEventListener('click', () => {
        // active choose theme box
        chooseThemeBox.classList.add('active');
        // remove active class to menu
        menu.classList.remove('active');
        quickMenuBtn.classList.remove('active');
    });

    // add click event on background ------> hide and remove active class on the choose theme box
    background.addEventListener('click', () => chooseThemeBox.classList.remove('active'));

    // access to the choose theme inputs
    const inputs = document.querySelectorAll('#choose-theme-box input');

    // add cheked event on inputs
    // set dark theme
    inputs[0].addEventListener('change', () => {
        // remove active class and hide choose theme box
        chooseThemeBox.classList.remove('active');
        setThemes.darkTheme();
    });
    // set light theme
    inputs[1].addEventListener('change', () => {
        // remove active class and hide choose theme box
        chooseThemeBox.classList.remove('active');
        setThemes.lightTheme();
    });
    // set system theme
    inputs[2].addEventListener('change', () => {
        // remove active class and hide choose theme box
        chooseThemeBox.classList.remove('active');
        setThemes.systemTheme();
        // show message to user
        message.showMessage('Your browser may not support this feature.!')
    });
}