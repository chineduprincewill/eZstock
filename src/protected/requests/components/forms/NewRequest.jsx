import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { fetchActiveItems, fetchActiveStateLgas, fetchItemPacktypes } from '../../../../apis/settingsActions';
import { AppContext } from '../../../../context/AppContext';
import { HiOutlineTrash } from 'react-icons/hi';
import { TbSend } from 'react-icons/tb';
import LgaOptions from '../../../../common/LgaOptions';
import ErrorModal from '../../../../common/ErrorModal';
import { createRequests } from '../../../../apis/requestsActions';

const NewRequest = ({ setCreateRequest, setShowoutgoing }) => {

    const { token, user, refreshRecord } = useContext(AppContext); 
    const [error, setError] = useState();
    const [items, setItems] = useState();
    const [fetching, setFetching] = useState(false);
    const [tool_id, setTool_id] = useState();
    const [quantity, setQuantity] = useState();
    const [packtype, setPacktype] = useState();
    const [unit_quantity, setUnit_quantity] = useState();
    const [requestarray, setRequestarray] = useState([]);
    const [sending, setSending] = useState(false);
    const [destination_type, setDestination_type] = useState();
    const [destination_id, setDestination_id] = useState();
    const [showerror, setShowerror] = useState(false);
    const [errormsg, setErrormsg] = useState();
    const [success, setSuccess] = useState();
    const [submitting, setSubmitting] = useState();
    const [packtypes, setPacktypes] = useState();
    const [getting, setGetting] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        setRequestarray(() => [
            ...requestarray,
            {
                tool_id,
                quantity,
                packtype,
                unit_quantity
            }
        ])
    }

    const submitRequest = () => {
        if(!destination_type){
            setErrormsg('request to field must be selected!')
        }
        else if(destination_type && destination_type === 'LGA' && !destination_id){
            setErrormsg('lga must be selected!')
        }
        else if(window.confirm('Are you sure your have confirmed all your entries?')){
            const data = {
                requestarray,
                destination_type,
                destination_id
            }

            createRequests(token, data, setSuccess, setError, setSubmitting);
        }
    }

    if(success){
        refreshRecord(Date.now());
        setShowoutgoing(true);
        setCreateRequest(false);
    }

    const getItemName = (itemid) => {
        return items && items.map(item =>
            item?.name_id === itemid && item?.name
        )
    }

    const deleteItem = (indexToDelete) => {
        const objectToDelete = requestarray[indexToDelete];
        setRequestarray(requestarray.filter(item => item !== objectToDelete));
    }


    const getPacktypeQty = () => {
        let unit_qty;
        
        unit_qty = packtypes && packtypes.filter(pkt => pkt?.packname === packtype);
        return (unit_qty[0]?.quantity_per_pack * quantity);
    }

    useEffect(() => {
        fetchActiveItems(token, setItems, setError, setFetching);
    }, [])

    useEffect(() => {
        (quantity && packtype) && setUnit_quantity(
            packtype === 'unit' ? quantity : getPacktypeQty()
        )
    }, [packtype, quantity])

    useEffect(() => {

        if(errormsg){
            setShowerror(true);
            setTimeout(() => {
                setShowerror(false); 
                setErrormsg();
            }, 2000);
        }
    }, [errormsg])

    useEffect(() => {
        fetchItemPacktypes(token, { id:tool_id }, setPacktypes, setError, setGetting)
    }, [tool_id])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[800px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                create request
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setCreateRequest(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            {
                                error && <span className='text-red-500 dark:text-red-600'>{JSON.stringify(error?.error)}</span>
                            }
                            <form onSubmit={handleSubmit} className='w-full grid md:flex md:justify-between gap-4 md:items-center '>
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
                                    type='number' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                                <button
                                    className={`w-full md:w-[200px] flex justify-center p-2.5 rounded-md bg-primary hover:bg-hoverprimary text-white`}
                                >
                                    <AiOutlinePlus size={20} />
                                </button>
                            </form>
                            <div className='w-full my-8 grid gap-4'>
                                <h1 className='font-extralight text-lg'>Items in request tray</h1>
                            {
                                requestarray.length > 0 ? requestarray.map((requestobj, index) => (
                                    <div key={index} className='w-full p-2 rounded-md shadow-md grid grid-cols-5'>
                                        <div className='col-span-2'>
                                            {getItemName(parseInt(requestobj?.tool_id))}
                                        </div>
                                        <div className='col-span-1'>
                                            {requestobj?.quantity} {requestobj?.packtype}
                                        </div>
                                        <div className='col-span-1'>
                                            {requestobj?.unit_quantity} pcs
                                        </div>
                                        <div className='col-span-1 flex justify-end'>
                                            <HiOutlineTrash 
                                                size={15} 
                                                className='text-red-600 cursor-pointer mt-1' 
                                                onClick={() => deleteItem(index)}
                                            />
                                        </div>
                                    </div>
                                )) : <div className='w-full text-red-500 p-2 rounded-md bg-red-100 dark:bg-gray-700 text-sm'>Request tray is empty! Use the form above to add to the tray.</div>
                            }
                            </div>
                            {
                                requestarray.length > 0 &&
                                    <div className='w-full grid md:flex md:items-center gap-4'>
                                        <select 
                                            className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                            onChange={(e) => setDestination_type(e.target.value)}
                                            required
                                        >
                                            <option className='dark:bg-gray-800 dark:text-white' value="">request to</option>
                                        {
                                            user && JSON.parse(user)?.groupname === 'state' &&
                                            <option className='dark:bg-gray-800 dark:text-white' value="APIN">APIN</option>
                                        }
                                        {
                                            user && JSON.parse(user)?.groupname === 'lga' &&
                                            <Fragment>
                                                <option className='dark:bg-gray-800 dark:text-white' value="State">State</option>
                                                <option className='dark:bg-gray-800 dark:text-white' value="LGA">LGA</option>
                                            </Fragment>
                                        }
                                        {
                                            user && JSON.parse(user)?.groupname === 'facility' &&
                                            <Fragment>
                                                <option className='dark:bg-gray-800 dark:text-white' value="State">State</option>
                                                <option className='dark:bg-gray-800 dark:text-white' value="LGA">LGA</option>
                                                <option className='dark:bg-gray-800 dark:text-white' value="Facility">Facility</option>
                                            </Fragment>
                                        }
                                        </select>
                                    {
                                        (destination_type && destination_type === 'LGA') &&
                                            <LgaOptions setLga_id={setDestination_id} state_id={user && JSON.parse(user)?.state_id} />
                                    }
                                        <button
                                            className={`w-full md:max-w-max flex justify-center items-center py-2 px-6 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black gap-1 ${submitting && 'animate-pulse'}`}
                                            onClick={() => !submitting && submitRequest()}
                                        >
                                            <TbSend size={14} /><span>{submitting ? 'Sending...' : 'Send Request'}</span>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                showerror && <ErrorModal message={errormsg} />
            }
        </div>
    )
}

export default NewRequest