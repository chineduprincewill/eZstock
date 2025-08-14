import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteLga, fetchAllLgas } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditLga from './forms/EditLga';
import { HiOutlinePlus } from 'react-icons/hi';
import NewLga from './forms/NewLga';

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
    const [createLgaModal, setCreateLgaModal] = useState(false);

    const columns = [
        {
            name: "L G A",
            selector: (row) => row?.lga_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.lga_name}</div>
            )
        },
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
                            className={`cursor-pointer text-green-600 ${(delete_id && delete_id === row?.lga_id) && 'animate-spin'}`} 
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
        <div className='w-full grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>Local Government Area</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreateLgaModal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
             (lgas && lgas.length > 0) && <RecordsTable columns={columns} data={lgas} />
        }
        {
            createLgaModal && <NewLga setCreateLgaModal={setCreateLgaModal} />
        }
        {
            lgaEditmodal && <EditLga setEditLgaModal={setEditLgaModal} lga={lga} />
        }
        </div>
    )
}

export default LgasComponent