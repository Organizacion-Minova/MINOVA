<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MINOVA - INICIO</title>
    <link rel="stylesheet" href="../styles/base.css">
    <link rel="stylesheet" href="../styles/estilos_index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../styles/componentes.css">
    <link rel="icon" type="image/png" href="../img/logo-minova.png">
</head>
<body>

    <div id="base-container"></div>

    <template id="page-content">
        <div class="grid-contenedor">
            <div class="welcome">
                <div>
                    <h1>¡Bienvenido, Juan Pérez!</h1>
                    <p>Este es el resumen general del sistema.</p>
                </div>
                <div class="date">
                    <i class="fa-regular fa-calendar"></i>
                    <span id="fechaActual"></span>
                </div>
            </div>

         <!-- TARJETAS -->
            <section class="cards">
            
                <div class="card">
                    <div class="icon blue">
                        <i class="fa-solid fa-truck-monster"></i>
                    </div>
                
                    <h2>58</h2>
                    <p>Total máquinas</p>
                
                    <a href="#">Ver detalle →</a>
                </div>
            
                <div class="card">
                    <div class="icon blue">
                        <i class="fa-solid fa-wrench"></i>
                    </div>
                
                    <h2>12</h2>
                    <p>Mantenimientos pendientes</p>
                
                    <a href="#">Ver detalle →</a>
                </div>
            
                <div class="card">
                    <div class="icon blue">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                
                    <h2>46</h2>
                    <p>Equipos activos</p>
                
                    <a href="#">Ver detalle →</a>
                </div>
            
                <div class="card">
                    <div class="icon blue">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                
                    <h2>5</h2>
                    <p>Alertas críticas</p>
                
                    <a href="#">Ver detalle →</a>
                </div>
            
            </section>
        
            <!-- SECCION CENTRAL -->
            <section class="middle">
            
                <div class="panel">
                    <div class="panel-title">
                        <h3>Últimos mantenimientos</h3>
                        <a href="#">Ver todos</a>
                    </div>
                
                    <div class="maintenance">
                    
                        <div class="item">
                            <img src="https://picsum.photos/70?1" alt="">
                            <div>
                                <h4>Excavadora CAT 323D</h4>
                                <p>Mantenimiento preventivo</p>
                            </div>
                            <span class="status complete">Completado</span>
                        </div>
                    
                        <div class="item">
                            <img src="https://picsum.photos/70?2" alt="">
                            <div>
                                <h4>Retroexcavadora JCB 3CX</h4>
                                <p>Mantenimiento correctivo</p>
                            </div>
                            <span class="status process">En proceso</span>
                        </div>
                    
                        <div class="item">
                            <img src="https://picsum.photos/70?3" alt="">
                            <div>
                                <h4>Cargador CAT 950H</h4>
                                <p>Mantenimiento preventivo</p>
                            </div>
                            <span class="status complete">Completado</span>
                        </div>
                    
                    </div>
                </div>
            
                <div class="panel">
                
                    <div class="panel-title">
                        <h3>Equipos por estado</h3>
                    </div>
                
                    <div class="chart-container">
                        <div class="chart"></div>
                    
                        <div class="legend">
                            <p><span class="green-dot"></span> Activos 46</p>
                            <p><span class="yellow-dot"></span> Mantenimiento 6</p>
                            <p><span class="blue-dot"></span> Fuera servicio 4</p>
                            <p><span class="red-dot"></span> Inactivos 2</p>
                        </div>
                    </div>
                
                </div>
            </section>
        
            <!-- ALERTAS -->
            <section class="alerts panel">
            
                <div class="panel-title">
                    <h3>Alertas recientes</h3>
                    <a href="alertas.html">Ver todas</a>
                </div>
            
                <div class="alert-item">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Presión de aceite baja en Excavadora CAT 323D
                </div>
            
                <div class="alert-item">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Vencimiento próximo de mantenimiento
                </div>
            
                <div class="alert-item">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Stock bajo de filtros de aceite
                </div>
            
            </section>
        </div>
        
    </template>
    <script src="../scripts/busqueda.js"></script>
    <script src="../scripts/base.js"></script>
</body>
</html>