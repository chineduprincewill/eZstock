import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { fetchActiveItemCategories } from '../apis/settingsActions';

const ItemCategoryOptions = ({ setCategory_id, category_id }) => {

    const { token } = useContext(AppContext);
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

    console.log(category_id);

    useEffect(() => {
        fetchActiveItemCategories(token, setCategories, setError, setFetching)
    }, [])

    return (
        <select 
            className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
            onChange={(e) => setCategory_id(e.target.value)}
            value={category_id && category_id}
        >
            <option className='dark:bg-gray-800 dark:text-white' value="">
                {fetching ? 'fetching categories...' : 'select category'}
            </option>
        {
            (categories && categories.length > 0) && categories.map(category => (
                <option  
                    className='dark:bg-gray-800 dark:text-white' 
                    value={category?.category_id} key={category?.category_id}
                    selected={category?.category_id === category_id && 'selected'}
                >
                    {category?.category_name}
                </option>
            ))
        }
        </select>
    )
}

export default ItemCategoryOptions