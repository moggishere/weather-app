import { ChangeEvent, useEffect, useState } from "react";
import './Components.css'
import ToggleButton from "./ToggleButton";
import { celsiusConvert, fahrenheitConvert } from './ConvertTemp';

function Form() {

    const [input, setInput] = useState('Rio de Janeiro');

    const [temp, setTemp] = useState('loading');
    const [humidity, setHumidity] = useState('');
    const [feel, setFeel] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [weather, setWeather] = useState('');

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
    }

    function updateMessage(message: string) {
        setMessage(message);
    }

    function updateInput(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function updateTemp(temp: string) {
        setTemp(temp);
    }

    function updateHumidity(humidity: string) {
        setHumidity(humidity);
    }

    function updateFeel(feel: string) {
        setFeel(feel);
    }

    function updateMinTemp(minTemp: string) {
        setMinTemp(minTemp);
    }

    function updateMaxTemp(maxTemp: string) {
        setMaxTemp(maxTemp);
    }

    function updateWeather(weather: string) {
        setWeather(weather);
    }

    async function getAPI(place: string) {
        const apiKey = '95fee964ced32e496e2999d4b411aa78';

        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`);
            const data = await response.json();
            console.log(data.main.temp - 273.15);

            updateMessage(`the temperature in ${data.name}, ${data.sys.country} is `);
            updateTemp(`${Math.round(celsiusConvert(data.main.feels_like)).toString()}`);

            updateHumidity(`${data.main.humidity}`);
            updateFeel(`${Math.round(celsiusConvert(data.main.feels_like)).toString()}`);
            updateMinTemp(`${Math.round(celsiusConvert(data.main.feels_like)).toString()}`);
            updateMaxTemp(`${Math.round(celsiusConvert(data.main.feels_like)).toString()}`);
            
            updateWeather(`${data.weather[0].main}`);

            return (data.main.temp - 273.15);
        } catch (err) {
            // updateTemp('Error');
            alert('Error');
            return err;
        }

    }

    useEffect(() => {
        handleSubmit({ preventDefault: () => { } });
    }, []);

    useEffect(() => {
        
    }, [isCelsius]);

    return (
        <>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='city'>city name:</label>
                <input id='city' type="text" name="city" value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => updateInput(e)} />
                <button type='submit'>get weather</button>
            </form>

            <div className='showWeather'>
                <span className='temperature'>
                    <h3>{message}</h3>
                    <span>
                        <h3>{weather}</h3>
                        <h1>{temp}{notation}</h1>
                        <h3>min {minTemp}{notation} | max {maxTemp}{notation}</h3>
                    </span>


                </span>
                <span className="temperature">
                    <h3>feeling {feel}{notation}</h3>
                    <h3> humidity {humidity}%</h3>
                </span>

            </div>

            {/* <button>°C / °F</button> */}

            <div onClick={handleClickNotation}>
                <ToggleButton />
            </div>
            


        </>
    )
}

export default Form;