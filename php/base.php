<div class="grid-base">   
     <link rel="icon" type="image/png" href="../img/Minova - logo1.png">
    <header class="topbar">
        <div class="izquierda">
            <div class="menu-contenedor">
                <div id="toggleSidebar">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="logo">
                <img src="../img/Minova - logo1.png" alt="MINOVA">
            </div>
        </div>
        <div class="centro">
            <h2>SISTEMA DE MANTENIMIENTO E INVENTARIO</h2>
        </div>
        
        <nav class="derecha">
            <button class="bell-btn" id="btnCampana" title="Alertas">
                <i class="fa-solid fa-bell"></i>
                <span class="bell-badge" id="bellBadge">5</span>
            </button>

                <!-- OVERLAY ALERTAS -->
            <div class="overlay-panel" id="overlayAlertas">
                <div class="alerts-header">
                    <h3>
                        <i class="fa-solid fa-bell"></i>
                        Alertas del sistema
                    </h3>
                    <button class="mark-all" onclick="marcarTodas()">
                        Marcar todas como leídas
                    </button>
                </div>
                <div class="alerts-footer">
                    <button class="btn-azul" >
                        <a href="alertas.php" >
                        <i class="fa-solid fa-triangle-exclamation"></i> Alertas</a>
                    </button>
                </div>
            </div>
                <!-- OVERLAY PERFIL -->
            <div class="overlay-panel" id="overlayPerfil">
                <div class="perfil-header">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnLesNChl-l86u_LACs0pBkjqaot3ramr_A&s" 
                        alt="Perfil"
                        class="perfil-avatar"
                    >
                    <h3>PAPOI</h3>
                    <span>Superadministrador</span>
                </div>
                <div class="perfil-info">
                    <p>
                        <i class="fa-solid fa-envelope"></i>
                        papoi@gmail.com
                    </p>
                </div>
                <div class="perfil-actions">
                    <!-- <button 
                        class="btn-azul"
                         onclick="irPerfil()" -->
                         <a href="perfil.php" class="btn-azul">
                         <i class="fa-solid fa-user"></i>
                         Ver mi perfil
                         </a>
                    <!-- <button 
                        class="btn-azul"
                        onclick="irSuperadmin()"
                    >
                        <i class="fa-solid fa-shield-halved"></i>
                        Panel Superadmin
                    </button> -->

                   <a href="roles_admin.php" class="btn-azul">
                    <i class="fa-solid fa-shield-halved"></i>
                    panel Superadmin
                   </a>

                </div>
                <div class="perfil-footer">
                    <!-- <button 
                        class="btn-azul"
                        onclick="cerrarSesion()"
                    
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Cerrar sesión
                    </button> -->
                    <a href="iniciar_sesion.php" class="btn-azul">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Cerrar Sesion
                    </a>

                </div>
            </div>
              <div class="overlay-panel" id="overlayAlertas">
                   <div class="alerts-header">
                       <h3><i class="fa-solid fa-bell"></i> Alertas del sistema</h3>
                       <button class="mark-all" onclick="marcarTodas()">Marcar todas como leídas</button>
                   </div>
                   <div class="alerts-footer">
                       <button class="btn-ver-alertas" onclick="irAlertas()">
                           <i class="fa-solid fa-triangle-exclamation"></i> Ver página de alertas
                       </button>
                   </div>
               </div><!-- /overlayAlertas -->
                  <!-- ── BOTÓN PERFIL ── -->
                <button class="profile-btn" id="btnPerfil">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnLesNChl-l86u_LACs0pBkjqaot3ramr_A&s" alt="">
                  <div>
                      <h4>PAPOI</h4>
                      <span class="role-tag">
                          <i class="fa-solid fa-shield-halved"></i> PAPOI
                      </span>
                  </div>
                </button>
                      <!-- OVERLAY PERFIL -->
                <div class="overlay-panel" id="overlayPerfil">
                    <div class="perfil-header">
                    
                    </div>
                    <div class="perfil-info">
                    
                    </div>
                    <div class="perfil-actions">
                        <button class="btn-perfil-action secondary">
                        <li> <a href="perfil.php"> <i class="fa-solid fa-user"></i> Ver mi perfil </a> </li>
                        </button>
                        <button class="btn-perfil-action primary" >
                              <i class="fa-solid fa-shield-halved"></i> Panel Superadmin
                        </button>
                    </div>
                    <div class="perfil-footer">
                        <button class="btn-logout-overlay">
                            <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
                        </button>
                    </div>
                </div><!-- /overlayPerfil -->
                  <!-- Fondo invisible para cerrar al click fuera — fuera del nav, dentro del header -->
                <div class="overlay-backdrop" id="backdrop" onclick="cerrarTodos()"></div>
            </nav>     
        </header>

        <aside class="sidebar" id="sidebar">
            <!-- <nav> -->
                <ul>
                    <li>
                        <a href="index.php">
                            <i class="fa-solid fa-house"></i>
                            <span>Inicio</span>
                        </a>
                    </li>

                    <li class="menu-desplegable">
                        <a class="menu-titulo">
                          
                                <i class="fa-solid fa-screwdriver-wrench"></i>
                                <span>Herramientas</span>
                        </a>

                        <ul class="submenu">
                            <br><li><a href="herramientas_con.php"><i class="fa-solid fa-wrench"></i> <span>Consumibles</span></a></li><br>
                            <li><a href="herramientas_c_n.php"><i class="fa-solid fa-tools"></i> <span>No consumibles</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="equipos.php">
                            <i class="fa-solid fa-gears"></i>
                            <span>Equipos</span> 
                        </a>
                    </li>
                    <li>
                        <a href="maquinas.php">
                            <i class="fa-solid fa-industry"></i>
                            <span>Maquinas</span>
                        </a>
                    </li>
                    <li>
                        <a href="ubicaciones.php">
                            <i class="fa-solid fa-map-marker-alt"></i>
                            <span>Ubicaciones</span>
                        </a>
                    </li>
                    <li>
                        <a href="uso_diario.php">
                            <i class="fa-solid fa-clipboard-check"></i>
                            <span>Diario</span>
                        </a>
                    </li>
  
                    <li>
                        <a href="acerca_de.php">
                            <i class="fa-solid fa-info-circle"></i>
                            <span>Acerca de</span>
                        </a>
                    </li>
                    <li>
                        <a href="ayuda.php">
                            <i class="fa-solid fa-circle-question"></i>
                            <span>Ayuda</span>
                        </a>
                    </li>

                    <li>
                        <a href="Iniciar_sesion.php">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span>Iniciar sesión</span>
                        </a>
                    </li>
                </ul>
        </aside>
                <main id="contenido">
                    
                </main>
        <footer>
            <div class="secFooterPrincipal">
                <img class="logoSenaFooter" src="../img/logo-sena-blanco.png" alt="SENA">
                <img class="logoSmaqFooter" src="../img/Minova - logo2.png" alt="MINOVA">
                <div class="descripcion-logos">
                    <br>Sistema de Mantenimiento y inventariado de elementos Mineros
                    <br> Copyright © 2026. Todos los derechos reservados.
                </div>
            </div>

            <div class="infoFooter">
                <br><strong>CONTACTANOS</strong>
                <br>minovaskls@gmail.com
            </div>
        </footer>
</div>
