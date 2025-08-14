import React, { useContext, useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ThemeToggle from '../../common/ThemeToggle';
import { TbLayoutDashboardFilled, TbVirusSearch } from 'react-icons/tb';
import { HiBell, HiUser } from 'react-icons/hi';
import { CiSettings } from 'react-icons/ci';
import PasswordReset from '../settings/components/forms/PasswordReset';
import { formatPagetitle } from '../../apis/functions';

const Header = ({ toggleSidebar }) => {

    const { user, collapse } = useContext(AppContext);
    const [resetPassword, setResetPassword] = useState(false);

    return (
        <header className='sticky w-full top-0 z-30 h-[60px] py-2 bg-white dark:bg-gray-800'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-primary cursor-pointer' onClick={toggleSidebar} />
                    <div className={`text-2xl font-bold hidden md:block md:${!collapse && 'pl-[180px]'} capitalize`}>
                        <span className={`${collapse && 'ml-6'} px-4 font-extralight`}>{formatPagetitle()}</span>
                    </div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex justify-end items-center text-gray-700 dark:text-gray-200 space-x-2 md:space-x-4 text-sm'>
                        <div className='hidden md:flex gap-1 items-center'>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.facility_name}
                            </span>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.lga_name}
                            </span>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.state_name}
                            </span>
                        </div>
                        <div className='hidden md:block h-6 border-x border-gray-200 dark:border-gray-700'></div>
                        <img src='/assets/logo.png' alt='brand logo' width="25px" className='block md:hidden' />
                        <div className='h-6 border-x border-gray-200 dark:border-gray-700 block md:hidden'></div>
                        <CiSettings 
                            size={20}  
                            className='cursor-pointer hover:text-gray-400'
                            onClick={() => setResetPassword(true)}
                            title='Reset user password'
                        />
                        <div className='h-6 border-x border-gray-200 dark:border-gray-700'></div>
                        <HiBell size={20} />
                        <div className='h-6 border-x border-gray-200 dark:border-gray-700'></div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        {
            resetPassword && <PasswordReset setResetPassword={setResetPassword} />
        }
        </header>
    )
}

export default Header