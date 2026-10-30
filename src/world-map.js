/* RF-0002: mapa vertical decorativo. Sem colisao: preserva combate existente. */
(function(){
"use strict";
const zoneNames=["Vale Esmeralda","Trilha das Ruinas","Terras de Cinza","Fortaleza do Guardiao"];
const zoneColors=[["#2d6749","#377957","#8dc28c"],["#55734e","#8a785a","#c2aa77"],["#60484a","#795449","#e18b58"],["#392d45","#5c3845","#e69d63"]];
function hash(i){let n=Math.sin(i*127.1+24.7)*43758.5453;return n-Math.floor(n)}
function disk(ctx,x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
function polygon(ctx,points,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);ctx.closePath();ctx.fill()}
function tree(ctx,x,y,s){disk(ctx,x,y+5*s,8*s,"#1e3831");disk(ctx,x,y-3*s,12*s,"#225840");disk(ctx,x-5*s,y-7*s,7*s,"#44875a");disk(ctx,x+5*s,y-9*s,6*s,"#4e9c62")}
function ruin(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.rotate(-.1);ctx.fillStyle="#392f36";ctx.fillRect(-13*s,-6*s,27*s,20*s);ctx.fillStyle="#afa495";ctx.fillRect(-12*s,-12*s,24*s,18*s);ctx.fillStyle="#716d6b";ctx.fillRect(-7*s,-8*s,5*s,12*s);ctx.fillRect(4*s,-8*s,5*s,12*s);ctx.restore()}
function lava(ctx,x,y,s){disk(ctx,x,y,16*s,"#552e37");disk(ctx,x,y,11*s,"#e56231");disk(ctx,x,y,5*s,"#ffb14c")}
function tower(ctx,x,y,s){ctx.fillStyle="#332b3b";ctx.fillRect(x-16*s,y-24*s,32*s,46*s);ctx.fillStyle="#897080";ctx.fillRect(x-13*s,y-26*s,26*s,35*s);for(let a=-1;a<=1;a++)ctx.fillRect(x+a*12*s-5*s,y-32*s,9*s,11*s);disk(ctx,x,y-11*s,3*s,"#f6aa5b")}
function render(ctx,w,h,time){const z=Math.min(3,Math.floor(Math.max(0,time)/25));const colors=zoneColors[z];const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,colors[0]);bg.addColorStop(1,colors[1]);ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
const tile=130,offset=(Math.max(0,time)*42)%tile;
for(let row=-1;row<=Math.ceil(h/tile);row++){const index=Math.floor(Math.max(0,time)*42/tile)+row;const y=row*tile+offset;const sway=Math.sin(index*.71)*w*.085;const center=w*.5+sway;ctx.fillStyle=z<2?"#b5a47a66":"#2b273e99";ctx.beginPath();ctx.moveTo(center-w*.24,y-5);ctx.lineTo(center+w*.26,y-5);ctx.lineTo(center+w*.19,y+tile+6);ctx.lineTo(center-w*.25,y+tile+6);ctx.fill();
for(let side=0;side<2;side++){const x=side===0?12+hash(index*3)*Math.max(12,w*.2):w-12-hash(index*3+1)*Math.max(12,w*.2);const yy=y+25+hash(index*8+side)*75;const scale=.75+hash(index*11+side)*.65;
if(z===0)tree(ctx,x,yy,scale);else if(z===1)ruin(ctx,x,yy,scale);else if(z===2)lava(ctx,x,yy,scale);else tower(ctx,x,yy,scale*.7)}
for(let k=0;k<4;k++){const x=hash(index*19+k)*w;const sy=y+hash(index*29+k)*tile;disk(ctx,x,sy,1+hash(index+k)*2,z<2?"#d6f3b333":"#ffb78d44")}
}
if(z===3){ctx.fillStyle="#a26e5744";ctx.fillRect(0,0,14,h);ctx.fillRect(w-14,0,14,h)}
ctx.fillStyle="#ffffffaa";ctx.font="700 12px system-ui";ctx.textAlign="center";ctx.fillText(zoneNames[z],w/2,Math.max(75,Math.min(h*.17,135)));
}
window.WorldMap=Object.freeze({draw:render,zoneAt:(t)=>zoneNames[Math.min(3,Math.floor(Math.max(0,t)/25))]});
})();
