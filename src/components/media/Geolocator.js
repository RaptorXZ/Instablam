import './Media.css';

export function Geolocator() {
    if ( 'geolocation' in navigator ) {
        navigator.geolocation.getCurrentPosition(
            onSuccess,
        error => {

        });
    } else {

    };
}

async function onSuccess(pos) {
    await findPosition(pos.coords.latitude, pos.coords.longitude).then((value) => showAddress(value));
}

async function findPosition(lat, lon) {
    try {
        const response = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json&auth=410494555581843485601x48523`)
        // 189368438552696155195x20510
        const data = await response.json();
        if ( data.error ) {
            console.log(data.error.message);
            return null;
        }
        
        return data;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

async function showAddress(address) {
    const locationElement = await document.querySelector('#photo-location');
    if (locationElement && address) {
        locationElement.innerHTML = await `${address.country} <br> ${address.city} <br> ${address.staddress}`

        // Save location in local storage
        let geolocale = await locationElement.innerHTML;
        localStorage.setItem('geoData', geolocale);
    }
}
