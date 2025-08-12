import React from 'react'

const LoadingBars = () => {
    return (
        <div className='w-full space-y-4'>
            <div className='w-full flex justify-between items-center animate-pulse'>
                <div className='w-[65%] bg-gray-200 dark:bg-gray-700 p-4 rounded-l-md'></div>
                <div className='w-[33%] bg-gray-200 dark:bg-gray-700 p-4 rounded-r-md'></div> 
            </div>
            <div className='w-full flex justify-between items-center animate-pulse'>
                <div className='w-[65%] bg-gray-200 dark:bg-gray-700 p-4 rounded-l-md'></div>
                <div className='w-[33%] bg-gray-200 dark:bg-gray-700 p-4 rounded-r-md'></div> 
            </div>
            <div className='w-full flex justify-between items-center animate-pulse'>
                <div className='w-[65%] bg-gray-200 dark:bg-gray-700 p-4 rounded-l-md'></div>
                <div className='w-[33%] bg-gray-200 dark:bg-gray-700 p-4 rounded-r-md'></div> 
            </div>
            <div className='w-full flex justify-between items-center animate-pulse'>
                <div className='w-[65%] bg-gray-200 dark:bg-gray-700 p-4 rounded-l-md'></div>
                <div className='w-[33%] bg-gray-200 dark:bg-gray-700 p-4 rounded-r-md'></div> 
            </div>
            <div className='w-full flex justify-between items-center animate-pulse'>
                <div className='w-[65%] bg-gray-200 dark:bg-gray-700 p-4 rounded-l-md'></div>
                <div className='w-[33%] bg-gray-200 dark:bg-gray-700 p-4 rounded-r-md'></div> 
            </div>
        </div>
    )
}

export default LoadingBars