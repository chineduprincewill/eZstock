import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { fetchLinkageCoordinators } from '../../../apis/casefindersActions';

const LinkageCoordinators = ({ lga, setLinkageCordinator }) => {

    const { token } = useContext(AppContext);
    const [linkage_coordinators, setLinkage_coordinators] = useState(null);
    const [error, setError] = useState(null);   
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchLinkageCoordinators(token,  { lga }, setLinkage_coordinators, setError, setFetching);
    }, [])

    return (
        <select 
            className='w-full p-2 border border-gray-400'
            required
            onChange={(e) => setLinkageCordinator(e.target.value)}
        >
            <option value=''>{fetching ? 'fetching...' : 'Select'}</option>
        {
            (linkage_coordinators !== null && linkage_coordinators?.linkage_coordinators.length > 0) && linkage_coordinators?.linkage_coordinators.map(lc => {
                return <option key={lc?.id} value={lc?.fullname}>{lc?.fullname}</option>
            })
        }
        </select>
    )
}

export default LinkageCoordinators