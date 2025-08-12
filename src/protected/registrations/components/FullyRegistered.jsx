import React from 'react'
import RecordsTable from '../../../common/RecordsTable'

const FullyRegistered = ({ data, columns, label }) => {

    let filteredData = data.filter(dt => (
        dt?.reg_count >= 60 && dt?.doc_count >= 4
    ));

    return (
        
        <div className='grid'>
            <h1 className='text-lg capitalize mb-4'>{label}</h1>
            <RecordsTable columns={columns} data={filteredData} />
        </div>
    )
}

export default FullyRegistered