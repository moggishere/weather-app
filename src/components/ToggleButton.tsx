import './ToggleButton.css'

function ToggleButton() {

    const handleChange = () => {
        // console.log('you clicked me');
    }

    return (
        <>

            <div onClick={handleChange} className='toggle-button'>

                <p id='celsius'>°C</p>
                <p> | </p>
                <p id='fahrenheit'>°F</p>

            </div>

        </>
    )
}

export default ToggleButton