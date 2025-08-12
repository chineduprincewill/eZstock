import React from 'react'

const RemarksComponent = ({ remark }) => {

    const remarkArray = remark && remark.split(":");

    return (
        <div className='w-full'>
            <div className='w-full space-y-3 pt-1'>
            {
                remarkArray && remarkArray.map((rmarr, index) => {
                    const newrmarr = rmarr.split("#");
                    return <div key={index} className='w-full grid'>
                        <span className='font-extralight'>{newrmarr[0]}</span>
                        <div className='w-full flex justify-start items-center gap-2 text-gray-400 dark:text-gray-500'>
                            <span className='text-xs'>{newrmarr[1]}</span>
                            <span className='text-xs'>{newrmarr[2]}</span>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}

export default RemarksComponent