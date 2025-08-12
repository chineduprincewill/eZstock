import { TbLayoutDashboardFilled } from "react-icons/tb"
import PageTitle from "../../common/PageTitle"
import { AiOutlineDeliveredProcedure } from "react-icons/ai"
import { RiFolderReceivedFill } from "react-icons/ri"
import { BsBoxArrowInLeft } from "react-icons/bs"
import { CiDeliveryTruck } from "react-icons/ci"

const Dashboard = () => {

    let icon = <TbLayoutDashboardFilled size={20} />

    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full flex items-center justify-between'>   
                <PageTitle icon={icon} />
               
            </div>
            <div className='w-full mt-6 flex flex-wrap justify-between items-center'>
                <div className="w-full md:w-[32%] mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1">
                    <h1 className="w-full text-lg font-extralight pb-1 border-b border-gray-300 dark:border-gray-700">Total In-stock</h1>
                    <div className="w-full flex justify-between items-center my-4">
                        <RiFolderReceivedFill size={40} className="text-gray-500" />
                        <span className="text-4xl">324</span>
                    </div>
                </div>
                <div className="w-full md:w-[32%] mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1">
                    <h1 className="w-full text-lg font-extralight pb-1 border-b border-gray-300 dark:border-gray-700">Total Out-stock</h1>
                    <div className="w-full flex justify-between items-center my-4">
                        <AiOutlineDeliveredProcedure size={40} className="text-gray-500" />
                        <span className="text-4xl">213</span>
                    </div>
                </div>
                <div className="w-full md:w-[32%] mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1">
                    <h1 className="w-full text-lg font-extralight pb-1 border-b border-gray-300 dark:border-gray-700">Incoming Requests</h1>
                    <div className="w-full flex justify-between items-center my-4">
                        <BsBoxArrowInLeft size={40} className="text-gray-500" />
                        <span className="text-4xl">18</span>
                    </div>
                </div>
                <div className="w-full md:w-[32%] mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1">
                    <h1 className="w-full text-lg font-extralight pb-1 border-b border-gray-300 dark:border-gray-700">Incoming Dispatches</h1>
                    <div className="w-full flex justify-between items-center my-4">
                        <CiDeliveryTruck size={40} className="text-gray-500" />
                        <span className="text-4xl">32</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard