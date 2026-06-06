function scrollTo(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    document.getElementById('navbar').classList.remove('open');
  });
});

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

function handleBooking(){
  const ci=document.getElementById('checkin').value;
  const co=document.getElementById('checkout').value;
  const g=document.getElementById('guests').value;
  if(!ci||!co){alert('Please select check-in and check-out dates.');return;}
  const msg=`Hello, I would like to book a room at Beteket Hotel.\nCheck-in: ${ci}\nCheck-out: ${co}\nGuests: ${g}\nPlease confirm availability and rates. Thank you!`;
  // ★ REPLACE 251000000000 with real WhatsApp number ★
  window.open(`https://wa.me/251000000000?text=${encodeURIComponent(msg)}`,'_blank');
}

const fmt=d=>d.toISOString().split('T')[0];
const today=new Date();
const tom=new Date(today);tom.setDate(tom.getDate()+1);
document.getElementById('checkin').value=fmt(today);
document.getElementById('checkout').value=fmt(tom);
document.getElementById('checkin').min=fmt(today);
document.getElementById('checkout').min=fmt(tom);
document.getElementById('checkin').addEventListener('change',function(){
  const nx=new Date(this.value);nx.setDate(nx.getDate()+1);
  document.getElementById('checkout').min=fmt(nx);
  if(document.getElementById('checkout').value<=this.value)document.getElementById('checkout').value=fmt(nx);
});