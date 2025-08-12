import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteFacility, fetchAllFacilities } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditFacility from './forms/EditFacility';

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

    const columns = [
        {
            name: "Facility",
            selector: (row) => row?.facility_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.facility_name}</div>
            )
        },
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
                            className={`cursor-pointer text-[#54c5d0] ${(delete_id && delete_id === row?.facility_id) && 'animate-spin'}`} 
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
        <div className='w-full'>
        {
            fetching ? <LoadingBars />:
             (facilities && facilities.length > 0) && <RecordsTable columns={columns} data={facilities} />
        }
        {
            facilityEditmodal && <EditFacility setFacilityEditModal={setFacilityEditModal} facility={facility} />
        }
        </div>
    )
}

export default FacilitiesComponent