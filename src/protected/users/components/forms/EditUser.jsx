import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import StateOptions from '../../../../common/StateOptions'
import LgaOptions from '../../../../common/LgaOptions'
import { AppContext } from '../../../../context/AppContext'
import FacilityOptions from '../../../../common/FacilityOptions'
import { updateUser } from '../../../../apis/usersActions'
import { formatErrorMessage } from '../../../../apis/functions'

const EditUser = ({ setEditUserModal, user }) => {

    const { token, refreshRecord } = useContext(AppContext);
    
    const [name, setName] = useState(user?.name);
    const [groupname, setGroupname] = useState(user?.groupname);
    const [role, setRole] = useState(user?.role);
    const [state_id, setState_id] = useState(user?.state_id);
    const [lga_id, setLga_id] = useState(user?.lga_id);
    const [facility_id, setFacility_id] = useState(user?.facility_id);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [updating, setUpdating] = useState();

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            id:user?.id, name, groupname, role, state_id, lga_id, facility_id
        }

        if(groupname === 'state' && !state_id){
            setError('State must be selected!')
        }
        else if(groupname === 'lga' && !lga_id){
            setError('LGA must be selected!')
        }
        else{
            updateUser(token, data, setSuccess, setError, setUpdating)
        }
    }

    if(success){
        refreshRecord(Date.now());
        setEditUserModal(false);
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                edit user
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setEditUserModal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            {
                                error && <div className='text-red-500 mb-2'>{formatErrorMessage(error)}</div>
                            }
                            <form onSubmit={handleUpdate} className='space-y-4'>
                                <input 
                                    type='text' 
                                    value={name}
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <select 
                                    value={groupname}
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setGroupname(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">select user category</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="APIN">APIN</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="state">state</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="lga">lga</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="facility">facility</option>
                                </select>
                                <select 
                                    value={role}
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">select user role</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="admin">admin</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="store keeper">store keeper</option>
                                </select>
                            
                                <StateOptions setState_id={setState_id} state_id={state_id} state_name={user?.state_name} />
                                <LgaOptions setLga_id={setLga_id} state_id={state_id} lga_id={lga_id} lga_name={user?.lga_name} />
                                <FacilityOptions setFacility_id={setFacility_id} lga_id={lga_id} facility_id={facility_id} facility_name={user?.facility_name} />
                                
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                >
                                    {
                                        updating ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Update'
                                        }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser