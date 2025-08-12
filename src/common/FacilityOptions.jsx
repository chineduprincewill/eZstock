import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { fetchActiveLgaFacilities } from '../apis/settingsActions';

const FacilityOptions = ({ setFacility_id, lga_id, facility_id, facility_name }) => {

    const { token } = useContext(AppContext);
    const [facilities, setFacilities] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchActiveLgaFacilities(token, lga_id, setFacilities, setError, setFetching)
    }, [lga_id])
    
    return (
        <select 
            className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
            onChange={(e) => setFacility_id(e.target.value)}
            value={facility_id && facility_id}
        >
            <option  className='dark:bg-gray-800 dark:text-white' value="">
                {fetching ? 'fetching facilities...' : 'select facility'}
            </option>
        {
            (facilities && facilities.length > 0) && facilities.map(facility => (
                <option 
                    className='dark:bg-gray-800 dark:text-white' value={facility?.facility_id} key={facility?.facility_id}
                    selected={facility?.facility_id === facility_id && 'selected'}
                >
                    {facility?.facility_name}
                </option>
            ))
        }
        </select>
    )
}

export default FacilityOptions