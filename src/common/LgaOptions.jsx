import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { fetchActiveStateLgas } from '../apis/settingsActions';

const LgaOptions = ({ setLga_id, state_id, lga_id, lga_name }) => {

    const { token, logout } = useContext(AppContext);
    const [lgas, setLgas] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

    if(lgas?.status === "Token is Expired"){
        logout();
    }

    console.log(lga_id);

    useEffect(() => {
        fetchActiveStateLgas(token, state_id, setLgas, setError, setFetching)
    }, [state_id])

    return (
        <select 
            className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
            onChange={(e) => setLga_id(e.target.value)}
            value={lga_id && lga_id}
        >
            <option className='dark:bg-gray-800 dark:text-white' value="">
                {fetching ? 'fetching lgas...' : 'select lga'}
            </option>
        {
            (lgas && lgas.length > 0) && lgas.map(lga => (
                <option  
                    className='dark:bg-gray-800 dark:text-white' value={lga?.lga_id} key={lga?.lga_id}
                    selected={lga?.lga_id === lga_id && 'selected'}
                >
                    {lga?.lga_name}
                </option>
            ))
        }
        </select>
    )
}

export default LgaOptions