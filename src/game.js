
const c=document.querySelector('#game'),g=c.getContext('2d'),panel=document.querySelector('#panel');let w,h,p,foes,fire,gems,boss,life,points,level,t,spawn,shoot,playing=false,previous=0;
function resize(){w=c.width=innerWidth;h=c.height=innerHeight}resize();onresize=resize;
function begin(){p={x:w/2,y:h*.8,r:21};foes=[];fire=[];gems=[];boss=null;life=5;points=0;level=1;t=0;spawn=0;shoot=0;playing=true;panel.style.display='none'}window.startDragonGame=begin;document.querySelector('#start').addEventListener('click',begin);
function end(win){playing=false;panel.style.display='grid';document.querySelector('#heading').textContent=win?'🏆 REINO SALVO!':'💔 FIM DE JOGO';document.querySelector('#description').textContent='Você coletou '+points+' cristais. Quer jogar novamente?';document.querySelector('#start').textContent='RECOMEÇAR'}
function dot(x,y,r,color){g.fillStyle=color;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill()}
function move(e){if(!playing)return;p.x=Math.min(w-22,Math.max(22,e.clientX));p.y=Math.min(h-35,Math.max(h*.24,e.clientY))}
c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);move(e)});c.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch')move(e)});
function step(dt){if(!playing)return;t+=dt;spawn-=dt;shoot-=dt;if(spawn<=0&&!boss){foes.push({x:25+Math.random()*(w-50),y:-25,r:17,hp:2,s:90+Math.random()*65});spawn=Math.max(.35,.9-t*.006)}
if(shoot<=0){fire.push({x:p.x,y:p.y-25,r:7});if(level>=3){fire.push({x:p.x-16,y:p.y-15,r:6},{x:p.x+16,y:p.y-15,r:6})}shoot=Math.max(.13,.35-level*.02)}
if(t>75&&!boss){boss={x:w/2,y:100,r:45,hp:65};foes=[]}
for(const f of fire)f.y-=530*dt;for(const e of foes)e.y+=e.s*dt;
for(const e of foes){for(const f of fire){if(Math.hypot(e.x-f.x,e.y-f.y)<e.r+f.r){e.hp--;f.dead=true;if(e.hp<=0){e.dead=true;gems.push({x:e.x,y:e.y})}}}if(Math.hypot(e.x-p.x,e.y-p.y)<e.r+p.r){e.dead=true;life--;if(life<=0)end(false)}}
if(boss){boss.x=w/2+Math.sin(t*2)*w*.29;for(const f of fire){if(Math.hypot(boss.x-f.x,boss.y-f.y)<boss.r+f.r){f.dead=true;boss.hp--;if(boss.hp<=0){boss=null;end(true);break}}}}
for(const v of gems){let dx=p.x-v.x,dy=p.y-v.y,d=Math.hypot(dx,dy);if(d<125){v.x+=dx*dt*6;v.y+=dy*dt*6}if(d<27){v.dead=true;points+=10;level=1+Math.floor(points/100)}}
foes=foes.filter(e=>!e.dead&&e.y<h+25);fire=fire.filter(f=>!f.dead&&f.y>-20);gems=gems.filter(v=>!v.dead);document.querySelector('#life').textContent='❤️ '+life;document.querySelector('#level').textContent='✨ '+level;document.querySelector('#points').textContent='💎 '+points}
function draw(){let bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#142343');bg.addColorStop(1,'#4d3044');g.fillStyle=bg;g.fillRect(0,0,w,h);
for(let i=0;i<15;i++){let y=(i*95+t*40)%h;dot((i*113)%w,y,2,'#c3dafa55')}
for(const v of gems){dot(v.x,v.y,11,'#71ecff');dot(v.x,v.y,5,'white')}
for(const e of foes){dot(e.x,e.y,e.r,'#a466c6');dot(e.x-5,e.y-3,3,'#fff29a');dot(e.x+5,e.y-3,3,'#fff29a')}
if(boss){dot(boss.x,boss.y,45,'#af4d46');dot(boss.x-14,boss.y-7,7,'#ffca59');dot(boss.x+14,boss.y-7,7,'#ffca59');g.fillStyle='#ff954a';g.fillRect(25,58,(w-50)*boss.hp/65,10)}
for(const f of fire){dot(f.x,f.y,f.r+4,'#ea6928');dot(f.x,f.y,f.r,'#ffe9a2')}
if(p){g.fillStyle='#cc4c2d';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-43,p.y-23);g.lineTo(p.x-35,p.y+22);g.lineTo(p.x,p.y+8);g.lineTo(p.x+35,p.y+22);g.lineTo(p.x+43,p.y-23);g.fill();dot(p.x,p.y,18,'#f5a843');dot(p.x-7,p.y-7,3,'white');dot(p.x+7,p.y-7,3,'white')}}
function frame(ms){let dt=Math.min(.04,(ms-previous)/1000||0);previous=ms;try{step(dt);draw()}catch(err){playing=false;panel.style.display='grid';document.querySelector('#heading').textContent='ERRO NO JOGO';document.querySelector('#description').textContent=String(err.message||err)}requestAnimationFrame(frame)}requestAnimationFrame(frame);
