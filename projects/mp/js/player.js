class Player{

    // get songs from local storage
    getSongs(){
        const songs = JSON.parse(localStorage.getItem('songsData'));
        return songs;
    }

    // set songs data to local storage
    setSongsDataToLocalStorage(){
        const songsExist = localStorage.getItem('songsData');
        if(songsExist == null ){
            // send request to api
            fetch('./data.json').then((response) => {
                response.json().then((finallyR) => {
                    setData(finallyR);
                });
            }).catch((err) => {
                console.log(err);
            });
        }

        // set data to LS
        function setData(data){
            localStorage.setItem('songsData', JSON.stringify(data));
        }
        
    }

    // go to next song
    goNextSong(currentSong){
        // access to the audio 
        const audio = document.querySelector('#audio');
        // access to the songs length
        const length = this.getSongs().length;
        // created next song id
        let nextSongId = 0;
        
        // chack random is enabled
        if(audio.getAttribute('random') === 'false'){
            nextSongId = currentSong;
        }else{
            // created random song id
            nextSongId = this.createdRandomNum(0, length);
        }

        // chack songs length
        if(nextSongId < length - 1){
            this.changeSong(nextSongId + 1);
        }else{
            this.changeSong(0)
        }
    }
    
    // go to prev song
    goPrevSong(currentSong){
        // access to the audio 
        const audio = document.querySelector('#audio');
        // access to the songs length
        const length = this.getSongs().length;
        // created next song id
        let nextSongId = 0;
        
        // chack random is enabled
        if(audio.getAttribute('random') === 'false'){
            nextSongId = currentSong;
        }else{
            // created random song id
            nextSongId = this.createdRandomNum(0, length);
        }

        // chack songs length
        if(nextSongId < length + 1 && nextSongId > 0){
            this.changeSong(nextSongId - 1);
        }else{
            this.changeSong(length - 1)
        }
    }


    // change format
    changeFormat(time){
        // access to the min
        let min = parseInt(time / 60);
        if(min < 10){
            min = `0${min}`;
        }
        // access to the second
        let sec = parseInt(time % 60);
        if(sec < 10){
            sec = `0${sec}`
        }

        return min + ':' + sec;
    }

    // change song 
    changeSong(id, paused){

        // update favorites list
        favorites.updateFavoritesList();

        // access tot the elements 
        const songCover = document.querySelector('.cover img');
        const songName = document.querySelector('#player .song-name');
        const artistName = document.querySelector('#player .artist-name');
        const bgBlur = document.querySelector('.bg-blur');
        const playerElement = document.querySelector('#player');
        const playPauseBtn = document.querySelector('.play-pause');
        
        // access to the song list and set data to DOM
        const songs = this.getSongs();

        // set audio
        audio.src = songs[id].song;
        // set cover image
        songCover.src = songs[id].cover;
        // set song name
        songName.textContent = songs[id].name;
        //set song artist name
        artistName.textContent = songs[id].artist;
        // set background image
        bgBlur.style.backgroundImage = `url('${songs[id].cover}')`;
        // set song id to the DOM tag
        playerElement.setAttribute('song-id', id);
        // set audio duration after .5s
        setTimeout(() => {
            // created interval
            const interval = setInterval(() => {
                // if change format response === not a number
                if(this.changeFormat(audio.duration) == 'NaN:NaN'){
                    // set ziro time to DOM
                    durationElement.textContent = '00:00';
                }else{
                    // set duration time to DOM
                    durationElement.textContent = this.changeFormat(audio.duration);
                }
            }, 50);
            // stop interval after 3s
            setTimeout(() => {
                clearInterval(interval);
            }, 3000);
        }, 500);

        if(paused !== 'pause'){
            // audio play
            audio.play();
            timlineFill.style.width = 0 + '%';
            // change play button style
            playPauseBtn.firstElementChild.classList = 'fa-solid fa-pause';
            playPauseBtn.classList.remove('play');
            // change mini player play button style
            miniPlayerPlayAndPauseBtn.firstElementChild.classList = 'fa-solid fa-pause';
            miniPlayerPlayAndPauseBtn.classList.remove('play');
        }

        // chacking favorites
        if(songs[id].favorites == true){
            // if song favorites == true
            addFavoritsBtn.firstElementChild.classList = 'fa-solid fa-heart';
            playerElement.setAttribute('favorits', 'true');
        }else{
            // if song favorites == false
            addFavoritsBtn.firstElementChild.classList = 'fa-light fa-heart';
            playerElement.setAttribute('favorits', 'false');
        }


        // access to the download button from quick menu
        const downloadBtn = document.querySelector('#download');
        downloadBtn.setAttribute('href', songs[id].song);
        downloadBtn.setAttribute('download', `${songs[id].name} - ${songs[id].artist}.mp3`);

        // if music not stop ==> set play now in playlist
        if(paused !== 'pause'){
            // set now playing song in playlist
            playlist.setNowPlaySong(id, 'play');
        }
    }


    // playing random music
    playRandom(){
        // created random number
        const number = this.createdRandomNum(0 , this.getSongs().length);
        // play random song
        this.changeSong(number);
    }

    // created random number
    createdRandomNum (start , end){
        let randomNumber = start + Math.floor(Math.random() * (end - start));
        return randomNumber;
    }

    // animateing playlist dotes
    playlistAnimate(rowId){
        // access to the row
        const row = document.querySelector(`.${rowId}`);

        // access to the all divs
        const divs = row.querySelectorAll('div');

        // animate one
        animateOne()
        function animateOne(){
            //created counter
            const counter = 5;
            // created index
            let index = 0;
            // createt setinterval --->
            const interval = setInterval(() => {
                // add active class 
                divs[index].classList.add('active');
                // index + 1
                index++
                // stop animate
                if(index === counter){
                    stopInterval()
                }
            }, 120);
            // stop animate
            function stopInterval(){
                clearInterval(interval);
                // run animate two
                animateTwo();
            }
        }
        
        // animate two
        function animateTwo(){
            //created counter
            const counter = 0;
            // created index
            let index = 4;
            // createt setinterval --->
            const interval = setInterval(() => {
                // remove active class 
                divs[index].classList.remove('active');
                // index - 1
                index--
                // stop animate
                if(index === counter){
                    stopInterval()
                }
            }, 120);
            // stop animate
            function stopInterval(){
                clearInterval(interval);
                // run animate two
                animateThree();
            }
        }
        
        // animate three
        function animateThree(){
            //created counter
            const counter = 4;
            // created index
            let index = 0;
            // createt setinterval --->
            const interval = setInterval(() => {
                // add active class 
                divs[index].classList.add('active');
                // index + 1
                index++
                // stop animate
                if(index === counter){
                    stopInterval()
                }
            }, 120);
            // stop animate
            function stopInterval(){
                clearInterval(interval);
                // run animate two
                animateFour();
            }

        }

        // animate four
        function animateFour(){
            //created counter
            const counter = 1;
            // created index
            let index = 3;
            // createt setinterval --->
            const interval = setInterval(() => {
                // remove active class 
                divs[index].classList.remove('active');
                // index - 1
                index--
                // stop animate
                if(index === counter){
                    stopInterval()
                }
            }, 120);
            // stop animate
            function stopInterval(){
                clearInterval(interval);
                // run animate two
                animateOne();
            }
        }
    }


}