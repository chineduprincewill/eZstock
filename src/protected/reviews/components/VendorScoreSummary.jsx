import React from 'react'
import { MdOutlineRateReview } from 'react-icons/md'

const VendorScoreSummary = ({ vendordata }) => {
    return (
        <div className='w-full md:w-[49%] p-4 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-gray-700'>
                <MdOutlineRateReview size={20} />
                <span className='capitalize'>vendor scores summary</span>
            </div>
            <div className='w-full my-4 grid space-y-3'>
                <div className='flex justify-between items-baseline'>
                    <span className='font-extralight'>Total for General Registration Requirements</span>
                    <span className='text-3xl'>
                        {vendordata?.vendor_scoring_genreq[0]?.marks_scored_by_vendor}
                    </span>
                </div>
                <div className='flex justify-between items-baseline'>
                    <span className='font-extralight'>Total for Performance Related Requirements</span>
                    <span className='text-3xl'>
                        {vendordata?.vendor_scoring_performance[0]?.marks_scored_by_vendor}
                    </span>
                </div>
                <div className='flex justify-between items-baseline font-semibold text-[#005072] dark:text-[#54c5d0]'>
                    <span className='font-extralight uppercase'>Overall Total Mark</span>
                    <span className='text-5xl'>
                        {vendordata?.vendor_scoring_total[0]?.marks_scored_by_vendor}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VendorScoreSummary