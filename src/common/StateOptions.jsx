import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { fetchActiveStates } from '../apis/settingsActions';

const StateOptions = ({ setState_id, state_id, state_name }) => {

    const { token, logout } = useContext(AppContext);
    const [states, setStates] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

    if(states?.status === "Token is Expired"){
        logout();
    }

    useEffect(() => {
        fetchActiveStates(token, setStates, setError, setFetching)
    }, [])

    return (
        <select 
            className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
            onChange={(e) => setState_id(e.target.value)}
            value={state_id && state_id}
        >
            <option  className='dark:bg-gray-800 dark:text-white' value="">
                {fetching ? 'fetching states...' : 'select state'}
            </option>
        {
            (states && states?.states.length > 0) && states?.states.map(state => (
                <option 
                    className='dark:bg-gray-800 dark:text-white' value={state?.state_id} key={state?.state_id}
                    selected={state?.state_id === state_id && 'selected'}
                >
                    {state?.state_name}
                </option>
            ))
        }
        </select>
    )
}

export default StateOptions