import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { adminDb } from "@/lib/supabase";

export async function POST(req:Request){
 const raw=await req.text();const signature=req.headers.get("x-razorpay-signature")||"";
 const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
 if(!secret)return NextResponse.json({error:"Webhook is not configured."},{status:503});
 const expected=crypto.createHmac("sha256",secret).update(raw).digest("hex");
 const a=Buffer.from(signature),b=Buffer.from(expected);
 if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return NextResponse.json({error:"Invalid signature."},{status:400});
 const event=JSON.parse(raw);
 if(event.event==="order.paid"){
  const orderId=event.payload?.order?.entity?.id;
  if(orderId){const db=adminDb();await db.from("bookings").update({payment_status:"paid",status:"pending"}).eq("gateway_order_id",orderId);}
 }
 return NextResponse.json({received:true});
}
