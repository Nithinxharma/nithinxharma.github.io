import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const demo = [
 {name:"PlayStation 5 Console",kind:"console",description:"PS5 console rental. Stock and included accessories confirmed before booking.",price:"₹700/day"},
 {name:"Extra controller",kind:"accessory",description:"Additional controller for multiplayer sessions.",price:"₹200/day"},
 {name:"Game library",kind:"game",description:"Browse available titles and ask for a rental quote. The exact catalogue is managed by the store.",price:"Ask for price"}
];
export default function Catalog(){return <><Header/><main className="container" style={{padding:"60px 0"}}><div className="eyebrow">Store catalogue</div><h1 style={{fontSize:48}}>Find your next game.</h1><p className="muted">Illustrative catalogue entries. Admin must add verified stock, game titles, rental prices and sale prices before launch.</p><div className="grid-cards" style={{marginTop:30}}>{demo.map(x=><article className="panel" key={x.name} style={{padding:24}}><div style={{height:145,borderRadius:15,background:"radial-gradient(circle,#3a2852,#15121b)",display:"grid",placeItems:"center",fontSize:48}}>🎮</div><div className="eyebrow" style={{marginTop:18}}>{x.kind}</div><h2 style={{fontSize:22}}>{x.name}</h2><p className="muted">{x.description}</p><strong>{x.price}</strong><div style={{marginTop:20}}><Link className="btn btn-primary" href="/booking">Enquire / rent</Link></div></article>)}</div></main><Footer/></>}
