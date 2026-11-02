import Link from "next/link";

export default function Header() {
  return <header style={{borderBottom:"1px solid #25252d",position:"sticky",top:0,zIndex:20,background:"rgba(8,8,11,.88)",backdropFilter:"blur(18px)"}}>
    <div className="container" style={{height:76,display:"flex",alignItems:"center",justifyContent:"space-between",gap:18}}>
      <Link href="/" style={{display:"flex",alignItems:"center",gap:10}}>
        <img src="/joystickjunction-mark.jpg" alt="" width="42" height="36" style={{objectFit:"contain"}}/>
        <span className="brand" style={{fontWeight:800,fontSize:19}}>Joystick<span style={{color:"#a86bff"}}>Junction</span></span>
      </Link>
      <nav style={{display:"flex",gap:22,fontSize:14}} className="muted">
        <Link href="/catalog?type=console">PS5 Consoles</Link><Link href="/catalog?type=game">Games</Link><Link href="/#how">How it works</Link><Link href="/booking">Book now</Link>
      </nav>
      <Link className="btn btn-secondary" href="/booking">Build your rental</Link>
    </div>
  </header>;
}
