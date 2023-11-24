  
  let uploadDataId = null;

fetch('http://localhost:3000/usuarios', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
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
    for (let index = 0; index < data.length; index++) {
      
      CrearRow(data[index]);
      console.log(data[index])
      
    }
    

  })
  .catch(error => console.error('Error:', error));


  function CrearRow({id,Nombre,Apellido,DNI,Numero}){
    let tabla = document.getElementById("tabla");
    let row = document.createElement("tr");
  
    // Crear celda para nombre y asignar contenido
    let tdNombre = document.createElement("td");
    tdNombre.textContent = Nombre;
    row.appendChild(tdNombre);
  
    // Crear celda para apellido y asignar contenido
    let tdApellido = document.createElement("td");
    tdApellido.textContent = Apellido;
    row.appendChild(tdApellido);
  
    // Crear celda para número y asignar contenido
    let tdNumero = document.createElement("td");
    tdNumero.textContent = Numero;
    row.appendChild(tdNumero);
  
    // Crear celda para DNI y asignar contenido
    let tdDNI = document.createElement("td");
    tdDNI.textContent = DNI;
    row.appendChild(tdDNI);

    let tdBTN = document.createElement("button");
    tdBTN.textContent = "Editar";
    tdBTN.className = "BTNEditar";
    tdBTN.id = id;
    tdBTN.onclick = function () {
      // Obtener el ID del usuario de alguna manera (por ejemplo, desde una variable o un elemento HTML)
      ObtenerUsuario(id);
       // Muestra el modal después de obtener los datos
    };
    row.appendChild(tdBTN);
    
    let tdBTN2 = document.createElement("button");
    tdBTN2.textContent = "Desactivar";
    tdBTN2.className = "BTNBorrar";
    tdBTN2.id = id;
    tdBTN2.onclick = function () {
      BorrarUsuario(id)
    };
    row.appendChild(tdBTN2);
    
  
    tabla.appendChild(row);
  }

  function BorrarUsuario(id) {
    fetch(`http://localhost:3000/DesactivarUsuario/${id}`, {
      method: 'DELETE',  // Usar DELETE en lugar de POST
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      console.log('Usuario eliminado exitosamente');
      // Realiza acciones adicionales si es necesario
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  

  function ObtenerUsuario(id) {
    fetch(`http://localhost:3000/update/${id}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
      insertarDatos(data);
      uploadDataId = data.id;
      console.log(uploadDataId);
      mostrarModal(); // Asegura que el modal se muestre después de insertar los datos
    })
  }


  function actualizarUsuario() {
    const nombre = document.getElementById("NombreUpdate").value;
    const apellido = document.getElementById("ApellidoUpdate").value;
    const dni = document.getElementById("DniUpdate").value;
    const numero = document.getElementById("NumeroUpdate").value;
  
    var regexNombreApellido = /^[a-zA-Z\s]+$/;
    var regexNumero = /^\d+$/;
  
    var errorNombre = document.getElementById('errorNombre');
    var errorApellido = document.getElementById('errorApellido');
    var errorNumero = document.getElementById('errorNumero');
    var errorDNI = document.getElementById('errorDNI');
  
    errorNombre.style.display = 'none';
    errorApellido.style.display = 'none';
    errorNumero.style.display = 'none';
    errorDNI.style.display = 'none';
  
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
  
    if (dni.length !== 8 || !regexNumero.test(dni)) {
      errorDNI.style.display = 'block';
      return;
    }
  

  const nuevoUsuario = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    numero: numero
  };
 
  
  if (nombre === "" || apellido === "" || dni === "" || numero === "") {
    if (nombre === "") errorNombre.style.display = "block";
    if (apellido === "") errorApellido.style.display = "block";
    if (dni === "") errorDNI.style.display = "block";
    if (numero === "") errorNumero.style.display = "block";
    throw new Error('Error al actualizar el usuario');
  } else {
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
          // El DNI no está registrado, proceder con la actualización del usuario
          fetch(`http://localhost:3000/actualizarUsuario/${uploadDataId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario) // Envía los nuevos datos en formato JSON
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
              }
              console.log('Usuario actualizado exitosamente');
              return response.json();
            })
            .then(data => {
              console.log('Respuesta del servidor al actualizar usuario:', data);
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
}
  


function insertarDatos({Nombre,Apellido,DNI,Numero}){
  let nombreUpdate = document.getElementById("NombreUpdate");
  let apellidoUpdate = document.getElementById("ApellidoUpdate");
  let dniUpdate = document.getElementById("DniUpdate");
  let numeroUpdate = document.getElementById("NumeroUpdate");
  
  nombreUpdate.value = Nombre;
  apellidoUpdate.value = Apellido;
  dniUpdate.value = DNI;
  numeroUpdate.value = Numero;
  
}

function mostrarModal() {
  document.getElementById("myModal").style.display = "block";
}


// Cierra el modal cuando se hace clic en la "X" o en cualquier parte fuera del modal
document.getElementById("closeModalBtn").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
});

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
};

  



