function celsiusConvert(temp: number) {
    return temp - 273.15;
}

function fahrenheitConvert(temp: number) {
    return 1.8 * (temp - 273.15) + 32;
}

export { celsiusConvert, fahrenheitConvert };