
 let idUser;
const idDueño = document.getElementById("idDueño");
fetch('http://localhost:3000/usuarios', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        return response.json();
    })
    .then(data => {
       console.log(data)
    })
    .catch(error => console.error('Error:', error));



function abrirModal() {
    document.getElementById("modalEditar").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalEditar").style.display = "none";
}

function guardarEdicion() {
    cerrarModal();
}

function CrearSelect({id,Nombre}){
    let select = document.getElementById("Dueño");


    let optionNombre = document.createElement("option");
    optionNombre.textContent = Nombre;
    select.appendChild(optionNombre);



  }


  const selectLavado = document.getElementById("SeleccionLavado");
  const precioLavadoInput = document.getElementById("PrecioLavado");

selectLavado.addEventListener('change', () => {
  const selectedOption = selectLavado.options[selectLavado.selectedIndex];
  const precioLavado = selectedOption.dataset.precio;
 // Actualizar el valor del campo de entrada con el precio correspondiente
 precioLavadoInput.value = precioLavado !== undefined ? precioLavado : '';
});

  const inputDueño = document.getElementById("inputDueño");
  inputDueño.addEventListener('keyup', () => {
  
      const searchTerm = inputDueño.value;
  
  
      if (searchTerm.trim() !== '') {
          conseguirDueño(searchTerm); 
      } else {
          clearSelectBoxes();
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
      
      clearSelectBoxes();
      console.log("Este es el usuario", data);
      idUser = data[0].id; // Almacena el ID del usuario seleccionado
      console.log("ID del usuario", idUser);
      data.forEach(item => {
        createSelect(item);
      });

      // Realiza el segundo fetch para obtener los vehículos del usuario
        if (searchTerm.trim().length === 8) {
            fetch(`http://localhost:3000/vehiculosUsuario/${idUser}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los vehículos del usuario');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Estos son los vehículos", data);
                    const select = document.getElementById('PatenteDueño');
                    select.innerHTML = ''; // Borra cualquier opción existente
                    if (data.length === 0) {
                      createOptionError()
                    }else{
                      data.forEach((item) => {
                          createOption(item); // Crea opciones para cada vehículo
                      });
                    }
                })
                .catch((error) => {
                    console.error('Error al obtener los vehículos del usuario', error);
                });
        }
        else{
           const select = document.getElementById('PatenteDueño');
                    select.innerHTML = ''; // Borra cualquier opción existente
        }
    })
    .catch(error => console.error('Error:', error));
}
  
function createSelect({ id, Nombre, Apellido,DNI }) {

  
    const container = document.getElementById("dueños");
    const inputDueño = document.getElementById("inputDueño");
    const input = document.createElement("div");
    input.textContent = `${DNI} - ${Nombre} ${Apellido}`;
   

    input.addEventListener("click", function() {
    inputDueño.value = `${DNI}`;
    idDueño.value = id;
    inputDueño.setAttribute("data-id", id);
     clearSelectBoxes()
     });
    
    container.appendChild(input);
}


function clearSelectBoxes() {
    const inputContainer = document.getElementById("dueños");
    inputContainer.textContent = ''; 
    
 
}


// Función para crear una opción
function createOption({ id,Patente, Marca, Modelo }) {
  const option = document.createElement('option');
  const select = document.getElementById('PatenteDueño');
  option.textContent = `${Patente} - ${Marca} ${Modelo}`;
  option.value = id;
  select.appendChild(option);
}
function createOptionError() {
  const option = document.createElement('option');
  const select = document.getElementById('PatenteDueño');
  option.textContent = "No tiene vehiculos registrados.";

  select.appendChild(option);
}

// Asume que ya tienes el ID del usuario en una variable llamada 'searchTerm'
  

fetch(`http://localhost:3000/vehiculosUsuario/${idUser}`)

  .then((response) => {
    if (!response.ok) {
      throw new Error('Error al obtener los vehículos del usuario');
    }
    return response.json();
  })
  .then((data) => {
    console.log("Estos son los vehiculos",data)
    const select = document.getElementById('PatenteDueño');
    select.innerHTML = ''; // Borra cualquier opción existente
    data.forEach((item) => {
      createOption(item); // Crea opciones para cada vehículo
    });
  })
  .catch((error) => {
    console.error('Error al obtener los vehículos del usuario', error);
  });


function crearOptionServicios({id,nombre,precio}){
    let select = document.getElementById("SeleccionLavado");
    let option = document.createElement("option");
  
    option.dataset.precio = precio;
    option.textContent = `${nombre}`;
    option.value = id;
    select.appendChild(option);

}



fetch(`http://localhost:3000/tipoServicio`)

  .then((response) => {
    if (!response.ok) {
      throw new Error('Error al obtener los vehículos del usuario');
    }
    return response.json();
  })
  .then((data) => {
    console.log("Estos son los tipo",data)
    const select = document.getElementById('SeleccionLavado');
    select.innerHTML = ''; // Borra cualquier opción existente
    data.forEach((item) => {
        crearOptionServicios(item)
    });
  })
  .catch((error) => {
    console.error('Error al obtener los vehículos del usuario', error);
  });




  function enviarFormularioServicio() {
    const patente = document.getElementById("PatenteDueño").value;
    const dueño = document.getElementById("inputDueño").value;
    const tipo = document.getElementById("SeleccionLavado").value;
    const Descripcion = document.getElementById("Descripcion").value;
    const precio = document.getElementById("PrecioLavado").value;
  
    const errorPatente = document.getElementById("errorPatente");
    const errorDueño = document.getElementById("errorDueño");
    const errorTipo = document.getElementById("errorTipo");
  

    let tieneErrores = false;
  
    if (!patente) {
      errorPatente.style.display = 'block';
      tieneErrores = true;
    }
    if (!dueño) {
      errorDueño.style.display = 'block';
      tieneErrores = true;
    }
    if (!tipo) {
      errorTipo.style.display = 'block';
      tieneErrores = true;
    }
    // Puedes agregar validaciones para otros campos si es necesario
  
    if (tieneErrores) {
      console.error('Error: Faltan datos requeridos');
      return; // Detiene el envío de datos si hay errores
    }
  
    const servicio = {
      idUsuario: idUser,
      idVehiculo: patente,
      Descripcion: Descripcion,
      precio: precio,
      idTipoServicio: tipo
    };
  
    fetch('http://localhost:3000/agregarServicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(servicio)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar el servicio');
      }
  
      console.log('Servicio agregado exitosamente');
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor al agregar servicio:', data);
      //redirigirAotraPagina()
    })
    .catch(error => console.error('Error:', error));
  }
  
  
function redirigirAotraPagina() {
  // Establece la URL a la que deseas redirigir al usuario
  const nuevaPaginaURL = "C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas/Servicio/servicio.html"; // Reemplaza con la URL de tu página

  // Redirige al usuario a la nueva página
  window.location.href = nuevaPaginaURL;
}
