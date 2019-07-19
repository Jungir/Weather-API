const city = document.querySelector('form');
const apiKey = 'TUPOhpQwVkM4BaIUS0byaMAtbPwu1drU';
const temp = document.querySelector('span.temperature');
const h4 = document.querySelector('h4');
const weatherState = document.querySelector('.weatherState');
const display = document.querySelector('.container > div')
const mainImg = document.querySelector('.mainImg')
const iconTag = document.querySelector('i > img');



// console.log(iconTag.getAttribute('src'));


city.addEventListener('submit', function(event){
    event.preventDefault();


    const nameCity = city.search.value;
    city.search.value = '';
    localStorage.setItem('city', nameCity);

    getCity(nameCity).then(function (cityInfo) {
     
        let cityResultKey = Number(cityInfo[0].Key);
        h4.textContent = cityInfo[0].EnglishName;
        return cityResultKey;
    }).then(function (cityKey) {
        return getWather(cityKey);
    }).then(function (weatherInfo) {

        // let timeCond = weatherInfo[0]
      
        if (weatherInfo[0].IsDaylight){
            mainImg.setAttribute('src', `/img/day.svg`);
        }else{
            mainImg.setAttribute('src', `/img/night.svg`);
        }
       
        let dayNumer = Number(weatherInfo[0].WeatherIcon);
        iconTag.setAttribute('src', `/img/icons/${dayNumer}.svg`);
        weatherState.textContent = weatherInfo[0].IconPhrase;
        let weatherF = weatherInfo[0].Temperature.Value
        let weatherC = Math.round((weatherF - 32) * 5/9);
        temp.textContent = weatherC;
        
        display.classList.remove('dispayNone');
    }).catch(function (err){console.log('some error', err);
    });
});

let getCity = async function (city){
    const respose = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=%20%09${apiKey}%20&q=${city}`);
    const data = await respose.json();
    return data;
}

let getWather = async function (key){
    const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${key}?apikey=${apiKey}`);
    const data = await response.json();
    return data;
}


// storing data 
// localStorage.setItem('name', 'kam');
// localStorage.setItem('age', 22);

// // retrieve data

// console.log(localStorage.getItem('name'));

// // updateing data 

// localStorage.setItem('name', 'shon');
// console.log(typeof localStorage.getItem('name'));

// // deleting item/whole storage

// localStorage.removeItem('name');
// console.log(localStorage.getItem('name'));

// localStorage.clear();
// console.log(localStorage.getItem('name'));


// const todos = [
//     {text: 'program :)', author: 'shaun'},
//     {text: 'piano', author: 'shaun'},
//     {text: 'read book', author: 'shaun'},

// ]

// console.log(typeof JSON.stringify(todos));


// localStorage.setItem('todos', JSON.stringify(todos));

// const stored = localStorage.getItem('todos');

// console.log(JSON.parse(stored));


