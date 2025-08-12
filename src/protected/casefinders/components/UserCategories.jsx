import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { fetchUsercategories } from '../../../apis/casefindersActions';

const UserCategories = ({ setUsercategory }) => {

    const { token } = useContext(AppContext);
    const [usercategories, setUsercategories] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchUsercategories(token, setUsercategories, setError, setFetching);
    }, [])

    return (
        <div className='px-4'>
            <select 
                className='w-full md:w-48 p-2 border border-gray-400 bg-transparent text-gray-500'
                required
                onChange={(e) => setUsercategory(e.target.value)}
            >
                <option value=''>{fetching ? 'fetching...' : 'filter by category'}</option>
            {
                (usercategories !== null && usercategories?.usercategories.length > 0) && usercategories?.usercategories.map((uc, index) => {
                    return <option key={index} value={uc?.usercategory}>{uc?.usercategory}</option>
                })
            }
            </select>
        </div>
    )
}

export default UserCategories