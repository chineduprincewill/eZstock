import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { AppContext } from '../../../context/AppContext';
import { fetchVendorDetail } from '../../../apis/vendorsActions';
import LoadingBars from '../../../common/LoadingBars';
import { formatDate } from '../../../apis/functions';
import VendorAICategorization from '../../reviews/components/VendorAICategorization';
import VendorManualCategorization from '../../reviews/components/VendorManualCategorization';
import VendorManualCategorizationCard from '../../reviews/components/VendorManualCategorizationCard';
import ReviewerApprovalForm from '../../reviews/components/ReviewerApprovalForm';
import { useLocation } from 'react-router-dom';

const VendorDetail = ({ setsetShowVendorDetail, vendor }) => {

    const { token, user, logout } = useContext(AppContext);

    const loc = useLocation();
    const [detail, setdetail] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [open, setOpen] = useState();

    if(vendor?.status && vendor?.status === 'Token is Expired'){
        logout();
    }

    useEffect(() => {
        fetchVendorDetail(token, { email: vendor[1]}, setdetail, setError, setFetching)
    }, [])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full overflow-auto md:w-[95%] h-[90vh] rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 px-3 md:px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2 text-red-500'>
                            <span className='text-[#54c5d0] uppercase font-bold'>
                            {vendor[0]}
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setsetShowVendorDetail(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full py-2'>
                        {
                            fetching || !detail || detail.length === 0 ?
                                <div className='space-y-4'>
                                    <LoadingBars />
                                    <LoadingBars />
                                </div> : 
                                <div className='w-full space-y-4'>
                                {
                                    user && JSON.parse(user)?.category === "APPROVER" && loc.pathname === '/reviews' &&
                                    <div className='w-full grid'>
                                        <div className='grid md:flex md:justify-between md:items-baseline space-y-4 md:space-y-0'>
                                            <VendorAICategorization vendordata={detail} />
                                            <VendorManualCategorizationCard vendordata={detail?.vendor_categorization} />
                                            
                                        </div>
                                    {
                                        user && JSON.parse(user)?.category === 'APPROVER' ?
                                            <ReviewerApprovalForm vendordata={detail?.vendor_categorization} setShowVendorCategorizationForm={setsetShowVendorDetail} />
                                            :
                                            <VendorManualCategorization vendordata={detail} setShowVendorCategorizationForm={setsetShowVendorDetail} />
                                    }
                                        
                                    </div>
                                }
                                {
                                    Object.entries(detail).map((item, index) => (
                                        <div key={index} className='w-full p-4 shadow-xl capitalize'>
                                            <div 
                                                className='w-full flex justify-between items-center cursor-pointer'
                                                onClick={() => (open === index ? setOpen() : setOpen(index))}
                                            >
                                                <span className='text-lg'>{item[0].replaceAll("_", " ")}</span>
                                            {
                                                open === index ? 
                                                <AiOutlineMinus 
                                                    size={15} 
                                                />
                                                :
                                                <AiOutlinePlus 
                                                    size={15} 
                                                />

                                            }
                                            </div>
                                            <div className={`${open === index ? "flex" : "hidden"} flex-col gap-2 mt-4 px-2 md:px-4`}>
                                            {
                                                item[1].map((item, index) => (
                                                    <div key={index} className='grid py-1'>
                                                        <span className='text-xs text-gray-500'>{item?.question_text}</span>
                                                        <span>{item?.answer}</span>
                                                        <span className='text-xs text-gray-500'>{item?.item}</span>
                                                        <span>{(item?.item && item?.maximum_marks_awarded) ? (`${item?.marks_scored_by_vendor}/${item?.maximum_marks_awarded} - (`+Math.floor((item?.marks_scored_by_vendor/item?.maximum_marks_awarded) * 100) + "%)") : <span>{item?.marks_scored_by_vendor}</span> }</span>
                                                        {item?.categorization && 
                                                            <div className='grid'>
                                                                <div className='grid'>
                                                                    <span>{item?.categorization+' - '+item?.threshold}</span>
                                                                </div>
                                                                <div className='grid'>
                                                                    <span className='text-xs text-gray-500 mt-4'>Score</span>
                                                                    <span>{item?.score}</span>
                                                                    <span className='text-xs text-gray-500 mt-2'>Scored by</span>
                                                                    <span className='capitalize'>
                                                                        {item?.completed_by && item?.completed_by+ ' -'} {
                                                                        (item?.date_completed && item?.date_completed !== "" && item?.date_completed !== null) && formatDate(item?.date_completed)}
                                                                    </span>
                                                                    <span className='text-xs text-gray-500 mt-2'>Reviewed by</span>
                                                                    <span className='capitalize'>
                                                                        {item?.reviewed_by && item?.reviewed_by+' -'} {
                                                                        (item?.review_date && item?.review_date !== "" && item?.review_date !== null) && formatDate(item?.review_date)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        <span className='text-xs text-gray-500'>{item?.document_type}</span>
                                                        <span>{item?.document_type && 
                                                            <a href={import.meta.env.VITE_DOWNLOAD_URL+item?.file_path} download={item?.name} target='_blank'>{item?.name}</a>    
                                                        }</span>
                                                        <span>
                                                        {
                                                            item?.vendor_password && 
                                                                <div className='grid'>
                                                                    <span className='text-xs text-gray-500'>Company name</span>
                                                                    <span>{item?.company_name}</span>
                                                                    <span className='text-xs text-gray-500 mt-4'>Company email</span>
                                                                    <span className='lowercase'>{item?.email}</span>
                                                                </div>
                                                        }
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    ))

                                }
                                </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorDetail