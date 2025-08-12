import React from 'react'
import { generateAvatar } from '../../../apis/functions'

const VendorTabs = ({ label, setActiveComponent, activeComponent }) => {
    return (
        <div 
            className='flex gap-2 items-baseline cursor-pointer'
            onClick={() => setActiveComponent(label)}
        >
            <span className={`py-0.5 px-1 rounded-full border border-[#54c5d0] hover:bg-[#54c5d0] shadow-md text-sm font-extralight ${activeComponent === label && 'bg-[#54c5d0]'}`}>
                {generateAvatar(label)}
            </span>
            <span className={`capitalize font-extralight hidden md:block hover:text-[#54c5d0] ${activeComponent === label && 'text-[#54c5d0]'}`}>{label}</span>
        </div>
    )
}

export default VendorTabs