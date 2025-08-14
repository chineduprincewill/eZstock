import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { AppContext } from '../../context/AppContext'
import { deleteUser, fetchAllUsers, fetchStateUsers } from '../../apis/usersActions'
import LoadingBars from '../../common/LoadingBars'
import RecordsTable from '../../common/RecordsTable'
import NewUser from './components/forms/NewUser'
import EditUser from './components/forms/EditUser'
import { formatErrorMessage } from '../../apis/functions'
import ErrorModal from '../../common/ErrorModal'

const Users = () => {

    const { token, user, record, refreshRecord, logout } = useContext(AppContext);
    const [users, setUsers] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState();
    const [delete_id, setDelete_id] = useState();
    const [createUserModal, setCreateUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState(false);
    const [userinfo, setUserinfo] = useState();
    let icon = <AiOutlineUser size={20} />

    const columns = [
        {
            name: "Staff",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1 text-gray-600 dark:text-gray-400'>
                    <span className='text-sm'>{row?.name}</span>
                    <span className='text-xs text-selectedprimary'>{row?.email}</span>
                </div>
            )
        },
        {
            name: "Role",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400'>
                    <span className='capitalize text-sm'>{row?.groupname} - {row?.role}</span>
                </div>
            )
        },
        {
            name: "Station",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid text-gray-600 dark:text-gray-400'>
                    <span className='text-sm'>{row?.facility_name} {row?.lga_name} {row?.state_name}</span>
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                {
                    user && JSON.parse(user)?.groupname === 'APIN' ?
                        <AiOutlineEdit 
                            size={15} 
                            className='cursor-pointer' 
                            title='Edit user'
                            onClick={() => userEditAction(row)}
                        /> :
                        <AiOutlineSearch 
                            size={15} 
                            className='cursor-pointer' 
                            title='View user'
                        />
                }
                {
                    user && JSON.parse(user)?.groupname === 'APIN' &&
                        (row?.status === 0 ?
                            <AiFillCloseCircle 
                                size={15} 
                                className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.id) && 'animate-spin'}`} 
                                title='activate user'
                                onClick={() => userDelete(row?.id, row?.status)}
                            />
                            :
                            <AiFillCheckCircle 
                                size={15} 
                                className={`cursor-pointer text-green-500 ${(delete_id && delete_id === row?.id) && 'animate-spin'}`} 
                                title='deactivate user'
                                onClick={() => userDelete(row?.id, row?.status)}
                            />
                        )
                }
                </div>
            ),
        },
    ];

    if(users?.status === "Token is Expired"){
        logout();
    }

    const userDelete = (id, status) => {
        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this user?`)){
            setDelete_id(id);
            deleteUser(token, id, setSuccess, setError, setDeleting)
        }
    }

    const userEditAction = (obj) => {
        setUserinfo(obj);
        setEditUserModal(true)
    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    if(error){
        setTimeout(() => {
            setError(); 
            setDelete_id();
        }, 5000);
    }

    useEffect(() => {
        user && JSON.parse(user)?.groupname === 'APIN' ?
            fetchAllUsers(token, setUsers, setError, setFetching):
            fetchStateUsers(token, setUsers, setError, setFetching)
    }, [record])

    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full flex items-center justify-between'>   
                {icon}
                {
                    user && JSON.parse(user)?.groupname === 'APIN' &&
                    <button 
                        className='px-4 py-2 rounded-md bg-primary hover:bg-hoverprimary text-white text-sm capitalize'
                        onClick={() => setCreateUserModal(true)}
                    >
                        new user
                    </button>
                }
            </div>
            <div className='w-full mt-6'>
            {
                fetching ? <LoadingBars /> :
                users && users.length > 0 && <RecordsTable columns={columns} data={users} />
            }
            {
                createUserModal && <NewUser setCreateUserModal={setCreateUserModal} />
            }
            {
                editUserModal && <EditUser setEditUserModal={setEditUserModal} user={userinfo} />
            }
            {
                error && <ErrorModal message={formatErrorMessage(error)} />
            }
            </div>

        </div>
    )
}

export default Users