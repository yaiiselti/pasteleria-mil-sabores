/*
  -------------------------------------------------
  JS - PASTELERÍA MIL SABORES
  Archivo: main.js
  Descripción: Lógica principal del sitio
  (Listado de productos, carrito, sesión)
  -------------------------------------------------
*/

// --- 1. BASE DE DATOS DE PRODUCTOS ---
// [NUEVA VERSIÓN CON ARREGLO DE IMÁGENES PARA LA GALERÍA]
const productosDB = [
  {
    codigo: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    categoria: "Tortas Cuadradas",
    precio: 45000,
    descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
    // AHORA ES UN ARREGLO
    imagenes: [
      "../assets/img/productos/torta-chocolate-1.png", // Imagen Principal
      "../assets/img/productos/torta-chocolate-2.png", // Thumbnail 1
      "../assets/img/productos/torta-chocolate-3.png", // Thumbnail 2
      "../assets/img/productos/torta-chocolate-1.png"  // Thumbnail 3
    ]
  },
  {
    codigo: "TC002",
    nombre: "Torta Cuadrada de Frutas",
    categoria: "Tortas Cuadradas",
    precio: 50000,
    descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
    imagenes: [
      "../assets/img/productos/torta-frutas-1.png",
      "../assets/img/productos/torta-frutas-2.png",
      "../assets/img/productos/torta-frutas-3.png",
      "../assets/img/productos/torta-frutas-1.png"
    ]
  },
  {
    codigo: "TT001",
    nombre: "Torta Circular de Vainilla",
    categoria: "Tortas Circulares",
    precio: 40000,
    descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
    imagenes: [
      "../assets/img/productos/torta-vainilla-1.png",
      "../assets/img/productos/torta-vainilla-2.png",
      "../assets/img/productos/torta-vainilla-3.png",
      "../assets/img/productos/torta-vainilla-1.png"
    ]
  },
  // ... (Y así con todos los 16 productos) ...
  // (He completado el resto de la base de datos con la misma estructura)
  {
    codigo: "TT002",
    nombre: "Torta Circular de Manjar",
    categoria: "Tortas Circulares",
    precio: 42000,
    descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    imagenes: [
      "../assets/img/productos/torta-manjar-1.png",
      "../assets/img/productos/torta-manjar-2.png",
      "../assets/img/productos/torta-manjar-3.png",
      "../assets/img/productos/torta-manjar-1.png"
    ]
  },
  {
    codigo: "PI001",
    nombre: "Mousse de Chocolate",
    categoria: "Postres Individuales",
    precio: 5000,
    descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
    imagenes: [
      "../assets/img/productos/mousse-chocolate-1.png",
      "../assets/img/productos/mousse-chocolate-2.png",
      "../assets/img/productos/mousse-chocolate-3.png",
      "../assets/img/productos/mousse-chocolate-1.png"
    ]
  },
  {
    codigo: "PI002",
    nombre: "Tiramisú Clásico",
    categoria: "Postres Individuales",
    precio: 5500,
    descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
    imagenes: [
      "../assets/img/productos/tiramisu-1.png",
      "../assets/img/productos/tiramisu-2.png",
      "../assets/img/productos/tiramisu-3.png",
      "../assets/img/productos/tiramisu-1.png"
    ]
  },
  {
    codigo: "PSA001",
    nombre: "Torta Sin Azúcar de Naranja",
    categoria: "Productos Sin Azúcar",
    precio: 48000,
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
    imagenes: [
      "../assets/img/productos/torta-naranja-1.png",
      "../assets/img/productos/torta-naranja-2.png",
      "../assets/img/productos/torta-naranja-3.png",
      "../assets/img/productos/torta-naranja-1.png"
    ]
  },
  {
    codigo: "PSA002",
    nombre: "Cheesecake Sin Azúcar",
    categoria: "Productos Sin Azúcar",
    precio: 47000,
    descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
    imagenes: [
      "../assets/img/productos/cheesecake-1.png",
      "../assets/img/productos/cheesecake-2.png",
      "../assets/img/productos/cheesecake-3.png",
      "../assets/img/productos/cheesecake-1.png"
    ]
  },
  {
    codigo: "PT001",
    nombre: "Empanada de Manzana",
    categoria: "Pastelería Tradicional",
    precio: 3000,
    descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
    imagenes: [
      "../assets/img/productos/empanada-manzana-1.png",
      "../assets/img/productos/empanada-manzana-2.png",
      "../assets/img/productos/empanada-manzana-3.png",
      "../assets/img/productos/empanada-manzana-1.png"
    ]
  },
  {
    codigo: "PT002",
    nombre: "Tarta de Santiago",
    categoria: "Pastelería Tradicional",
    precio: 6000,
    descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
    imagenes: [
      "../assets/img/productos/tarta-santiago-1.png",
      "../assets/img/productos/tarta-santiago-2.png",
      "../assets/img/productos/tarta-santiago-3.png",
      "../assets/img/productos/tarta-santiago-1.png"
    ]
  },
  {
    codigo: "PG001",
    nombre: "Brownie Sin Gluten",
    categoria: "Productos Sin Gluten",
    precio: 4000,
    descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
    imagenes: [
      "../assets/img/productos/brownie-sg-1.png",
      "../assets/img/productos/brownie-sg-2.png",
      "../assets/img/productos/brownie-sg-3.png",
      "../assets/img/productos/brownie-sg-1.png"
    ]
  },
  {
    codigo: "PG002",
    nombre: "Pan Sin Gluten",
    categoria: "Productos Sin Gluten",
    precio: 3500,
    descripcion: "Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida.",
    imagenes: [
      "../assets/img/productos/pan-sg-1.png",
      "../assets/img/productos/pan-sg-2.png",
      "../assets/img/productos/pan-sg-3.png",
      "../assets/img/productos/pan-sg-1.png"
    ]
  },
  {
    codigo: "PV001",
    nombre: "Torta Vegana de Chocolate",
    categoria: "Productos Vegana",
    precio: 50000,
    descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
    imagenes: [
      "../assets/img/productos/torta-vegana-1.png",
      "../assets/img/productos/torta-vegana-2.png",
      "../assets/img/productos/torta-vegana-3.png",
      "../assets/img/productos/torta-vegana-1.png"
    ]
  },
  {
    codigo: "PV002",
    nombre: "Galletas Veganas de Avena",
    categoria: "Productos Vegana",
    precio: 4500,
    descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
    imagenes: [
      "../assets/img/productos/galletas-veganas-1.png",
      "../assets/img/productos/galletas-veganas-2.png",
      "../assets/img/productos/galletas-veganas-3.png",
      "../assets/img/productos/galletas-veganas-1.png"
    ]
  },
  {
    codigo: "TE001",
    nombre: "Torta Especial de Cumpleaños",
    categoria: "Tortas Especiales",
    precio: 55000,
    descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
    imagenes: [
      "../assets/img/productos/torta-cumpleaños-1.png",
      "../assets/img/productos/torta-cumpleaños-2.png",
      "../assets/img/productos/torta-cumpleaños-3.png",
      "../assets/img/productos/torta-cumpleaños-1.png"
    ]
  },
  {
    codigo: "TE002",
    nombre: "Torta Especial de Boda",
    categoria: "Tortas Especiales",
    precio: 60000,
    descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    imagenes: [
      "../assets/img/productos/torta-boda-1.png",
      "../assets/img/productos/torta-boda-2.png",
      "../assets/img/productos/torta-boda-3.png",
      "../assets/img/productos/torta-boda-1.png"
    ]
  }
];


// --- 1.1 BASE DE DATOS DEL CARRITO ---
// [Requisito: "Guardar información del carrito en LOCALSTORAGE"]

// Intentamos leer el carrito desde localStorage.
// Si no existe, creamos un arreglo vacío [].
// 'JSON.parse' convierte el texto de localStorage de nuevo en un arreglo.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
/* -------------------------------------------------*/

/* -------------------------------------------------*/
// --- 1.2 ESTADO DE FILTROS DE LA TIENDA ---

let filtroCategoriaActual = 'todos'; // 'todos' por defecto
let filtroBusquedaActual = '';       // Vacío por defecto

/* -------------------------------------------------*/

// --- 2. LÓGICA DE CARGA DE PÁGINAS ---
document.addEventListener('DOMContentLoaded', () => {
  
  // CHEQUEO 1: ¿Página de Tienda?
const productGrid = document.getElementById('tienda-product-grid');
if (productGrid) {
  
  // 1. ESTO CAMBIÓ:
  // Ya no llama a 'cargarProductos', llama a la nueva función maestra
  aplicarFiltrosYRecargar(); 

  // 2. ESTO SE AÑADIÓ:
  // Un "oyente" para la barra de búsqueda
  const searchInput = document.getElementById('filter-search');
  searchInput.addEventListener('input', (event) => {
    filtroBusquedaActual = event.target.value;
    aplicarFiltrosYRecargar();
  });

  // 3. ESTO TAMBIÉN SE AÑADIÓ:
  // Un "oyente" para la lista de categorías
  const categoriesList = document.getElementById('filter-categories');
  categoriesList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      event.preventDefault(); 
      const categoriaTexto = event.target.textContent;
      if (categoriaTexto === 'Mostrar Todos') {
        filtroCategoriaActual = 'todos';
      } else {
        filtroCategoriaActual = categoriaTexto;
      }
      aplicarFiltrosYRecargar(); 
    }
});
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
  // CHEQUEO 4: ¿Estamos en la página del Carrito?
  // [VERSIÓN FINAL CON TODAS LAS VALIDACIONES]
  // -----
  const cartItemsList = document.getElementById('cart-items-list');
  if (cartItemsList) {
    // 1. Carga los productos en la lista
    cargarPaginaCarrito();

    // 2. Seleccionamos el botón de pagar
    const btnIrAPagar = document.getElementById('btn-ir-a-pagar');
    
    // 3. Seleccionamos los elementos del modal (para el login)
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');

    if (btnIrAPagar && modalOverlay && modalCloseBtn) {
      
      // --- Lógica del Botón "IR A PAGAR" ---
      btnIrAPagar.addEventListener('click', (event) => {
        
        const estaLogueado = localStorage.getItem('usuarioLogueado') === 'true';

        if (!estaLogueado) {
          // ---
          // VALIDACIÓN 1: No está logueado
          // ---
          event.preventDefault(); // ¡Previene que vaya a checkout.html!
          
          // Usamos la función maestra para "pintar" el modal de login
          mostrarModalPersonalizado(
            'Acción Requerida', // Título
            'Debes iniciar sesión o registrarte para poder continuar con el pago.', // Mensaje
            'Iniciar Sesión', // Botón 1
            'Registrarme', // Botón 2
            () => {
              // Lógica si presiona "Iniciar Sesión"
              window.location.href = 'login.html';
            },
            'btn-principal' // Clase para el botón 1
          );
          
          // Conectamos el botón 2 (Registrarme)
          // (Usamos un 'setTimeout' para darle tiempo al modal de "pintarse")
          setTimeout(() => {
            const btnRegistro = document.getElementById('modal-btn-cancel'); // (El botón 2)
            // Usamos .onclick para reemplazar cualquier listener antiguo
            btnRegistro.onclick = () => {
              window.location.href = 'registro.html';
            };
          }, 0);

        
        } else if (carrito.length === 0) {
          // ---
          // VALIDACIÓN 2: Carrito vacío
          // ---
          event.preventDefault(); // ¡Previene que vaya a checkout.html!
          
          mostrarModalPersonalizado(
            'Carrito Vacío',
            'Tu carrito está vacío. Debes añadir al menos un producto antes de poder pagar.',
            'Ir a la Tienda',
            'Cerrar',
            () => {
              window.location.href = 'tienda.html';
            }
          );
        }
        // Si está logueado Y el carrito no está vacío,
        // no se llama a event.preventDefault()
        // y el enlace funciona, llevándolo a checkout.html
      });

      // --- Lógica para CERRAR el modal de "Iniciar Sesión" ---
      // (Esta lógica solo se usa si el usuario presiona la 'X' o el fondo)
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('visible');
      });
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          modalOverlay.classList.remove('visible');
        }
      });
    }
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
  // -----
  // CHEQUEO 6: Lógica de "Cerrar Sesión" (Header)
  // -----
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      // Llama al NUEVO modal
      mostrarModalCerrarSesion('tienda'); 
    });
  }
  const adminLogoutLink = document.getElementById('admin-logout-link');
  if (adminLogoutLink) {
    adminLogoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      // Llama al NUEVO modal
      mostrarModalCerrarSesion('admin'); 
    });
  }

  // CHEQUEO 7 (NUEVO): ¿Estamos en la página de Perfil?
  // -----
  const profileEmail = document.getElementById('profile-email');
  if (profileEmail) {
    cargarPaginaPerfil();
  }
  


  // CHEQUEO 8: ¿Página de Checkout?
  const checkoutList = document.getElementById('checkout-summary-list');
  if (checkoutList) {
    cargarPaginaCheckout();
  }


  // -----
  // CHEQUEO 9 (NUEVO): ¿Estamos en la página de Confirmación?
  // [CON BOTÓN SALIR Y MODAL]
  // -----
  const confirmContainer = document.getElementById('confirm-container');
  if (confirmContainer) {
    // 1. Cargar la boleta
    cargarPaginaConfirmacion();

    // 2. Conectar el botón de Salir
    const btnSalir = document.getElementById('btn-confirm-salir');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');

    if (btnSalir && modalOverlay && modalCloseBtn) {
      
      // Lógica para ABRIR el modal de "Salir"
      btnSalir.addEventListener('click', () => {
        mostrarModalCerrarSesion('tienda'); // Llama al modal
      });

      // Lógica para CERRAR el modal (copiada de CHEQUEO 4)
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('visible');
      });
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          modalOverlay.classList.remove('visible');
        }
      });
    }
  }

  // -----
  // CHEQUEO 10: ¿Estamos en la página de Admin - Listado de Productos?
  // [VERSIÓN ACTUALIZADA CON CONECTOR DE BOTONES]
  // -----
  const adminProductListBody = document.getElementById('admin-product-list-body');
  if (adminProductListBody) {
    // 1. Pinta la tabla (como antes)
    cargarTablaAdminProductos();
    
    // 2. ¡NUEVO! Conecta los botones de esa tabla
    conectarBotonesAdminProducto();
  }

  // -----
  // CHEQUEO 11 (NUEVO): ¿Estamos en el Formulario de Producto (Admin)?
  // -----
  const productoForm = document.getElementById('producto-form');
  if (productoForm) {
    // Llamamos a la función que revisa la URL
    cargarDatosProductoParaEditar();
  }

  // CHEQUEO 12: ¿Estamos en la página de Admin - Listado de Usuarios?
  const adminUserListBody = document.getElementById('admin-user-list-body');
  if (adminUserListBody) {
    // (Aún no hemos hecho la función para "pintar" la tabla de usuarios)
    conectarBotonesAdminUsuario(); // Conecta los botones de eliminar
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
    // ¡LÍNEA ACTUALIZADA! (Usa 'producto.imagenes[0]' en lugar de 'producto.imagen')
    productoCard.innerHTML = `
      <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>$${producto.precio.toLocaleString('es-CL')}</p> 
      <a href="producto.html?codigo=${producto.codigo}" class="btn-secundario">Ver detalle</a>
    `;

    // Añadimos la nueva tarjeta al grid
    productGrid.appendChild(productoCard);
  });
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 2,1 LÓGICA DE FILTRADO DE PRODUCTOS ---

/**
 * Función maestra que filtra la DB
 * y vuelve a "pintar" los productos.
 */
function aplicarFiltrosYRecargar() {
  
  // 1. Empezamos con la base de datos completa
  let productosFiltrados = productosDB;

  // 2. Aplicamos el filtro de CATEGORÍA
  if (filtroCategoriaActual !== 'todos') {
    productosFiltrados = productosFiltrados.filter(producto => {
      return producto.categoria === filtroCategoriaActual;
    });
  }

  // 3. Aplicamos el filtro de BÚSQUEDA
  // (sobre la lista YA filtrada por categoría)
  if (filtroBusquedaActual !== '') {
    productosFiltrados = productosFiltrados.filter(producto => {
      // Comparamos en minúsculas para que no sea sensible
      return producto.nombre.toLowerCase().includes(filtroBusquedaActual.toLowerCase());
    });
  }

  // 4. "Pintamos" los productos resultantes
  // (Si no hay resultados, 'cargarProductos' pintará un arreglo vacío)
  cargarProductos(productosFiltrados);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 3. LÓGICA DE DETALLE DE PRODUCTO ---

function cargarDetalleProducto() {
  
  // 1. LEER LA URL
  const params = new URLSearchParams(window.location.search);
  const codigoProducto = params.get('codigo');

  if (!codigoProducto) {
    window.location.href = 'tienda.html';
    return;
  }

  // 2. BUSCAR EL PRODUCTO
  const productoEncontrado = productosDB.find(producto => producto.codigo === codigoProducto);

  const infoContenedor = document.querySelector('.product-info');
  
  if (!productoEncontrado) {
    infoContenedor.innerHTML = `<h2>Producto no encontrado</h2><p>El producto que buscas no existe.</p><a href="tienda.html" class="btn-secundario">Volver a la Tienda</a>`;
    return;
  }

  // 4. SI LO ENCONTRAMOS, actualizamos el HTML:
  
  // Actualizamos el texto
  document.querySelector('.product-title').textContent = productoEncontrado.nombre;
  document.querySelector('.product-price').textContent = `$${productoEncontrado.precio.toLocaleString('es-CL')}`;
  document.querySelector('.product-description').textContent = productoEncontrado.descripcion;
  document.getElementById('add-to-cart-form').setAttribute('data-codigo', productoEncontrado.codigo);
  
  // --- ¡NUEVA LÓGICA DE GALERÍA! ---
  
  // 4.1 Seleccionamos los elementos de la galería
  const mainImage = document.getElementById('gallery-main-image');
  const thumb1 = document.getElementById('gallery-thumb-1');
  const thumb2 = document.getElementById('gallery-thumb-2');
  const thumb3 = document.getElementById('gallery-thumb-3');
  
  // 4.2 Llenamos las 4 imágenes con el arreglo 'imagenes'
  mainImage.src = productoEncontrado.imagenes[0];
  thumb1.src = productoEncontrado.imagenes[1];
  thumb2.src = productoEncontrado.imagenes[2];
  thumb3.src = productoEncontrado.imagenes[3];

  // 4.3 Damos un "fallback" (imagen de reemplazo) si no hay 4 imágenes
  // (Aunque nuestra DB sí las tiene, es una buena práctica)
  thumb1.style.display = productoEncontrado.imagenes[1] ? 'block' : 'none';
  thumb2.style.display = productoEncontrado.imagenes[2] ? 'block' : 'none';
  thumb3.style.display = productoEncontrado.imagenes[3] ? 'block' : 'none';
  
  // 4.4 Llama a la nueva función para hacer clicables los thumbnails
  setupThumbnailListeners();


  // 4.5 Llama a la función para configurar los botones de compartir
  setupShareListeners(productoEncontrado);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 4. LÓGICA DEL CARRITO DE COMPRAS ---

/**
 * Función que se ejecuta al presionar "Añadir al carrito".
 * [VERSIÓN 3.0 - LÓGICA AVANZADA DE AGRUPACIÓN]
 * @param {HTMLFormElement} formulario - El formulario que se envió.
 */
function manejarAnadirAlCarrito(formulario) {
  
  // 1. OBTENER LOS DATOS
  const codigo = formulario.getAttribute('data-codigo');
  const cantidadInput = document.getElementById('product-quantity');
  const mensajeInput = document.getElementById('product-custom-msg');

  const cantidad = parseInt(cantidadInput.value);
  // Normalizamos el mensaje: sin espacios y en minúsculas para comparar
  const mensaje = mensajeInput.value.trim(); 

  // 2. BUSCAR EL PRODUCTO EN LA DB
  const productoDB = productosDB.find(p => p.codigo === codigo);
  if (!productoDB) {
    alert("Error: Producto no encontrado. Intente de nuevo.");
    return;
  }

  // 3. AÑADIR O ACTUALIZAR EL CARRITO (¡NUEVA LÓGICA!)
  // Buscamos si ya existe un item con el MISMO código Y el MISMO mensaje
  const itemEnCarrito = carrito.find(item => item.codigo === codigo && item.mensaje === mensaje);

  if (itemEnCarrito) {
    // Si SÍ existe: solo sumamos la cantidad (Tu requisito #3)
    itemEnCarrito.cantidad += cantidad;
  } else {
    // Si NO existe (mensaje diferente o producto nuevo):
    // Creamos una LÍNEA NUEVA (Tu requisito #2)
    carrito.push({
      // ¡NUEVO! Añadimos un ID único para cada LÍNEA
      id: Date.now(), // Usamos la hora actual como ID único
      codigo: productoDB.codigo,
      nombre: productoDB.nombre,
      precio: productoDB.precio,
      imagen: productoDB.imagenes[0], 
      cantidad: cantidad,
      mensaje: mensaje 
    });
  }

  // 4. GUARDAR EN LOCALSTORAGE
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // 5. DAR FEEDBACK
  alert("¡Producto añadido al carrito!");
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
 * [VERSIÓN 3.1 - SIN 'onclick' PARA MÁS ROBUSTEZ]
 */
function cargarPaginaCarrito() {
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalValue = document.getElementById('cart-total-value');
  
  cartItemsList.innerHTML = '';

  if (carrito.length === 0) {
    cartItemsList.innerHTML = `
      <p class="cart-empty-message">Tu carrito de compras está vacío.</p>
      <a href="tienda.html" class="btn-secundario">Ir a la Tienda</a>
    `;
    cartTotalValue.textContent = '$0';
    return; // Salimos de la función
  }

  let totalCalculado = 0;

  carrito.forEach(item => {
    const itemCard = document.createElement('article');
    itemCard.classList.add('cart-item');
    // Guardamos el ID único en la tarjeta
    itemCard.dataset.cartId = item.id; 

    const subtotalItem = item.precio * item.cantidad;
    totalCalculado += subtotalItem;

    // --- HTML SIN 'onclick' ---
    itemCard.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
      
      <div class="cart-item-details">
        <h4>${item.nombre}</h4>
        <p class="cart-item-message">Mensaje: ${item.mensaje || 'Ninguno'}</p>
        
        <button class="cart-item-edit">Editar Mensaje</button>
      </div>
      
      <div class="cart-item-quantity">
        <label for="qty-${item.id}">Cantidad:</label>
        <input 
          type="number" 
          id="qty-${item.id}" 
          value="${item.cantidad}" 
          min="1" 
          class="input-quantity">
      </div>

      <div class="cart-item-subtotal">
        <p>Subtotal:</p>
        <span>$${subtotalItem.toLocaleString('es-CL')}</span>
      </div>
      
      <button class="cart-item-remove">Eliminar</button>
    `;

    cartItemsList.appendChild(itemCard);
  });

  cartTotalValue.textContent = `$${totalCalculado.toLocaleString('es-CL')}`;
  
  // --- ¡NUEVO! ---
  // Después de "pintar" todo, llamamos a una función
  // para que "conecte" los botones que acabamos de crear.
  conectarBotonesDelCarrito();
}


/**
 * MUESTRA LA CONFIRMACIÓN para eliminar un ítem.
 * Ya no usa 'confirm()'.
 * @param {number} cartItemId - El ID ÚNICO de la línea del carrito.
 */
function eliminarDelCarrito(cartItemId) {
  // 1. Busca el item (para mostrar el nombre)
  const idNum = parseInt(cartItemId);
  const itemEnCarrito = carrito.find(item => item.id === idNum);
  if (!itemEnCarrito) return;

  // 2. Llama a la nueva función que abre el modal
  mostrarModalPersonalizado(
    'Confirmar Eliminación',
    `¿Estás seguro de que quieres eliminar <strong>${itemEnCarrito.nombre}</strong> (Cantidad: ${itemEnCarrito.cantidad}) del carrito?`,
    'Confirmar',
    'Cancelar',
    () => {
      // --- Esta es la LÓGICA DE QUÉ PASA AL CONFIRMAR ---
      carrito = carrito.filter(item => item.id !== idNum);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarIconoCarrito();
      cargarPaginaCarrito(); 
      // --- Fin de la lógica ---
    }
  );
}

/**
 * Función que se llama al cambiar el número en el input "Cantidad".
 * @param {number} cartItemId - El ID ÚNICO de la línea del carrito.
 * @param {string} nuevaCantidad - La nueva cantidad (viene como texto).
 */
function actualizarCantidad(cartItemId, nuevaCantidad) {
  const idNum = parseInt(cartItemId);
  const cantidadNum = parseInt(nuevaCantidad);

  // Buscamos el ítem en el carrito POR SU ID ÚNICO
  const itemEnCarrito = carrito.find(item => item.id === idNum);

  if (itemEnCarrito && cantidadNum > 0) {
    itemEnCarrito.cantidad = cantidadNum;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarIconoCarrito();
    cargarPaginaCarrito(); 
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

// --- Archivo: js/main.js ---
// --- REEMPLAZA tu función 'cerrarSesion' por 'ejecutarCierreSesion' ---

/**
 * Cierra la sesión (LA LÓGICA INTERNA).
 * Esta función es "silenciosa" (sin confirmaciones).
 * @param {string} tipoDeSesion - 'tienda' o 'admin', para la redirección.
 */
function ejecutarCierreSesion(tipoDeSesion) {
  // Borramos los ítems de sesión
  localStorage.removeItem('usuarioLogueado');
  localStorage.removeItem('rol');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('descuentoEdad');
  localStorage.removeItem('descuentoCodigo');

  // Redirigimos a la página correcta
  if (tipoDeSesion === 'admin') {
    window.location.href = '../tienda/index.html';
  } else {
    window.location.href = 'index.html';
  }
}

/**
 * Muestra el MODAL PERSONALIZADO para confirmar el cierre de sesión.
 * @param {string} tipoDeSesion - 'tienda' o 'admin'
 */
function mostrarModalCerrarSesion(tipoDeSesion) {
  // Verificamos que el modal exista en la página actual
  const modalOverlay = document.getElementById('modal-overlay');
  if (!modalOverlay) {
    // Si no hay modal, usamos el genérico como último recurso
    console.error("No se encontró el #modal-overlay en esta página.");
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      ejecutarCierreSesion(tipoDeSesion);
    }
    return;
  }
  
  // Llamamos a la función maestra del modal
  mostrarModalPersonalizado(
    'Cerrar Sesión',
    '¿Estás seguro de que quieres cerrar sesión y volver al inicio?',
    'Confirmar y Salir',
    'Cancelar',
    () => {
      // Esta es la lógica que se ejecuta al confirmar
      ejecutarCierreSesion(tipoDeSesion); 
    }
  );
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


// --- Archivo: js/main.js ---
// --- AÑADE ESTA FUNCIÓN AL FINAL DEL ARCHIVO ---

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 10. LÓGICA DE LA GALERÍA DE PRODUCTO (Thumbnails) ---

/**
 * Añade "oyentes" de clic a las miniaturas de la galería
 * para que cambien la imagen principal.
 */
function setupThumbnailListeners() {
  const mainImage = document.getElementById('gallery-main-image');
  const thumbnails = document.querySelectorAll('.thumbnail'); // Obtiene las 3 miniaturas

  thumbnails.forEach(thumb => {
    // A cada miniatura, le añadimos un "oyente" de clic
    thumb.addEventListener('click', () => {
      
      // 1. Quita la clase 'active' de la miniatura anterior
      document.querySelector('.thumbnail.active')?.classList.remove('active');
      
      // 2. Añade la clase 'active' a la miniatura en la que hicimos clic
      thumb.classList.add('active');
      
      // 3. Cambia la imagen principal
      mainImage.src = thumb.src;
    });
  });

  // Activa la primera miniatura por defecto
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
}



/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 11. LÓGICA DE EDICIÓN DE MENSAJE (CARRITO) ---

/**
 * MUESTRA EL MODAL para editar un mensaje.
 * Ya no usa 'prompt()'.
 * @param {number} cartItemId - El ID ÚNICO de la línea del carrito.
 */
function editarMensaje(cartItemId) {
  const idNum = parseInt(cartItemId);
  const itemEnCarrito = carrito.find(item => item.id === idNum);
  if (!itemEnCarrito) return;

  // 1. Creamos el HTML para el "body" del modal, incluyendo un input
  const modalBodyHTML = `
    <p>Edita tu mensaje personalizado para <strong>${itemEnCarrito.nombre}</strong>:</p>
    <div class="form-group">
      <input 
        type="text" 
        id="modal-edit-input" 
        value="${itemEnCarrito.mensaje}" 
        placeholder="Escribe tu mensaje aquí..."
      >
    </div>
  `;

  // 2. Llama a la nueva función que abre el modal
  mostrarModalPersonalizado(
    'Editar Mensaje',
    modalBodyHTML, // Pasamos nuestro HTML personalizado
    'Guardar',
    'Cancelar',
    () => {
      // --- Lógica de QUÉ PASA AL GUARDAR ---
      const nuevoMensaje = document.getElementById('modal-edit-input').value;
      
      itemEnCarrito.mensaje = nuevoMensaje.trim();
      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarPaginaCarrito();
      // --- Fin de la lógica ---
    }
  );
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 11.2 CONECTOR DE BOTONES DEL CARRITO ---

/**
 * Busca todos los botones y campos en el carrito
 * y les añade los 'event listeners' correctos.
 * (Esta es la forma robusta de arreglar el bug 'onclick')
 */
function conectarBotonesDelCarrito() {
  
  // 1. Conectar botones "Eliminar"
  document.querySelectorAll('.cart-item-remove').forEach(boton => {
    boton.addEventListener('click', (event) => {
      // Obtenemos el ID del <article> padre
      const cartItemId = event.target.closest('.cart-item').dataset.cartId;
      // Llamamos a la función de eliminar (que modificaremos)
      eliminarDelCarrito(cartItemId);
    });
  });

  // 2. Conectar botones "Editar Mensaje"
  document.querySelectorAll('.cart-item-edit').forEach(boton => {
    boton.addEventListener('click', (event) => {
      const cartItemId = event.target.closest('.cart-item').dataset.cartId;
      // Llamamos a la función de editar (que modificaremos)
      editarMensaje(cartItemId);
    });
  });

  // 3. Conectar campos de "Cantidad"
  document.querySelectorAll('.input-quantity').forEach(input => {
    input.addEventListener('change', (event) => {
      const cartItemId = event.target.closest('.cart-item').dataset.cartId;
      // Llamamos a la función de actualizar
      actualizarCantidad(cartItemId, event.target.value);
    });
  });
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 12. LÓGICA DEL MODAL PERSONALIZADO (Universal) ---

/**
 * Abre y configura el modal de 'carrito.html' para diferentes propósitos.
 * @param {string} titulo - El texto para el <h3>
 * @param {string} bodyHTML - El HTML para el .modal-body
 * @param {string} btnConfirmarTexto - Texto para el botón principal (ej. "Confirmar")
 * @param {string} btnCancelarTexto - Texto para el botón secundario (ej. "Cancelar")
 * @param {function} onConfirmCallback - La función que se debe ejecutar si se presiona "Confirmar"
 */
function mostrarModalPersonalizado(titulo, bodyHTML, btnConfirmarTexto, btnCancelarTexto, onConfirmCallback) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');
  const modalHeader = modalContainer.querySelector('.modal-header h3');
  const modalBody = modalContainer.querySelector('.modal-body');
  const modalFooter = modalContainer.querySelector('.modal-footer');
  
  // 1. Rellenamos el modal con el contenido nuevo
  modalHeader.textContent = titulo;
  modalBody.innerHTML = bodyHTML; // Usamos innerHTML para permitir el input

  // 2. Creamos los botones nuevos
  modalFooter.innerHTML = `
    <button class="btn-principal" id="modal-btn-confirm">${btnConfirmarTexto}</button>
    <button class="btn-secundario" id="modal-btn-cancel">${btnCancelarTexto}</button>
  `;

  // 3. Mostramos el modal
  modalOverlay.classList.add('visible');

  // 4. Conectamos los botones
  
  const btnConfirm = document.getElementById('modal-btn-confirm');
  const btnCancel = document.getElementById('modal-btn-cancel');
  const btnClose = document.getElementById('modal-close'); // La 'X'

  // Función para cerrar el modal
  const cerrarModal = () => {
    modalOverlay.classList.remove('visible');
    // Limpiamos los listeners para que no se acumulen
    btnConfirm.replaceWith(btnConfirm.cloneNode(true));
    btnCancel.replaceWith(btnCancel.cloneNode(true));
  };

  // Conectar botón de Confirmar
  btnConfirm.addEventListener('click', () => {
    onConfirmCallback(); // Ejecuta la acción (eliminar, guardar, etc.)
    cerrarModal();
  });

  // Conectar botón de Cancelar
  btnCancel.addEventListener('click', () => {
    cerrarModal();
  });
  
  // (La 'X' y el fondo ya tienen sus listeners en el CHEQUEO 4)
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 13. LÓGICA DE COMPARTIR EN REDES SOCIALES ---
// [Requisito: "Forma C", Promoción de Productos]

/**
 * Configura los botones de compartir en la página de producto.
 * @param {object} producto - El objeto del producto (de productosDB).
 */
function setupShareListeners(producto) {
  const fbButton = document.getElementById('share-fb');
  const twButton = document.getElementById('share-tw');
  const waButton = document.getElementById('share-wa');

  // Obtenemos la URL actual y el texto
  const url = window.location.href;
  const texto = encodeURIComponent(`¡Mira esta increíble ${producto.nombre} de Pastelería Mil Sabores!`);

  if (fbButton) {
    fbButton.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }

  if (twButton) {
    twButton.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${texto}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }

  if (waButton) {
    waButton.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = `https://api.whatsapp.com/send?text=${texto} ${url}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }
}



/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 14. LÓGICA DE LA PÁGINA DE CHECKOUT ---

/**
 * Carga el resumen del carrito y el total
 * en la página de checkout.html.
 */
function cargarPaginaCheckout() {
  const checkoutList = document.getElementById('checkout-summary-list');
  const checkoutTotal = document.getElementById('checkout-total');
  
  checkoutList.innerHTML = ''; // Limpiamos
  let totalCalculado = 0;

  if (carrito.length === 0) {
    checkoutList.innerHTML = "<p>No hay productos para pagar.</p>";
    checkoutTotal.textContent = '$0';
    return;
  }

  // "Pintamos" cada item
  carrito.forEach(item => {
    const subtotalItem = item.precio * item.cantidad;
    totalCalculado += subtotalItem;

    const itemHTML = `
      <div class="summary-item">
        <div class="summary-item-details">
          <span>${item.cantidad}x</span> ${item.nombre}
        </div>
        <div class="summary-item-price">
          $${subtotalItem.toLocaleString('es-CL')}
        </div>
      </div>
    `;
    checkoutList.innerHTML += itemHTML;
  });

  // Pintamos el total
  checkoutTotal.textContent = `$${totalCalculado.toLocaleString('es-CL')}`;
  
  // ¡NUEVO! Pre-llenamos el correo del usuario
  const emailGuardado = localStorage.getItem('userEmail');
  if (emailGuardado) {
    document.getElementById('checkout-email').value = emailGuardado;
  }
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 15. LÓGICA DE LA PÁGINA DE CONFIRMACIÓN ---
/**
 * Carga la "Boleta" en la página de confirmación.
 * [VERSIÓN 3.0 - CON DATOS DE TIENDA, CLIENTE Y DESCUENTOS]
 */
function cargarPaginaConfirmacion() {
  const confirmList = document.getElementById('confirm-list');
  const boletaEmail = document.getElementById('boleta-email');
  const boletaSubtotal = document.getElementById('boleta-subtotal');
  const boletaDctoEdad = document.getElementById('boleta-dcto-edad');
  const boletaLineaDctoEdad = document.getElementById('boleta-linea-dcto-edad');
  const boletaDctoCodigo = document.getElementById('boleta-dcto-codigo');
  const boletaLineaDctoCodigo = document.getElementById('boleta-linea-dcto-codigo');
  const boletaTotalFinal = document.getElementById('boleta-total-final');
  
  // 1. Leemos TODOS los datos
  const ultimoPedido = JSON.parse(localStorage.getItem('ultimoPedido'));
  const emailGuardado = localStorage.getItem('userEmail');
  const dctoEdad = localStorage.getItem('descuentoEdad');
  const dctoCodigo = localStorage.getItem('descuentoCodigo');

  confirmList.innerHTML = ''; // Limpiamos la lista
  let subtotalCalculado = 0;

  // 2. Pintamos el Email
  if (emailGuardado) {
    boletaEmail.textContent = emailGuardado;
  } else {
    boletaEmail.textContent = "Cliente no registrado";
  }

  // 3. Si no hay pedido, salimos
  if (!ultimoPedido || ultimoPedido.length === 0) {
    confirmList.innerHTML = `<tr><td colspan="3">No se encontró información del pedido.</td></tr>`;
    return;
  }

  // 4. "Pintamos" la lista de productos
  ultimoPedido.forEach(item => {
    const subtotalItem = item.precio * item.cantidad;
    subtotalCalculado += subtotalItem;
    
    const itemHTML = `
      <tr>
        <td>
          <strong>${item.nombre}</strong>
          <p style="font-size: 12px; font-style: italic;">
            Mensaje: ${item.mensaje || 'Ninguno'}
          </p>
        </td>
        <td>${item.cantidad}</td>
        <td>$${subtotalItem.toLocaleString('es-CL')}</td>
      </tr>
    `;
    confirmList.innerHTML += itemHTML;
  });

  // 5. ¡NUEVO! Calculamos los descuentos
  let totalFinal = subtotalCalculado;
  
  if (dctoEdad === '50%') {
    const montoDcto = subtotalCalculado * 0.50;
    totalFinal -= montoDcto;
    boletaDctoEdad.textContent = `-$${montoDcto.toLocaleString('es-CL')}`;
    boletaLineaDctoEdad.style.display = 'flex'; // Mostramos la línea
  }
  
  if (dctoCodigo === '10%') {
    const montoDcto = subtotalCalculado * 0.10;
    totalFinal -= montoDcto;
    boletaDctoCodigo.textContent = `-$${montoDcto.toLocaleString('es-CL')}`;
    boletaLineaDctoCodigo.style.display = 'flex'; // Mostramos la línea
  }

  // 6. Pintamos los totales
  boletaSubtotal.textContent = `$${subtotalCalculado.toLocaleString('es-CL')}`;
  boletaTotalFinal.textContent = `$${totalFinal.toLocaleString('es-CL')}`;
  
  // 7. (Importante) Limpiamos el pedido guardado
  localStorage.removeItem('ultimoPedido');
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 16. LÓGICA DE LA TABLA DE PRODUCTOS (ADMIN) ---

/**
 * Carga dinámicamente la tabla de productos en 
 * la página admin/productos-listado.html
 * leyendo de la base de datos 'productosDB'.
 */
function cargarTablaAdminProductos() {
  const tablaBody = document.getElementById('admin-product-list-body');
  if (!tablaBody) return;
  
  tablaBody.innerHTML = ''; // Limpiamos

  // Recorremos la MISMA base de datos de la tienda
  productosDB.forEach(producto => {
    const fila = document.createElement('tr');
    const stockSimulado = 10; 

    // Creamos el HTML de la fila
    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio.toLocaleString('es-CL')}</td>
      <td>${stockSimulado}</td>
      <td>
        <a href="productos-form.html?codigo=${producto.codigo}" class="btn-admin-editar">Editar</a>
        <button class="btn-admin-eliminar" data-nombre="${producto.nombre}">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 17. LÓGICA DE BOTONES (ADMIN) ---
/**
 * Conecta los botones de "Eliminar" en la tabla de productos del admin.
 */
function conectarBotonesAdminProducto() {
  
  // 1. Conectar botones "Eliminar"
  document.querySelectorAll('.btn-admin-eliminar').forEach(boton => {
    
    boton.addEventListener('click', (event) => {
      // Obtenemos los datos del botón
      const nombreProducto = event.target.dataset.nombre;
      const fila = event.target.closest('tr'); // La fila <tr>

      // ¡REUTILIZAMOS EL MODAL!
      mostrarModalPersonalizado(
        'Confirmar Eliminación',
        `¿Estás seguro de que quieres eliminar <strong>${nombreProducto}</strong>? (Esto es solo una simulación visual).`,
        'Eliminar', // Texto del botón de confirmar
        'Cancelar',
        () => {
          // --- Lógica de la Simulación ---
          // Simplemente eliminamos la fila (el <tr>) de la vista
          fila.remove();
        },
        'btn-admin-eliminar' // ¡Usamos la clase ROJA que pediste!
      );
    });
  });
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 18. LÓGICA DE FORMULARIO "EDITAR PRODUCTO" (ADMIN) ---
/**
 * Revisa la URL. Si es una "edición" (contiene ?codigo=),
 * rellena el formulario de producto con los datos existentes.
 */
function cargarDatosProductoParaEditar() {
  
  const params = new URLSearchParams(window.location.search);
  const codigoProducto = params.get('codigo');

  if (!codigoProducto) {
    return; // Es "Nuevo Producto", no hacemos nada
  }

  const productoEncontrado = productosDB.find(p => p.codigo === codigoProducto);

  if (!productoEncontrado) {
    alert("Error: No se encontró el producto para editar.");
    window.location.href = 'productos-listado.html';
    return;
  }

  // 3. RELLENAR EL FORMULARIO
  document.querySelector('.admin-header h1').textContent = 'Editar Producto';
  document.getElementById('prod-codigo').value = productoEncontrado.codigo;
  document.getElementById('prod-nombre').value = productoEncontrado.nombre;
  document.getElementById('prod-descripcion').value = productoEncontrado.descripcion;
  document.getElementById('prod-precio').value = productoEncontrado.precio;
  document.getElementById('prod-stock').value = 10; // (Usamos el '10' simulado)
  document.getElementById('prod-categoria').value = productoEncontrado.categoria;
  document.getElementById('prod-imagen').value = productoEncontrado.imagenes[0];
  document.getElementById('prod-codigo').disabled = true;
}