function celsiusConvert(temp: number) {
    return temp - 273.15;
}

function fahrenheitConvert(temp: number) {
    return 1.8 * (temp - 273.15) + 32;
}

function celsiusToFahrenheit(temp: number) {
    return (temp * 9 / 5) + 32;
}

function fahrenheitToCelsius(temp: number) {
    return (temp - 32) * 5 / 9;
}

export {
    celsiusConvert,
    fahrenheitConvert,
    celsiusToFahrenheit,
    fahrenheitToCelsius
};