document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../html/base.html");
        const html = await response.text();

        document.getElementById("base-container").innerHTML = html;

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