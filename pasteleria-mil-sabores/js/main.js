/*
  -------------------------------------------------
  JS - PASTELERÍA MIL SABORES
  Archivo: main.js
  Descripción: Lógica principal del sitio
  (Listado de productos, carrito, sesión)
  -------------------------------------------------
*/

// --- 1. BASE DE DATOS DE PRODUCTOS ---
// [Requisito: "Crear un arreglo de productos"]
const productosDB = [
  {
    codigo: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    categoria: "Tortas Cuadradas",
    precio: 45000,
    descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
    imagen: "../assets/img/productos/torta-chocolate.jpg"
  },
  {
    codigo: "TC002",
    nombre: "Torta Cuadrada de Frutas",
    categoria: "Tortas Cuadradas",
    precio: 50000,
    descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.",
    imagen: "../assets/img/productos/torta-frutas.jpg"
  },
  {
    codigo: "TT001",
    nombre: "Torta Circular de Vainilla",
    categoria: "Tortas Circulares",
    precio: 40000,
    descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.",
    imagen: "../assets/img/productos/torta-vainilla.jpg"
  },
  {
    codigo: "TT002",
    nombre: "Torta Circular de Manjar",
    categoria: "Tortas Circulares",
    precio: 42000,
    descripcion: "Torta tradicional chilena con manjar y nueces, un deleite clásico.",
    imagen: "../assets/img/productos/torta-manjar.jpg"
  },
  {
    codigo: "PI001",
    nombre: "Mousse de Chocolate",
    categoria: "Postres Individuales",
    precio: 5000,
    descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
    imagen: "../assets/img/productos/mousse-chocolate.jpg"
  },
  {
    codigo: "PI002",
    nombre: "Tiramisú Clásico",
    categoria: "Postres Individuales",
    precio: 5500,
    descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao.",
    imagen: "../assets/img/productos/tiramisu.jpg"
  },
  {
    codigo: "PSA001",
    nombre: "Torta Sin Azúcar de Naranja",
    categoria: "Productos Sin Azúcar",
    precio: 48000,
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones saludables.",
    imagen: "../assets/img/productos/torta-naranja-saz.jpg"
  },
  {
    codigo: "PG001",
    nombre: "Brownie Sin Gluten",
    categoria: "Productos Sin Gluten",
    precio: 4000,
    descripcion: "Rico y denso, este brownie es perfecto para evitar el gluten sin sacrificar el sabor.",
    imagen: "../assets/img/productos/brownie-sg.jpg"
  },
  {
    codigo: "PV001",
    nombre: "Torta Vegana de Chocolate",
    categoria: "Productos Vegana",
    precio: 50000,
    descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.",
    imagen: "../assets/img/productos/torta-vegana.jpg"
  }
  // (Podríamos añadir los 16 productos del PDF aquí)
];


// --- 1.1 BASE DE DATOS DEL CARRITO ---
// [Requisito: "Guardar información del carrito en LOCALSTORAGE"]

// Intentamos leer el carrito desde localStorage.
// Si no existe, creamos un arreglo vacío [].
// 'JSON.parse' convierte el texto de localStorage de nuevo en un arreglo.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
/* -------------------------------------------------*/

// --- 2. LÓGICA DE CARGA DE PÁGINAS ---
document.addEventListener('DOMContentLoaded', () => {
  
  // CHEQUEO 1: ¿Página de Tienda?
  const productGrid = document.getElementById('tienda-product-grid');
  if (productGrid) {
    cargarProductos(productosDB);
  }

  // CHEQUEO 2: ¿Página de Detalle de Producto?
  const detalleProductoLayout = document.querySelector('.product-detail-layout');
  if (detalleProductoLayout) {
    cargarDetalleProducto();
  }

  // CHEQUEO 3: ¿Formulario de añadir al carrito?
  const formularioCarrito = document.getElementById('add-to-cart-form');
  if (formularioCarrito) {
    formularioCarrito.addEventListener('submit', (event) => {
      event.preventDefault(); 
      manejarAnadirAlCarrito(event.target);
    });
  }

  // -----
  // CHEQUEO 4 (NUEVO): ¿Estamos en la página del Carrito?
  // -----
  const cartItemsList = document.getElementById('cart-items-list');
  if (cartItemsList) {
    cargarPaginaCarrito();
  }

  // CHEQUEO 5 (NUEVO): ¿Estamos en una página con selectores de Región?
  // (Esto funcionará para registro.html y usuarios-form.html)
  // -----
  const regionSelect = document.getElementById('reg-region') || document.getElementById('user-region');
  if (regionSelect) {
    cargarRegiones(regionSelect); // Llama a la función para llenar las regiones

    // Añadimos un "oyente" para cuando el usuario cambie la región
    regionSelect.addEventListener('change', (event) => {
      // Obtenemos el ID de la comuna correspondiente
      const comunaSelectId = (regionSelect.id === 'reg-region') ? 'reg-comuna' : 'user-comuna';
      cargarComunas(event.target.value, comunaSelectId); // Llama a la función para llenar comunas
    });
  }
  // CHEQUEO 6 (NUEVO): Lógica de "Cerrar Sesión"
  // -----
  const logoutLink = document.getElementById('logout-link'); // Botón de la tienda
  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      cerrarSesion();
    });
  }

  const adminLogoutLink = document.getElementById('admin-logout-link'); // Botón del admin
  if (adminLogoutLink) {
    adminLogoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      cerrarSesion();
    });
  }


  // CHEQUEO 7 (NUEVO): ¿Estamos en la página de Perfil?
  // -----
  const profileEmail = document.getElementById('profile-email');
  if (profileEmail) {
    cargarPaginaPerfil();
  }
  


  // --- ACTUALIZACIONES GLOBALES ---
  actualizarIconoCarrito(); 
  actualizarEstadoSesion(); // <-- ¡NUEVO! Revisa si la sesión está iniciada
  
  

});

/**
 * Función para cargar y "pintar" los productos en el HTML.
 * @param {Array} productosAMostrar - El arreglo de productos a pintar.
 */
function cargarProductos(productosAMostrar) {
  
  // Buscamos el contenedor (de nuevo, por si acaso)
  const productGrid = document.getElementById('tienda-product-grid');
  
  // Limpiamos el contenedor por si tenía algo (ej. "Cargando...")
  productGrid.innerHTML = ''; 

  // Recorremos el arreglo de productos
  productosAMostrar.forEach(producto => {
    
    // Creamos un nuevo <article>
    const productoCard = document.createElement('article');
    
    // Le añadimos la clase CSS que YA creamos (¡Coherencia!)
    productoCard.classList.add('product-card');

    // Creamos el contenido HTML de la tarjeta
    // Usamos las clases que ya tienen estilo en style.css
    productoCard.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>$${producto.precio.toLocaleString('es-CL')}</p> 
      <a href="producto.html?codigo=${producto.codigo}" class="btn-secundario">Ver detalle</a>
    `;
    // Nota: Usamos .toLocaleString('es-CL') para formatear 45000 a $45.000

    // Añadimos la nueva tarjeta al grid
    productGrid.appendChild(productoCard);
  });
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 3. LÓGICA DE DETALLE DE PRODUCTO ---

/**
 * Función para cargar el detalle de un producto
 * leyendo el código de la URL (Query Params).
 */
function cargarDetalleProducto() {
  
  // 1. LEER LA URL
  // Obtenemos los parámetros de la URL (ej: ?codigo=TC001)
  const params = new URLSearchParams(window.location.search);
  const codigoProducto = params.get('codigo');

  // Si no hay código en la URL, no podemos hacer nada.
  if (!codigoProducto) {
    // Redirigimos a la tienda para evitar una página vacía
    window.location.href = 'tienda.html';
    return;
  }

  // 2. BUSCAR EL PRODUCTO
  // Usamos .find() para buscar en nuestra base de datos (productosDB)
  const productoEncontrado = productosDB.find(producto => producto.codigo === codigoProducto);

  // 3. PINTAR LOS DATOS (o mostrar error)
  const infoContenedor = document.querySelector('.product-info');
  
  if (!productoEncontrado) {
    // Si el código es falso (ej. ?codigo=FAKE), mostramos un error
    infoContenedor.innerHTML = `
      <h2>Producto no encontrado</h2>
      <p>El producto que buscas no existe o fue removido.</p>
      <a href="tienda.html" class="btn-secundario">Volver a la Tienda</a>
    `;
    return;
  }

  // 4. SI LO ENCONTRAMOS, actualizamos el HTML:
  
  // Seleccionamos los elementos de la plantilla
  const tituloEl = document.querySelector('.product-title');
  const precioEl = document.querySelector('.product-price');
  const descripcionEl = document.querySelector('.product-description');
  const imagenPrincipalEl = document.querySelector('.gallery-main-image img');
  const formularioEl = document.getElementById('add-to-cart-form');
  
  // Reemplazamos el contenido estático por el del producto
  tituloEl.textContent = productoEncontrado.nombre;
  precioEl.textContent = `$${productoEncontrado.precio.toLocaleString('es-CL')}`;
  descripcionEl.textContent = productoEncontrado.descripcion;
  imagenPrincipalEl.src = productoEncontrado.imagen;
  imagenPrincipalEl.alt = productoEncontrado.nombre;

  // IMPORTANTE: Guardamos el código del producto en el formulario
  // para que el botón "Añadir al carrito" sepa qué producto es.
  formularioEl.setAttribute('data-codigo', productoEncontrado.codigo);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 4. LÓGICA DEL CARRITO DE COMPRAS ---

/**
 * Función que se ejecuta al presionar "Añadir al carrito".
 * @param {HTMLFormElement} formulario - El formulario que se envió.
 */
// --- 4. LÓGICA DEL CARRITO DE COMPRAS ---
function manejarAnadirAlCarrito(formulario) {
  
  // 1. OBTENER LOS DATOS...
  const codigo = formulario.getAttribute('data-codigo');
  const cantidadInput = document.getElementById('product-quantity');
  const mensajeInput = document.getElementById('product-custom-msg');
  const cantidad = parseInt(cantidadInput.value);
  const mensaje = mensajeInput.value;

  // 2. BUSCAR EL PRODUCTO...
  const productoDB = productosDB.find(p => p.codigo === codigo);
  if (!productoDB) {
    alert("Error: Producto no encontrado. Intente de nuevo.");
    return;
  }

  // 3. AÑADIR O ACTUALIZAR...
  const itemEnCarrito = carrito.find(item => item.codigo === codigo);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({
      codigo: productoDB.codigo,
      nombre: productoDB.nombre,
      precio: productoDB.precio,
      imagen: productoDB.imagen,
      cantidad: cantidad,
      mensaje: mensaje 
    });
  }

  // 4. GUARDAR EN LOCALSTORAGE...
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // 5. DAR FEEDBACK...
  alert("¡Producto añadido al carrito!");

  // -----
  // ACTUALIZACIÓN GLOBAL (NUEVO)
  // -----
  // Actualiza el ícono INMEDIATAMENTE
  actualizarIconoCarrito();
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 5. LÓGICA DE ACTUALIZACIÓN VISUAL DEL CARRITO ---

/**
 * Función para actualizar el número en el ícono del carrito
 * en el header.
 */
function actualizarIconoCarrito() {
  // Buscamos el enlace del carrito en el header
  const cartLink = document.getElementById('cart-link');
  
  if (cartLink) {
    // Calculamos el total de items (sumando las cantidades)
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    // Actualizamos el texto
    cartLink.textContent = `Carrito (${totalItems})`;
  }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 6. LÓGICA DE LA PÁGINA DEL CARRITO ---

/**
 * Función para "pintar" la página del carrito (tienda/carrito.html)
 * leyendo los datos del arreglo 'carrito' (sincronizado con localStorage).
 */
function cargarPaginaCarrito() {
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalValue = document.getElementById('cart-total-value');
  
  // 1. Limpiamos el contenido estático
  cartItemsList.innerHTML = '';

  // 2. Revisamos si el carrito está vacío
  if (carrito.length === 0) {
    cartItemsList.innerHTML = `
      <p class="cart-empty-message">Tu carrito de compras está vacío.</p>
      <a href="tienda.html" class="btn-secundario">Ir a la Tienda</a>
    `;
    cartTotalValue.textContent = '$0';
    return;
  }

  // 3. Si hay productos, los "pintamos"
  let totalCalculado = 0;

  carrito.forEach(item => {
    // Creamos un nuevo <article>
    const itemCard = document.createElement('article');
    itemCard.classList.add('cart-item');

    // Calculamos el subtotal de este ítem
    const subtotalItem = item.precio * item.cantidad;
    // Sumamos al total general
    totalCalculado += subtotalItem;

    // Creamos el HTML del ítem
    itemCard.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
      
      <div class="cart-item-details">
        <h4>${item.nombre}</h4>
        <p>Mensaje: ${item.mensaje || 'Ninguno'}</p>
        <span class="cart-item-price">$${item.precio.toLocaleString('es-CL')} c/u</span>
      </div>
      
      <div class="cart-item-quantity">
        <label for="qty-${item.codigo}">Cantidad:</label>
        <input 
          type="number" 
          id="qty-${item.codigo}" 
          value="${item.cantidad}" 
          min="1" 
          class="input-quantity"
          data-codigo="${item.codigo}" 
          onchange="actualizarCantidad(this.dataset.codigo, this.value)">
      </div>

      <div class="cart-item-subtotal">
        <p>Subtotal:</p>
        <span>$${subtotalItem.toLocaleString('es-CL')}</span>
      </div>
      
      <button 
        class="cart-item-remove" 
        data-codigo="${item.codigo}"
        onclick="eliminarDelCarrito(this.dataset.codigo)">
        Eliminar
      </button>
    `;

    // Añadimos la tarjeta a la lista
    cartItemsList.appendChild(itemCard);
  });

  // 4. Actualizamos el TOTAL
  cartTotalValue.textContent = `$${totalCalculado.toLocaleString('es-CL')}`;
}

/**
 * Función que se llama al presionar el botón "Eliminar" en un ítem del carrito.
 * @param {string} codigo - El código del producto a eliminar.
 */
function eliminarDelCarrito(codigo) {
  // Confirmamos con el usuario
  if (confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) {
    
    // Filtramos el arreglo, creando uno nuevo SIN el producto eliminado
    carrito = carrito.filter(item => item.codigo !== codigo);

    // Actualizamos localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizamos la vista (el ícono y la página del carrito)
    actualizarIconoCarrito();
    cargarPaginaCarrito(); // Volvemos a "pintar" la página del carrito
  }
}

/**
 * Función que se llama al cambiar el número en el input "Cantidad".
 * @param {string} codigo - El código del producto a actualizar.
 * @param {string} nuevaCantidad - La nueva cantidad (viene como texto).
 */
function actualizarCantidad(codigo, nuevaCantidad) {
  const cantidadNum = parseInt(nuevaCantidad);

  // Buscamos el ítem en el carrito
  const itemEnCarrito = carrito.find(item => item.codigo === codigo);

  if (itemEnCarrito && cantidadNum > 0) {
    // Actualizamos la cantidad
    itemEnCarrito.cantidad = cantidadNum;

    // Actualizamos localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizamos la vista
    actualizarIconoCarrito();
    cargarPaginaCarrito(); // Volvemos a "pintar" todo para recalcular subtotales y total
  }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 7. LÓGICA DE SELECTORES REGIÓN/COMUNA ---
// [Requisito: Anexo 1, "Al momento de cambiar una región..."]

/**
 * Carga las regiones en el <select> de regiones.
 * Asume que 'RegionesYComunas' existe (desde regiones.js).
 * @param {HTMLSelectElement} regionSelect - El <select> de regiones.
 */
function cargarRegiones(regionSelect) {
  // Verificamos si la variable de regiones.js cargó
  if (typeof RegionesYComunas === 'undefined') {
    console.error("El archivo regiones.js no se cargó o no contiene 'RegionesYComunas'.");
    return;
  }

  // Iteramos sobre el arreglo y creamos un <option> por cada región
  RegionesYComunas.regiones.forEach(region => {
    const option = document.createElement('option');
    option.value = region.region_iso_3166_2; // Ej: "CL-AN"
    option.textContent = region.region; // Ej: "Antofagasta"
    regionSelect.appendChild(option);
  });
}

/**
 * Carga las comunas en el <select> de comunas,
 * basado en la región seleccionada.
 * @param {string} regionISO - El ISO de la región (ej: "CL-AN").
 * @param {string} comunaSelectId - El ID del <select> de comunas.
 */
function cargarComunas(regionISO, comunaSelectId) {
  const comunaSelect = document.getElementById(comunaSelectId);
  
  // 1. Limpiamos las comunas anteriores
  comunaSelect.innerHTML = '<option value="">Seleccione una comuna...</option>';

  if (!regionISO) return; // Si seleccionó "Seleccione...", no hagas nada

  // 2. Encontramos la región en nuestra "base de datos"
  const regionEncontrada = RegionesYComunas.regiones.find(r => r.region_iso_3166_2 === regionISO);

  if (!regionEncontrada) return;

  // 3. Iteramos sobre las comunas de esa región
  regionEncontrada.comunas.forEach(comuna => {
    const option = document.createElement('option');
    option.value = comuna; // Ej: "San Pedro de Atacama"
    option.textContent = comuna;
    comunaSelect.appendChild(option);
  });
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 8. LÓGICA DE SESIÓN (LOGIN/LOGOUT) ---

/**
 * Revisa el localStorage para ver si el usuario inició sesión
 * y actualiza el header (oculta/muestra enlaces) BASADO EN EL ROL.
 */
function actualizarEstadoSesion() {
  // 1. Revisar estado y rol
  const estaLogueado = localStorage.getItem('usuarioLogueado') === 'true';
  const rol = localStorage.getItem('rol'); // 'cliente' o 'admin'

  // 2. Seleccionar TODOS los grupos de enlaces
  const linksPublicos = document.querySelectorAll('.nav-publico');
  const linksCliente = document.querySelectorAll('.nav-cliente');
  const linksAdmin = document.querySelectorAll('.nav-admin');
  const linksLogueado = document.querySelectorAll('.nav-logueado');

  if (estaLogueado) {
    // --- ESTÁ LOGUEADO ---
    
    // Ocultar "Login/Registro"
    linksPublicos.forEach(link => link.style.display = 'none');
    
    // Mostrar "Cerrar Sesión" (para ambos roles)
    linksLogueado.forEach(link => link.style.display = 'block');

    if (rol === 'admin') {
      // Es ADMIN: Mostrar "Panel Admin"
      linksAdmin.forEach(link => link.style.display = 'block');
      // Ocultar "Mi Perfil" (por si acaso)
      linksCliente.forEach(link => link.style.display = 'none');
    } else {
      // Es CLIENTE: Mostrar "Mi Perfil"
      linksCliente.forEach(link => link.style.display = 'block');
      // Ocultar "Panel Admin" (por si acaso)
      linksAdmin.forEach(link => link.style.display = 'none');
    }
    
  } else {
    // --- NO ESTÁ LOGUEADO ---
    
    // Mostrar "Login/Registro"
    linksPublicos.forEach(link => link.style.display = 'block');
    
    // Ocultar todos los enlaces privados
    linksCliente.forEach(link => link.style.display = 'none');
    linksAdmin.forEach(link => link.style.display = 'none');
    linksLogueado.forEach(link => link.style.display = 'none');
  }
}

/**
 * Cierra la sesión del usuario borrando los ítems
 * de localStorage y redirigiendo al home.
 * [VERSIÓN ACTUALIZADA PARA BORRAR DESCUENTOS]
 */
function cerrarSesion() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    // Borramos los ítems de sesión
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('rol');
    localStorage.removeItem('userEmail');
    
    // ¡NUEVO! Borramos los descuentos
    localStorage.removeItem('descuentoEdad');
    localStorage.removeItem('descuentoCodigo');

    // (Opcional: también podríamos borrar el carrito)
    // localStorage.removeItem('carrito');

    // Redirigimos al Home (donde se verá como "público")
    alert("Sesión cerrada exitosamente.");
    window.location.href = 'index.html';
  }
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 9. LÓGICA DE LA PÁGINA DE PERFIL ---

/**
 * Carga la información del usuario (guardada en localStorage)
 * en la página de perfil.html.
 * [VERSIÓN ACTUALIZADA PARA LEER DESCUENTOS]
 */
function cargarPaginaPerfil() {
  const emailElement = document.getElementById('profile-email');
  const rolElement = document.getElementById('profile-rol');
  const descuentosElement = document.getElementById('profile-descuentos'); // <-- Elemento nuevo

  // Leemos la información guardada en el login
  const emailGuardado = localStorage.getItem('userEmail');
  const rolGuardado = localStorage.getItem('rol');
  
  // ¡NUEVO! Leemos los descuentos guardados en el registro
  const dctoEdad = localStorage.getItem('descuentoEdad');
  const dctoCodigo = localStorage.getItem('descuentoCodigo');

  if (emailGuardado && rolGuardado) {
    emailElement.textContent = emailGuardado;
    rolElement.textContent = rolGuardado.charAt(0).toUpperCase() + rolGuardado.slice(1);

    // --- Lógica para mostrar descuentos ---
    let descuentosTexto = [];
    if (dctoEdad) {
      descuentosTexto.push(`Descuento por Edad (${dctoEdad})`);
    }
    if (dctoCodigo) {
      descuentosTexto.push(`Descuento Promocional (${dctoCodigo})`);
    }

    if (descuentosTexto.length > 0) {
      // Si hay descuentos, los une con una coma
      descuentosElement.textContent = descuentosTexto.join(', '); 
    } else {
      // Si no hay ninguno
      descuentosElement.textContent = "Ninguno activo";
    }
    // --- Fin de la lógica ---

  } else {
    // Si el usuario llegó aquí sin iniciar sesión
    emailElement.textContent = "No has iniciado sesión.";
    rolElement.textContent = "N/A";
    descuentosElement.textContent = "N/A";
  }
}