function enviarFormularioVehiculo() {
    const patente = document.getElementById("inputPatente").value;
    const dueño = document.getElementById("idDueño").value; 
    const tipo = document.getElementById("tipoVehiculo").value;
    const marca = document.getElementById("idMarca").value; 
    const modelo = document.getElementById("idModelo").value;  

    const errorPatente = document.getElementById("errorPatente");
    const errorDueño = document.getElementById("errorDueño");
    const errorTipo = document.getElementById("errorTipo");
    const errorMarca = document.getElementById("errorMarca");
    const errorModelo = document.getElementById("errorModelo");

    const usuario = {
        idUsuario: dueño,
        idTipoVehiculo: tipo,
        idModelo: modelo,
        Patente: patente,
        idMarca: marca,
      };
      
     if (patente == "" || tipo == "" || dueño == "" || marca == "" || modelo == "") {
         if (patente == "") errorPatente.style.display = "block";
         if (tipo == "") errorTipo.style.display = "block";
         if (dueño == "") errorDueño.style.display = "block";
         if (marca == "") errorMarca.style.display = "block";
         if (modelo == "") errorModelo.style.display = "block";
         throw new Error('Error al agregar el Vehiculo');
     }else{
        fetch('http://localhost:3000/agregarVehiculo', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al agregar el vehiculo');
          }
      
          console.log('vehiculo agregado exitosamente');
          return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor al agregar vehiculo:', data);
            redirigirAotraPagina()
          
        })
        .catch(error => console.error('Error:', error));
  
      }
    
}
  

function redirigirAotraPagina() {
  // Establece la URL a la que deseas redirigir al usuario
  const nuevaPaginaURL = "./vehiculo.html"; // Reemplaza con la URL de tu página

  // Redirige al usuario a la nueva página
  window.location.href = nuevaPaginaURL;
}

  