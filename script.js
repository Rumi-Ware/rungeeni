/* GALLERY DATA: to use a real photo, add img:"photos/name.jpg" to an item. */
const items=[
{t:"Cafe date",c:"Daily life",img:"photos/.jpg",e:"☕",g:["#f3a63a","#c9531e"],h:260},
{t:"September",c:"Stationery",img:"photos/September.jpg",e:"🖍️",g:["#2f8f86","#f3a63a"],h:200},
{t:"Camera and iced coffee",c:"Photography",img:"photos/camera-and-iced-coffee.jpg",e:"📷",g:["#9bd1b8","#2f8f86"],h:300},
{t:"Rings and old books",c:"Photography",img:"photos/Rings-and-old-books.jpg",e:"💍",g:["#c9a477","#6b4226"],h:240},
{t:"Tree in golden light",c:"Nature",img:"photos/tree-in-golden-light.jpg",e:"🌳",g:["#f7d774","#7aa84a"],h:320},
{t:"Campus cat",c:"Nature",img:"photos/campus-cat.jpg",e:"🐈",g:["#444","#a8a8a8"],h:220},
{t:"Mini room tour",c:"Daily life",img:"photos/mini-room-tour.jpg",e:"🕯️",g:["#e08a1e","#7a2e12"],h:280},
{t:"Washi tape set",c:"Handmade",img:"photos/washi-tape-set.jpg",e:"🎀",g:["#e0627f","#f7b267"],h:210},
{t:"Hand-bound notebook",c:"Handmade",img:"photos/hand-bound-notebook.jpg",e:"📓",g:["#2f8f86","#e0627f"],h:290},
{t:"Rainy day at home",c:"Daily life",img:"photos/rainy-day-at-home.jpg",e:"🌧️",g:["#8fb8c9","#3d6d83"],h:250},
{t:"Pink blossoms",c:"Nature",img:"photos/pink-blossoms.jpg",e:"🌸",g:["#f7b2c4","#c2456b"],h:230},
{t:"Bangles and candle",c:"Photography",img:"photos/bangles-and-candle.jpg",e:"🔥",g:["#f3a63a","#8a2f10"],h:270}
];
const cats=["All",...new Set(items.map(i=>i.c))];
const grid=document.getElementById("grid"),fl=document.getElementById("filters");
function draw(cat){
    grid.innerHTML="";
    items.filter(i=>cat==="All"||i.c===cat).forEach(i=>{
    const b=document.createElement("button");b.className="tile";b.type="button";
    b.setAttribute("aria-label","Open "+i.t);
    b.innerHTML=ph(i,"height:"+i.h+"px")+"<span>"+i.t+"</span>";
    b.onclick=()=>openLb(i);grid.appendChild(b);
    });
}
function ph(i,s){
    if(i.img)return '<img src="'+i.img+'" alt="'+i.t+'" style="width:100%;display:block;'+s+';object-fit:cover">';
    return '<div class="ph" style="background:linear-gradient(135deg,'+i.g[0]+','+i.g[1]+');'+s+'">'+i.e+'</div>';
}
cats.forEach((c,k)=>{
    const b=document.createElement("button");b.type="button";b.textContent=c;
    b.setAttribute("aria-pressed",k===0);
    b.onclick=()=>{fl.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw(c)};
    fl.appendChild(b);
});
draw("All");
const lb=document.getElementById("lb");
function openLb(i){document.getElementById("lbph").innerHTML=ph(i,"aspect-ratio:1");document.getElementById("lbcap").textContent=i.t+" · "+i.c;lb.classList.add("on");document.getElementById("close").focus()}
function closeLb(){lb.classList.remove("on")}
document.getElementById("close").onclick=closeLb;
lb.onclick=e=>{if(e.target===lb)closeLb()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLb()});
/* theme */
const root=document.documentElement,tb=document.getElementById("theme");
function isDark(){return root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function sync(){tb.textContent=isDark()?"Light mode":"Dark mode"}
try{const s=localStorage.getItem("theme");if(s)root.dataset.theme=s}catch(e){}
sync();
tb.onclick=()=>{const n=isDark()?"light":"dark";root.dataset.theme=n;try{localStorage.setItem("theme",n)}catch(e){}sync()};
/* contact form: shows checks now; connect to a backend later */
document.getElementById("cf").onsubmit=e=>{
    e.preventDefault();const m=document.getElementById("msg"),f=e.target;
    if(!f.name.value.trim()||!/^\S+@\S+\.\S+$/.test(f.email.value)||f.querySelector("textarea").value.trim().length<5){m.style.color="var(--pink)";m.textContent="Please add your name, a valid email and a short message.";return}
    m.style.color="var(--teal)";m.textContent="Message ready. Connect this form to Formspree or a FastAPI endpoint to receive it.";
};
