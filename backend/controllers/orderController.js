import { response } from "express";
import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";

// import Stripe from "stripe";

// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);



// placing user order for frontend 

const placeOrder = async(req, res) =>{

    const frontend_url = "http://localhost:5174"
 try {
    const newOrder = new orderModel({
        userId:req.body.userId,
        items: req.body.items,
        amount:req.body.amount,
        address:req.body.address,

    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.id,{cartData:{}});
   

    res.json({
        success: true,
        message: "Your order has been placed successfully",
        orderId: newOrder._id, // Include order ID in the response
    });

    // const line_items = req.body.items.map((item)=>({
    //     price_data:{
    //         currency:"inr",
    //         product_data:{
    //             name:item.name
    //         },
    //         unit_amount:item.price*100*80
    //     },
    //     qunatity:item.qunatity
    // }))
    // line_items.push({
    //     price_data: {
    //         currency:"inr",
    //         product_data:{
    //             name: "Delivery Charges"
    //         },
    //         unit_amount:2*100*80
    //     },
    //     qunatity:1,
    // })
    // const session = await stripe.checkout.sessions.create({
    //     line_items: line_items,
    //     mode:'payment',
    //     success_url:`${frontend_url}/verfiy?success =true&orderId=${newOrder._id}`,
    //      cancel_url:`${frontend_url}/verfiy?success =false&orderId=${newOrder._id}`

    // })

    // res.json({
    //     success: true, session_url:session.url
    // })

    


   


 } catch (error) {
    console.log(error);
    res.json({
        success:false, message:"Error"
    })
 }
}

// user orders for frontend 

const userOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"});
    }
}

const listOrders = async (req,res)=>{
try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:"Error",
    })
}
}

// Api for updating order status

const updateStatus = async(req, res)=>{

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"});
    } catch (error) {
console.log(error);
res.json({success:false, message:"Error"});
    }
}


export {placeOrder,userOrders,listOrders,updateStatus}



