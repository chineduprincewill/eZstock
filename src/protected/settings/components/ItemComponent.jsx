import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteItemName, fetchItems } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditItem from './forms/EditItem';
import { HiOutlinePlus } from 'react-icons/hi';
import NewItem from './forms/NewItem';

const ItemComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [items, setItems] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState();
    const [itemEditModal, setItemEditModal] = useState(false);
    const [itemobj, setItemobj] = useState();
    const [createItemModal, setCreateItemModal] = useState(false);

    const columns = [
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.name}</div>
            )
        },
        {
            name: "Category",
            selector: (row) => row?.category_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-gray-600 dark:text-gray-400 text-sm'>{row?.category_name}</div>
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
                        title='Edit category'
                        onClick={() => itemEditAction(row)}
                    />
                {
                    row?.status === 0 ?
                        <AiFillCloseCircle 
                            size={15} 
                            className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.name_id) && 'animate-spin'}`} 
                            title='activate item'
                            onClick={() => itemDelete(row?.name_id, row?.status)}
                        />
                        :
                        <AiFillCheckCircle 
                            size={15} 
                            className={`cursor-pointer text-green-600 ${(delete_id && delete_id === row?.name_id) && 'animate-spin'}`} 
                            title='deactivate item'
                            onClick={() => itemDelete(row?.name_id, row?.status)}
                        />
                }
                </div>
            ),
        },
    ];

    if(items?.status === "Token is Expired"){
        logout();
    }

    const itemDelete = (id, status) => {
        const data = {
            id, status
        }

        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this item?`)){
            setDelete_id(id);
            deleteItemName(token, data, setSuccess, setError, setDeleting)
        }
    }

    const itemEditAction = (obj) => {
        setItemobj(obj);
        setItemEditModal(true)
    }

    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchItems(token, setItems, setError, setFetching)
    }, [record])

    return (
        <div className='grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>Items</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreateItemModal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
             (items && items.length > 0) && <RecordsTable columns={columns} data={items} />
        }
        {
            createItemModal && <NewItem setCreateItemModal={setCreateItemModal} />
        }
        {
            itemEditModal && <EditItem setItemEditModal={setItemEditModal} item={itemobj} />
        }
        </div>
    )
}

export default ItemComponent