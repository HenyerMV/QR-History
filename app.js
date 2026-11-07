/* EXPLORA IMCG · lógica. Los textos viven en contenidos/puntos.js */
const $=s=>document.querySelector(s),K='explora_imcg_v1',P=window.PUNTOS,N=P.length;
const COL={hist:'#B8860B',inst:'#0C45B4',env:'#238B57',com:'#3D73F5'};
let S=JSON.parse(localStorage.getItem(K)||'null')||{p:null,got:{},places:{},base:'https://explora-imcg.com'};
const sv=()=>localStorage.setItem(K,JSON.stringify(S));
const n2=i=>String(i+1).padStart(2,'0'),cnt=()=>Object.keys(S.got).length,pts=()=>cnt()*20+(cnt()===N?100:0),place=i=>S.places[i]||P[i].l;
const url=i=>S.base.replace(/\/$/,'')+'/#/qr/'+n2(i);
const img=(f,l)=>`<img class="crest" src="assets/${f}" alt="${l}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'${l}'}))">`;
const medal=(i,lock)=>{const c=COL[P[i].k];return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="${c}"/><circle cx="50" cy="50" r="38" fill="none" stroke="#F5C928" stroke-width="3"/><circle cx="50" cy="50" r="31" fill="#fff" opacity=".18"/><text x="50" y="60" font-size="32" text-anchor="middle">${P[i].e}</text><text x="50" y="86" font-size="9" font-weight="700" fill="#F5C928" text-anchor="middle" font-family="Sora,sans-serif">QR ${n2(i)}</text></svg>`};
const medalMaster=()=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#F5C928"/><circle cx="50" cy="50" r="38" fill="#0C45B4"/><text x="50" y="60" font-size="34" text-anchor="middle">🏆</text><text x="50" y="82" font-size="8" font-weight="700" fill="#F5C928" text-anchor="middle" font-family="Sora,sans-serif">MAESTRO</text></svg>`;

/* ---- Desbloqueo: una vez por insignia ---- */
function unlock(i){
 if(S.got[i]){toast('Ya descubriste este punto');return false}
 S.got[i]={d:new Date().toLocaleDateString('es-CO')};sv();
 const fin=cnt()===N;
 const o=document.createElement('div');o.className='ov';o.onclick=()=>{o.remove();render()};
 o.innerHTML=fin?`<div><h2>¡FELICIDADES!</h2>${medalMaster()}<h3>MAESTRO EXPLORADOR · +120 puntos</h3><p>Has descubierto las ${N} experiencias de EXPLORA IMCG.<br>Conoces más sobre nuestra institución y has aprendido cómo contribuir a su cuidado.</p></div>`
 :`<div><h2>¡NUEVA INSIGNIA DESBLOQUEADA!</h2>${medal(i)}<h3>${P[i].b}</h3><p>${P[i].t}<br><b>+20 puntos</b></p><p>Toca para continuar</p></div>`;
 document.body.append(o);return true}
const toast=m=>{const t=document.createElement('div');t.className='ov';t.style.cssText='inset:auto 0 90px;background:none;pointer-events:none';t.innerHTML=`<b style="background:#172B4D;padding:10px 18px;border-radius:8px">${m}</b>`;document.body.append(t);setTimeout(()=>t.remove(),1800)};

/* ---- Vistas ---- */
const V={};
V.inicio=()=>`<div class="hero"><h1>EXPLORA <em>IMCG</em></h1><div class="l">Una institución, muchas historias por descubrir.</div>
<p>¿Alguna vez te has preguntado qué historias esconden los espacios de tu colegio?</p><p>Descubre los acontecimientos, personajes, valores, espacios y curiosidades que forman parte de nuestra institución. Escanea los códigos QR distribuidos por el colegio y comienza a explorar.</p>
<a class="btn" href="#/mapa">COMENZAR A EXPLORAR</a> <a class="btn o" href="#/escanear">Escanear un QR</a></div>
<div class="wrap"><h2>Puntos descubiertos: ${cnt()}/${N}</h2><div class="bar"><i style="width:${cnt()/N*100}%"></i></div><p style="margin-top:12px">Isabel María Cuesta González · sede Mauricio López Sierra · Riohacha</p></div>`;
V.mapa=()=>`<div class="wrap"><h1>Mapa de exploración</h1><p>Puntos descubiertos: ${cnt()}/${N}</p><div class="bar" style="margin:8px 0 16px"><i style="width:${cnt()/N*100}%"></i></div><div class="map">${P.map((p,i)=>`<a class="pt ${S.got[i]?'ok':''}" style="--c:${COL[p.k]}" href="#/qr/${n2(i)}"><span class="n">${n2(i)}</span><span><b>${p.t}</b><small>${place(i)}</small><span class="st">${S.got[i]?'✓ Descubierto':'Por descubrir'}</span></span></a>`).join('')}</div></div>`;
V.punto=i=>{const p=P[i],c=COL[p.k];return `<div style="--c:${c}"><div class="ph2"><div class="n">${n2(i)}</div><h1>${p.t}</h1><p>${p.i}</p></div><div class="wrap">
${p.tl?`<div class="sec"><h3>Línea del tiempo</h3><div class="tl">${p.tl.map(t=>`<div><b>${t[0]}</b><br>${t[1]}</div>`).join('')}</div></div>`:''}
${p.s.map(s=>`<div class="sec"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}
${p.pend?`<div class="pend">${p.pend}</div>`:''}
<details><summary>¿SABÍAS QUE...? ${p.c[0]}</summary><p style="margin-top:8px">${p.c[1]}</p></details>
<h2>¡PONTE A PRUEBA!</h2><div class="sec"><b>${p.q[0]}</b>${p.q[1].map((o,k)=>`<button class="opt" onclick="ans(${i},${k},this)">${o}</button>`).join('')}<div class="fb" id="fb"></div></div>
<div class="refl">${p.r}</div>
<button class="btn b" onclick="unlock(${i})">${S.got[i]?'✓ Punto explorado':'Marcar como explorado'}</button> <a class="btn o" href="#/mapa">Volver al mapa</a></div></div>`};
function ans(i,k,b){const ok=k===P[i].q[2];b.className='opt '+(ok?'ok':'no');$('#fb').textContent=ok?'¡Correcto! Muy bien.':'Casi. Vuelve a intentarlo.'}
V.pasaporte=()=>{if(!S.p)return V.perfil();const a=cnt();return `<div class="wrap"><h1>Pasaporte del explorador</h1><p><b>${S.p.n}</b> · Grado ${S.p.g}</p>
<div class="stats"><div><b>${a}</b>Obtenidas</div><div><b>${N-a}</b>Pendientes</div><div><b>${pts()}</b>Puntos</div></div><div class="bar"><i style="width:${a/N*100}%"></i></div>
<a class="btn" href="#/escanear">Escanear código QR</a>
<h2>Colección</h2><div class="medals">${P.map((p,i)=>`<a class="md ${S.got[i]?'':'lk'}" href="#/qr/${n2(i)}">${medal(i)}${S.got[i]?p.b:'Bloqueada'}</a>`).join('')}<div class="md ${a===N?'':'lk'}">${medalMaster()}MAESTRO EXPLORADOR</div></div>
<h2>Historial</h2>${a?Object.keys(S.got).map(Number).sort((x,y)=>S.got[x].d>S.got[y].d?1:-1).map(i=>`<div class="sec"><b>${P[i].b}</b> · ${S.got[i].d}<br><small>Encontrado en: ${place(i)} · +20 puntos</small></div>`).join(''):'<p>Aún no has descubierto puntos. Escanea tu primer QR.</p>'}
<button class="btn o" onclick="if(confirm('¿Borrar tu progreso?')){S.got={};sv();render()}">Reiniciar demo</button></div>`};
V.perfil=()=>`<div class="wrap"><h1>Crea tu pasaporte</h1><p>Solo necesitamos tu nombre y tu grado. Se guardan en este celular.</p><label>Nombre</label><input id="pn" placeholder="Tu nombre"><label>Grado</label><select id="pg">${[...Array(11).keys()].map(g=>`<option>${g+1}°</option>`).join('')}</select><button class="btn b" onclick="mk()">Empezar</button></div>`;
function mk(){const n=$('#pn').value.trim();if(!n)return toast('Escribe tu nombre');S.p={n,g:$('#pg').value};sv();render()}
let stream,raf;
V.escanear=()=>`<div class="wrap"><h1>Escanear código QR</h1><p>Ubica el código dentro del marco dorado, con buena luz.</p><div class="frame"><video id="v" playsinline muted></video></div><div class="fb" id="sm">Esperando cámara…</div>
<h2>¿Sin cámara? Modo demostración</h2><select id="ds">${P.map((p,i)=>`<option value="${i}">QR-${n2(i)} · ${p.t}</option>`).join('')}</select><button class="btn b" onclick="found(QR_ID($('#ds').value))">Simular escaneo</button></div>`;
const QR_ID=i=>'QR-'+n2(+i);
function found(t){const m=String(t).match(/qr[\/-]?(\d{1,2})/i)||String(t).match(/^(\d{1,2})$/);const i=m?+m[1]-1:-1;
 if(i<0||i>=N){const e=$('#sm');if(e)e.textContent='Código desconocido: no pertenece a EXPLORA IMCG.';return}
 stopCam();if(!S.p){location.hash='#/pasaporte';return}$('#sm')&&($('#sm').textContent='¡Código reconocido! QR '+n2(i));unlock(i);location.hash='#/qr/'+n2(i)}
async function cam(){try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});const v=$('#v');v.srcObject=stream;await v.play();$('#sm').textContent='Buscando código…';const c=document.createElement('canvas'),x=c.getContext('2d');
 (function lp(){if(!stream)return;if(v.videoWidth){c.width=v.videoWidth;c.height=v.videoHeight;x.drawImage(v,0,0);const d=x.getImageData(0,0,c.width,c.height),r=window.jsQR&&jsQR(d.data,c.width,c.height);if(r&&r.data){found(r.data);return}}raf=requestAnimationFrame(lp)})()}
 catch(e){$('#sm').textContent='No hay acceso a la cámara (requiere HTTPS o localhost y tu permiso). Usa el modo demostración.'}}
function stopCam(){cancelAnimationFrame(raf);stream&&stream.getTracks().forEach(t=>t.stop());stream=null}
/* ---- Administrador de QR ---- */
function qrCanvas(i){const q=qrcode(0,'M');q.addData(url(i));q.make();const n=q.getModuleCount(),s=14,m=4*s,W=n*s+2*m,c=document.createElement('canvas');c.width=W;c.height=W+70;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.fillStyle='#0C45B4';
 for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))x.fillRect(m+k*s,m+r*s,s,s);x.fillStyle='#172B4D';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText('QR '+n2(i)+' · EXPLORA IMCG',W/2,W+44);return c}
V.admin=()=>`<div class="wrap"><h1>Administrador de QR</h1>
<div class="warn"><b>Aviso:</b> en esta demo local, los QR apuntan a la dirección de abajo. Solo abrirán desde cualquier celular cuando la app esté publicada con HTTPS en ese dominio. Hasta entonces, usa el mapa o el escáner de la app.</div>
<label>Dirección pública (dominio)</label><input id="bs" value="${S.base}" onchange="S.base=this.value;sv();render()">
<button class="btn b" onclick="printAll()">Imprimir etiquetas / guardar PDF</button>
${P.map((p,i)=>`<div class="adm"><canvas id="c${i}"></canvas><div><b>QR ${n2(i)} · ${p.t}</b><small style="display:block;word-break:break-all">${url(i)}</small><input value="${place(i)}" onchange="S.places[${i}]=this.value;sv()" aria-label="Ubicación"></div><button class="btn o" onclick="dl(${i})">PNG</button></div>`).join('')}</div>`;
function paintAdmin(){P.forEach((_,i)=>{const c=$('#c'+i);if(c&&window.qrcode){const s=qrCanvas(i);c.width=s.width;c.height=s.height;c.getContext('2d').drawImage(s,0,0)}})}
function dl(i){const a=document.createElement('a');a.href=qrCanvas(i).toDataURL('image/png');a.download='QR-'+n2(i)+'.png';a.click()}
function printAll(){$('#print').innerHTML=P.map((p,i)=>`<div class="lb"><img src="${qrCanvas(i).toDataURL()}"><b>QR ${n2(i)} · ${p.t}</b><small>${place(i)}</small></div>`).join('');setTimeout(()=>print(),200)}
/* ---- Router ---- */
function render(){stopCam();const h=location.hash.replace('#/','')||'inicio',m=h.match(/^qr\/(\d+)/),r=m?'punto':h.split('/')[0];const f=V[r]||V.inicio;
 $('#app').innerHTML=`<div class="top">${img('escudo.png','Escudo')}<b>EXPLORA IMCG</b><span>${cnt()}/${N}</span></div>${m&&P[+m[1]-1]?f(+m[1]-1):(m?V.mapa():f())}
 <nav class="nav">${[['inicio','Inicio'],['mapa','Mapa'],['pasaporte','Pasaporte'],['escanear','Escanear'],['admin','Admin']].map(a=>`<a href="#/${a[0]}" class="${r===a[0]?'on':''}">${a[1]}</a>`).join('')}</nav>`;
 if(r==='escanear')cam();if(r==='admin')paintAdmin();scrollTo(0,0)}
addEventListener('hashchange',render);render();
