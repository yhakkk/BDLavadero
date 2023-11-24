
  let idMarca;
  console.log("esta es la idmarca", idMarca)

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

  fetch('http://localhost:3000/marca', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al agregar el usuario');
    }
    console.log('');
    return response.json();
  })
  .then(data => {

  
    console.log("Estos son las marcas", data)


  })
  .catch(error => console.error('Error:', error));

  function CrearSelect({id,Nombre}){
    let select = document.getElementById("Dueño");


    let optionNombre = document.createElement("option");
    optionNombre.textContent = Nombre;
    select.appendChild(optionNombre);



  }

const inputDueño = document.getElementById("inputDueño");
inputDueño.addEventListener('keyup', () => {

    const searchTerm = inputDueño.value;


    if (searchTerm.trim() !== '') {
        conseguirDueño(searchTerm); 
    } else {
        clearSelectBoxes();
    }
});
const inputModelo = document.getElementById("inputModelo");
inputModelo.addEventListener('keydown', () => {

    const searchTerm = inputModelo.value;


    if (searchTerm.trim() !== '') {
      //ObtenerModelo(idMarca)

  
    } else {
        clearSelectBoxesModelo();
    }
});

const miSelect = document.getElementById("tipoVehiculo");
const seleccionado = document.getElementById("seleccionado");

miSelect.addEventListener("change", function() {
    const opcionSeleccionada = miSelect.options[miSelect.selectedIndex];
    
    if (opcionSeleccionada.value === "2") {
        seleccionado.id = "1";
        console.log(seleccionado);
    } else if (opcionSeleccionada.value === "3") {
        seleccionado.id = "2";
    } else if (opcionSeleccionada.value === "4") {
        seleccionado.id = "3";
    }
});


const inputMarca = document.getElementById("inputMarca");
inputMarca.addEventListener('keyup', () => {

    const searchTerm = inputMarca.value;


    if (searchTerm.trim() !== '') {
        conseguirMarca(searchTerm); 
    } else {
      clearSelectBoxesMarca();
    }
});
let contador;
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
        data.forEach(item => {
          createSelect(item);
        
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
          throw new Error('Error al buscar el usuario');
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


function clearSelectBoxes() {
    const inputContainer = document.getElementById("dueños");
    inputContainer.innerHTML = ''; 
    
 
}
function clearSelectBoxesMarca() {
    const inputContainer = document.getElementById("dueñosMarca");
    inputContainer.innerHTML = ''; 
    
 
}
function clearSelectBoxesModelo() {
    const inputContainer = document.getElementById("dueñosModelo");
    inputContainer.innerHTML = ''; 
    
 
}

let createdElements = 0;  

function createSelect({ id, Nombre, Apellido,DNI }) {

  
    const container = document.getElementById("dueños");
    const inputDueño = document.getElementById("inputDueño");
    const input = document.createElement("div");
    input.textContent = `${DNI} - ${Nombre} ${Apellido}`;
    const idDueño = document.getElementById("idDueño");
   

    input.addEventListener("click", function() {
    inputDueño.value = `${DNI}`;
    idDueño.value = id;
    inputDueño.setAttribute("data-id", id);
     clearSelectBoxes()
     });
    
    container.appendChild(input);
}

function createSelectMarca({ id, nombre }) {
  const container = document.getElementById("dueñosMarca");
  const inputDueño = document.getElementById("inputMarca");
  const input = document.createElement("div");
  const idMarcaInput = document.getElementById("idMarca");
  input.textContent = `${nombre}`;
  input.setAttribute("data-id", id); // Agregar un atributo data-id al div

  input.addEventListener("click", function() {
      inputDueño.value = `${nombre}`;
      idMarcaInput.value = id;
      idMarca = id; // Asignar el valor de id a la variable idMarca
      console.log("La id seleccionada es", idMarca); // Imprimir la id en la consola
      clearSelectBoxesMarca();
      ObtenerModelo(idMarca); // Llamar a la función ObtenerModelo con la idMarca seleccionada
  });

  container.appendChild(input);
}

function createSelectModelo({ modeloId, modeloNombre }) {
  const container = document.getElementById("dueñosModelo");
  const inputModelo = document.getElementById("inputModelo");
  const idModeloInput = document.getElementById("idModelo");

  const input = document.createElement("div");
  input.textContent = `${modeloNombre}`;
  input.setAttribute("data-id", modeloId); // Agregar un atributo data-id al div

  input.addEventListener("click", function() {
      inputModelo.value = modeloNombre;
      idModeloInput.value = modeloId;
      const idMarcaInput = document.getElementById("idMarca");
      const idMarca = idMarcaInput.value; // Obtener el valor de idMarca desde el input
      console.log("La id de modelo seleccionada es", modeloId);
      console.log("La id de marca seleccionada es", idMarca);
      clearSelectBoxesModelo();
  });

  container.appendChild(input);
}






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
      // Obtén el elemento select al que deseas agregar las opciones
      const selectTipo = document.getElementById('tipoVehiculo');

      // Itera a través de los datos y crea opciones para el select
      data.forEach(tipo => {
          const option = document.createElement('option');
          let seleccionado = document.getElementById("seleccionado");
          option.value = tipo.id; 
          option.textContent = tipo.nombre; 
          selectTipo.appendChild(option);
      });
      
      console.log("Tipos", data);
  })
  .catch(error => console.error('Error:', error));



