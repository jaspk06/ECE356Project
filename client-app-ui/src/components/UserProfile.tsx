/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    PencilIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import Heading from './Heading'
import UserCard from './UserCard'
import { useParams } from 'react-router-dom'
import { UserDisplay } from '../types/UserDisplay'

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

const fakeGetUser = (userId: number): UserDisplay => {
    return {
        firstName: "Greatest",
        lastName: "Ever",
        dateJoined: new Date()
    }
}



export default function UserProfile() {
    const { userId } = useParams<{ userId: string }>();

    const { firstName, lastName, dateJoined } = fakeGetUser(parseInt(userId ? userId : "-1"));

    return (
        <>
            <Heading firstName={firstName} lastName={lastName} dateJoined={dateJoined} />
            <UserCard />
        </>
    )
}