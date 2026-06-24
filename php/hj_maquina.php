<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoja de vida <span id='maquina'></span></title>
    <link rel="stylesheet" href="../styles/base.css">
    <link rel="stylesheet" href="../styles/hj_maquina.css">
    <link rel="stylesheet" href="../styles/componentes.css">
    <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="../scripts/base.js" defer></script>
</head>
<body> 
    <div id="base-container"></div>
    <template id="page-content">
        <div class="grid-contenedor">
            <div class="welcome">
                <div>
                    <h1>Electrobomba</h1>
                    <p>Hoja de vida de la maquina</p>
                    <!-- <div class="date">
                        <i class="fa-regular fa-calendar"></i>
                        <span id="fechaActual"></span>
                    </div> -->
                </div>
            </div>
    
            
            <div class="cont-img">
                    <img src="../img/electrobomba.jpg" alt="Electromba imagen">
            </div>
            <main class="seccion1">
                    <!-- <ul class="lista-sencilla"> -->
                        <li><strong>NOMBRE:</strong> <span id="eb_nombre">Electrobomba</span></li>
                        <li><strong>CÓDIGO PROGRAMA:</strong> <span id="eb_codigoPrograma">PT2-EL01</span></li>
                        <li><strong>MARCA:</strong> <span id="eb_marca">IHM</span></li>
                        <li><strong>MODELO:</strong> <span id="eb_modelo">2015</span></li>
                        <li><strong>GARANTIA:</strong> <span id="eb_garantia">12 meses</span></li>
                        <li><strong>USO:</strong> <span id="eb_uso">Desagüe de la mina</span></li>
                        <li><strong>OPERADO POR:</strong> <span id="eb_operador">Técnicos mina</span></li>
                    <!-- </ul> -->
            </main>

            <main class="seccion2">        
                <!-- <ul class="lista-dos-columnas"> -->
                    <li><strong>EMPRESA:</strong> <span id="eb_empresaPrincipal">Sena Centro Minero</span></li>
                    <li><strong>PROCESO:</strong> <span id="eb_proceso">Mantenimiento</span></li>
                    <li><strong>LUGAR DE TRABAJO:</strong> <span id="eb_lugarTrabajo">Pozo túnel 2</span></li>
                    <li><strong>UBICACIÓN:</strong> <span id="eb_ubicacionGeneral">Sena Centro Minero - Morca</span></li>
                    <li><strong>CIUDAD:</strong> <span id="eb_ciudad">Sogamoso</span></li>
                    <li><strong>FECHA:</strong> <span id="eb_fecha">05/05/2022</span></li>
                    <li><strong>EQUIPO EN OPERACIÓN:</strong> <span id="eb_equipoOperacion">Sí</span></li>
            </main>
            <main class="seccion3">
                    <li><strong>TIPO DE OPERACIÓN:</strong> <span id="eb_tipoOperacion">Desagüe</span></li>
                    <li><strong>RESPONSABLE:</strong> <span id="eb_responsable">Jefe de mina</span></li>
                    <li><strong>SERIAL:</strong> <span id="eb_serial">7239900H1</span></li>
                    <li><strong>OBSERVACIONES:</strong> <span id="eb_observaciones">Electrobomba con motor protegido de 15 HP</span></li>
                    <li><strong>MANOMETRÍA TOTAL:</strong> <span id="eb_manometria">60 m</span></li>
                    <li><strong>CAUDAL:</strong> <span id="eb_caudal">40 m³/h</span></li>
                    <li><strong>CARACTERÍSTICAS:</strong> <span id="eb_caracteristicas">Antiexplosivo, trifásico, 3600 RPM, 220/440 V, 60 Hz</span></li>
                <!-- </ul> -->
            </main>
            <div class="btn-container">
                <button class="btn-azul"><i class="fas fa-home"></i> Uso diario</button>
                <button class="btn-azul"><i class="fas fa-cog"></i> Pre operacional</button>
                <a href="agregar_inspeccion.html"><button class="btn-azul"><i class="fas fa-search"></i> Inspeccion</button></a>
            </div>
        </div>
    </template>
</body>
</html>