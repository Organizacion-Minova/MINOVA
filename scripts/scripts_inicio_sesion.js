/* ═══════════════════════════════════════════
   1. CARRUSEL AUTOMÁTICO
   Compartido por las 3 páginas
═══════════════════════════════════════════ */
(function () {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  let actual = 0;
  function siguiente() {
    slides[actual].classList.remove('activo');
    actual = (actual + 1) % slides.length;
    slides[actual].classList.add('activo');
  }
  setInterval(siguiente, 4500);
})();

/* ═══════════════════════════════════════════
   2. TOGGLE VER / OCULTAR CONTRASEÑA
   Compartido por crear_cuenta y recuperar_contraseña
═══════════════════════════════════════════ */
let SVG_VER = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
let SVG_OC  = `<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

function crearTogglePass(btnId, inputId, icoId) {
  const btn   = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', function () {
    if (input.type === 'password') {
      input.type = 'text';
      if (icoId) { const ico = document.getElementById(icoId); if (ico) ico.innerHTML = SVG_OC; }
    } else {
      input.type = 'password';
      if (icoId) { const ico = document.getElementById(icoId); if (ico) ico.innerHTML = SVG_VER; }
    }
  });
}

// Inicio de sesión
crearTogglePass('btnVerPass', 'passInput', null);

// Crear cuenta
crearTogglePass('btnVerPass1', 'password', 'icoPass1');
crearTogglePass('btnVerPass2', 'confirmar', 'icoPass2');

// Recuperar contraseña
(function () {
  function toggleVerSimple(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const inp = document.getElementById(inputId);
    if (!btn || !inp) return;
    btn.addEventListener('click', () => {
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  }
  toggleVerSimple('btnVer1', 'passNueva');
  toggleVerSimple('btnVer2', 'passConfirm');
})();

/* ═══════════════════════════════════════════
   3. FORTALEZA DE CONTRASEÑA
   Compartido por crear_cuenta y recuperar_contraseña
═══════════════════════════════════════════ */
function calcularFuerza(pass) {
  let score = 0;
  if (pass.length >= 8)           score++;
  if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
  if (/[0-9]/.test(pass))         score++;
  if (/[^A-Za-z0-9]/.test(pass))  score++;
  return score;
}

// Crear cuenta — barra de fuerza
(function () {
  const inp = document.getElementById('password');
  if (!inp) return;
  const COLORES = ['', '#FF4444', '#FF9800', '#FFD800', '#00B333'];
  const LABELS  = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];

  inp.addEventListener('input', function () {
    const val   = this.value;
    const wrap  = document.getElementById('fuerzaWrap');
    const label = document.getElementById('fuerzaLabel');
    if (!wrap) return;
    if (!val) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    const score = calcularFuerza(val);
    [1,2,3,4].forEach(i => {
      const b = document.getElementById('fb' + i);
      if (b) b.style.background = i <= score ? COLORES[score] : '#CACACC';
    });
    if (label) { label.textContent = LABELS[score]; label.style.color = COLORES[score]; }
    const grpPass = document.getElementById('grpPassword');
    if (grpPass && (grpPass.classList.contains('invalido') || grpPass.classList.contains('valido'))) {
      validarCampo && validarCampo('password');
    }
    const conf = document.getElementById('confirmar');
    if (conf && conf.value) validarCampo && validarCampo('confirmar');
  });
})();

// Recuperar contraseña — barra de fuerza
(function () {
  const inp = document.getElementById('passNueva');
  if (!inp) return;
  const colores  = ['#FF0000','#FF6B00','#FFD800','#00B333'];
  const etiquetas = ['Muy débil','Débil','Aceptable','Fuerte'];
  inp.addEventListener('input', () => {
    const val   = inp.value;
    const nivel = Math.max(1, calcularFuerza(val));
    for (let i = 0; i < 4; i++) {
      const b = document.getElementById('bar' + (i+1));
      if (b) b.style.background = i < nivel ? colores[nivel-1] : '';
    }
    const lbl = document.getElementById('fuerzaLabel');
    if (lbl) { lbl.textContent = val ? etiquetas[nivel-1] : ''; lbl.style.color = val ? colores[nivel-1] : '#94a3b8'; }
  });
})();

/* ═══════════════════════════════════════════
   4. INICIO DE SESIÓN
   Solo inicio_sesion.html
═══════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('btnLogin');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const alerta = document.getElementById('alertaSesion');
    const num    = document.getElementById('numDoc').value.trim();
    const pass   = document.getElementById('passInput').value;
    if (!num || !pass) {
      alerta.textContent = 'Por favor completa todos los campos.';
      alerta.style.display = 'block';
    } else {
      alerta.style.display = 'none';
      /* ── Aquí conecta tu lógica de autenticación (fetch/POST) ── */
    }
  });
})();

/* ═══════════════════════════════════════════
   5. CREAR CUENTA — VALIDACIONES
   Solo crear_cuenta.html
═══════════════════════════════════════════ */
(function () {
  const form = document.getElementById('registroForm');
  if (!form) return;

  const REGLAS = {
    nombre:    { re: /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/ },
    apellido:  { re: /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/ },
    email:     { re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    tipoDoc:   { custom: v => v !== '' },
    numDoc:    { re: /^\d{6,15}$/ },
    telefono:  { re: /^3\d{9}$/ },
    password:  { custom: v => v.length >= 8 },
    confirmar: { custom: v => v.length > 0 && v === document.getElementById('password').value },
  };

  function validarCampo(campo) {
    const input = document.getElementById(campo);
    const cap   = campo.charAt(0).toUpperCase() + campo.slice(1);
    const grp   = document.getElementById('grp' + cap);
    const err   = document.getElementById('err' + cap);
    const ok    = document.getElementById('ok'  + cap);
    if (!input || !grp) return true;

    const val   = input.value.trim ? input.value.trim() : input.value;
    const regla = REGLAS[campo];
    const esValido = regla.re ? regla.re.test(val) : regla.custom(input.value);

    grp.classList.toggle('valido',   esValido);
    grp.classList.toggle('invalido', !esValido);
    if (err) err.classList.toggle('visible', !esValido);
    if (ok)  ok.classList.toggle('visible',   esValido);
    return esValido;
  }

  // Exponer para uso del módulo de fuerza
  window.validarCampo = validarCampo;

  // Filtro solo letras en nombre/apellido
  ['nombre','apellido'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', function () {
      this.value = this.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    });
  });

  // Filtro solo números en numDoc y telefono
  ['numDoc','telefono'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
    });
  });

  // Validar en blur y en input si ya tocado
  Object.keys(REGLAS).forEach(campo => {
    const el = document.getElementById(campo);
    if (!el) return;
    el.addEventListener('blur', () => validarCampo(campo));
    el.addEventListener('input', function () {
      const cap = campo.charAt(0).toUpperCase() + campo.slice(1);
      const grp = document.getElementById('grp' + cap);
      if (grp && (grp.classList.contains('valido') || grp.classList.contains('invalido'))) {
        validarCampo(campo);
      }
    });
  });

  // Revalidar confirmar si cambia contraseña
  const passEl = document.getElementById('password');
  if (passEl) passEl.addEventListener('input', () => {
    const grpConf = document.getElementById('grpConfirmar');
    if (grpConf && (grpConf.classList.contains('valido') || grpConf.classList.contains('invalido'))) {
      validarCampo('confirmar');
    }
  });

  // Envío del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let todoValido = true;
    Object.keys(REGLAS).forEach(c => { if (!validarCampo(c)) todoValido = false; });

    const alerta    = document.getElementById('alertaGeneral');
    const alertaTxt = document.getElementById('alertaTexto');

    if (!todoValido) {
      if (alertaTxt) alertaTxt.textContent = 'Por favor corrige los campos marcados en rojo antes de continuar.';
      if (alerta) alerta.classList.add('visible');
      const primerError = document.querySelector('.input-group.invalido input, .input-group.invalido select');
      if (primerError) primerError.focus();
      return;
    }

    if (alerta) alerta.classList.remove('visible');

    /* ── Aquí iría el fetch/POST al servidor ── */

    // Mostrar pantalla de éxito
    const formSection  = document.getElementById('formSection');
    const exitoSection = document.getElementById('exitoSection');
    if (formSection)  formSection.style.display  = 'none';
    if (exitoSection) exitoSection.style.display = 'block';
  });
})();

/* ═══════════════════════════════════════════
   6. RECUPERAR CONTRASEÑA — FLUJO DE PASOS
   Solo recuperar_contraseña.html
═══════════════════════════════════════════ */
(function () {
  if (!document.getElementById('btnBuscar')) return;

  /* ── Helpers ── */
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  function mostrarAlerta(id, msg, tipo = 'error') {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'alert alert-' + tipo;
    el.textContent = msg;
    el.style.display = 'block';
  }
  function ocultarAlerta(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }
  function setLoading(btn, on) {
    btn.disabled = on;
    btn.classList.toggle('cargando', on);
  }

  /* ── Navegación de pasos ── */
  let pasoActual = 1;

  function irAPaso(n) {
    document.getElementById('panel' + pasoActual).classList.remove('activo');
    document.getElementById('paso'  + pasoActual).classList.remove('activo');
    if (n > pasoActual) {
      document.getElementById('paso' + pasoActual).classList.add('completado');
      const circ = document.querySelector('#paso' + pasoActual + ' .paso-circulo');
      if (circ) circ.innerHTML = `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="3" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`;
    }
    if (pasoActual <= 2) {
      const linea = document.getElementById('linea' + pasoActual);
      if (linea) linea.classList.toggle('completada', n > pasoActual);
    }
    pasoActual = n;
    document.getElementById('panel' + pasoActual).classList.add('activo');
    document.getElementById('paso'  + pasoActual).classList.add('activo');
    document.getElementById('paso'  + pasoActual).classList.remove('completado');
  }

  /* ══════════════════════════════════════════
     PANEL 1 – Buscar cuenta
  ══════════════════════════════════════════ */
  document.getElementById('btnBuscar').addEventListener('click', async () => {
    ocultarAlerta('alerta1');
    const tipo = document.getElementById('tipoDoc').value;
    const num  = document.getElementById('numDoc').value.trim();

    if (!tipo) {
      mostrarAlerta('alerta1', 'Por favor selecciona el tipo de documento.');
      return;
    }
    if (!num || !/^\d{5,12}$/.test(num)) {
      mostrarAlerta('alerta1', 'Ingresa un número de documento válido (solo números).');
      document.getElementById('wrapDoc').classList.add('error-field');
      return;
    }
    document.getElementById('wrapDoc').classList.remove('error-field');

    const btn = document.getElementById('btnBuscar');
    setLoading(btn, true);
    await delay(1400);
    setLoading(btn, false);

    /* ── Conecta tu lógica real aquí ──
       Si el documento no existe:
         mostrarAlerta('alerta1', 'No encontramos una cuenta con ese documento.');
         return;
    */

    const descOTP = document.getElementById('descOTP');
    if (descOTP) descOTP.textContent = 'Ingresa el código de 6 dígitos enviado al correo asociado a tu cuenta.';

    iniciarCuentaRegresiva();
    irAPaso(2);
    const otp0 = document.getElementById('otp0');
    if (otp0) otp0.focus();
  });

  /* ══════════════════════════════════════════
     PANEL 2 – Código OTP
  ══════════════════════════════════════════ */
  const otpInputs = Array.from(document.querySelectorAll('.otp-input'));

  otpInputs.forEach((inp, i) => {
    inp.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      inp.value = val;
      inp.classList.toggle('lleno', val !== '');
      if (val && i < otpInputs.length - 1) otpInputs[i + 1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && i > 0) {
        otpInputs[i - 1].focus();
        otpInputs[i - 1].value = '';
        otpInputs[i - 1].classList.remove('lleno');
      }
    });
    inp.addEventListener('paste', (e) => {
      e.preventDefault();
      const txt = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      txt.split('').slice(0, 6).forEach((ch, j) => {
        if (otpInputs[j]) { otpInputs[j].value = ch; otpInputs[j].classList.add('lleno'); }
      });
      otpInputs[Math.min(txt.length, 5)].focus();
    });
  });

  /* Cuenta regresiva */
  let timerReenvio;
  function iniciarCuentaRegresiva(segundos = 60) {
    clearInterval(timerReenvio);
    const btn  = document.getElementById('btnReenviar');
    const span = document.getElementById('cuentaRegresiva');
    if (!btn || !span) return;
    btn.disabled = true;
    let s = segundos;
    span.textContent = s;
    timerReenvio = setInterval(() => {
      s--;
      span.textContent = s;
      if (s <= 0) {
        clearInterval(timerReenvio);
        btn.disabled = false;
        btn.textContent = 'Reenviar código';
      }
    }, 1000);
  }

  document.getElementById('btnReenviar').addEventListener('click', async () => {
    const btn = document.getElementById('btnReenviar');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    await delay(1000);
    mostrarAlerta('alerta2', 'Código reenviado correctamente.', 'success');
    setTimeout(() => ocultarAlerta('alerta2'), 3000);
    btn.innerHTML = 'Reenviar (<span id="cuentaRegresiva">60</span>s)';
    iniciarCuentaRegresiva();
  });

  document.getElementById('btnVerificar').addEventListener('click', async () => {
    ocultarAlerta('alerta2');
    const codigo = otpInputs.map(i => i.value).join('');
    if (codigo.length < 6) {
      mostrarAlerta('alerta2', 'Ingresa el código completo de 6 dígitos.');
      otpInputs.forEach(i => { if (!i.value) i.classList.add('error'); });
      return;
    }
    const btn = document.getElementById('btnVerificar');
    setLoading(btn, true);
    await delay(1300);
    setLoading(btn, false);

    /* ── Conecta tu validación real aquí ──
       Si código incorrecto:
         otpInputs.forEach(i => { i.classList.add('error'); i.value=''; i.classList.remove('lleno'); });
         setTimeout(() => { otpInputs.forEach(i => i.classList.remove('error')); otpInputs[0].focus(); }, 400);
         mostrarAlerta('alerta2', 'Código incorrecto. Verifica e intenta de nuevo.');
         return;
    */

    irAPaso(3);
    const passNueva = document.getElementById('passNueva');
    if (passNueva) passNueva.focus();
  });

  const volverP1 = document.getElementById('volverP1');
  if (volverP1) volverP1.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(timerReenvio);
    // Limpiar campos OTP
    otpInputs.forEach(i => { i.value = ''; i.classList.remove('lleno', 'error'); });
    ocultarAlerta('alerta2');

    // Resetear visualmente paso 2 al estado inicial (sin completado, sin activo)
    const paso2El = document.getElementById('paso2');
    const circ2   = document.querySelector('#paso2 .paso-circulo');
    if (paso2El) paso2El.classList.remove('activo', 'completado');
    if (circ2)   circ2.textContent = '2';

    // Resetear línea 1
    const linea1El = document.getElementById('linea1');
    if (linea1El) linea1El.classList.remove('completada');

    // Resetear paso 1 al estado inicial para que irAPaso(1) lo active correctamente
    const paso1El = document.getElementById('paso1');
    const circ1   = document.querySelector('#paso1 .paso-circulo');
    if (paso1El) paso1El.classList.remove('completado');
    if (circ1)   circ1.textContent = '1';

    // Necesario: pasoActual apunta a 2, irAPaso quitará activo del panel2 y activará panel1
    pasoActual = 2;
    irAPaso(1);
  });

  /* ══════════════════════════════════════════
     PANEL 3 – Nueva contraseña
  ══════════════════════════════════════════ */
  document.getElementById('btnGuardar').addEventListener('click', async () => {
    ocultarAlerta('alerta3');
    const p1 = document.getElementById('passNueva').value;
    const p2 = document.getElementById('passConfirm').value;
    const wrap1 = document.getElementById('wrapPass1');
    const wrap2 = document.getElementById('wrapPass2');

    if (p1.length < 8) {
      mostrarAlerta('alerta3', 'La contraseña debe tener al menos 8 caracteres.');
      if (wrap1) wrap1.classList.add('error-field');
      return;
    }
    if (wrap1) wrap1.classList.remove('error-field');

    if (p1 !== p2) {
      mostrarAlerta('alerta3', 'Las contraseñas no coinciden. Verifica e intenta de nuevo.');
      if (wrap2) wrap2.classList.add('error-field');
      document.getElementById('passConfirm').value = '';
      document.getElementById('passConfirm').focus();
      return;
    }
    if (wrap2) wrap2.classList.remove('error-field');

    const btn = document.getElementById('btnGuardar');
    setLoading(btn, true);
    await delay(1500);
    setLoading(btn, false);

    /* ── Aquí llama tu API para guardar la contraseña ── */

    irAPaso(4);
    const pasosEl = document.getElementById('pasos');
    if (pasosEl) pasosEl.style.display = 'none';
  });
})();