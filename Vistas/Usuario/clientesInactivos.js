fetch('http://localhost:3000/usuariosInactivos', { 
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

   
    
    let tdBTN2 = document.createElement("button");
    tdBTN2.textContent = "Activar";
    tdBTN2.className = "BTNBorrar";
    tdBTN2.id = id;
    tdBTN2.onclick = function () {
      BorrarUsuario(id)
    };
    row.appendChild(tdBTN2);
    
  
    tabla.appendChild(row);
  }

  function BorrarUsuario(id) {
    fetch(`http://localhost:3000/ActivarUsuario/${id}`, {
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
  
 