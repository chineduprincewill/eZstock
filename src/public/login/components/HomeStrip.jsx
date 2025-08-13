import React, { useEffect, useState } from 'react'

const HomeStrip = () => {

    const [active, setActive] = useState(1);

    const stripArr = [
        {
            id: 1,
            text: 'Streamline Your Stock - Real Time Tracking, Zero Hassles!',
            imageurl: ''
        },
        {
            id: 2,
            text: 'Boost Efficiency & Cut Costs - Smart Inventory Control at Your Fingertips.',
            imageurl: ''
        },
        {
            id: 3,
            text: 'Never Overstock or Run Out Again - Automated Alerts & Smart Forecasting.',
            imageurl: ''
        },
        {
            id: 4,
            text: 'Seamless Integration, Smarter Decisions - Manage Inventory Like a Pro!',
            imageurl: ''
        },
    ]

    useEffect(() => {
        setActive(active);

        const intervalId = setInterval(() => {
            active === stripArr.length ? 
                    setActive(1) : setActive(active + 1)
        }, 10000); // 10 seconds

        return () => clearInterval(intervalId);
    }, [active])

    return (
        <div className='w-full hidden md:block'>
        {
            stripArr.map(item => (
                item?.id === active &&
                    <div className='w-full grid gap-4'>
                        <span className='max-w-max text-2xl text-primary dark:text-selectedprimary py-2 border-b border-gray-300 dark:border-gray-600'>
                        {
                            item?.text.split("-")[1]
                        }
                        </span>
                        <span className='text-6xl text-gray-700 dark:text-gray-200 leading-tight'>
                        {
                            item?.text.split("-")[0]
                        }
                        </span>
                    </div>
            ))
        }
        </div>
    )
}

export default HomeStrip