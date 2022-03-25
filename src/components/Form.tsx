import { ChangeEvent, useState } from "react";

function Form() {

    const [input, setInput] = useState('London');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(input);
        getAPI(input);
    }

    function updateInput(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    async function getAPI(place: string) {
        const err = 'Error';

        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=95fee964ced32e496e2999d4b411aa78`);
            const data = await response.json();
            console.log(data.main.temp - 273.15);
            return (data.main.temp - 273.15);
        } catch {
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


        </>
    )
}

export default Form;