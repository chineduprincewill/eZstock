import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { fetchDispatches } from '../../apis/dispatchActions';
import PageTitle from '../../common/PageTitle';
import { AiOutlineSend } from 'react-icons/ai';
import OutgoingDispatches from './components/OutgoingDispatches';
import LoadingBars from '../../common/LoadingBars';
import IncomingDispatches from './components/IncomingDispatches';

const Dispatches = () => {

    const { token, user, record, logout } = useContext(AppContext);
    const [dispatches, setDispatches] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [incoming, setIncoming] = useState();
    const [outgoing, setOutgoing] = useState();
    const [showIncoming, setShowIncoming] = useState(true);

    if(dispatches?.status === "Token is Expired"){
        logout();
    }

    const userData = user && JSON.parse(user);
    const filterKey = {
        APIN: 'state_id',
        state: 'state_id',
        lga: 'lga_id',
        facility: 'facility_id'
    }[userData?.groupname];

    const incomingDispatches = () => {
        return filterKey 
            ? dispatches && dispatches.filter(dsp => dsp?.destination_type === userData?.groupname && dsp?.destination_id === userData?.[filterKey])
            : null;
    }

    const outgoingDispatches = () => {
        /**let filteroutgoing = dispatches && dispatches.filter(dsp => (
            dsp?.source === user && (JSON.parse(user)?.groupname+'_'+JSON.parse(user)?.state_id)
        ))*/
        return filterKey 
            ? dispatches && dispatches.filter(dsp => dsp?.source_type === userData?.groupname && dsp?.source_id === userData?.[filterKey])
            : null;
    }

    useEffect(() => {
        fetchDispatches(token, setDispatches, setError, setFetching)
    }, [record])

    useEffect(() => {
        setOutgoing(outgoingDispatches());
        setIncoming(incomingDispatches());
    }, [dispatches])

    let icon = <AiOutlineSend size={20} />

    return (
        <div className='w-full m-0 px-4'>
            <div className='w-full flex justify-between items-center px-2 pt-2 border-b-2 border-primary'>
                <div className='flex items-center gap-2'>
                    <button 
                        className={`px-6 py-2 rounded-t-lg ${showIncoming ? 'bg-primary text-white hover:bg-hoverprimary cursor-not-allowed' : 'border-t border-x border-gray-300 dark:border-gray-700 dark:text-white text-primary'}`}
                        onClick={() => setShowIncoming(true)}
                    >
                        Incoming
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-t-lg ${!showIncoming ? 'bg-primary text-white hover:bg-hoverprimary cursor-not-allowed' : 'border-t border-x border-gray-300 dark:border-gray-700 dark:text-white text-primary'}`}
                        onClick={() => setShowIncoming(false)}
                    >
                        Outgoing
                    </button>
                </div>
                <button 
                    className='px-4 py-2 rounded-md bg-primary hover:bg-hoverprimary text-white text-sm capitalize'
                    onClick={() => {}}
                >
                    dispatch
                </button>
            </div>
            <div className='w-full mt-6 mb-4 grid'>
                {
                    !incoming || !outgoing ? <LoadingBars /> :
                    (showIncoming ? <IncomingDispatches dispatches={incoming} /> : <OutgoingDispatches dispatches={outgoing} />)
                }
            </div>
        </div>
    )
}

export default Dispatches