import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { formatDate } from '../../../apis/functions'

const VendorManualCategorizationCard = ({ vendordata }) => {
    return (
        <div className='w-full md:w-[49%] bg-[#a8d13a] text-black p-4 my-6 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 '>
                <CiEdit size={20} />
                <span className='capitalize'>{vendordata[0]?.completed_by} - {formatDate(vendordata[0]?.date_completed)}</span>
            </div>
            <div className='w-full my-4 grid space-y-6 md:space-y-4'>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Categorization</span>
                    <span className={vendordata[0]?.score <= 49 && 'text-red-500'}>{vendordata[0]?.categorization}</span>
                </div>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Threshold</span>
                    <span className=''>{vendordata[0]?.threshold}</span>
                </div>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Remarks</span>
                    <span className=''>{vendordata[0]?.remarks}</span>
                </div>
            </div>
        </div>
    )
}

export default VendorManualCategorizationCard