import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { deleteState, fetchAllStates } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import RecordsTable from '../../../common/RecordsTable';
import NewState from './forms/NewState';
import EditState from './forms/EditState';

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

    const columns = [
        {
            name: "State",
            selector: (row) => row?.state_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.state_name}</div>
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
                            className={`cursor-pointer text-[#54c5d0] ${(delete_id && delete_id === row?.state_id) && 'animate-spin'}`} 
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
        <div className='w-full'>
        {
            fetching ? <LoadingBars />:
             states?.states.length > 0 && <RecordsTable columns={columns} data={states?.states} />
        }
        {
            editmodal && <EditState setEditmodal={setEditmodal} state={state} />
        }
        </div>
    )
}

export default StatesComponent