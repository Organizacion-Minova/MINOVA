// ============================================================
//  DATOS DE EJEMPLO Y PERSISTENCIA
// ============================================================
const STORAGE_KEY = "minova_equipos";
const DATOS_INICIALES = [
    { nombre: 'Excavadora CAT 323D',      codigo: 'EQ-001', serie: 'SN-323D-2019-001',  tipo: 'Excavadora',      marca: 'CAT',     ubicacion: 'Zona Norte',    estado: 'Activo' },
    { nombre: 'Retroexcavadora JCB 3CX',  codigo: 'EQ-002', serie: 'SN-3CX-2020-045',   tipo: 'Retroexcavadora', marca: 'JCB',     ubicacion: 'Zona Sur',      estado: 'Mantenimiento' },
    { nombre: 'Cargador CAT 950H',         codigo: 'EQ-003', serie: 'SN-950H-2018-012',  tipo: 'Cargador',        marca: 'CAT',     ubicacion: 'Patio Central', estado: 'Activo' },
    { nombre: 'Malacate Komatsu WA200',    codigo: 'EQ-004', serie: 'SN-WA200-2021-007', tipo: 'Malacate',        marca: 'Komatsu', ubicacion: 'Galería 3',     estado: 'Activo' },
    { nombre: 'Vagoneta Volvo A40G',       codigo: 'EQ-005', serie: 'SN-A40G-2022-003',  tipo: 'Vagoneta',        marca: 'Volvo',   ubicacion: 'Zona Este',     estado: 'Fuera de servicio' },
    { nombre: 'Pulmón Compacto JCB',       codigo: 'EQ-006', serie: 'SN-PCJ-2020-088',   tipo: 'Pulmón',          marca: 'JCB',     ubicacion: 'Taller',        estado: 'Activo' },
    { nombre: 'Excavadora Komatsu PC290',  codigo: 'EQ-007', serie: 'SN-PC290-2017-033', tipo: 'Excavadora',      marca: 'Komatsu', ubicacion: 'Zona Norte',    estado: 'Inactivo' },
    { nombre: 'Cargador Volvo L90H',       codigo: 'EQ-008', serie: 'SN-L90H-2023-001',  tipo: 'Cargador',        marca: 'Volvo',   ubicacion: 'Zona Sur',      estado: 'Activo' },
    { nombre: 'Malacate CAT 745',          codigo: 'EQ-009', serie: 'SN-745-2019-021',   tipo: 'Malacate',        marca: 'CAT',     ubicacion: 'Galería 1',     estado: 'Mantenimiento' },
    { nombre: 'Retroexcavadora CAT 430F2', codigo: 'EQ-010', serie: 'SN-430F2-2021-015', tipo: 'Retroexcavadora', marca: 'CAT',     ubicacion: 'Patio Central', estado: 'Activo' },
];

function cargarEquipos() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DATOS_INICIALES];
    try {
        const items = JSON.parse(raw);
        return Array.isArray(items) ? items : [...DATOS_INICIALES];
    } catch (error) {
        console.warn("Error leyendo equipos de localStorage:", error);
        return [...DATOS_INICIALES];
    }
}

function guardarEquiposStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipos));
}

let equipos = cargarEquipos();
let filtrados = [...equipos];
let indiceEditando = null;

const POR_PAGINA = 6;
let paginaActual = 1;

// ============================================================
//  BADGES DE ESTADO
// ============================================================
function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function badge(estado) {
    const clases = {
        'Activo':            'badge-activo',
        'Mantenimiento':     'badge-mantto',
        'Fuera de servicio': 'badge-fuera',
        'Inactivo':          'badge-inactivo',
    };
    return `<span class="badge ${clases[estado] || ''}">${estado}</span>`;
}

// ============================================================
//  BÚSQUEDA Y FILTROS
// ============================================================
function doSearch() {
    const q      = (getValue('q') || '').toLowerCase().trim();
    const estado = getValue('f-estado');
    const tipo   = getValue('f-tipo');
    const marca  = getValue('f-marca');
    const codigo = (getValue('f-codigo') || '').toLowerCase().trim();
    const serie  = (getValue('f-serie') || '').toLowerCase().trim();
    const ubic   = (getValue('f-ubic') || '').toLowerCase().trim();
    const orden  = getValue('sort') || 'nombre';

    filtrados = equipos.filter(m => {
        const texto = `${m.nombre} ${m.codigo} ${m.serie} ${m.marca} ${m.tipo} ${m.ubicacion}`.toLowerCase();
        return (
            (!q      || texto.includes(q))      &&
            (!estado || m.estado === estado)    &&
            (!tipo   || m.tipo   === tipo)      &&
            (!marca  || m.marca  === marca)     &&
            (!codigo || m.codigo.toLowerCase().includes(codigo)) &&
            (!serie  || m.serie.toLowerCase().includes(serie))   &&
            (!ubic   || m.ubicacion.toLowerCase().includes(ubic))
        );
    });

    filtrados.sort((a, b) => {
        const campoA = (a[orden] || '').toString().toLowerCase();
        const campoB = (b[orden] || '').toString().toLowerCase();
        return campoA.localeCompare(campoB, 'es');
    });

    paginaActual = 1;
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
    if (!contenedor) return;

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
    const inicio = (paginaActual - 1) * POR_PAGINA;
    const pagina = filtrados.slice(inicio, inicio + POR_PAGINA);

    const countEl = document.getElementById('rcount');
    if (countEl) countEl.textContent = filtrados.length;

    const tbody = document.getElementById('tbody');
    if (!tbody) return;

    if (!filtrados.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="no-results">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        Sin resultados. Intenta con otros términos o ajusta los filtros.
                    </div>
                </td>
            </tr>`;
    } else {
        tbody.innerHTML = pagina.map(d => {
            const index = equipos.findIndex(item => item.codigo === d.codigo);
            return `
                <tr>
                    <td class="td-nombre">${d.nombre}</td>
                    <td class="td-codigo">${d.codigo}</td>
                    <td class="td-serie">${d.serie}</td>
                    <td>${d.tipo}</td>
                    <td>${d.marca}</td>
                    <td>${d.ubicacion}</td>
                    <td>${badge(d.estado)}</td>
                    <td>
                        <button class="btn-azul" title="Ver detalle" onclick="verDetalle('${d.nombre}')">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-azul" title="Editar" onclick="editarEquipo(${index})">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn-azul" title="Eliminar" onclick="confirmarEliminar('${d.codigo}', '${d.nombre}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
        }).join('');
    }

    renderPaginacion();
}

function renderPaginacion() {
    const total = Math.ceil(filtrados.length / POR_PAGINA);
    const pag   = document.getElementById('paginacion');

    if (!pag) return;
    if (total <= 1) { pag.innerHTML = ''; return; }

    let html = `<span class="pg-info">Página ${paginaActual} de ${total}</span>`;
    html += `<button class="pg-btn" onclick="irPagina(${paginaActual - 1})" ${paginaActual === 1 ? 'disabled' : ''}>‹</button>`;

    for (let i = 1; i <= total; i++) {
        html += `<button class="pg-btn ${i === paginaActual ? 'active' : ''}" onclick="irPagina(${i})">${i}</button>`;
    }

    html += `<button class="pg-btn" onclick="irPagina(${paginaActual + 1})" ${paginaActual === total ? 'disabled' : ''}>›</button>`;
    pag.innerHTML = html;
}

function irPagina(p) {
    const total = Math.ceil(filtrados.length / POR_PAGINA);
    if (p < 1 || p > total) return;
    paginaActual = p;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleFiltros() {
    const panel  = document.getElementById('filtrosPanel');
    const btn    = document.getElementById('btnFiltros');
    if (!panel || !btn) return;
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

// ============================================================
//  MODAL
// ============================================================
function abrirModal() {
    const overlay = document.getElementById('overlay');
    const backdrop = document.getElementById('backdropModal');
    if (overlay) overlay.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
}

function cerrarModal() {
    const overlay = document.getElementById('overlay');
    const backdrop = document.getElementById('backdropModal');
    if (overlay) overlay.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    indiceEditando = null;
    const form = document.querySelector('#overlay form');
    if (form) form.reset();
    const title = document.querySelector('#overlay .modal-header h2, #overlay .modal-header h3');
    if (title) title.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar nuevo equipo';
}

function guardarEquipo(e) {
    e.preventDefault();

    const nuevo = {
        nombre:    document.getElementById('nombre').value.trim(),
        codigo:    document.getElementById('codigo').value.trim(),
        serie:     document.getElementById('serie').value.trim(),
        tipo:      document.getElementById('tipo').value.trim(),
        marca:     document.getElementById('marca').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        estado:    document.getElementById('estado').value,
    };

    if (indiceEditando !== null) {
        equipos[indiceEditando] = nuevo;
    } else {
        equipos.push(nuevo);
    }

    guardarEquiposStorage();
    cerrarModal();
    doSearch();
}

function editarEquipo(indice) {
    const m = equipos[indice];
    indiceEditando = indice;

    document.getElementById('nombre').value    = m.nombre;
    document.getElementById('codigo').value    = m.codigo;
    document.getElementById('serie').value     = m.serie;
    document.getElementById('tipo').value      = m.tipo;
    document.getElementById('marca').value     = m.marca;
    document.getElementById('ubicacion').value = m.ubicacion;
    document.getElementById('estado').value    = m.estado;

    const title = document.querySelector('#overlay .modal-header h2, #overlay .modal-header h3');
    if (title) title.innerHTML = '<i class="fa-solid fa-pencil"></i> Editar equipo';
    abrirModal();
}

function confirmarEliminar(codigo, nombre) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${nombre}" (${codigo})?`)) {
        const indice = equipos.findIndex(m => m.codigo === codigo);
        if (indice >= 0) {
            equipos.splice(indice, 1);
            guardarEquiposStorage();
            doSearch();
        }
    }
}

function verDetalle(nombre) {
    alert(`Ver: ${nombre}`);
}

document.addEventListener('baseLoaded', () => {
    const btnAbrir  = document.getElementById('abrirModal');
    const btnCerrar = document.getElementById('cerrarModal');
    const backdrop  = document.getElementById('backdropModal');
    const form      = document.querySelector('#overlay form');

    if (btnAbrir)  btnAbrir.addEventListener('click', abrirModal);
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (backdrop)  backdrop.addEventListener('click', cerrarModal);
    if (form)      form.addEventListener('submit', guardarEquipo);

    doSearch();
});