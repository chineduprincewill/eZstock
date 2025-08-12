import React, { useState } from 'react'
import { TbSettings } from 'react-icons/tb'
import PageTitle from '../../common/PageTitle'
import { HiOutlinePlus } from 'react-icons/hi'
import StatesComponent from './components/StatesComponent'
import NewState from './components/forms/NewState'
import LgasComponent from './components/LgasComponent'
import NewLga from './components/forms/NewLga'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import FacilitiesComponent from './components/FacilitiesComponent'
import NewFacility from './components/forms/NewFacility'
import ItemCategoriesComponent from './components/ItemCategoriesComponent'
import ItemComponent from './components/ItemComponent'
import NewItem from './components/forms/NewItem'
import NewItemCategory from './components/forms/NewItemCategory'
import PacksizesComponent from './components/PacksizesComponent'
import NewPacksize from './components/forms/NewPacksize'

const Settings = () => {

    const [createmodal, setCreatemodal] = useState(false);
    const [createLgaModal, setCreateLgaModal] = useState(false);
    const [createFacilityModal, setCreateFacilityModal] = useState(false);
    const [createItemModal, setCreateItemModal] = useState(false);
    const [showUpper, setShowUpper] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showLower, setShowLower] = useState(false);
    const [showpack, setShowpack] = useState(false);
    const [createCategoryModal, setCreateCategoryModal] = useState(false);
    const [createPacksizeModal, setCreatePacksizeModal] = useState(false);

    let icon = <TbSettings size={20} />
    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full'>   
                <PageTitle icon={icon} />
            </div>
            <div className='w-full mt-8 mb-4'>
                <div 
                    className='w-full flex justify-between items-center p-4 shadow-xl mb-4 cursor-pointer'
                    onClick={() => setShowUpper(!showUpper)}
                >
                    <span>States and Local Government Areas</span>
                {
                    showUpper ?
                        <RiArrowDropUpLine size={30} />:
                        <RiArrowDropDownLine size={30} />
                }
                </div>
                <div className={`${showUpper ? 'grid lg:flex' : 'hidden'} w-full lg:justify-between space-y-4 lg:space-y-0`}>
                    <div className='w-full lg:w-[49%] rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span>State</span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreatemodal(true)}
                            />
                        </div>
                        <StatesComponent />
                    </div>
                    <div className='w-full lg:w-[49%] rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span>Local Government Area</span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreateLgaModal(true)}
                            />
                        </div>
                        <LgasComponent />
                    </div>
                </div>
            </div>
            <div className='w-full mt-4 mb-4'>
                <div 
                    className='w-full flex justify-between items-center p-4 shadow-xl mb-4 cursor-pointer'
                    onClick={() => setShowNext(!showNext)}
                >
                    <span>Facilities</span>
                {
                    showNext ?
                        <RiArrowDropUpLine size={30} />:
                        <RiArrowDropDownLine size={30} />
                }
                </div>
                <div className={`${showNext ? 'grid lg:flex' : 'hidden'} w-full lg:justify-between space-y-4 lg:space-y-0`}>
                    <div className='w-full rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span></span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreateFacilityModal(true)}
                            />
                        </div>
                        <FacilitiesComponent />
                    </div>
                </div>
            </div>
            <div className='w-full mt-4 mb-4'>
                <div 
                    className='w-full flex justify-between items-center p-4 shadow-xl mb-4 cursor-pointer'
                    onClick={() => setShowLower(!showLower)}
                >
                    <span>Items and Tools</span>
                {
                    showUpper ?
                        <RiArrowDropUpLine size={30} />:
                        <RiArrowDropDownLine size={30} />
                }
                </div>
                <div className={`${showLower ? 'grid lg:flex' : 'hidden'} w-full lg:justify-between space-y-4 lg:space-y-0`}>
                    <div className='w-full lg:w-[49%] rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span>Categories</span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreateCategoryModal(true)}
                            />
                        </div>
                        <ItemCategoriesComponent />
                    </div>
                    <div className='w-full lg:w-[49%] rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span>Items and tools</span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreateItemModal(true)}
                            />
                        </div>
                        <ItemComponent />
                    </div>
                </div>
            </div>
            <div className='w-full mt-4 mb-4'>
                <div 
                    className='w-full flex justify-between items-center p-4 shadow-xl mb-4 cursor-pointer'
                    onClick={() => setShowpack(!showpack)}
                >
                    <span>Pack sizes</span>
                {
                    showpack ?
                        <RiArrowDropUpLine size={30} />:
                        <RiArrowDropDownLine size={30} />
                }
                </div>
                <div className={`${showpack ? 'grid lg:flex' : 'hidden'} w-full lg:justify-between space-y-4 lg:space-y-0`}>
                    <div className='w-full rounded-md shadow-xl p-4 border border-gray-300 dark:border-gray-700'>
                        <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                            <span></span>
                            <HiOutlinePlus 
                                size={20} 
                                className='cursor-pointer text-[#54c5d0]' 
                                onClick={() => setCreatePacksizeModal(true)}
                            />
                        </div>
                        <PacksizesComponent />
                    </div>
                </div>
            </div>
            
            {
                createmodal && <NewState setCreatemodal={setCreatemodal} />
            }
            {
                createLgaModal && <NewLga setCreateLgaModal={setCreateLgaModal} />
            }
            {
                createFacilityModal && <NewFacility setCreateFacilityModal={setCreateFacilityModal} />
            }
            {
                createItemModal && <NewItem setCreateItemModal={setCreateItemModal} />
            }
            {
                createCategoryModal && <NewItemCategory setCreateCategoryModal={setCreateCategoryModal} />
            }
            {
                createPacksizeModal && <NewPacksize setCreatePacksizeModal={setCreatePacksizeModal} />
            }
        </div>
    )
}

export default Settings
