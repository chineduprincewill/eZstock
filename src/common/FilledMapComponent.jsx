import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getColor } from '../apis/functions';

const geojsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": { "name": "Region 1", "value": 10 },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-73.935242, 40.730610],
              [-74.935242, 40.730610],
              [-74.935242, 41.730610],
              [-73.935242, 41.730610],
              [-73.935242, 40.730610]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": { "name": "Region 2", "value": 20 },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-74.935242, 40.730610],
              [-75.935242, 40.730610],
              [-75.935242, 41.730610],
              [-74.935242, 41.730610],
              [-74.935242, 40.730610]
            ]
          ]
        }
      }
    ]
  };

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

const { BaseLayer } = LayersControl;

const FilledMapComponent = ({ markers, selectedState, arrofranges, height, zoom }) => {

    const [mapData, setMapData] = useState(null);

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

    useEffect(() => {
        // You can load GeoJSON dynamically or from an API here
        setMapData({
            "type": "FeatureCollection",
            "features": markers
        });
        console.log(markers);
    }, []);

    // Function to style the filled regions based on data properties
    const style = (feature) => {
        return {
        fillColor: getColor(arrofranges, feature.properties.value),
        weight: 1,
        color: 'gray',
        dashArray: '3',
        fillOpacity: 0.7,
        };
    };

    // Function to highlight features when hovered
    const onEachFeature = (feature, layer) => {
        layer.on({
        mouseover: (e) => {
            const layer = e.target;
            layer.setStyle({
            weight: 3,
            color: 'gray',
            fillOpacity: 0.7,
            });
            layer.bindTooltip(`
                <strong>Ward:</strong> ${feature.properties.wardname}<br>
                <strong>LGA:</strong> ${feature.properties.lganame}<br>
                ${feature.properties.value !== undefined ? '<strong>Positives:</strong>'+feature.properties.value : ''}
            `, {
                permanent: false,
                direction: 'center'
            }).openTooltip();
        },
        mouseout: (e) => {
            const layer = e.target;
            layer.setStyle({
            weight: 1,
            color: 'gray',
            fillOpacity: 0.7,
            });
        },
        });
    };

    return (
        <MapContainer center={getStateCenterCord(selectedState)} zoom={zoom} style={{ height: height, width: "100%" }}>
            <LayersControl>
            {/* Standard Map View */}
                <BaseLayer checked name="Standard Map">
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                    />
                </BaseLayer>

                {/* Satellite Map View */}
                <BaseLayer name="Satellite View">
                    <TileLayer
                    url="https://{s}.tile.satellite.provider/{z}/{x}/{y}.jpg"
                    attribution="&copy; Satellite provider"
                    />
                </BaseLayer>
            </LayersControl>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapData && (
                <GeoJSON data={mapData} style={style} onEachFeature={onEachFeature} />
            )}
        </MapContainer>
    );
}

export default FilledMapComponent