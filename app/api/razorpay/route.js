import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) =>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)           //formData ko leke uska object bnayga

    // check if the razorpayOrderId is present on the server.
    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "Order Id not found"}) 
    }  

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: p.to_user})
    const secret = user.razorpaysecret

    // verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, 
        "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        // update the payment  status
        const updatedpayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: "true"}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedpayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false, message: "Payment verification failed"})
    }
}