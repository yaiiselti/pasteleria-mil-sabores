/*
  -------------------------------------------------
  JS - PASTELERÍA MIL SABORES
  Archivo: validaciones.js
  Descripción: Lógica de validación para TODOS
  los formularios del sitio.
  -------------------------------------------------
*/

// --- 1. CEREBRO DE VALIDACIÓN (Event Listener) ---
document.addEventListener('DOMContentLoaded', () => {
  
  // CHEQUEO 1: ¿Página de Login?
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      validarFormularioLogin();
    });
  }

  // CHEQUEO 2: ¿Página de Contacto?
  const contactoForm = document.getElementById('contacto-form');
  if (contactoForm) {
    contactoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validarFormularioContacto();
    });
  }

  // CHEQUEO 3: ¿Página de Registro?
  const registroForm = document.getElementById('registro-form');
  if (registroForm) {
    registroForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validarFormularioRegistro();
    });
    
    // Lógica de descuento por edad (REGISTRO)
    const fechaNacInput = document.getElementById('reg-fecha-nac');
    if (fechaNacInput) {
      fechaNacInput.addEventListener('change', (event) => {
        validarEdadParaDescuento(event.target.value);
      });
    }
  }

  // CHEQUEO 4: ¿Formulario de Producto (Admin)?
  const productoForm = document.getElementById('producto-form');
  if (productoForm) {
    productoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validarFormularioProducto();
    });
  }

  // -----
  // CHEQUEO 5 (NUEVO): ¿Formulario de Usuario (Admin)?
  // -----
  const usuarioForm = document.getElementById('usuario-form');
  if (usuarioForm) {
    usuarioForm.addEventListener('submit', (event) => {
      event.preventDefault();
      // Llamamos a la nueva función de validación
      validarFormularioUsuario();
    });
  }

  // -----
  // CHEQUEO 6 (NUEVO): ¿Formulario de Checkout?
  // [VERSIÓN FINAL SIN ALERT()]
  // -----
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
      // Prevenimos el envío
      event.preventDefault();
      // Validamos el formulario
      if (validarFormularioCheckout()) {
        
        // 1. Guardamos el pedido para la boleta
        localStorage.setItem('ultimoPedido', JSON.stringify(carrito));
        
        // 2. Limpiamos el carrito
        localStorage.removeItem('carrito');
        
        // 3. Redirigimos INMEDIATAMENTE a la boleta personalizada
        window.location.href = 'confirmacion.html';
      }
    });
  }
});


// --- 2. FUNCIONES AYUDANTES (UI de Errores) ---
// Estas funciones las reutilizaremos en TODAS las validaciones

/**
 * Muestra un mensaje de error en el div de error de un campo.
 * (Versión 2.0 - Más robusta)
 * @param {string} inputId - El ID del <input> (ej: 'reg-run')
 * @param {string} mensaje - El mensaje de error a mostrar.
 */
function mostrarError(inputId, mensaje) {
  const campo = document.getElementById(inputId);
  if (!campo) return; // Si no existe el campo, no hagas nada

  // Buscamos el div de error DENTRO del mismo .form-group
  const formGroup = campo.closest('.form-group');
  if (!formGroup) return;

  const divError = formGroup.querySelector('.error-message');
  
  if (divError) {
    campo.classList.add('input-error'); // Añade el borde rojo
    divError.textContent = mensaje;
    divError.style.display = 'block'; // Muestra el mensaje
  }
}

/**
 * Limpia el mensaje de error de UN campo.
 * (Versión 2.0 - Más robusta)
 * @param {string} inputId - El ID del <input> (ej: 'reg-run')
 */
function limpiarError(inputId) {
  const campo = document.getElementById(inputId);
  if (!campo) return;

  // Buscamos el div de error DENTRO del mismo .form-group
  const formGroup = campo.closest('.form-group');
  if (!formGroup) return;

  const divError = formGroup.querySelector('.error-message');
  
  if (divError) {
    campo.classList.remove('input-error'); // Quita el borde rojo
    divError.textContent = '';
    divError.style.display = 'none'; // Oculta el mensaje
  }
}

/**
 * Limpia TODOS los mensajes de error de un formulario.
 * @param {HTMLFormElement} form - El formulario a limpiar.
 */
function limpiarTodosLosErrores(form) {
  // Obtenemos todos los inputs y divs de error dentro de este formulario
  const inputsConError = form.querySelectorAll('.input-error');
  const mensajesError = form.querySelectorAll('.error-message');

  inputsConError.forEach(input => input.classList.remove('input-error'));
  mensajesError.forEach(div => {
    div.textContent = '';
    div.style.display = 'none';
  });
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 3. LÓGICA DE VALIDACIÓN: LOGIN ---
// [VERSIÓN ACTUALIZADA CON LÓGICA DE ROLES]

function validarFormularioLogin() {
  
  // Seleccionamos el formulario y los campos
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  // Limpiamos errores anteriores
  limpiarTodosLosErrores(form);

  let esValido = true;

  // 1. VALIDAR CORREO
  const email = emailInput.value.trim();
  
  if (email === '') {
    mostrarError('login-email', 'El correo es requerido.');
    esValido = false;
  } 
  else {
    // Aplicando la excepción (sin @profesor.duoc.cl)
    const emailRegex = /@(duoc\.cl|gmail\.com)$/;

    // Correo especial del admin
    if (email === 'admin@duoc.cl') {
      // Es válido, no hacemos nada aquí
    }
    // Si no es el admin, validamos la regla normal
    else if (!emailRegex.test(email)) {
      mostrarError('login-email', 'Solo se permiten correos @duoc.cl o @gmail.com.');
      esValido = false;
    }
  }

  // 2. VALIDAR CONTRASEÑA
  const password = passwordInput.value.trim();
  
  if (password === '') {
    mostrarError('login-password', 'La contraseña es requerida.');
    esValido = false;
  } 
  else if (password.length < 4 || password.length > 10) {
    mostrarError('login-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
    esValido = false;
  }

  // 3. VEREDICTO FINAL (CON LÓGICA DE ROLES)
  if (esValido) {
    
    // Guardamos la sesión
    localStorage.setItem('usuarioLogueado', 'true');

    // Revisamos si es Admin o Cliente
    if (email === 'admin@duoc.cl') {
      // ROL: Administrador
      alert('¡Bienvenido Administrador!');
      localStorage.setItem('rol', 'admin');
      
      // Redirigimos a la carpeta 'admin' (subiendo un nivel)
      window.location.href = '../admin/index.html';

    } else {
      // ROL: Cliente
      alert('¡Inicio de sesión exitoso!');
      localStorage.setItem('rol', 'cliente');

      // --- ¡AQUÍ ESTÁ LA LÍNEA NUEVA! ---
      localStorage.setItem('userEmail', email); // Guardamos el email del cliente

      // Redirigimos al home de la tienda
      window.location.href = 'index.html';
    }
  }
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 4. LÓGICA DE VALIDACIÓN: CONTACTO ---

function validarFormularioContacto() {
  
  // Seleccionamos el formulario y los campos
  const form = document.getElementById('contacto-form');
  const nombreInput = document.getElementById('contact-nombre');
  const emailInput = document.getElementById('contact-email');
  const comentarioInput = document.getElementById('contact-comentario');

  // Limpiamos errores anteriores (¡Reutilizamos la función!)
  limpiarTodosLosErrores(form);

  let esValido = true;

  // 1. VALIDAR NOMBRE
  const nombre = nombreInput.value.trim();
  
  // Regla "sin nulo" [cite: 386-388]
  if (nombre === '') {
    mostrarError('contact-nombre', 'El nombre es requerido.');
    esValido = false;
  } 
  // Regla de longitud [cite: 386-388]
  else if (nombre.length > 100) {
    mostrarError('contact-nombre', 'El nombre no puede exceder los 100 caracteres.');
    esValido = false;
  }

  // 2. VALIDAR CORREO
  const email = emailInput.value.trim();
  
  // Regla "sin nulo" (implícita, ya que tiene validación de formato)
  if (email === '') {
    mostrarError('contact-email', 'El correo es requerido.');
    esValido = false;
  }
  // Regla de dominios [cite: 389-391]
  else {
    const emailRegex = /@(duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      mostrarError('contact-email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      esValido = false;
    }
  }
  // Regla de longitud [cite: 389-391]
  if (email.length > 100) {
    mostrarError('contact-email', 'El correo no puede exceder los 100 caracteres.');
    esValido = false;
  }

  // 3. VALIDAR COMENTARIO
  const comentario = comentarioInput.value.trim();

  // Regla "sin nulo" [cite: 394-398]
  if (comentario === '') {
    mostrarError('contact-comentario', 'El comentario es requerido.');
    esValido = false;
  }
  // Regla de longitud [cite: 394-398]
  else if (comentario.length > 500) {
    mostrarError('contact-comentario', 'El comentario no puede exceder los 500 caracteres.');
    esValido = false;
  }

  // 4. VEREDICTO FINAL
  if (esValido) {
    alert('Mensaje enviado con éxito');
    form.reset(); // Limpia el formulario
  }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 5. LÓGICA DE VALIDACIÓN: REGISTRO ---
// [Reglas basadas en Anexo 1, "Usuario" (Admin)]
// [VERSIÓN FINAL: CON REDIRECCIÓN A LOGIN]

function validarFormularioRegistro() {
  
  // Seleccionamos el formulario y TODOS los campos
  const form = document.getElementById('registro-form');
  const runInput = document.getElementById('reg-run');
  const nombreInput = document.getElementById('reg-nombre');
  const apellidosInput = document.getElementById('reg-apellidos');
  const emailInput = document.getElementById('reg-email');
  const passwordInput = document.getElementById('reg-password');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const fechaNacInput = document.getElementById('reg-fecha-nac');
  const direccionInput = document.getElementById('reg-direccion');
  const regionInput = document.getElementById('reg-region');
  const comunaInput = document.getElementById('reg-comuna');
  const promoInput = document.getElementById('reg-promo');

  // Limpiamos errores anteriores
  limpiarTodosLosErrores(form);

  let esValido = true;

  // ... (Toda tu validación de RUN, Nombre, Apellidos, Correo, etc. va aquí - no cambia nada) ...
  // 1. VALIDAR RUN
  const run = runInput.value.trim();
  if (run === '') {
    mostrarError('reg-run', 'El RUN es requerido.');
    esValido = false;
  } else if (!/^[0-9]{7,8}[-]{0,1}[0-9kK]{1}$/.test(run)) {
    mostrarError('reg-run', 'Formato de RUN incorrecto (Ej: 12345678K).');
    esValido = false;
  }

  // 2. VALIDAR NOMBRE
  const nombre = nombreInput.value.trim();
  if (nombre === '') {
    mostrarError('reg-nombre', 'El nombre es requerido.');
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError('reg-nombre', 'El nombre no puede exceder los 50 caracteres.');
    esValido = false;
  }

  // 3. VALIDAR APELLIDOS
  const apellidos = apellidosInput.value.trim();
  if (apellidos === '') {
    mostrarError('reg-apellidos', 'Los apellidos son requeridos.');
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError('reg-apellidos', 'Los apellidos no pueden exceder los 100 caracteres.');
    esValido = false;
  }

  // 4. VALIDAR CORREO (Con tu excepción)
  const email = emailInput.value.trim();
  if (email === '') {
    mostrarError('reg-email', 'El correo es requerido.');
    esValido = false;
  } else {
    const emailRegex = /@(duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      mostrarError('reg-email', 'Solo se permiten correos @duoc.cl o @gmail.com.');
      esValido = false;
    }
  }

  // 5. VALIDAR CONTRASEÑA
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  
  if (password === '') {
    mostrarError('reg-password', 'La contraseña es requerida.');
    esValido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError('reg-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
    esValido = false;
  } else if (password !== confirmPassword) {
    mostrarError('reg-confirm-password', 'Las contraseñas no coinciden.');
    esValido = false;
  }

  // 6. VALIDAR FECHA NACIMIENTO
  const fechaNac = fechaNacInput.value;
  if (fechaNac === '') {
    mostrarError('reg-fecha-nac', 'La fecha de nacimiento es requerida.');
    esValido = false;
  }

  // 7. VALIDAR DIRECCIÓN
  const direccion = direccionInput.value.trim();
  if (direccion === '') {
    mostrarError('reg-direccion', 'La dirección es requerida.');
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError('reg-direccion', 'La dirección no puede exceder los 300 caracteres.');
    esValido = false;
  }

  // 8. VALIDAR REGIÓN Y COMUNA
  if (regionInput.value === '') {
    mostrarError('reg-region', 'Debe seleccionar una región.');
    esValido = false;
  }
  if (comunaInput.value === '') {
    mostrarError('reg-comuna', 'Debe seleccionar una comuna.');
    esValido = false;
  }

  // 9. VALIDAR CÓDIGO PROMOCIONAL
  const promo = promoInput.value.trim();
  if (promo !== '' && promo.toUpperCase() !== 'FELICES50') {
    mostrarError('reg-promo', 'El código promocional no es válido.');
    esValido = false;
  }

  // 10. VEREDICTO FINAL
  if (esValido) {
    
    // --- Lógica de descuentos (no cambia) ---
    const fechaNac = new Date(fechaNacInput.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    if (edad >= 50) {
      localStorage.setItem('descuentoEdad', '50%');
    }
    if (promoInput.value.trim().toUpperCase() === 'FELICES50') {
      localStorage.setItem('descuentoCodigo', '10%');
    }
    // --- Fin de la lógica de descuentos ---

    alert('¡Registro exitoso!');
    form.reset(); 
    
    // ---
    // ¡AQUÍ ESTÁ EL CAMBIO!
    // Esta línea ahora SÍ se ejecutará y redirigirá al usuario.
    // ---
    window.location.href = 'login.html';
  }
}



/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 6. LÓGICA DE VALIDACIÓN: FORMULARIO DE PRODUCTO (ADMIN) ---
// [Reglas basadas en Anexo 1, "Producto"]

function validarFormularioProducto() {
  
  // Seleccionamos el formulario y los campos
  const form = document.getElementById('producto-form');
  const codigoInput = document.getElementById('prod-codigo');
  const nombreInput = document.getElementById('prod-nombre');
  const descripcionInput = document.getElementById('prod-descripcion');
  const precioInput = document.getElementById('prod-precio');
  const stockInput = document.getElementById('prod-stock');
  const categoriaInput = document.getElementById('prod-categoria');

  // Limpiamos errores anteriores (¡Reutilizamos!)
  limpiarTodosLosErrores(form);

  let esValido = true;

  // 1. VALIDAR CÓDIGO [cite: 432-438]
  const codigo = codigoInput.value.trim();
  if (codigo === '') {
    mostrarError('prod-codigo', 'El código es requerido.');
    esValido = false;
  } else if (codigo.length < 3) {
    mostrarError('prod-codigo', 'El código debe tener al menos 3 caracteres.');
    esValido = false;
  }

  // 2. VALIDAR NOMBRE [cite: 442-444]
  const nombre = nombreInput.value.trim();
  if (nombre === '') {
    mostrarError('prod-nombre', 'El nombre es requerido.');
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError('prod-nombre', 'El nombre no puede exceder los 100 caracteres.');
    esValido = false;
  }

  // 3. VALIDAR DESCRIPCIÓN (Opcional, pero con límite) [cite: 445-447]
  const descripcion = descripcionInput.value.trim();
  if (descripcion.length > 500) {
    mostrarError('prod-descripcion', 'La descripción no puede exceder los 500 caracteres.');
    esValido = false;
  }

  // 4. VALIDAR PRECIO [cite: 448-453]
  const precio = precioInput.value;
  if (precio === '') {
    mostrarError('prod-precio', 'El precio es requerido.');
    esValido = false;
  } else if (parseFloat(precio) < 0) {
    mostrarError('prod-precio', 'El precio no puede ser negativo (0 es FREE).');
    esValido = false;
  }

  // 5. VALIDAR STOCK [cite: 454-459]
  const stock = stockInput.value;
  if (stock === '') {
    mostrarError('prod-stock', 'El stock es requerido.');
    esValido = false;
  } else if (parseInt(stock) < 0) {
    mostrarError('prod-stock', 'El stock no puede ser negativo.');
    esValido = false;
  } else if (!/^\d+$/.test(stock)) { // Revisa si son solo números enteros
    mostrarError('prod-stock', 'El stock debe ser un número entero.');
    esValido = false;
  }
  
  // 6. VALIDAR CATEGORÍA [cite: 465-467]
  if (categoriaInput.value === '') {
    mostrarError('prod-categoria', 'Debe seleccionar una categoría.');
    esValido = false;
  }

  // 7. VEREDICTO FINAL
  if (esValido) {
    alert('¡Producto guardado exitosamente! (Simulación)');
    form.reset();
  }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 7. LÓGICA DE VALIDACIÓN: DESCUENTO POR EDAD (REGISTRO) ---

function validarEdadParaDescuento(fechaNacimiento) {
  const mensajeExitoDiv = document.getElementById('success-fecha-nac');
  
  if (!fechaNacimiento) {
    mensajeExitoDiv.style.display = 'none';
    return;
  }

  // 1. Calcular la edad
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  // 2. Mostrar el mensaje
  if (edad >= 50) {
    mensajeExitoDiv.textContent = '¡Felicidades! Calificas para nuestro 50% de descuento para mayores de 50 años.';
    mensajeExitoDiv.style.display = 'block';
  } else {
    mensajeExitoDiv.style.display = 'none';
  }
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 8. LÓGICA DE VALIDACIÓN: FORMULARIO DE USUARIO (ADMIN) ---
// [Reglas basadas en Anexo 1, "Usuario"]

function validarFormularioUsuario() {
  
  // Seleccionamos el formulario y los campos
  const form = document.getElementById('usuario-form');
  const runInput = document.getElementById('user-run');
  const nombreInput = document.getElementById('user-nombre');
  const apellidosInput = document.getElementById('user-apellidos');
  const emailInput = document.getElementById('user-email');
  // const fechaNacInput = document.getElementById('user-fecha-nac'); // Es opcional
  const tipoInput = document.getElementById('user-tipo');
  const direccionInput = document.getElementById('user-direccion');
  const regionInput = document.getElementById('user-region');
  const comunaInput = document.getElementById('user-comuna');
  
  // Limpiamos errores anteriores (¡Reutilizamos!)
  limpiarTodosLosErrores(form);

  let esValido = true;

  // 1. VALIDAR RUN [cite: 471-476]
  const run = runInput.value.trim();
  if (run === '') {
    mostrarError('user-run', 'El RUN es requerido.');
    esValido = false;
  } else if (!/^[0-9]{7,8}[-]{0,1}[0-9kK]{1}$/.test(run)) {
    mostrarError('user-run', 'Formato de RUN incorrecto (Ej: 12345678K).');
    esValido = false;
  }

  // 2. VALIDAR NOMBRE [cite: 477-479]
  const nombre = nombreInput.value.trim();
  if (nombre === '') {
    mostrarError('user-nombre', 'El nombre es requerido.');
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError('user-nombre', 'El nombre no puede exceder los 50 caracteres.');
    esValido = false;
  }

  // 3. VALIDAR APELLIDOS [cite: 480-482]
  const apellidos = apellidosInput.value.trim();
  if (apellidos === '') {
    mostrarError('user-apellidos', 'Los apellidos son requeridos.');
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError('user-apellidos', 'Los apellidos no pueden exceder los 100 caracteres.');
    esValido = false;
  }

  // 4. VALIDAR CORREO [cite: 483-486]
  const email = emailInput.value.trim();
  if (email === '') {
    mostrarError('user-email', 'El correo es requerido.');
    esValido = false;
  } else {
    // Aplicando la excepción solicitada (sin @profesor.duoc.cl)
    const emailRegex = /@(duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      mostrarError('user-email', 'Solo se permiten correos @duoc.cl o @gmail.com.');
      esValido = false;
    }
  }

  // 5. VALIDAR TIPO DE USUARIO [cite: 492-495]
  if (tipoInput.value === '') {
    mostrarError('user-tipo', 'Debe seleccionar un tipo de usuario.');
    esValido = false;
  }
  
  // 6. VALIDAR DIRECCIÓN [cite: 501-502, 504]
  const direccion = direccionInput.value.trim();
  if (direccion === '') {
    mostrarError('user-direccion', 'La dirección es requerida.');
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError('user-direccion', 'La dirección no puede exceder los 300 caracteres.');
    esValido = false;
  }

  // 7. VALIDAR REGIÓN Y COMUNA [cite: 496-500]
  if (regionInput.value === '') {
    mostrarError('user-region', 'Debe seleccionar una región.');
    esValido = false;
  }
  if (comunaInput.value === '') {
    mostrarError('user-comuna', 'Debe seleccionar una comuna.');
    esValido = false;
  }

  // (Fecha de Nacimiento es opcional, no se valida [cite: 487-488, 490])

  // 8. VEREDICTO FINAL
  if (esValido) {
    alert('¡Usuario guardado exitosamente! (Simulación)');
    form.reset();
  }
}


/*--------------------------------------------------------------------------------------------------------------------------------*/
// --- 9. LÓGICA DE VALIDACIÓN: CHECKOUT ---

function validarFormularioCheckout() {
  const form = document.getElementById('checkout-form');
  const emailInput = document.getElementById('checkout-email');
  const direccionInput = document.getElementById('checkout-direccion');
  const fechaInput = document.getElementById('checkout-fecha-entrega');
  const tarjetaInput = document.getElementById('checkout-tarjeta');

  limpiarTodosLosErrores(form);
  let esValido = true;

  // 1. Validar Email
  if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
    mostrarError('checkout-email', 'Se requiere un correo válido.');
    esValido = false;
  }

  // 2. Validar Dirección
  if (direccionInput.value.trim() === '') {
    mostrarError('checkout-direccion', 'La dirección es requerida.');
    esValido = false;
  }

  // 3. Validar Fecha de Entrega
  if (fechaInput.value === '') {
    mostrarError('checkout-fecha-entrega', 'Debe seleccionar una fecha.');
    esValido = false;
  }

  // 4. Validar Tarjeta (Simulación simple)
  const tarjeta = tarjetaInput.value.replace(/\s/g, ''); // Quita espacios
  if (tarjeta === '' || !/^\d{16}$/.test(tarjeta)) {
    mostrarError('checkout-tarjeta', 'Se requiere un número de tarjeta válido (16 dígitos).');
    esValido = false;
  }

  return esValido;
}