import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/User";
import { baseURL } from "../utils";
import Toast from "./Toast";

interface UserFormProps { user?: User }

export default function UserForm(props: UserFormProps) {
    const { user } = props
    const navigate = useNavigate();
    const [form, setForm] = useState(user ? { ...user, birthday: new Date(user.birthday).toISOString().split('T')[0] } : { firstName: "", lastName: "", email: "", phoneNumber: "", birthday: "", gender: "" })
    const [toast, setToast] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToast({ ...toast, open: false });
        if (user)
            axios.put(`${baseURL}user/${user.userID}`, form).then(res => {
                if (res.status === 200)
                    setToast({ severity: "success", open: true, message: "Successfully updated user" })
                else
                    setToast({ severity: "error", open: true, message: res.data })
            }).catch(err => setToast({ severity: "error", open: true, message: err.message }));
        else
            axios.post(`${baseURL}user`, form).then(res => {
                if (res.status === 201) {
                    localStorage.setItem("userId", res.data.userID);
                    setToast({ severity: "success", open: true, message: "Successfully signed up!" })
                    setTimeout(() => navigate(`/`), 3000)
                    window.location.reload();
                }

                else
                    setToast({ severity: "error", open: true, message: res.data })
            }).catch(err => setToast({ severity: "error", open: true, message: err.message }));
        ;
    }
    return (
        <>
            <Toast open={toast.open} message={toast.message} severity={toast.severity} />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{user ? "Edit Profile" : "Sign Up"}</h2>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                value={form.firstName}
                                                onChange={e => setForm({ ...form, firstName: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                value={form.lastName}
                                                onChange={e => setForm({ ...form, lastName: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                name="tel"
                                                id="tel"
                                                autoComplete="tel"
                                                value={form.phoneNumber}
                                                onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="bday" className="block text-sm font-medium text-gray-700">
                                                Birthday
                                            </label>
                                            <input
                                                type="date"
                                                name="bday"
                                                id="bday"
                                                autoComplete="bday"
                                                value={form.birthday}
                                                onChange={e => setForm({ ...form, birthday: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                                                Gender
                                            </label>
                                            <input
                                                type="text"
                                                name="sex"
                                                id="sex"
                                                autoComplete="sex"
                                                value={form.gender}
                                                onChange={e => setForm({ ...form, gender: e.target.value })}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center py-2 px-4 mr-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-black hover:text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}