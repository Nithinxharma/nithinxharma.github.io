// Set your business WhatsApp number below (country code + number, digits only).
const WHATSAPP_NUMBER = "919660480130";
const featured=[
 {k:"THE NEXT CHAPTER IS YOURS",t:"Your next<br><em>great game.</em>",d:"PlayStation favourites, flexible rental plans and personal support — delivered across Jaipur.",s:"PLAY YOUR WAY"},
 {k:"MAKE EVERY MATCH COUNT",t:"Bring the<br><em>whole squad.</em>",d:"Add another controller, choose your favourite sports title and make it a game night.",s:"PLAYER TWO, READY"},
 {k:"A WORLD TO GET LOST IN",t:"Find your next<br><em>adventure.</em>",d:"Explore action, RPG and adventure favourites. Rent a title or ask about buying it.",s:"YOUR NEXT WORLD"},
 {k:"THE CONSOLE COMES TO YOU",t:"Game on.<br><em>Your way.</em>",d:"Choose your PS5 rental duration and preferred Jaipur delivery slot.",s:"JAIPUR DELIVERY"}
];let slide=0,days=1,items=["PS5 Console — ₹700/day"];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function showSlide(){const x=featured[slide];$("#heroKicker").textContent=x.k;$("#heroTitle").innerHTML=x.t;$("#heroDesc").textContent=x.d;$("#sideTitle").textContent=x.s;$("#slideCount").textContent=`0${slide+1} / 04`;}
$("#prev").onclick=()=>{slide=(slide+3)%4;showSlide()};$("#next").onclick=()=>{slide=(slide+1)%4;showSlide()};
$$("[data-days]").forEach(b=>b.onclick=()=>{days=+b.dataset.days;$$("[data-days]").forEach(x=>x.classList.toggle("selected",x===b));const base=items.some(x=>x.startsWith("PS5 Console"))?700:0,extra=items.some(x=>x.startsWith("Extra Controller"))?200:0;$("#estimate").textContent=`PS5 estimate: ₹${(base+extra)*days} for ${days} day(s)`;});
function toast(s){$("#toast").textContent=s;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2200)}
$$(".add").forEach(b=>b.onclick=()=>{if(!items.includes(b.dataset.item))items.push(b.dataset.item);toast("Added to your enquiry: "+b.dataset.item);const base=items.some(x=>x.startsWith("PS5 Console"))?700:0,extra=items.some(x=>x.startsWith("Extra Controller"))?200:0;$("#estimate").textContent=`PS5 estimate: ₹${(base+extra)*days} for ${days} day(s)`;});
$$("[data-game]").forEach(b=>b.onclick=()=>openModal(`Game enquiry: ${b.dataset.game} — please share rental and permanent purchase price.`));
$$("[data-filter]").forEach(b=>b.onclick=()=>{$$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));$$(".game").forEach(c=>c.hidden=!(b.dataset.filter==="all"||c.dataset.cat===b.dataset.filter));});
const library=[["Phantom Blade Zero","PS5 · Action"],["Elden Ring","PS5 / PS4 · RPG"],["EA SPORTS FC","PS5 · Sports"],["Call of Duty","PS5 · Action"],["Ghost of Tsushima","PS5 / PS4 · Adventure"],["A Way Out","PS4 · Adventure"],["God of War Ragnarök","PS5 · Action"],["Spider-Man 2","PS5 · Adventure"],["Gran Turismo","PS5 · Racing"],["The Last of Us","PS5 · Adventure"]];
function renderLibrary(q=""){$("#collectionList").innerHTML=library.filter(x=>x.join(" ").toLowerCase().includes(q.toLowerCase())).map(x=>`<div class="collection-row"><div><b>${x[0]}</b><br><small>${x[1]}</small></div><button data-lib="${x[0]}">Enquire ↗</button></div>`).join("")||"<p>No matching titles. Request a custom game below.</p>";$$("[data-lib]").forEach(b=>b.onclick=()=>openModal(`Game enquiry: ${b.dataset.lib} — rent or buy; please quote.`));}
renderLibrary();$("#search").oninput=e=>renderLibrary(e.target.value);
function openModal(text=""){ $("#interest").value=[...items,text].filter(Boolean).join("\n");$("#modal").classList.add("show");}
$("#orderBtn").onclick=()=>openModal();$("#x").onclick=()=>$("#modal").classList.remove("show");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("show")};
$("#hamb").onclick=()=>$("#nav").classList.toggle("open");$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
const dt=new Date();dt.setMinutes(dt.getMinutes()-dt.getTimezoneOffset());$("#date").min=dt.toISOString().slice(0,10);$("#year").textContent=new Date().getFullYear();
$("#form").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());const msg=[`Hello JoystickJunction, I want to enquire:`, `Name: ${d.name}`,`Phone: ${d.phone}`,`Interest: ${d.interest}`,`Preferred date: ${d.date}`,`Time: ${d.slot}`,`Address: ${d.address}`,`Payment: ${d.payment}`,`Rental duration: ${days} day(s)`,`Please confirm stock, final price, delivery and deposit.`].join("\n");const url=WHATSAPP_NUMBER?`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`:`https://wa.me/?text=${encodeURIComponent(msg)}`;window.open(url,"_blank","noopener");$("#modal").classList.remove("show");toast("WhatsApp enquiry prepared. Please send the message.");};
