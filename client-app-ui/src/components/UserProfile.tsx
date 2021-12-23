import Heading from './Heading'
import UserCard from './UserCard'
import { useParams } from 'react-router-dom'
import { UserDisplay } from '../types/UserDisplay'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../utils'
import { User } from '../types/User'




export default function UserProfile() {
    const { userID } = useParams<{ userID: string }>();
    const [user, setUser] = useState<User>()

    useEffect(() => {
        axios.get(`${baseURL}user/${userID}`).then(res => {
            console.log(res.data)
            setUser(res.data[0]);
        })
    }, [])

    return (
        <>
            {user &&
                <>
                    <Heading firstName={user.firstName} lastName={user.lastName} dateJoined={user.dateJoined} userID={user.userID} />
                    <UserCard userID={user.userID}/>
                </>}
        </>
    )
}