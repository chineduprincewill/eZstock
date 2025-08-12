import React, { useContext, useEffect, useState } from 'react'
import FilledMapComponent from '../../common/FilledMapComponent'
import { AppContext } from '../../context/AppContext';
import { fetchWardLevelPositivesSummary, getTotalPositives } from '../../apis/dashboardActions';
import { generateRanges, getColor, getTotalWardPositives } from '../../apis/functions';
import { MdOutlineZoomOutMap } from 'react-icons/md';

const TestJson = ({ height, zoom }) => {

    const { token } = useContext(AppContext);
    const [markers, setMarkers] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [finalmarkers, setFinalmarkers] = useState();
    const [selectedState, setSelectedState] = useState('Benue');
    const [wardCounts, setWardCounts] = useState();
    const [arrofranges, setArrofranges] = useState();

    const geojsonUrl = '/assets/data.geojson';

    const generateFinalMarkers = (arr1, arr2) => {
        let finalArr = [];
        arr1.map(maker => {
            arr2.map(wc => {
                if(maker.properties.wardname.toUpperCase() === wc.ward){
                    maker.properties.value = wc.count;
                }
                finalArr.push(maker)
            })
        })
        return finalArr
    }

    useEffect(() => {
        if(markers && wardCounts){
            console.log(generateFinalMarkers(markers, wardCounts?.wardCounts))
        }
    }, [markers, wardCounts])

    useEffect(() => {

        // Use the fetch API to load the GeoJSON file
        fetch(geojsonUrl)
        .then(response => {
            // Check if the response is OK (status code 200)
            if (!response.ok) {
            throw new Error('Failed to load GeoJSON file');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(geojsonData => {
            // Successfully loaded the GeoJSON data
            console.log(geojsonData);
            // You can now work with the GeoJSON data
            // Example: Access the features of the GeoJSON
            const features = geojsonData.features;
            setMarkers(features.filter(ft => ft?.properties?.statename === selectedState));
        })
        .catch(error => {
            // Handle any errors
            console.error('Error reading GeoJSON file:', error);
        });

    }, [])

    useEffect(() => {
        setArrofranges(generateRanges(wardCounts?.upperrange, 9));
        //wardCounts && console.log(generateRanges(wardCounts.wardCounts[0].count, 7));
        //wardCounts ? console.log(wardCounts.upperrange) : console.log('Ward counts not loaded yet!')
        //wardCounts && console.log(wardCounts)
    }, [wardCounts])

    useEffect(() => {
        fetchWardLevelPositivesSummary(token, { state: selectedState}, setWardCounts, setError, setFetching)
    }, [])

    return (
        <div className='w-full z-10'>
            {
                markers ? <FilledMapComponent markers={markers && markers} selectedState={selectedState} arrofranges={arrofranges && arrofranges} height={height} zoom={zoom} />
                : 
                <h1 className='text-xl text-green-600'>Data loading...</h1>
            }
        </div>
    )
}

export default TestJson