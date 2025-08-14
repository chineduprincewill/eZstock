import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { deleteFacility, deleteItemCategory, fetchAllFacilities, fetchItemCategories } from '../../../apis/settingsActions';
import LoadingBars from '../../../common/LoadingBars';
import RecordsTable from '../../../common/RecordsTable';
import EditFacility from './forms/EditFacility';
import EditItemCategory from './forms/EditItemCategory';
import { HiOutlinePlus } from 'react-icons/hi';
import NewItem from './forms/NewItem';
import NewItemCategory from './forms/NewItemCategory';

const ItemCategoriesComponent = () => {

    const { token, record, refreshRecord, logout } = useContext(AppContext);
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [delete_id, setDelete_id] = useState();
    const [success, setSuccess] = useState();
    const [deleting, setDeleting] = useState();
    const [categoryEditModal, setCategoryEditModal] = useState(false);
    const [category, setCategory] = useState();
    const [createCategoryModal, setCreateCategoryModal] = useState(false);

    const columns = [
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
                        onClick={() => categoryEditAction(row)}
                    />
                {
                    row?.status === 0 ?
                        <AiFillCloseCircle 
                            size={15} 
                            className={`cursor-pointer text-red-600 ${(delete_id && delete_id === row?.category_id) && 'animate-spin'}`} 
                            title='activate category'
                            onClick={() => categoryDelete(row?.category_id, row?.status)}
                        />
                        :
                        <AiFillCheckCircle 
                            size={15} 
                            className={`cursor-pointer text-green-600 ${(delete_id && delete_id === row?.category_id) && 'animate-spin'}`} 
                            title='deactivate category'
                            onClick={() => categoryDelete(row?.category_id, row?.status)}
                        />
                }
                </div>
            ),
        },
    ];

    if(categories?.status === "Token is Expired"){
        logout();
    }

    const categoryDelete = (id, status) => {
        const data = {
            id, status
        }

        if(window.confirm(`Are you sure you want to ${status === 0 ? 'activate' : 'deactivate'} this item category?`)){
            setDelete_id(id);
            deleteItemCategory(token, data, setSuccess, setError, setDeleting)
        }
    }


    const categoryEditAction = (obj) => {
        console.log(obj)
        setCategory(obj);
        setCategoryEditModal(true)
    }


    if(success){
        refreshRecord(Date.now())
        setSuccess();
        setDelete_id();
    }

    useEffect(() => {
        fetchItemCategories(token, setCategories, setError, setFetching)
    }, [record])

    return (
        <div className='grid gap-1 p-4'>
            <div className='flex justify-between items-center p-1 border-b border-gray-300 dark:border-gray-700'>
                <span>Categories</span>
                <div 
                    className='p-1 rounded-full bg-primary hover:bg-hoverprimary text-white shadow-lg'
                    onClick={() => setCreateCategoryModal(true)}
                >
                    <HiOutlinePlus 
                        size={20} 
                        className='cursor-pointer' 
                    />
                </div>
            </div>
        {
            fetching ? <LoadingBars />:
             (categories && categories.length > 0) && <RecordsTable columns={columns} data={categories} />
        }
        
        {
            createCategoryModal && <NewItemCategory setCreateCategoryModal={setCreateCategoryModal} />
        }
        {
            categoryEditModal && <EditItemCategory setCategoryEditModal={setCategoryEditModal} itemcategory={category} />
        }
        </div>
    )
}

export default ItemCategoriesComponent