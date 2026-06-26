<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MINOVA — Panel de administración</title>
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/componentes.css">
  <link rel="icon" type="image/png" href="../img/logo-minova.png">
  <link rel="stylesheet" href="../styles/roles.css">
  <link rel="stylesheet" href="../styles/estilos_tabla.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

</head>
<body>
<div id="base-container"></div>
<template id="page-content">
  <div class="grid-contenedor">
            <div class="welcome">
                 <div>
                     <h1>Panel Administrador</h1>
                     <p>Control para roles y funciones</p>
                 </div>

                <div class="date">
                    <i class="fa-regular fa-calendar"></i>
                    <span id="fechaActual"></span>
                </div>
            </div>

            <br>
    <div class="admin-tabs">
      <button class="btn-azul" onclick="cambiarTab('roles', this)">
        <i class="fa-solid fa-shield-halved"></i> Roles y permisos
      </button>
      <button class="btn-azul" onclick="cambiarTab('usuarios', this)">
        <i class="fa-solid fa-users"></i> Usuarios
      </button>
    </div>

    <!-- TAB ROLES -->
    <div class="tab-panel active" id="tab-roles">
      <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
        <button class="btn-azul" onclick="abrirModalRol()">
          <i class="fa-solid fa-plus"></i> Nuevo rol
        </button>
      </div>
      <div class="roles-layout">
        <div class="roles-sidebar">
          <div class="roles-sidebar-head">
            <span>Roles</span>
          </div>
          <div id="listaRoles"></div>
        </div>
        <div class="roles-detail" id="detallRol">
          <div class="empty">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Selecciona un rol para editar sus permisos</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB USUARIOS -->
    <div class="tab-panel" id="tab-usuarios">
      <div class="usuarios-head">
       
        <button class="btn-azul" onclick="abrirModalUsuario()">
          <i class="fa-solid fa-user-plus"></i> Nuevo usuario
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Documento</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaUsuarios"></tbody>
      </table>
    </div>
  </div>
</template>

<!-- Modal Nuevo Rol -->
<div class="modal-backdrop" id="modalRol">
  <div class="modal-box">
    <div class="modal-title" id="modalRolTitulo">Crear nuevo rol</div>
    <div class="campo-modal">
      <label>Nombre del rol</label>
      <input type="text" id="inputNombreRol" placeholder="Ej: Técnico de soldadura">
    </div>
    <div id="alertaModalRol" style="display:none;font-size:12px;color:#e53e3e;margin-top:-6px;margin-bottom:8px"></div>
    <div class="modal-actions">
      <button class="btn-azul" onclick="cerrarModalRol()">Cancelar</button>
      <button class="btn-azul" onclick="guardarRol()">Crear rol</button>
    </div>
  </div>
</div>

<!-- Modal Nuevo/Editar Usuario -->
<div class="modal-backdrop" id="modalUsuario">
  <div class="modal-box">
    <div class="modal-title" id="modalUsuarioTitulo">Nuevo usuario</div>
    <input type="hidden" id="editUserId">
    <div class="campo-modal">
      <label>Nombre</label>
      <input type="text" id="uNombre" placeholder="Nombre">
    </div>
    <div class="campo-modal">
      <label>Apellido</label>
      <input type="text" id="uApellido" placeholder="Apellido">
    </div>
    <div class="campo-modal">
      <label>Número de documento</label>
      <input type="text" id="uNumDoc" placeholder="Número de documento">
    </div>
    <div class="campo-modal">
      <label>Correo electrónico</label>
      <input type="email" id="uEmail" placeholder="correo@empresa.com">
    </div>
    <div class="campo-modal" id="campoPassword">
      <label>Contraseña temporal</label>
      <input type="password" id="uPassword" placeholder="Mínimo 8 caracteres">
    </div>
    <div class="campo-modal">
      <label>Rol asignado</label>
      <select id="uRol"></select>
    </div>
    <div id="alertaModalUsuario" style="display:none;font-size:12px;color:#e53e3e;margin-top:-6px;margin-bottom:8px"></div>
    <div class="modal-actions">
      <button class="btn-azul" onclick="cerrarModalUsuario()">Cancelar</button>
      <button class="btn-azul" onclick="guardarUsuario()">Guardar</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"><i class="fa-solid fa-check"></i> <span id="toastMsg"></span></div>

<script src="../scripts/roles.store.js"></script>
<script src="../scripts/auth.js"></script>
<script src="../scripts/base.js"></script>
<script>
/* ── Guard: solo admin puede entrar ── */
if (!Auth.proteger()) { /* redirige automáticamente */ }
document.addEventListener('minova:baseLoaded', () => {
  if (!Auth.esAdmin()) {
    window.location.href = 'index.php';
  }
});

/* ═══════════════ UTILIDADES ═══════════════ */
const MODULOS_META = [
  { id: 'herramientas', label: 'Herramientas',       icon: 'fa-screwdriver-wrench' },
  { id: 'equipos',      label: 'Equipos',             icon: 'fa-gears' },
  { id: 'maquinas',     label: 'Máquinas',            icon: 'fa-industry' },
  { id: 'ubicaciones',  label: 'Ubicaciones',         icon: 'fa-map-marker-alt' },
  { id: 'uso_diario',   label: 'Uso diario',          icon: 'fa-clipboard-check' },
  { id: 'usuarios',     label: 'Usuarios',            icon: 'fa-users' },
  { id: 'alertas',      label: 'Alertas / Reportes',  icon: 'fa-bell' },
  { id: 'reportes',     label: 'Reportes',            icon: 'fa-file-chart-column' },
];

const PERM_LABELS = {
  ver_herramientas: 'Ver', agregar_herramientas: 'Agregar',
  editar_herramientas: 'Editar', eliminar_herramientas: 'Eliminar',
  ver_equipos: 'Ver', agregar_equipos: 'Agregar',
  editar_equipos: 'Editar', eliminar_equipos: 'Eliminar',
  ver_maquinas: 'Ver', agregar_maquinas: 'Agregar',
  editar_maquinas: 'Editar', eliminar_maquinas: 'Eliminar',
  ver_ubicaciones: 'Ver', editar_ubicaciones: 'Editar',
  ver_uso_diario: 'Ver', registrar_uso: 'Registrar uso',
  ver_usuarios: 'Ver', crear_usuarios: 'Crear',
  editar_usuarios: 'Editar', desactivar_usuarios: 'Desactivar',
  ver_alertas: 'Ver alertas', gestionar_alertas: 'Gestionar',
  ver_reportes: 'Ver reportes', exportar_reportes: 'Exportar',
};

let rolSeleccionado = null;
let editandoRolId = null;

function toast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function cambiarTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'usuarios') renderTablaUsuarios();
}

/* ═══════════════ ROLES ═══════════════ */
function renderListaRoles() {
  const roles = RolesStore.listar();
  const el = document.getElementById('listaRoles');
  el.innerHTML = Object.entries(roles).map(([id, r]) => {
    const count = Object.values(r.perms || {}).filter(Boolean).length;
    return `<div class="rol-item ${id === rolSeleccionado ? 'active' : ''}" onclick="seleccionarRol('${id}')">
      <i class="fa-solid fa-shield-halved" style="color:#1a3a5c;font-size:13px"></i>
      <span style="flex:1">${r.label}</span>
      <span class="rol-count">${count}</span>
      ${!r.esAdmin ? `<button class="rol-del" onclick="eliminarRol(event,'${id}')" title="Eliminar rol">
        <i class="fa-solid fa-trash"></i></button>` : ''}
    </div>`;
  }).join('');
}

function seleccionarRol(id) {
  rolSeleccionado = id;
  renderListaRoles();
  renderDetalle();
}

function renderDetalle() {
  if (!rolSeleccionado) return;
  const roles = RolesStore.listar();
  const role  = roles[rolSeleccionado];
  const isAdmin = role.esAdmin;

  const modulosHtml = MODULOS_META.map(mod => {
    const permsModulo = MINOVA_PERMISOS[mod.id] || [];
    const todosOn = permsModulo.every(p => role.perms[p]);

    const filas = permsModulo.map(p => `
      <div class="perm-fila">
        <span>${PERM_LABELS[p] || p}</span>
        <label class="switch">
          <input type="checkbox" ${role.perms[p] ? 'checked' : ''} ${isAdmin ? 'disabled' : ''}
            onchange="togglePerm('${p}', this.checked)">
          <span class="slider"></span>
        </label>
      </div>`).join('');

    return `<div class="perm-card">
      <div class="perm-card-head">
        <span class="perm-cat"><i class="fa-solid fa-${mod.icon}"></i>${mod.label}</span>
        ${!isAdmin ? `<button class="toggle-todos" onclick="toggleModulo('${mod.id}', ${!todosOn})">
          ${todosOn ? 'Quitar todo' : 'Todo'}</button>` : ''}
      </div>
      ${filas}
    </div>`;
  }).join('');

  document.getElementById('detallRol').innerHTML = `
    <div class="detail-head">
      <div style="flex:1">
        ${isAdmin
          ? `<div style="font-size:16px;font-weight:700;color:#1a3a5c">${role.label}</div>
             <div style="font-size:12px;color:#888;margin-top:3px">Rol raíz — acceso total, no modificable</div>`
          : `<input class="rol-name-input" id="inputNombreDetalle" value="${role.label}"
               oninput="RolesStore.listar()['${rolSeleccionado}'] && (pendingLabel = this.value)"
               placeholder="Nombre del rol">`
        }
      </div>
      ${!isAdmin ? `<button class="btn btn-primary btn-sm" onclick="guardarCambiosRol()">
        <i class="fa-solid fa-floppy-disk"></i> Guardar</button>` : ''}
    </div>
    <div>
      <div class="section-title">Permisos por módulo</div>
      <div class="perm-grid">${modulosHtml}</div>
    </div>`;
}

let pendingPerms  = null;
let pendingLabel  = null;

function togglePerm(permId, val) {
  if (!rolSeleccionado) return;
  const roles = RolesStore.listar();
  roles[rolSeleccionado].perms[permId] = val;
  if (!pendingPerms) pendingPerms = { ...roles[rolSeleccionado].perms };
  pendingPerms[permId] = val;
  renderListaRoles();
}

function toggleModulo(modId, val) {
  if (!rolSeleccionado) return;
  const roles = RolesStore.listar();
  const perms = MINOVA_PERMISOS[modId] || [];
  perms.forEach(p => { roles[rolSeleccionado].perms[p] = val; });
  pendingPerms = { ...roles[rolSeleccionado].perms };
  renderListaRoles();
  renderDetalle();
}

function guardarCambiosRol() {
  const roles = RolesStore.listar();
  const label = document.getElementById('inputNombreDetalle')?.value?.trim() || roles[rolSeleccionado].label;
  const perms = roles[rolSeleccionado].perms;
  RolesStore.editar(rolSeleccionado, label, perms);
  pendingPerms = null;
  pendingLabel = null;
  renderListaRoles();
  toast('Rol actualizado correctamente');
}

function abrirModalRol() {
  document.getElementById('inputNombreRol').value = '';
  document.getElementById('alertaModalRol').style.display = 'none';
  document.getElementById('modalRolTitulo').textContent = 'Crear nuevo rol';
  document.getElementById('modalRol').classList.add('open');
}

function cerrarModalRol() {
  document.getElementById('modalRol').classList.remove('open');
}

function guardarRol() {
  const nombre = document.getElementById('inputNombreRol').value.trim();
  const alerta = document.getElementById('alertaModalRol');
  if (!nombre) {
    alerta.textContent = 'El nombre del rol es obligatorio.';
    alerta.style.display = 'block';
    return;
  }
  const id = 'rol_' + Date.now();
  RolesStore.crear(id, nombre, {});
  cerrarModalRol();
  renderListaRoles();
  seleccionarRol(id);
  toast('Rol "' + nombre + '" creado. Asigna sus permisos.');
}

function eliminarRol(e, id) {
  e.stopPropagation();
  const roles = RolesStore.listar();
  if (!confirm(`¿Eliminar el rol "${roles[id].label}"? Esta acción no se puede deshacer.`)) return;
  RolesStore.eliminar(id);
  if (rolSeleccionado === id) {
    rolSeleccionado = null;
    document.getElementById('detallRol').innerHTML = `<div class="empty">
      <i class="fa-solid fa-shield-halved"></i>
      <span>Selecciona un rol para editar sus permisos</span></div>`;
  }
  renderListaRoles();
  toast('Rol eliminado');
}

/* ═══════════════ USUARIOS ═══════════════ */
function getUsuarios() {
  try { return JSON.parse(localStorage.getItem('minova_usuarios') || '[]'); }
  catch { return []; }
}
function saveUsuarios(arr) {
  localStorage.setItem('minova_usuarios', JSON.stringify(arr));
}

function renderTablaUsuarios() {
  const usuarios = getUsuarios();
  const roles    = RolesStore.listar();
  const tbody    = document.getElementById('tablaUsuarios');
  document.getElementById('conteoUsuarios').textContent = `${usuarios.length} usuario(s) registrado(s)`;

  if (!usuarios.length) {
    tbody.innerHTML = `<tr><td colspan="5">
      <div class="empty"><i class="fa-solid fa-users"></i><span>Aún no hay usuarios registrados</span></div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = usuarios.map(u => {
    const iniciales = ((u.nombre||'?')[0] + (u.apellido||'')[0]).toUpperCase();
    const rolLabel  = roles[u.rolId]?.label || u.rolId || '—';
    return `<tr>
      <td><div class="user-cell">
        <div class="avatar">${iniciales}</div>
        <div><div class="user-nombre">${u.nombre} ${u.apellido||''}</div>
          <div class="user-email">${u.email||''}</div></div>
      </div></td>
      <td>${u.numDoc||'—'}</td>
      <td><span class="badge-rol">${rolLabel}</span></td>
      <td><span class="${u.activo !== false ? 'badge-activo' : 'badge-inactivo'}">
        ${u.activo !== false ? 'Activo' : 'Inactivo'}</span></td>
      <td><div class="td-actions">
        <button class="btn-accion" onclick="editarUsuario(${u.id})" title="Editar">
          <i class="fa-solid fa-pen"></i></button>
        <button class="btn-accion danger" onclick="toggleEstadoUsuario(${u.id})"
          title="${u.activo !== false ? 'Desactivar' : 'Activar'}">
          <i class="fa-solid ${u.activo !== false ? 'fa-trash' : 'fa-rotate-left'}"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

function poblarSelectRoles(seleccionado = '') {
  const roles  = RolesStore.listar();
  const select = document.getElementById('uRol');
  select.innerHTML = '<option value="">— Selecciona un rol —</option>' +
    Object.entries(roles).map(([id, r]) =>
      `<option value="${id}" ${id === seleccionado ? 'selected' : ''}>${r.label}</option>`
    ).join('');
}

function abrirModalUsuario() {
  document.getElementById('modalUsuarioTitulo').textContent = 'Nuevo usuario';
  document.getElementById('editUserId').value = '';
  ['uNombre','uApellido','uNumDoc','uEmail','uPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('campoPassword').style.display = 'block';
  poblarSelectRoles();
  document.getElementById('alertaModalUsuario').style.display = 'none';
  document.getElementById('modalUsuario').classList.add('open');
}

function editarUsuario(id) {
  const u = getUsuarios().find(u => u.id === id);
  if (!u) return;
  document.getElementById('modalUsuarioTitulo').textContent = 'Editar usuario';
  document.getElementById('editUserId').value = id;
  document.getElementById('uNombre').value   = u.nombre || '';
  document.getElementById('uApellido').value = u.apellido || '';
  document.getElementById('uNumDoc').value   = u.numDoc || '';
  document.getElementById('uEmail').value    = u.email || '';
  document.getElementById('campoPassword').style.display = 'none';
  poblarSelectRoles(u.rolId);
  document.getElementById('alertaModalUsuario').style.display = 'none';
  document.getElementById('modalUsuario').classList.add('open');
}

function cerrarModalUsuario() {
  document.getElementById('modalUsuario').classList.remove('open');
}

function guardarUsuario() {
  const alerta   = document.getElementById('alertaModalUsuario');
  const editId   = document.getElementById('editUserId').value;
  const nombre   = document.getElementById('uNombre').value.trim();
  const apellido = document.getElementById('uApellido').value.trim();
  const numDoc   = document.getElementById('uNumDoc').value.trim();
  const email    = document.getElementById('uEmail').value.trim();
  const password = document.getElementById('uPassword').value;
  const rolId    = document.getElementById('uRol').value;

  if (!nombre || !numDoc || !rolId) {
    alerta.textContent = 'Nombre, número de documento y rol son obligatorios.';
    alerta.style.display = 'block';
    return;
  }

  let usuarios = getUsuarios();

  if (editId) {
    usuarios = usuarios.map(u => u.id == editId
      ? { ...u, nombre, apellido, numDoc, email, rolId }
      : u);
    toast('Usuario actualizado');
  } else {
    if (!password || password.length < 8) {
      alerta.textContent = 'La contraseña debe tener mínimo 8 caracteres.';
      alerta.style.display = 'block';
      return;
    }
    if (usuarios.find(u => u.numDoc === numDoc)) {
      alerta.textContent = 'Ya existe un usuario con ese número de documento.';
      alerta.style.display = 'block';
      return;
    }
    usuarios.push({ id: Date.now(), nombre, apellido, numDoc, email, password, rolId, activo: true });
    toast('Usuario creado correctamente');
  }

  saveUsuarios(usuarios);
  cerrarModalUsuario();
  renderTablaUsuarios();
}

function toggleEstadoUsuario(id) {
  let usuarios = getUsuarios();
  const u = usuarios.find(u => u.id === id);
  if (!u) return;
  if (!confirm(`¿${u.activo !== false ? 'Desactivar' : 'Activar'} al usuario ${u.nombre}?`)) return;
  u.activo = u.activo === false;
  saveUsuarios(usuarios);
  renderTablaUsuarios();
  toast('Estado del usuario actualizado');
}

/* ── Init ── */
renderListaRoles();
</script>
</body>
</html>