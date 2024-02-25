import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([31.5204, 74.3587 ], 11);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
      maxZoom: 18
    }).addTo(map);

    const taxiIcon = L.icon({
      iconUrl: './img/avatar-1.png',
      iconSize: [70, 70]
    });

    const marker = L.marker([31.5204, 74.3587], { icon: taxiIcon }).addTo(map);

    map.on('click', function (e) {
      console.log(e);
      const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(31.5204, 74.3587),
          L.latLng(e.latlng.lat, e.latlng.lng)
          
        ]
      }).on('routesfound', function (e) {
        const routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
          setTimeout(function () {
            marker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index);
        });
      }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
