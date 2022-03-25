import './Components.css'
import Form from './Form';
import ShowWeather from './ShowWeather';

function Body() {
    return (
        <>    
            <div className='body'>
                <Form />
                <ShowWeather />
            </div>
        </>
    )
}

export default Body;