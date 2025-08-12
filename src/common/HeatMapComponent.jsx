import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
    lat: 7.33333, // Latitude of the center (e.g., San Francisco)
    lng: 8.75 // Longitude of the center
};

const HeatMapComponent = () => {
    const [heatmapData, setHeatmapData] = useState([]);
        
    useEffect(() => {
        // Sample data points (latitude, longitude)
        const points = [
            { location: new window.google.maps.LatLng(6.65858, 7.90102) },
            { location: new window.google.maps.LatLng(6.67889404300007, 7.89990234400005) },
            { location: new window.google.maps.LatLng(6.61118, 7.91144) },
            { location: new window.google.maps.LatLng(7.31894, 8.99775) },
            { location: new window.google.maps.LatLng(7.31894, 8.99775) },
            { location: new window.google.maps.LatLng(7.32928466800007, 9.01110839800003) },
            { location: new window.google.maps.LatLng(7.30324000000007, 8.98705000000007) },
            { location: new window.google.maps.LatLng(7.48773000000006, 9.24321000000003) },
            { location: new window.google.maps.LatLng(7.32769775400004, 8.99652099600007) },
            { location: new window.google.maps.LatLng(7.37099000000006, 9.20224000000007) },
            { location: new window.google.maps.LatLng(7.42248535100003, 9.22692871100003) },
            { location: new window.google.maps.LatLng(7.43450000000007, 9.28831000000002) },
        // Add more points as needed
        ];

        setHeatmapData(points);
    }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyAKdrTGAZX48oj9p7Z9hmyX1kCMmz8XDF4">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={8}
            >
                <HeatmapLayer data={heatmapData} />
            </GoogleMap>
        </LoadScript>
    );
};

export default HeatMapComponent;
