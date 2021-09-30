const api ={
    key: 'd90d8067a963d57fc4ab93cf244de8fe',
    baseurl: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',setQuery )

function setQuery(e){
   if(e.keyCode == 13) {
    getResults(searchBox.value)
       console.log(searchBox.value);
   }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(
        (weather) => {
            return weather.json()
        }
    ).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name},${weather.sys.country}`;

    let now = new Date();

    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);
//getting weather temperature
    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    //getting weather type
    let weatherEl = document.querySelector(".weather")
    weatherEl.innerHTML = weather.weather[0].main;

    // getting high-low weather
    let hilow = document.querySelector(".high-low")
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(s) {
    let months = 
    ["January",
     "February", 
     "March", 
     "April", 
     "May", 
     "June",
      "July", 
     "August", 
     "September", 
     "October",
      "November", 
     "December",
    ];

  let  daysInWeek = 
    ['Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday'
];

    let day = daysInWeek[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}