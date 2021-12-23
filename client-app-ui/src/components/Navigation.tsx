/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon, UserIcon, PlusIcon, CubeIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { baseURL } from '../utils';

const user = {
    name: 'User',
    email: 'example@example.com',
    imageUrl: ''
}
const userNavigation = [
    { name: 'Your Profile', href: 'users/20' },
]

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}
export default function Navigation(props: any) {
    const id = localStorage.getItem("userId");
    const [userId, setUserId] = useState<string>(id ? id : "");
    const [signedIn, setSignedIn] = useState(!!id);

    const signIn = (userId: string) => {
        axios.get(`${baseURL}user/${userId}`).then(res => {
            localStorage.setItem("userId", userId)
            setSignedIn(res.data.length > 0);
            setUserId("");
        })
    }

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                                            >
                                                <span className="sr-only">Home</span>
                                                <CubeIcon className="h-10 w-10" aria-hidden="true" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                {!signedIn &&
                                    <>

                                        <div className="flex">

                                            <input
                                                type="text"
                                                name="recipe-title"
                                                id="recipe-title"
                                                value={userId}
                                                onChange={e => setUserId(e.target.value)}
                                                placeholder='User ID'
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-l-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => signIn(userId)}
                                                className="px-4 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                                            >Login
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 border border-gray-300 rounded-r-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                                            > <Link to='/create/user'>Sign Up
                                                </Link></button>

                                        </div>
                                    </>}
                                {signedIn && <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Link to='/create/recipe'>
                                            <button
                                                type="button"
                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">Add Recipe</span>
                                                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </Link>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <UserIcon className="h-6 w-6" aria-hidden="true" />
                                            </Menu.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Link to={`/users/${userId}`}>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <p
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Your Profile
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    </Link>

                                                    <Link to={"/"}>
                                                        <Menu.Item key={"sign-out"} onClick={() => { localStorage.removeItem("userId"); setSignedIn(false); }}>
                                                            {({ active }) => (
                                                                <p
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    </Link>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
            <main>
                {props.children}
            </main>
        </div>
    );
}