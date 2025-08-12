import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import StateOptions from '../../../../common/StateOptions'
import LgaOptions from '../../../../common/LgaOptions'
import { AppContext } from '../../../../context/AppContext'
import FacilityOptions from '../../../../common/FacilityOptions'
import { createUsers } from '../../../../apis/usersActions'

const NewUser = ({ setCreateUserModal }) => {

    const { token, refreshRecord } = useContext(AppContext);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [groupname, setGroupname] = useState();
    const [role, setRole] = useState();
    const [state_id, setState_id] = useState();
    const [lga_id, setLga_id] = useState();
    const [facility_id, setFacility_id] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [saving, setSaving] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name, email, groupname, role, state_id, lga_id, facility_id, password, confirm_password
        }

        createUsers(token, data, setSuccess, setError, setSaving)
    }

    if(success){
        refreshRecord(Date.now());
        setCreateUserModal(false);
    }


    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[500px] bg-gray-100 dark:bg-gray-800 px-6 py-1 rounded-md`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2'>
                            <span className='capitalize font-extralight'>
                                create user
                            </span>
                            <span
                                className='cursor-pointer text-red-500'
                                onClick={() => setCreateUserModal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-4'>
                            {
                                error && <span className='text-red-500'>{JSON.stringify(error?.error)}</span>
                            }
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input 
                                    type='text' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <select 
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
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option className='dark:bg-gray-800 dark:text-white' value="">select user role</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="admin">admin</option>
                                    <option className='dark:bg-gray-800 dark:text-white' value="store keeper">store keeper</option>
                                </select>
                            
                                <StateOptions setState_id={setState_id} />
                                <LgaOptions setLga_id={setLga_id} state_id={state_id} />
                                <FacilityOptions setFacility_id={setFacility_id} lga_id={lga_id} />
                                <div className='w-full h-3 border-b border-gray-300 dark:border-gray-700'></div>
                                <input 
                                    type='email' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input 
                                    type='password' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <input 
                                    type='password' 
                                    className='w-full rounded-md p-2 border border-gray-500 bg-transparent'
                                    placeholder='Confirm password'
                                    onChange={(e) => setConfirm_password(e.target.value)}
                                    required
                                />
                                <button
                                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                >
                                    {
                                        saving ? 
                                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Save'
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

export default NewUser