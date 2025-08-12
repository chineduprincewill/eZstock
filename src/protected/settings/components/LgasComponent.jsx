import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteLga, fetchAllLgas } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditLga from './forms/EditLga';

const LgasComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [lgas, setLgas] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [lga, setLga] = useState();
    const [lgaEditmodal, setEditLgaModal] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState();

    const columns = [
        {
            name: "L G A",
            selector: (row) => row?.lga_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.lga_name}</div>
            )
        },
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
                        title='Edit LGA'
                        onClick={() => lgaEditAction(row)}
                    />
                {
                    row?.status === 0 ?
                        <AiFillCloseCircle 
                            size={15} 
                            className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.lga_id) && 'animate-spin'}`} 
                            title='activate LGA'
                            onClick={() => lgaDelete(row?.lga_id, row?.status)}
                        />
                        :
                        <AiFillCheckCircle 
                            size={15} 
                            className={`cursor-pointer text-[#54c5d0] ${(delete_id && delete_id === row?.lga_id) && 'animate-spin'}`} 
                            title='deactivate LGA'
                            onClick={() => lgaDelete(row?.lga_id, row?.status)}
                        />
                }
                </div>
            ),
        },
    ];

    if(lgas?.status === "Token is Expired"){
        logout();
    }

    const lgaDelete = (id, status) => {
        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this LGA?`)){
            setDelete_id(id);
            deleteLga(token, id, setSuccess, setError, setDeleting)
        }
    }

    const lgaEditAction = (obj) => {
        setLga(obj);
        setEditLgaModal(true)
    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchAllLgas(token, setLgas, setError, setFetching)
    }, [record])

    return (
        <div className='w-full'>
        {
            fetching ? <LoadingBars />:
             (lgas && lgas.length > 0) && <RecordsTable columns={columns} data={lgas} />
        }
        {
            lgaEditmodal && <EditLga setEditLgaModal={setEditLgaModal} lga={lga} />
        }
        </div>
    )
}

export default LgasComponent