import Heading from './Heading'
import UserCard from './UserCard'
import { useParams } from 'react-router-dom'
import { UserDisplay } from '../types/UserDisplay'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../utils'
import { User } from '../types/User'
import UserForm from './UserForm'




export default function UserProfile() {
    const { userID } = useParams<{ userID: string }>();
    const [user, setUser] = useState<User>()
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get(`${baseURL}user/${userID}`).then(res => {
            console.log(res.data)
            setUser(res.data[0]);
        })
    }, [])

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    return (
        <>
            {user &&
                <>
                    {!editMode && <> <Heading setEditMode={toggleEditMode} firstName={user.firstName} lastName={user.lastName} dateJoined={user.dateJoined} userID={user.userID} />
                        <UserCard userID={user.userID} /> </>}
                    {editMode && <UserForm user={user} />}
                </>}

        </>
    )
}