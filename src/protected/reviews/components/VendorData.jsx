import React from 'react'
import { MdOutlineHomeRepairService } from 'react-icons/md'

const VendorData = ({ vendordata }) => {
    return (
        <div className='w-full md:w-[49%] p-4 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-gray-700'>
                <MdOutlineHomeRepairService size={20} />
                <span className='capitalize'>vendor information</span>
            </div>
            <div className='w-full my-4 grid space-y-2'>
                <span className='text-xl'>{vendordata?.vendor_data[0]?.company_name}</span>
                <span className='text-gray-500'>{vendordata?.vendor_data[0]?.email}</span>
            </div>
        </div>
    )
}

export default VendorData