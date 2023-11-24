fetch('http://localhost:3000/tipoServiciosInactivos', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al agregar Tipo de servicios desactivados');
    }
    console.log('Tipos de servicios desactivados agregado exitosamente');
    return response.json();
  })
  .then(data => {
    console.log('Respuesta del servidor al agregar Tipos de servicios desactivados:', data);
    for (let index = 0; index < data.length; index++) {
      
      CrearRow(data[index]);
      console.log(data[index])
      
    }
    

  })
  .catch(error => console.error('Error:', error));


  function CrearRow({id,nombre,descripcion,precio}){
    let tabla = document.getElementById("tabla-tiposervicios");
    let row = document.createElement("tr");
  
    // Crear celda para nombre y asignar contenido
    let tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;
    row.appendChild(tdNombre);
  
    // Crear celda para apellido y asignar contenido
    let tddescripcion = document.createElement("td");
    tddescripcion.textContent = descripcion;
    row.appendChild(tddescripcion);
  
    // Crear celda para número y asignar contenido
    let tdPrecio = document.createElement("td");
    tdPrecio.textContent = precio;
    row.appendChild(tdPrecio);
  


    
    let tdBTN2 = document.createElement("button");
    tdBTN2.textContent = "Activar";
    tdBTN2.className = "BTNEditar";
    tdBTN2.id = id;
    tdBTN2.onclick = function () {
        ActivarTipo(id)
    };
    row.appendChild(tdBTN2);
    
  
    tabla.appendChild(row);
  }




  function ActivarTipo(id) {
    fetch(`http://localhost:3000/ActivarTipoServicio/${id}`, {
      method: 'DELETE',  // Usar DELETE en lugar de POST
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el Tipo Servicio');
      }
      console.log('Tipo Servicio eliminado exitosamente');
      // Realiza acciones adicionales si es necesario
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  