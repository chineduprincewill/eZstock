import React, { useContext, useEffect, useState } from 'react'
import LineChart from '../../../charts/LineChart'
import BarChart from '../../../charts/BarChart'
import { groupAllDataByWeek, prepareLast28DaysData } from '../../../apis/functions';
import { AppContext } from '../../../context/AppContext';
import { FaEye } from 'react-icons/fa';

const TestsChart = ({ chart, generateTitle, detail, period, setShowtestmodal }) => {

    const { selectedState } = useContext(AppContext);
    const [labels, setLabels] = useState();
    const [counts, setCounts] = useState();
    const [modality, setModality] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {  
        if(detail){
            let data = detail;
            if(modality){
                data = detail.filter(itm => itm?.obsDatapoint === modality);
            }
            if(period === 'weekly'){
                let chartArr = Object.entries(groupAllDataByWeek(data)).sort();
                let lbl = [];
                let cnt = []
                chartArr.map(item => {
                    lbl.push(item[0]);
                    cnt.push(item[1]);
                })
                setLabels(lbl);
                setCounts(cnt);
            }
            else{
                setLabels(prepareLast28DaysData(data)?.labels);
                setCounts(prepareLast28DaysData(data)?.counts);
                console.log(prepareLast28DaysData(data));
            }
            setTotal(data.length);
        }
    }, [detail, modality, period])

    return (
        <div className='w-full space-y-2'>                      
            <h1 className='w-full flex justify-between items-center border-b border-gray-300 dark:border-gray-700 font-extralight pb-1'>
                <span>Tests - {selectedState !== null ? selectedState : <span className='text-red-500'>Select state to view chart</span>}</span>
                <span>{total && total+' records'}</span>
                {
                    selectedState !== null &&
                    <FaEye 
                        size={20} 
                        className='cursor-pointer'
                        onClick={() => setShowtestmodal(true)}
                    />
                }
            </h1>
            <div className='w-full flex items-center space-x-4 border-none border-gray-300 dark:border-gray-700'>
                <select
                    className='border-b border-gray-400 dark:border-gray-700 dark:bg-transparent p-2 text-sm text-gray-500'
                    onChange={(e) => setModality(e.target.value)}
                >
                    <option value=''>Modality</option>
                    <option value='Index'>Index</option>
                    <option value='PITC'>PITC</option>
                    <option value='AP3'>AP3</option>
                    <option value="KeyPop">KP</option>
                    <option value='Community'>Community</option>
                    <option value='Community index'>Community Index</option>
                </select>
            </div>
            {
                chart === 'line' ?
                    <LineChart labels={labels && labels} data={counts && counts} barsColor='rgba(0,80,114,1)' bgColor='rgba(84,197,207,1)' title={`${generateTitle} test`} />
                    :
                    <BarChart labels={labels && labels} data={counts && counts} barsColor='rgba(84,197,207,1)' title={`${generateTitle} test`} />
            }

        </div>
    )
}

export default TestsChart