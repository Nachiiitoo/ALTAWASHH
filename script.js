/* ---------------- LOADER ---------------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(()=> loader.style.display = 'none', 600); // small delay for effect
});

/* ---------------- PARTICLES (simple canvas) -------------- */
(function particlesInit(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const count = Math.floor((w*h)/70000); // density

  function rand(min,max){ return Math.random()*(max-min)+min; }

  class P{
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0,w);
      this.y = rand(0,h);
      this.vx = rand(-0.15,0.15);
      this.vy = rand(-0.1,0.1);
      this.size = rand(0.8,2.6);
      this.alpha = rand(0.06,0.22);
      this.hue = rand(260,290); // violet hues
    }
    step(){
      this.x += this.vx;
      this.y += this.vy;
      if(this.x < -10 || this.x > w+10 || this.y < -10 || this.y > h+10) this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = `hsla(${this.hue},70%,70%,${this.alpha})`;
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }
  }

  for(let i=0;i<count;i++) particles.push(new P());

  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  window.addEventListener('resize', resize);

  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){ p.step(); p.draw(); }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* -------------- HEADER hide/show on scroll ------------- */
let lastScroll = 0;
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if(current > lastScroll && current > 120){
    header.classList.add('hide');
  }else{
    header.classList.remove('hide');
  }
  lastScroll = current;
});

/* -------------- HAMBURGER (mobile) --------------------- */
const hamb = document.getElementById('hamb');
const nav = document.getElementById('nav');
hamb && hamb.addEventListener('click', ()=>{
  if(nav.style.display === 'flex'){ nav.style.display = 'none'; }
  else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '66px';
    nav.style.background = 'linear-gradient(90deg,#0a0d18,#1a0036)';
    nav.style.padding = '12px';
    nav.style.borderRadius = '10px';
  }
});

/* -------------- SCROLL TO ID --------------------------- */
function scrollToId(id){
  const el = document.getElementById(id);
  if(!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({top, behavior:'smooth'});
}

/* -------------- REVEAL ON SCROLL ----------------------- */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); }
  });
},{threshold:0.18});
reveals.forEach(r=> io.observe(r));

/* -------------- PARALLAX HERO IMG ---------------------- */
window.addEventListener('scroll', ()=>{
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const img = hero.querySelector('.hero-img');
  const y = window.scrollY * 0.12;
  if(img) img.style.transform = `translateY(${y}px)`;
});

/* -------------- RESERVA FORM -> WHATSAPP --------------- */
const form = document.getElementById('reservaForm');
form && form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('r-name').value.trim());
  const zone = encodeURIComponent(document.getElementById('r-zone').value.trim());
  const phone = encodeURIComponent(document.getElementById('r-phone').value.trim());
  const detail = encodeURIComponent(document.getElementById('r-detail').value.trim());

  const msg = `Hola ALTAwash!%0A%0ANombre:%20${name}%0ABarrio:%20${zone}%0ATeléfono:%20${phone}%0ADetalle:%20${detail}`;
  window.open(`https://wa.me/59892110046?text=${msg}`, '_blank');
});

/* -------------- RESERVATION VIA PLAN BUTTONS ----------- */
function reservePlan(plan){
  const msg = encodeURIComponent(`Hola ALTAwash, quiero reservar el plan: ${plan}`);
  window.open(`https://wa.me/59892110046?text=${msg}`, '_blank');
}

/* -------------- MODAL RESERVA ------------------------- */
const modal = document.getElementById('modalReserva');
function openReserva(){ if(modal) modal.style.display = 'flex'; }
function closeReserva(){ if(modal) modal.style.display = 'none'; }
const modalSend = document.getElementById('modalSend');
modalSend && modalSend.addEventListener('click', ()=>{
  // If form fields are filled, prefer those; otherwise open template
  const name = document.getElementById('r-name') ? document.getElementById('r-name').value.trim() : '';
  const zone = document.getElementById('r-zone') ? document.getElementById('r-zone').value.trim() : '';
  const detail = document.getElementById('r-detail') ? document.getElementById('r-detail').value.trim() : '';
  let msg = `Hola ALTAwash,%20quiero%20reservar.`;
  if(name) msg = `Hola ALTAwash!%0A%0ANombre:%20${encodeURIComponent(name)}%0ABarrio:%20${encodeURIComponent(zone)}%0ADetalle:%20${encodeURIComponent(detail)}`;
  window.open(`https://wa.me/59892110046?text=${msg}`,'_blank');
});

/* small accessibility: close modal on esc */
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeReserva(); });
