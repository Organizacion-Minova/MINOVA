<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MINOVA - Crear Cuenta</title>
<link rel="stylesheet" href="../styles/base.css">
<link rel="stylesheet" href="../styles/componentes.css">
<link rel="stylesheet" href="../styles/estilos_inicio_sesion.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>



<div class="bg-carrusel">
  <div class="slide activo" data-label="Malacate">
    <img src="../img/malacateareal.jpeg" alt="Malacate">
  </div>
  <div class="slide" data-label="Banda Transportadora">
    <img src="../img/bandatransportadora.jpeg" alt="Banda Transportadora">
  </div>
  <div class="slide" data-label="Corte de Material">
    <img src="../img/corte.jpeg" alt="Corte de Material">
  </div>
  <div class="slide" data-label="Electrobomba">
    <img src="../img/electrobomba.jpg" alt="Electrobomba">
  </div>
  <div class="slide" data-label="Vagoneta">
    <img src="../img/vagoneta.jpg" alt="Vagoneta">
  </div>
  <div class="slide" data-label="Ventilador Axial">
    <img src="../img/ventiladoraxial.jpeg" alt="Ventilador Axial">
  </div>
</div>


<div class="modal-overlay">
  <div class="modal">


    <div class="modal-logos">
      <img class="logo-sena" src="../img/logo-sena-blanco.png" alt="SENA">
      <div class="sep-logo"></div>
      <img class="logo-minova" src="../img/Minova-logo.png" alt="MINOVA">
    </div>

  
    <div id="formSection">

      <div class="tabs">
        <span class="tab-titulo">Crear cuenta</span>
      </div>

      <p class="aviso-obligatorio">
        Los campos marcados con <span style="color:var(--rojo);font-weight:600">*</span> son obligatorios.
      </p>

   
      <div id="alertaGeneral" class="alert alert-error" role="alert">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;flex-shrink:0;margin-top:1px" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span id="alertaTexto"></span>
      </div>

      <form id="registroForm" novalidate>

    
        <div class="form-row">
       
          <div class="campo">
            <label for="nombre">Nombre <span class="req">*</span></label>
            <div class="input-group" id="grpNombre">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="nombre" name="nombre" placeholder="Ej: Juan" maxlength="50" autocomplete="given-name">
              <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="msg-error" id="errNombre">Solo letras, mínimo 2 caracteres.</span>
          </div>

         
          <div class="campo">
            <label for="apellido">Apellido <span class="req">*</span></label>
            <div class="input-group" id="grpApellido">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="apellido" name="apellido" placeholder="Ej: García" maxlength="50" autocomplete="family-name">
              <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="msg-error" id="errApellido">Solo letras, mínimo 2 caracteres.</span>
          </div>
        </div>

      
        <div class="campo">
          <label for="email">Correo electrónico <span class="req">*</span></label>
          <div class="input-group" id="grpEmail">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" maxlength="150" autocomplete="email">
            <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="msg-error" id="errEmail">Ingresa un correo válido (ej: usuario@gmail.com).</span>
        </div>

       
        <div class="form-row">
         
          <div class="campo">
            <label for="tipoDoc">Tipo de documento <span class="req">*</span></label>
            <div class="input-group" id="grpTipoDoc">
              <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <select id="tipoDoc" name="tipoDoc">
                <option value="">Selecciona</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PP">Pasaporte</option>
                <option value="CE">Cédula de Extranjería</option>
              </select>
            </div>
            <span class="msg-error" id="errTipoDoc">Selecciona un tipo de documento.</span>
          </div>

         
          <div class="campo">
            <label for="numDoc">No. de documento <span class="req">*</span></label>
            <div class="input-group" id="grpNumDoc">
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <input type="text" id="numDoc" name="numDoc" placeholder="Solo números" inputmode="numeric" maxlength="15">
              <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="msg-error" id="errNumDoc">Entre 6 y 15 dígitos numéricos.</span>
          </div>
        </div>

       
        <div class="campo">
          <label for="telefono">Teléfono / Celular <span class="req">*</span></label>
          <div class="input-group" id="grpTelefono">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
            <input type="tel" id="telefono" name="telefono" placeholder="Ej: 3001234567" inputmode="numeric" maxlength="10">
            <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="msg-error" id="errTelefono">Número de 10 dígitos que empiece en 3.</span>
        </div>

     
        <div class="campo">
          <label for="password">Contraseña <span class="req">*</span></label>
          <div class="input-group" id="grpPassword">
            <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <input type="password" id="password" name="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password">
            <button type="button" class="btn-ver" id="btnVerPass1" title="Mostrar/ocultar contraseña">
              <svg id="icoPass1" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
          <div class="fuerza-wrap" id="fuerzaWrap" style="display:none">
            <div class="fuerza-barras">
              <div class="fuerza-barra" id="fb1"></div>
              <div class="fuerza-barra" id="fb2"></div>
              <div class="fuerza-barra" id="fb3"></div>
              <div class="fuerza-barra" id="fb4"></div>
            </div>
            <div class="fuerza-label" id="fuerzaLabel"></div>
          </div>
          <span class="msg-error" id="errPassword">La contraseña debe tener al menos 8 caracteres.</span>
        </div>

       
        <div class="campo">
          <label for="confirmar">Confirmar contraseña <span class="req">*</span></label>
          <div class="input-group" id="grpConfirmar">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <input type="password" id="confirmar" name="confirmar" placeholder="Repite tu contraseña" autocomplete="new-password">
            <button type="button" class="btn-ver" id="btnVerPass2" title="Mostrar/ocultar contraseña">
              <svg id="icoPass2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <svg class="icono-ok" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="msg-error" id="errConfirmar">Las contraseñas no coinciden.</span>
          <span class="msg-ok"    id="okConfirmar">Las contraseñas coinciden.</span>
        </div>

        
     
        <button type="submit" class="btn-accion">
          <svg viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
          Crear mi cuenta
        </button>

      </form>

       <div class="links-footer">
        <span>¿No recuerdas tu contraseña? <a href="olvido_contraseña.html">Restablecer</a></span>
        <span>¿Ya tienes cuenta? <a href="Iniciar_sesion.html">Iniciar sesión</a></span>
        <a href="index.html">Ir al inicio</a>
      </div>


    </div>

   
    <div id="exitoSection" style="display:none">
      <div class="exito-wrap">
        <div class="exito-icono">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2>¡Cuenta creada!</h2>
        <p>Tu cuenta ha sido registrada exitosamente.<br>Ya puedes iniciar sesión.</p>
        <button class="btn-azul" onclick="window.location.href='Iniciar_sesion.html'">
          Ir a iniciar sesión
        </button>
      </div>
    </div>

  
    <div class="modal-bottom">
      <span class="copy-text">© 2026 MINOVA. Todos los derechos reservados.</span>
      <a href="ayuda.html" class="btn-ayuda">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        Ayudas y manuales
      </a>
    </div>

  </div>
</div>

<script src="../scripts/scripts_inicio_sesion.js"></script>
</body>
</html>