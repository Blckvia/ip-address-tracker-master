import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { addOffset, addTileLayer, getAdress, validateIp } from './helpers';

const IpInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
import icon from '../images/icon-location.svg';

btn.addEventListener('click', getData);
IpInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,

    iconSize: [30, 40], // size of the icon
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
});

addTileLayer(map);
L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
    if (validateIp(IpInput.value)) {
        getAdress(IpInput.value).then((data) => setInfo(data));
    }
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData);
    const { lat, lng, country, region, timezone } = mapData.location;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${country} ${region}`;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    if (matchMedia('max-width: 1023px').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAdress('102.22.22.1').then(setInfo);
});
