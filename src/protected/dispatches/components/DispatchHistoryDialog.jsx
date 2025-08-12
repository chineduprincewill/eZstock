import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AppContext } from '../../../context/AppContext'
import { fetchDispatchHistory } from '../../../apis/dispatchActions';
import { formatDate } from '../../../apis/functions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';

const DispatchHistoryDialog = ({ tool_id, batch_no, created_at, itemname, setHistoryDialog }) => {

    const { token } = useContext(AppContext);
    const [history, setHistory] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);

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
                        { row?.source_type === 'facility' && row?.source_facility+', '+row?.source_lga }
                        </span>
                        <span className='text-xs'>{formatDate(row?.dispatch_date)}</span>
                    </div>
                )
            },
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
                        <span className='capitalize text-sm'>{row?.dispatcher_name}</span>
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
                        <span className='capitalize text-sm'>{row?.receiver_name}</span>
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
            }
        ];

    useEffect(() => {
        const data = {
            tool_id, batch_no, created_at
        }

        fetchDispatchHistory(token, data, setHistory, setError, setFetching)
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[90%] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight text-lg'>
                            {`${itemname} Batch ${batch_no}`}
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setHistoryDialog(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                        {
                            fetching ? <LoadingBars /> :
                                history && <RecordsTable columns={columns} data={history} />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DispatchHistoryDialog