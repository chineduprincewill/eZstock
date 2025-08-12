import React from 'react'
import RecordsTable from '../../../common/RecordsTable'

const OnlySignedup = ({ data, columns, label }) => {

    let filteredData = data.filter(dt => (
        (!dt?.reg_count || dt?.reg_count === null || dt?.reg_count === 0) && (!dt?.doc_count || dt?.doc_count === null || dt?.doc_count === 0)) 
    );

    return (
        <div className='grid'>
            <h1 className='text-lg capitalize mb-4'>{label}</h1>
            <RecordsTable columns={columns} data={filteredData} />
        </div>
    )
}

export default OnlySignedup