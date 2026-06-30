<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MINOVA - MI PERFIL</title>

  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/componentes.css">
  <link rel="stylesheet" href="../styles/estilos_index.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

  <div id="base-container"></div>

  <template id="page-content">
    <div class="grid-contenedor-3">

      <div class="welcome">
        <div>
          <h1>Mi Perfil</h1>
          <p>Información personal y configuración de la cuenta.</p>
        </div>
        <div class="date">
          <i class="fa-regular fa-calendar"></i>
          <span id="fechaActual"></span>
        </div>
      </div>
      <section class="cards">
        <div class="card" style="text-align: center;">
        <br>
        <br>
        <br>
          <div class="avatar-section">
            <div class="avatar-wrap" onclick="document.getElementById('inputFoto').click()">
              <img id="avatarImg" src="https://ui-avatars.com/api/?name=Usuario&background=01044080&color=fff&size=110" alt="Avatar">
              <div class="avatar-overlay">
                <i class="fa-solid fa-camera"></i>
                <span>Cambiar foto</span>
              </div>
            </div>
            <input type="file" id="inputFoto" accept="image/*">
          </div>
          <div class="perfil-nombre-rol">
            <h3 id="nombreCompleto">Nombre Apellido</h3>
            <span class="rol-badge" >
              <i class="fa-solid fa-shield-halved"></i>
              <span id="rolUsuario">Rol</span>
            </span>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
                <div class="icon blue"><i class="fa-solid fa-address-card icono-titulo"></i></div>
                <h3>Información de contacto</h3>
          </div>
          <p>Datos registrados en el sistema.</p>
          <ul class="steps">
            <li><span class="step-num"><i class="fa-solid fa-id-card"></i></span><span>CC ___________</span></li>
            <li><span class="step-num"><i class="fa-regular fa-envelope"></i></span><span>correo@ejemplo.co</span></li>
            <li><span class="step-num"><i class="fa-solid fa-phone"></i></span><span>300 000 0000</span></li>
            <li><span class="step-num"><i class="fa-regular fa-calendar-check"></i></span><span>Miembro desde ___</span></li>
          </ul>

        </section>
        <section class="cards2">
        <div class="card">
          <div class="card-title">
                <div class="icon blue"><i class="fa-solid fa-user icono-titulo"></i></div>
                <h3>Datos personales</h3>
                  <button class="btn-azul" style="margin-left: auto;" id="btnEditarDatos">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                  </button>
          </div>
          <p>Edita tu información personal.</p><br>
          <div class="form" id="formDatos">
            <div class="inputs-row">
              <div class="input-group">
                <label for="inputNombre">Nombre</label>
                <input type="text" id="inputNombre" placeholder="Nombre" disabled>
              </div>
              <div class="input-group">
                <label for="inputApellido">Apellido</label>
                <input type="text" id="inputApellido" placeholder="Apellido" disabled>
              </div>
            </div>

            <div class="inputs-row">
              <div class="input-group">
                <label for="inputTipoDoc">Tipo de documento</label>
                <select id="inputTipoDoc" disabled>
                  <option value="">Selecciona…</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="CE">Cédula de extranjería</option>
                  <option value="PP">Pasaporte</option>
                </select>
              </div>
              <div class="input-group">
                <label for="inputDoc">Número de documento</label>
                <input type="text" id="inputDoc" placeholder="Número de documento" disabled>
              </div>
            </div>

            <div class="inputs-row">
              <div class="input-group">
                <label for="inputCorreo">Correo electrónico</label>
                <input type="email" id="inputCorreo" placeholder="correo@ejemplo.co" disabled>
              </div>
              <div class="input-group">
                <label for="inputTelefono">Teléfono</label>
                <input type="tel" id="inputTelefono" placeholder="300 000 0000" disabled>
              </div>
            </div>

            <div class="input-group">
              <label for="inputDireccion">Dirección</label>
              <input type="text" id="inputDireccion" placeholder="Calle, ciudad" disabled>
            </div>

              <button class="btn-azul" id="btnGuardar">
                <i class="fa-solid fa-floppy-disk"></i> Guardar cambios
              </button>

          </div>
        </div>
      </section>
      <section class="middle">
        <div class="card">
          <div class="card-title"> 
                <div class="icon blue"><i class="fa-solid fa-lock icono-titulo"></i></div>
                <h3>Seguridad</h3>
          </div>
          <p>Contraseña y acceso a la cuenta.</p>
          <div class="seguridad-item">
            <div class="seg-info">
              <div class="seg-icon"><i class="fa-solid fa-key"></i></div>
              <div>
                <div class="seg-label">Contraseña</div>
                <div class="seg-desc">Última actualización: —</div>
              </div>
            </div>
            <button class="btn-azul">
              <i class="fa-solid fa-rotate-right"></i> Cambiar
            </button>
          </div>

          <div class="seguridad-item">
            <div class="seg-info">
              <div class="seg-icon"><i class="fa-solid fa-mobile-screen"></i></div>
              <div>
                <div class="seg-label">Autenticación en dos pasos</div>
                <div class="seg-desc">No configurada</div>
              </div>
            </div>
            <button class="btn-azul">
              <i class="fa-solid fa-plus"></i> Activar
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
                <div class="icon blue"><i class="fa-solid fa-clock-rotate-left icono-titulo"></i></div>
                <h3>Últimos accesos</h3>
          </div>
          <p>Historial reciente de sesiones.</p>

          <div class="historial-wrap">
            <div class="historial-item">
              <span class="historial-fecha">—</span>
              <span class="historial-dispositivo">— · —</span>
            </div>
            <div class="historial-item">
              <span class="historial-fecha">—</span>
              <span class="historial-dispositivo">— · —</span>
            </div>
            <div class="historial-item">
              <span class="historial-fecha">—</span>
              <span class="historial-dispositivo">— · —</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>

  <script src="../scripts/base.js"></script>
  <script src="../scripts/perfil.js"></script>

</body>
</html>