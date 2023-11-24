function enviarTipoServicio(){
    let nombre = document.getElementById("inputTipoServicio").value;
    let precio = document.getElementById("inputDescripcion").value;
    let descripcion = document.getElementById("inputPrecio").value;
    console.log(nombre);
    console.log(precio);
    console.log(descripcion);

    const tiposervicio = {
        nombre,
        precio,
        descripcion
    }

    fetch('http://localhost:3000/agregartiposervicio', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(tiposervicio)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al agregar el tipo servicio');
              }
          
              console.log('tipo servicio agregado exitosamente');
              return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor al agregar el tipo servicio:', data);
                redirigirAotraPagina()
              
            })
            .catch(error => console.error('Error:', error));
      

}


function redirigirAotraPagina() {
    // Establece la URL a la que deseas redirigir al usuario
    const nuevaPaginaURL = ""; // Reemplaza con la URL de tu página
  
    // Redirige al usuario a la nueva página
    window.location.href = nuevaPaginaURL;
  }
  