class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
        this.currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        this.geocodingUrl = 'https://api.openweathermap.org/geo/1.0/direct';
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.loadSampleData(); // Load sample data for demonstration
    }

    bindEvents() {
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchWeather();
        });

        document.getElementById('currentLocationBtn').addEventListener('click', () => {
            this.getCurrentLocationWeather();
        });
    }

    async searchWeather() {
        const location = document.getElementById('locationInput').value.trim();
        if (!location) return;

        this.showLoading();
        try {
            await this.getWeatherByCity(location);
        } catch (error) {
            this.showError('Failed to fetch weather data. Please try again.');
        }
    }

    async getCurrentLocationWeather() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser.');
            return;
        }

        this.showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    await this.getWeatherByCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                } catch (error) {
                    this.showError('Failed to fetch weather data for your location.');
                }
            },
            () => {
                this.showError('Unable to retrieve your location.');
            }
        );
    }

    async getWeatherByCity(city) {
        // For demonstration, using sample data
        this.displaySampleWeather(city);
    }

    async getWeatherByCoords(lat, lon) {
        // For demonstration, using sample data
        this.displaySampleWeather('Your Location');
    }

    displaySampleWeather(locationName) {
        // Fake weather data for demo
        const sampleData = {
            location: locationName,
            temperature: Math.floor(Math.random() * 30) + 10,
            description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
            feelsLike: Math.floor(Math.random() * 30) + 10,
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: (Math.random() * 20 + 5).toFixed(1),
            pressure: Math.floor(Math.random() * 50) + 1000,
            visibility: (Math.random() * 5 + 5).toFixed(1),
            uvIndex: Math.floor(Math.random() * 11),
            icon: 'https://openweathermap.org/img/wn/01d@2x.png'
        };

        this.displayWeather(sampleData);
        this.displayForecast();
        this.hideLoading();
    }

    displayWeather(data) {
        document.getElementById('locationName').textContent = data.location;
        document.getElementById('dateTime').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        document.getElementById('temperature').textContent = `${data.temperature}°C`;
        document.getElementById('weatherDescription').textContent = data.description;
        document.getElementById('feelsLike').textContent = `${data.feelsLike}°C`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.windSpeed} m/s`;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        document.getElementById('visibility').textContent = `${data.visibility} km`;
        document.getElementById('uvIndex').textContent = data.uvIndex;
        document.getElementById('weatherIcon').src = data.icon;

        document.getElementById('weatherDisplay').classList.remove('hidden');
    }

    displayForecast() {
        const forecastGrid = document.getElementById('forecastGrid');
        const days = ['Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const descriptions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorms'];
        
        forecastGrid.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            
            const highTemp = Math.floor(Math.random() * 30) + 15;
            const lowTemp = highTemp - Math.floor(Math.random() * 10) - 5;
            
            forecastItem.innerHTML = `
                <div class="forecast-day">${days[i]}</div>
                <img class="forecast-icon" src="https://openweathermap.org/img/wn/0${i+1}d@2x.png" alt="Weather">
                <div style="color: #666; margin: 10px 0;">${descriptions[i]}</div>
                <div class="forecast-temps">
                    <span class="high-temp">${highTemp}°</span>
                    <span class="low-temp">${lowTemp}°</span>
                </div>
            `;
            
            forecastGrid.appendChild(forecastItem);
        }
    }

    showLoading() {
        document.getElementById('loadingIndicator').classList.remove('hidden');
        document.getElementById('weatherDisplay').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
        document.getElementById('searchBtn').disabled = true;
    }

    hideLoading() {
        document.getElementById('loadingIndicator').classList.add('hidden');
        document.getElementById('searchBtn').disabled = false;
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('weatherDisplay').classList.add('hidden');
        this.hideLoading();
    }

    loadSampleData() {
        // Load demo weather for New York on startup
        setTimeout(() => {
            this.displaySampleWeather('New York');
        }, 500);
    }
}

// Real API call functions (kept for future use)
/*
async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function getWeatherByCity(city) {
    const currentWeatherUrl = `${this.currentWeatherUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    const forecastUrl = `${this.forecastUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    
    const [currentWeather, forecast] = await Promise.all([
        fetchWeatherData(currentWeatherUrl),
        fetchWeatherData(forecastUrl)
    ]);
    
    return { currentWeather, forecast };
}

async function getWeatherByCoords(lat, lon) {
    const currentWeatherUrl = `${this.currentWeatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    const forecastUrl = `${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    const [currentWeather, forecast] = await Promise.all([
        fetchWeatherData(currentWeatherUrl),
        fetchWeatherData(forecastUrl)
    ]);
    
    return { currentWeather, forecast };
}
*/

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
