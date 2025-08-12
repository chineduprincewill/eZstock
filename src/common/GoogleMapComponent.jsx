import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import SectionLoader from './SectionLoader';
import NotificationLoader from './NotificationLoader';

// Define the container and map styles
const containerStyle = {
    width: '100%',
    height: '400px'
};

// Center position of the map
const statecords = [
    {
        state: "Benue",
        lat: 7.33333,
        lng: 8.75
    },
    {
        state: "Ondo",
        lat: 7.16667,
        lng: 5.08333
    },
    {
        state: "Ogun",
        lat: 7.16083330,
        lng: 3.34833330
    },
    {
        state: "Oyo",
        lat: 8.0,
        lng: 4.0
    },
    {
        state: "Plateau",
        lat: 9.16667,
        lng: 9.75
    },
]

const GoogleMapComponent = ({ loading, selectedState, markers }) => {

    const [googleMaps, setGoogleMaps] = useState(window.google);

    console.log(markers);

    const defaultIcon = {
        url: '/assets/marker3.png', // Google Maps default red marker
        scaledSize: googleMaps && new window.google.maps.Size(2, 2), // Resize the marker
    };

    const getStateCenterCord = (val) => {
        let cord;
        statecords.map(stc => {
            if(stc.state === val){
                cord = {
                    lat: stc.lat,
                    lng: stc.lng
                }
            }
        })
        return cord;
    }

    const defaultCenter = {
        lat: 9.077751,
        lng: 8.6774567
    }

    useEffect(() => {
        console.log(getStateCenterCord(selectedState));
    }, [])

    return (
        <div>
        { loading && <NotificationLoader /> }    
            <LoadScript googleMapsApiKey="AIzaSyAKdrTGAZX48oj9p7Z9hmyX1kCMmz8XDF4">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedState !== null ? getStateCenterCord(selectedState) : defaultCenter}
                    zoom={8}
                    className='bg-red-500'
                >
                {/* Map through the markers array and render each marker */}
                    {markers && markers.length > 0 ? markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={defaultIcon}
                    />
                    ))
                    :
                    <Marker
                        position={defaultCenter}
                        icon={defaultIcon}
                    />
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapComponent