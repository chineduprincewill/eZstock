import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { AppContext } from '../../context/AppContext'

const DefaultLayout = () => {

    const { theme, collapse } = useContext(AppContext);
    const [navOpen, setNavOpen] = useState(false);

    const toggleSidebar = () => {
        setNavOpen(!navOpen);
    }
 
    return (
        <div className={`w-full flex h-screen overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white font-urbanist`}>
            <Sidebar toggleSidebar={toggleSidebar} navOpen={navOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main>
                    <div className={`${collapse ? 'ml-0 md:ml-[75px] max-w-screen-2xl p-0' : 'ml-0 md:ml-[230px] max-w-screen-2xl p-0'}`}>
                        <Outlet />
                    </div>
                </main>
            </div>
            <div className='fixed bottom-0 right-0 flex items-center gap-1 px-4 py-2 max-w-max text-selectedprimary'>
                <span>&copy;</span>
                <span>Sparksyms Projects</span>
            </div>
        </div>
    )
}

export default DefaultLayout