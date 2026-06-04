/* =========================================================
   HELPER
========================================================= */

function getPregunta(el) {
    return el.closest(".question");
}

/* =========================================================
   AGREGAR PREGUNTA
========================================================= */

function agregarPregunta() {

    let div = document.createElement("div");

    div.className = "question";

    div.innerHTML = `
        <div class="question-top">

            <div class="question-title">

                <input type="text"
                       placeholder="Escribe tu pregunta">

            </div>
            <select onchange="cambiarTipo(this)">
                <option value="texto">Respuesta corta</option>
                <option value="parrafo">Párrafo</option>
                <option value="unica">Opción única</option>
                <option value="checkbox">Casillas múltiples</option>
                <option value="imagen">Subir imagen</option>
                <option value="archivo">Subir archivo</option>
                <option value="fecha">Fecha</option>
                <option value="hora">Hora</option>
                <option value="numero">Número</option>
                <option value="correo">Correo electrónico</option>
            </select>
        </div>
        <div class="contenido"></div>

        <div style="margin-top:20px;">

            <label style="
                display:flex;
                align-items:center;
                gap:10px;
            ">

                <input type="checkbox"
                       onchange="toggleObservacion(this)">

                Agregar observación

            </label>

        </div>

        <!-- OBSERVACION -->

        <div class="observaciones"
             style="display:none;">

            <textarea rows="4"
                      placeholder="Escribe observaciones aquí..."></textarea>

        </div>

        <div style="margin-top:20px;">

            <button class="btn-azul"
                    onclick="eliminarPregunta(this)">
                Eliminar
            </button>

        </div>

    `;

    document.getElementById("preguntas").appendChild(div);

    cambiarTipo(div.querySelector("select"));
}

/* =========================================================
   CAMBIAR TIPO DE PREGUNTA
========================================================= */

function cambiarTipo(select) {

    let pregunta  = getPregunta(select);
    let contenido = pregunta.querySelector(".contenido");
    let tipo      = select.value;

    /* ================= TEXTO ================= */

    if (tipo === "texto") {

        contenido.innerHTML = `
            <div class="line"></div>
        `;
    }

    /* ================= PARRAFO ================= */

    else if (tipo === "parrafo") {

        contenido.innerHTML = `
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        `;
    }

    /* ================= OPCIONES ================= */

    else if (tipo === "unica" || tipo === "checkbox") {

        contenido.innerHTML = `
            <div class="options">
                <div class="option">
                    <input type="text" placeholder="Opción 1">
                </div>
                <div class="option">
                    <input type="text" placeholder="Opción 2">
                </div>
                <button class="btn-azul"
                        type="button"
                        onclick="agregarOpcion(this)">
                    + Agregar opción
                </button>
            </div>
        `;
    }

    /* ================= IMAGEN ================= */

    else if (tipo === "imagen") {

        contenido.innerHTML = `
            <br><input type="file" accept="image/*" disabled>
        `;
    }

    /* ================= ARCHIVO ================= */

    else if (tipo === "archivo") {

        contenido.innerHTML = `
            <br><input type="file" disabled>
        `;
    }

    /* ================= FECHA ================= */

    else if (tipo === "fecha") {

        contenido.innerHTML = `
            <br><input type="date" disabled>
        `;
    }

    /* ================= HORA ================= */

    else if (tipo === "hora") {

        contenido.innerHTML = `
            <br><input type="time" disabled>
        `;
    }

    /* ================= NUMERO ================= */

    else if (tipo === "numero") {

        contenido.innerHTML = `
            <br><input type="number" placeholder="Número" disabled>
        `;
    }

    /* ================= CORREO ================= */

    else if (tipo === "correo") {

        contenido.innerHTML = `
            <br><input type="email" placeholder="Correo electrónico" disabled>
        `;
    }

    /* ================= ESCALA ================= */


}

/* =========================================================
   AGREGAR OPCION
========================================================= */

function agregarOpcion(btn) {

    let options  = btn.parentElement;
    let cantidad = options.querySelectorAll(".option").length + 1;
    let option   = document.createElement("div");

    option.className = "option";

    option.innerHTML = `
        <input type="text" placeholder="Opción ${cantidad}">
    `;

    options.insertBefore(option, btn);
}

function eliminarPregunta(btn) {

    getPregunta(btn).remove();
}

function toggleObservacion(check) {

    let observacion = getPregunta(check).querySelector(".observaciones");

    observacion.style.display = check.checked ? "block" : "none";
}

function mostrarPreview() {

    let preview     = document.getElementById("preview");
    let titulo      = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;

    preview.innerHTML = "";

    preview.innerHTML += `
        <div class="preview-card">
            <h1>${titulo}</h1>
            <p>${descripcion}</p>
        </div>
    `;

    let preguntas = document.querySelectorAll(".question");
    let qIndex    = 0;

    preguntas.forEach(function(q) {

        qIndex++;

        let texto = q.querySelector(".question-title input").value;
        let tipo  = q.querySelector("select").value;

        let observacionBox = q.querySelector(".observaciones");
        let observacion    = "";

        if (observacionBox.style.display !== "none") {
            observacion = observacionBox.querySelector("textarea").value.trim();
        }

        let html = `
            <div class="preview-card">
                <div class="preview-question">
                    <p>${texto}</p>
        `;

        /* ================= TEXTO ================= */

        if (tipo === "texto") {

            html += `<div class="line"></div>`;
        }

        /* ================= PARRAFO ================= */

        else if (tipo === "parrafo") {

            html += `
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            `;
        }

        /* ================= OPCIONES ================= */

        else if (tipo === "unica" || tipo === "checkbox") {

            let inputType = tipo === "checkbox" ? "checkbox" : "radio";
            let name      = tipo === "unica"    ? `name="q${qIndex}"` : "";

            q.querySelectorAll(".option input").forEach(function(op) {

                html += `
                    <div class="preview-option">
                        <input type="${inputType}" ${name}>
                        ${op.value}
                    </div>
                `;
            });
        }

        /* ================= IMAGEN ================= */

        else if (tipo === "imagen") {

            html += `<br><input type="file" accept="image/*">`;
        }

        /* ================= ARCHIVO ================= */

        else if (tipo === "archivo") {

            html += `<input type="file">`;
        }

        /* ================= FECHA ================= */

        else if (tipo === "fecha") {

            html += `<input type="date">`;
        }

        /* ================= HORA ================= */

        else if (tipo === "hora") {

            html += `<input type="time">`;
        }

        /* ================= NUMERO ================= */

        else if (tipo === "numero") {

            html += `<input type="number" placeholder="Número">`;
        }

        /* ================= CORREO ================= */

        else if (tipo === "correo") {

            html += `<input type="email" placeholder="Correo electrónico">`;
        }


        /* ================= OBSERVACIONES ================= */

        if (observacion !== "") {

            html += `
                <div class="preview-observacion">
                    <label>Observaciones</label>
                    <textarea rows="4">${observacion}</textarea>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        preview.innerHTML += html;
    });
}

agregarPregunta();