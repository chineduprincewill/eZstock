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
        <div className='w-full m-0 p-4'>
            <div className='w-full flex justify-between items-center'>   
                <PageTitle icon={icon} />
                <button 
                    className='px-4 py-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black text-sm capitalize'
                    onClick={() => {}}
                >
                    dispatch
                </button>
            </div>
            <div className='w-full mt-12 mb-4 grid space-y-6'>
                { fetching || !incoming ? <LoadingBars /> : <IncomingDispatches dispatches={incoming} /> }
                { fetching || !outgoing ? <LoadingBars /> : <OutgoingDispatches dispatches={outgoing} /> }
            </div>
        </div>
    )
}

export default Dispatches