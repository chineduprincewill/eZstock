import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import TestJson from './TestJson';
import { MdOutlineZoomInMap } from 'react-icons/md';

const FilledmapModal = ({ setZoomfilled }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full mt-1 md:w-[95%] bg-white dark:bg-gray-800 border border-gray-400 dark:text-gray-300 px-6 py-1 transition-transform ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
                        <div className='flex justify-end items-center border-none border-gray-200 dark:border-gray-600 py-0.5'>
                            <span
                                className='cursor-pointer'
                                onClick={() => setZoomfilled(false)}
                            >    
                                <MdOutlineZoomInMap size={20} />
                            </span>
                        </div>
                        <div className='py-1'>
                            <TestJson height='95vh' zoom={9} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilledmapModal