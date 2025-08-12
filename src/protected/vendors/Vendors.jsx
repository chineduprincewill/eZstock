import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import CategorizationFilter from './components/CategorizationFilter';
import CategorizationsLabels from './components/CategorizationsLabels';
import { fetchCategorizedVendors } from '../../apis/vendorsActions';
import LoadingBars from '../../common/LoadingBars';
import CategorizationRecords from './components/CategorizationRecords';
import { FiSearch } from 'react-icons/fi';
import VendorDetail from './components/VendorDetail';

const Vendors = () => {

    const { token, logout } = useContext(AppContext);
    const [scope, setScope] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [vendors, setVendors] = useState(null);
    const [filteredData, setFilteredData] = useState();
    const [vendor, setVendor] = useState();
    const [showVendorDetail, setShowVendorDetail] = useState(false);

    const columns = [
        {
            name: "Company",
            selector: (row) => row?.company_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div 
                    className='grid space-y-1 font-extralight py-2 cursor-pointer'
                    onClick={() => openVendorDetailDialog(row?.company_name, row?.email)}
                >
                    <span className='capitalize'>{row?.company_name.toLowerCase()}</span>
                    <span className='text-xs dark:text-[#54c5d0] font-semibold dark:font-normal'>{row?.email}</span>
                </div>
            )
        },
        {
            name: "Categorization",
            selector: (row) => row?.categorization,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full font-extralight'>
                    {row?.categorization}
                </div>
            )
        },
        {
            name: "Scope",
            selector: (row) => row?.scope,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full font-extralight'>
                    {row?.scope}
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                    <FiSearch 
                        size={20} 
                        className='cursor-pointer text-[#54c5d0] hover:text-[#348a92]' 
                        title='vendor detail'
                        onClick={() => openVendorDetailDialog(row?.company_name, row?.email)}
                    />
                </div>
            )
        },
    ];

    if(vendors?.status && vendors?.status === 'Token is Expired'){
        logout();
    }

    const filterBySelection = () => {
        let filtered;

        console.log(category, scope);
        
        if(scope !== "" && category !== ""){
            if(category === "Not categorized"){
                filtered = vendors?.vendors.filter(dt => (
                    dt?.scope.includes(scope) && (dt?.categorization === null || !dt?.categorization || dt?.categorization === "")
                ));
            }
            else{
                filtered = vendors?.vendors.filter(dt => (
                    dt?.scope.includes(scope) && dt?.categorization === category
                ));
            } 
        }
        else if(scope !== ""){
            filtered = vendors?.vendors.filter(dt => (
                dt?.scope.includes(scope)
            ));
        }
        else if(category !== ""){
            if(category === "Not categorized"){
                filtered = vendors?.vendors.filter(dt => 
                    (dt?.categorization === null || !dt?.categorization || dt?.categorization === "")
                );
            }
            else{
                filtered = vendors?.vendors.filter(dt => dt?.categorization === category);
            }
        }

        setFilteredData(filtered);
    }

    const openVendorDetailDialog = (vendorName, vendorEmail) => {
        setVendor([vendorName, vendorEmail]);
        setShowVendorDetail(true)
    }

    useEffect(() => {
        fetchCategorizedVendors(token, setVendors, setError, setFetching)
    }, [])

    return (
        <div className='w-full m-0'>
            <CategorizationFilter 
                setScope={setScope} 
                setCategory={setCategory} 
                scope={scope} 
                category={category} 
                filterBySelection={filterBySelection}
            />
            <CategorizationsLabels category={category} scope={scope} />
            <div className='w-full my-4 px-4'>
            {
                fetching || vendors === null || vendors?.vendors.length === 0 ?
                <LoadingBars />
                :
                <CategorizationRecords 
                    columns={columns} 
                    data={filteredData ? filteredData : vendors?.vendors} 
                />
            }
            </div>
            {
                showVendorDetail && 
                    <VendorDetail setsetShowVendorDetail={setShowVendorDetail} vendor={vendor} />
            }
        </div>
    )
}

export default Vendors