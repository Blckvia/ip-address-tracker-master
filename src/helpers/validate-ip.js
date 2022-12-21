export function validateIp(ip) {
    if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ip)) {
        return true;
    }
    alert('You have to enter valid IP adress');
    return false;
}
