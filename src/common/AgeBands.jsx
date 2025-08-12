import React, { useEffect, useState } from 'react'

const AgeBands = ({ setAge }) => {

    const [agebands, setAgebands] = useState();

    const generateAgebands = () => {
        let bands = [];
        for(let i = 0; i <= 50; i += 5){
            if(i >= 50){
                bands.push(`${i}+`);
            }
            else{
                bands.push(`${i} - ${i+4}`);
            }
        }
        setAgebands(bands);
    }

    useEffect(() => {
        generateAgebands();
    }, [])

    return (
        <select
                className='border-b border-gray-400 dark:border-gray-700 dark:bg-transparent p-2 text-sm text-gray-500'
                onChange={(e) => setAge(e.target.value)}
        >   
            <option value="">Age band</option>
        {
            agebands && agebands.length > 0 && agebands.map((agb, index) => <option key={index} value={agb}>{agb}</option>)
        }
        </select>
    )
}

export default AgeBands