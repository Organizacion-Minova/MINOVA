// /* ═══════════════════════════════════════════════════════
//    MINOVA — auth.js
//    Gestiona la sesión activa y protege cada página.
//    Requiere: roles.store.js cargado antes.
// ═══════════════════════════════════════════════════════ */

// const Auth = {
//   _KEY: 'minova_sesion',

//   /* ── Sesión ── */
//   guardarSesion(usuario) {
//     sessionStorage.setItem(this._KEY, JSON.stringify(usuario));
//   },

//   getSesion() {
//     try {
//       const d = sessionStorage.getItem(this._KEY);
//       return d ? JSON.parse(d) : null;
//     } catch { return null; }
//   },

//   cerrarSesion() {
//     sessionStorage.removeItem(this._KEY);
//     window.location.href = 'Iniciar_sesion.html';
//   },

//   getRolId() {
//     return this.getSesion()?.rolId || null;
//   },

//   getNombre() {
//     return this.getSesion()?.nombre || 'Usuario';
//   },

//   /* ── Permisos ── */
//   puede(permiso) {
//     const rolId = this.getRolId();
//     if (!rolId) return false;
//     const perms = RolesStore.getPerms(rolId);
//     return perms[permiso] === true;
//   },

//   esAdmin() {
//     const rolId = this.getRolId();
//     if (!rolId) return false;
//     return RolesStore.getRol(rolId)?.esAdmin === true;
//   },

//   /* ── Protección de páginas ──
//      Llama esto al inicio de CADA página protegida.
//      permisosRequeridos: [] = solo necesita sesión activa
//                          ['ver_equipos'] = necesita ese permiso
//   ── */
//   proteger(permisosRequeridos = []) {
//     const sesion = this.getSesion();

//     if (!sesion) {
//       window.location.href = 'Iniciar_sesion.html';
//       return false;
//     }

//     if (permisosRequeridos.length > 0) {
//       const tieneAcceso = permisosRequeridos.some(p => this.puede(p));
//       if (!tieneAcceso) {
//         this._mostrarAccesoDenegado();
//         return false;
//       }
//     }

//     // Oculta elementos con data-permiso que el usuario no tiene
//     document.addEventListener('DOMContentLoaded', () => {
//       this._aplicarPermisosDom();
//     });

//     // También aplica después de que base.js inyecta el sidebar
//     document.addEventListener('minova:baseLoaded', () => {
//       this._aplicarPermisosDom();
//       this._actualizarTopbar();
//     });

//     return true;
//   },

//   /* Oculta/muestra elementos según data-permiso */
//   _aplicarPermisosDom() {
//     document.querySelectorAll('[data-permiso]').forEach(el => {
//       const p = el.dataset.permiso;
//       if (!this.puede(p)) {
//         el.style.display = 'none';
//       }
//     });

//     // También controla items del sidebar según la página
//     document.querySelectorAll('.sidebar a[href]').forEach(link => {
//       const pagina = link.getAttribute('href');
//       const reqs   = MINOVA_PAGINAS[pagina];
//       if (reqs && reqs.length > 0) {
//         const tieneAcceso = reqs.some(p => this.puede(p));
//         if (!tieneAcceso) {
//           link.closest('li').style.display = 'none';
//         }
//       }
//     });
//   },

//   /* Actualiza el nombre y rol en el topbar */
//   _actualizarTopbar() {
//     const sesion = this.getSesion();
//     if (!sesion) return;

//     const rolData = RolesStore.getRol(sesion.rolId);
//     const nombre  = document.querySelector('.profile-btn h4');
//     const rolTag  = document.querySelector('.role-tag');

//     if (nombre)  nombre.textContent  = sesion.nombre || 'Usuario';
//     if (rolTag)  rolTag.textContent  = rolData?.label || sesion.rolId;

//     // Oculta "Panel Superadmin" si no es admin
//     const btnAdmin = document.querySelector('.btn-perfil-action.primary');
//     if (btnAdmin && !this.esAdmin()) {
//       btnAdmin.style.display = 'none';
//     }

//     // Conecta cerrar sesión
//     const btnLogout = document.querySelector('.btn-logout-overlay');
//     if (btnLogout) {
//       btnLogout.addEventListener('click', () => {
//         if (confirm('¿Deseas cerrar sesión?')) Auth.cerrarSesion();
//       });
//     }
//   },

//   _mostrarAccesoDenegado() {
//     document.addEventListener('DOMContentLoaded', () => {
//       document.body.innerHTML = `
//         <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
//                     min-height:100vh;font-family:sans-serif;text-align:center;padding:40px;
//                     background:#f8f9fa;color:#333">
//           <svg width="64" height="64" fill="none" stroke="#ccc" stroke-width="1.5" viewBox="0 0 24 24">
//             <rect x="3" y="11" width="18" height="11" rx="2"/>
//             <path d="M7 11V7a5 5 0 0110 0v4"/>
//           </svg>
//           <h2 style="margin:20px 0 8px;font-size:22px">Acceso restringido</h2>
//           <p style="color:#666;margin-bottom:24px">No tienes permiso para ver esta sección.</p>
//           <a href="index.html" style="padding:10px 24px;background:#1a3a5c;color:#fff;
//              border-radius:8px;text-decoration:none;font-size:14px">← Volver al inicio</a>
//         </div>`;
//     });
//   },

//   /* ── Login (conectar con backend cuando esté disponible) ── */
//   login(numDoc, password) {
//     // TEMPORAL: usuarios en localStorage hasta tener backend
//     const usuarios = JSON.parse(localStorage.getItem('minova_usuarios') || '[]');
//     const user = usuarios.find(u => u.numDoc === numDoc && u.password === password && u.activo !== false);

//     if (user) {
//       this.guardarSesion({
//         id:     user.id,
//         nombre: user.nombre + ' ' + (user.apellido || ''),
//         rolId:  user.rolId,
//         email:  user.email
//       });
//       return { ok: true };
//     }

//     return { ok: false, msg: 'Documento o contraseña incorrectos.' };

//     /* ── Cuando tengas backend, reemplaza con: ──
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ numDoc, password })
//     });
//     const data = await res.json();
//     if (data.ok) {
//       this.guardarSesion(data.usuario);
//       return { ok: true };
//     }
//     return { ok: false, msg: data.msg };
//     */
//   }
// };

// window.Auth = Auth;
