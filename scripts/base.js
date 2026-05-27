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
            'herramientas_c_n.html':   'herramientas_c_n',
        };
        const activo = mapa[pagina];
        document.querySelectorAll('.sidebar li').forEach(li => {
            li.classList.remove('active');
            if (activo && li.textContent.trim().toLowerCase().includes(activo)) {
                li.classList.add('active');
            }
        });

        const plantilla = document.getElementById("page-content");
        if (plantilla) {
            document
                .getElementById("contenido")
                .appendChild(plantilla.content.cloneNode(true));
        }

    } catch (error) {
        console.error("Error cargando base:", error);
    }
});