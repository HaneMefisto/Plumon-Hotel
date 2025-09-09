document.addEventListener('DOMContentLoaded', function() {

    // Obtén los elementos del pop-up por su ID
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    const popupCloseButton = document.getElementById('popup-close');
    
    // Obtiene el formulario (lo declaramos aquí para que esté disponible globalmente en este ámbito)
    const formulario = document.getElementById('formularioReserva');

    // Función para mostrar el pop-up
    function showPopup(title, message, type) {
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popupContent.classList.remove('error', 'success');
        popupContent.classList.add(type);
        popupOverlay.style.display = 'flex';
    }

    // Función para ocultar el pop-up
    function hidePopup() {
        popupOverlay.style.display = 'none';
    }

    // Evento para cerrar el pop-up al hacer clic en el botón
    // Ahora, el botón de "Cerrar" solo envía el formulario si el pop-up es de éxito
    popupCloseButton.addEventListener('click', function() {
        if (popupContent.classList.contains('success')) {
            hidePopup();
            formulario.submit(); // Envía el formulario y recarga la página
        } else {
            hidePopup();
        }
    });

    // Maneja el scroll suave al hacer clic en los enlaces de la navegación
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Validación del formulario de reservas (Sección 'Reservas')
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            let errores = [];

            // Limpiar los errores de los campos (quita el borde rojo)
            limpiarClaseInvalida();

            // Validación del nombre
            const campoNombre = document.getElementById('nombre');
            const nombre = campoNombre.value.trim();
            if (nombre === '') {
                campoNombre.classList.add('invalid');
                errores.push('Por favor, ingrese su nombre completo.');
            } else if (nombre.length < 3) {
                campoNombre.classList.add('invalid');
                errores.push('El nombre debe tener al menos 3 caracteres.');
            }

            // Validación del email
            const campoEmail = document.getElementById('email');
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const email = campoEmail.value.trim();
            if (email === '') {
                campoEmail.classList.add('invalid');
                errores.push('Por favor, ingrese su correo electrónico.');
            } else if (!regexEmail.test(email)) {
                campoEmail.classList.add('invalid');
                errores.push('Por favor, ingrese un correo electrónico válido.');
            }

            // Validación del teléfono
            const campoTelefono = document.getElementById('telefono');
            const regexTelefono = /^(?:\+?56)?(?:9)?[2-9]\d{7,11}$/;
            const telefono = campoTelefono.value.trim();
            if (telefono === '') {
                campoTelefono.classList.add('invalid');
                errores.push('Por favor, ingrese un número de teléfono.');
            } else if (!regexTelefono.test(telefono)) {
                campoTelefono.classList.add('invalid');
                errores.push('Ingrese un número de teléfono válido (ej.: 56123456789, 123456789, 12345678). Si su número incluye un código de área distinto, indíquelo en la casilla de comentarios adicionales.');
            }

            // Validación de fechas
            const campoLlegada = document.getElementById('llegada');
            const campoSalida = document.getElementById('salida');
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); 
            const fechaLlegada = new Date(campoLlegada.value.trim());
            const fechaSalida = new Date(campoSalida.value.trim());

            if (campoLlegada.value.trim() === '') {
                campoLlegada.classList.add('invalid');
                errores.push('Por favor, ingrese la fecha de llegada.');
            } else if (fechaLlegada < hoy) {
                campoLlegada.classList.add('invalid');
                errores.push('La fecha de llegada seleccionada no puede ser anterior al día de hoy. Por favor, ingrese una fecha posterior a la actual.');
            }

            if (campoSalida.value.trim() === '') {
                campoSalida.classList.add('invalid');
                errores.push('Por favor, ingrese la fecha de salida.');
            } else if (fechaSalida <= fechaLlegada) {
                campoSalida.classList.add('invalid');
                errores.push('La fecha de salida debe ser posterior a la de llegada.');
            }
            
            // Si hay errores, muestra el pop-up con todos los mensajes
            if (errores.length > 0) {
                const mensajeErrores = errores.join('\n');
                showPopup('¡Hubo un error!', mensajeErrores, 'error');
            } else {
                // Muestra el pop-up de éxito
                showPopup('¡Formulario enviado con éxito!', 'Nos pondremos en contacto contigo pronto.', 'success');
                // El formulario no se envía aquí, solo se envía cuando el usuario hace clic en el botón del pop-up.
            }
        });
    }

    // Función de utilidad para limpiar la clase 'invalid' de todos los campos
    function limpiarClaseInvalida() {
        const camposInvalidos = document.querySelectorAll('.invalid');
        camposInvalidos.forEach(campo => {
            campo.classList.remove('invalid');
        });
    }
});