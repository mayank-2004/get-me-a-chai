"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        console.log(session)

        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        update()
        let a = await updateProfile(e, session.user.name)
        toast('Profile updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='px-6'>
                <h2 className='text-2xl font-bold text-center my-7'>Welcome to your Dashboard</h2>
                <form action={handleSubmit}className="max-w-xl mx-auto flex flex-col">

                    {/* input for name */}
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/*input for email  */}
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for username */}
                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for profile picture */}
                    <div className="mb-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-white dark:text-white">Profile picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name="profilepic" id="profilepic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover picture */}
                    <div className="mb-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-white dark:text-white">Cover Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name="coverpic" id="coverpic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for razorpay id */}
                    <div className="mb-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name="razorpayid" id="razorpayid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for razorpay secret */}
                    <div className="mb-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name="razorpaysecret" id="razorpaysecret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='my-3'>
                        <button type="submit" className="text-white bg-gradient-to-br from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  block w-full items-center justify-center" >Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard
