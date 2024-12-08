import React, { useState, useEffect } from 'react';
import "./styles/weather-style.css";

const WeatherContainer = () => {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [UVIndex, setUVIndex] = useState(null);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(location);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);


        // Make API call to OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=57dd333c2d82cdda58e5cbae88bd2dfa&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                console.log(data);

                fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=57dd333c2d82cdda58e5cbae88bd2dfa`)
                    .then(response => response.json())
                    .then(data => {
                        setUVIndex(data);
                        setIsLoading(false);
                        console.log(data);
                    })
                    .catch(error => { console.log(error); setErrorMessage(error); });
            })
            .catch(error => console.log(error));
    }

    function error() {
        console.log("Unable to retrieve your location");
        setLocation({ latitude: 46.770439, longitude: 23.591423 });
        console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);


        // Make API call to OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=57dd333c2d82cdda58e5cbae88bd2dfa&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                console.log(data);

                fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${location.latitude}&lon=${location.longitude}&appid=57dd333c2d82cdda58e5cbae88bd2dfa`)
                    .then(response => response.json())
                    .then(data => {
                        setUVIndex(data);
                        setIsLoading(false);
                        console.log(data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const fetchWeather = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                console.log("Geolocation not supported");
            }
        };

        // Initial fetch
        fetchWeather();

        // Set interval for continuous updates every 1 m (60 000 ms)
        const intervalId = setInterval(fetchWeather, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (isLoading) {
        return <div className="weather-data">Loading weather data...</div>;
    }

    if (errorMessage) {
        return <div className="weather-data">Error: {errorMessage}</div>;
    }

    let icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    console.log(icon);

    let uvMessage = '';
    let uvStyle = {};
    if (UVIndex.value < 3) {
        uvMessage = 'Low UV index: You can safely enjoy being outside. Use sunscreen SPF 15+.';
        uvStyle = { color: 'green', textAlign: 'end'  };
    } else if (UVIndex.value >= 3 && UVIndex.value <= 5) {
        uvMessage = 'Moderate UV index: Take precautions. Use sunscreen SPF 30+ and seek shade during midday.';
        uvStyle = { color: 'green', textAlign: 'end'  };
    } else if (UVIndex.value >= 6 && UVIndex.value <= 7) {
        uvMessage = 'High UV index: Protection needed. Use sunscreen SPF 30+, wear a hat, and seek shade.';
        uvStyle = { color: 'red', textAlign: 'end'  };
    } else if (UVIndex.value >= 8 && UVIndex.value <= 10) {
        uvMessage = 'Very High UV index: Extra protection required. Avoid being outside during midday.';
        uvStyle = { color: 'red', textAlign: 'end' };
    } else if (UVIndex.value >= 11) {
        uvMessage = 'Extreme UV index: Take all precautions. Avoid the sun during midday hours.';
        uvStyle = { color: 'red', textAlign: 'end' };
    }

    let extremeMessage = '';
    let extremeStyle;
    if (weatherData.weather[0].id % 100 === 2) {
        extremeMessage = 'Thunderstorm alert!';
        extremeStyle = { color: 'red', textAlign: 'end'};
    } else if (weatherData.weather[0].id >= 502 && weatherData.weather[0].id <= 505) {
        extremeMessage = 'Heavy rain alert!';
        extremeStyle = { color: 'red', textAlign: 'end'};
    } else if (weatherData.weather[0].id === 602 || weatherData.weather[0].id === 622) {
        extremeMessage = 'Heavy snow alert!';
        extremeStyle = { color: 'red', textAlign: 'end'};
    } else if (weatherData.weather[0].id % 100 === 7) {
        extremeMessage = 'Severe atmospheric conditions!';
        extremeStyle = { color: 'red', textAlign: 'end'};
    } else {
        extremeMessage = 'Normal weather conditions.';
        extremeStyle = { color: 'green' , textAlign: 'end'};
    }

    let visibilityMessage = '';
    let visibilityStyle;
    if (weatherData.visibility < 500) {
        visibilityMessage = 'Low visibility!';
        visibilityStyle  = { color: 'red', textAlign: 'end'};
    } else {
        visibilityMessage = 'Normal visibility.';
        visibilityStyle = { color: 'green' , textAlign: 'end'};
    }

    return (
        <div className="weather-container">
            <div className="weather-data">
                <h1>Weather Forecast</h1>
                <h2>{weatherData.name}</h2>
                <p>_____________________________</p>
                <div className="text">
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p>Visibility: {weatherData.visibility} m</p>
                    <p>UV Index: {UVIndex.value}</p>
                </div>
            </div>
            <div className="weather-data">
                <img src={icon} alt="weather icon"/>
                <p>--------------------------------------------------</p>
                <p style={extremeStyle}>{extremeMessage}</p>
                <p style={visibilityStyle}>{visibilityMessage}</p>
                <p style={uvStyle}>{uvMessage}</p>
            </div>
        </div>
    );
};

export default WeatherContainer;
