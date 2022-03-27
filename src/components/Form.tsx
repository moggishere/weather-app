import { ChangeEvent, useEffect, useState } from "react";
import './Components.css'
import ToggleButton from "./ToggleButton";
import {
    celsiusConvert, fahrenheitConvert, celsiusToFahrenheit, fahrenheitToCelsius
} from './ConvertTemp';

function Form() {

    const [input, setInput] = useState('Rio de Janeiro');

    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [feel, setFeel] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [weather, setWeather] = useState('');

    const [weatherImg, setWeatherImg] = useState('');
    const [weatherURL, setWeatherURL] = useState('');

    const [notation, setNotation] = useState('°C');
    const [isCelsius, setIsCelcius] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(input);
        getAPI(input);
    }

    const handleClickNotation = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsCelcius(!isCelsius);

        if (isCelsius === false) {
            setNotation('°C');
        } else if (isCelsius === true) {
            setNotation('°F');
        }
    }

    function updateMessage(message: string) {
        setMessage(message);
    }

    function updateInput(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function updateTemp(temp: number) {
        setTemp(temp);
    }

    function updateHumidity(humidity: number) {
        setHumidity(humidity);
    }

    function updateFeel(feel: number) {
        setFeel(feel);
    }

    function updateMinTemp(minTemp: number) {
        setMinTemp(minTemp);
    }

    function updateMaxTemp(maxTemp: number) {
        setMaxTemp(maxTemp);
    }

    function updateWeather(weather: string) {
        setWeather(weather);
    }

    function updateWeatherImg(weatherImg: string) {
        setWeatherImg(weatherImg);
        setWeatherURL(`http://openweathermap.org/img/wn/${weatherImg}@2x.png`);
    }

    async function getAPI(place: string) {
        const apiKey = '95fee964ced32e496e2999d4b411aa78';

        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`);
            const data = await response.json();
            console.log(data.main.temp - 273.15);
            updateMessage(`In ${data.name}, ${data.sys.country} it is `);
            updateWeatherImg(data.weather[0].icon);
            
            if (isCelsius === true) {

                updateTemp(Math.round(celsiusConvert(data.main.temp)));

                updateHumidity(data.main.humidity);
                updateFeel(Math.round(celsiusConvert(data.main.feels_like)));
                updateMinTemp(Math.round(celsiusConvert(data.main.temp_min)));
                updateMaxTemp(Math.round(celsiusConvert(data.main.temp_max)));

                updateWeather(`${data.weather[0].main}`);
            } else if (isCelsius === false) {
                updateTemp(Math.round(fahrenheitConvert(data.main.temp)));

                updateHumidity(data.main.humidity);
                updateFeel(Math.round(fahrenheitConvert(data.main.feels_like)));
                updateMinTemp(Math.round(fahrenheitConvert(data.main.temp_min)));
                updateMaxTemp(Math.round(fahrenheitConvert(data.main.temp_max)));

                updateWeather(`${data.weather[0].main}`);
            }

            return (data.main.temp - 273.15);
        } catch (err) {
            // updateTemp('Error');
            alert('Error');
            return err;
        }

    }

    useEffect(() => { //inputs Rio de Janeiro upon load
        handleSubmit({ preventDefault: () => { } });
    }, []);

    useEffect(() => { //updates the temperature from celsius or fahrenheit upon change
        if (isCelsius === true) {
            updateTemp(Math.round(fahrenheitToCelsius(temp)));
            updateFeel(Math.round(fahrenheitToCelsius(feel)));
            updateMinTemp(Math.round(fahrenheitToCelsius(minTemp)));
            updateMaxTemp(Math.round(fahrenheitToCelsius(maxTemp)));
        } else if (isCelsius === false) {
            updateTemp(Math.round(celsiusToFahrenheit(temp)));
            updateFeel(Math.round(celsiusToFahrenheit(feel)));
            updateMinTemp(Math.round(celsiusToFahrenheit(minTemp)));
            updateMaxTemp(Math.round(celsiusToFahrenheit(maxTemp)));
        }
    }, [isCelsius]);

    return (
        <>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit} className='form-submit'>
                <label htmlFor='city'>city name:</label>
                <input id='city' type="text" name="city" value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => updateInput(e)} />
                <button type='submit' className="weather-button">get weather</button>
            </form>

            <div className='showWeather'>
                <span className='temperature'>
                    <p>{message}</p>
                    <span className="main-info">
                        <h5>{weather}</h5>
                        <img src={weatherURL} alt="weather" />
                        <h2>{temp}{notation}</h2>
                        <h5>min {minTemp}{notation} | max {maxTemp}{notation}</h5>
                    </span>


                </span>
                <span className="temperature">
                    <p>feeling {feel}{notation}</p>
                    <p> humidity {humidity}%</p>
                </span>

            </div>

            <div onClick={handleClickNotation}>
                <ToggleButton />
            </div>



        </>
    )
}

export default Form;