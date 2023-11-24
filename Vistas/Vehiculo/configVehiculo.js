  let idMarca;
  let uploadDataId = null;
  let IdSeleccionada = 0;
  let IdSeleccionadaModelo = 0;
  let IdSeleccionadaMarca = 0;
  let IdSeleccionadaTipo = 0;
  let TipoVehiculoSelect;

  
  console.log("Esta es la id seleccionada",IdSeleccionada);
  fetch('http://localhost:3000/vehiculos', { 
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


    fetch('http://localhost:3000/tipo', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al obtener los tipos');
      }
      return response.json();
  })
  .then(data => {
  
    const tipoVehiculoUsuario = TipoVehiculoSelect;
    agregarOpcionesTipoVehiculo(data, tipoVehiculoUsuario);
    
    console.log("Tipos", data);
  })
  .catch(error => console.error('Error:', error));

  function agregarOpcionesTipoVehiculo(data, tipoVehiculoUsuario) {
    const selectTipo = document.getElementById('tipoVehiculo');
  
    // Limpiar el select antes de agregar nuevas opciones
    selectTipo.innerHTML = '';
  
    data.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.id; 
      option.textContent = tipo.nombre; 
      selectTipo.appendChild(option);
      if (tipo.id === tipoVehiculoUsuario) {
        option.selected = true;
      }
    });
  }
  
  

    fetch('http://localhost:3000/marca', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar la marca');
      }
      console.log('');
      return response.json();
    })
    .then(data => {
  
    
      console.log("Estos son las marcas", data)
  
  
    })
    .catch(error => console.error('Error:', error));


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
        
        console.log(data[index])
        
      }
      
  
    })
    .catch(error => console.error('Error:', error));

    function CrearRow({id,Patente,Dueño,Modelo,Marca,Tipo}){
        let tabla = document.getElementById("tabla-servicios");
        let row = document.createElement("tr");
      
        // Crear celda para nombre y asignar contenido
        let tdPatente = document.createElement("td");
        tdPatente.textContent = Patente;
        row.appendChild(tdPatente);
      
        // Crear celda para apellido y asignar contenido
        let tdDueño = document.createElement("td");
        tdDueño.textContent = Dueño;
        row.appendChild(tdDueño);
      
        // Crear celda para número y asignar contenido
        let tdModelo = document.createElement("td");
        tdModelo.textContent = Modelo;
        row.appendChild(tdModelo);
      
        // Crear celda para DNI y asignar contenido
        let tdMarca = document.createElement("td");
        tdMarca.textContent = Marca;
        row.appendChild(tdMarca);
        // Crear celda para DNI y asignar contenido
        let tdTipo = document.createElement("td");
        tdTipo.textContent = Tipo;
        row.appendChild(tdTipo);
    
        let tdBTN = document.createElement("button");
        tdBTN.textContent = "Editar";
        tdBTN.className = "BTNEditar";
        tdBTN.id = id;
        tdBTN.onclick = function () {
          // Obtener el ID del usuario
          ObtenerUsuario(id);
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
    
      
      function ObtenerUsuario(id) {
        fetch(`http://localhost:3000/updateVehiculo/${id}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos del vehículo');
          }
          return response.json();
        })
        .then(data => {
          
          console.log('Respuesta del servidor al obtener datos del vehículo:', data);
          const selectTipo = document.getElementById('tipoVehiculo');
          // Inserta los datos del vehículo en el modal
          insertarDatos(data);
          uploadDataId = data.id;
          IdSeleccionada = data.idDueño;
          IdSeleccionadaMarca = data.idMarca;
          IdSeleccionadaModelo = data.idModelo;
          IdSeleccionadaTipo = data.idTipo;
          TipoVehiculoSelect = data.idTipo;

          fetch('http://localhost:3000/tipo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los tipos');
            }
            return response.json();
        })
        .then(data => {
        
          const tipoVehiculoUsuario = IdSeleccionadaTipo;
          agregarOpcionesTipoVehiculo(data, tipoVehiculoUsuario);
          
          console.log("Tipos", data);
        })
        .catch(error => console.error('Error:', error));
          // Muestra el modal
          mostrarModal();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
      
   


      function actualizarVehiculo() {
        const Dueño = document.getElementById("DueñoUpdate").value;
        const Modelo = document.getElementById("ModeloUpdate").value;
        const Patente = document.getElementById("PatenteUpdate").value;
        const Marca = document.getElementById("MarcaUpdate").value;
        const Tipo = document.getElementById("tipoVehiculo").value;
    
        const errorDueño = document.getElementById("errorDueño");
        const errorModelo = document.getElementById("errorModelo");
        const errorPatente = document.getElementById("errorPatente");
        const errorMarca = document.getElementById("errorMarca");
        const errorTipo = document.getElementById("errorTipo");
    
    
        // Verificar campos vacíos
        if (Dueño === "") {
            errorDueño.style.display = "block";
            throw new Error('El campo Dueño no puede estar vacío');
        }
        if (Modelo === "") {
            errorModelo.style.display = "block";
            throw new Error('El campo Modelo no puede estar vacío');
        }
        if (Patente === "") {
            errorPatente.style.display = "block";
            throw new Error('El campo Patente no puede estar vacío');
        }
        if (Marca === "") {
            errorMarca.style.display = "block";
            throw new Error('El campo Marca no puede estar vacío');
        }
        if (Tipo === "") {
            errorTipo.style.display = "block";
            throw new Error('El campo Tipo no puede estar vacío');
        }
    
        
        const nuevoVehiculo = {
            idDueño: IdSeleccionada,
            idModelo:IdSeleccionadaModelo,
            idMarca: IdSeleccionadaMarca,
            idTipo: Tipo,
            Patente: Patente
            
        };
    
      
            fetch(`http://localhost:3000/actualizarVehiculo/${uploadDataId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoVehiculo)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el vehículo');
                }
                console.log('Vehículo actualizado exitosamente');
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor al actualizar vehículo:', data);
                // Puedes realizar acciones adicionales aquí si es necesario
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

    
    
    function insertarDatos({ Dueño, Marca, Modelo, TipoVehiculo, Patente }) {
      let DueñoUpdate = document.getElementById("DueñoUpdate");
      let ModeloUpdate = document.getElementById("ModeloUpdate");
      let PatenteUpdate = document.getElementById("PatenteUpdate");
      let MarcaUpdate = document.getElementById("MarcaUpdate");
      //let TipoUpdate = document.getElementById("tipoVehiculo");
    
      DueñoUpdate.value = Dueño;
      ModeloUpdate.value = Modelo;
      PatenteUpdate.value = Patente;
      MarcaUpdate.value = Marca;
      //TipoUpdate.value = TipoVehiculo;
    }
    

    function BorrarUsuario(id) {
      fetch(`http://localhost:3000/DesactivarVehiculo/${id}`, {
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
    
  const inputDueño = document.getElementById("DueñoUpdate");
  inputDueño.addEventListener('keyup', () => {
    console.log("Esta es la id Seleccionada XDD",IdSeleccionada);
      const searchTerm = inputDueño.value;
      if (searchTerm.trim() !== '') {
          conseguirDueño(searchTerm); 
      } else {
          clearSelectBoxes();
      }
  });

  const inputMarca = document.getElementById("MarcaUpdate");
  inputMarca.addEventListener('keydown', () => {

    const searchTerm = inputMarca.value;


    if (searchTerm.trim() !== '') {
      conseguirMarca(searchTerm); 

  
    } else {
        clearSelectBoxesModelo();
    }
});


const inputModelo = document.getElementById("ModeloUpdate");
inputModelo.addEventListener('keydown', () => {

    const searchTerm = inputModelo.value;


    if (searchTerm.trim() !== '') {
      //ObtenerModelo(idMarca)

  
    } else {
        clearSelectBoxesModelo();
    }
});


    function conseguirDueño(searchTerm) {
      fetch(`http://localhost:3000/buscar?term=${searchTerm}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al buscar el usuario');
          }
          return response.json();
      })
      .then(data => {
        console.log("DataAct",data)
          clearSelectBoxes();
          data.forEach(item => {
            createSelect(item);
          
          });
      })
      .catch(error => console.error('Error:', error));
  }
  
    function createSelect({ id, Nombre, Apellido,DNI }) {

  
      const container = document.getElementById("dueños");
      const inputDueño = document.getElementById("DueñoUpdate");
      const input = document.createElement("div");
      input.textContent = `${DNI} - ${Nombre} ${Apellido}`;
      //const idDueño = document.getElementById("idDueño");
     
  
      input.addEventListener("click", function() {
      inputDueño.value = `${Nombre} ${Apellido} `;
      //idDueño.value = id; guardaba la id en el html
      IdSeleccionada = id;
      console.log("se selecciono esta id",IdSeleccionada)

      inputDueño.setAttribute("data-id", id);
       clearSelectBoxes()
       });
      
      container.appendChild(input);
  }



  function clearSelectBoxes() {
    const inputContainer = document.getElementById("dueños");
    inputContainer.innerHTML = ''; 
    
 
}


function ObtenerModelo(id) {
  fetch(`http://localhost:3000/modelo/${id}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al agregar el modelo');
    }
    console.log('');
    return response.json();
  })
  .then(data => {
    console.log("Estos son los modelos", data)
    clearSelectBoxesModelo();
    data.forEach(item => {
      createSelectModelo(item);
    });

  })
  .catch(error => console.error('Error:', error));
}


function conseguirMarca(searchTerm) {
  fetch(`http://localhost:3000/buscarModelo?term=${searchTerm}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al buscar la Marca');
      }
      return response.json();
  })
  .then(data => {
    //idMarca = data[0].id
    console.log("La id sleeccionada es",idMarca)
      clearSelectBoxesMarca();
      clearSelectBoxesModelo()
      data.forEach(item => {
        createSelectMarca(item);
        
      });
      ObtenerModelo(idMarca);
  })
  .catch(error => console.error('Error:', error));
}

function createSelectMarca({ id, nombre }) {
  const container = document.getElementById("dueñosMarca");
  const inputDueño = document.getElementById("MarcaUpdate");
  const input = document.createElement("div");
 // const idMarcaInput = document.getElementById("idMarca");
  input.textContent = `${nombre}`;
  input.setAttribute("data-id", id); // Agregar un atributo data-id al div

  input.addEventListener("click", function() {
      IdSeleccionadaMarca = id;
      inputDueño.value = `${nombre}`;
      //idMarcaInput.value = id;
      idMarca = id; // Asignar el valor de id a la variable idMarca
      console.log("La id seleccionada es", idMarca); // Imprimir la id en la consola
      clearSelectBoxesMarca();
      ObtenerModelo(idMarca); // Llamar a la función ObtenerModelo con la idMarca seleccionada
  });

  container.appendChild(input);
}

function createSelectModelo({ modeloId, modeloNombre }) {
  const container = document.getElementById("dueñosModelo");
  const inputModelo = document.getElementById("ModeloUpdate");
  //const idModeloInput = document.getElementById("idModelo");

  const input = document.createElement("div");
  input.textContent = `${modeloNombre}`;
  input.setAttribute("data-id", modeloId); // Agregar un atributo data-id al div

  input.addEventListener("click", function() {
      inputModelo.value = modeloNombre;
      //idModeloInput.value = modeloId;
      IdSeleccionadaModelo = modeloId;

      console.log("La id de modelo seleccionada es", modeloId);
      console.log("La id de marca seleccionada es", idMarca);
      IdSeleccionadaMarca=idMarca;
      IdSeleccionadaModelo=modeloId;
      clearSelectBoxesModelo();
  });

  container.appendChild(input);
}



function clearSelectBoxesMarca() {
    const inputContainer = document.getElementById("dueñosMarca");
    inputContainer.innerHTML = ''; 
    
 
}



function clearSelectBoxesModelo() {
  const inputContainer = document.getElementById("dueñosModelo");
  inputContainer.innerHTML = ''; 
  

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
    
      
    
    