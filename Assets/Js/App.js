
const body        =   document.querySelector('body');
const form        =   document.querySelector('.form');
const inputSearch =   document.querySelector('.inputArea-input-search');
const resultArea  =   document.querySelector('.songs');

const fetchUrl    = `https://api.lyrics.ovh`;

inputSearch.addEventListener('keypress', async e => {

   if(e.key == "Enter"){

       e.preventDefault(); 

       const searchValue = inputSearch.value.trim();
       if(!searchValue) errorUser("Please, Type a Valid word...");

       if(searchValue){

        let searchResult = await searchMusic(searchValue); 
        getSongs(searchResult.songs)
        
        return;

       } 
    
   }
    
});


async function searchMusic(search) {

    const formatedURL = `${fetchUrl}/suggest/${search}`

    const query     =  await fetch(formatedURL);
    const response  =  await query.json();

    let finalResponse = trateResponse(response);

    return finalResponse;
}


function trateResponse(response) {
    
    let songs = response.data;
    let nextSuggestions = response.next;

    let finalResponse = {'songs': songs, 'next': nextSuggestions};

    return finalResponse;
}


function getSongs(songs) {
    
    resultArea.innerHTML = songs.map(song => `

        <article class = 'song'>
            <div class = 'song-btn-area'>
                <button class = 'song-play' data-artist = '${song.artist.name}' data-song-name = '${song.title}' data-song='${song.preview}' data-album-img = ${song.album.cover}>Play Preview</button>
            </div>
            <picture>
                <div class = 'song-cover'></div>
            </picture>
            <p class = "song-name">${song.title}</p>
            <p class = "song-artist-name">${song.artist.name}</p>
        </article>

    `).join('');

    listenToPlayPreview();
}


function listenToPlayPreview() {

    let playButtons = document.querySelectorAll('.song-play');

    playButtons.forEach(playButton => {

        playButton.addEventListener('click', () => {

            let songArtist = playButton.getAttribute('data-artist')
            let songName   = playButton.getAttribute('data-song-name')
            let songURL    = playButton.getAttribute('data-song')
            let songCover  = playButton.getAttribute('data-album-img')

            playPreview(songName, songURL, songArtist, songCover)

        });

    });
}


function playPreview(songName, songURL, songArtist, songCover) {
    
    player(songName, songArtist, songCover)
    let song = new Audio(songURL);
    song.play();
    
}


function player(songName, songArtist, songCover) {

    body.insertAdjacentHTML('beforeend', `

        <section class = 'player'>
            <button class = 'lyrics-button'>Show Lyrics</button>
            <div class = 'player-info'>
                <p class = 'playing-now'>playing now:</p>
                <p class = 'playing-song'>${songName}</p>
                <p class = 'playing-artist'>${songArtist}</p>
            </div>
            <picture>
                <div class = 'song-cover'></div>
            </picture>
        </section>

    `);


    const listenGetLyrics = async () => {

        let btnLyrics = document.querySelector('.lyrics-button');
        btnLyrics.addEventListener('click', async () => await searchLyrics(songName, songArtist))

    }

    const removePlayer = () => {

        let player = document.querySelector('.player');
        player.remove()

    }

    listenGetLyrics()
    setTimeout(() => removePlayer(), 32000)
    
}


async function searchLyrics(song, artist) {

    const formatedURL = `${fetchUrl}/v1/${artist}/${song}`

    const query     =  await fetch(formatedURL);
    const response  =  await query.json();

    renderLyrics(song, artist, response.lyrics)
}


function renderLyrics(songName, artistSong, lyricsSong) {


    if(!lyricsSong){
        errorUser("Lyrics not found :(");
        return;
    }

    let lyrics = lyricsSong.replace(/(\r\n|\r|\n)/g, '<br>')

    resultArea.innerHTML = `
    
        <h1 class = 'song-title'>
            ${songName} <br>
            Artist: ${artistSong}
        </h1>

        <p class = 'song-lyrics'>
            ${lyrics}
        </p>

    `
}


function errorUser(message) {
   
    body.insertAdjacentHTML('beforeend', `
        <div class = "alert-User error">
            ${message}
        </div>
    `)

    const removeAlert = () => {

            let alertError = document.querySelector('.alert-User');
            alertError.remove();

    }

    setTimeout(() => removeAlert(), 3000)
}