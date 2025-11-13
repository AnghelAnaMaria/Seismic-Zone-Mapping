const NodeGeocoder = require('node-geocoder');
const fs = require('fs');

const geocoderOptions = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(geocoderOptions);

async function geocodeAddresses() {
    // Read addresses from the JSON file
    const data = fs.readFileSync('output.json', 'utf8');
    const Addresa = JSON.parse(data);
    let locations = [];

    for (const address of Addresa) {
        try {
            const result = await geocoder.geocode(address);
            if (result.length > 0) {
                locations.push({
                    address: address,
                    lat: result[0].latitude,
                    lng: result[0].longitude
                });
            }
        } catch (error) {
            console.error('Error geocoding address:', address, error);
        }
    }

    // Save to a JSON file
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
    console.log('Locations processed and saved in locations.json');

    
}
geocodeAddresses();
