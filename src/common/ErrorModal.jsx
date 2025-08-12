import React from 'react'

const ErrorModal = ({ message }) => {
    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[400px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-r-md border-l-4 border-red-600 p-4`}>
                        <div className='w-full my-4 text-lg text-red-600'>
                        {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal