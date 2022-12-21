import { validateIp } from './helpers';

const IpInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

btn.addEventListener('click', getData);
IpInput.addEventListener('keydown', handleKey);

function getData() {
    if (validateIp(IpInput.value)) {
        fetch(
            `https://geo.ipify.org/api/v2/country?apiKey=at_ZvVlreKQbsPMQww73QgupwfNL2UJP&ipAddress=${IpInput.value}`
        )
            .then((response) => response.json())
            .then(console.log);
    }
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}
