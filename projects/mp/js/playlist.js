class Playlist{
    // created playlist
    createdPlaylist(){
        // access to the songs
        const songs = player.getSongs();
        // access to the playlist tag
        const playlistTag = document.querySelector('#playlist');
        // access to the list 
        const list = playlistTag.querySelector('.list ul');

        // each in songs array and created playlist options
        songs.forEach((song , index)=> {
            // created li
            const li = document.createElement('li');
            // set lis class
            li.classList = 'list-option';
            // set song id
            li.setAttribute('song-id', index);

            // created template
            li.innerHTML += `
                <img src="${song.cover}" class="list-image">
                <div class="list-body">
                    <div class="info">
                        <h3 class="name">
                            ${song.name}
                        </h3>
                        <h4 class="artist-name">
                            ${song.artist}
                        </h4>
                    </div>
                </div>
            `;

            li.addEventListener('click', () => player.changeSong(index));

            // append li to list
            list.appendChild(li);
        });

        // set play now song in playlist
        this.setNowPlaySong(0, 'pause');
    }


    // set play now song in the plalist
    setNowPlaySong(songId, action){
        // access to the all songs in play list
        const allSongs = document.querySelectorAll('#playlist ul li');
        
        // chcking action
        if(action === 'play'){
            activeSongInPlaylist();
            setSongDataInMiniPlayer();
        }else if(action === 'pause'){
            pauseSong();
        }


        //
        function activeSongInPlaylist(){
            // each in songs
            allSongs.forEach(song => {
                const id = song.getAttribute('song-id');
                // find current song tag
                if(id == songId){
                    // access to the befor song played
                    const before = document.querySelectorAll('#playlist ul li.active');
                    // if before song exist ==> remove active class
                    if(before.length > 0){
                        before.forEach(beforeSong => {
                            // remove active class on the before song
                            beforeSong.classList.remove('active');
                            // remove play animation
                            beforeSong.querySelector('#play-animation').remove();
                        });
                    }
                    // add active class to current song
                    song.classList.add('active');
                    // created play animation tag
                    song.innerHTML += `
                        <div id="play-animation">
                            <div class="animate-row r-1"> 
                                <div class=""></div>
                                <div class=""></div>
                                <div class=""></div>
                                <div class=""></div>
                                <div class=""></div>
                            </div>
                            <div class="animate-row r-2">
                                <div class="active"></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div class="animate-row r-3">
                                <div class="active"></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div class="animate-row r-4">
                                <div class="active"></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    `;

                    // run play animation
                    player.playlistAnimate('r-1');
                    setTimeout(() => {
                        player.playlistAnimate('r-2');
                        setTimeout(() => {
                            player.playlistAnimate('r-3');
                            setTimeout(() => {
                                player.playlistAnimate('r-4');
                            }, 200);
                        }, 250);
                    }, 360);
                }
            });
        }

        
        // set song data in the mini player
        function setSongDataInMiniPlayer(){
            // access to the all songs data
            const data = player.getSongs();
            // access to the mini player body
            const playerBody = document.querySelector('.mini-player-body');
            // access to the cover
            const cover = playerBody.querySelector('.cover img');
            //access to the song name and artist name
            const name = playerBody.querySelector('.song-name');
            const artistName = playerBody.querySelector('.artist-name');

            // set data
            cover.src = data[songId].cover;
            name.innerHTML = data[songId].name;
            artistName.innerHTML = data[songId].artist;
        }


        // pause song 
        function pauseSong(){
            // access to the befor song played
            const before = document.querySelectorAll('#playlist ul li.active');
            // if before song exist ==> remove active class
            if(before.length > 0){
                before.forEach(beforeSong => {
                    // remove active class on the before song
                    beforeSong.classList.remove('active');
                    // remove play animation
                    beforeSong.querySelector('#play-animation').remove();
                });
            }
        }
    }
}