import React, { useEffect, useState } from 'react'
import { GiArtificialIntelligence } from 'react-icons/gi'

const VendorAICategorization = ({ vendordata }) => {

    const [category, setCategory] = useState();
    const [threshold, setThreshold] = useState();

    const aiCategorize = () => {
        let totalscore = vendordata?.vendor_scoring_total[0]?.marks_scored_by_vendor;

        if(totalscore >= 70){
            setCategory('Category A (Major Vendor)');
            setThreshold('Unlimited');
        }
        else if(totalscore >= 60 && totalscore <= 69){
            setCategory('Category B (Mid Vendor)');
            setThreshold('Limited to 25 Million & Below');
        }
        else if(totalscore >= 50 && totalscore <= 59){
            setCategory('Category C (Minor Vendor)');
            setThreshold('Limited to 5 million and below (including direct purchases)');
        }
        else if(totalscore <= 49){
            setCategory('Rejected, Not Categorized');
            setThreshold('N/A');
        }
    }

    useEffect(() => {
        aiCategorize();
    }, [])


    return (
        <div className='w-full md:w-[49%] bg-[#54c5d0] text-black p-4 my-6 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 '>
                <GiArtificialIntelligence size={20} />
                <span className='capitalize'>vendor ai categorization</span>
            </div>
            <div className='w-full my-4 grid space-y-6 md:space-y-4'>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Categorization</span>
                    <span className={vendordata?.vendor_scoring_total[0]?.marks_scored_by_vendor <= 49 && 'text-red-500'}>{category && category}</span>
                </div>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Threshold</span>
                    <span className=''>{threshold && threshold}</span>
                </div>
                <div className='grid md:flex md:justify-between md:items-baseline'>
                    <span className='font-extralight'>Remarks</span>
                    <span className=''>Categorization by Artificial Intelligence module</span>
                </div>
            </div>
        </div>
    )
}

export default VendorAICategorization