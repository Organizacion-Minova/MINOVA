// ============================================================
//  DATOS DE EJEMPLO
// ============================================================
let maquinas = [
  { nombre: "Excavadora Alpha",     codigo: "EQ-001", serie: "SN-10021", tipo: "Excavadora",      marca: "CAT",     ubicacion: "Zona A - Nivel 1", estado: "Activo"            },
  { nombre: "Retroexcavadora Beta", codigo: "EQ-002", serie: "SN-10022", tipo: "Retroexcavadora", marca: "JCB",     ubicacion: "Zona B - Nivel 2", estado: "Mantenimiento"     },
  { nombre: "Cargador Gamma",       codigo: "EQ-003", serie: "SN-10023", tipo: "Cargador",         marca: "Komatsu", ubicacion: "Zona A - Nivel 3", estado: "Activo"            },
  { nombre: "Malacate Delta",       codigo: "EQ-004", serie: "SN-10024", tipo: "Malacate",         marca: "Volvo",   ubicacion: "Zona C - Nivel 1", estado: "Fuera de servicio" },
  { nombre: "Vagoneta Épsilon",     codigo: "EQ-005", serie: "SN-10025", tipo: "Vagoneta",         marca: "CAT",     ubicacion: "Zona B - Nivel 1", estado: "Inactivo"          },
  { nombre: "Pulmón Zeta",          codigo: "EQ-006", serie: "SN-10026", tipo: "Pulmón",           marca: "JCB",     ubicacion: "Zona D - Nivel 2", estado: "Activo"            },
  { nombre: "Excavadora Eta",       codigo: "EQ-007", serie: "SN-10027", tipo: "Excavadora",      marca: "Volvo",   ubicacion: "Zona A - Nivel 2", estado: "Mantenimiento"     },
  { nombre: "Cargador Theta",       codigo: "EQ-008", serie: "SN-10028", tipo: "Cargador",         marca: "Komatsu", ubicacion: "Zona C - Nivel 3", estado: "Activo"            },
];

// ============================================================
//  COLORES DE ESTADO
// ============================================================
const ESTADO_CLASE = {
  "Activo":            "badge-activo",
  "Mantenimiento":     "badge-mantenimiento",
  "Fuera de servicio": "badge-fuera",
  "Inactivo":          "badge-inactivo",
};

// ============================================================
//  RENDERIZAR TABLA
// ============================================================
function renderTabla(lista) {
  const tbody = document.getElementById("resultsBody");
  document.getElementById("rcount").textContent = lista.length;

  if (lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:2rem; color:#888;">
          No se encontraron equipos con los filtros aplicados.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = lista.map((m, i) => `
    <tr>
      <td>${m.nombre}</td>
      <td>${m.codigo}</td>
      <td>${m.serie}</td>
      <td>${m.tipo}</td>
      <td>${m.marca}</td>
      <td>${m.ubicacion}</td>
      <td><span class="badge ${ESTADO_CLASE[m.estado] || ''}">${m.estado}</span></td>
      <td>
        <button class="btn-accion btn-editar" onclick="editarMaquina(${i})" title="Editar">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn-accion btn-eliminar" onclick="eliminarMaquina(${i})" title="Eliminar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// ============================================================
//  BÚSQUEDA Y FILTROS
// ============================================================
function doSearch() {
  const q      = document.getElementById("q").value.trim().toLowerCase();
  const estado = document.getElementById("f-estado").value;
  const tipo   = document.getElementById("f-tipo").value;
  const marca  = document.getElementById("f-marca").value;
  const codigo = document.getElementById("f-codigo").value.trim().toLowerCase();
  const serie  = document.getElementById("f-serie").value.trim().toLowerCase();
  const ubic   = document.getElementById("f-ubic").value.trim().toLowerCase();
  const orden  = document.getElementById("sort").value;

  let resultado = maquinas.filter(m => {
    const texto = [m.nombre, m.codigo, m.serie, m.marca, m.ubicacion].join(" ").toLowerCase();
    if (q      && !texto.includes(q))                        return false;
    if (estado && m.estado    !== estado)                    return false;
    if (tipo   && m.tipo      !== tipo)                      return false;
    if (marca  && m.marca     !== marca)                     return false;
    if (codigo && !m.codigo.toLowerCase().includes(codigo))  return false;
    if (serie  && !m.serie.toLowerCase().includes(serie))    return false;
    if (ubic   && !m.ubicacion.toLowerCase().includes(ubic)) return false;
    return true;
  });

  resultado.sort((a, b) => {
    const campoA = (a[orden] || "").toString().toLowerCase();
    const campoB = (b[orden] || "").toString().toLowerCase();
    return campoA.localeCompare(campoB, "es");
  });

  actualizarChips({ q, estado, tipo, marca, codigo, serie, ubic });
  renderTabla(resultado);
}

// ============================================================
//  CHIPS DE FILTROS ACTIVOS
// ============================================================
function actualizarChips(filtros) {
  const etiquetas = {
    q: "Búsqueda", estado: "Estado", tipo: "Tipo",
    marca: "Marca", codigo: "Código", serie: "Serie", ubic: "Ubicación"
  };
  const chips = document.getElementById("chips");
  chips.innerHTML = Object.entries(filtros)
    .filter(([, v]) => v)
    .map(([k, v]) => `
      <span class="chip">
        ${etiquetas[k]}: <strong>${v}</strong>
        <i class="fa-solid fa-xmark" onclick="quitarFiltro('${k}')" style="cursor:pointer; margin-left:4px;"></i>
      </span>`)
    .join("");
}

function quitarFiltro(key) {
  const mapa = {
    q: "q", estado: "f-estado", tipo: "f-tipo",
    marca: "f-marca", codigo: "f-codigo", serie: "f-serie", ubic: "f-ubic"
  };
  const el = document.getElementById(mapa[key]);
  if (el) el.value = "";
  doSearch();
}

function limpiarFiltros() {
  ["q","f-estado","f-tipo","f-marca","f-codigo","f-serie","f-ubic"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  doSearch();
}

// ============================================================
//  PANEL DE FILTROS (toggle)
// ============================================================
function toggleFiltros() {
  const panel = document.getElementById("filtrosPanel");
  const btn = document.getElementById("btnFiltros");
  const abierto = panel.classList.toggle("open");
  btn.classList.toggle("activo", abierto);
  
}

// ============================================================
//  MODAL: abrir / cerrar (manejado por base.js con clase "open")
// ============================================================
let indiceEditando = null;

function abrirModal() {
  document.getElementById("overlay").classList.add("open");
  document.getElementById("backdropModal").classList.add("active");
}

function cerrarModal() {
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("backdropModal").classList.remove("active");
  indiceEditando = null;
  document.querySelector("#overlay form").reset();
  document.querySelector("#overlay .modal-header h2").textContent = "Agregar nueva máquina";
}

// ============================================================
//  GUARDAR (agregar o editar)
// ============================================================
function guardarMaquina(e) {
  e.preventDefault();

  const nueva = {
    nombre:    document.getElementById("nombreMaquina").value.trim(),
    codigo:    document.getElementById("codigoMaquina").value.trim(),
    serie:     document.getElementById("numeroSerie").value.trim(),
    tipo:      document.getElementById("tipoMaquina").value,
    marca:     document.getElementById("marcaMaquina").value,
    ubicacion: document.getElementById("ubicacionMaquina").value.trim(),
    estado:    document.getElementById("estadoMaquina").value,
  };

  if (indiceEditando !== null) {
    maquinas[indiceEditando] = nueva;
  } else {
    maquinas.push(nueva);
  }

  cerrarModal();
  doSearch();
}

// ============================================================
//  EDITAR
// ============================================================
function editarMaquina(indice) {
  const m = maquinas[indice];
  indiceEditando = indice;

  document.getElementById("codigoMaquina").value    = m.codigo;
  document.getElementById("nombreMaquina").value    = m.nombre;
  document.getElementById("numeroSerie").value      = m.serie;
  document.getElementById("tipoMaquina").value      = m.tipo;
  document.getElementById("marcaMaquina").value     = m.marca;
  document.getElementById("ubicacionMaquina").value = m.ubicacion;
  document.getElementById("estadoMaquina").value    = m.estado;

  document.querySelector("#overlay .modal-header h2").textContent = "Editar máquina";
  abrirModal();
}

// ============================================================
//  ELIMINAR
// ============================================================
function eliminarMaquina(indice) {
  if (!confirm(`¿Eliminar "${maquinas[indice].nombre}"?`)) return;
  maquinas.splice(indice, 1);
  doSearch();
}

// ============================================================
//  INICIALIZAR — espera a que base.js termine de cargar el DOM
// ============================================================
document.addEventListener("baseLoaded", () => {
  // Evento submit del formulario
  const form = document.querySelector("#overlay form");
  if (form) form.addEventListener("submit", guardarMaquina);

  // Renderizado inicial
  doSearch();
});