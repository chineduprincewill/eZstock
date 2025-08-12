import React, { useContext, useEffect, useState } from 'react'
import { fetchtVendorSummary, fetchVendorsScopeSummary } from '../../../apis/dashboardActions';
import { AppContext } from '../../../context/AppContext';
import LoadingBars from '../../../common/LoadingBars';
import VendorScopeSummary from './VendorScopeSummary';
import VendorCategorySummary from './VendorCategorySummary';

const VendorSummary = () => {

    return (
        <div className='w-full grid space-y-4'>
            <VendorCategorySummary />
            <VendorScopeSummary />
        </div>
    )
}

export default VendorSummary