<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MINOVA - Alertas</title>
    <link rel="stylesheet" href="../styles/base.css ">
    <link rel="stylesheet" href="../styles/estilos_tabla.css">
    <link rel="stylesheet" href="../styles/estilos_index.css">
    <link rel="stylesheet" href="../styles/alertas.css">
    <link rel="stylesheet" href="../styles/componentes.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <div id="base-container"></div>

    <template id="page-content">
      <div class="grid-container">
        <div class="welcome">
            <h1>Alertas</h1>
            <div class="date">
                <i class="fa-regular fa-calendar"></i>
                <span id="fechaActual"></span>
            </div>
        </div>
      <section class="cards">
        <div class="card">
          <div class="icon blue"><i class="fa-solid fa-circle-exclamation"></i></div>
          <h2 id="cntGrave">3</h2>
          <p>Alertas graves</p>
        </div>
        <div class="card">
          <div class="icon blue"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h2 id="cntImportante">5</h2>
          <p>Alertas importantes</p>

        </div>
        <div class="card">
          <div class="icon blue"><i class="fa-solid fa-circle-check"></i></div>
          <h2 id="cntBien">12</h2>
          <p>Equipos sin novedad</p>

        </div>

        <div class="card">
          <div class="icon blue"><i class="fa-solid fa-wind"></i></div>
          <h2>4</h2>
          <p>Sensores de gases activos</p>

        </div>
      </section>
          <div class="search-main">
            <div class="search-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    id="q"
                    placeholder="Buscar por nombre, código, número de serie, marca, ubicación…"
                 />
            </div>
            <button class="btn-buscar" onclick="doSearch()">
                <i class="fa-solid fa-magnifying-glass"></i> Buscar
            </button>
        </div>
        <div id="tablaAlertasWrap">
          <table id="tablaAlertas">
            <thead>
              <tr>
                <th>Nivel</th>
                <th>Equipo</th>
                <th>Descripción</th>
                <th>Hora · Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
          

              <tr data-nivel="grave">
                <td><span class="nivel-badge badge-grave"><i class="fa-solid fa-circle-exclamation"></i> GRAVE</span></td>
                <td >Excavadora CAT 323D</td>
                <td >Falla hidráulica — presión bajo umbral mínimo (80 bar). Riesgo de parada inmediata.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 3 min &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Zona A - Frente 2</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="grave">
                <td><span class="nivel-badge badge-grave"><i class="fa-solid fa-circle-exclamation"></i> GRAVE</span></td>
                <td >Ventilador Axial V-01</td>
                <td >Temperatura crítica — motor a 95°C. Riesgo de daño permanente al bobinado.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 12 min &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Galería 3</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="grave">
                <td><span class="nivel-badge badge-grave"><i class="fa-solid fa-circle-exclamation"></i> GRAVE</span></td>
                <td >Electrobomba EB-03</td>
                <td >CO₂ al 4.2% vol. Supera límite de seguridad (1.5%). Evacuar área.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 20 min &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Sala de bombas</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>


              <tr data-nivel="importante">
                <td><span class="nivel-badge badge-importante"><i class="fa-solid fa-triangle-exclamation"></i> IMPORTANTE</span></td>
                <td >Retroexcavadora JCB 3CX</td>
                <td >Nivel de aceite hidráulico al 18%. Reponer antes del siguiente turno.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 1 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Zona B - Frente 1</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="importante">
                <td><span class="nivel-badge badge-importante"><i class="fa-solid fa-triangle-exclamation"></i> IMPORTANTE</span></td>
                <td >Cargador CAT 950H</td>
                <td >Mantenimiento preventivo vence en 3 días (26/05/2026). Programar con jefe de taller.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 2 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Patio de equipos</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="importante">
                <td><span class="nivel-badge badge-importante"><i class="fa-solid fa-triangle-exclamation"></i> IMPORTANTE</span></td>
                <td >Banda Transportadora BT-02</td>
                <td >Vibración anormal — 8.4 mm/s (umbral: 4.5 mm/s). Posible desalineación.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 3 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Nivel -2</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="importante">
                <td><span class="nivel-badge badge-importante"><i class="fa-solid fa-triangle-exclamation"></i> IMPORTANTE</span></td>
                <td >Malacate MA-01</td>
                <td >Stock bajo de filtros de aceite — solo 2 unidades (mínimo recomendado: 10).</td>
                <td ><i class="fa-regular fa-clock"></i> hace 5 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Almacén central</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i>Escalar</button>
                  </div>
                </td>
              </tr>

              <tr data-nivel="importante">
                <td><span class="nivel-badge badge-importante"><i class="fa-solid fa-triangle-exclamation"></i> IMPORTANTE</span></td>
                <td >Vagoneta VG-04</td>
                <td >Freno de emergencia sin respuesta. Revisar antes de operar.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 6 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Nivel -1</td>
                <td>
                  <div class="alerta-acciones">
                    <button class="btn-atender"><i class="fa-solid fa-check"></i> Atender</button>
                    <button class="btn-escalar"><i class="fa-solid fa-arrow-up"></i> Escalar</button>
                  </div>
                </td>
              </tr>

            
              <tr data-nivel="bien">
                <td><span class="nivel-badge badge-bien"><i class="fa-solid fa-circle-check"></i> BIEN</span></td>
                <td >Banda Transportadora BT-01</td>
                <td >Sin novedades. Parámetros en rango normal. Última revisión hace 2 días.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 2 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Nivel -1</td>
                <td><button class="btn-azul"><i class="fa-solid fa-eye"></i> Ver</button></td>
              </tr>

              <tr data-nivel="bien">
                <td><span class="nivel-badge badge-bien"><i class="fa-solid fa-circle-check"></i> BIEN</span></td>
                <td >Excavadora CAT 320D</td>
                <td >Sin novedades. Operando en parámetros normales. Mantenimiento realizado la semana pasada.</td>
                <td ><i class="fa-regular fa-clock"></i> hace 4 h &nbsp;·&nbsp; <i class="fa-solid fa-location-dot"></i> Zona C</td>
                <td><button class="btn-azul"><i class="fa-solid fa-eye"></i> Ver</button></td>
              </tr>
            </tbody>
          </table>

          <p id="sinResultados" style="display:none; text-align:center; padding:30px; color:var(--texto2);">
            <i class="fa-solid fa-filter" style="font-size:24px;margin-bottom:10px;display:block;opacity:.4"></i>
            No hay alertas para este filtro.
          </p>
        </div>
    </div>

    </template>

    <script src="../scripts/base.js"></script>
    <script src="../scripts/busqueda_maquina.js"></script>
</body>
</html>