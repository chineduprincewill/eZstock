import React, { useState } from 'react'
import { TbSettings } from 'react-icons/tb'
import StatesComponent from './components/StatesComponent'
import LgasComponent from './components/LgasComponent'
import FacilitiesComponent from './components/FacilitiesComponent'
import ItemCategoriesComponent from './components/ItemCategoriesComponent'
import ItemComponent from './components/ItemComponent'
import PacksizesComponent from './components/PacksizesComponent'

const Settings = () => {

    const [active, setActive] = useState('States');

    const tabsArr = [
        {
            id: 1,
            name:'States'
        },
        {
            id: 2,
            name:'LGAs'
        },
        {
            id: 3,
            name:'Facilities'
        },
        {
            id: 4,
            name:'Items'
        },
        {
            id: 5,
            name:'Item categories'
        },
        {
            id: 6,
            name:'Items Pack sizes'
        }
    ]

    let icon = <TbSettings size={20} />
    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full overflow-x-scroll px-2'>   
                <div className='hidden md:flex items-center gap-1 md:gap-2 border-b-2 border-primary'>
                {
                    tabsArr.map(tab => (
                        <button 
                            key={tab?.id}
                            className={`px-6 py-2 rounded-t-lg ${active === tab?.name ? 'bg-primary text-white hover:bg-hoverprimary cursor-not-allowed' : 'border-t border-x border-gray-300 dark:border-gray-700 dark:text-white text-primary hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            onClick={() => setActive(tab?.name)}
                        >
                            {tab?.name}
                        </button>
                    ))
                }
                </div>
                <div className='w-full grid md:hidden'>
                    <select
                        className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                        onChange={(e) => setActive(e.target.value)}
                    >
                    {
                        tabsArr.map(tab => (
                            <option className='dark:bg-gray-800 dark:text-white' key={tab?.id} value={tab?.name}>{tab?.name}</option>
                        ))
                    }
                    </select>
                </div>
            </div>
            {
                active === 'States' && <StatesComponent />
            }
            {
                active === 'LGAs' && <LgasComponent />
            }
            {
                active === 'Facilities' && <FacilitiesComponent />
            }
            {
                active === 'Item categories' && <ItemCategoriesComponent />
            }
            {
                active === 'Items' && <ItemComponent />
            }
            {
                active === 'Items Pack sizes' && <PacksizesComponent /> 
            }
        </div>
    )
}

export default Settings
