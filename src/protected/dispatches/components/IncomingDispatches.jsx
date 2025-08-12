import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import RecordsTable from '../../../common/RecordsTable';
import { FiCheckCircle } from 'react-icons/fi';
import { PiQuestion } from 'react-icons/pi';
import { formatDate } from '../../../apis/functions';
import { TbBellRinging2Filled } from 'react-icons/tb';
import { acknowledgeDispatch } from '../../../apis/dispatchActions';

const IncomingDispatches = ({ dispatches }) => {

    const { user, token, refreshRecord } = useContext(AppContext);
    const [showIncoming, setShowIncoming] = useState(false);
    const [error, setError] = useState();
    const [acknowledging, setAcknowledging] = useState(false);
    const [success, setSuccess] = useState();
    const [isAcknowledging, setIsAcknowledging] = useState();

    console.log(dispatches);

    const columns = [
        {
            name: "From",
            selector: (row) => row?.source_id,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>
                    { row?.source_type === 'APIN' && 'APIN HQ Warehouse' }
                    { row?.source_type === 'state' && row?.source_state+' '+row?.source_type }
                    { row?.source_type === 'lga' && row?.source_lga+' '+row?.source_type }
                    { row?.source_type === 'facility' && row?.source_facility+' '+row?.source_type }
                    </span>
                    <span className='text-xs'>{formatDate(row?.dispatch_date)}</span>
                </div>
            )
        },
        {
            name: "Dispatcher",
            selector: (row) => row?.dispatcher_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='capitalize text-sm'>{user && JSON.parse(user)?.name === row?.dispatcher_name ? 'me' : row?.dispatcher_name}</span>
                    <span className='text-xs'>{row?.dispatcher_email}</span>
                </div>
            )
        },
        {
            name: "Received by",
            selector: (row) => row?.receiver_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='capitalize text-sm'>{user && JSON.parse(user)?.name === row?.receiver_name ? 'me' : row?.receiver_name}</span>
                    <span className='text-xs'>{row?.receiver_email}</span>
                </div>
            )
        },
        {
            name: "Item",
            selector: (row) => row?.itemname,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>{row?.quantity} {row?.packtype} {row?.itemname}</span>
                    <span className='text-sm'>{row?.unit_quantity} pcs</span>
                </div>
            )
        },
        {
            name: "",
            button: true,
            selector: (row) => row?.received_date,
            filterable: true,
            sortable: true,
            cell: (row) => (
                row?.received_date ?
                    <div className='w-full grid py-2 gap-1'>
                        <span className='text-sm'>{formatDate(row?.received_date)}</span>
                        <div className='max-w-max p-1 rounded-full'>
                            <FiCheckCircle size={16} className='text-green-600' />
                        </div>
                    </div>:
                    <div className='w-full grid py-2 gap-1'>
                        <div className='max-w-max p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                            <PiQuestion 
                                size={20} 
                                className={`text-orange-600 cursor-pointer ${acknowledging && isAcknowledging === row?.dispatch_id && 'animate-ping'}`} 
                                onClick={() => acknowledge(row?.dispatch_id)}
                            />
                        </div>
                        <span className='text-xs text-gray-500'>if received, click icon above</span>
                    </div>
            ),
        },
    ];

    const newIncoming = () => {
        let newreceived = dispatches.filter(dps => !dps?.received_date );
        return newreceived.length > 0 && newreceived.length;
    }

    const acknowledge = (id) => {
        if(window.confirm('Are you acknowledging that you have received this item?')){
            const data = { id };
            setIsAcknowledging(id);

            acknowledgeDispatch(token, data, setSuccess, setError, setAcknowledging)
        }
    }

    if(success){
        setSuccess();
        setIsAcknowledging();
        window.location.reload();
    }

    return (
        <div className='w-full'>
            <div 
                className='w-full p-4 flex justify-between items-center shadow-md cursor-pointer'
                onClick={() => setShowIncoming(!showIncoming)}
            >
                <div className='flex space-x-3'>
                    <span className='text-lg font-extralight'>Incoming dispatches</span>
                {
                    newIncoming() &&
                        <div className='flex items-center text-orange-600 pt-1'>
                            <TbBellRinging2Filled size={15} />
                            <span className='text-xs'>{newIncoming()}</span>
                        </div>
                }
                </div>
            {
                showIncoming ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} /> 
            }

            </div>
            <div className={`${showIncoming ? 'block' : 'hidden'} p-4`}>
            {
                dispatches && dispatches.length > 0 ? 
                <RecordsTable columns={columns} data={dispatches} /> :
                <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No dispatch found!</div>
            }
            </div>
        </div>
    )
}

export default IncomingDispatches