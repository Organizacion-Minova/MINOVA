document.addEventListener("DOMContentLoaded", async () => {

    try {
        // Cache-busting: fuerza descarga fresca de base.html en cada carga
        const response = await fetch("../php/base.php?v=" + Date.now());
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();

        document.getElementById("base-container").innerHTML = html;

        // ─────────────────────────────
        // MARCAR ITEM ACTIVO SIDEBAR
        // ─────────────────────────────
        const pagina = window.location.pathname.split('/').pop();


        const mapa = {
            'index.php': 'inicio',
            'equipos.php': 'equipos',
            'reportes.php': 'reportes',
            'uso_diario.php': 'uso diario',
            'usuarios.php': 'usuarios',
            'ubicaciones.php': 'ubicaciones',
            'maquinas.php': 'maquinas',
            'herramientas_con.php': 'herramientas_consumibles',
            'acerca_de.php': 'acerca de',
            'ayuda.php': 'ayuda'
        };

        const activo = mapa[pagina];

        document.querySelectorAll('.sidebar li').forEach(li => {

            li.classList.remove('active');

            if (activo && li.textContent.trim().toLowerCase().includes(activo)) {
                li.classList.add('active');
            }

        });

        // ─────────────────────────────
        // INSERTAR CONTENIDO DE PÁGINA
        // ─────────────────────────────
        const plantilla = document.getElementById("page-content");

        if (plantilla) {

            document
                .getElementById("contenido")
                .appendChild(plantilla.content.cloneNode(true));

            // MOSTRAR FECHA DESPUÉS DE INSERTAR HTML
            mostrarFechaActual();

        }

        // Asignar eventos DESPUÉS de que todo el HTML esté en el DOM
        _iniciarEventos();

        // Disparar evento para que otros scripts sepan que el contenido ya está listo
        document.dispatchEvent(new Event("baseLoaded"));

    } catch (error) {

        console.error("Error cargando base:", error);

    }

});


function _iniciarEventos() {

    // ── Notificaciones y perfil ──
    const btnCampana = document.getElementById('btnCampana');
    const btnPerfil = document.getElementById('btnPerfil');

    if (btnCampana) {

        btnCampana.addEventListener('click', () => {

            toggleOverlay('overlayAlertas', 'overlayPerfil');

        });

   }
   if (btnPerfil) {

    btnPerfil.addEventListener('click', () => {

        toggleOverlay('overlayPerfil', 'overlayAlertas');

    });

  }

    // Listener ESC — función nombrada para evitar duplicados si _iniciarEventos se re-invoca
    document.removeEventListener('keydown', _onEsc);
    document.addEventListener('keydown', _onEsc);

    // ── Modal genérico ──
    const overlay       = document.getElementById("overlay");
    const abrirModal    = document.getElementById("abrirModal");
    const cerrarModal   = document.getElementById("cerrarModal");
    const backdropModal = document.getElementById("backdropModal");

    if (overlay && abrirModal) {

        abrirModal.addEventListener("click", () => {

            overlay.classList.add("open");

            if (backdropModal) {

                backdropModal.classList.add("active");

            }

        });

    }
    if (overlay && cerrarModal) {
        cerrarModal.addEventListener("click", () => {
            overlay.classList.remove("open");
            if (backdropModal) backdropModal.classList.remove("active");
        });
    }
    if (overlay && backdropModal) {

        backdropModal.addEventListener("click", () => {

            overlay.classList.remove("open");
            backdropModal.classList.remove("active");
        });

    }

    // ── Sidebar toggle ──
    const btnSidebar = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("contenido");
    if (btnSidebar && sidebar) {
        btnSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("cerrado");
            btnSidebar.classList.toggle("cerrado");
            main.classList.toggle("cerrado");
        });
    }


    // ── Menú desplegable ──
    document.querySelectorAll(".menu-titulo").forEach(menu => {
        menu.addEventListener("click", function () {
            this.parentElement.classList.toggle("activo");
        });
    });

    // ── Re-escanear iconos Font Awesome tras inyección dinámica ──
    if (window.FontAwesome) FontAwesome.dom.i2svg();
}


function _onEsc(e) {
    if (e.key === 'Escape') cerrarTodos();
}

function toggleOverlay(idAbrir, idCerrar) {

    const abrir = document.getElementById(idAbrir);
    const cerrar = document.getElementById(idCerrar);
    const backdrop = document.getElementById('backdrop');

    if (!abrir || !cerrar || !backdrop) return;

    const yaAbierto = abrir.classList.contains('open');

    cerrar.classList.remove('open');

    if (yaAbierto) {

        abrir.classList.remove('open');
        backdrop.classList.remove('active');

    } else {

        abrir.classList.add('open');
        backdrop.classList.add('active');

    }

}

/* ─────────────────────────────────────────
   CERRAR TODOS LOS OVERLAYS
───────────────────────────────────────── */
function cerrarTodos() {

    const overlayAlertas = document.getElementById('overlayAlertas');
    const overlayPerfil = document.getElementById('overlayPerfil');
    const backdrop = document.getElementById('backdrop');

    if (overlayAlertas) {
        overlayAlertas.classList.remove('open');
    }

    if (overlayPerfil) {
        overlayPerfil.classList.remove('open');
    }

    if (backdrop) {
        backdrop.classList.remove('active');
    }

}

function marcarTodas() {

    document.querySelectorAll('.alert-row.unread').forEach(r => {

        r.classList.remove('unread');

    });

    const badge = document.getElementById('bellBadge');

    if (badge) {

        badge.style.display = 'none';

    }

}
function irPerfil() {
    window.location.href = 'perfil.php';
    cerrarTodos();

}

function irSuperadmin() {
    window.location.href = 'superadmin.php';
    cerrarTodos();

}

function cerrarSesion() {

    if (confirm('¿Deseas cerrar sesión?')) {
        window.location.href = '../php/Iniciar_sesion.php';
    }

}

function mostrarFechaActual() {

    const fecha = new Date();

    const opciones = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    };
    
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    const elementoFecha = document.getElementById('fechaActual');

    if (elementoFecha) {

        elementoFecha.textContent = fechaFormateada;

    }

}
function toggleFaq(item) {
            item.classList.toggle('open');
        }