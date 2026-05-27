document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../html/base.html");
        const html = await response.text();

        document.getElementById("base-container").innerHTML = html;

        // Marca el ítem activo según la página actual
        const pagina = window.location.pathname.split('/').pop();
        const mapa = {
            'index.html':          'inicio',
            'equipos.html':        'equipos',
            'reportes.html':       'reportes',
            'uso_diario.html':     'uso diario',
            'usuarios.html':       'usuarios',
            'ubicaciones.html':    'ubicaciones',
            'maquinas.html':      'maquinas',
            'herramientas_con.html':   'herramientas_consumibles',
        };
        const activo = mapa[pagina];
        document.querySelectorAll('.sidebar li').forEach(li => {
            li.classList.remove('active');
            if (activo && li.textContent.trim().toLowerCase().includes(activo)) {
                li.classList.add('active');
            }
        });

        // Insertar el contenido de la plantilla de la página
        const plantilla = document.getElementById("page-content");
        if (plantilla) {
            document
                .getElementById("contenido")
                .appendChild(plantilla.content.cloneNode(true));
        }

        // ── Asignar eventos DESPUÉS de que el HTML base esté en el DOM ──
        _iniciarEventos();

    } catch (error) {
        console.error("Error cargando base:", error);
    }
});

/* ─────────────────────────────────────────
   Asigna todos los listeners una sola vez,
   una vez que el HTML base ya está insertado
───────────────────────────────────────── */
function _iniciarEventos() {
    const btnCampana = document.getElementById('btnCampana');
    const btnPerfil  = document.getElementById('btnPerfil');

    if (btnCampana) {
        btnCampana.addEventListener('click', () => toggleOverlay('overlayAlertas', 'overlayPerfil'));
    }
    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => toggleOverlay('overlayPerfil', 'overlayAlertas'));
    }

    // ESC cierra todo — registrado aquí, no en el nivel superior
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') cerrarTodos();
    });
}

/* ─────────────────────────────────────────
   Funciones globales (llamadas desde el HTML
   con onclick="" en botones internos)
───────────────────────────────────────── */
function toggleOverlay(idAbrir, idCerrar) {
    const abrir    = document.getElementById(idAbrir);
    const cerrar   = document.getElementById(idCerrar);
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

function cerrarTodos() {
    const overlayAlertas = document.getElementById('overlayAlertas');
    const overlayPerfil  = document.getElementById('overlayPerfil');
    const backdrop       = document.getElementById('backdrop');

    if (overlayAlertas) overlayAlertas.classList.remove('open');
    if (overlayPerfil)  overlayPerfil.classList.remove('open');
    if (backdrop)       backdrop.classList.remove('active');
}

function marcarTodas() {
    document.querySelectorAll('.alert-row.unread').forEach(r => r.classList.remove('unread'));
    const badge = document.getElementById('bellBadge');
    if (badge) badge.style.display = 'none';
}

function irAlertas() {
    // window.location.href = 'alertas.html';
    alert('Navegando a la página de Alertas...');
    cerrarTodos();
}

function irPerfil() {
    // window.location.href = 'perfil.html';
    alert('Navegando a Mi Perfil...');
    cerrarTodos();
}

function irSuperadmin() {
    // window.location.href = 'superadmin.html';
    alert('Navegando al Panel Superadmin...');
    cerrarTodos();
}

function cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
        // window.location.href = 'login.html';
        alert('Cerrando sesión...');
    }
}