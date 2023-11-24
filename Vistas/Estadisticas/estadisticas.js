

// Agrega esta parte al principio del archivo para hacer una solicitud al servidor
// Realiza una solicitud al servidor para obtener datos estadísticos
fetch('http://localhost:3000/clientesEstadisticas')
  .then(response => response.json()) // Analiza la respuesta como JSON
  .then(data => {
    // Obtiene el elemento HTML para el gráfico
    const ctx = document.getElementById('myChart');
    // Crea un gráfico de barras con Chart.js
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico: barras
      data: {
        labels: data.labels, // Etiquetas en el eje X
        datasets: [{
          label: '#Registros de Clientes ', // Etiqueta del conjunto de datos
          data: data.values, // Valores de las barras
          borderWidth: 2 // Ancho del borde de las barras
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Eje Y comienza en cero
          }
        }
      }
    });
  })
  .catch(error => console.error('Error al obtener datos:', error)); // Manejo de errores
