import React, { useEffect, useMemo, useState } from 'react'
import RecordsTable from '../../../common/RecordsTable'
import LoadingBars from '../../../common/LoadingBars';

const ReviewsRecords = ({ columns, data, filter }) => {

    //const [updatedData, setUpdatedData] = useState();
    const [loading, setLoading] = useState(false);

    const filteredData = useMemo(() => {

        let filtered; 

        if(filter !== ""){
            if(filter === "Awaiting scoring"){
                filtered = data.filter(dt => (
                    dt?.vendor_score === "" || !dt?.vendor_score || dt?.vendor_score === null
                ));
            }
            else if(filter === "Awaiting categorization"){
                filtered = data.filter(dt => (
                    (dt?.vendor_score !== "" && dt?.vendor_score && dt?.vendor_score !== null) &&
                    (dt?.completed_by === "" || !dt?.completed_by || dt?.completed_by === null)
                ));
            }
            else if(filter === "Awaiting review"){
                filtered = data.filter(dt => (
                        (dt?.completed_by !== "" && dt?.completed_by && dt?.completed_by !== null) 
                        && (dt?.reviewed_by === "" || !dt?.reviewed_by || dt?.reviewed_by === null)
                    ));
            }
            else if(filter === "Approved"){
                filtered = data.filter(dt => (
                        (dt?.reviewed_by !== "" && dt?.reviewed_by && dt?.reviewed_by !== null) 
                        && (dt?.vendor_application_status === "REGISTERED") 
                        && (dt?.vendor_reject === "" || !dt?.vendor_reject || dt?.vendor_reject === null)
                    ));
            }
            else if(filter === "Rejected"){
                filtered = data.filter(dt => (
                        (dt?.reviewed_by !== "" && dt?.reviewed_by && dt?.reviewed_by !== null) 
                        && (dt?.vendor_application_status === "REJECTED" || dt?.vendor_reject === "REJECTED")
                    ));
            }
            else{
                filtered = data;
            }
        }

        return filtered;
    }, [filter])

    useEffect(() => {
        setLoading(true);
        //setUpdatedData(data);
        setTimeout(() => setLoading(false), 500); 
    }, [filter])

    console.log(filteredData);

    return (
        loading ? <LoadingBars /> :
        <RecordsTable columns={columns} data={filteredData ? filteredData : data} />
    )
}

export default ReviewsRecords