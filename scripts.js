const clientId = '776161af11b340bcb769d323a6988497';
const clientSecret = '3470b32e700542fc9896e26fb568436d';


const redirectUri = 'http://melodiq.me/index.html';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = ['user-top-read'];
const state = "56447648947f41c197c042b46ec13b02";
const showDialog = true;
const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&state=${state}&show_dialog=${showDialog}`;
const logoutEndpoint = 'https://accounts.spotify.com/logout'
const logouturl = `${logoutEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`;


const loginButton = document.querySelector('.login');
loginButton.addEventListener('click', () => {
  window.location = authUrl;
});

//These are the original global variables for the first three buttons
const fetchArtistButton = document.getElementById('fetch-artists');
const fetchSongsButton = document.getElementById('fetch-songs');
const fetchRecommendationsButton = document.getElementById('fetch-recommendations');

// Global varibales for time frames, this icludes data for top artists
const fetchArtistsMonthButton = document.getElementById('fetch-top-artists-month');
const fetchArtistsSixMonthsButton = document.getElementById('fetch-top-artists-six-months');
const fetchArtistsAllTimeButton = document.getElementById('fetch-top-artists-all-time');

// Global varibales for time frames, this icludes data for top songs
const fetchTopTracksMonthButton = document.getElementById('fetch-top-tracks-month');
const fetchTopTracksSixMonthsButton = document.getElementById('fetch-top-tracks-six-months');
const fetchTopTracksAllTimeButton = document.getElementById('fetch-top-tracks-all-time');



// This sends the buttons when one is pressed to the header section in the html
const headerButtons = document.getElementById('header-buttons');

// These buttons correspond to sending buttons to header (only the buttons in this comment section) 
// This is an event only reaction to pressing the buttons it does not affect the collection and display of data
fetchArtistButton.addEventListener('click', () => {
  headerButtons.appendChild(fetchArtistButton);
  headerButtons.appendChild(fetchSongsButton);
  headerButtons.appendChild(fetchRecommendationsButton);
});

fetchSongsButton.addEventListener('click', () => {
  headerButtons.appendChild(fetchArtistButton);
  headerButtons.appendChild(fetchSongsButton);
  headerButtons.appendChild(fetchRecommendationsButton);
});

fetchRecommendationsButton.addEventListener('click', () => {
  headerButtons.appendChild(fetchArtistButton);
  headerButtons.appendChild(fetchSongsButton);
  headerButtons.appendChild(fetchRecommendationsButton);
});
//

// These are the event listeners for the top artist section
fetchArtistsMonthButton.addEventListener('click', () => {
  fetchTopArtistsMonth(accessToken);
});

fetchArtistsSixMonthsButton.addEventListener('click', () => {
  fetchTopArtistsSixMonths(accessToken);
});

fetchArtistsAllTimeButton.addEventListener('click', () => {
  fetchTopArtistsAllTime(accessToken);
});

fetchArtistButton.addEventListener('click', () => {
  fetchTopArtistsAllTime(accessToken);
  fetchArtistsMonthButton.style.display = 'inline-block';
  fetchArtistsSixMonthsButton.style.display = 'inline-block';
  fetchArtistsAllTimeButton.style.display = 'inline-block';
  fetchTopTracksMonthButton.style.display = 'none';
  fetchTopTracksSixMonthsButton.style.display = 'none';
  fetchTopTracksAllTimeButton.style.display = 'none';
});

// These are the event listeners for the top songs/tracks section
fetchTopTracksMonthButton.addEventListener('click', () => {
  fetchTopTracksMonth(accessToken);
});

fetchTopTracksSixMonthsButton.addEventListener('click', () => {
  fetchTopTracksSixMonths(accessToken);
});

fetchTopTracksAllTimeButton.addEventListener('click', () => {
  fetchTopTracksAllTime(accessToken);
});

fetchSongsButton.addEventListener('click', () => {
  fetchTopTracks(accessToken);
  fetchTopTracksMonthButton.style.display = 'inline-block';
  fetchTopTracksSixMonthsButton.style.display = 'inline-block';
  fetchTopTracksAllTimeButton.style.display = 'inline-block';
  fetchArtistsMonthButton.style.display = 'none';
  fetchArtistsSixMonthsButton.style.display = 'none';
  fetchArtistsAllTimeButton.style.display = 'none';
});


// This the event listener for the recommendations section
fetchRecommendationsButton.addEventListener('click', () => {
  fetchRecommendations(accessToken);
  fetchArtistsMonthButton.style.display = 'none';
  fetchArtistsSixMonthsButton.style.display = 'none';
  fetchArtistsAllTimeButton.style.display = 'none';
  fetchTopTracksMonthButton.style.display = 'none';
  fetchTopTracksSixMonthsButton.style.display = 'none';
  fetchTopTracksAllTimeButton.style.display = 'none';

});

// This is the start of the functions
const accessToken = getAccessTokenFromUrl();
if (accessToken) {
  document.querySelector('.login').style.display = 'none';
  fetchArtistButton.style.display = 'inline-block';
  fetchSongsButton.style.display = 'inline-block';
  fetchRecommendationsButton.style.display = 'inline-block';
}

function getAccessTokenFromUrl() {
  const regex = /access_token=([^&]*)/;
  const match = window.location.hash.match(regex);
  return match && match[1];
}


// This section starts the functions for the top artists

// This function grabs the data for top for the past 4 weeks
function fetchTopArtistsMonth(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=45';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Artists (4 Weeks):', data);
      displayTopArtists(data.items);
    });
}

// This function grabs the data for top for the past 6 months
function fetchTopArtistsSixMonths(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=45';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Artists (6 Months):', data);
      displayTopArtists(data.items);
    });
}

// This function grabs the data for top for all time. 
function fetchTopArtistsAllTime(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=45';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Artists (All Time):', data);
      displayTopArtists(data.items);
    });
}

// This function is for the original top artist button which will display the all time artists as well 
function fetchTopArtists(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=45';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Artists (All Time):', data);
      displayTopArtists(data.items);
    });
}



// This section starts the functions for the top tracks/songs

// This function grabs the data for top for the past 4 weeks
function fetchTopTracksMonth(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=30';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);
      displayTopTracks(data.items);
    });
}

// This function grabs the data for top songs/tracks for the past 6 months
function fetchTopTracksSixMonths(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=30';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);
      displayTopTracks(data.items);
    });
}

// This function grabs the data for top songs/tracks for all time
function fetchTopTracksAllTime(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);
      displayTopTracks(data.items);
    });
}

// This function is the original for the button top songs
function fetchTopTracks(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks?limit=30';
  const headers = { Authorization: `Bearer ${accessToken}` };
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);
      displayTopTracks(data.items);
    });
}
// This is the end of the top songs/tracks section



function fetchTopArtistsData(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/artists';
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(url, { headers }).then(response => response.json());
}

function fetchTopTracksData(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks';
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(url, { headers }).then(response => response.json());
} 

function fetchRecommendations(accessToken) {
  // Fetch the user's top artists and tracks
  Promise.all([fetchTopArtistsData(accessToken), fetchTopTracksData(accessToken)])
    .then(([topArtistsData, topTracksData]) => {
      // Extract the artist and track IDs to use as seeds for the recommendations API 
      const seedArtists = topArtistsData.items.slice(0, 2).map(artist => artist.id).join(',');
      const seedTracks = topTracksData.items.slice(0, 3).map(track => track.id).join(',');

      // Set up the recommendations API URL using the extracted seed values
      const url = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${seedArtists}&seed_tracks=${seedTracks}`;
      const headers = { Authorization: `Bearer ${accessToken}` };
      
      // Fetch the recommendations using the modified URL
      return fetch(url, { headers });
    })
    .then(response => {
      if (!response.ok) {
        console.error('Error during fetch:', response.status, response.statusText);
        return response.json(); // This will return the error message in the response body
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        console.error('Error fetching recommendations:', data.error.message);
      } else {
        console.log('Recommended Songs:', data);
        displayRecommendations(data.tracks);
      }
    })
    .catch(error => {
      console.error('Error during fetch:', error);
    });
}

function clearLists() {
  document.getElementById('top-artists-list').innerHTML = '';
  document.getElementById('top-tracks-list').innerHTML = '';
  document.getElementById('recommended-songs-list').innerHTML = '';
}

function displayTopArtists(topArtists) {
  clearLists();

  const topArtistsList = document.getElementById('top-artists-list');
  topArtistsList.innerHTML = '';

  topArtists.forEach((artist, index) => {
    const listItem = document.createElement('p');
    const listItemContent = document.createElement('div');
    const albumArt = document.createElement('img');

    listItemContent.className = 'list-item-content';
    albumArt.className = 'album-art';
    albumArt.src = artist.images[0].url;

    listItemContent.appendChild(albumArt);
    listItemContent.innerHTML += (index + 1) + ". " + artist.name; 
    listItem.appendChild(listItemContent);
    topArtistsList.appendChild(listItem);
  });
}


function displayTopTracks(topTracks) {
  clearLists();

  const topTracksList = document.getElementById('top-tracks-list');
  topTracksList.innerHTML = '';

  topTracks.forEach(track => {
    const listItem = document.createElement('li');
    const listItemContent = document.createElement('div');
    const albumArt = document.createElement('img');

    listItemContent.className = 'list-item-content';
    albumArt.className = 'album-art';
    albumArt.src = track.album.images[0].url;

    listItemContent.appendChild(albumArt);
    listItemContent.innerHTML += `${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`;
    listItem.appendChild(listItemContent);
    topTracksList.appendChild(listItem);

  });
}

function displayRecommendations(recommendedSongs) {
  clearLists();

  if (!recommendedSongs || recommendedSongs.length === 0) {
    console.log('No recommendations found.');
    return;
  }

  const recommendedSongsList = document.getElementById('recommended-songs-list');
  recommendedSongsList.innerHTML = '';

  recommendedSongs.forEach(song => {
    const listItem = document.createElement('li');
    const listItemContent = document.createElement('div');
    const albumArt = document.createElement('img');

    listItemContent.className = 'list-item-content';
    albumArt.className = 'album-art';
    albumArt.src = song.album.images[0].url;

    listItemContent.appendChild(albumArt);
    listItemContent.innerHTML += `${song.name} - ${song.artists.map(artist => artist.name).join(', ')}`;
    listItem.appendChild(listItemContent);
    recommendedSongsList.appendChild(listItem);

  });
}
function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add your Last.fm API key here
// Add your Last.fm API key here
// Add your Last.fm API key here
const lastFmApiKey = 'cb0650fc00df17d41eab60fdf46bb2c4';

// Modify your fetchTopTracks function to include genre information
function fetchTopTracks(accessToken) {
  const url = 'https://api.spotify.com/v1/me/top/tracks?limit=30';
  const headers = { Authorization: `Bearer ${accessToken}` };

  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);

      // Clear the previous list
      const topTracksList = document.getElementById('top-tracks-list');
      topTracksList.innerHTML = '';

      // Create an array to store the promises for fetching genre information
      const genrePromises = [];

      data.items.forEach((track, index) => {
        // Create a list item for each track
        const listItem = document.createElement('li');
        listItem.className = 'list-item';

        // Create an album cover element
        const albumArt = document.createElement('img');
        albumArt.className = 'album-art';
        albumArt.src = track.album.images[0].url;

        // Create an explicit indicator element
        const explicitIndicator = document.createElement('span');
        explicitIndicator.className = 'explicit-indicator';
        explicitIndicator.textContent = track.explicit ? 'E' : '';

        // Create a song info container
        const songInfo = document.createElement('div');
        songInfo.className = 'song-info';

        // Create a song name element
        const songName = document.createElement('p');
        songName.className = 'song-name';
        songName.innerHTML = `${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`;

        // Create a genre element
        const genreElement = document.createElement('p');
        genreElement.className = 'genre';
        genreElement.textContent = 'Loading...';

        // Create an album info element
        const albumInfo = document.createElement('p');
        albumInfo.className = 'album-info';
        albumInfo.textContent = `Album: ${track.album.name} |`;

        // Create a plays and duration element
        const playsAndDuration = document.createElement('p');
        playsAndDuration.className = 'plays-and-duration';
        playsAndDuration.innerHTML = `Plays: ${track.popularity}|  Duration: ${formatDuration(track.duration_ms)}`;

        // Append elements to the song info container
        songInfo.appendChild(songName);
        songInfo.appendChild(albumInfo);
        songInfo.appendChild(genreElement);
        songInfo.appendChild(playsAndDuration);

        // Append elements to the list item
        listItem.appendChild(albumArt);
        listItem.appendChild(explicitIndicator);
        listItem.appendChild(songInfo);

        // Append the list item to the top tracks list
        topTracksList.appendChild(listItem);

        // Create a promise for fetching genre information and add it to the array
        const genrePromise = fetchTrackGenre(track.name, track.artists[0].name, genreElement);
        genrePromises.push(genrePromise);
      });

      // Wait for all genre promises to resolve before continuing
      Promise.all(genrePromises)
        .then(() => {
          console.log('Genre information loaded for all tracks.');
        })
        .catch(error => {
          console.error('Error fetching genre information:', error);
        });
    });
}


// Modify the fetchTrackGenre function to return a promise
// Modify the fetchTrackGenre function to use artist genre as a fallback
// Modify the fetchTrackGenre function to use artist genre as a fallback
function fetchTrackGenre(trackName, artistName, genreElement) {
  return new Promise((resolve, reject) => {
    const lastFmTrackUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastFmApiKey}&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&format=json`;
    const lastFmArtistUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${lastFmApiKey}&artist=${encodeURIComponent(artistName)}&format=json`;

    // Fetch track information
    fetch(lastFmTrackUrl)
      .then(response => response.json())
      .then(trackData => {
        if (!trackData.error && trackData.track.toptags.tag.length > 0) {
          // If track genre is available, display it
          const genre = trackData.track.toptags.tag[0].name;
          genreElement.textContent = `Genre: ${genre} |`;
          resolve();
        } else {
          // If track genre is not available, fetch and display artist genre
          fetch(lastFmArtistUrl)
            .then(response => response.json())
            .then(artistData => {
              if (!artistData.error && artistData.artist.tags.tag.length > 0) {
                const artistGenre = artistData.artist.tags.tag[0].name;
                genreElement.textContent = `Genre: ${artistGenre} |`;
              } else {
                genreElement.textContent = 'Genre: Not available';
              }
              resolve();
            })
            .catch(error => {
              console.error('Error fetching artist genre:', error);
              reject(error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching track genre:', error);
        reject(error);
      });
  });
}

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  logout(accessToken);
});

//Add the logout function, which clears the access token and redirects the user to the Spotify authorization page:

function logout() {
  const confirmed = confirm('Are you sure you want to proceed back to the main login screen?');
  if (confirmed) {
    window.location = redirectUri;
  }
}


// Finally, update the display of the logout button based on the presence of the access token:

if (accessToken) {
  document.querySelector('.login').style.display = 'none';
  fetchArtistButton.style.display = 'inline-block';
  fetchSongsButton.style.display = 'inline-block';
  fetchRecommendationsButton.style.display = 'inline-block';
  logoutButton.style.display = 'inline-block'; 
}

// Theme button
const toggleCheckbox = document.querySelector('.toggle-checkbox');
const toggleButton = document.querySelector('.toggle-button');
const sunIconWrapper = document.querySelector('.sun-icon-wrapper');
const moonIconWrapper = document.querySelector('.moon-icon-wrapper');
const body = document.querySelector('body');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const h1 = document.querySelector('h1');

// Retrieve theme preference from local storage or set to default
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
if (currentTheme === 'light') {
  h1.classList.add('light-theme');
  body.classList.add('light-theme');
  header.classList.add('light-theme');
  footer.classList.add('light-theme');
  toggleCheckbox.checked = true;
}

// Toggle theme
toggleCheckbox.addEventListener('click', () => {
  h1.classList.toggle('light-theme');
  body.classList.toggle('light-theme');
  header.classList.toggle('light-theme');
  footer.classList.toggle('light-theme');
  const newTheme = toggleCheckbox.checked ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
});

//menu
$(function () {
  var button = $("#menu-button");
  var overlay = $("#overlay");
  var menu = $("#hamburger-menu");

  button.on("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    if (overlay.hasClass("open")) {
      animate_menu("close");
    } else {
      animate_menu("open");
    }
  });

  overlay.on("click", function (e) {
    if (overlay.hasClass("open")) {
      animate_menu("close");
    }
  });

  function animate_menu(menu_toggle) {
    if (menu_toggle == "open") {
      overlay.addClass("open");
      overlay.show(); // Ensure overlay is visible
      menu.show(); // Ensure menu is visible
      menu.animate({ width: "200px", height: "100%" }, 300);
    }

    if (menu_toggle == "close") {
      overlay.removeClass("open");
      overlay.hide(); // Hide overlay
      menu.hide(); // Hide menu
      menu.animate({ width: "0", height: "0" }, 300);
    }
  }
});

// Global variable to keep track of the selected time frame
let selectedTimeFrame = 'short_term';

// Add event listeners to the time frame buttons
const shortTermButton = document.getElementById('short-term-button');
const mediumTermButton = document.getElementById('medium-term-button');
const longTermButton = document.getElementById('long-term-button');

shortTermButton.addEventListener('click', () => {
  selectedTimeFrame = 'short_term';
  fetchAndDisplayTopTracks(selectedTimeFrame, accessToken);
});

mediumTermButton.addEventListener('click', () => {
  selectedTimeFrame = 'medium_term';
  fetchAndDisplayTopTracks(selectedTimeFrame, accessToken);
});

longTermButton.addEventListener('click', () => {
  selectedTimeFrame = 'long_term';
  fetchAndDisplayTopTracks(selectedTimeFrame, accessToken);
});

// Fetch and display top tracks based on the selected time frame
function fetchAndDisplayTopTracks(timeFrame, accessToken) {
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeFrame}&limit=30`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      console.log('Top Tracks:', data);
      displayTopTracks(data.items);
    })
    .catch(error => {
      console.error('Error fetching top tracks:', error);
    });
}

// This function is responsible for displaying top tracks
function displayTopTracks(tracks) {
  // Clear the previous list
  const topTracksList = document.getElementById('top-tracks-list');
  topTracksList.innerHTML = '';

  // Create an array to store the promises for fetching genre information
  const genrePromises = [];

  tracks.forEach((track, index) => {
    // Create a list item for each track
    const listItem = document.createElement('li');
    listItem.className = 'list-item';

    // Create an album cover element
    const albumArt = document.createElement('img');
    albumArt.className = 'album-art';
    albumArt.src = track.album.images[0].url;

    // Create an explicit indicator element
    const explicitIndicator = document.createElement('span');
    explicitIndicator.className = 'explicit-indicator';
    explicitIndicator.textContent = track.explicit ? 'E' : '';

    // Create a song info container
    const songInfo = document.createElement('div');
    songInfo.className = 'song-info';

    // Create a song name element
    const songName = document.createElement('p');
    songName.className = 'song-name';
    songName.innerHTML = `${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`;

    // Create a genre element
    const genreElement = document.createElement('p');
    genreElement.className = 'genre';
    genreElement.textContent = 'Loading...';

    // Create an album info element
    const albumInfo = document.createElement('p');
    albumInfo.className = 'album-info';
    albumInfo.textContent = `Album: ${track.album.name} |`;

    // Create a plays and duration element
    const playsAndDuration = document.createElement('p');
    playsAndDuration.className = 'plays-and-duration';
    playsAndDuration.innerHTML = `Plays: ${track.popularity} | Duration: ${formatDuration(track.duration_ms)}`;

    // Append elements to the song info container
    songInfo.appendChild(songName);
    songInfo.appendChild(albumInfo);
    songInfo.appendChild(genreElement);
    songInfo.appendChild(playsAndDuration);

    // Append elements to the list item
    listItem.appendChild(albumArt);
    listItem.appendChild(explicitIndicator);
    listItem.appendChild(songInfo);

    // Append the list item to the top tracks list
    topTracksList.appendChild(listItem);

    // Create a promise for fetching genre information and add it to the array
    const genrePromise = fetchTrackGenre(track.name, track.artists[0].name, genreElement);
    genrePromises.push(genrePromise);
  });

  // Wait for all genre promises to resolve before continuing
  Promise.all(genrePromises)
    .then(() => {
      console.log('Genre information loaded for all tracks.');
    })
    .catch(error => {
      console.error('Error fetching genre information:', error);
    });
}

let currentSection = null; // Track the current section being displayed

function loadSection(sectionName) {
  // Check if the requested section is already being displayed
  if (currentSection === sectionName) {
    console.log(`${sectionName} section is already loaded.`);
    return;
  }

  // Clear any existing content
  clearContent();

  // Set the current section
  currentSection = sectionName;

  // Load the data for the selected section
  if (sectionName === 'top-songs') {
    fetchAndDisplayTopTracks(selectedTimeFrame, accessToken);
  } else if (sectionName === 'top-artists') {
    fetchTopArtists(accessToken);
  } else if (sectionName === 'recommendations') {
    fetchRecommendations(accessToken);
  }
}

// Function to clear the content
function clearContent() {
  const topTracksList = document.getElementById('top-tracks-list');
  topTracksList.innerHTML = '';

  // Clear content for other sections if needed
  // ...
}

// Add event listeners to the buttons
const topSongsButton = document.getElementById('top-songs-button');
const topArtistsButton = document.getElementById('top-artists-button');
const recommendationsButton = document.getElementById('recommendations-button');

topSongsButton.addEventListener('click', () => loadSection('top-songs'));
topArtistsButton.addEventListener('click', () => loadSection('top-artists'));
recommendationsButton.addEventListener('click', () => loadSection('recommendations'));















/*
// Theme button
const toggleCheckbox = document.querySelector('.toggle-checkbox');
const toggleButton = document.querySelector('.toggle-button');
const sunIconWrapper = document.querySelector('.sun-icon-wrapper');
const moonIconWrapper = document.querySelector('.moon-icon-wrapper');
const body = document.querySelector('body');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const h1 = document.querySelector('h1');

// Retrieve theme preference from local storage or set to default
const currentTheme = localStorage.getItem('theme') || 'dark';

// Function to update background colors based on theme
function updateBackgroundColors(theme) {
  const shaderArt = document.getElementById('myShaderArt');
  if (theme === 'light') {
    shaderArt.setAttribute('color1', '#3c3c3c'); // Update color1 for light theme
    shaderArt.setAttribute('color2', '#000000'); // Update color2 for light theme
    shaderArt.setAttribute('color3', '#575757'); // Update color1 for light theme
    shaderArt.setAttribute('color4', '#fffff0'); 
    // You can similarly update color3 and color4 if needed
  } else {
    shaderArt.setAttribute('color1', '#080000'); // Update color1 for dark theme
    shaderArt.setAttribute('color2', '#97ffa8'); // Update color2 for dark theme
    shaderArt.setAttribute('color3', '#8c8c8c'); // Update color1 for light theme
    shaderArt.setAttribute('color4', '#1d4a4a');
    // You can similarly update color3 and color4 if needed
  }
}

// Set initial theme and background colors
if (currentTheme === 'light') {
  h1.classList.add('light-theme');
  body.classList.add('light-theme');
  header.classList.add('light-theme');
  footer.classList.add('light-theme');
  toggleCheckbox.checked = true;
  updateBackgroundColors('light');
} else {
  updateBackgroundColors('dark');
}

// Toggle theme
toggleCheckbox.addEventListener('click', () => {
  h1.classList.toggle('light-theme');
  body.classList.toggle('light-theme');
  header.classList.toggle('light-theme');
  footer.classList.toggle('light-theme');
  const newTheme = toggleCheckbox.checked ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateBackgroundColors(newTheme);
});
*/
