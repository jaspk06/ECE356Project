import {
    CalendarIcon,
    PencilIcon,
} from '@heroicons/react/solid'
import { UserDisplay } from '../types/UserDisplay'

export default function Heading(props: UserDisplay) {
    const { firstName, lastName, dateJoined, userID, setEditMode } = props;
    const localID = localStorage.getItem("userId")

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className='flex'>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{`${firstName} ${lastName}`}</h2>
                    {localID && parseInt(localID) === userID && < div className="mt-0 flex ml-auto">
                        <span className="sm:ml-3">
                            <button
                                onClick={() => setEditMode()}
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                Edit
                            </button>
                        </span>
                    </div>}
                </div>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {`Joined on ${new Date(dateJoined).toDateString()}`}
                    </div>
                </div>
            </div>
        </header >
    )
}