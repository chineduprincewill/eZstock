import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import RemarksComponent from './RemarksComponent'

const RemarksComponentContainer = ({ setShowRemarks, remark }) => {


    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[800px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-lg'>
                                remarks
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setShowRemarks(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            <RemarksComponent remark={remark} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemarksComponentContainer