import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import PositivesChart from './PositivesChart';

const PositivesChartModal = ({ setShowpositivemodal, chart, generateTitle, detail, period }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full mt-6 md:w-[80%] bg-white dark:bg-gray-800 border border-gray-400 dark:text-gray-300 px-6 py-1 transition-transform ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
                        <div className='flex justify-end items-center border-none border-gray-200 dark:border-gray-600 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowpositivemodal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='py-4'>
                            <PositivesChart chart={chart} generateTitle={generateTitle} detail={detail} period={period} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PositivesChartModal