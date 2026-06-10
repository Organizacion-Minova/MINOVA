function getPregunta(el) {
    return el.closest(".question");
}
 
function agregarPregunta() {
 
    let div = document.createElement("div");
    div.className = "question";
 
    div.innerHTML = `
        <div class="question-top">
            <div class="question-title">
                <input type="text" placeholder="Escribe tu pregunta">
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
 
        <div class="options-inline">
            <label class="option-inline">
                <input type="checkbox" class="chk-columna">
                Columna fija en tabla
            </label>
            <br>
            <label class="option-inline">
                <input type="checkbox" onchange="toggleObservacion(this)">
                Agregar observación
            </label>
        </div>
 
        <div class="observaciones" style="display:none;">
            <textarea rows="4" placeholder="Escribe observaciones aquí..."></textarea>
        </div>
 
        <div style="margin-top:20px;">
            <button class="btn-azul btn-eliminar" onclick="eliminarPregunta(this)">
                <i class="fa-solid fa-trash"></i> Eliminar
            </button>
        </div>
    `;
 
    document.getElementById("preguntas").appendChild(div);
    cambiarTipo(div.querySelector("select"));
}
  
function cambiarTipo(select) {
 
    let pregunta  = getPregunta(select);
    let contenido = pregunta.querySelector(".contenido");
    let tipo      = select.value;
 
    if (tipo === "texto") {
        contenido.innerHTML = `<div class="line"></div>`;
    }
    else if (tipo === "parrafo") {
        contenido.innerHTML = `
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        `;
    }
    else if (tipo === "unica" || tipo === "checkbox") {
        contenido.innerHTML = `
            <div class="options">
                <div class="option"><input type="text" placeholder="Opción 1"></div>
                <div class="option"><input type="text" placeholder="Opción 2"></div>
                <button class="btn-azul" type="button" onclick="agregarOpcion(this)">
                    + Agregar opción
                </button>
            </div>
        `;
    }
    else if (tipo === "imagen")  { contenido.innerHTML = `<br><input type="file" accept="image/*" disabled>`; }
    else if (tipo === "archivo") { contenido.innerHTML = `<br><input type="file" disabled>`; }
    else if (tipo === "fecha")   { contenido.innerHTML = `<br><input type="date" disabled>`; }
    else if (tipo === "hora")    { contenido.innerHTML = `<br><input type="time" disabled>`; }
    else if (tipo === "numero")  { contenido.innerHTML = `<br><input type="number" placeholder="Número" disabled>`; }
    else if (tipo === "correo")  { contenido.innerHTML = `<br><input type="email" placeholder="Correo electrónico" disabled>`; }
}
 
/* =========================================================
   AGREGAR OPCION
========================================================= */
 
function agregarOpcion(btn) {
    let options  = btn.parentElement;
    let cantidad = options.querySelectorAll(".option").length + 1;
    let option   = document.createElement("div");
    option.className = "option";
    option.innerHTML = `<input type="text" placeholder="Opción ${cantidad}">`;
    options.insertBefore(option, btn);
}
 
/* =========================================================
   ELIMINAR PREGUNTA
========================================================= */
 
function eliminarPregunta(btn) {
    getPregunta(btn).remove();
}
 
/* =========================================================
   TOGGLE OBSERVACION
========================================================= */
 
function toggleObservacion(check) {
    let observacion = getPregunta(check).querySelector(".observaciones");
    observacion.style.display = check.checked ? "block" : "none";
}
 
/* =========================================================
   MOSTRAR PREVIEW
========================================================= */
 
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
 
        let texto    = q.querySelector(".question-title input").value;
        let tipo     = q.querySelector("select").value;
        let esColumna = q.querySelector(".chk-columna").checked;
 
        let observacionBox = q.querySelector(".observaciones");
        let observacion    = "";
        if (observacionBox.style.display !== "none") {
            observacion = observacionBox.querySelector("textarea").value.trim();
        }
 
        let badge = esColumna
            ? `<span class="badge-columna"><i class="fa-solid fa-table-columns"></i> Columna fija</span>`
            : "";
 
        let html = `
            <div class="preview-card">
                <div class="preview-question">
                    <p>${texto} ${badge}</p>
        `;
 
        if (tipo === "texto") {
            html += `<div class="line"></div>`;
        } else if (tipo === "parrafo") {
            html += `<div class="line"></div><div class="line"></div><div class="line"></div>`;
        } else if (tipo === "unica" || tipo === "checkbox") {
            let inputType = tipo === "checkbox" ? "checkbox" : "radio";
            let name      = tipo === "unica" ? `name="q${qIndex}"` : "";
            q.querySelectorAll(".option input").forEach(function(op) {
                html += `<div class="preview-option">
                            <input type="${inputType}" ${name}> ${op.value}
                         </div>`;
            });
        }
        else if (tipo === "imagen")  { html += `<br><input type="file" accept="image/*">`; }
        else if (tipo === "archivo") { html += `<input type="file">`; }
        else if (tipo === "fecha")   { html += `<input type="date">`; }
        else if (tipo === "hora")    { html += `<input type="time">`; }
        else if (tipo === "numero")  { html += `<input type="number" placeholder="Número">`; }
        else if (tipo === "correo")  { html += `<input type="email" placeholder="Correo electrónico">`; }
 
        if (observacion !== "") {
            html += `<div class="preview-observacion">
                        <label>Observaciones</label>
                        <textarea rows="4">${observacion}</textarea>
                     </div>`;
        }
 
        html += `</div></div>`;
        preview.innerHTML += html;
    });
}
 
/* =========================================================
   GUARDAR INSPECCION EN localStorage
========================================================= */
 
function guardarInspeccion() {
 
    let titulo      = document.getElementById("titulo")      ? document.getElementById("titulo").value.trim()      : "";
    let descripcion = document.getElementById("descripcion") ? document.getElementById("descripcion").value.trim() : "";
 
    let preguntasNodes = document.querySelectorAll(".question");
 
    if (preguntasNodes.length === 0) {
        alert("⚠️ Agrega al menos una pregunta antes de guardar.");
        return;
    }
    if (preguntasNodes.length <= 1) {
        alert("⚠️ El formulario debe tener más de una pregunta.");
        return;
    }
 
    let preguntas = [];
 
    preguntasNodes.forEach(function(q) {
 
        let texto     = q.querySelector(".question-title input").value.trim();
        let tipo      = q.querySelector("select").value;
        let esColumna = q.querySelector(".chk-columna").checked;
 
        let opciones = [];
        if (tipo === "unica" || tipo === "checkbox") {
            q.querySelectorAll(".option input").forEach(function(op) {
                if (op.value.trim() !== "") opciones.push(op.value.trim());
            });
        }
 
        let observacion = "";
        let obsBox = q.querySelector(".observaciones");
        if (obsBox && obsBox.style.display !== "none") {
            observacion = obsBox.querySelector("textarea").value.trim();
        }
 
        preguntas.push({ texto, tipo, opciones, observacion, esColumna });
    });
 
    let formulario = {
        id         : Date.now(),
        titulo     : titulo,
        descripcion: descripcion,
        preguntas  : preguntas,
        fecha      : new Date().toLocaleDateString("es-CO", { year:"numeric", month:"long", day:"numeric" })
    };
 
    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    guardados.push(formulario);
    localStorage.setItem("inspeccionesGuardadas", JSON.stringify(guardados));
 
    alert("✅ Formulario guardado correctamente.\n\nYa puedes ir a Llenar Inspección para usarlo.");
}
 
/* =========================================================
   INIT
========================================================= */
 
document.addEventListener("baseLoaded", function () {
    agregarPregunta();
});