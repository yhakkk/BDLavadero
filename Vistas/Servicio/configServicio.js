fetch('http://localhost:3000/servicios', { 
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





  function CrearRow({id,Cliente,Descripcion,Fecha,Hora,Patente,precio,TipoServicio}){
    let tabla = document.getElementById("tabla-servicios");
    let row = document.createElement("tr");
  

    let tdCliente = document.createElement("td");
    tdCliente.textContent = Cliente;
    row.appendChild(tdCliente);  
    
    let tdPatente = document.createElement("td");
    tdPatente.textContent = Patente;
    row.appendChild(tdPatente);

    let tdTipoServicio = document.createElement("td");
    tdTipoServicio.textContent = TipoServicio;
    row.appendChild(tdTipoServicio);
    
    let tdDescripcion = document.createElement("td");
    tdDescripcion.textContent = Descripcion;
    row.appendChild(tdDescripcion);

    
    let tdFecha = document.createElement("td");
    tdFecha.textContent = formatearFecha(Fecha);
    row.appendChild(tdFecha);
    
    let tdHora = document.createElement("td");
    tdHora.textContent = Hora;
    row.appendChild(tdHora);
    
    let tdprecio = document.createElement("td");
    tdprecio.textContent = precio;
    row.appendChild(tdprecio);

    

   
  
    tabla.appendChild(row);
  }



  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return fecha.toLocaleDateString(undefined, opciones);
  }
  