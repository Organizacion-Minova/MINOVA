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
            'inventario.html':     'inventario',
            'mantenimientos.html': 'mantenimientos',
            'reportes.html':       'reportes',
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