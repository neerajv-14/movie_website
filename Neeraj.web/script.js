const API_KEY = 'api_key=5d5713066ff408684f377a346fdbbfd7';
const BASE_URL='https://api.themoviedb.org/3';
const APIURL =BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMGPATH ='https://image.tmdb.org/t/p/w500';
const SEARCHAPI= BASE_URL + '/search/movie?&'+API_KEY+'&query=';

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();


  console.log(respData);
  
  showMovies(respData.results);

}

function showMovies(movies) {
  
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
   
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
       <img src="${IMGPATH + poster_path}" alt="${title}"/>
    
     <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
         
     </div> 

     <div class="overview">

     <h2>Overview:</h2>
     ${overview}
     </div>
     `;

    main.appendChild(movieEl)
  });

}


function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red';
  }

}


form.addEventListener("submit", (e) => {
  e.preventDefault();


  const searchTerm = search.value;

  if (searchTerm) {

    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});