import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AppContext } from '../../../../context/AppContext';
import { fetchItems, fetchItemPacktypes } from '../../../../apis/settingsActions';
import { createInventory } from '../../../../apis/InventoriesActions';

const NewInventory = ({ setAddInventory }) => {

    const { token, refreshRecord } = useContext(AppContext);

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [saving, setSaving] = useState();
    const [batch_no, setBatch_no] = useState();
    const [source, setSource] = useState();
    const [manufacturer, setManufacturer] = useState();
    const [tool_id, setTool_id] = useState();
    const [expirydate, setExpirydate] = useState();
    const [quantity, setQuantity] = useState();
    const [packtype, setPacktype] = useState();
    const [unit_quantity, setUnit_quantity] = useState();
    const [receivedby, setReceivedby] = useState();
    const [datereceived, setDatereceived] = useState();
    const [items, setItems] = useState();
    const [fetching, setFetching] = useState();
    const [packtypes, setPacktypes] = useState();
    const [getting, setGetting] = useState(false);

    const getPacktypeQty = () => {
        let unit_qty;
        
        unit_qty = packtypes && packtypes.filter(pkt => pkt?.packname === packtype);
        return (unit_qty[0]?.quantity_per_pack * quantity);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            batch_no, source, manufacturer, tool_id:parseInt(tool_id), expirydate, quantity: parseInt(quantity), packtype, unit_quantity: parseInt(unit_quantity), receivedby, datereceived
        }

        createInventory(token, data, setSuccess, setError, setSaving);
    }

    if(success){
        refreshRecord(Date.now());
        setAddInventory(false);
    }

    useEffect(() => {
        fetchItems(token, setItems, setError, setFetching);
    }, [])

    useEffect(() => {
        (quantity && packtype) && setUnit_quantity(
            packtype === 'unit' ? quantity : getPacktypeQty()
        )
    }, [packtype, quantity])

    useEffect(() => {
        fetchItemPacktypes(token, { id:tool_id }, setPacktypes, setError, setGetting)
    }, [tool_id])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[400px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                add inventory
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setAddInventory(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                        {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Batch No.'
                                    onChange={(e) => setBatch_no(e.target.value)}
                                    required
                                />
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Source'
                                    onChange={(e) => setSource(e.target.value)}ed
                                />
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Manufacturer'
                                    onChange={(e) => setManufacturer(e.target.value)}ed
                                />
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
                                <div className='grid w-full'>
                                    <span className={`${expirydate ? 'hidden' : 'block'} w-[50%] bg-gray-100 dark:bg-gray-800 p-2 z-10 border-t border-l dark:border-gray-700 rounded-l-md text-gray-400`}>Expiry date</span>
                                    <input 
                                        type='date'
                                        className={`${!expirydate && 'mt-[-40px]'} w-full p-2 rounded-md border dark:border-gray-700 bg-transparent`}
                                        onChange={(e) => setExpirydate(e.target.value)}
                                    />
                                </div>
                                <input 
                                    type='number' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                                <select 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setPacktype(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">{getting ? 'fetching pack types...' : 'select pack type'}</option>
                                {
                                    packtypes && packtypes.length > 0 && packtypes.map(pktyp => (
                                        <option key={pktyp?.pack_id} className='dark:bg-gray-800 dark:text-white' value={pktyp?.packname}>
                                        { pktyp?.packname }
                                        </option>
                                    ))
                                }
                                    <option className='dark:bg-gray-800 dark:text-white' value="unit">unit</option>
                                </select>
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Received by'
                                    onChange={(e) => setReceivedby(e.target.value)}
                                    required
                                />
                                <div className='grid w-full'>
                                    <span className={`${datereceived ? 'hidden' : 'block'} max-w-max bg-gray-100 dark:bg-gray-800 p-2 z-10 border-t border-l dark:border-gray-700 rounded-l-md text-gray-400`}>Date received</span>
                                    <input 
                                        type='date'
                                        className={`${!datereceived && 'mt-[-40px]'} w-full p-2 rounded-md border dark:border-gray-700 bg-transparent`}
                                        onChange={(e) => setDatereceived(e.target.value)}
                                    />
                                </div>
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-primary hover:bg-selectedprimary text-white`}
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

export default NewInventory