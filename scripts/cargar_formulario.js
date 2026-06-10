document.addEventListener("baseLoaded", function () {
    poblarSelector();
});

function poblarSelector() {
    let selector  = document.getElementById("selector-formulario");
    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");

    if (!selector) return;

    if (guardados.length === 0) {
        selector.innerHTML = `<option value="">No hay formularios guardados aún</option>`;
        return;
    }

    selector.innerHTML = `<option value="">-- Selecciona un formulario --</option>`;

    guardados.forEach(function(form, index) {
        let opt         = document.createElement("option");
        opt.value       = index;
        opt.textContent = (form.titulo || form.fecha) + (form.titulo ? " — " + form.fecha : "");
        selector.appendChild(opt);
    });

    selector.value = guardados.length - 1;
    cargarFormulario();
}

function cargarFormulario() {
    let selector    = document.getElementById("selector-formulario");
    let contenedor  = document.getElementById("contenedor");
    let btnWrap     = document.getElementById("btn-enviar-wrap");
    let confirmDiv  = document.getElementById("confirmacion");

    confirmDiv.style.display = "none";
    btnWrap.style.display    = "none";
    contenedor.innerHTML     = "";

    let index = selector.value;
    if (index === "" || index === null) {
        contenedor.innerHTML = `<div id="msg-vacio">Selecciona un formulario para comenzar.</div>`;
        return;
    }

    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    let form      = guardados[parseInt(index)];

    if (!form) {
        contenedor.innerHTML = `<div id="msg-vacio">No se encontró el formulario.</div>`;
        return;
    }

    form.preguntas.forEach(function(p) {
        let i    = form.preguntas.indexOf(p);
        let html = buildPreguntaHtml(p, i);
        contenedor.innerHTML += html;
    });

    btnWrap.style.display = "block";
}

function irRegistrosPagina() {
    let selector = document.getElementById("selector-formulario");
    if (!selector) return;

    let index = selector.value;
    if (index === "" || index === null) {
        alert("Selecciona un formulario primero.");
        return;
    }

    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    let form = guardados[parseInt(index, 10)];
    if (!form) {
        alert("No se encontró el formulario seleccionado.");
        return;
    }

    window.location.href = `registros_inspeccion.html?formulario=${encodeURIComponent(form.id)}`;
}


function inputHtml(p, i) {
    let tipo = p.tipo;
    if (tipo === "texto")   return `<input type="text"   data-i="${i}" placeholder="Tu respuesta...">`;
    if (tipo === "numero")  return `<input type="number" data-i="${i}" placeholder="Número...">`;
    if (tipo === "correo")  return `<input type="email"  data-i="${i}" placeholder="ejemplo@gmail.com">`;
    if (tipo === "fecha")   return `<input type="date"   data-i="${i}">`;
    if (tipo === "hora")    return `<input type="time"   data-i="${i}">`;
    if (tipo === "parrafo") return `<textarea rows="3"   data-i="${i}" placeholder="Tu respuesta..."></textarea>`;

    if (tipo === "unica") {
        let html = `<div class="options-inline">`;
        p.opciones.forEach(op => {
            html += `<label class="option-inline">
                        <input type="radio" name="q${i}" value="${op}" data-i="${i}"> ${op}
                     </label>`;
        });
        return html + `</div>`;
    }
    if (tipo === "checkbox") {
        let html = `<div class="options-inline">`;
        p.opciones.forEach(op => {
            html += `<label class="option-inline">
                        <input type="checkbox" value="${op}" data-i="${i}" data-cb="true"> ${op}
                     </label>`;

        });
        return html + `</div>`;
    }
    if (tipo === "imagen")  return `<input type="file" accept="image/*" data-i="${i}">`;
    if (tipo === "archivo") return `<input type="file" data-i="${i}">`;
    return "";
}

function buildPreguntaHtml(p, i) {
    let html = `<div class="question" id="pcard-${i}">
                    <div class="question-top">
                        <div class="question-title">
                            <p>${i + 1}. ${p.texto || "Sin título"}</p>
                        </div>
                    </div>
                    <div class="options">${inputHtml(p, i)}</div>`;

    if (p.observacion) {
        html += `<div class="observaciones">
                    <p><i class="fa-solid fa-note-sticky"></i> Observación:</p>
                    <textarea rows="4" readonly>${p.observacion}</textarea>
                 </div>`;
    }

    html += `</div>`;
    return html;
}

function recolectarValor(p, i) {
    let valor = "";

    if (["texto","parrafo","numero","correo","fecha","hora"].includes(p.tipo)) {
        let el = document.querySelector(`[data-i="${i}"]`);
        valor  = el ? el.value : "";
    }
    else if (p.tipo === "unica") {
        let el = document.querySelector(`input[name="q${i}"]:checked`);
        valor  = el ? el.value : "";
    }
    else if (p.tipo === "checkbox") {
        let checks = document.querySelectorAll(`input[data-cb="true"][data-i="${i}"]:checked`);
        let vals   = [];
        checks.forEach(c => vals.push(c.value));
        valor = vals.join(", ");
    }
    else if (p.tipo === "imagen" || p.tipo === "archivo") {
        let el = document.querySelector(`input[type="file"][data-i="${i}"]`);
        valor  = el && el.files.length > 0 ? el.files[0].name : "Sin archivo";
    }

    return valor;
}

function enviarRespuestas() {
    let selector  = document.getElementById("selector-formulario");
    let index     = selector.value;
    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    let form      = guardados[parseInt(index)];

    if (!form) return;

    let respuestas = [];

    form.preguntas.forEach(function(p, i) {
        respuestas.push({
            pregunta  : p.texto,
            tipo      : p.tipo,
            esColumna : !!p.esColumna,
            respuesta : recolectarValor(p, i)
        });
    });

    let registro = {
        formularioId    : form.id,
        formularioTitulo: form.titulo || form.fecha,
        fecha           : new Date().toLocaleDateString("es-CO", {
                                year:"numeric", month:"long", day:"numeric",
                                hour:"2-digit", minute:"2-digit"
                            }),
        respuestas      : respuestas
    };

    let historial = JSON.parse(localStorage.getItem("respuestasInspecciones") || "[]");
    historial.push(registro);
    localStorage.setItem("respuestasInspecciones", JSON.stringify(historial));

    document.getElementById("btn-enviar-wrap").style.display = "none";
    document.getElementById("confirmacion").style.display    = "block";

    console.log("Respuestas guardadas:", registro);
}
