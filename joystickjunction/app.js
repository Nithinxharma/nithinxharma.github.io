// JoystickJunction static storefront. Configure your WhatsApp number before publishing.
const CONFIG = { whatsappNumber: "", currency: "INR" }; // Example: "918239983037" (country code + number, no +)
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
let days = 1;
let cart = JSON.parse(localStorage.getItem("jj-cart") || "[]");
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const total = () => cart.reduce((sum,x)=>sum+x.price*x.qty*days,0);
function save(){localStorage.setItem("jj-cart",JSON.stringify(cart));renderCart();}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);}
function renderCart(){
 $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 $("#cartTotal").textContent=money(total());
 $("#cartDuration").textContent=`For ${days} day${days>1?"s":""} · final charges subject to confirmation`;
 $("#cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-line"><div><b>${x.name}</b><small>${money(x.price)} / day</small></div><div class="qty"><button data-minus="${i}" aria-label="Decrease">−</button><b>${x.qty}</b><button data-plus="${i}" aria-label="Increase">+</button></div></div>`).join(""):'<p class="muted">Your setup is empty. Add a console or controller to begin.</p>';
 $("#cartItems").querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>{const i=+b.dataset.minus;cart[i].qty--;if(!cart[i].qty)cart.splice(i,1);save();});
 $("#cartItems").querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>{cart[+b.dataset.plus].qty++;save();});
 $("#modalEstimate").textContent=money(total());
}
function openDrawer(){$("#drawer").classList.add("open");$("#overlay").classList.add("show");}
function closeDrawer(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("show");}
function openModal(game=""){closeDrawer();$("#gameField").value=game;$("#formDays").value=String(days);$("#bookingModal").classList.add("show");$("#overlay").classList.add("show");$("#modalEstimate").textContent=money(total());}
function closeModal(){$("#bookingModal").classList.remove("show");$("#overlay").classList.remove("show");}
$$(".add").forEach(b=>b.addEventListener("click",()=>{const item={name:b.dataset.name,price:+b.dataset.price,type:b.dataset.type,qty:1};const found=cart.find(x=>x.name===item.name);found?found.qty++:cart.push(item);save();toast(item.name+" added to your setup");}));
$$(".duration").forEach(b=>b.onclick=()=>{days=+b.dataset.days;$$(".duration").forEach(x=>x.classList.toggle("active",x===b));$("#durationHint").textContent=`Estimated PS5 + add-ons: ${money(total())} for ${days} day${days>1?"s":""}. Game charges, delivery and deposit may be extra.`;renderCart();});
$("#openCart").onclick=openDrawer;$("#closeCart").onclick=closeDrawer;$("#overlay").onclick=()=>{closeDrawer();closeModal();};$("#checkout").onclick=()=>cart.length?openModal():toast("Add a console or controller first.");
$("#closeModal").onclick=closeModal;$("#ctaBook").onclick=()=>openModal();$("#customGame").onclick=()=>openModal("Specific game request — please quote");
$("#formDays").onchange=e=>{days=+e.target.value;renderCart();};
$$(".game-request").forEach(b=>b.onclick=()=>openModal(b.dataset.game+" — rental price / permanent purchase enquiry"));
$("#gameSearch").addEventListener("input",filterGames);
let category="all";
$$(".filter").forEach(b=>b.onclick=()=>{category=b.dataset.filter;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));filterGames();});
function filterGames(){const q=$("#gameSearch").value.toLowerCase();$$(".game-card").forEach(c=>c.hidden=!(category==="all"||c.dataset.category===category)||!c.dataset.title.toLowerCase().includes(q));}
$("#menuToggle").onclick=()=>$("#nav").classList.toggle("open");
$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
$("#year").textContent=new Date().getFullYear();
const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());$("#dateInput").min=today.toISOString().slice(0,10);
$("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget).entries());
 const lines=[`Hello JoystickJunction, I want to enquire about a booking.`,`Name: ${d.name}`,`Phone: ${d.phone}`,`Email: ${d.email||"Not provided"}`,`Setup: ${cart.map(x=>`${x.qty} × ${x.name}`).join(", ")||"PS5 console rental (please confirm)"}`,`Duration: ${d.days} day(s)`,`Estimated console/add-on amount: ${money(total())}`,`Delivery date: ${d.date}`,`Time: ${d.slot}`,`Address: ${d.address}`,`Payment preference: ${d.payment}`,`Game request: ${d.games||"None"}`,`Please confirm stock, final charges, deposit and delivery.`].join("\n");
 const url=CONFIG.whatsappNumber?`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines)}`:`https://wa.me/?text=${encodeURIComponent(lines)}`;
 const record={...d,days,cart,estimated:total(),createdAt:new Date().toISOString(),status:"Enquiry prepared — awaiting WhatsApp confirmation"};
 const leads=JSON.parse(localStorage.getItem("jj-enquiries")||"[]");leads.push(record);localStorage.setItem("jj-enquiries",JSON.stringify(leads));
 window.open(url,"_blank","noopener");closeModal();toast("Enquiry prepared. Complete sending it in WhatsApp.");
});
renderCart();
