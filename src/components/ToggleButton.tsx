import { useEffect, useState } from 'react';
import './ToggleButton.css';

function ToggleButton() {

    const [isCelsius, setIsCelcius] = useState(true);
    const [celsius, setCelcius] = useState('highlighted-text');
    const [fahrenheit, setFahrenheit] = useState('');

    useEffect(() => {
        // console.log(`isCelcius is ${isCelsius}`)

        if (isCelsius === false) {
            setCelcius('');
            setFahrenheit('highlighted-text');
        } else if (isCelsius === true) {
            setFahrenheit('');
            setCelcius('highlighted-text');
        }
    }, [isCelsius]);

    const handleChange = () => {
        setIsCelcius(!isCelsius);
    }

    return (
        <>

            <div onClick={handleChange} className='toggle-button'>

                <p id='celsius' className={celsius}>°C</p>
                <p> | </p>
                <p id='fahrenheit' className={fahrenheit}>°F</p>

            </div>

        </>
    )
}

export default ToggleButton