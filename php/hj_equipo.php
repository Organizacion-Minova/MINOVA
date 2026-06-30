<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoja de vida <span id='maquina'></span></title>
    <link rel="stylesheet" href="../styles/base.css">
    <link rel="stylesheet" href="../styles/componentes.css">
    <link rel="stylesheet" href="../styles/estilos_index.css">
    <link rel="icon" type="image/png" href="../img/logo-minova.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="../scripts/base.js" defer></script>
</head>
<body> 
    <div id="base-container"></div>
    <template id="page-content">
        <div class="grid-contenedor-4">
            <div class="welcome">
                <div>
                    <h1><span id="equipo">EQUIPO DE SOLDADURA</span></h1>
                    <p>Hoja de vida del equipo</p>
                </div>
                <div class="date">
                <i class="fa-regular fa-calendar"></i>
                <span id="fechaActual"></span>
                </div>
            </div>
            <section class="cards">
                <div class="card">
                    <div class="cont-img">
                            <img src="../img/electrobomba.jpg" alt="Electromba imagen">
                    </div>
                </div>
            
                <div class="card" style="list-style: none;font-size: 1.25rem;"> 
                    <li><strong>NOMBRE:</strong> <span id="eb_nombre">Electrobomba</span></li>
                    <li><strong>CÓDIGO PROGRAMA:</strong> <span id="eb_codigoPrograma">PT2-EL01</span></li>
                    <li><strong>MARCA:</strong> <span id="eb_marca">IHM</span></li>
                    <li><strong>MODELO:</strong> <span id="eb_modelo">2015</span></li>
                    <li><strong>GARANTIA:</strong> <span id="eb_garantia">12 meses</span></li>
                    <li><strong>USO:</strong> <span id="eb_uso">Desagüe de la mina</span></li>
                    <li><strong>OPERADO POR:</strong> <span id="eb_operador">Técnicos mina</span></li>
                    <li><strong>EMPRESA:</strong> <span id="eb_empresaPrincipal">Sena Centro Minero</span></li>
                </main>
            </section>
            <section class="middle">
                <div class="btn-container" >
                    <button class="btn-azul"><i class="fas fa-wind"></i> Medición gases</button>
                    <button class="btn-azul"><i class="fas fa-calendar-alt"></i> Calibración</button>
                    <button class="btn-azul"><i class="fas fa-stethoscope"></i> Diagnóstico</button>
                </div>
            </section>
        
    </div>

</body>
</html>