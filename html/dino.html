<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fútbol 1v1 - La Liga</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0d1117;font-family:Arial,Helvetica,sans-serif;padding:16px;}
.wrapper{width:100%;max-width:720px;}

/* Scoreboard */
.scoreboard{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:linear-gradient(135deg,#16213e,#0f3460);border:1px solid #1e4a7a;border-radius:12px;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,0.4);}
.team-score{display:flex;flex-direction:column;align-items:center;gap:4px;}
.team-badge{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;border:2.5px solid #fff;box-shadow:0 0 10px rgba(255,255,255,0.2);}
.team-name{font-size:11px;color:#9ab;text-align:center;max-width:100px;font-weight:bold;letter-spacing:.5px;}
.score-main{font-size:38px;font-weight:900;color:#fff;min-width:90px;text-align:center;letter-spacing:6px;text-shadow:0 0 20px rgba(255,255,255,0.3);}
.time-display{font-size:12px;color:#7a9;text-align:center;margin-top:2px;font-variant-numeric:tabular-nums;}
.period-info{font-size:10px;color:#567;text-align:center;}

canvas{width:100%;display:block;border-radius:10px;border:2px solid #1e4a7a;box-shadow:0 8px 32px rgba(0,0,0,0.5);}

/* Controls */
.controls{display:flex;gap:8px;margin-top:10px;}
.ctrl-group{flex:1;display:flex;flex-direction:column;gap:4px;align-items:center;}
.ctrl-label{font-size:10px;color:#567;text-align:center;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;}
.ctrl-row{display:flex;gap:4px;justify-content:center;}
.btn{padding:10px 16px;font-size:14px;border:1px solid #2a3a5a;border-radius:8px;background:#0f1929;color:#ccd;cursor:pointer;transition:background .1s,transform .1s,border-color .1s;-webkit-tap-highlight-color:transparent;font-weight:bold;}
.btn:active,.btn.pressed{transform:scale(0.92);background:#1e3a5a;border-color:#4a7ab0;}
.btn-shoot{padding:12px 14px;font-size:12px;font-weight:bold;background:linear-gradient(135deg,#1a3a6a,#0f2a4a);border-color:#2a5a9a;line-height:1.4;color:#7af;}
.btn-shoot:active{background:linear-gradient(135deg,#2a4a8a,#1a3a6a);}
.btn-big{padding:14px 32px;font-size:17px;font-weight:900;background:linear-gradient(135deg,#c0392b,#e74c3c);border:none;color:#fff;border-radius:12px;cursor:pointer;box-shadow:0 4px 16px rgba(231,76,60,0.4);letter-spacing:.5px;}
.btn-big:hover{background:linear-gradient(135deg,#a93226,#c0392b);transform:translateY(-1px);}
.btn-big:active{transform:translateY(1px);}

/* Team select */
#team-select-screen{background:linear-gradient(135deg,#111827,#16213e);border-radius:16px;padding:24px;border:1px solid #1e4a7a;box-shadow:0 8px 32px rgba(0,0,0,0.5);}
.select-title{text-align:center;color:#fff;font-size:20px;font-weight:900;margin-bottom:6px;letter-spacing:1px;}
.select-subtitle{text-align:center;color:#567;font-size:12px;margin-bottom:20px;}
.select-section{background:rgba(255,255,255,0.03);border-radius:10px;padding:14px;margin-bottom:12px;border:1px solid #1e2a3a;}
.select-label{font-size:12px;color:#7af;margin-bottom:10px;text-align:center;font-weight:bold;text-transform:uppercase;letter-spacing:1px;}
.team-select{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;}
.team-opt{padding:7px 13px;font-size:12px;border:1px solid #2a3a5a;border-radius:20px;cursor:pointer;background:#0d1117;color:#8ab;transition:all .15s;font-weight:bold;}
.team-opt.selected{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border-color:#e74c3c;box-shadow:0 2px 8px rgba(231,76,60,0.4);}
.team-opt:hover:not(.selected){border-color:#4a7ab0;color:#cde;background:#0f1929;}
.start-wrap{text-align:center;margin-top:16px;}
.controls-hint{display:flex;gap:10px;margin-top:12px;}
.ctrl-hint-box{flex:1;background:rgba(255,255,255,0.03);border:1px solid #1e2a3a;border-radius:8px;padding:10px;text-align:center;font-size:11px;color:#567;line-height:1.8;}
.ctrl-hint-box strong{color:#7af;display:block;margin-bottom:4px;}

.hint{font-size:11px;color:#456;text-align:center;margin-top:8px;}
.menu-wrap{text-align:center;margin-top:8px;}
.btn-menu{padding:8px 20px;font-size:12px;background:#0d1117;border:1px solid #2a3a5a;border-radius:8px;color:#567;cursor:pointer;font-weight:bold;}
.btn-menu:hover{border-color:#4a7ab0;color:#9ab;}

/* Mini power bar */
.power-bars{display:flex;justify-content:space-between;margin-top:6px;gap:8px;}
.power-bar-wrap{flex:1;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.03);border-radius:6px;padding:4px 8px;border:1px solid #1e2a3a;}
.power-label{font-size:10px;color:#567;white-space:nowrap;}
.power-bar-bg{flex:1;height:6px;background:#0d1117;border-radius:3px;overflow:hidden;border:1px solid #2a3a5a;}
.power-bar-fill{height:100%;border-radius:3px;transition:width .05s;}
</style>
</head>
<body>
<div class="wrapper">

  <!-- PANTALLA DE SELECCIÓN -->
  <div id="team-select-screen">
    <div class="select-title">⚽ Fútbol 1v1</div>
    <div class="select-subtitle">La Liga · 2 Jugadores</div>

    <div class="select-section">
      <p class="select-label">🔴 Jugador 1 — lado izquierdo</p>
      <div class="team-select" id="t1-opts"></div>
    </div>

    <div class="select-section">
      <p class="select-label">🔵 Jugador 2 — lado derecho</p>
      <div class="team-select" id="t2-opts"></div>
    </div>

    <div class="controls-hint">
      <div class="ctrl-hint-box">
        <strong>Jugador 1</strong>
        Mover: W A S D<br>
        Disparar: Q<br>
        Sprint: Shift
      </div>
      <div class="ctrl-hint-box">
        <strong>Jugador 2</strong>
        Mover: ↑ ← ↓ →<br>
        Disparar: L<br>
        Sprint: Enter
      </div>
    </div>

    <div class="start-wrap">
      <button class="btn btn-big" id="start-btn">▶ JUGAR</button>
    </div>
    <p class="hint" style="margin-top:12px;">Primero en 3 goles gana · Tiempo límite 90 segundos</p>
  </div>

  <!-- PANTALLA DE JUEGO -->
  <div id="game-screen" style="display:none;">
    <div class="scoreboard">
      <div class="team-score">
        <div class="team-badge" id="badge1"></div>
        <div class="team-name" id="name1"></div>
      </div>
      <div style="text-align:center;">
        <div class="score-main" id="score-display">0 - 0</div>
        <div class="time-display" id="time-display">00:00</div>
        <div class="period-info" id="period-info">Primer tiempo</div>
      </div>
      <div class="team-score">
        <div class="team-badge" id="badge2"></div>
        <div class="team-name" id="name2"></div>
      </div>
    </div>

    <canvas id="cv" width="720" height="400"></canvas>

    <div class="power-bars">
      <div class="power-bar-wrap">
        <span class="power-label">⚡J1</span>
        <div class="power-bar-bg"><div class="power-bar-fill" id="pbar1" style="width:0%;background:#e74c3c;"></div></div>
      </div>
      <div class="power-bar-wrap" style="justify-content:flex-end;">
        <div class="power-bar-bg"><div class="power-bar-fill" id="pbar2" style="width:0%;background:#3498db;"></div></div>
        <span class="power-label">J2⚡</span>
      </div>
    </div>

    <div class="controls">
      <div class="ctrl-group">
        <div class="ctrl-label">J1 · WASD · Q dispara</div>
        <div class="ctrl-row"><button class="btn" id="w-btn">W</button></div>
        <div class="ctrl-row">
          <button class="btn" id="a-btn">A</button>
          <button class="btn" id="s-btn">S</button>
          <button class="btn" id="d-btn">D</button>
        </div>
      </div>
      <div class="ctrl-group" style="justify-content:center;gap:6px;">
        <button class="btn btn-shoot" id="shoot1-btn">⚡ DISPARAR<br>Jugador 1</button>
        <button class="btn btn-shoot" id="shoot2-btn">⚡ DISPARAR<br>Jugador 2</button>
      </div>
      <div class="ctrl-group">
        <div class="ctrl-label">J2 · Flechas · L dispara</div>
        <div class="ctrl-row"><button class="btn" id="up-btn">↑</button></div>
        <div class="ctrl-row">
          <button class="btn" id="left-btn">←</button>
          <button class="btn" id="down-btn">↓</button>
          <button class="btn" id="right-btn">→</button>
        </div>
      </div>
    </div>

    <div class="menu-wrap">
      <button class="btn-menu" id="menu-btn">← Menú principal</button>
    </div>
  </div>

</div>
<script>
(function(){
'use strict';

// ─── EQUIPOS ───────────────────────────────────────────────────────────────
const TEAMS = [
  {name:'Real Madrid',  kitP:'#FFFFFF', kitS:'#C8A800', emoji:'⭐', accent:'#C8A800'},
  {name:'Barcelona',    kitP:'#A50044', kitS:'#004D98', emoji:'🔵', accent:'#004D98'},
  {name:'Atlético',     kitP:'#CB3524', kitS:'#FFFFFF', emoji:'🔴', accent:'#CB3524'},
  {name:'Sevilla',      kitP:'#E63329', kitS:'#FFFFFF', emoji:'⚪', accent:'#E63329'},
  {name:'Valencia',     kitP:'#FFFFFF', kitS:'#FF7003', emoji:'🦇', accent:'#FF7003'},
  {name:'Villarreal',   kitP:'#FFE135', kitS:'#003399', emoji:'🟡', accent:'#FFE135'},
  {name:'Betis',        kitP:'#00843D', kitS:'#FFFFFF', emoji:'🍀', accent:'#00843D'},
  {name:'Sociedad',     kitP:'#003DA5', kitS:'#FFFFFF', emoji:'🔷', accent:'#003DA5'},
];

let selT1 = 0, selT2 = 1;

function buildOpts(id, getSelected, onSelect) {
  const c = document.getElementById(id);
  c.innerHTML = '';
  TEAMS.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'team-opt' + (i === getSelected() ? ' selected' : '');
    el.textContent = t.emoji + ' ' + t.name;
    el.onclick = () => {
      onSelect(i);
      buildOpts('t1-opts', ()=>selT1, v=>{ selT1=v; });
      buildOpts('t2-opts', ()=>selT2, v=>{ selT2=v; });
    };
    c.appendChild(el);
  });
}
buildOpts('t1-opts', ()=>selT1, v=>{ selT1=v; });
buildOpts('t2-opts', ()=>selT2, v=>{ selT2=v; });

// ─── CANVAS ────────────────────────────────────────────────────────────────
const cv  = document.getElementById('cv');
const ctx = cv.getContext('2d');
const W   = cv.width;   // 720
const H   = cv.height;  // 400

// Medidas del campo
const MARGIN  = 22;
const GOAL_W  = 16;
const GOAL_H  = 100;
const GOAL_Y  = H / 2 - GOAL_H / 2;

// Jugadores y pelota
const PR = 16;   // player radius
const BR = 9;    // ball radius

// Física
const SPEED        = 3.5;
const SPRINT_MULT  = 1.65;
const FRICTION     = 0.984;
const SHOOT_PWR    = 11;
const SHOOT_CD_MAX = 45;  // frames entre disparos
const POWER_CHARGE = 1.8; // carga de poder por frame (máx 100)

// Juego
const GOAL_TO_WIN  = 3;
const MATCH_SECS   = 90;

// ─── ESTADO ────────────────────────────────────────────────────────────────
const keys = {};
let p1, p2, ball;
let score1 = 0, score2 = 0, gameTime = 0;
let gameRunning  = false;
let goalPause    = false;   // FIX: pausa física durante gol
let gameEnded    = false;   // FIX: evita endGame doble
let gameTimer    = null;
let rafId        = null;
let flashFrames  = 0;
let goalMsg      = '';
let goalMsgFrames = 0;
let shoot1req    = false;
let shoot2req    = false;

// Partículas de gol
let particles = [];

// ─── AUDIO ────────────────────────────────────────────────────────────────
let actx;
function beep(freq, dur, type='square', vol=0.06, detune=0) {
  try {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type; o.frequency.value = freq; o.detune.value = detune;
    g.gain.value = vol;
    o.connect(g); g.connect(actx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.stop(actx.currentTime + dur);
  } catch(e) {}
}
function sfxKick()  { beep(180, 0.07, 'sawtooth', 0.07); }
function sfxGoal()  {
  [523,659,784,1047].forEach((f,i) => setTimeout(()=>beep(f,.18,'sine',.08), i*90));
}
function sfxWall()  { beep(120, 0.05, 'sine', 0.04); }
function sfxWhistle(){ beep(1200, 0.3, 'sine', 0.08); setTimeout(()=>beep(1400,.25,'sine',.06),250); }

// ─── INIT ──────────────────────────────────────────────────────────────────
function initGame() {
  score1 = 0; score2 = 0; gameTime = 0;
  flashFrames = 0; goalMsg = ''; goalMsgFrames = 0;
  particles = [];
  gameEnded  = false;
  goalPause  = false;
  p1 = { x:W*0.22, y:H/2, vx:0, vy:0, shootCD:0, power:0 };
  p2 = { x:W*0.78, y:H/2, vx:0, vy:0, shootCD:0, power:0 };
  ball = { x:W/2, y:H/2, vx:0.5, vy:0 };
  document.getElementById('score-display').textContent = '0 - 0';
  document.getElementById('time-display').textContent  = '00:00';
  document.getElementById('period-info').textContent   = 'Primer tiempo';
}

function kickoff(delay=600) {
  goalPause = true;
  setTimeout(() => {
    ball.x = W/2; ball.y = H/2;
    ball.vx = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random());
    ball.vy = (Math.random() - 0.5) * 2;
    p1.x = W*0.22; p1.y = H/2; p1.vx=0; p1.vy=0;
    p2.x = W*0.78; p2.y = H/2; p2.vx=0; p2.vy=0;
    goalPause = false;
  }, delay);
}

// ─── PARTÍCULAS ────────────────────────────────────────────────────────────
function spawnParticles(x, y, color) {
  for (let i = 0; i < 28; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 2 + Math.random() * 6;
    particles.push({
      x, y,
      vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd,
      life: 60 + Math.random()*30,
      maxLife: 60 + Math.random()*30,
      r: 2 + Math.random()*4,
      color
    });
  }
}

function updateParticles() {
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.15;
    p.vx *= 0.97; p.vy *= 0.97;
    p.life--;
  });
  particles = particles.filter(p => p.life > 0);
}

function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha = p.life / p.maxLife;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ─── CAMPO ─────────────────────────────────────────────────────────────────
function drawField() {
  // Fondo césped con degradado
  const grd = ctx.createLinearGradient(0,0,0,H);
  grd.addColorStop(0, '#2a7024');
  grd.addColorStop(1, '#236e1f');
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,W,H);

  // Franjas de césped
  for (let i=0; i<W; i+=48) {
    if (Math.floor(i/48)%2===0) {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(i, 0, 48, H);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.82)';
  ctx.lineWidth   = 2;

  // Borde campo
  ctx.strokeRect(MARGIN, MARGIN, W-MARGIN*2, H-MARGIN*2);

  // Línea central
  ctx.beginPath(); ctx.moveTo(W/2, MARGIN); ctx.lineTo(W/2, H-MARGIN); ctx.stroke();

  // Círculo central
  ctx.beginPath(); ctx.arc(W/2, H/2, 60, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath(); ctx.arc(W/2, H/2, 3.5, 0, Math.PI*2); ctx.fill();

  // Áreas grandes
  const boxW=95, boxH=140;
  ctx.strokeRect(MARGIN,     H/2-boxH/2, boxW, boxH);
  ctx.strokeRect(W-MARGIN-boxW, H/2-boxH/2, boxW, boxH);

  // Áreas pequeñas
  const sboxW=44, sboxH=72;
  ctx.strokeRect(MARGIN,       H/2-sboxH/2, sboxW, sboxH);
  ctx.strokeRect(W-MARGIN-sboxW, H/2-sboxH/2, sboxW, sboxH);

  // Puntos de penalti
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.beginPath(); ctx.arc(MARGIN+boxW*0.75, H/2, 3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(W-MARGIN-boxW*0.75, H/2, 3, 0, Math.PI*2); ctx.fill();

  // Semicírculos del área
  ctx.beginPath();
  ctx.arc(MARGIN+boxW*0.75, H/2, 40, -Math.PI*0.6, Math.PI*0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W-MARGIN-boxW*0.75, H/2, 40, Math.PI*0.4, Math.PI*1.6);
  ctx.stroke();

  // PORTERÍAS
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(0, GOAL_Y, GOAL_W, GOAL_H);
  ctx.fillRect(W-GOAL_W, GOAL_Y, GOAL_W, GOAL_H);

  ctx.strokeStyle = 'rgba(255,255,255,0.92)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(0, GOAL_Y, GOAL_W, GOAL_H);
  ctx.strokeRect(W-GOAL_W, GOAL_Y, GOAL_W, GOAL_H);

  // Red de la portería
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 0.5;
  for (let y = GOAL_Y; y <= GOAL_Y+GOAL_H; y += 10) {
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(GOAL_W,y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-GOAL_W,y); ctx.lineTo(W,y); ctx.stroke();
  }
  for (let x = 0; x <= GOAL_W; x += 8) {
    ctx.beginPath(); ctx.moveTo(x,GOAL_Y); ctx.lineTo(x,GOAL_Y+GOAL_H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W-GOAL_W+x,GOAL_Y); ctx.lineTo(W-GOAL_W+x,GOAL_Y+GOAL_H); ctx.stroke();
  }
}

// ─── JUGADOR ───────────────────────────────────────────────────────────────
function drawPlayer(p, teamIdx, isP1) {
  const t = TEAMS[teamIdx];

  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath();
  ctx.ellipse(p.x, p.y+PR+4, PR*0.75, 5, 0, 0, Math.PI*2);
  ctx.fill();

  // Halo de sprint
  const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
  if (spd > SPEED * 1.4) {
    ctx.strokeStyle = t.accent + '55';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(p.x, p.y, PR+4, 0, Math.PI*2); ctx.stroke();
  }

  // Cuerpo
  ctx.fillStyle = t.kitP;
  ctx.strokeStyle = t.kitS;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(p.x, p.y, PR, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // Número del jugador
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  // Contraste automático de color
  const bright = parseInt(t.kitP.slice(1,3),16)*0.299 + parseInt(t.kitP.slice(3,5),16)*0.587 + parseInt(t.kitP.slice(5,7),16)*0.114;
  ctx.fillStyle = bright > 128 ? '#333' : '#eee';
  ctx.fillText(isP1 ? '1' : '2', p.x, p.y+1);

  // Indicador de cooldown de disparo (arco)
  if (p.shootCD > 0) {
    const pct = 1 - p.shootCD / SHOOT_CD_MAX;
    ctx.strokeStyle = isP1 ? '#e74c3c' : '#3498db';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(p.x, p.y, PR+6, -Math.PI/2, -Math.PI/2 + pct*Math.PI*2);
    ctx.stroke();
  }
}

// ─── PELOTA ────────────────────────────────────────────────────────────────
function drawBall() {
  const b = ball;
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath(); ctx.ellipse(b.x, b.y+BR+3, BR*0.7, 4, 0, 0, Math.PI*2); ctx.fill();

  // Pelota
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(b.x, b.y, BR, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // Hexágonos/parches
  ctx.fillStyle = '#2a2a2a';
  const patches = [{x:-2,y:-3,r:0.3},{x:3,y:2,r:0.25},{x:-3,y:3,r:0.22},{x:3,y:-4,r:0.2}];
  patches.forEach(p => {
    ctx.beginPath(); ctx.arc(b.x+p.x, b.y+p.y, BR*p.r, 0, Math.PI*2); ctx.fill();
  });

  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.beginPath(); ctx.arc(b.x-2, b.y-3, BR*0.25, 0, Math.PI*2); ctx.fill();
}

// ─── FÍSICA ────────────────────────────────────────────────────────────────
function circleCollide(a, aR, b, bR) {
  const dx=b.x-a.x, dy=b.y-a.y;
  const d = Math.sqrt(dx*dx+dy*dy);
  if (d < aR+bR && d > 0.01) {
    const nx=dx/d, ny=dy/d;
    const ov=(aR+bR-d)/2;
    a.x -= nx*ov; a.y -= ny*ov;
    b.x += nx*ov; b.y += ny*ov;
    const rv=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
    if (rv < 0) {
      const imp = rv * 0.78;
      b.vx -= imp*nx; b.vy -= imp*ny;
      a.vx += imp*nx; a.vy += imp*ny;
    }
  }
}

function movePlayer(p, up, down, left, right, sprint) {
  const spd = sprint ? SPEED*SPRINT_MULT : SPEED;
  if (up)    p.vy = -spd; else if (down) p.vy = spd;  else p.vy *= 0.62;
  if (left)  p.vx = -spd; else if (right) p.vx = spd; else p.vx *= 0.62;

  p.x += p.vx; p.y += p.vy;

  // FIX: límites que incluyen las paredes de la portería
  // Los jugadores NO pueden entrar en la zona de gol (detrás del poste)
  const minX = GOAL_W + PR;
  const maxX = W - GOAL_W - PR;
  p.x = Math.max(minX, Math.min(maxX, p.x));
  p.y = Math.max(PR + MARGIN, Math.min(H - PR - MARGIN, p.y));

  if (p.shootCD > 0) p.shootCD--;

  // Carga de poder
  p.power = Math.min(100, p.power + POWER_CHARGE);
}

function doShoot(p) {
  if (p.shootCD > 0) return;
  const dx=ball.x-p.x, dy=ball.y-p.y;
  const d=Math.sqrt(dx*dx+dy*dy);
  const pwr = SHOOT_PWR * (0.6 + 0.4 * (p.power/100));

  if (d < PR+BR+36) {
    const ang = Math.atan2(dy,dx);
    ball.vx = Math.cos(ang)*pwr + p.vx*0.4;
    ball.vy = Math.sin(ang)*pwr + p.vy*0.4;
  } else {
    const dir = p===p1 ? 1 : -1;
    ball.vx = dir * pwr;
    ball.vy = (Math.random()-0.5)*4;
  }
  p.shootCD = SHOOT_CD_MAX;
  p.power   = 0;
  sfxKick();
}

// ─── GOLES ─────────────────────────────────────────────────────────────────
// FIX: flag para evitar detectar el mismo gol dos veces
let scoredThisFrame = false;

function checkGoals() {
  if (scoredThisFrame) return;

  // Portería izquierda → marca J2
  if (ball.x - BR < GOAL_W && ball.y > GOAL_Y && ball.y < GOAL_Y+GOAL_H) {
    scoredThisFrame = true;
    score2++;
    onGoal(2, 0, H/2);
    return;
  }
  // Portería derecha → marca J1
  if (ball.x + BR > W-GOAL_W && ball.y > GOAL_Y && ball.y < GOAL_Y+GOAL_H) {
    scoredThisFrame = true;
    score1++;
    onGoal(1, W, H/2);
  }
}

function onGoal(scorer, gx, gy) {
  goalPause = true;
  document.getElementById('score-display').textContent = `${score1} - ${score2}`;
  flashFrames = 50;
  goalMsg     = '⚽ GOL de ' + TEAMS[scorer===1?selT1:selT2].name + '!';
  goalMsgFrames = 110;
  spawnParticles(gx, gy, scorer===1 ? TEAMS[selT1].accent : TEAMS[selT2].accent);
  sfxGoal();

  if (score1 >= GOAL_TO_WIN || score2 >= GOAL_TO_WIN) {
    setTimeout(endGame, 900);
    return;
  }
  // FIX: reset del flag ANTES del kickoff con delay
  setTimeout(() => { scoredThisFrame = false; }, 100);
  kickoff(800);
}

// ─── FIN DE JUEGO ──────────────────────────────────────────────────────────
function endGame() {
  if (gameEnded) return;   // FIX: evita doble llamada
  gameEnded   = true;
  gameRunning = false;
  goalPause   = false;
  clearInterval(gameTimer);
  sfxWhistle();

  setTimeout(() => {
    // Overlay
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0,0,W,H);

    const winner = score1 > score2 ? TEAMS[selT1] : score2 > score1 ? TEAMS[selT2] : null;

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    if (winner) {
      ctx.font = 'bold 42px Arial';
      ctx.fillStyle = winner.accent;
      ctx.fillText('¡' + winner.name + '!', W/2, H/2-45);
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('¡Campeón!', W/2, H/2-8);
    } else {
      ctx.font = 'bold 38px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('¡Empate!', W/2, H/2-20);
    }

    ctx.font = '26px Arial'; ctx.fillStyle = '#ddd';
    ctx.fillText(score1 + '  -  ' + score2, W/2, H/2+34);
    ctx.font = '14px Arial'; ctx.fillStyle = '#888';
    ctx.fillText('Toca o haz clic para jugar de nuevo', W/2, H/2+72);

    // FIX: al reiniciar también llamamos kickoff correctamente
    const restart = () => {
      cv.removeEventListener('click', restart);
      cv.removeEventListener('touchstart', restart);
      initGame();
      kickoff(100);
      startMatch();
    };
    cv.addEventListener('click', restart);
    cv.addEventListener('touchstart', restart, {passive:true});
  }, 300);
}

// ─── LOOP PRINCIPAL ────────────────────────────────────────────────────────
function loop() {
  if (!gameRunning) return;

  const sprint1 = keys['Shift'];
  const sprint2 = keys['Enter'];

  movePlayer(p1,
    keys['w']||keys['W'], keys['s']||keys['S'],
    keys['a']||keys['A'], keys['d']||keys['D'], sprint1);
  movePlayer(p2,
    keys['ArrowUp'], keys['ArrowDown'],
    keys['ArrowLeft'], keys['ArrowRight'], sprint2);

  if (shoot1req) { doShoot(p1); shoot1req=false; }
  if (shoot2req) { doShoot(p2); shoot2req=false; }

  // FIX: física pausada durante gol
  if (!goalPause) {
    ball.x += ball.vx; ball.y += ball.vy;
    ball.vx *= FRICTION; ball.vy *= FRICTION;

    // Paredes top/bottom
    if (ball.y - BR < MARGIN)   { ball.y = MARGIN+BR;   ball.vy *= -0.72; sfxWall(); }
    if (ball.y + BR > H-MARGIN) { ball.y = H-MARGIN-BR; ball.vy *= -0.72; sfxWall(); }

    // FIX: paredes laterales con zona de gol correcta
    if (ball.x - BR < 0) {
      if (ball.y > GOAL_Y && ball.y < GOAL_Y+GOAL_H) {
        // dentro del área de gol — dejar pasar (o rebotar en el fondo)
        if (ball.x - BR < -GOAL_W) { ball.x = -GOAL_W+BR; ball.vx *= -0.7; sfxWall(); }
      } else {
        ball.x = BR; ball.vx *= -0.72; sfxWall();
      }
    }
    if (ball.x + BR > W) {
      if (ball.y > GOAL_Y && ball.y < GOAL_Y+GOAL_H) {
        if (ball.x + BR > W+GOAL_W) { ball.x = W+GOAL_W-BR; ball.vx *= -0.7; sfxWall(); }
      } else {
        ball.x = W-BR; ball.vx *= -0.72; sfxWall();
      }
    }

    circleCollide(p1, PR, ball, BR);
    circleCollide(p2, PR, ball, BR);
    circleCollide(p1, PR, p2,   PR);
    checkGoals();
  }

  updateParticles();

  // Barras de poder
  document.getElementById('pbar1').style.width = p1.power + '%';
  document.getElementById('pbar2').style.width = p2.power + '%';

  // ── Dibujo ──
  drawField();

  if (flashFrames > 0) {
    ctx.fillStyle = `rgba(255,215,0,${(flashFrames/50)*0.38})`;
    ctx.fillRect(0,0,W,H);
    flashFrames--;
  }

  drawParticles();
  drawPlayer(p1, selT1, true);
  drawPlayer(p2, selT2, false);
  drawBall();

  // Mensaje de gol
  if (goalMsgFrames > 0) {
    const alpha = Math.min(1, goalMsgFrames/20) * Math.min(1, (goalMsgFrames)/15);
    ctx.globalAlpha = alpha;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tw = ctx.measureText(goalMsg).width;
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.beginPath();
    ctx.roundRect(W/2-tw/2-22, H/2-36, tw+44, 54, 10);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.fillText(goalMsg, W/2, H/2-10);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(score1 + ' - ' + score2, W/2, H/2+14);
    ctx.globalAlpha = 1;
    goalMsgFrames--;
  }

  rafId = requestAnimationFrame(loop);
}

// ─── CRONÓMETRO ────────────────────────────────────────────────────────────
function startMatch() {
  gameRunning = true; gameTime = 0;
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    if (!gameRunning) return;
    gameTime++;
    const m = String(Math.floor(gameTime/60)).padStart(2,'0');
    const s = String(gameTime%60).padStart(2,'0');
    document.getElementById('time-display').textContent = `${m}:${s}`;
    document.getElementById('period-info').textContent =
      gameTime < 45 ? 'Primer tiempo' : gameTime < 90 ? 'Segundo tiempo' : 'Tiempo extra';
    if (gameTime >= MATCH_SECS && !gameEnded) endGame();
  }, 1000);
  if (rafId) cancelAnimationFrame(rafId);
  loop();
}

// ─── BOTÓN JUGAR ───────────────────────────────────────────────────────────
document.getElementById('start-btn').onclick = () => {
  const t1=TEAMS[selT1], t2=TEAMS[selT2];
  const b1=document.getElementById('badge1');
  b1.style.background=t1.kitP; b1.style.borderColor=t1.kitS; b1.textContent=t1.emoji;
  const b2=document.getElementById('badge2');
  b2.style.background=t2.kitP; b2.style.borderColor=t2.kitS; b2.textContent=t2.emoji;
  document.getElementById('name1').textContent=t1.name;
  document.getElementById('name2').textContent=t2.name;
  document.getElementById('team-select-screen').style.display='none';
  document.getElementById('game-screen').style.display='block';
  initGame(); kickoff(200); startMatch();
  sfxWhistle();
};

document.getElementById('menu-btn').onclick = () => {
  gameRunning=false; gameEnded=true; clearInterval(gameTimer);
  if(rafId) cancelAnimationFrame(rafId);
  document.getElementById('game-screen').style.display='none';
  document.getElementById('team-select-screen').style.display='block';
  buildOpts('t1-opts',()=>selT1,v=>{ selT1=v; });
  buildOpts('t2-opts',()=>selT2,v=>{ selT2=v; });
};

// ─── TECLADO ───────────────────────────────────────────────────────────────
document.addEventListener('keydown', e=>{
  keys[e.key] = true;
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Enter'].includes(e.key)) e.preventDefault();
  if (e.key==='q'||e.key==='Q') { shoot1req=true; }
  if (e.key==='l'||e.key==='L') { shoot2req=true; }
});
document.addEventListener('keyup', e=>{ keys[e.key]=false; });

// ─── BOTONES TÁCTILES ──────────────────────────────────────────────────────
function holdBtn(id, key) {
  const b = document.getElementById(id); if(!b) return;
  const on=()=>{ keys[key]=true; b.classList.add('pressed'); };
  const off=()=>{ keys[key]=false; b.classList.remove('pressed'); };
  b.addEventListener('mousedown',on);
  b.addEventListener('mouseup',off);
  b.addEventListener('mouseleave',off);
  b.addEventListener('touchstart',e=>{e.preventDefault();on();},{passive:false});
  b.addEventListener('touchend',  e=>{e.preventDefault();off();},{passive:false});
}
holdBtn('w-btn','w'); holdBtn('s-btn','s'); holdBtn('a-btn','a'); holdBtn('d-btn','d');
holdBtn('up-btn','ArrowUp'); holdBtn('down-btn','ArrowDown');
holdBtn('left-btn','ArrowLeft'); holdBtn('right-btn','ArrowRight');

function tapBtn(id, fn) {
  const b=document.getElementById(id); if(!b) return;
  b.addEventListener('mousedown', fn);
  b.addEventListener('touchstart', e=>{ e.preventDefault(); fn(); },{passive:false});
}
tapBtn('shoot1-btn', ()=>{ shoot1req=true; });
tapBtn('shoot2-btn', ()=>{ shoot2req=true; });

})();
</script>
</body>
</html>