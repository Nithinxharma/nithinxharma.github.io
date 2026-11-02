import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";
import { z } from "zod";

const schema=z.object({start_date:z.string().date(),end_date:z.string().date(),product_id:z.string().uuid()});
export async function POST(req:Request){
 try{
  const parsed=schema.safeParse(await req.json());
  if(!parsed.success)return NextResponse.json({error:"Invalid availability request."},{status:400});
  const {start_date,end_date,product_id}=parsed.data;
  if(end_date<start_date)return NextResponse.json({error:"End date must be after start date."},{status:400});
  const db=adminDb();
  const {data,error}=await db.from("bookings").select("id,start_date,end_date,status").eq("status","confirmed").lte("start_date",end_date).gte("end_date",start_date);
  if(error)throw error;
  const {data:items,error:itemError}=await db.from("booking_items").select("quantity").eq("product_id",product_id).in("booking_id",(data||[]).map(x=>x.id));
  if(itemError)throw itemError;
  const reserved=(items||[]).reduce((s,x)=>s+x.quantity,0);
  const {data:product,error:productError}=await db.from("products").select("stock_quantity").eq("id",product_id).single();
  if(productError)throw productError;
  return NextResponse.json({available:Math.max(0,product.stock_quantity-reserved),reserved});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Availability check failed."},{status:500});}
}
