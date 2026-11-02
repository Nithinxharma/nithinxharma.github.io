import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight, CalendarDays, Gamepad2, ShieldCheck, Truck } from "lucide-react";

const products = [
  {name:"PS5 Console Rental",detail:"Console + standard controller + included game bundle",price:"₹700",unit:"per day",tag:"Most popular"},
  {name:"Extra DualSense Controller",detail:"Add another player to your session",price:"₹200",unit:"per day",tag:"Add-on"},
  {name:"Game Rentals",detail:"Choose titles from the available game library",price:"Custom",unit:"per title",tag:"Build a bundle"}
];

export default function Home(){
 return <><Header/><main>
  <section className="container" style={{padding:"92px 0 70px",display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:45,alignItems:"center"}}>
   <div><div className="eyebrow">Premium gaming, delivered in Jaipur</div><h1 className="hero-title" style={{fontSize:68,lineHeight:1.02,margin:"18px 0"}}>Make room<br/>for <span style={{color:"#ad7aff"}}>game night.</span></h1><p className="muted" style={{fontSize:18,lineHeight:1.7,maxWidth:520}}>Rent a PS5, pick your games, choose your dates. We’ll help arrange your next gaming session at home.</p><div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}><Link className="btn btn-primary" href="/booking">Build your rental <ArrowUpRight size={17}/></Link><Link className="btn btn-secondary" href="/catalog">Explore catalogue</Link></div><p className="muted" style={{fontSize:12,marginTop:22}}>Serving Jaipur City · Online payment or cash on delivery, subject to confirmation</p></div>
   <div className="panel" style={{minHeight:390,padding:24,display:"flex",flexDirection:"column",justifyContent:"space-between",background:"radial-gradient(circle at 50% 35%,#33204d 0,#17121f 43%,#101015 78%)"}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><span className="eyebrow">The weekend upgrade</span><span style={{fontSize:12,color:"#c3a3ff"}}>JJ / 001</span></div>
    <div style={{textAlign:"center",padding:20}}><Gamepad2 size={132} strokeWidth={1} color="#d5c0ff"/><div style={{fontSize:12,letterSpacing:".3em",color:"#c2a4f2",marginTop:12}}>PLAY · PAUSE · REPEAT</div></div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"end"}}><div><div className="muted" style={{fontSize:12}}>PS5 rental from</div><div style={{fontSize:36,fontWeight:800}}>₹700<span style={{fontSize:13,fontWeight:400,color:"#aaa"}}>/day</span></div></div><Link href="/booking" style={{color:"#c39cff"}}>Check options ↗</Link></div>
   </div>
  </section>
  <section className="container" style={{padding:"20px 0 65px"}}><div className="eyebrow">Straightforward pricing</div><h2 style={{fontSize:36,margin:"10px 0 25px"}}>Choose your setup.</h2><div className="grid-cards">{products.map(p=><article className="panel" key={p.name} style={{padding:24}}><div className="eyebrow">{p.tag}</div><h3 style={{fontSize:21}}>{p.name}</h3><p className="muted" style={{minHeight:44,lineHeight:1.6}}>{p.detail}</p><div style={{fontSize:30,fontWeight:800,marginTop:24}}>{p.price}<span className="muted" style={{fontSize:13,fontWeight:400}}> {p.unit}</span></div></article>)}</div></section>
  <section id="how" style={{background:"#101015",padding:"65px 0"}}><div className="container"><div className="eyebrow">How it works</div><h2 style={{fontSize:36,margin:"10px 0 30px"}}>Three steps. Then play.</h2><div className="grid-cards">{[{icon:<Gamepad2/>,t:"1. Choose",d:"Select a console, game titles and add-ons."},{icon:<CalendarDays/>,t:"2. Schedule",d:"Choose a rental duration, delivery date and Jaipur location."},{icon:<Truck/>,t:"3. Confirm",d:"We verify stock, delivery and payment before confirming."}].map(x=><div key={x.t} className="panel" style={{padding:24}}><div style={{color:"#b68aff"}}>{x.icon}</div><h3>{x.t}</h3><p className="muted">{x.d}</p></div>)}</div></div></section>
  <section className="container" style={{padding:"70px 0"}}><div className="panel" style={{padding:32,display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}><div><div className="eyebrow">Ready when you are</div><h2 style={{fontSize:32,margin:"8px 0"}}>Build your gaming bundle.</h2><p className="muted">Availability and final charges are confirmed by our team.</p></div><Link className="btn btn-primary" href="/booking">Start a booking <ArrowUpRight size={17}/></Link></div></section>
 </main><Footer/></>
}
