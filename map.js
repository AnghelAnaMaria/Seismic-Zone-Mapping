let map;

function loadScript(callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_API_KEY + '&callback=' + callback;
    document.body.appendChild(script);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 44.419565, lng: 26.103945}
    });
    loadLocations();
}

function loadLocations() {
    fetch('locations_modified.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                addMarkers(data);
            } else {
                console.error('Invalid location data');
            }
        })
        .catch(error => console.error('Error loading location data:', error));
}

function addMarkers(locations) {
    locations.forEach(function(location) {
        var marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.address
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<b>Adresa: </b>"+ location.address + "<br><b>Anul constructiei: </b>" + location.yearOfConstruction +
                "<br><b>Anul expertizei: </b>" + location.yearOfExpertise + "<br><b>Numarul de apartamente: </b>" +
                location.numberOfApartments + "<br><b>Riscul seismic: </b>" + location.seismicRisk
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);

            if (window.currentCircle) {
                window.currentCircle.setMap(null);
            }

            // Create a new circle
            window.currentCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: map,
                center: location,
                radius: 50
            });
        });

        map.addListener('click', function() {
            if (window.currentCircle) {
                window.currentCircle.setMap(null);
                window.currentCircle = null;
            }
            if (infowindow) {
                infowindow.close();
            }
        });
    });
}

window.onload = function() {
    loadScript('initMap');
};
