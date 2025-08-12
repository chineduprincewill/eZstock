import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BarChart from '../../charts/BarChart';
import AgeBands from '../../common/AgeBands';
import TimerComponent from '../../common/TimerComponent';
import GoogleMapComponent from '../../common/GoogleMapComponent';
import LineChart from '../../charts/LineChart';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { ImStatsBars } from 'react-icons/im';
import { formatNumber } from 'chart.js/helpers';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { generateFiscalYear, pageRefresh } from '../../apis/functions';
import { fetchStateDetail, fetchStatesSummary, getTotal28Positives, getTotal28Tests, getTotalPositives, getTotalTests } from '../../apis/dashboardActions';
import SectionLoader from '../../common/SectionLoader';
import { MdGpsFixed } from 'react-icons/md';

const Dashboard = () => {

    const { locality, totaltesting, totalpositive, day28testing, day28positive, updateDashboardValues, cancelFilter, selectedState, updateStateSelection, record, refreshRecord } = useContext(AppContext);
    const [chart, setChart] = useState('line');
    const [period, setPeriod] = useState('weekly');
    const [refreshpage, setRefreshpage] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [googleMaps, setGoogleMaps] = useState(window.google);
    const [mapview, setMapview] = useState('testing');
    const [markers, setMarkers] = useState();
    const [pmarkers, setPmarkers] = useState();
    const [statesSummary, setStatesSummary] = useState(null);
    const [stateDetail, setStateDetail] = useState(null);
    const [loc, setLoc] = useState()
    const [totaltest, setTotaltest] = useState();
    const [totalpos, setTotalpos] = useState();
    const [day28test, setDay28test] = useState();
    const [day28pos, setDay28pos] = useState();
    const [showmap, setShowmap] = useState(false);

    const labels = () => {
        let data = [];
        for(let i = 1; i <= 52; i++){
            data.push(i);
        }
        return data
    }

    const data = () => {
        let data = Array.from({
            length: 52
        }, () => Math.floor(Math.random() * 101));
        return data;
    }

    const clearSelection = () => {
        cancelFilter();
        updateStateSelection(null);
        window.location.reload();
    }

    const displayMapMarkers = () => {
        setShowmap(true);
        refreshRecord(Date.now());
    }

    const toggleMapview = (view, status) => {
        if(view === 'positive' && status === 'testing'){
            setMapview('testing')
        }
        else if(view === 'testing' && status === 'positive'){
            setMapview('positive')
        }
    }

    const generateTitle = () => {
        let msg = period === 'weekly' ? 'Weekly' : 'Last 28 days';
        return msg;
    }

    const generateMarkers = () => {
        let mkrdata = [];
        if(stateDetail !== null){
            stateDetail.map((sd, index) => {
                mkrdata.push({
                    id: index,
                    position: {
                        lat: parseFloat(sd?.latitude),
                        lng: parseFloat(sd?.longitude)
                    }
                })
            })
        }
        //console.log(mkrdata);
        return mkrdata;
    }

    const generatePositiveMarkers = () => {
        let mkrdata = [];
        if(stateDetail !== null){
            stateDetail.map((sd, index) => {
                if(sd?.record_status === 'Linked'){
                    mkrdata.push({
                        id: index,
                        position: {
                            lat: parseFloat(sd?.latitude),
                            lng: parseFloat(sd?.longitude)
                        }
                    })
                }
            })
        }
        //console.log(mkrdata);
        return mkrdata;
    }

    useEffect(() => {
        fetchStatesSummary({}, setStatesSummary, setError, setFetching);

        const intervalId = setInterval(() => {
            fetchStatesSummary({}, setStatesSummary, setError, setFetching);
        }, 60000); // 60 seconds
      
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if(statesSummary !== null){
            setLoc(statesSummary?.state);
            setTotaltest(getTotalTests(statesSummary));
            setTotalpos(getTotalPositives(statesSummary));
            setDay28test(getTotal28Tests(statesSummary));
            setDay28pos(getTotal28Positives(statesSummary));
            /**updateDashboardValues(
                loc,
                getTotalTests(statesSummary),
                getTotalPositives(statesSummary),
                getTotal28Tests(statesSummary),
                getTotal28Positives(statesSummary)
            );*/
        }
    }, [Date.now()])

    useEffect(() => {
        if(stateDetail !== null) {
            setMarkers(generateMarkers());
            setPmarkers(generatePositiveMarkers());
        }
    }, [selectedState, record]) 

    useEffect(() => {
        if(selectedState !== null){
            const data = {
                state: selectedState
            }
            fetchStateDetail(data, setStateDetail, setError, setLoading);
            setShowmap(false);
            setMapview('testing');
        }
    }, [selectedState])

    useEffect(() => {
        refreshRecord(Date.now())
    }, [selectedState])

    return (
        <div className='w-full m-0'>
            <div className='w-full flex justify-between bg-white dark:bg-[#19212c] h-16 items-center px-2'>
                <div className='flex items-baseline space-x-2 uppercase text-[#005072] dark:text-white font-extralight text-xl md:text-3xl'>
                    <div>EPI-SURVEILLANCE {locality && ' - '+locality}</div>
                    {locality && 
                        <div className='flex space-x-2 items-center'>
                            <AiOutlineCloseCircle 
                                size={15} 
                                className='text-red-700 cursor-pointer' 
                                title='cancel selection'
                                onClick={() => clearSelection()}
                            />
                        </div>
                    }
                </div>
                <TimerComponent />
            </div>

            <div className='w-full grid my-4 space-y-4'>
                <div className='w-full grid md:flex md:flex-row-reverse space-y-4 md:space-y-0'>
                    <div className='w-full md:w-2/5 pl-2 md:pl-4 pr-2 space-y-2'>
                        <h1 className='border-b border-gray-300 dark:border-gray-700 font-extralight pb-1'>Filter</h1>
                        <div className='w-full flex items-center space-x-4 pt-2 pb-4 border-b border-gray-300 dark:border-gray-700'>
                            <AgeBands />
                            <select
                                className='border border-gray-400 dark:border-gray-700 dark:bg-transparent p-2 text-sm text-gray-500'
                            >
                                <option value=''>Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <select
                                className='border border-gray-400 dark:border-gray-700 dark:bg-transparent p-2 text-sm text-gray-500'
                            >
                                <option value=''>Modality</option>
                                <option value='Index'>Index</option>
                                <option value='PITC'>PITC</option>
                                <option value='AP3'>AP3</option>
                                <option value="KeyPop">KP</option>
                                <option value='Community'>Community</option>
                                <option value='Community Index'>Community Index</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full md:w-3/5 pl-2 md:pr-0.5 pr-2 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>Total Tests</span>
                                <span className='text-2xl md:text-4xl'>
                                    {totaltesting ? formatNumber(totaltesting) : (totaltest ? formatNumber(totaltest) : <SectionLoader />) }
                                </span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>Total Positives</span>
                                <span className='text-2xl md:text-4xl text-[#7d9d25]'>
                                    {totalpositive ? formatNumber(totalpositive) : (totalpos ? formatNumber(totalpos) : <SectionLoader />)}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>28-Day Tests</span>
                                <span className='text-2xl'>
                                    {day28testing ? formatNumber(day28testing) : (day28test ? formatNumber(day28test) : <SectionLoader />)}</span>
                            </div>
                            <div className={`grid text-center p-2 w-[48.5%] bg-gray-200 dark:bg-gray-700`}>
                                <span className='text-xs'>28-Day Positives</span>
                                <span className='text-2xl text-[#7d9d25]'>
                                    {day28positive ? formatNumber(day28positive) : (day28pos ? formatNumber(day28pos) : <SectionLoader />)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full grid md:flex px-2 space-y-4 md:space-y-0'>
                    <div className={`w-full grid md:w-3/5`}>
                        <div className='h-12 flex items-center'>
                        {
                            selectedState !== null && (
                                showmap ?
                                <div className='w-full flex items-center space-x-8 justify-between'>
                                    <div 
                                        className={`cursor-pointer text-sm py-1 ${mapview === 'testing' && 'text-gray-300 dark:text-gray-700'}`}
                                        onClick={() => toggleMapview(mapview, 'testing')}
                                    >
                                        <IoMdArrowDropleft size={30} />
                                    </div>
                                    <div>
                                    {
                                        mapview === 'testing' ? 'Saturation/coverage for testing' : 'Positives identification'
                                    }
                                    </div>
                                    <div 
                                        className={`cursor-pointer text-sm py-1 ${mapview === 'positive' && 'text-gray-300 dark:text-gray-700'}`}
                                        onClick={() => toggleMapview(mapview, 'positive')}
                                    >
                                        <IoMdArrowDropright size={30} />
                                    </div>
                                </div>
                                :
                                <div className='w-full flex items-center space-x-8 justify-center'>
                                    <div
                                        className='flex space-x-2 items-center cursor-pointer text-green-800 dark:text-green-300'
                                        onClick={() => displayMapMarkers()}
                                    >
                                        <span className='uppercase'>view on map</span>
                                        <MdGpsFixed size={15} />
                                    </div>
                                </div>
                            )
                                
                        }
                        </div>
                    {
                        mapview === 'testing' ?
                            <GoogleMapComponent loading={loading} selectedState={selectedState} markers={markers && markers} />
                            :
                            <GoogleMapComponent loading={loading} selectedState={selectedState} markers={pmarkers && pmarkers} />
                    }
                        
                    </div>
                    <div className='w-full md:w-2/5 px-3 pt-2 md:pt-0 border-t md:border-none border-gray-300 dark:border-gray-700'>
                        <div className={`mt-0 md:mt-[-10px] space-y-4`}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-6 px-2'>
                                    <div 
                                        className={`cursor-pointer text-sm ${period === 'weekly' && 'border-b-2'} border-[#54c5cf] py-1 dark:font-extralight`}
                                        onClick={() => setPeriod('weekly')}
                                    >
                                        Weekly
                                    </div>
                                    <div 
                                        className={`cursor-pointer whitespace-nowrap text-sm ${period === '28days' && 'border-b-2'} border-[#54c5cf] py-1 dark:font-extralight`}
                                        onClick={() => setPeriod('28days')}
                                    >
                                        Last 28 days
                                    </div>
                                </div>
                                <div className='w-full flex space-x-4 items-center justify-end'>
                                    <IoAnalyticsOutline 
                                        size={30} 
                                        className={`cursor-pointer ${chart === 'line' ? 'text-[#114862]' : 'text-[#54c5cf]'}`} 
                                        onClick={() => setChart('line')}
                                    />
                                    <ImStatsBars 
                                        size={20} 
                                        className={`cursor-pointer ${chart === 'bar' ? 'text-[#114862]' : 'text-[#54c5cf]'}`}
                                        onClick={() => setChart('bar')}
                                    />
                                </div>
                            </div>
                            
                        {
                            chart === 'line' ?
                                <LineChart labels={labels()} data={data()} barsColor='rgba(0,80,114,1)' bgColor='rgba(84,197,207,1)' title={`${generateTitle()} test`} />
                                :
                                <BarChart labels={labels()} data={data()} barsColor='rgba(84,197,207,1)' title={`${generateTitle()} test`} />
                        }
                        {
                            chart === 'line' ? 
                                <LineChart labels={labels()} data={data()} barsColor='rgba(125,157,37,1)' bgColor='rgba(186,200,147,1)' title={`${generateTitle()} positive`} />
                                :
                                <BarChart labels={labels()} data={data()} barsColor='rgba(125,157,37,1)' title={`${generateTitle()} positive`} />
                        }            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard