    
        const EQUIPOS = [
            { codigo:'EQ-001', nombre:'Excavadora CAT 323D',        tipo:'Excavadora',      marca:'CAT',     serie:'SN-323D-2019-001',  ubicacion:'Zona Norte',    estado:'Activo' },
            { codigo:'EQ-002', nombre:'Retroexcavadora JCB 3CX',    tipo:'Retroexcavadora', marca:'JCB',     serie:'SN-3CX-2020-045',   ubicacion:'Zona Sur',      estado:'Mantenimiento' },
            { codigo:'EQ-003', nombre:'Cargador CAT 950H',           tipo:'Cargador',        marca:'CAT',     serie:'SN-950H-2018-012',  ubicacion:'Patio Central', estado:'Activo' },
            { codigo:'EQ-004', nombre:'Malacate Komatsu WA200',      tipo:'Malacate',        marca:'Komatsu', serie:'SN-WA200-2021-007', ubicacion:'Galería 3',     estado:'Activo' },
            { codigo:'EQ-005', nombre:'Vagoneta Volvo A40G',         tipo:'Vagoneta',        marca:'Volvo',   serie:'SN-A40G-2022-003',  ubicacion:'Zona Este',     estado:'Fuera de servicio' },
            { codigo:'EQ-006', nombre:'Pulmón Compacto JCB',         tipo:'Pulmón',          marca:'JCB',     serie:'SN-PCJ-2020-088',   ubicacion:'Taller',        estado:'Activo' },
            { codigo:'EQ-007', nombre:'Excavadora Komatsu PC290',    tipo:'Excavadora',      marca:'Komatsu', serie:'SN-PC290-2017-033', ubicacion:'Zona Norte',    estado:'Inactivo' },
            { codigo:'EQ-008', nombre:'Cargador Volvo L90H',         tipo:'Cargador',        marca:'Volvo',   serie:'SN-L90H-2023-001',  ubicacion:'Zona Sur',      estado:'Activo' },
            { codigo:'EQ-009', nombre:'Malacate CAT 745',            tipo:'Malacate',        marca:'CAT',     serie:'SN-745-2019-021',   ubicacion:'Galería 1',     estado:'Mantenimiento' },
            { codigo:'EQ-010', nombre:'Retroexcavadora CAT 430F2',   tipo:'Retroexcavadora', marca:'CAT',     serie:'SN-430F2-2021-015', ubicacion:'Patio Central', estado:'Activo' },
        ];

        const POR_PAGINA = 6;
        let paginaActual = 1;
        let filtrados = [...EQUIPOS];

        function badge(estado) {
            const clases = {
                'Activo':           'badge-activo',
                'Mantenimiento':    'badge-mantto',
                'Fuera de servicio':'badge-fuera',
                'Inactivo':         'badge-inactivo',
            };
            return `<span class="badge ${clases[estado] || ''}">${estado}</span>`;
        }

        function doSearch() {
            const q      = (document.getElementById('q').value || '').toLowerCase().trim();
            const estado = document.getElementById('f-estado').value;
            const tipo   = document.getElementById('f-tipo').value;
            const marca  = document.getElementById('f-marca').value;
            const codigo = (document.getElementById('f-codigo').value || '').toLowerCase().trim();
            const serie  = (document.getElementById('f-serie').value  || '').toLowerCase().trim();
            const ubic   = (document.getElementById('f-ubic').value   || '').toLowerCase().trim();
            const orden  = document.getElementById('sort').value;

            filtrados = EQUIPOS.filter(d => {
                const haystack = `${d.nombre} ${d.codigo} ${d.serie} ${d.marca} ${d.tipo} ${d.ubicacion}`.toLowerCase();
                return (
                    (!q      || haystack.includes(q))      &&
                    (!estado || d.estado === estado)       &&
                    (!tipo   || d.tipo   === tipo)         &&
                    (!marca  || d.marca  === marca)        &&
                    (!codigo || d.codigo.toLowerCase().includes(codigo)) &&
                    (!serie  || d.serie.toLowerCase().includes(serie))   &&
                    (!ubic   || d.ubicacion.toLowerCase().includes(ubic))
                );
            });

            filtrados.sort((a, b) => (a[orden] || '').localeCompare(b[orden] || ''));

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
            contenedor.innerHTML = '';

            lista.forEach(c => {
                const chip = document.createElement('span');
                chip.className = 'chip';
                chip.innerHTML = `${c.label} <button aria-label="Quitar filtro">×</button>`;
                chip.querySelector('button').addEventListener('click', c.limpiar);
                contenedor.appendChild(chip);
            });
        }

        function render() {
            const inicio = (paginaActual - 1) * POR_PAGINA;
            const pagina = filtrados.slice(inicio, inicio + POR_PAGINA);

            document.getElementById('rcount').textContent = filtrados.length;
            const tbody = document.getElementById('tbody');

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
                tbody.innerHTML = pagina.map(d => `
                    <tr>
                        <td class="td-codigo">${d.codigo}</td>
                        <td class="td-nombre">${d.nombre}</td>
                        <td>${d.tipo}</td>
                        <td>${d.marca}</td>
                        <td class="td-serie">${d.serie}</td>
                        <td>${d.ubicacion}</td>
                        <td>${badge(d.estado)}</td>
                        <td>
                            <button class="action-btn" title="Ver detalle"
                                onclick="alert('Ver: ${d.nombre}')">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button class="action-btn edit" title="Editar"
                                onclick="alert('Editar: ${d.codigo}')">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button class="action-btn del" title="Eliminar"
                                onclick="confirmarEliminar('${d.codigo}', '${d.nombre}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
            }

            renderPaginacion();
        }

        function renderPaginacion() {
            const total = Math.ceil(filtrados.length / POR_PAGINA);
            const pag   = document.getElementById('paginacion');

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
            const abierto = panel.classList.toggle('open');
            btn.classList.toggle('activo', abierto);
        }

        function limpiarFiltros() {
            document.getElementById('q').value        = '';
            document.getElementById('f-estado').value = '';
            document.getElementById('f-tipo').value   = '';
            document.getElementById('f-marca').value  = '';
            document.getElementById('f-codigo').value = '';
            document.getElementById('f-serie').value  = '';
            document.getElementById('f-ubic').value   = '';
            doSearch();
        }

        function confirmarEliminar(codigo, nombre) {
            if (confirm(`¿Estás seguro de que deseas eliminar "${nombre}" (${codigo})?`)) {
                alert(`Equipo ${codigo} eliminado.`);
            }
        }

      if (document.getElementById('q')) {
    doSearch();
}
        