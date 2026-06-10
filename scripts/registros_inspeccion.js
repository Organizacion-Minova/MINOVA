document.addEventListener("baseLoaded", function () {
    mostrarRegistrosPagina();
});

let formularioActual = null;

function obtenerParametroUrl(nombre) {
    let params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

function mostrarRegistrosPagina() {
    let formId = obtenerParametroUrl("formulario");
    let wrap   = document.getElementById("tabla-registros-wrap");
    let titulo = document.getElementById("titulo-formulario");

    if (!wrap) return;

    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    let historial = JSON.parse(localStorage.getItem("respuestasInspecciones") || "[]");
    let form = guardados.find(f => String(f.id) === String(formId));

    if (!formId || !form) {
        titulo.textContent = "Formulario no seleccionado";
        wrap.innerHTML = `<div class="tabla-vacia">
                            <i class="fa-solid fa-table"></i>
                            <p>No se encontró el formulario seleccionado. Vuelve a la página anterior y elige uno.</p>
                          </div>`;
        return;
    }
    formularioActual = form;

    let registros = historial.filter(r => String(r.formularioId) === String(form.id));

    let btnExportar = document.getElementById("btnExportarExcel");
    if (btnExportar) {
        btnExportar.style.display = registros.length > 0 ? "block" : "none";
    }

    if (registros.length === 0) {
        wrap.innerHTML = `<div class="tabla-vacia">
                            <i class="fa-solid fa-table"></i>
                            <p>Aún no hay registros guardados para este formulario.</p>
                          </div>`;
        return;
    }

    let html = `
        <div class="welcome">
            <h2><i class="fa-solid fa-table-list"></i> Registros guardados</h2>
        </div>
    `;

    registros.forEach(function(reg, ridx) {
        let fijas    = reg.respuestas.filter(r => r.esColumna === true);
        let normales = reg.respuestas.filter(r => r.esColumna !== true);

        html += `<br>`;
        
        html += `<table>`;
        html += `<tr>`;
        fijas.forEach(function(f) {
            html += `<th>${f.pregunta}</th>`;
        });
        html += `<th>Fecha de llenado</th></tr>`;
        html += `<tr>`;
        fijas.forEach(function(f) {
            html += `<td>${f.respuesta || "—"}</td>`;
        });
        html += `<td>${reg.fecha}</td></tr>`;
        html += `</table>`;

        if (normales.length > 0) {
            let tieneObs = normales.some(r => r.observacion && r.observacion.trim() !== "");
            html += `<table>
                        <thead>
                            <tr>
                                <th>PREGUNTA</th>
                                <th>RESPUESTA</th>
                                ${tieneObs ? `<th>OBSERVACIÓN</th>` : ""}
                            </tr>
                        </thead>
                        <tbody>`;
            normales.forEach(function(r) {
                html += `<tr>
                            <td>${r.pregunta}</td>
                            <td>${r.respuesta || "—"}</td>
                            ${tieneObs ? `<td>${r.observacion || ""}</td>` : ""}
                         </tr>`;
            });
            html += `</tbody></table>`;
        }
        html += `<br>`;
        html += `<div class="inspeccion-bloque">`;
        html += `<button class="btn-azul" type="button"  onclick="exportarRegistroCompleto(${ridx})">`;
        html += `<i class="fa-solid fa-file-excel"></i> Exp. registro completo</button>`;
        html += `</div>`;

        html += `</div>`;
        if (ridx < registros.length - 1) {
            html += `<div class="registro-separador"></div>`;
        }
    });

    wrap.innerHTML = html;
}

function exportarExcel() {
    if (!formularioActual) {
        alert("No hay formulario seleccionado.");
        return;
    }

    let guardados = JSON.parse(localStorage.getItem("inspeccionesGuardadas") || "[]");
    let historial = JSON.parse(localStorage.getItem("respuestasInspecciones") || "[]");
    let registros = historial.filter(r => String(r.formularioId) === String(formularioActual.id));

    if (registros.length === 0) {
        alert("No hay registros para exportar.");
        return;
    }

    if (typeof XLSX === "undefined") {
        alert("✗ SheetJS no está cargado. Verifica el script en el HTML.");
        return;
    }

    let primerRegistro = registros[0].respuestas;
    let colsFijas      = primerRegistro.filter(r => r.esColumna === true);
    let tieneObs       = registros.some(reg =>
                            reg.respuestas.some(r => r.esColumna !== true && r.observacion && r.observacion.trim() !== "")
                         );

    let AZUL_HEADER = "FF1976D2";
    let VERDE_TH    = "FFC6EFCE";
    let VERDE_FG    = "FF1A3A1A";
    let BLANCO      = "FFFFFFFF";
    let GRIS_PAR    = "FFF5F9FF";
    let AZUL_VAL    = "FF1565C0";

    let alineC = { horizontal: "center", vertical: "center" };
    let alineL = { horizontal: "left",   vertical: "center" };

    function celda(v, bold, bg, fg, alin) {
        return {
            v: v, t: "s",
            s: {
                font:      { bold: !!bold, color: { rgb: fg || "FF000000" } },
                fill:      { fgColor: { rgb: bg || BLANCO } },
                alignment: alin || alineL,
                border: {
                    top:    { style: "thin", color: { rgb: "FF1976D2" } },
                    bottom: { style: "thin", color: { rgb: "FF1976D2" } },
                    left:   { style: "thin", color: { rgb: "FF1976D2" } },
                    right:  { style: "thin", color: { rgb: "FF1976D2" } }
                }
            }
        };
    }

    let ws   = {};
    let fila = 0;

    function ref(c, r) { return XLSX.utils.encode_cell({ c, r }); }

    let maxCol = 0;

    registros.forEach(function(reg) {
        let fijas    = reg.respuestas.filter(r => r.esColumna === true);
        let normales = reg.respuestas.filter(r => r.esColumna !== true);

        let labelsRow = [...fijas.map(f => f.pregunta), "Fecha de llenado"];
        labelsRow.forEach(function(lbl, ci) {
            ws[ref(ci, fila)] = celda(lbl, true, VERDE_TH, VERDE_FG, alineC);
        });
        maxCol = Math.max(maxCol, labelsRow.length - 1);
        fila++;

        let valsRow = [...fijas.map(f => f.respuesta || "—"), reg.fecha];
        valsRow.forEach(function(val, ci) {
            ws[ref(ci, fila)] = celda(val, false, BLANCO, "FF000000", alineC);
        });
        fila++;

        fila++;

        if (normales.length > 0) {
            let nCols = tieneObs ? 3 : 2;
            maxCol = Math.max(maxCol, nCols - 1);

            let heads = tieneObs ? ["PREGUNTA", "RESPUESTA", "OBSERVACIÓN"] : ["PREGUNTA", "RESPUESTA"];
            heads.forEach(function(h, ci) {
                ws[ref(ci, fila)] = celda(h, true, AZUL_HEADER, BLANCO, alineC);
            });
            fila++;

            normales.forEach(function(r, ri) {
                let bg = (ri % 2 === 1) ? GRIS_PAR : BLANCO;
                ws[ref(0, fila)] = celda(r.pregunta,         false, bg,    "FF000000", alineL);
                ws[ref(1, fila)] = celda(r.respuesta || "—", true,  bg,    AZUL_VAL,  alineC);
                if (tieneObs) {
                    ws[ref(2, fila)] = celda(r.observacion || "", false, bg, "FF555555", alineL);
                }
                fila++;
            });
        }

        fila += 2;
    });

    ws["!ref"] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: maxCol, r: fila - 1 } });
    ws["!cols"] = [
        { wch: 45 },
        { wch: 25 },
        { wch: 35 },
    ];

    let wb = XLSX.utils.book_new();
    let nombreHoja    = formularioActual.titulo ? formularioActual.titulo.substring(0, 31) : "Registros";
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

    let nombreArchivo = `MINOVA_${formularioActual.titulo ? formularioActual.titulo : "registros"}_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
}

function exportarTablaIndividual(indexRegistro, tipo) {
    let historial = JSON.parse(localStorage.getItem("respuestasInspecciones") || "[]");
    let registros = historial.filter(r => String(r.formularioId) === String(formularioActual.id));
    let reg = registros[indexRegistro];

    if (!reg) {
        alert("No se encontró el registro.");
        return;
    }

    if (typeof XLSX === "undefined") {
        alert("✗ SheetJS no está cargado.");
        return;
    }

    let AZUL_HEADER = "FF1976D2";
    let VERDE_TH    = "FFC6EFCE";
    let VERDE_FG    = "FF1A3A1A";
    let BLANCO      = "FFFFFFFF";
    let GRIS_PAR    = "FFF5F9FF";
    let AZUL_VAL    = "FF1565C0";

    let alineC = { horizontal: "center", vertical: "center" };
    let alineL = { horizontal: "left",   vertical: "center" };

    function celda(v, bold, bg, fg, alin) {
        return {
            v: v, t: "s",
            s: {
                font:      { bold: !!bold, color: { rgb: fg || "FF000000" } },
                fill:      { fgColor: { rgb: bg || BLANCO } },
                alignment: alin || alineL,
                border: {
                    top:    { style: "thin", color: { rgb: "FF1976D2" } },
                    bottom: { style: "thin", color: { rgb: "FF1976D2" } },
                    left:   { style: "thin", color: { rgb: "FF1976D2" } },
                    right:  { style: "thin", color: { rgb: "FF1976D2" } }
                }
            }
        };
    }

    let ws = {};
    let fila = 0;

    function ref(c, r) { return XLSX.utils.encode_cell({ c, r }); }

    if (tipo === "fijas") {
        let fijas = reg.respuestas.filter(r => r.esColumna === true);
        let labelsRow = [...fijas.map(f => f.pregunta), "Fecha de llenado"];
        
        labelsRow.forEach(function(lbl, ci) {
            ws[ref(ci, fila)] = celda(lbl, true, VERDE_TH, VERDE_FG, alineC);
        });
        fila++;

        let valsRow = [...fijas.map(f => f.respuesta || "—"), reg.fecha];
        valsRow.forEach(function(val, ci) {
            ws[ref(ci, fila)] = celda(val, false, BLANCO, "FF000000", alineC);
        });

        ws["!ref"] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: labelsRow.length - 1, r: 1 } });
        ws["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }];

    } else if (tipo === "normales") {
        let normales = reg.respuestas.filter(r => r.esColumna !== true);
        if (normales.length === 0) {
            alert("No hay preguntas en este registro.");
            return;
        }

        let tieneObs = normales.some(r => r.observacion && r.observacion.trim() !== "");
        let heads = tieneObs ? ["PREGUNTA", "RESPUESTA", "OBSERVACIÓN"] : ["PREGUNTA", "RESPUESTA"];
        
        heads.forEach(function(h, ci) {
            ws[ref(ci, fila)] = celda(h, true, AZUL_HEADER, BLANCO, alineC);
        });
        fila++;

        normales.forEach(function(r, ri) {
            let bg = (ri % 2 === 1) ? GRIS_PAR : BLANCO;
            ws[ref(0, fila)] = celda(r.pregunta, false, bg, "FF000000", alineL);
            ws[ref(1, fila)] = celda(r.respuesta || "—", true, bg, AZUL_VAL, alineC);
            if (tieneObs) {
                ws[ref(2, fila)] = celda(r.observacion || "", false, bg, "FF555555", alineL);
            }
            fila++;
        });

        ws["!ref"] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: (tieneObs ? 2 : 1), r: fila - 1 } });
        ws["!cols"] = [{ wch: 45 }, { wch: 25 }, { wch: 35 }];
    }

    let wb = XLSX.utils.book_new();
    let nombreHoja = tipo === "fijas" ? "Datos fijos" : "Preguntas";
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

    let nombreArchivo = `MINOVA_${formularioActual.titulo || "registros"}_${tipo}_(Registro ${indexRegistro + 1})_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
}

function exportarRegistroCompleto(indexRegistro) {
    let historial = JSON.parse(localStorage.getItem("respuestasInspecciones") || "[]");
    let registros = historial.filter(r => String(r.formularioId) === String(formularioActual.id));
    let reg = registros[indexRegistro];

    if (!reg) {
        alert("No se encontró el registro.");
        return;
    }

    if (typeof XLSX === "undefined") {
        alert("✗ SheetJS no está cargado.");
        return;
    }

    let AZUL_HEADER = "FF1976D2";
    let VERDE_TH    = "FFC6EFCE";
    let VERDE_FG    = "FF1A3A1A";
    let BLANCO      = "FFFFFFFF";
    let GRIS_PAR    = "FFF5F9FF";
    let AZUL_VAL    = "FF1565C0";

    let alineC = { horizontal: "center", vertical: "center" };
    let alineL = { horizontal: "left",   vertical: "center" };

    function celda(v, bold, bg, fg, alin) {
        return {
            v: v, t: "s",
            s: {
                font:      { bold: !!bold, color: { rgb: fg || "FF000000" } },
                fill:      { fgColor: { rgb: bg || BLANCO } },
                alignment: alin || alineL,
                border: {
                    top:    { style: "thin", color: { rgb: "FF1976D2" } },
                    bottom: { style: "thin", color: { rgb: "FF1976D2" } },
                    left:   { style: "thin", color: { rgb: "FF1976D2" } },
                    right:  { style: "thin", color: { rgb: "FF1976D2" } }
                }
            }
        };
    }

    let ws   = {};
    let fila = 0;

    function ref(c, r) { return XLSX.utils.encode_cell({ c, r }); }

    let fijas    = reg.respuestas.filter(r => r.esColumna === true);
    let normales = reg.respuestas.filter(r => r.esColumna !== true);
    let maxCol = 0;

    let labelsRow = [...fijas.map(f => f.pregunta), "Fecha de llenado"];
    labelsRow.forEach(function(lbl, ci) {
        ws[ref(ci, fila)] = celda(lbl, true, VERDE_TH, VERDE_FG, alineC);
    });
    maxCol = Math.max(maxCol, labelsRow.length - 1);
    fila++;

    let valsRow = [...fijas.map(f => f.respuesta || "—"), reg.fecha];
    valsRow.forEach(function(val, ci) {
        ws[ref(ci, fila)] = celda(val, false, BLANCO, "FF000000", alineC);
    });
    fila++;

    fila++;

    if (normales.length > 0) {
        let tieneObs = normales.some(r => r.observacion && r.observacion.trim() !== "");
        let nCols = tieneObs ? 3 : 2;
        maxCol = Math.max(maxCol, nCols - 1);

        let heads = tieneObs ? ["PREGUNTA", "RESPUESTA", "OBSERVACIÓN"] : ["PREGUNTA", "RESPUESTA"];
        heads.forEach(function(h, ci) {
            ws[ref(ci, fila)] = celda(h, true, AZUL_HEADER, BLANCO, alineC);
        });
        fila++;

        normales.forEach(function(r, ri) {
            let bg = (ri % 2 === 1) ? GRIS_PAR : BLANCO;
            ws[ref(0, fila)] = celda(r.pregunta, false, bg, "FF000000", alineL);
            ws[ref(1, fila)] = celda(r.respuesta || "—", true, bg, AZUL_VAL, alineC);
            if (tieneObs) {
                ws[ref(2, fila)] = celda(r.observacion || "", false, bg, "FF555555", alineL);
            }
            fila++;
        });
    }

    ws["!ref"] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: maxCol, r: fila - 1 } });
    ws["!cols"] = [{ wch: 45 }, { wch: 25 }, { wch: 35 }];

    let wb = XLSX.utils.book_new();
    let nombreHoja = "Completo";
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

    let nombreArchivo = `MINOVA_${formularioActual.titulo || "registros"}_Completo_(Registro ${indexRegistro + 1})_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
}
