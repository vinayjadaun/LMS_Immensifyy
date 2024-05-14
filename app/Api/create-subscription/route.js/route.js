import { NextResponse } from "next/server";

export async function POST(req,res){
    const data=await req.json();
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    instance.subscriptions.create({
      plan_id: data.plan_id,
      customer_notify: 1,
      quantity: 1,
      total_count: 6,
      
      addons: [
      
      ],
      notes: {
        key1: "value3",
        key2: "value2"
      }
    })
    return NextResponse.json();

}