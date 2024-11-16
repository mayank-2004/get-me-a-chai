"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react' 
import { useRef } from 'react'
import { fetchpayment, fetchuser, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession
    // const ref = useRef()

    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentuser, setcurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your Donation!', {
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
        router.push(`/${username}`)
    }, [])


    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentuser(u)
        let dbpayments = await fetchpayment(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderID = a.id;
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": "amount", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
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
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='relative'>
                <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/16.gif?token-time=1733270400&token-hash=QS3sVKJW9q8GeUW9hq0FzQRBwBbeLrtkbsrgrXY8TEQ%3D" alt="" />

                <div className='absolute -bottom-14 right-[41%] md:right-[45%]'>
                    <img className='rounded-full border-gray-400 border-2' width={120} height={120} src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="" />
                </div>
            </div>
            <div className='info flex justify-center items-center flex-col my-20 gap-2'>
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} to get a Chai
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . ₹{payments.reduce((a,b) => a + b.amount, 0)} raised
                </div>
                <div className="payments flex w-[80%] gap-3 mt-8 flex-col md:flex-row">
                    <div className="supporters bg-slate-900 w-full md:w-1/2 p-8 rounded-xl">
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2> 
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-2 items-center'>
                                    <img width={38} className='rounded-full' src="user.gif" alt="" />
                                    <span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a mesage "{p.message}&quot;"</span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="makepayment bg-slate-900 w-full md:w-1/2 rounded-xl p-8">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <div>
                                <input onChange={handlechange} name='name' value={paymentform.name} className='my-2 w-full bg-slate-700 p-2 rounded-lg' type="text" placeholder='Enter Name' />
                                <input onChange={handlechange} name='message' value={paymentform.message} className='my-2 w-full bg-slate-700 p-2 rounded-lg' type="text" placeholder='Enter Message' />
                                <input onChange={handlechange} name='amount' value={paymentform.amount} className='my-2 w-full bg-slate-700 p-2 rounded-lg' type="text" placeholder='Enter the amount' />
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="w-full text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>Pay</button>
                            </div>
                        </div>
                        {/* or choose from these amounts */}
                        <div className='mt-5 flex gap-2 flex-col md:flex-row'>
                            <button className='bg-slate-700 p-2 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-700 p-2 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-700 p-2 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
