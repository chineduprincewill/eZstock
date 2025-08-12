import React from 'react'

const Logo = () => {
    return (
        <div className='w-full flex items-center'>
            <div className='px-2 rounded-full bg-primary text-white flex text-2xl'>
                <span className='scale-x-[-1] -skew-x-12'>3</span>
            </div>
            <div className='grid text-primary dark:text-selectedprimary'>
                <div className='text-2xl flex items-center'>
                    <span className='text-6xl font-extralight'>Z</span>
                    <span>Stock</span>
                </div>
            </div>
        </div>
    )
}

export default Logo