import React from 'react'

const ReviewsLabel = ({ filter }) => {
    return (
        <div className='w-full grid px-4'>
            {filter && filter !== "" && <div className='w-full grid md:flex md:items-center md:gap-4'>
                <span className='w-full md:w-[5%] dark:text-[#a8d13a]'>Status</span>
                <span className='w-full md:grow font-extralight'>{filter}</span>
            </div>}
        </div>
    )
}

export default ReviewsLabel