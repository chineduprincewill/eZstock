import React, { useEffect, useMemo, useState } from 'react'
import RecordsTable from '../../../common/RecordsTable'
import LoadingBars from '../../../common/LoadingBars';

const CategorizationRecords = ({columns, data}) => {

    const [updatedData, setUpdatedData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setUpdatedData(data);
        setTimeout(() => setLoading(false), 500); 
    }, [data])

    console.log(updatedData);

    return (
        loading ? <LoadingBars /> :
        (updatedData && <RecordsTable columns={columns} data={updatedData} />)
    )
}

export default CategorizationRecords