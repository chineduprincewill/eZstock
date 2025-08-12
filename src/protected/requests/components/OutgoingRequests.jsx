import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { fetchIncomingRequests, fetchOutgoingRequests } from '../../../apis/requestsActions';
import { formatDateAndTime } from '../../../apis/functions';
import { AiOutlineEdit } from 'react-icons/ai';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import OutgoingRequestUpdate from './OutgoingRequestUpdate';
import { FaCommentDots } from 'react-icons/fa';
import RemarksComponentContainer from './RemarksComponentContainer';

const OutgoingRequests = () => {

    const { token, user, record, logout } = useContext(AppContext);

    const [requests, setRequests] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState();
    const [showUpdateform, setShowUpdateform] = useState(false);
    const [requestToUpdate, setRequestToUpdate] = useState();
    const [showRemarks, setShowRemarks] = useState(false);
    const [remarksToShow, setRemarksToShow] = useState();

    const columns = [
        {
            name: "To",
            selector: (row) => row?.from,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>
                    {
                        row?.destination_type === 'state' && row?.tostate+' '+row?.destination_type
                    }
                    {
                        row?.destination_type === 'facility' && row?.tofacility+' '+row?.destination_type+', '+row?.tolga
                    }
                    {
                        row?.destination_type === 'lga' && row?.tolga+' '+row?.destination_type
                    }
                    {
                        row?.destination_type === 'APIN' && row?.tostate+' HQ Warehouse'
                    }
                    </span>
                    <span className='text-xs'>{formatDateAndTime(row?.created_at)}</span>
                </div>
            )
        },
        {
            name: "Requester",
            selector: (row) => row?.requester_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='capitalize text-sm'>{user && JSON.parse(user)?.name === row?.requester_name ? 'me' : row?.requester_name}</span>
                    <span className='text-xs'>{row?.requester_email}</span>
                </div>
            )
        },
        {
            name: "Approved by",
            selector: (row) => row?.approver_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='capitalize text-sm'>{user && JSON.parse(user)?.name === row?.approver_name ? 'me' : row?.approver_name}</span>
                    <span className='text-xs'>{row?.approver_email}</span>
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
            selector: (row) => row?.status,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span 
                        className={`text-sm
                            ${row?.status === 'Approved' && 'text-green-500'}
                            ${row?.status === 'Pending' && 'text-orange-400'}
                            ${row?.status === 'Rejected' && 'text-red-600'}
                        `}
                    >
                        {row?.status}
                    </span>
                    <div className='flex space-x-2 items-center'>
                        <AiOutlineEdit 
                            size={15} 
                            className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md hover:p-0.5' 
                            title='attend to request'
                            onClick={() => requestUpdateAction(row)}
                        />
                    {
                        row?.remark && 
                            <FaCommentDots 
                                size={15} 
                                className='text-blue-500 cursor-pointer hover:text-blue-300' 
                                onClick={() => remarksContainerPopup(row?.remark)}
                            />
                    }
                    </div>
                </div>
            ),
        },
    ];

    if(requests?.status === "Token is Expired"){
        logout();
    }

    const remarksContainerPopup = (rmk) => {
        setRemarksToShow(rmk);
        setShowRemarks(true);
    }


    const requestUpdateAction = (obj) => {
        setRequestToUpdate(obj);
        setShowUpdateform(true);
    }


    useEffect(() => {
        fetchOutgoingRequests(token, setRequests, setError, setFetching);
    }, [record])

    return (
        <div className='w-full'>
        {
            fetching ? <LoadingBars /> :
            requests && requests.length > 0 ? 
                <RecordsTable columns={columns} data={requests} /> :
                <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No request found!</div>
        }
        {
            showUpdateform && <OutgoingRequestUpdate setShowUpdateform={setShowUpdateform} requestToUpdate={requestToUpdate} />
        }
        {
            showRemarks && <RemarksComponentContainer setShowRemarks={setShowRemarks} remark={remarksToShow} />
        }
        </div>
    )
}

export default OutgoingRequests