document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("../html/base.html");
        const html = await response.text();

        document.getElementById("base-container").innerHTML = html;

        // ─────────────────────────────
        // MARCAR ITEM ACTIVO SIDEBAR
        // ─────────────────────────────
        const pagina = window.location.pathname.split('/').pop();


        const mapa = {
            'index.html': 'inicio',
            'equipos.html': 'equipos',
            'reportes.html': 'reportes',
            'uso_diario.html': 'uso diario',
            'usuarios.html': 'usuarios',
            'ubicaciones.html': 'ubicaciones',
            'maquinas.html': 'maquinas',
            'herramientas_con.html': 'herramientas_consumibles',
            'acerca_de.html': 'acerca de',
            'ayuda.html': 'ayuda'
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

        // ─────────────────────────────
        // INICIAR EVENTOS
        // ─────────────────────────────
        iniciarEventos();

        // ─────────────────────────────
        // BOTÓN SIDEBAR
        // ─────────────────────────────
        const btnSidebar = document.getElementById("toggleSidebar");
        const sidebar = document.querySelector(".sidebar");

        if (btnSidebar && sidebar) {

            btnSidebar.addEventListener("click", () => {

                sidebar.classList.toggle("cerrado");

            });

        }

        // ─────────────────────────────
        // MENÚ DESPLEGABLE
        // ─────────────────────────────
        document.querySelectorAll(".menu-titulo").forEach(menu => {

            menu.addEventListener("click", function () {

                this.parentElement.classList.toggle("activo");

            });

        });

        // ─────────────────────────────
        // EVENTO PERSONALIZADO
        // ─────────────────────────────
        document.dispatchEvent(new Event("baseLoaded"));

    } catch (error) {

        console.error("Error cargando base:", error);

    }

});

/* ─────────────────────────────────────────
   INICIAR EVENTOS
───────────────────────────────────────── */
function iniciarEventos() {

    // ─────────────────────────────
    // BOTONES NOTIFICACIONES Y PERFIL
    // ─────────────────────────────
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

    // ─────────────────────────────
    // CERRAR CON ESC
    // ─────────────────────────────
    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            cerrarTodos();

        }

    });

    // ─────────────────────────────
    // MODAL PRINCIPAL
    // ─────────────────────────────
    const overlay = document.getElementById("overlay");
    const abrirModal = document.getElementById("abrirModal");
    const cerrarModal = document.getElementById("cerrarModal");
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

            if (backdropModal) {

                backdropModal.classList.remove("active");

            }

        });

    }

    // ─────────────────────────────
    // CERRAR MODAL AL DAR CLICK FUERA
    // ─────────────────────────────
    if (overlay && backdropModal) {

        backdropModal.addEventListener("click", () => {

            overlay.classList.remove("open");
            backdropModal.classList.remove("active");

        });

    }

}

/* ─────────────────────────────────────────
   TOGGLE OVERLAYS
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   MARCAR ALERTAS COMO LEÍDAS
───────────────────────────────────────── */
function marcarTodas() {

    document.querySelectorAll('.alert-row.unread').forEach(r => {

        r.classList.remove('unread');

    });

    const badge = document.getElementById('bellBadge');

    if (badge) {

        badge.style.display = 'none';

    }

}

/* ─────────────────────────────────────────
   FUNCIONES DE NAVEGACIÓN
───────────────────────────────────────── */
function irAlertas() {

    alert('Navegando a la página de Alertas...');
    cerrarTodos();

}

function irPerfil() {

    alert('Navegando a Mi Perfil...');
    cerrarTodos();

}

function irSuperadmin() {

    alert('Navegando al Panel Superadmin...');
    cerrarTodos();

}

function cerrarSesion() {

    if (confirm('¿Deseas cerrar sesión?')) {

        alert('Cerrando sesión...');

    }

}

/* ─────────────────────────────────────────
   MOSTRAR FECHA ACTUAL
───────────────────────────────────────── */
function mostrarFechaActual() {

    const fecha = new Date();

    const opciones = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    const elementoFecha = document.getElementById('fechaActual');

    if (elementoFecha) {

        elementoFecha.textContent = fechaFormateada;

    }

}