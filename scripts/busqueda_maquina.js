// ============================================================
//  DATOS DE EJEMPLO Y PERSISTENCIA
// ============================================================
const STORAGE_KEY = "minova_maquinas";
const DATOS_INICIALES = [
  { nombre: "Electrobomba",     codigo: "PT2-EL01", serie: "7239900H1", tipo: "Desagüe de la mina",      marca: "IHM",     ubicacion: "Pozo túnel 2", estado: "Activo",fechaAdquisicion: "05/05/2022"},
];

function cargarMaquinas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...DATOS_INICIALES];
  try {
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [...DATOS_INICIALES];
  } catch (error) {
    console.warn("Error leyendo máquinas de localStorage:", error);
    return [...DATOS_INICIALES];
  }
}

function guardarMaquinasStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maquinas));
}

let maquinas = cargarMaquinas();
let filtrados = [...maquinas];
let indiceEditando = null;

// ============================================================
//  BADGES DE ESTADO
// ============================================================
function badge(estado) {
  const clases = {
    'Activo':            'badge-activo',
    'Mantenimiento':     'badge-mantenimiento',
    'Fuera de servicio': 'badge-fuera',
    'Inactivo':          'badge-inactivo',
  };
  return `<span class="badge ${clases[estado] || ''}">${estado}</span>`;
}

// ============================================================
//  BÚSQUEDA Y FILTROS
// ============================================================
function doSearch() {
  const q      = (document.getElementById('q').value || '').toLowerCase().trim();
  const estado = document.getElementById('f-estado').value;
  const tipo   = document.getElementById('f-tipo').value;
  const marca  = document.getElementById('f-marca').value;
  const codigo = (document.getElementById('f-codigo').value || '').toLowerCase().trim();
  const serie  = (document.getElementById('f-serie').value || '').toLowerCase().trim();
  const ubic   = (document.getElementById('f-ubic').value || '').toLowerCase().trim();
  const orden  = document.getElementById('sort').value;

  filtrados = maquinas.filter(m => {
    const texto = `${m.nombre} ${m.codigo} ${m.serie} ${m.marca} ${m.tipo} ${m.ubicacion}`.toLowerCase();
    return (
      (!q      || texto.includes(q)) &&
      (!estado || m.estado === estado) &&
      (!tipo   || m.tipo   === tipo) &&
      (!marca  || m.marca  === marca) &&
      (!codigo || m.codigo.toLowerCase().includes(codigo)) &&
      (!serie  || m.serie.toLowerCase().includes(serie)) &&
      (!ubic   || m.ubicacion.toLowerCase().includes(ubic))
    );
  });

  filtrados.sort((a, b) => {
    const campoA = (a[orden] || '').toString().toLowerCase();
    const campoB = (b[orden] || '').toString().toLowerCase();
    return campoA.localeCompare(campoB, 'es');
  });

  renderChips(q, estado, tipo, marca, codigo, serie, ubic);
  render();
}

function renderChips(q, estado, tipo, marca, codigo, serie, ubic) {
  const lista = [
    { label: `Búsqueda: "${q}"`,  activo: q,      limpiar: () => { document.getElementById('q').value = ''; doSearch(); } },
    { label: `Estado: ${estado}`, activo: estado, limpiar: () => { document.getElementById('f-estado').value = ''; doSearch(); } },
    { label: `Tipo: ${tipo}`,      activo: tipo,   limpiar: () => { document.getElementById('f-tipo').value = ''; doSearch(); } },
    { label: `Marca: ${marca}`,    activo: marca,  limpiar: () => { document.getElementById('f-marca').value = ''; doSearch(); } },
    { label: `Código: ${codigo}`,  activo: codigo, limpiar: () => { document.getElementById('f-codigo').value = ''; doSearch(); } },
    { label: `Serie: ${serie}`,    activo: serie,  limpiar: () => { document.getElementById('f-serie').value = ''; doSearch(); } },
    { label: `Ubicación: ${ubic}`, activo: ubic,   limpiar: () => { document.getElementById('f-ubic').value = ''; doSearch(); } },
  ].filter(c => c.activo);

  const contenedor = document.getElementById('chips');
  contenedor.innerHTML = '';

  lista.forEach(item => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${item.label} <button type="button" aria-label="Quitar filtro">×</button>`;
    chip.querySelector('button').addEventListener('click', item.limpiar);
    contenedor.appendChild(chip);
  });
}

function render() {
  const tbody = document.getElementById('tbody');
  document.getElementById('rcount').textContent = filtrados.length;

  if (!filtrados.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:2rem; color:#888;">
          No se encontraron equipos con los filtros aplicados.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map(m => {
    const index = maquinas.findIndex(item => item.codigo === m.codigo);
    return `
      <tr>
        <td>${m.nombre}</td>
        <td>${m.codigo}</td>
        <td>${m.serie}</td>
        <td>${m.tipo}</td>
        <td>${m.marca}</td>
        <td>${m.ubicacion}</td>
        <td>${badge(m.estado)}</td>
        <td>
          <a href="hj_maquina.html" ><button class="btn-azul" title="Ver detalle")">
            <i class="fa-solid fa-eye"></i>
          </button></a>
          <button class="btn-azul" title="Eliminar" onclick="confirmarEliminar('${m.codigo}', '${m.nombre}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  }).join('');
}

function toggleFiltros() {
  const panel = document.getElementById('filtrosPanel');
  const btn   = document.getElementById('btnFiltros');
  const abierto = panel.classList.toggle('open');
  btn.classList.toggle('activo', abierto);
}

function limpiarFiltros() {
  ['q','f-estado','f-tipo','f-marca','f-codigo','f-serie','f-ubic'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  doSearch();
}

function abrirModal() {
  document.getElementById('overlay').classList.add('open');
  document.getElementById('backdropModal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('backdropModal').classList.remove('active');
  indiceEditando = null;
  document.querySelector('#overlay form').reset();
  document.querySelector('#overlay .modal-header h2').textContent = 'Agregar nueva máquina';
}

function guardarMaquina(e) {
  e.preventDefault();

  const nueva = {
    nombre:           document.getElementById('nombre').value.trim(),
    codigo:           document.getElementById('codigo').value.trim(),
    serie:            document.getElementById('serie').value.trim(),
    tipo:             document.getElementById('tipo').value.trim(),
    marca:            document.getElementById('marca').value.trim(),
    ubicacion:        document.getElementById('ubicacion').value.trim(),
    estado:           document.getElementById('estado').value,
    fechaAdquisicion: document.getElementById('fechaAdquisicion').value,
    costoAdquisicion: document.getElementById('costoAdquisicion').value,
    garantia:         document.getElementById('garantia').value,
    categoria:        document.getElementById('categoria').value.trim(),
    imagen:           document.getElementById('imagenMaquina').value,
  };

  if (indiceEditando !== null) {
    maquinas[indiceEditando] = nueva;
  } else {
    maquinas.push(nueva);
  }

  guardarMaquinasStorage();
  cerrarModal();
  doSearch();
}


function eliminarMaquina(indice) {
  if (!confirm(`¿Eliminar "${maquinas[indice].nombre}"?`)) return;
  maquinas.splice(indice, 1);
  guardarMaquinasStorage();
  doSearch();
}

function confirmarEliminar(codigo, nombre) {
  if (confirm(`¿Estás seguro de que deseas eliminar "${nombre}" (${codigo})?`)) {
    const indice = maquinas.findIndex(m => m.codigo === codigo);
    if (indice >= 0) {
      maquinas.splice(indice, 1);
      guardarMaquinasStorage();
      doSearch();
    }
  }
}

function verDetalle(nombre) {
  alert(`Ver: ${nombre}`);
}

// ============================================================
//  INICIALIZAR
// ============================================================
document.addEventListener('baseLoaded', () => {
  const form = document.querySelector('#overlay form');
  if (form) form.addEventListener('submit', guardarMaquina);
  doSearch();
});
