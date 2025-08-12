import React, { useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { LuGitPullRequest } from 'react-icons/lu';
import IncomingRequests from './components/IncomingRequests';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import OutgoingRequests from './components/OutgoingRequests';
import NewRequest from './components/forms/NewRequest';

const Requests = () => {

    const [createRequest, setCreateRequest] = useState(false);
    const [showoutgoing, setShowoutgoing] = useState(false);

    let icon = <LuGitPullRequest size={20} />

    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full flex justify-between items-center'>   
                <PageTitle icon={icon} />
                <button 
                        className='px-4 py-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black text-sm capitalize'
                        onClick={() => setCreateRequest(true)}
                    >
                        new request
                    </button>
            </div>
            <div className='w-full mt-8 mb-4 grid space-y-6'>
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
                        showoutgoing ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} /> 
                    }

                    </div>
                    <div className={`${showoutgoing ? 'block' : 'hidden'} p-4`}>
                        <OutgoingRequests />
                    </div>
                </div>
            </div>
            {
                createRequest && <NewRequest setCreateRequest={setCreateRequest} setShowoutgoing={setShowoutgoing} />
            }
        </div>
    )
}

export default Requests