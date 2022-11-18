class Favorites{

    // add music to favorites
    addToFavorites(songId){
        // access to songs
        const songs = player.getSongs();
        // change favorites value
        songs[songId].favorites = true;
        // songs data update
        localStorage.setItem('songsData', JSON.stringify(songs));
        this.updateFavoritesList();
    }

    // remove song from favorites
    removeFromFavorites(songId){
        // access to songs
        const songs = player.getSongs();
        // change favorites value
        songs[songId].favorites = false;
        // songs data update
        localStorage.setItem('songsData', JSON.stringify(songs));
        this.updateFavoritesList();
    }

    // add favorites songs to the DOM
    updateFavoritesList(){
        // access to songs
        let songs = player.getSongs();
        // access to favorites list 
        const favoritesList = document.querySelector('#favorites-list ul');
        // clear favorites list
        favoritesList.innerHTML = '';


        //////
        if(songs == null){
            // send request to api
            fetch('./data.json').then((response) => {
                response.json().then((finallyR) => {
                    createdFavorites(finallyR);
                });
            }).catch((err) => {
                console.log(err);
            });
        
            // created favorites list
            function createdFavorites(songs){
                // update favorites
                songs.forEach((song, index) => {
                    if(song.favorites === true){
                        // created li tag
                        const li = document.createElement('li');

                        // set song id
                        li.setAttribute('song-id', index);
                        li.innerHTML += `
                            <img class='cover' src="${song.cover}">
                            <div class="info">
                                <p class="song-name">${song.name}</p>
                                <p class="artist-name">${song.artist}</p>
                            </div>
                            <div class="trash ml-auto">   
                            <i class="fa-regular fa-xmark"></i>
                            </div>
                        `
                        // play selected song
                        favoritesList.appendChild(li);
                        li.querySelector('.info').addEventListener('click', () => player.changeSong(index));
                        li.querySelector('.cover').addEventListener('click', () => player.changeSong(index));

                        // remove song from favorites
                        li.querySelector('.trash').addEventListener('click', () =>{
                            // access to now play
                            const nowPlay = document.querySelector('#player');
                            if(nowPlay.getAttribute('song-id') == index){
                                nowPlay.setAttribute('favorits', 'false');
                                // access to the add to favorites button
                                const addToFavoritesButton = document.querySelector('.add-favorits i');
                                addToFavoritesButton.classList = 'fa-light fa-heart';
                            }
                            li.remove();
                            this.removeFromFavorites(index);
                            message.showMessage('Music removed from favorites');
                        });

                    }
                });
            }
        }else{
            // update favorites
            songs.forEach((song, index) => {
                if(song.favorites === true){
                    // created li tag
                    const li = document.createElement('li');

                    // set song id
                    li.setAttribute('song-id', index);
                    li.innerHTML += `
                        <img class='cover' src="${song.cover}">
                        <div class="info">
                            <p class="song-name">${song.name}</p>
                            <p class="artist-name">${song.artist}</p>
                        </div>
                        <div class="trash ml-auto">   
                        <i class="fa-regular fa-xmark"></i>
                        </div>
                    `
                    // play selected song
                    favoritesList.appendChild(li);
                    li.querySelector('.info').addEventListener('click', () => player.changeSong(index));
                    li.querySelector('.cover').addEventListener('click', () => player.changeSong(index));

                    // remove song from favorites
                    li.querySelector('.trash').addEventListener('click', () =>{
                        // access to now play
                        const nowPlay = document.querySelector('#player');
                        if(nowPlay.getAttribute('song-id') == index){
                            nowPlay.setAttribute('favorits', 'false');
                            // access to the add to favorites button
                            const addToFavoritesButton = document.querySelector('.add-favorits i');
                            addToFavoritesButton.classList = 'fa-light fa-heart';
                        }
                        li.remove();
                        this.removeFromFavorites(index);
                        message.showMessage('Music removed from favorites');
                    });

                }
            });
        }
        

        
    }

}