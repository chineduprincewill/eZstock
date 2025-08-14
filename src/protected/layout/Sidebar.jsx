import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import Navlinks from './Navlinks'
import { AppContext } from '../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import Navlinks2 from './Navlinks2'
import { PiUserCircleLight } from 'react-icons/pi'
import { HiArrowLeft, HiArrowRight, HiLogout } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'

const Sidebar = ({ toggleSidebar, navOpen }) => {

    const { user, logout, collapse, setCollapse } = useContext(AppContext);
    const locatn = useLocation();
    const navigate = useNavigate();

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-40 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-40 ${navOpen ? 'block w-[230px]' : 'hidden'} md:flex flex-col ${collapse ? 'md:max-w-max' : 'md:w-[230px]'} h-screen overflow-y-hidden duration-300 ease-linear bg-primary text-white`}>
                <div className='hidden md:flex md:justify-center md:items-center md:w-full px-6 md:h-[50px] space-x-2 text-white'> 
                </div>
                <div className='flex justify-end mt-2 md:hidden pr-2'>
                    <AiOutlineClose size={20} className='text-white cursor-pointer' onClick={toggleSidebar} />
                </div>
                <div className='w-full py-2.5 px-4 mb-2 bg-primary'>
                    <div className={`hidden mb-4 text-white mt-[-50px] ${collapse ? 'md:grid pl-3' : 'w-full md:flex justify-end'}`}>
                    {
                        collapse ?
                        <HiArrowRight 
                            size={20} 
                            className='cursor-pointer' 
                            onClick={() => setCollapse(false)}
                        />
                        :
                        <HiArrowLeft 
                            size={20} 
                            className='cursor-pointer' 
                            onClick={() => setCollapse(true)}
                        />
                    }
                    </div>
                    <div className={`w-full flex items-center ${collapse && 'pl-2'}`}>  
                        <div className='px-2 rounded-full bg-white text-primary flex text-lg'>
                            <span className='scale-x-[-1] -skew-x-12'>3</span>
                        </div>
                        <div className={`${collapse && !navOpen ? 'hidden' : 'block'} ml-2 pl-2 grid border-l border-white text-white grow`}>
                            <div className='text-lg flex items-center'>
                                <span className='scale-x-[-1] -skew-x-12'>3</span>
                                <span className='text-4xl font-extralight'>Z</span>
                                <span>Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col px-3 grow'>
                    <div className='w-full flex items-center gap-1 my-2'>
                        <PiUserCircleLight size={50} />
                        <div className={`${collapse && !navOpen ? 'hidden' : 'block'} grid text-xs`}>
                            <span>{JSON.parse(user)?.name}</span>
                            <span className='capitalize'>{JSON.parse(user)?.role}</span>
                        </div>
                    </div>
                    <div className='grow'>
                        <Navlinks2 collapse={collapse} navOpen={navOpen} />
                    </div>
                </div>
                <div className='p-3'>
                    <div 
                        className='flex items-center gap-3 p-2 text-white cursor-pointer rounded-md hover:bg-selectedprimary'
                        onClick={() => logout()}
                    >
                        <div className='p-1 rounded-full bg-white'>
                            <AiOutlineLogout size={15} className='text-red-600' />
                        </div>
                        <span className={`${collapse && !navOpen ? 'hidden' : 'block'}`}>Logout</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar