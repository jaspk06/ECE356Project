import StarRating from "./StarRating";
import { useParams } from "react-router-dom";
import { UserDisplay } from "../types/UserDisplay";

export default function UserCard() {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{"Activity"}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"some activity"}</p>
                </div>
            </div>
        </div>
    )
}