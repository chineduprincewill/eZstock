import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineCloseCircle, AiOutlineEdit, AiOutlineSend } from 'react-icons/ai'
import { dispatchRequest } from '../../../../apis/dispatchActions';
import ButtonLoader from '../../../../common/ButtonLoader';
import { AppContext } from '../../../../context/AppContext';
import { fetchItemPacktypes } from '../../../../apis/settingsActions';
import { fetchItemBatches } from '../../../../apis/InventoriesActions';

const NewDispatch = ({ setCreateDispatch, dispatchArray }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [error, setError] = useState();
    const [editId, setEditItd] = useState();
    const [quantity, setQuantity] = useState();
    const [packtype, setPacktype] = useState();
    const [unit_quantity, setUnit_quantity] = useState();
    const [dispatch_date, setDispatch_date] = useState();
    const [inventory_id, setInventory_id] = useState();
    const [arrayToDispatch, setArrayToDispatch] = useState(dispatchArray);
    const [dispatching, setDispatching] = useState(false);
    const [success, setSuccess] = useState();
    const [packtypes, setPacktypes] = useState();
    const [getting, setGetting] = useState(false);
    const [tool_id, setTool_id] = useState();
    const [fetching, setFetching] = useState(false);
    const [batches, setBatches] = useState();

    console.log(arrayToDispatch);

    const requestToEdit = (itemid, itemobj) => {
        setEditItd(itemid);
        setQuantity(itemobj?.quantity)
        setPacktype(itemobj?.packtype)
        setUnit_quantity(itemobj?.unit_quantity)
        setTool_id(itemobj?.tool_id)
        console.log(itemobj)
    }

    const getPacktypeQty = () => {
        let unit_qty;
        
        unit_qty = packtypes && packtypes.filter(pkt => pkt?.packname === packtype);
        return (unit_qty[0]?.quantity_per_pack * quantity);
    }

    const updateRequest = (id) => {

        console.log(unit_quantity)

        if(!dispatch_date){
            alert('Date item was dispatched must be entered!')
        }
        else if(!unit_quantity){
            alert('Please select "clear selection" and re-select the packtype to confirm your selections!')
        }
        else{
            const data = {
                id, quantity, packtype, unit_quantity, dispatch_date, inventory_id
            }
            //console.log(data);
            dispatchRequest(token, data, setSuccess, setError, setDispatching)
        }
    }

    const getItemId = () => {
        let editObj = editId && dispatchArray.filter(dsp => dsp?.request_id === editId);
        if(editObj){
            return editObj[0].tool_id;
        }
    }

    useEffect(() => {
        (quantity && packtype) && setUnit_quantity(
            packtype === 'unit' ? quantity : getPacktypeQty()
        )
    }, [packtype, quantity])

    useEffect(() => {
        if(success){
            setArrayToDispatch(success);
            refreshRecord(Date.now())
        }
    }, [success])

    useEffect(() => {
        fetchItemPacktypes(token, { id:getItemId() }, setPacktypes, setError, setGetting)
        //getItemId()
    }, [editId])

    useEffect(() => {
        fetchItemBatches(token, { tool_id : parseInt(tool_id) }, setBatches, setError, setFetching)
    }, [editId, tool_id])


    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[70%] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-lg'>
                                dispatch items
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setCreateDispatch(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                            <div className='w-full my-4 space-y-4'>
                            {
                                arrayToDispatch.length > 0 ?
                                arrayToDispatch.map(item => (
                                    <div key={item?.request_id} className='w-full flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700'>
                                        <div className='grid md:flex md:items-center gap-2'>
                                            <div className='min-w-[150px] font-extralight'>{item?.itemname}</div>
                                            <div className='font-extralight'>
                                            {
                                                editId && editId === item?.request_id ?
                                                    <div className='flex gap-2 items-center'>
                                                        <input 
                                                            type='number' 
                                                            className='w-[60px] p-1 bg-transparent rounded-md border border-gray-200 dark:border-gray-700'
                                                            placeholder='qty'
                                                            value={quantity} 
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                        />
                                                        <select 
                                                            className='md:w-[150px] p-1 bg-transparent rounded-md border border-gray-200 dark:border-gray-700'
                                                            onChange={(e) => setPacktype(e.target.value)}
                                                            value={packtype}
                                                            required
                                                        >
                                                            <option className='dark:bg-gray-800 dark:text-white' value={item?.packtype}>{getting ? 'fetching...' : item?.packtype}</option>
                                                            <option className='dark:bg-gray-800 dark:text-white' value="">clear selection</option>
                                                        {
                                                            packtypes && packtypes.length > 0 && packtypes.map(pktyp => (
                                                                <option key={pktyp?.pack_id} className='dark:bg-gray-800 dark:text-white' value={pktyp?.packname}>
                                                                { pktyp?.packname }
                                                                </option>
                                                            ))
                                                        }
                                                            <option className='dark:bg-gray-800 dark:text-white' value="unit">unit</option>
                                                        </select>
                                                        <select 
                                                            className='md:w-[150px] p-1 bg-transparent rounded-md border border-gray-200 dark:border-gray-700'
                                                            onChange={(e) => setInventory_id(e.target.value)}
                                                            required
                                                        >
                                                            <option className='dark:bg-gray-800 dark:text-white' value="">{fetching ? 'fetching...' : 'select batch'}</option>
                                                        {
                                                            batches && batches.length > 0 && batches.map(btch => (
                                                                <option key={btch?.inventory_id} className='dark:bg-gray-800 dark:text-white' value={btch?.inventory_id}>
                                                                { btch?.batch_no+' - '+(btch?.unit_quantity - btch?.dispatched) }
                                                                </option>
                                                            ))
                                                        }
                                                        </select>
                                                    </div>:
                                                    <div className='flex gap-2 items-center'>
                                                        <span className='w-[60px] p-1 rounded-md bg-gray-200 dark:bg-gray-700'>{item?.quantity}</span> 
                                                        <span className='w-[120px] p-1 rounded-md bg-gray-200 dark:bg-gray-700'>{item?.packtype}</span>
                                                    </div>
                                            }
                                            </div>
                                            <div className='grid w-full'>
                                                <span className={`${dispatch_date ? 'hidden' : 'block'} max-w-max bg-gray-100 dark:bg-gray-800 p-1 z-10 border-y border-l dark:border-gray-700 rounded-l-md text-gray-400`}>Dispatched on</span>
                                                <input 
                                                    type='date'
                                                    className={`${!dispatch_date && 'mt-[-33px]'} w-full rounded-md border dark:border-gray-700 bg-transparent h-8 px-1`}
                                                    onChange={(e) => setDispatch_date(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {
                                            editId && editId === item?.request_id ?
                                                <div className='flex items-center'>
                                                    <div className='p-1'>
                                                    {
                                                        dispatching ? 
                                                        <ButtonLoader /> :
                                                        <AiOutlineSend 
                                                            size={17} 
                                                            className='cursor-pointer text-green-400 hover:text-green-600' 
                                                            onClick={() => updateRequest(item?.request_id)}
                                                        />
                                                    } 
                                                    </div>
                                                    <div className='p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                                                        <AiOutlineClose
                                                            size={17} 
                                                            className='cursor-pointer text-red-600' 
                                                            onClick={() => setEditItd()}
                                                        /> 
                                                    </div>
                                                </div>
                                                :
                                                <div className='p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                                                    <AiOutlineEdit 
                                                        size={17} 
                                                        className='cursor-pointer text-blue-400' 
                                                        onClick={() => requestToEdit(item?.request_id, item)}
                                                    />
                                                </div>
                                            }
                                    </div>
                                ))
                                :
                                <div className='w-full rounded-md bg-red-200 text-red-600 p-2'>No item left to dispatch!</div>
                            }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewDispatch