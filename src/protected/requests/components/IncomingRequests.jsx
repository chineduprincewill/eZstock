import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { fetchIncomingRequests } from '../../../apis/requestsActions';
import { formatDateAndTime } from '../../../apis/functions';
import { AiOutlineEdit, AiOutlineSend } from 'react-icons/ai';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { TbBellRinging2Filled } from 'react-icons/tb';
import { FaCommentDots } from 'react-icons/fa';
import RemarksComponentContainer from './RemarksComponentContainer';
import IncomingRequestUpdate from './IncomingRequestUpdate';
import NewDispatch from '../../dispatches/components/forms/NewDispatch';

const IncomingRequests = () => {

    const { token, user, record, logout } = useContext(AppContext);

    const [requests, setRequests] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState();
    const [showincoming, setShowincoming] = useState(false);
    const [showRemarks, setShowRemarks] = useState(false);
    const [remarksToShow, setRemarksToShow] = useState();
    const [showUpdateform, setShowUpdateform] = useState(false);
    const [requestToUpdate, setRequestToUpdate] = useState();
    const [dispatchArray, setDispatchArray] = useState([]);
    const [createDispatch, setCreateDispatch] = useState(false);

    const columns = [
        {
            name: "From",
            selector: (row) => row?.from,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>
                        {row?.source_type === 'facility' ? row?.fromfacility+', '+row?.from : row?.from+' '+row?.source_type}
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
                    <div className='flex gap-2 items-center'>
                    {
                        row?.status !== 'Dispatched' &&
                            <AiOutlineEdit 
                                size={15} 
                                className='cursor-pointer over:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md hover:p-0.5' 
                                title='attend to request'
                                onClick={() => requestUpdateAction(row)}
                            />
                    }
                    {
                        row?.remark && 
                            <FaCommentDots 
                                size={15} 
                                className='text-blue-500 cursor-pointer hover:text-blue-300' 
                                onClick={() => remarksContainerPopup(row?.remark)}
                            />
                    }
                    {
                        row.status === 'Approved' && 
                            <AiOutlineSend 
                                size={15} 
                                className='cursor-pointer over:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md hover:p-0.5' 
                                title='Dispatch'
                                onClick={() => arrayToDispatch(row?.request_token)}
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

    const arrayToDispatch = (rqtoken) => {
        let filtered = requests.filter(rq => (rq?.request_token === rqtoken && rq?.status === 'Approved'));
        setDispatchArray(filtered);
        setCreateDispatch(true);
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
        fetchIncomingRequests(token, setRequests, setError, setFetching);
    }, [record])

    return (
        <div className='w-full'>
            <div 
                className='w-full p-4 flex justify-between items-center shadow-md cursor-pointer'
                onClick={() => setShowincoming(!showincoming)}
            >
                <div className='flex space-x-3'>
                    <span className='text-lg font-extralight'>Incoming requests</span>
                {
                    (requests && requests.length > 0) &&
                        <div className='flex items-center text-orange-600 pt-1'>
                            <TbBellRinging2Filled size={15} />
                            <span className='text-xs'>{requests.length}</span>
                        </div>
                }
                </div>
            {
                showincoming ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} /> 
            }

            </div>
            <div className={`${showincoming ? 'block' : 'hidden'} p-4`}>
            {
                fetching ? <LoadingBars /> :
                requests && requests.length > 0 ? 
                    <RecordsTable columns={columns} data={requests} /> :
                    <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No request found!</div>
            }
            </div>
            {
                showRemarks && <RemarksComponentContainer setShowRemarks={setShowRemarks} remark={remarksToShow} />
            }
            {
                showUpdateform && <IncomingRequestUpdate setShowUpdateform={setShowUpdateform} requestToUpdate={requestToUpdate} />
            }
            {
                createDispatch && <NewDispatch setCreateDispatch={setCreateDispatch} dispatchArray={dispatchArray} />
            }
        </div>
    )
}

export default IncomingRequests