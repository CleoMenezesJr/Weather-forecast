let cityName = document.querySelector('#cityName')
let temp = document.querySelector('#temp')
let tempDescription = document.querySelector('#tempDesc')
let dayNow = document.querySelector('#dayNow')

let loadingIcon = document.querySelector('.loadingIcon')
let tempclearDayIcon = document.querySelector('#clearDay')
let tempclearNightIcon = document.querySelector('#clearNight')
let mist = document.querySelector('#mist')

let date = new Date()
let dayName = new Array("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", 'sábado') 



// Getting Geolocation
function getLocalization() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocalization)
    } else {
        alert('Your browser not support it.')
    }
}

// Show Localization
function showLocalization(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude


    // alert(`${lat} X ${lon}`)

    // API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-33.447487&lon=-70.673676&appid=d53aea542dc80b68d34fe89716185c70&lang=pt&units=metric`)
    .then(response => response.json())
    .then(datah => {
        const cityNameValue = datah['name'];
        const tempValue = datah['main']['temp']
        const tempDescValue = datah['weather'][0]['description']

        const tempMinValue = datah['main']['temp_min']
        const tempMaxValue = datah['main']['temp_max']
        const feelsLikeValue = datah['main']['feels_like']

        cityName.innerHTML = cityNameValue
        temp.innerHTML = `${parseInt(tempValue)}°C`
        tempDescription.innerHTML = tempDescValue
        dayNow.innerHTML = `${dayName[date.getDay()]}, ${date.getHours("00:00")}:${date.getMinutes(00)}`


        if (tempDescValue == 'céu limpo') {

            loadingIcon.style.display='none'
            if (date.getHours() >= 18 || date.getHours() <= 4) {
                tempclearNightIcon.style.display='flex'
            } else if (date.getHours() >= 5 || date.getHours() <= 17) {
                tempclearDayIcon.style.display='flex'
            }

        } else if (tempDescValue == 'nevoeiro') {

            loadingIcon.style.display='none'
            mist.style.display='flex'

        }

        const labels = [
        'Agora',
        'Minima',
        'Máxima',
        'Sensação'
        ];
        const data = {
            labels: labels,
            datasets: [
            {
                label: 'Todo o dia',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [tempValue, tempMinValue, tempMaxValue, feelsLikeValue],
            }
            ]
        };
        
        const config = {
            type: 'bar',
            data,
            options: {}
        }
        
        new Chart(
            document.getElementById('myChart'), config
        )
        
    })

    .catch(err => alert("Can't get your city!"))
}


// function createChart() {
//     console.log(tempMaxValue)
//     const labels = [
//         'Minima',
//         'Máxima',
//       ];
//       const data = {
//         labels: labels,
//         datasets: [
//         {
//             label: 'Todo o dia',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [tempMinValue, tempMaxValue],
//         },
//         {
//             label: 'Sensação térmica',
//             borderColor: 'rgba(255, 159, 64, 0.2)',
//             backgroundColor: ['rgba(255, 99, 132, 0.2)'],
//             data: [14.78],

//         }
//         ]
//       };
    
//     const config = {
//         type: 'line',
//         data,
//         options: {}
//     }
    
//     new Chart(
//         document.getElementById('myChart'), config
//     )
// }


getLocalization()