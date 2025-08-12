import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterComponent from './FilterComponent';
import { tableCustomStyles } from '../apis/functions';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const RecordsTable = ({ columns, data }) => {

    const [filteredData, setFilteredData] = useState(null);

    const tableData = {
        columns,
        data : filteredData
    };

    return (
        <div>
            <div className='overflow-auto w-[100%] mt-0 rounded-md'>
                <div className='hidden'>
                    <FilterComponent data={data} setFilteredData={setFilteredData} />
                </div>
                {filteredData !== null && 
                <DataTableExtensions {...tableData}>
                    <DataTable 
                        columns={columns} data={filteredData}
                        paginationTotalRows={filteredData.totalCount}
                        className='w-[100%] table table-responsive'
                        striped={false}
                        responsive={true}
                        overflowX
                        pagination
                        customStyles={tableCustomStyles}
                    ></DataTable>
                </DataTableExtensions>
                }
            </div>
        </div>
    )
}

export default RecordsTable
