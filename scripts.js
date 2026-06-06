// =========================================================================
// 1. DATA INICIAL (Simulación Completa de Base de Datos según DER en LocalStorage)
// =========================================================================

const PRODUCTOS_PRECARGADOS = [
    { id_producto: 1, nombre_producto: "Sofá Copenhague Velvet", categoria: "Sofás", stock: 12, precio: 2450.00, descripcion: "Mobiliario de Sala / Verde Esmeralda", estado: "Activo" },
    { id_producto: 2, nombre_producto: "Mesa Comedor Roble Nórdico", categoria: "Comedores", stock: 5, precio: 3120.00, descripcion: "Mobiliario de Comedor / 6 Personas", estado: "Activo" },
    { id_producto: 3, nombre_producto: "Cama King Size Majestic", categoria: "Camas", stock: 2, precio: 1890.00, descripcion: "Dormitorio / Estructura Reforzada", estado: "Activo" },
    { id_producto: 4, nombre_producto: "Estantería Modular Walnut", categoria: "Oficina", stock: 25, precio: 850.00, descripcion: "Oficina / Madera Maciza", estado: "Activo" },
    { id_producto: 5, nombre_producto: "Sofá Nórdico de Terciopelo", categoria: "Sofás", stock: 24, precio: 1250.00, descripcion: "Color gris perla patas de roble", estado: "Activo" },
    { id_producto: 6, nombre_producto: "Mesa de Comedor Sólido", categoria: "Comedores", stock: 3, precio: 3400.00, descripcion: "Madera tallada a mano", estado: "Activo" },
    { id_producto: 7, nombre_producto: "Silla Ergonómica Pro-V1", categoria: "Oficina", stock: 15, precio: 620.00, descripcion: "Soporte lumbar ajustable", estado: "Activo" },
    { id_producto: 8, nombre_producto: "Escritorio Minimalista Glass", categoria: "Oficina", stock: 8, precio: 1100.00, descripcion: "Vidrio templado y metal", estado: "Activo" },
    { id_producto: 9, nombre_producto: "Velador Premium Roble", categoria: "Camas", stock: 18, precio: 350.00, descripcion: "Dos cajones con correderas telescópicas", estado: "Activo" },
    { id_producto: 10, nombre_producto: "Aparador de Salón Retro", categoria: "Sofás", stock: 4, precio: 1750.00, descripcion: "Estilo mid-century funcional", estado: "Activo" }
];

const PROVEEDORES_PRECARGADOS = [
    { id_proveedor: 1, nombre_proveedor: "Maderas del Sur S.A.", categoria: "Materia Prima", telefono: "+54 11 4567-8900", calificacion: "⭐⭐⭐⭐⭐" },
    { id_proveedor: 2, nombre_proveedor: "Herrajes Premium Ltd.", categoria: "Accesorios", telefono: "ventas@herrajesp.com", calificacion: "⭐⭐⭐⭐" },
    { id_proveedor: 3, nombre_proveedor: "Logística Express", categoria: "Servicios", telefono: "logistica@express.com", calificacion: "⭐⭐⭐⭐⭐" }
];

const CLIENTES_PRECARGADOS = [
    { id_cliente: 1, nombre: "Gestiones Real S.A.C.", RUC: "20601234567" },
    { id_cliente: 2, nombre: "Juan Pérez Albela", RUC: "10457896321" },
    { id_cliente: 3, nombre: "Cliente General S&E", RUC: "10765432109" },
    { id_cliente: 4, nombre: "Maria Choque", RUC: "10223344556" },
    { id_cliente: 5, nombre: "Empresa Andina SRL", RUC: "20999888777" }
];

// LÓGICA DE USUARIOS ACTUALIZADA A LAS NUEVAS CREDENCIALES (Clave: 123)
const USUARIOS_PRECARGADOS = [
    { id_usuario: 1, username: "admin", contrasena: "123", nombre: "Administrador Central", rol: "Administrador", estado: true },
    { id_usuario: 2, username: "vendedor", contrasena: "123", nombre: "Elena Ruiz (Ventas)", rol: "Vendedor", estado: true },
    { id_usuario: 3, username: "cliente", contrasena: "123", nombre: "Juan Pérez (Cliente)", rol: "Cliente", estado: true, id_cliente: 3 }
];

// Inicializador de LocalStorage
function InicializarBaseDatos() {
    if (!localStorage.getItem("S_E_PRODUCTOS")) localStorage.setItem("S_E_PRODUCTOS", JSON.stringify(PRODUCTOS_PRECARGADOS));
    if (!localStorage.getItem("S_E_PROVEEDORES")) localStorage.setItem("S_E_PROVEEDORES", JSON.stringify(PROVEEDORES_PRECARGADOS));
    if (!localStorage.getItem("S_E_CLIENTES")) localStorage.setItem("S_E_CLIENTES", JSON.stringify(CLIENTES_PRECARGADOS));
    if (!localStorage.getItem("S_E_USUARIOS")) localStorage.setItem("S_E_USUARIOS", JSON.stringify(USUARIOS_PRECARGADOS));
    if (!localStorage.getItem("S_E_VENTAS")) localStorage.setItem("S_E_VENTAS", JSON.stringify([]));
    if (!localStorage.getItem("S_E_COMPRAS")) localStorage.setItem("S_E_COMPRAS", JSON.stringify([]));
}

// Ejecución inmediata al cargar el archivo JS
InicializarBaseDatos();

// =========================================================================
// 2. LÓGICA DE AUTENTICACIÓN ADAPTADA A MODALES E INTERFACES OMNICANAL
// =========================================================================
function LoginSistema() {
    // Soporte tanto para inputs del index clásico como del Modal unificado
    const userIn = (document.getElementById("username") || document.getElementById("loginUser")).value.trim();
    const passIn = (document.getElementById("password") || document.getElementById("loginPass")).value.trim();

    const usuarios = JSON.parse(localStorage.getItem("S_E_USUARIOS")) || USUARIOS_PRECARGADOS;
    const encontrado = usuarios.find(u => u.username === userIn && u.contrasena === passIn);

    if (encontrado) {
        sessionStorage.setItem("S_E_SESSION", JSON.stringify(encontrado));
        Swal.fire({
            icon: 'success',
            title: 'Acceso Autorizado',
            text: `Bienvenido(a) al sistema: ${encontrado.nombre}`,
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "dashboard.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error de Autenticación',
            text: 'Las credenciales ingresadas son incorrectas para el prototipo.'
        });
    }
}

function VerificarSesion() {
    const session = JSON.parse(sessionStorage.getItem("S_E_SESSION"));
    if (!session) {
        window.location.href = "index.html";
        return;
    }
    
    // Renderizado informativo de cabecera común
    if(document.getElementById("sessionName")) document.getElementById("sessionName").innerText = session.nombre;
    
    const badge = document.getElementById("userBadge");
    if(badge) {
        badge.innerText = `Rol: ${session.rol}`;
        
        // Control de vistas por jerarquías y despliegue de menús adaptativos en dashboard.html
        if (session.rol === "Administrador") {
            badge.className = "badge bg-success py-2 px-3 fw-bold";
            if(document.getElementById("menuSeguridad")) document.getElementById("menuSeguridad").style.display = "block";
            if(document.getElementById("menuInventario")) document.getElementById("menuInventario").style.display = "block";
            if(document.getElementById("menuVentas")) document.getElementById("menuVentas").style.display = "block";
            if(document.getElementById("menuCompras")) document.getElementById("menuCompras").style.display = "block";
            if(document.getElementById("menuReportes")) document.getElementById("menuReportes").style.display = "block";
            if(document.getElementById("menuCliente")) document.getElementById("menuCliente").style.display = "none";
        } else if (session.rol === "Vendedor") {
            badge.className = "badge bg-warning text-dark py-2 px-3 fw-bold";
            if(document.getElementById("menuSeguridad")) document.getElementById("menuSeguridad").style.display = "none";
            if(document.getElementById("menuInventario")) document.getElementById("menuInventario").style.display = "block";
            if(document.getElementById("menuVentas")) document.getElementById("menuVentas").style.display = "block";
            if(document.getElementById("menuCompras")) document.getElementById("menuCompras").style.display = "block";
            if(document.getElementById("menuReportes")) document.getElementById("menuReportes").style.display = "none";
            if(document.getElementById("menuCliente")) document.getElementById("menuCliente").style.display = "none";
        } else if (session.rol === "Cliente") {
            badge.className = "badge bg-info text-white py-2 px-3 fw-bold";
            // El cliente solo puede ver el módulo exclusivo y ventas para simular sus pedidos
            if(document.getElementById("menuSeguridad")) document.getElementById("menuSeguridad").style.display = "none";
            if(document.getElementById("menuInventario")) document.getElementById("menuInventario").style.display = "none";
            if(document.getElementById("menuVentas")) document.getElementById("menuVentas").style.display = "block";
            if(document.getElementById("menuCompras")) document.getElementById("menuCompras").style.display = "none";
            if(document.getElementById("menuReportes")) document.getElementById("menuReportes").style.display = "none";
            if(document.getElementById("menuCliente")) document.getElementById("menuCliente").style.display = "block";
            
            // Forzar vista inicial del cliente si se encuentra en el gestor
            CambiarSeccionDashboard('cliente');
        }
    }
}

function CerrarSesion() {
    sessionStorage.removeItem("S_E_SESSION");
    window.location.href = "index.html";
}

// Lógica de ruteo interno de paneles en el dashboard.html
function CambiarSeccionDashboard(seccion) {
    const modulos = ['inventario', 'ventas', 'compras', 'reportes', 'seguridad', 'cliente'];
    modulos.forEach(m => {
        const el = document.getElementById(`modulo-${m}`);
        if(el) el.style.display = (m === seccion) ? 'block' : 'none';
    });

    // Ejecuciones de refresco de datos específicas al cambiar de pestaña
    if(seccion === 'inventario') RenderizarInventario();
    if(seccion === 'ventas') RenderizarModuloVentas();
    if(seccion === 'compras') RenderizarModuloCompras();
    if(seccion === 'reportes') GenerarReportesEstadisticos();
    if(seccion === 'cliente') RenderizarModuloCliente();
}


// =========================================================================
// 3. MÓDULO INVENTARIO (RF-01, RF-02, RF-03)
// =========================================================================
function RenderizarInventario() {
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const tbody = document.getElementById("tablaInventario");
    if (!tbody) return;
    tbody.innerHTML = "";

    let stockBajoCount = 0;

    productos.forEach((p, index) => {
        const stockAlerta = p.stock <= 5 ? `<span class="badge bg-danger">BAJO STOCK: ${p.stock} u.</span>` : `<span>${p.stock} unidades</span>`;
        if(p.stock <= 5) stockBajoCount++;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="ps-4 fw-bold text-muted">#PRD-${String(p.id_producto).padStart(3, '0')}</td>
            <td><strong class="text-dark">${p.nombre_producto}</strong><br><small class="text-muted">${p.descripcion}</small></td>
            <td><span class="badge bg-light text-dark border">${p.categoria}</span></td>
            <td>${stockAlerta}</td>
            <td class="fw-bold">S/. ${p.precio.toFixed(2)}</td>
            <td><span class="badge bg-success-subtle text-success">${p.estado}</span></td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="PrepararEditarProducto(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="EliminarProducto(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    if(document.getElementById("txtAlertaStock")) {
        document.getElementById("txtAlertaStock").innerText = `${stockBajoCount} productos necesitan reposición inmediata`;
    }
}

function FiltrarInventario() {
    const search = document.getElementById("searchInven").value.toLowerCase();
    const cat = document.getElementById("filterCategory").value;
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const tbody = document.getElementById("tablaInventario");
    tbody.innerHTML = "";

    productos.forEach((p, index) => {
        const matchesSearch = p.nombre_producto.toLowerCase().includes(search) || p.descripcion.toLowerCase().includes(search);
        const matchesCat = cat === "" || p.categoria === cat;

        if (matchesSearch && matchesCat) {
            const stockAlerta = p.stock <= 5 ? `<span class="badge bg-danger">BAJO STOCK: ${p.stock} u.</span>` : `<span>${p.stock} unidades</span>`;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="ps-4 fw-bold text-muted">#PRD-${String(p.id_producto).padStart(3, '0')}</td>
                <td><strong class="text-dark">${p.nombre_producto}</strong><br><small class="text-muted">${p.descripcion}</small></td>
                <td><span class="badge bg-light text-dark border">${p.categoria}</span></td>
                <td>${stockAlerta}</td>
                <td class="fw-bold">S/. ${p.precio.toFixed(2)}</td>
                <td><span class="badge bg-success-subtle text-success">${p.estado}</span></td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="PrepararEditarProducto(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="EliminarProducto(${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function PrepararCrearProducto() {
    document.getElementById("modalProductoTitulo").innerText = "Registrar Mueble (RF-01)";
    document.getElementById("prodIndex").value = "";
    document.getElementById("prodNombre").value = "";
    document.getElementById("prodStock").value = "10";
    document.getElementById("prodPrecio").value = "500";
    document.getElementById("prodDescripcion").value = "";
}

function PrepararEditarProducto(index) {
    const session = JSON.parse(sessionStorage.getItem("S_E_SESSION"));
    if (session.rol !== "Administrador") {
        Swal.fire('Acceso Denegado', 'Solo el Administrador puede editar los atributos de catálogo.', 'warning');
        return;
    }

    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const p = productos[index];

    document.getElementById("modalProductoTitulo").innerText = "Actualizar Mueble (RF-02)";
    document.getElementById("prodIndex").value = index;
    document.getElementById("prodNombre").value = p.nombre_producto;
    document.getElementById("prodCategoria").value = p.categoria;
    document.getElementById("prodStock").value = p.stock;
    document.getElementById("prodPrecio").value = p.precio;
    document.getElementById("prodDescripcion").value = p.descripcion;

    const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
    modal.show();
}

function GuardarProducto() {
    const index = document.getElementById("prodIndex").value;
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));

    const nuevoProd = {
        id_producto: index !== "" ? productos[index].id_producto : productos.length + 1,
        nombre_producto: document.getElementById("prodNombre").value,
        categoria: document.getElementById("prodCategoria").value,
        stock: parseInt(document.getElementById("prodStock").value),
        precio: parseFloat(document.getElementById("prodPrecio").value),
        descripcion: document.getElementById("prodDescripcion").value,
        estado: "Activo"
    };

    if(index !== "") {
        productos[index] = nuevoProd;
    } else {
        productos.push(nuevoProd);
    }

    localStorage.setItem("S_E_PRODUCTOS", JSON.stringify(productos));
    bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
    Swal.fire('Éxito', 'Inventario centralizado actualizado correctamente.', 'success');
    RenderizarInventario();
}

// =========================================================================
// 4. MÓDULO VENTAS OMNICANAL EN TIEMPO REAL (RF-04, RF-05)
// =========================================================================
let carritoActual = [];

function RenderizarModuloVentas() {
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const catalogo = document.getElementById("catalogoVentas");
    if(!catalogo) return;
    catalogo.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-md-4 col-sm-6 mb-3";
        div.innerHTML = `
            <div class="card h-100 border p-3 shadow-sm">
                <span class="badge bg-secondary position-absolute top-0 end-0 m-2">STOCK: ${p.stock}</span>
                <div class="fw-bold mt-2 text-dark">${p.nombre_producto}</div>
                <div class="text-muted small mb-2">${p.categoria}</div>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <span class="fw-bold text-primary">S/. ${p.precio.toFixed(2)}</span>
                    <button class="btn btn-sm btn-primary" ${p.stock === 0 ? 'disabled' : ''} onclick="AgregarAlCarrito(${p.id_producto})">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                </div>
            </div>
        `;
        catalogo.appendChild(div);
    });

    // Control inteligente de clientes según el rol que use la terminal
    const session = JSON.parse(sessionStorage.getItem("S_E_SESSION"));
    const selectC = document.getElementById("selectCliente");
    if(selectC) {
        selectC.innerHTML = "";
        if (session.rol === "Cliente") {
            // Si es un cliente, se auto-selecciona a sí mismo fijando la venta
            selectC.innerHTML = `<option value="${session.id_cliente}" selected>${session.nombre}</option>`;
            selectC.disabled = true;
        } else {
            // Si es admin/vendedor puede vender a cualquiera de la lista global
            const clientes = JSON.parse(localStorage.getItem("S_E_CLIENTES"));
            selectC.disabled = false;
            clientes.forEach(c => {
                selectC.innerHTML += `<option value="${c.id_cliente}">${c.nombre} (RUC/DNI: ${c.RUC})</option>`;
            });
        }
    }

    ActualizarInterfazCarrito();
}

function AgregarAlCarrito(id) {
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const p = productos.find(x => x.id_producto === id);

    const itemEnCarro = carritoActual.find(x => x.id_producto === id);
    if (itemEnCarro) {
        if(itemEnCarro.cantidad + 1 > p.stock) {
            Swal.fire('Stock Insuficiente', 'No hay existencias disponibles en tiempo real.', 'warning');
            return;
        }
        itemEnCarro.cantidad++;
    } else {
        carritoActual.push({ id_producto: p.id_producto, nombre: p.nombre_producto, precio: p.precio, cantidad: 1 });
    }
    ActualizarInterfazCarrito();
}

function QuitarDelCarrito(id) {
    carritoActual = carritoActual.filter(x => x.id_producto !== id);
    ActualizarInterfazCarrito();
}

function ActualizarInterfazCarrito() {
    const tbody = document.getElementById("carritoVenta");
    if(!tbody) return;
    tbody.innerHTML = "";
    let subtotal = 0;

    carritoActual.forEach(item => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        tbody.innerHTML += `
            <tr>
                <td><small class="fw-bold text-dark">${item.nombre}</small></td>
                <td><span class="badge bg-light text-dark border">${item.cantidad}</span></td>
                <td>S/. ${totalItem.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger py-0 px-1" onclick="QuitarDelCarrito(${item.id_producto})">&times;</button></td>
            </tr>
        `;
    });

    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    if(document.getElementById("lblSubtotal")) document.getElementById("lblSubtotal").innerText = `S/. ${subtotal.toFixed(2)}`;
    if(document.getElementById("lblIgv")) document.getElementById("lblIgv").innerText = `S/. ${igv.toFixed(2)}`;
    if(document.getElementById("lblTotal")) document.getElementById("lblTotal").innerText = `S/. ${total.toFixed(2)}`;
}

function ProcesarVenta() {
    if (carritoActual.length === 0) {
        Swal.fire('Carrito Vacío', 'Agrega algún mueble del catálogo para procesar una orden.', 'info');
        return;
    }

    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const ventas = JSON.parse(localStorage.getItem("S_E_VENTAS")) || [];
    const idCliente = document.getElementById("selectCliente").value;
    const metodo = document.querySelector('input[name="metodoPago"]:checked').value;

    // Descontar existencias físicas en tiempo real
    carritoActual.forEach(item => {
        const p = productos.find(x => x.id_producto === item.id_producto);
        p.stock -= item.cantidad;
    });

    const totalFinal = carritoActual.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0) * 1.18;

    const nuevaVenta = {
        id_venta: ventas.length + 1,
        fecha_venta: new Date().toLocaleString(),
        total_venta: totalFinal,
        metodo_pago: metodo,
        id_cliente: parseInt(idCliente),
        productos: carritoActual
    };

    ventas.push(nuevaVenta);
    localStorage.setItem("S_E_PRODUCTOS", JSON.stringify(productos));
    localStorage.setItem("S_E_VENTAS", JSON.stringify(ventas));

    Swal.fire({
        icon: 'success',
        title: 'Operación Registrada',
        html: `
            <div class="text-start border p-3 rounded bg-light" style="font-family: monospace; font-size: 0.85rem;">
                <h6 class="text-center fw-bold mb-1">DISTRIBUIDORA S & E</h6>
                <p class="text-center small text-muted mb-2">COMPROBANTE TRANSACCIONAL</p>
                <hr class="my-2">
                <strong>Fecha:</strong> ${nuevaVenta.fecha_venta}<br>
                <strong>Método Pago:</strong> ${metodo}<br>
                <strong>Monto Total:</strong> S/. ${totalFinal.toFixed(2)}<br>
                <hr class="my-2">
                <small class="text-success text-center d-block">Sincronizado de inmediato con el catálogo virtual.</small>
            </div>
        `,
        confirmButtonText: 'Finalizar'
    });

    carritoActual = [];
    RenderizarModuloVentas();
    if(document.getElementById("modulo-inventario").style.display === "block") RenderizarInventario();
}

// =========================================================================
// 5. MÓDULO COMPRAS A PROVEEDORES (RF-06, RF-07)
// =========================================================================
function RenderizarModuloCompras() {
    const proveedores = JSON.parse(localStorage.getItem("S_E_PROVEEDORES"));
    const tbody = document.getElementById("tablaProveedores");
    if(!tbody) return;
    tbody.innerHTML = "";

    proveedores.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${p.nombre_proveedor}</strong><br><small class="text-muted">ID: #PRV-${p.id_proveedor}</small></td>
                <td><span class="badge bg-secondary-subtle text-dark">${p.categoria}</span></td>
                <td><small>${p.telefono}</small></td>
                <td>${p.calificacion}</td>
            </tr>
        `;
    });

    const selectP = document.getElementById("selectProveedor");
    if(selectP) {
        selectP.innerHTML = "";
        proveedores.forEach(p => {
            selectP.innerHTML += `<option value="${p.id_proveedor}">${p.nombre_proveedor}</option>`;
        });
    }

    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const selectPr = document.getElementById("selectProdCompra");
    if(selectPr) {
        selectPr.innerHTML = "";
        productos.forEach(prod => {
            selectPr.innerHTML += `<option value="${prod.id_producto}">${prod.nombre_producto} (Actual: ${prod.stock} u.)</option>`;
        });
    }
}

function ProcesarCompra() {
    const idProd = parseInt(document.getElementById("selectProdCompra").value);
    const cant = parseInt(document.getElementById("numCantCompra").value);
    const costo = parseFloat(document.getElementById("numCostoCompra").value);
    const idProv = document.getElementById("selectProveedor").value;

    if (cant <= 0 || costo <= 0) {
        Swal.fire('Error', 'Ingrese valores válidos de compra.', 'error');
        return;
    }

    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS"));
    const compras = JSON.parse(localStorage.getItem("S_E_COMPRAS")) || [];

    const p = productos.find(x => x.id_producto === idProd);
    p.stock += cant;

    const nuevaCompra = {
        id_compra: compras.length + 1,
        fecha_compra: new Date().toLocaleString(),
        total_compra: cant * costo,
        id_proveedor: idProv,
        id_producto: idProd,
        cantidad: cant
    };

    compras.push(nuevaCompra);
    localStorage.setItem("S_E_PRODUCTOS", JSON.stringify(productos));
    localStorage.setItem("S_E_COMPRAS", JSON.stringify(compras));

    Swal.fire('Reabastecimiento Exitoso', `Stock incrementado. Nuevo inventario: ${p.stock} u.`, 'success');
    RenderizarModuloCompras();
}

// =========================================================================
// 6. CONTROL COMERCIAL Y REPORTES (RF-08)
// =========================================================================
function GenerarReportesEstadisticos() {
    const ventas = JSON.parse(localStorage.getItem("S_E_VENTAS")) || [];
    const productos = JSON.parse(localStorage.getItem("S_E_PRODUCTOS")) || [];
    const clientes = JSON.parse(localStorage.getItem("S_E_CLIENTES")) || [];

    const totalDineroVentas = ventas.reduce((acc, curr) => acc + curr.total_venta, 0);
    const stockBajoCount = productos.filter(p => p.stock <= 5).length;

    if(document.getElementById("repTotalVentas")) document.getElementById("repTotalVentas").innerText = `S/. ${totalDineroVentas.toFixed(2)}`;
    if(document.getElementById("repStockBajo")) document.getElementById("repStockBajo").innerText = `${stockBajoCount} SKU`;
    if(document.getElementById("repTotalClientes")) document.getElementById("repTotalClientes").innerText = clientes.length;

    const tbody = document.getElementById("repTablaTop");
    if(!tbody) return;
    tbody.innerHTML = "";
    productos.slice(0, 4).forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td><small class="fw-bold text-dark">${p.nombre_producto}</small></td>
                <td><span class="badge bg-light text-dark border">${p.categoria}</span></td>
                <td><span class="badge ${p.stock <= 5 ? 'bg-danger':'bg-success'}">${p.stock} u.</span></td>
                <td class="small fw-bold">S/. ${p.precio}</td>
            </tr>
        `;
    });
}

// =========================================================================
// 7. MÓDULO NUEVO Y EXCLUSIVO: EXPERIENCIA DEL CLIENTE (MIS COMPRAS / PERFIL)
// =========================================================================
function RenderizarModuloCliente() {
    const session = JSON.parse(sessionStorage.getItem("S_E_SESSION"));
    if (!session || session.rol !== "Cliente") return;

    // 1. Renderizar Datos del Perfil del Cliente enlazados
    if(document.getElementById("cliPerfilNombre")) document.getElementById("cliPerfilNombre").innerText = session.nombre;
    if(document.getElementById("cliPerfilUser")) document.getElementById("cliPerfilUser").innerText = `@${session.username}`;
    if(document.getElementById("cliPerfilID")) document.getElementById("cliPerfilID").innerText = `#CLI-${String(session.id_cliente).padStart(3, '0')}`;

    // 2. Historial de compras filtrado por ID único de cliente logueado
    const ventasGlobales = JSON.parse(localStorage.getItem("S_E_VENTAS")) || [];
    const misCompras = ventasGlobales.filter(v => v.id_cliente === session.id_cliente);
    
    const tbody = document.getElementById("tablaMisComprasCliente");
    if (!tbody) return;
    tbody.innerHTML = "";

    if(misCompras.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-3">Aún no has registrado ninguna compra en este prototipo.</td></tr>`;
        return;
    }

    misCompras.forEach(c => {
        // Mapear string de productos comprados para la celda descriptiva
        const listaProd = c.productos.map(p => `${p.nombre} (x${p.cantidad})`).join(', ');
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="fw-bold text-primary">#FAC-${String(c.id_venta).padStart(3, '0')}</span></td>
            <td><small class="text-muted">${c.fecha_venta}</small></td>
            <td><div class="small fw-semibold text-dark text-truncate" style="max-width: 250px;">${listaProd}</div></td>
            <td class="fw-bold text-success">S/. ${c.total_venta.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}
function RenderizarModuloClientes() {
    const clientes = JSON.parse(localStorage.getItem("S_E_CLIENTES")) || CLIENTES_PRECARGADOS;
    const tbody = document.getElementById("tablaClientes");

    if (!tbody) return;

    tbody.innerHTML = "";

    clientes.forEach((c, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${c.RUC}</td>
            <td>${c.nombre}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning">Editar</button>
                <button class="btn btn-sm btn-danger">Eliminar</button>
            </td>
        </tr>`;
    });
}
function PrepararCrearCliente() {
    document.getElementById("modalClienteTitulo").innerText = "Registrar Cliente";
    document.getElementById("clienteIndex").value = "";
    document.getElementById("cliDocumento").value = "";
    document.getElementById("cliNombre").value = "";
    document.getElementById("cliTelefono").value = "";
    document.getElementById("cliCorreo").value = "";
    document.getElementById("cliDireccion").value = "";
}
function PrepararCrearUsuario() {
    document.getElementById("modalUsuarioTitulo").innerText = "Registrar Usuario";
    document.getElementById("usrIndex").value = "";
    document.getElementById("usrNombreReal").value = "";
    document.getElementById("usrUsername").value = "";
    document.getElementById("usrPassword").value = "";
    document.getElementById("usrRol").value = "Vendedor";
}
// Bucle secundario automático para renderizar la tabla de usuarios del módulo administrativo
setInterval(() => {
    const tbody = document.getElementById("tablaUsuarios");
    if(tbody && tbody.children.length === 0) {
        const usuarios = JSON.parse(localStorage.getItem("S_E_USUARIOS")) || USUARIOS_PRECARGADOS;
        usuarios.forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td><div class="fw-bold text-dark">${u.nombre}</div><small class="text-muted">@${u.username}</small></td>
                    <td><span class="badge bg-primary px-2 py-1">${u.rol}</span></td>
                    <td><span class="text-success small fw-bold"><i class="fas fa-circle fs-9 me-1"></i> Activo</span></td>
                </tr>
            `;
        });
    }
}, 1000);