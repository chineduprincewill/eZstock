import React from 'react'
import { formatPagetitle } from '../apis/functions'

const PageTitle = ({ icon }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
                {icon}
                <span className='text-xl font-semibold capitalize'>
                    {formatPagetitle()}
                </span>
            </div>
        </div>
    )
}

export default PageTitle