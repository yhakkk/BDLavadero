function enviarForm() {
    const email = document.getElementById('correo').value;
    const password = document.getElementById('palabraSecreta').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Inicio de sesión exitoso');
        window.location.href = data.redirectTo; // Redirigir a la página proporcionada por el servidor
      } else {
        alert('Credenciales incorrectas');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  