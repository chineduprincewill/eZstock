import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { createPacksize, fetchActiveItems } from '../../../../apis/settingsActions';
import { AppContext } from '../../../../context/AppContext';

const NewPacksize = ({ setCreatePacksizeModal }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [error, setError] = useState();
    const [tool_id, setTool_id] = useState();
    const [packname, setPackname] = useState();
    const [quantity_per_pack, setQuantity_per_pack] = useState();
    const [saving, setSaving] = useState(false);
    const [items, setItems] = useState();
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            tool_id, packname, quantity_per_pack
        }

        createPacksize(token, data, setSuccess, setError, setSaving)
    }

    if(success){
        refreshRecord(Date.now());
        setCreatePacksizeModal(false);
    }

    useEffect(() => {
        fetchActiveItems(token, setItems, setError, setFetching);
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                create pack size
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setCreatePacksizeModal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                                <select 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setTool_id(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">{fetching ? 'fetching items...' : 'select item'}</option>
                                {
                                    (items && items.length > 0) && items.map(item => (
                                        <option className='dark:bg-gray-800 dark:text-white' value={item?.name_id}>{item?.name}</option>
                                    ))
                                }
                                </select>
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Pack name'
                                    onChange={(e) => setPackname(e.target.value)}
                                    required
                                />
                                <input 
                                    type='number' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Qty per pack'
                                    onChange={(e) => setQuantity_per_pack(e.target.value)}
                                    required
                                />
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                >
                                    {
                                        saving ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Save'
                                        }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPacksize