fetch('http://localhost:3000/tiposervicios', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los tipos de servicios');
        }
        return response.json();
    })
    .then(data => {
       console.log(data)
       for (let index = 0; index < data.length; index++) {
        CrearRow(data[index]);
        
       }
    })
    .catch(error => console.error('Error:', error));



    function CrearRow({id,nombre,descripcion,precio}){
        let tabla = document.getElementById("tabla-tiposervicios");
        let row = document.createElement("tr");
      
        // Crear celda para nombre y asignar contenido
        let tdnombre = document.createElement("td");
        tdnombre.textContent = nombre;
        row.appendChild(tdnombre);
      
        // Crear celda para apellido y asignar contenido
        let tddescripcion = document.createElement("td");
        tddescripcion.textContent = descripcion;
        row.appendChild(tddescripcion);
      
        // Crear celda para número y asignar contenido
        let tdprecio = document.createElement("td");
        tdprecio.textContent = precio;
        row.appendChild(tdprecio);
      
    
        let tdBTN = document.createElement("button");
        tdBTN.textContent = "Editar";
        tdBTN.className = "BTNEditar";
        tdBTN.id = id;
        tdBTN.onclick = function () {
          // Obtener el ID del usuario de alguna manera (por ejemplo, desde una variable o un elemento HTML)
          ObtenerTipoServicio(id)
           // Muestra el modal después de obtener los datos
        };
        row.appendChild(tdBTN);
        
        let tdBTN2 = document.createElement("button");
        tdBTN2.textContent = "Desactivar";
        tdBTN2.className = "BTNBorrar";
        tdBTN2.id = id;
        tdBTN2.onclick = function () {
          DesactivarTipoServicio(id) 
        };
        row.appendChild(tdBTN2);
        
      
        tabla.appendChild(row);
      }
    
      function DesactivarTipoServicio(id) {
        fetch(`http://localhost:3000/DesactivarTipoServicio/${id}`, {
          method: 'DELETE',  // Usar DELETE en lugar de POST
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el TipoServicio');
          }
          console.log('TipoServicio eliminado exitosamente');
          // Realiza acciones adicionales si es necesario
          window.location.reload();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
      



      function ObtenerTipoServicio(id) {
        fetch(`http://localhost:3000/updateTipoServicio/${id}`, { 
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
    
      function insertarDatos({nombre,descripcion,precio}){
        const nombreUpdate = document.getElementById("nombreUpdate");
        const descripcionUpdate = document.getElementById("descripcionUpdate");
        const precioUpdate = document.getElementById("precioUpdate");

        nombreUpdate.value = nombre;
        descripcionUpdate.value = descripcion;
        precioUpdate.value= precio;

      }

  function actualizarTipoServicio(){
    const nombreTipo = document.getElementById("nombreUpdate").value;
    const descripcion = document.getElementById("descripcionUpdate").value;
    const precio = document.getElementById("precioUpdate").value;

    const nuevoTipoServicio = {
      nombre: nombreTipo,
      precio: precio,
      descripcion: descripcion
    }
    
    fetch(`http://localhost:3000/actualizarTipoServicio/${uploadDataId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoTipoServicio) // Envía los nuevos datos en formato JSON
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el tipo de servicio');
        }
        console.log('tipo de servicio actualizado exitosamente');
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor el tipo de servicio:', data);
        // Puedes realizar acciones adicionales aquí si es necesario
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });





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
          
