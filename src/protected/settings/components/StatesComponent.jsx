import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { deleteState, fetchAllStates } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import RecordsTable from '../../../common/RecordsTable';
import NewState from './forms/NewState';
import EditState from './forms/EditState';
import { HiOutlinePlus } from 'react-icons/hi';

const StatesComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [states, setStates] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [state, setState] = useState();
    const [editmodal, setEditmodal] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState();
    const [createmodal, setCreatemodal] = useState(false);

    const columns = [
        {
            name: "State",
            selector: (row) => row?.state_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.state_name}</div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                    <AiOutlineEdit 
                        size={15} 
                        className='cursor-pointer' 
                        title='Edit state'
                        onClick={() => stateEditAction(row)}
                    />
                {
                    row?.status === 0 ?
                        <AiFillCloseCircle 
                            size={15} 
                            className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.state_id) && 'animate-spin'}`} 
                            title='activate state'
                            onClick={() => stateDelete(row?.state_id, row?.status)}
                        />
                        :
                        <AiFillCheckCircle 
                            size={15} 
                            className={`cursor-pointer text-green-600 ${(delete_id && delete_id === row?.state_id) && 'animate-spin'}`} 
                            title='deactivate state'
                            onClick={() => stateDelete(row?.state_id, row?.status)}
                        />
                }
                </div>
            ),
            },
    ];

    if(states?.status === "Token is Expired"){
        logout();
    }

    const stateDelete = (id, status) => {
        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this state?`)){
            setDelete_id(id);
            deleteState(token, id, setSuccess, setError, setDeleting)
        }
    }

    const stateEditAction = (obj) => {
        setState(obj);
        setEditmodal(true)

    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchAllStates(token, setStates, setError, setFetching)
    }, [record])

    return (
        <div className='w-full grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>State</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreatemodal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
             states?.states.length > 0 && <RecordsTable columns={columns} data={states?.states} />
        }
        {
            createmodal && <NewState setCreatemodal={setCreatemodal} />
        }
        {
            editmodal && <EditState setEditmodal={setEditmodal} state={state} />
        }
        </div>
    )
}

export default StatesComponent