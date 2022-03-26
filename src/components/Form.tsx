import { ChangeEvent, useState } from "react";

function Form() {

    const [input, setInput] = useState('London');

    const [temp, setTemp] = useState('loading');
    const [humidity, setHumidity] = useState('');
    const [feel, setFeel] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');

    const [notation, setNotation] = useState('°C');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(input);
        console.log(`humidity is ${humidity}`);
        console.log(`feel is ${feel}`);
        console.log(`minTemp is ${minTemp}`);
        console.log(`maxTemp is ${maxTemp}`);
        getAPI(input);
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

    async function getAPI(place: string) {
        const apiKey = '95fee964ced32e496e2999d4b411aa78';

        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`);
            const data = await response.json();
            console.log(data.main.temp - 273.15);

            updateMessage(`the temperature in ${data.name}, ${data.sys.country} is `);
            updateTemp(`${Math.round((data.main.temp - 273.15)).toString()}`);

            updateHumidity(`${data.main.humidity}`);
            updateFeel(`${Math.round((data.main.feels_like - 273.15)).toString()}`);
            updateMinTemp(`${Math.round((data.main.temp_min - 273.15)).toString()}`);
            updateMaxTemp(`${Math.round((data.main.temp_max - 273.15)).toString()}`);

            return (data.main.temp - 273.15);
        } catch (err) {
            updateTemp('Error');
            alert('Error');
            return err;
        }

    }

    return (
        <>
            <h3>Weather App</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='city'>city name:</label>
                <input id='city' type="text" name="city" value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => updateInput(e)} />
                <button type='submit'>get weather</button>
            </form>

            <div className='showWeather'>
                <h3>{message}</h3>
                <h3>{temp}{notation}</h3>
                <h3>{humidity}%</h3>
                <h3>{feel}{notation}</h3>
                <h3>{minTemp}{notation}</h3>
                <h3>{maxTemp}{notation}</h3>
            </div>

        </>
    )
}

export default Form;