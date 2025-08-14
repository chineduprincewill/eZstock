import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteFacility, fetchAllFacilities } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditFacility from './forms/EditFacility';
import { HiOutlinePlus } from 'react-icons/hi';
import NewFacility from './forms/NewFacility';

const FacilitiesComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [facilities, setFacilities] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [facility, setFacility] = useState();
    const [facilityEditmodal, setFacilityEditModal] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState();
    const [createFacilityModal, setCreateFacilityModal] = useState(false);

    const columns = [
        {
            name: "Facility",
            selector: (row) => row?.facility_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid gap-1'>
                    <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.facility_name}</div>
                </div>
            )
        },
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
                        title='Edit facility'
                        onClick={() => facilityEditAction(row)}
                    />
                {
                    row?.status === 0 ?
                        <AiFillCloseCircle 
                            size={15} 
                            className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.facility_id) && 'animate-spin'}`} 
                            title='activate facility'
                            onClick={() => facilityDelete(row?.facility_id, row?.status)}
                        />
                        :
                        <AiFillCheckCircle 
                            size={15} 
                            className={`cursor-pointer text-green-600 ${(delete_id && delete_id === row?.facility_id) && 'animate-spin'}`} 
                            title='deactivate facility'
                            onClick={() => facilityDelete(row?.facility_id, row?.status)}
                        />
                }
                </div>
            ),
        },
    ];

    if(facilities?.status === "Token is Expired"){
        logout();
    }

    const facilityDelete = (id, status) => {
        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this facility?`)){
            setDelete_id(id);
            deleteFacility(token, id, setSuccess, setError, setDeleting)
        }
    }

    const facilityEditAction = (obj) => {
        setFacility(obj);
        setFacilityEditModal(true)
    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchAllFacilities(token, setFacilities, setError, setFetching)
    }, [record])

    return (
        <div className='w-full grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>Facilities</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreateFacilityModal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
             (facilities && facilities.length > 0) && <RecordsTable columns={columns} data={facilities} />
        }
        {
            createFacilityModal && <NewFacility setCreateFacilityModal={setCreateFacilityModal} />
        }
        {
            facilityEditmodal && <EditFacility setFacilityEditModal={setFacilityEditModal} facility={facility} />
        }
        </div>
    )
}

export default FacilitiesComponent