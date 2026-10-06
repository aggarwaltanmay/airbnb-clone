import {rooms,photos,description,amenities,amenityGroups,reviews} from './data.js';
import {renderViews,icon,reviewCard} from './views.js';
import {StayCalendar} from './calendar.js';
renderViews();
const $=s=>document.querySelector(s);
const tour=$('#tour'),lightbox=$('#lightbox'),modal=$('#modal');
let activePhoto=0,saved=true,guests={adults:2,children:0,infants:0,pets:0},similarPage=0,mapZoom=1,toastTimer;
let tourReturn=null,photoReturn=null,modalReturn=null;
try{const storedSaved=localStorage.getItem('candolim-saved');if(storedSaved!==null)saved=storedSaved==='true'}catch{}
const calendar=new StayCalendar();calendar.render();
function lock(){document.documentElement.classList.toggle('locked',tour.open||lightbox.open||modal.open)}
function showToast(text){const el=$('.toast');clearTimeout(toastTimer);el.textContent=text;el.hidden=false;toastTimer=setTimeout(()=>el.hidden=true,2600)}
function updateSaved(){document.querySelectorAll('[data-action="save"]').forEach(b=>{const heart=b.querySelector('img');b.classList.toggle('saved',saved);b.setAttribute('aria-pressed',saved);if(heart)heart.src=saved?'assets/heart-filled.svg':'assets/svg-5.svg';if(b.querySelector('span'))b.querySelector('span').textContent=saved?'Saved':'Save';else b.setAttribute('aria-label',saved?'Saved':'Save')})}
updateSaved();
function toggleSave(){saved=!saved;try{localStorage.setItem('candolim-saved',String(saved))}catch{}updateSaved();showToast(saved?'Saved to wishlist':'Removed from wishlist')}
function setUrl(view,index,push=true){const url=new URL(location.href);url.searchParams.delete('modal');url.searchParams.delete('modalItem');if(view){url.searchParams.set('modal','PHOTO_TOUR_SCROLLABLE');if(view==='photo')url.searchParams.set('modalItem',String(1000+index))}history[push?'pushState':'replaceState']({view,index},'',url)}
function openTour(push=true){if(!tour.open){tourReturn=document.activeElement;tour.showModal();$('.tour-scroll').scrollTop=0;$('#tour [data-action="tour-back"]').focus()}if(push)setUrl('tour');lock()}
function closeTour(update=true){if(lightbox.open)closePhoto(false);if(tour.open)tour.close();if(update)setUrl(null,null,false);lock();tourReturn?.focus({preventScroll:true})}
function updatePhoto(){const p=photos[activePhoto],img=$('#large-photo');img.src=`assets/${p.id}.jpeg`;img.alt=p.name;$('#photo-title').textContent=p.name;$('#photo-count').textContent=`${activePhoto+1} of ${photos.length}`;$('#lightbox [data-action="previous"]').disabled=activePhoto===0;$('#lightbox [data-action="next"]').disabled=activePhoto===photos.length-1;[activePhoto-1,activePhoto+1].forEach(i=>{if(photos[i]){const next=new Image();next.src=`assets/${photos[i].id}.jpeg`}})}
function openPhoto(index,push=true){if(!tour.open)openTour(false);activePhoto=Math.max(0,Math.min(photos.length-1,index));photoReturn=document.activeElement;updatePhoto();if(!lightbox.open)lightbox.showModal();$('#lightbox [data-action="lightbox-close"]').focus();if(push)setUrl('photo',activePhoto);lock()}
function closePhoto(update=true){if(lightbox.open)lightbox.close();if(update)setUrl('tour',null,false);lock();if(photoReturn?.isConnected)photoReturn.focus({preventScroll:true})}
function movePhoto(by){const next=activePhoto+by;if(next<0||next>=photos.length)return;activePhoto=next;updatePhoto();setUrl('photo',activePhoto,false)}
function syncUrl(){const url=new URL(location.href);if(url.searchParams.get('modal')==='PHOTO_TOUR_SCROLLABLE'){openTour(false);const item=url.searchParams.get('modalItem');if(item!==null&&/^\d+$/.test(item))openPhoto(Number(item)-1000,false);else closePhoto(false)}else closeTour(false)}
window.addEventListener('popstate',syncUrl);syncUrl();
for(const d of [tour,lightbox,modal]){d.addEventListener('cancel',e=>{e.preventDefault();if(d===lightbox)closePhoto();else if(d===tour)closeTour();else closeModal()});d.addEventListener('close',lock)}
function openModal(title,html,wide=false){modalReturn=document.activeElement;modal.classList.toggle('wide-modal',wide);$('#modal-title').textContent=title;$('#modal-content').innerHTML=html;modal.showModal();modal.scrollTop=0;lock();$('#modal [data-action="modal-close"]').focus()}
function closeModal(){modal.close();lock();modalReturn?.focus({preventScroll:true})}
modal.addEventListener('click',e=>{if(e.target===modal){const b=modal.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeModal()}});
function amenityIcon(name){const match=amenities.find(([n])=>n===name);if(match)return match[1];const all=Object.values(amenityGroups).flat();return Math.min(142,99+all.indexOf(name))}
function showAmenities(){
 const groups=Object.entries(amenityGroups).map(([g,items])=>`<section class="amenity-group"><h3>${g}</h3>${items.map(n=>`<div class="amenity-row ${n.includes('alarm')?'unavailable':''}">${icon(amenityIcon(n))}<span>${n}</span></div>`).join('')}</section>`).join('');
 openModal('What this place offers',`<h2>What this place offers</h2>${groups}`,true);
}
function showReviews(topic){openModal(topic||'19 reviews',`<h2 class="modal-title-big">★ 4.95 · 19 reviews</h2>${topic?`<p class="modal-title-big">${topic}</p>`:''}<div class="modal-review-list">${reviews.map((r,i)=>reviewCard(r,i,true)).join('')}</div>`,true)}
function renderGuests(){const rows=[['adults','Adults','Age 13+'],['children','Children','Ages 2–12'],['infants','Infants','Under 2'],['pets','Pets','Bringing a service animal?']];return rows.map(([key,name,sub])=>`<div class="guest-row"><div><b>${name}</b><small>${sub}</small></div><div class="stepper"><button data-action="guest-minus" data-kind="${key}" aria-label="Remove ${name.toLowerCase()}" ${guests[key]<=(key==='adults'?1:0)?'disabled':''}>−</button><span>${guests[key]}</span><button data-action="guest-plus" data-kind="${key}" aria-label="Add ${name.toLowerCase()}" ${(key==='adults'||key==='children')&&guests.adults+guests.children>=3||guests[key]>=5?'disabled':''}>+</button></div></div>`).join('')+'<p style="font-size:14px;margin:16px 0 24px">This place has a maximum of 3 guests, not including infants. Pets are allowed.</p><button class="reserve" data-action="modal-close">Close</button>'}
function updateGuests(){document.querySelectorAll('[data-guests]').forEach(e=>e.textContent=`${guests.adults+guests.children} guest${guests.adults+guests.children===1?'':'s'}${guests.infants?', '+guests.infants+' infant'+(guests.infants===1?'':'s'):''}`)}
const messages={'share':'Share options','reserve':"You won't be charged yet"};
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(messages[a]){showToast(messages[a]);return}
 switch(a){
 case'tour':openTour();break;
 case'tour-back':closeTour();break;
 case'room':openTour();requestAnimationFrame(()=>$('#room-'+b.dataset.room).scrollIntoView({behavior:'smooth',block:'start'}));break;
 case'jump-room':$('#room-'+b.dataset.room).scrollIntoView({behavior:'smooth',block:'start'});break;
 case'photo':openPhoto(Number(b.dataset.index));break;
 case'lightbox-close':closePhoto();break;
 case'previous':movePhoto(-1);break;
 case'next':movePhoto(1);break;
 case'save':toggleSave();break;
 case'modal-close':closeModal();break;
 case'description':{const p=b.closest('.description-section').querySelector('.description-clamp');const expanded=p.classList.toggle('expanded');b.innerHTML=`${expanded?'Show less':'Show more'} ${icon(17)}`;break}
 case'amenities':showAmenities();break;
 case'reviews':showReviews();break;
 case'review-chip':showReviews(b.dataset.topic);break;
 case'review-toggle':{const p=b.closest('.review').querySelector('p');const expanded=!p.classList.contains('clamp');p.classList.toggle('clamp',expanded);b.textContent=expanded?'Show more':'Show less';break}
 case'neighbourhood':openModal('Where you’ll be','<h2 class="modal-title-big">Neighbourhood highlights</h2><p>Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p>');break;
 case'policy':openModal(b.dataset.title,`<h2 class="modal-title-big">${b.dataset.title}</h2>${b.previousElementSibling.innerHTML}`);break;
 case'price':openModal('Price details',`<p>${$('.price').textContent}</p>`);break;
 case'dates':openModal('Select your dates','<div class="date-modal" data-calendar></div>',true);calendar.render();break;
 case'day':calendar.choose(b.dataset.date);document.querySelector(`#${modal.open?'modal-content':'calendar-inline'} [data-date="${b.dataset.date}"]`)?.focus({preventScroll:true});break;
 case'month-prev':calendar.shift(-1);break;
 case'month-next':calendar.shift(1);break;
 case'clear-dates':calendar.clear();break;
 case'keyboard-help':openModal('Keyboard shortcuts','<p>Use Tab to move between dates, and Enter or Space to choose a date. In the photo viewer, use the left and right arrows to move between photos and Escape to return to the tour.</p>');break;
 case'guests':openModal('Guests',renderGuests());break;
 case'guest-minus':case'guest-plus':{let k=b.dataset.kind;const step=a==='guest-plus'?1:-1;if(step>0&&['adults','children'].includes(k)&&guests.adults+guests.children>=3)return;guests[k]=Math.max(k==='adults'?1:0,Math.min(5,guests[k]+step));$('#modal-content').innerHTML=renderGuests();updateGuests();const equivalent=$(`#modal [data-action="${a}"][data-kind="${k}"]`);if(equivalent&&!equivalent.disabled)equivalent.focus();else $(`#modal [data-kind="${k}"]:not(:disabled)`)?.focus();break}
 case'zoom-in':case'zoom-out':mapZoom=Math.max(1,Math.min(2.5,mapZoom+(a==='zoom-in'?.25:-.25)));$('.map-art').style.transform=`scale(${mapZoom})`;break;
 case'similar-next':case'similar-prev':similarPage=a==='similar-next'?1:0;const tr=$('.similar-track');tr.scrollTo({left:similarPage*(tr.scrollWidth-tr.clientWidth),behavior:'smooth'});$('#similar-page').textContent=`${similarPage+1} / 2`;$('[data-action="similar-prev"]').disabled=!similarPage;$('[data-action="similar-next"]').disabled=!!similarPage;break;
 }
});
// Native dialogs supply modal semantics, inert backgrounds and focus trapping.
document.addEventListener('keydown',e=>{if(lightbox.open&&!modal.open){if(e.key==='ArrowLeft'){e.preventDefault();movePhoto(-1)}if(e.key==='ArrowRight'){e.preventDefault();movePhoto(1)}}});
let scheduled=false;function scrollState(){scheduled=false;$('.section-nav').classList.toggle('visible',window.scrollY>600);const ids=['photos','amenities','reviews','location'];let current=ids[0];for(const id of ids){if($('#'+id).getBoundingClientRect().top<180)current=id}document.querySelectorAll('.section-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+current))}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(scrollState)}},{passive:true});scrollState();
// Header search and account controls are visual-only in the reference implementation.
