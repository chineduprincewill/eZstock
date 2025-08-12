import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteItemName, fetchItems } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditItem from './forms/EditItem';

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

    const columns = [
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.name}</div>
            )
        },
        {
            name: "Category",
            selector: (row) => row?.category_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div>{row?.category_name}</div>
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
                            className={`cursor-pointer text-[#54c5d0] ${(delete_id && delete_id === row?.name_id) && 'animate-spin'}`} 
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
        <div>
        {
            fetching ? <LoadingBars />:
             (items && items.length > 0) && <RecordsTable columns={columns} data={items} />
        }
        {
            itemEditModal && <EditItem setItemEditModal={setItemEditModal} item={itemobj} />
        }
        </div>
    )
}

export default ItemComponent