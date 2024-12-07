import React, { useState, useEffect } from 'react';
import "./styles/weather-style.css";

const WeatherContainer = () => {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
                setIsLoading(false);
                console.log(data);
            })
            .catch(error => console.log(error));


    }

    function error() {
        console.log("Unable to retrieve your location");
        setErrorMessage(error.message);
        setIsLoading(false);
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

        // Set interval for continuous updates every 20 s (12000 ms)
        const intervalId = setInterval(fetchWeather, 1200000);

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

    return (
        <div className="weather-container">
            <div className="weather-data">
                <h1>Weather Forecast</h1>
                <h2>{weatherData.name}</h2>
                <div className="text">
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
                <div>
                    <img src={icon} alt="weather icon"/>
                </div>
            </div>

        </div>
    );
};

export default WeatherContainer;
