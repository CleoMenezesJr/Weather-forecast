let cityName = document.querySelector('#cityName')
let temp = document.querySelector('#temp')
let tempDescription = document.querySelector('#tempDesc')
let dayNow = document.querySelector('#dayNow')

let loadingIcon = document.querySelector('.loadingIcon')
let tempclearDayIcon = document.querySelector('#clearDay')
let tempclearNightIcon = document.querySelector('#clearNight')
let mist = document.querySelector('#mist')
let brokeClouds = document.querySelector('#brokeClouds')
let cloudy = document.querySelector('#cloudy')
let scattered = document.querySelector('#scattered')
let rainHeavy = document.querySelector('#rainHeavy')
let drizzle = document.querySelector('#drizzle')
let cloudmoon = document.querySelector('#cloudMonn')
let cloudsun = document.querySelector('#cloudSun')

let date = new Date()
let dayName = new Array("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", 'sábado') 

let humidity = document.querySelector('#humidity')
let wind = document.querySelector('#wind')
let pressure = document.querySelector('#pressure')



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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-36.60664&lon=-72.10344&appid=d53aea542dc80b68d34fe89716185c70&lang=pt&units=metric`)
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d53aea542dc80b68d34fe89716185c70&lang=pt&units=metric`)
    .then(response => response.json())
    .then(datah => {
        const cityNameValue = datah['name'];
        const tempValue = datah['main']['temp']
        const tempDescValue = datah['weather'][0]['description']

        const tempMinValue = datah['main']['temp_min']
        const tempMaxValue = datah['main']['temp_max']
        const feelsLikeValue = datah['main']['feels_like']

        const humidityData =datah['main']['humidity']
        const windData = datah['wind']['speed']
        const pressureData = datah['main']['pressure']

        cityName.innerHTML = cityNameValue
        temp.innerHTML = `${parseInt(tempValue)}°C`
        tempDescription.innerHTML = tempDescValue
        const hour = date.getHours()
        const minutes = date.getMinutes()
        dayNow.innerHTML = `${dayName[date.getDay()]},
        ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`


        if (tempDescValue == 'céu limpo') {

            loadingIcon.style.display='none'
            if (date.getHours() >= 18 || date.getHours() <= 4) {
                tempclearNightIcon.style.display='flex'
            } else if (date.getHours() >= 5 || date.getHours() <= 17) {
                tempclearDayIcon.style.display='flex'
            }

        } else if (tempDescValue == 'nevoeiro' || tempDescValue == 'névoa') {

            loadingIcon.style.display='none'
            mist.style.display='flex'

        } else if (tempDescValue == 'nuvens quebradas') {
            loadingIcon.style.display='none'
            brokeClouds.style.display='flex'

        } else if (tempDescValue == 'nublado') {
            loadingIcon.style.display='none'
            cloudy.style.display='flex'

        } else if (tempDescValue == 'nuvens dispersas') {
            loadingIcon.style.display='none'
            scattered.style.display='flex'
        } else if (tempDescValue == 'chuva forte') {
          loadingIcon.style.display='none'
          rainHeavy.style.display='flex'
        } else if (tempDescValue == 'chuva moderada' || tempDescValue == 'chuva fraca') {
          loadingIcon.style.display='none'
          drizzle.style.display='flex'

        } else if (tempDescValue == 'céu pouco nublado') {

          loadingIcon.style.display='none'
            if (date.getHours() >= 18 || date.getHours() <= 4) {
                cloudmoon.style.display='flex'
            } else if (date.getHours() >= 5 || date.getHours() <= 17) {
                cloudsun.style.display='flex'
            }
        }


        if (screen.width <= 430) {
          let mainChart = document.querySelector('#myChart')
          mainChart.style.display="none"
          let mobileChart = document.querySelector('#mobileChart')
          mobileChart.style.display="initial"
        
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
                    backgroundColor: '#46DAAF',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [tempValue, tempMinValue, tempMaxValue, feelsLikeValue],
                }
                ]
            };
            
            var delayed;
            const config = {
              type: 'bar',
              data: data,
              options: {
                indexAxis: 'y',
                responsive: true,
                animation: {
                  onComplete: () => {
                    delayed = true;
                  },
                  delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
                }
              }
            };
            
            
            new Chart(
                document.getElementById('mobileChart'), config
            )
        } else {

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
                    backgroundColor: '#46DAAF',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [tempValue, tempMinValue, tempMaxValue, feelsLikeValue],
                }
                ]
            };
            
            var delayed;
            const config = {
              type: 'bar',
              data: data,
              options: {
                responsive: true,
                animation: {
                  onComplete: () => {
                    delayed = true;
                  },
                  delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
                }
              }
            };
            
            
            new Chart(
                document.getElementById('myChart'), config
            )
        }

        // footer info
        
        
        humidity.innerHTML = `${humidityData}%`
        wind.innerHTML = `${windData} km/h`
        pressure.innerHTML = `${pressureData} hPa`

        
    })

    .catch(err => alert("Can't get your city!"))
}



getLocalization()