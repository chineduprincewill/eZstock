import React, { useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { LuGitPullRequest } from 'react-icons/lu';
import IncomingRequests from './components/IncomingRequests';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import OutgoingRequests from './components/OutgoingRequests';
import NewRequest from './components/forms/NewRequest';

const Requests = () => {

    const [createRequest, setCreateRequest] = useState(false);
    const [showincoming, setShowincoming] = useState(true);

    return (
        <div className='w-full m-0 px-4'>
            <div className='w-full flex justify-between items-center px-2 pt-2 border-b-2 border-primary'>   
            <div className='flex items-center gap-2'>
                    <button 
                        className={`px-6 py-2 rounded-t-lg ${showincoming ? 'bg-primary text-white hover:bg-hoverprimary cursor-not-allowed' : 'border-t border-x border-gray-300 dark:border-gray-700 dark:text-white text-primary'}`}
                        onClick={() => setShowincoming(true)}
                    >
                        Incoming
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-t-lg ${!showincoming ? 'bg-primary text-white hover:bg-hoverprimary cursor-not-allowed' : 'border-t border-x border-gray-300 dark:border-gray-700 dark:text-white text-primary'}`}
                        onClick={() => setShowincoming(false)}
                    >
                        Outgoing
                    </button>
                </div>
                <button 
                        className='px-4 py-2 rounded-md bg-primary hover:bg-hoverprimary text-white text-sm capitalize'
                        onClick={() => setCreateRequest(true)}
                    >
                        new
                    </button>
            </div>
            <div className='w-full mt-8 mb-4 hidden space-y-6'>
                <IncomingRequests />

                <div 
                    className='w-full'
                >
                    <div 
                        className='w-full p-4 flex justify-between items-center shadow-md cursor-pointer'
                        onClick={() => setShowoutgoing(!showoutgoing)}
                    >
                        <span className='text-lg font-extralight'>Outgoing requests</span>
                    {
                        showincoming ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} /> 
                    }

                    </div>
                    <div className={`${showincoming ? 'block' : 'hidden'} p-4`}>
                        <OutgoingRequests />
                    </div>
                </div>
            </div>
            <div className='w-full mt-6 mb-4 grid'>
            {
                showincoming ? <IncomingRequests /> : <OutgoingRequests />
            }
            </div>
            {
                createRequest && <NewRequest setCreateRequest={setCreateRequest} setShowincoming={setShowincoming} />
            }
        </div>
    )
}

export default Requests