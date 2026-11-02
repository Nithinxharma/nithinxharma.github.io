import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/supabase";
import { razorpayClient } from "@/lib/razorpay";

const schema=z.object({
 customer_name:z.string().min(2),phone:z.string().min(10).max(15),email:z.string().email().optional().or(z.literal("")),
 address:z.string().min(10),start_date:z.string().date(),end_date:z.string().date(),
 payment_method:z.enum(["razorpay","cod"]),items:z.array(z.object({product_id:z.string().uuid(),quantity:z.number().int().min(1)})).min(1)
});
export async function POST(req:Request){
 try{
  const parsed=schema.safeParse(await req.json());
  if(!parsed.success)return NextResponse.json({error:"Please check the booking details."},{status:400});
  const v=parsed.data;if(v.end_date<v.start_date)return NextResponse.json({error:"Invalid rental dates."},{status:400});
  const db=adminDb();
  const ids=v.items.map(i=>i.product_id);
  const {data:products,error}=await db.from("products").select("id,name,price_sale,price_rental_daily,stock_quantity,is_active").in("id",ids);
  if(error)throw error;
  if(!products||products.length!==ids.length||products.some(p=>!p.is_active))return NextResponse.json({error:"One or more products are unavailable."},{status:409});
  let amount=0;
  for(const item of v.items){const p=products.find(x=>x.id===item.product_id)!;amount+=Number(p.price_rental_daily||p.price_sale||0)*item.quantity;}
  const {data:booking,error:bookingError}=await db.from("bookings").insert({
   customer_name:v.customer_name,phone:v.phone,email:v.email||null,address:v.address,start_date:v.start_date,end_date:v.end_date,
   payment_method:v.payment_method,status:"pending",payment_status:"unpaid",total_amount:amount,currency:"INR"
  }).select("id").single();
  if(bookingError)throw bookingError;
  const rows=v.items.map(i=>({booking_id:booking.id,product_id:i.product_id,quantity:i.quantity}));
  const {error:itemError}=await db.from("booking_items").insert(rows);if(itemError)throw itemError;
  if(v.payment_method==="cod")return NextResponse.json({booking_id:booking.id,status:"pending",message:"Enquiry received. Store confirmation is required."});
  const order=await razorpayClient().orders.create({amount:Math.round(amount*100),currency:"INR",receipt:booking.id});
  await db.from("bookings").update({gateway_order_id:order.id}).eq("id",booking.id);
  return NextResponse.json({booking_id:booking.id,razorpay_order:order,key_id:process.env.RAZORPAY_KEY_ID});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Could not create booking."},{status:500});}
}
