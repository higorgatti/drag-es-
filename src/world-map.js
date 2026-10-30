/* RF-0003 - Vale Esmeralda, fundo da primeira fase. Somente desenho, sem colisoes. */
(function () {
  "use strict";
  const CHUNK = 240;
  const COLORS = { grass: "#40784b", grassLight: "#5e995a", trail: "#bba16c", border: "#a18b61", stone: "#aaa998", dark: "#314d3b" };
  const fract = n => n - Math.floor(n);
  const noise = n => fract(Math.sin(n * 127.1 + 31.7) * 43758.5453);
  function circle(ctx,x,y,r,color) {
    ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
  function poly(ctx,pts,color) {
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();ctx.fill();
  }
  function tree(ctx,x,y,s) {
    circle(ctx,x+2*s,y+8*s,16*s,"#294a35");
    circle(ctx,x,y,16*s,"#39714a");
    circle(ctx,x-6*s,y-6*s,11*s,"#52955c");
    circle(ctx,x+7*s,y-9*s,9*s,"#67a968");
  }
  function rock(ctx,x,y,s) {
    poly(ctx,[[x-13*s,y+8*s],[x-11*s,y-5*s],[x+2*s,y-12*s],[x+15*s,y-2*s],[x+11*s,y+10*s]],"#737f77");
    poly(ctx,[[x-11*s,y-5*s],[x+2*s,y-12*s],[x+5*s,y+1*s],[x-8*s,y+5*s]],"#b4b9a4");
  }
  function ruins(ctx,x,y,s) {
    circle(ctx,x,y+8*s,23*s,"#415943");
    ctx.fillStyle="#727c70";ctx.fillRect(x-17*s,y-8*s,34*s,21*s);
    ctx.fillStyle="#b8b4a0";ctx.fillRect(x-15*s,y-15*s,10*s,23*s);ctx.fillRect(x+6*s,y-10*s,9*s,20*s);
    ctx.fillStyle="#d4cbb0";ctx.fillRect(x-18*s,y-17*s,15*s,5*s);
    rock(ctx,x+17*s,y+15*s,.55*s);
  }
  function draw(ctx,w,h,time) {
    const offset=time*43, scroll=offset%CHUNK;
    const grd=ctx.createLinearGradient(0,0,w,h);
    grd.addColorStop(0,"#427950");grd.addColorStop(.48,"#5c955a");grd.addColorStop(1,"#396e4c");
    ctx.fillStyle=grd;ctx.fillRect(0,0,w,h);
    const count=Math.ceil(h/CHUNK)+2;
    for(let row=-1;row<count;row++) {
      const id=Math.floor(offset/CHUNK)+row,y=row*CHUNK+scroll;
      for(let j=0;j<13;j++) {
        const px=noise(id*71+j*3)*w,py=y+noise(id*39+j*7)*CHUNK;
        circle(ctx,px,py,5+noise(id*43+j)*20,noise(id+j)>.5?"#619b5b4d":"#2d694c44");
      }
      const cx=w*.5+Math.sin(id*.48)*w*.06;
      const wide=Math.min(w*.47,180);
      poly(ctx,[[cx-wide*.53,y-1],[cx+wide*.46,y-1],[cx+wide*.58,y+CHUNK+1],[cx-wide*.42,y+CHUNK+1]],COLORS.border);
      poly(ctx,[[cx-wide*.46,y-1],[cx+wide*.40,y-1],[cx+wide*.51,y+CHUNK+1],[cx-wide*.34,y+CHUNK+1]],COLORS.trail);
      for(let j=0;j<9;j++){
        const px=noise(id*23+j*11)*w,py=y+noise(id*51+j*13)*CHUNK;
        if(Math.abs(px-cx)<wide*.62+17)continue;
        const s=.55+noise(id*73+j*3)*.58;
        if(j===5&&id%3===1)ruins(ctx,px,py,s);
        else if(j%4===0)rock(ctx,px,py,s);
        else tree(ctx,px,py,s);
      }
      for(let j=0;j<10;j++){
        const px=noise(id*101+j*13)*w,py=y+noise(id*93+j*17)*CHUNK;
        if(Math.abs(px-cx)<wide*.57)continue;
        circle(ctx,px,py,2,noise(id*11+j)>.5?"#f4cf82":"#d9b2db");
      }
    }
    // Leve vinheta para destacar os tiros e o personagem.
    const shade=ctx.createLinearGradient(0,0,0,h);
    shade.addColorStop(0,"#1524354d");shade.addColorStop(.25,"#00000000");shade.addColorStop(1,"#15132b3b");
    ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);
  }
  // RF-0004: imagem aprovada; o fallback procedural permanece ate o asset estar disponivel.
  const art = new Image();
  let ready = false;
  art.onload = () => { ready = art.naturalWidth > 0; };
  art.onerror = () => { ready = false; };
  art.src = "./assets/maps/vale-esmeralda-fase1.webp?v=rf0004";
  function drawStage(ctx,w,h,time) {
    if (!ready) { draw(ctx,w,h,time); return; }
    const scale = w / art.naturalWidth;
    const tileHeight = art.naturalHeight * scale;
    const distance = Math.max(0,time) * 43;
    const shift = distance % tileHeight;
    for(let y = shift - tileHeight; y < h; y += tileHeight) {
      ctx.drawImage(art, 0, y, w, tileHeight + 0.6);
    }
  }
  window.WorldMap=Object.freeze({draw:drawStage,zoneAt:()=> "Vale Esmeralda",artLoaded:()=>ready});
})();
