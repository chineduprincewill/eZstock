import React from 'react'
import RecordsTable from '../../../common/RecordsTable';

const AllVendors = ({ data, columns, label }) => {

    /**const filterVendors = useMemo(() => {
        let filteredVendors;

        if(filtered){
            if(filtered === 'fully registered'){
                filteredVendors = vendors?.vendors.filter(vendor => (
                    vendor?.reg_count >= 60 && vendor?.doc_count >= 4) 
                );
            }

            if(filtered === 'partly registered'){
                filteredVendors = vendors?.vendors.filter(vendor => (
                    (vendor?.reg_count > 0 && vendor?.reg_count < 60) || (vendor?.doc_count > 0 && vendor?.doc_count < 4)) 
                );
            }

            if(filtered === 'only signed-up'){
                filteredVendors = vendors?.vendors.filter(vendor => (
                    (!vendor?.reg_count || vendor?.reg_count === null || vendor?.reg_count === 0) && (!vendor?.doc_count || vendor?.doc_count === null)) 
                );
            }
        }
        else {
            filteredVendors === vendors?.vendors;
        }

        return filteredVendors;

    }, [filtered])*/

    return (
        <div className='grid'>
            <h1 className='text-lg capitalize mb-4'>{label}</h1>
            <RecordsTable columns={columns} data={data} />
        </div>
    )
}

export default AllVendors