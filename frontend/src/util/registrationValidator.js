export function validateUsername(value) {
    return /^[A-Za-zА-я0-9]+_*([A-Za-zА-я0-9]+)?$/.test(value);
}


export function validateEmail(value) {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
}