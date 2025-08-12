import React, { useContext, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { TbBellRinging2Filled } from 'react-icons/tb';
import { formatDate, formatDateAndTime } from '../../../apis/functions';
import { FiCheckCircle } from 'react-icons/fi';
import { PiQuestion } from 'react-icons/pi';
import RecordsTable from '../../../common/RecordsTable';
import { AppContext } from '../../../context/AppContext';

const OutgoingDispatches = ({ dispatches }) => {

    const { user } = useContext(AppContext);
    const [showOutgoing, setShowOutgoing] = useState(false);

    console.log(dispatches);

    const columns = [
        {
            name: "To",
            selector: (row) => row?.destination_id,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>
                    { row?.destination_type === 'state' && row?.destination_state+' '+row?.destination_type }
                    { row?.destination_type === 'lga' && row?.destination_lga+' '+row?.destination_type }
                    { row?.destination_type === 'facility' && row?.destination_facility+', '+row?.destination_lga }
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
                    <div className='grid py-2 space-y-1'>
                        <span className='text-sm'>{formatDate(row?.received_date)}</span>
                        <FiCheckCircle size={16} className='text-green-600' />
                    </div>:
                    <div className='grid py-2 space-y-1'>
                        <span className='text-sm text-gray-500'>dispatching...</span>
                        <PiQuestion size={20} className='text-orange-600' />
                    </div>
            ),
        },
    ];

    return (
        <div className='w-full'>
            <div 
                className='w-full p-4 flex justify-between items-center shadow-md cursor-pointer'
                onClick={() => setShowOutgoing(!showOutgoing)}
            >
                <div className='flex space-x-3'>
                    <span className='text-lg font-extralight'>Outgoing dispatches</span>
                </div>
            {
                showOutgoing ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} /> 
            }

            </div>
            <div className={`${showOutgoing ? 'block' : 'hidden'} p-4`}>
            {
                dispatches && dispatches.length > 0 ? 
                <RecordsTable columns={columns} data={dispatches} /> :
                <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No dispatch found!</div>
            }
            </div>
        </div>
    )
}

export default OutgoingDispatches