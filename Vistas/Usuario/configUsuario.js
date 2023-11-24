function enviarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const numero = document.getElementById("numero").value;
  const dni = document.getElementById("dni").value;

  // Obtén los elementos de error específicos para cada campo
  const errorNombre = document.getElementById("errorNombre");
  const errorApellido = document.getElementById("errorApellido");
  const errorNumero = document.getElementById("errorNumero");
  const errorDNI = document.getElementById("errorDNI");

  var regexNombreApellido = /^[a-zA-Z\s]+$/;
  var regexNumero = /^\d+$/;

  // Validaciones de los campos
  if (!regexNombreApellido.test(nombre)) {
    errorNombre.style.display = 'block';
    return;
  }

  if (!regexNombreApellido.test(apellido)) {
    errorApellido.style.display = 'block';
    return;
  }

  if (!regexNumero.test(numero)) {
    errorNumero.style.display = 'block';
    return;
  }

  if (dni.length !== 8 || !regexNumero.test(dni) || dni.length > 8) {
    errorDNI.style.display = 'block';
    return;
  }

  // Comprobar si el DNI ya está registrado
  fetch(`http://localhost:3000/usuarios/${dni}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al buscar el DNI');
      }
      return response.json();
    })
    .then(data => {
      if (data.message === 'El DNI ya está registrado') {
        // El DNI ya está registrado, mostrar error
        errorDNI.style.display = 'block';
        throw new Error('El DNI ya está registrado');
      } else {
        // El DNI no está registrado, proceder con la inserción del usuario
        const nuevoUsuario = {
          nombre: nombre,
          apellido: apellido,
          dni: dni,
          numero: numero
        };

        // Realizar la solicitud para agregar el nuevo usuario
        fetch('http://localhost:3000/agregarUsuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoUsuario) // Envía los nuevos datos en formato JSON
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al agregar el usuario');
            }
            console.log('Usuario agregado exitosamente');
            return response.json();
          })
          .then(data => {
            console.log('Respuesta del servidor al agregar usuario:', data);
            // Puedes realizar acciones adicionales aquí si es necesario
            window.location.reload();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function redirigirAotraPagina() {
  // Establece la URL a la que deseas redirigir al usuario
  const nuevaPaginaURL = "./cliente.html"; // Reemplaza con la URL de tu página

  // Redirige al usuario a la nueva página
  window.location.href = nuevaPaginaURL;
}
