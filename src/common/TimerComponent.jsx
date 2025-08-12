import React, { Fragment, useEffect, useState } from 'react'
import { formatDateAndTime, formatTime } from '../apis/functions';

const TimerComponent = () => {

    const [curdatetime, setCurdatetime] = useState();

    useEffect(() => {
        setTimeout(() => setCurdatetime(Date.now()) , 1000) 
    }, [Date.now()])

    return (
        <Fragment>
            <div className='text-xl font-semibold text-[#005072] dark:text-white hidden md:block'>{curdatetime && formatDateAndTime(curdatetime)}</div>
            <div className='text-xl font-bold text-[#005072] dark:text-white md:hidden'>{curdatetime && formatTime(curdatetime)}</div>
        </Fragment>
        
    )
}

export default TimerComponent