import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { TbVirusSearch } from 'react-icons/tb'
import { AppContext } from '../../context/AppContext'
import { formatDate, tokenExpired } from '../../apis/functions'
import { fetchCasefinders } from '../../apis/casefindersActions'
import TimerComponent from '../../common/TimerComponent'
import { AiOutlineEdit } from 'react-icons/ai'
import NotificationLoader from '../../common/NotificationLoader'
import RecordsTable from '../../common/RecordsTable'
import PwdResetModal from './components/PwdResetModal'
import { MdLockReset } from 'react-icons/md'
import EditModal from './components/EditModal'

const Casefinders = () => {

    const { token, record } = useContext(AppContext);

    const [casefinders, setCasefinders] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [reset, setReset] = useState(false);
    const [resetdata, setResetdata] = useState();
    const [editmodal, setEditmodal] = useState(false);

    const icon = <TbVirusSearch size={25} />

    const columns = [
        {
            name: "Case finder",
            selector: (row) => row?.fullname,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div>{row?.fullname}</div>
                    <div>{row?.email}</div>
                    <div>{row?.phoneno}</div>
                </div>
            )
        },
        {
            name: "Station",
            selector: (row) => row?.facility,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div>{row?.facility}, {row?.lga}, {row?.state} State</div>
                </div>
            )
        },
        {
            name: "User category",
            selector: (row) => row?.usercategory,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.usercategory}</div>
                </div>
            )
        },
        {
            name: "Datapoint",
            selector: (row) => row?.datapoint,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.datapoint}</div>
                </div>
            )
        },
        {
            name: "Linkage Cordinator",
            selector: (row) => row?.linkage_coordinator,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.linkage_coordinator}</div>
                </div>
            )
        },
        {
            name: "Date",
            selector: (row) => row?.entry_date,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{formatDate(row?.entry_date)}</div>
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              <div className='flex space-x-2 items-center'>
                  <AiOutlineEdit 
                      size={20} 
                      className='cursor-pointer text-blue-600' 
                      title='Edit casefinder'
                      onClick={() => updateRecord(row)}
                  />
                  <MdLockReset 
                      size={20} 
                      className='cursor-pointer' 
                      title='reset password'
                      onClick={() => resetPassword(row)}
                  />
              </div>
            ),
          },
    ];

    if(tokenExpired(casefinders)){
        window.location.assign('https://apps.apin.org.ng/sitroom/situation-login.php');
    }

    const resetPassword = (obj) => {
        setResetdata(obj);
        setReset(true);
    }

    const updateRecord = (obj) => {
        setResetdata(obj);
        setEditmodal(true);
    }

    useEffect(() => {
        fetchCasefinders(token, setCasefinders, setError, setFetching);
    }, [record])

    return (
        <div className='w-full m-0'>
            <div className='w-full flex justify-between bg-white dark:bg-[#19212c] h-16 items-center px-2'>
                <PageTitle icon={icon} />
                <TimerComponent />
            </div>

            <div className='w-full my-4 px-2'>
            {
                fetching ? <NotificationLoader /> : 
                    (casefinders !== null && casefinders?.casefinders.length > 0) && <RecordsTable columns={columns} data={casefinders?.casefinders} />
            }
            </div>
        {
            reset && <PwdResetModal setReset={setReset} resetdata={resetdata} />
        }
        {
            editmodal && <EditModal setEditmodal={setEditmodal} updatedata={resetdata} />
        }
        </div>
    )
}

export default Casefinders