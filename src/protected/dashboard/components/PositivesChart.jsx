import React, { useContext, useEffect, useState } from 'react'
import AgeBands from '../../../common/AgeBands'
import LineChart from '../../../charts/LineChart'
import BarChart from '../../../charts/BarChart'
import { groupAllDataByWeek, prepareLast28DaysData } from '../../../apis/functions'
import { AppContext } from '../../../context/AppContext'
import { FaEye } from 'react-icons/fa'

const PositivesChart = ({ chart, generateTitle, detail, period, setShowpositivemodal }) => {

    const { selectedState } = useContext(AppContext);
    const [labels, setLabels] = useState();
    const [counts, setCounts] = useState();
    const [gender, setGender] = useState();
    const [modality, setModality] = useState();
    const [age, setAge] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        if(detail){
            let data = detail.filter(itm => itm?.record_status === 'Linked');

            data = Array.from(
                new Map(data.map(item => [item.patient_id, item])).values()
            );

            if(modality){
                data = data.filter(itm => itm?.obsDatapoint === modality);
            }

            if(gender){
                data = data.filter(itm => itm?.cGender === gender);
            }

            if(age){
                //console.log(age.split(' - ')[1]);
                const minAge = age.split(' - ')[0];
                const maxAge = age.split(' - ')[1];
                data = age === '50+' ? data.filter(itm => itm?.cAge >= 50) : data.filter(itm => itm?.cAge >= minAge && itm?.cAge <= maxAge);
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
    }, [detail, modality, period, gender, age])

    return (
        <div className='w-full pt-2 md:pt-0 border-t md:border-none border-gray-300 dark:border-gray-700'>
            <div className={`space-y-2`}>
                <h1 className='flex justify-between items-center border-b border-gray-300 dark:border-gray-700 font-extralight pb-1'>
                <span>Positives - {selectedState !== null ? selectedState : <span className='text-red-500'>Select state to view chart</span>}</span>
                <span>{total && total+' records'}</span>
                {
                    selectedState !== null &&
                    <FaEye 
                        size={20} 
                        className='cursor-pointer'
                        onClick={() => setShowpositivemodal(true)}
                    />
                }
                </h1>
                <div className='w-full flex items-center space-x-4 border-none border-gray-300 dark:border-gray-700'>
                    <AgeBands setAge={setAge} />
                    <select
                        className='border-b border-gray-400 dark:border-gray-700 dark:bg-transparent p-2 text-sm text-gray-500'
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value=''>Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
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
                        <option value='Community Index'>Community Index</option>
                    </select>
                </div>
            {
                chart === 'line' ? 
                    <LineChart labels={labels && labels} data={counts && counts} barsColor='rgba(125,157,37,1)' bgColor='rgba(186,200,147,1)' title={`${generateTitle} positive`} />
                    :
                    <BarChart labels={labels && labels} data={counts && counts} barsColor='rgba(125,157,37,1)' title={`${generateTitle} positive`} />
            }            
            </div>
        </div>
    )
}

export default PositivesChart