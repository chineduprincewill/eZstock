import React from 'react'

const ReviewsFilter = ({ setFilter }) => {


    return (
        <div className='w-full p-4 mb-4 md:flex md:items-center md:justify-end gap-4 space-y-4 md:space-y-0 border-b border-gray-300 dark:border-gray-700 shadow-xl'>
            <select
                className='w-full md:w-[25%] p-2 rounded-md border bg-transparent'
                onChange={(e) => setFilter(e.target.value)}
            >
                <option className='dark:bg-gray-800' value="">select status</option>
                <option className='dark:bg-gray-800' value="Awaiting scoring">Awaiting scoring</option>
                <option className='dark:bg-gray-800' value="Awaiting categorization">Awaiting categorization</option>
                <option className='dark:bg-gray-800' value="Awaiting review">Awaiting review</option>
                <option className='dark:bg-gray-800' value="Approved">Approved</option>
                <option className='dark:bg-gray-800' value="Rejected">Rejected</option>
            </select>
            <button 
                className='max-w-max px-4 py-2 rounded-full border border-[#54c5d0] shadow-xl'
                onClick={() => window.location.reload()}
            >
                Reset
            </button>
        </div>
    )
}

export default ReviewsFilter