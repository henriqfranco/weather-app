const apiKey = '7c5f8544b82726aadf76dced39f08d9c'

const showTemp = document.querySelector('.temperature');
const showCityName = document.querySelector('.city-name');
const showHumidity = document.querySelector('.humidity');
const showWindSpeed = document.querySelector('.wind');
const showWeekDay = document.querySelector('.weekday');
const cityNameBtn = document.getElementById('getCityName');
const cityInput = document.getElementById('cityName');

function getWeatherInfo(url) {
    fetch(url).then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Location not found. Please enter a valid name.');
            } else {
                throw new Error('There has been a problem with your fetch operation.');
            }
        }
        return response.json();
    }).then(data => {
        showTemp.textContent = `${data.main.temp} °C`;
        showCityName.textContent = data.sys.country ? `${data.name}, ${data.sys.country}` : data.name;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const currentDay = daysOfWeek[currentDate.getDay()];
        showWeekDay.textContent = currentDay;
        showHumidity.textContent = `${data.main.humidity}%`;
        showWindSpeed.textContent = `${data.wind.speed} km/h`;
    }).catch(error => {
        showModal(error.message);
    });
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultCityName = 'Volta Redonda'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(defaultCityName)}&appid=${apiKey}&units=metric&lang=en_us`;

    getWeatherInfo(url);
})

cityNameBtn.addEventListener('click', () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityInput.value)}&appid=${apiKey}&units=metric&lang=en_us`;
    if (!cityInput.value.trim()) {
        showModal('Location name cannot be empty. Please enter a valid name.');
        return;
    }
    getWeatherInfo(url);
})

cityInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityInput.value)}&appid=${apiKey}&units=metric&lang=en_us`;
        if (!cityInput.value.trim()) {
            showModal('Location name cannot be empty. Please enter a valid name.');
            return;
        }
        getWeatherInfo(url);
    }
})