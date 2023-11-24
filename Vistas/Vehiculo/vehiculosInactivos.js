fetch('http://localhost:3000/vehiculosInactivos', { 
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


  function CrearRow({id,Patente,NombreCliente,NombreModelo,NombreMarca,NombreTipoVehiculo}){
    let tabla = document.getElementById("tabla");
    let row = document.createElement("tr");
  
    // Crear celda para nombre y asignar contenido
    let tdPatente = document.createElement("td");
    tdPatente.textContent = Patente;
    row.appendChild(tdPatente);
  
    // Crear celda para apellido y asignar contenido
    let tdDueño = document.createElement("td");
    tdDueño.textContent = NombreCliente;
    row.appendChild(tdDueño);
  
    // Crear celda para número y asignar contenido
    let tdModelo = document.createElement("td");
    tdModelo.textContent = NombreModelo;
    row.appendChild(tdModelo);
  
    // Crear celda para DNI y asignar contenido
    let tdMarca = document.createElement("td");
    tdMarca.textContent = NombreMarca;
    row.appendChild(tdMarca);
    // Crear celda para DNI y asignar contenido
    let tdTipo = document.createElement("td");
    tdTipo.textContent = NombreTipoVehiculo;
    row.appendChild(tdTipo);

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
    fetch(`http://localhost:3000/ActivarVehiculo/${id}`, {
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
  
 