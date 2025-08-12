import React from 'react'

const CategorizationsLabels = ({ category, scope }) => {
    return (
        <div className='w-full grid space-y-2 px-4'>
            {category && category !== "" && <div className='w-full grid md:flex md:items-center md:gap-4'>
                <span className='w-full md:w-[10%] dark:text-[#a8d13a]'>Category</span>
                <span className='w-full md:grow font-extralight'>{category}</span>
            </div>}
            {scope && scope !== "" && <div className='w-full grid md:flex md:items-center md:gap-4'>
                <span className='w-full md:w-[10%] dark:text-[#a8d13a]'>Scope</span>
                <span className='w-full md:grow font-extralight'>{scope}</span>
            </div>}
        </div>
    )
}

export default CategorizationsLabels