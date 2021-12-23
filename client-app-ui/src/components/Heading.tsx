import {
    CalendarIcon,
    PencilIcon,
} from '@heroicons/react/solid'
import axios from 'axios';
import { useState } from 'react';
import { UserDisplay } from '../types/UserDisplay'
import { baseURL } from '../utils';

export default function Heading(props: UserDisplay) {
    const { firstName, lastName, dateJoined, userID, setEditMode, following } = props;
    const localID = localStorage.getItem("userId")
    const [isFollowing, setIsFollowing] = useState(following)

    const followUser = () => {
        if (localID && parseInt(localID) !== userID) {
            setIsFollowing(true);
            axios.post(`${baseURL}user/follow/${localID}/${userID}`).then(res => {
                if (res.status !== 200) setIsFollowing(false)


            }).catch(() => setIsFollowing(false))
        }

    }

    const unFollowUser = () => {
        if (localID && parseInt(localID) !== userID) {
            setIsFollowing(false)
            axios.delete(`${baseURL}user/follow/${localID}/${userID}`).then(res => {
                if (res.status !== 200) setIsFollowing(true)


            }).catch(() => setIsFollowing(true))
        }
    }

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
                    <br />
                    {localID && parseInt(localID) !== userID && !isFollowing &&
                        <button
                            onClick={() => followUser()}
                            type="button"
                            className="mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Follow
                        </button>}
                    {localID && parseInt(localID) !== userID && isFollowing && <button
                        onClick={() => unFollowUser()}
                        type="button"
                        className="mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Unfollow
                    </button>}
                </div>
            </div>
        </header >
    )
}