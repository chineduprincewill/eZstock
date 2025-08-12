import React from 'react'

const SubmittingButton = ({ buttonText, size }) => {
    return (
        <button className={`w-full flex justify-center items-center ${size ? size : 'p-2'} text-white bg-[#287495] focus:outline-none focus:ring-2 focus:ring-blue-300`}>
            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            {buttonText}
        </button>
    )
}

export default SubmittingButton