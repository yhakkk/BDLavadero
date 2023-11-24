let mysql = require('mysql');
const express = require('express');
const cors = require('cors'); // Agrega esta línea
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
app.use(cors());
let connection = mysql.createConnection({
    host: 'localhost',
    database: 'bdlavadero',
    user: 'root',
    password: ''
});

connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexión exitosa");
    }
});




app.get('/usuarios', (req, res) => {
  
  connection.query('SELECT * FROM Usuario  WHERE eliminado = 0 Order By Id desc',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});

app.get('/usuarios/:dni', (req, res) => {
  const dni = req.params.dni;

  connection.query('SELECT * FROM Usuario WHERE DNI = ? AND eliminado = 0', [dni], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      console.error('Error:', error);
    } else {
      if (results.length === 0) {
        res.json({ message: 'DNI disponible' });
      } else {
        res.status(200).json({ message: 'El DNI ya está registrado' }); 
      }
    }
  });
});


app.get('/marca', (req, res) => {
  
  connection.query('SELECT * FROM marca ',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});

app.get('/buscar', (req, res) => {
  const searchTerm = req.query.term;
  const searchTermWithWildcards = `%${searchTerm}%`;

  connection.query('SELECT * FROM Usuario WHERE DNI LIKE ?', [searchTermWithWildcards], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      console.error('Error:', error);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/buscarModelo', (req, res) => {
  const searchTerm = req.query.term;
  const searchTermWithWildcards = `%${searchTerm}%`;

  connection.query('SELECT * FROM marca WHERE nombre LIKE ?', [searchTermWithWildcards], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      console.error('Error:', error);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/tipoServicio', (req, res) => {

  connection.query('SELECT * FROM tiposervicio', [], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      console.error('Error:', error);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});


// Ruta para obtener los datos de los vehículos de un usuario
app.get('/vehiculosUsuario/:idUsuario', (req, res) => {
  const idUsuario = req.params.idUsuario;

  connection.query(
    'SELECT V.id, V.Patente, M.Nombre AS Marca, Mo.Nombre AS Modelo ' +
    'FROM Vehiculo AS V ' +
    'INNER JOIN Marca AS M ON V.idMarca = M.id ' +
    'INNER JOIN Modelo AS Mo ON V.idModelo = Mo.id ' +
    'WHERE V.idUsuario = ?',
    [idUsuario],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los vehículos del usuario', error);
        res.status(500).json({ error: 'Error al obtener los vehículos del usuario' });
      } else {
        res.json(results);
      }
    }
  );  
});

app.get('/modelo', (req, res) => {
  
  connection.query('SELECT * FROM modelo',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});

app.get('/modelo/:idMarca', (req, res) => {
  const idMarca = req.params.idMarca;

  const query = 'SELECT m.id AS modeloId, m.nombre AS modeloNombre, ma.id AS marcaId, ma.nombre AS marcaNombre FROM Modelo m INNER JOIN Marca ma ON m.idMarca = ma.id WHERE ma.id = ? LIMIT 0, 25;';

  connection.query(query, [idMarca], (error, results) => {
      if (error) {
          res.status(500).json({ error });
          throw console.error('Error en la consulta', error);
      } else {
          console.log(results);
          res.json(results);
      }
  });
});

app.get('/tipo', (req, res) => {
  
  connection.query('SELECT * FROM tipovehiculo',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});


// app.post('/agregarUsuario', (req, res) => {
//   const query = 'SELECT * FROM usuario';
//   connection.query(query, [Nombre], (error, results, fields) => {
//       if (error) {
//           console.error('Error al agregar el usuario:', error);
//           res.status(500).json({ error: 'Error al agregar el usuario' });
//       } else {
//           console.log('Usuario agregado exitosamente');
//           res.status(200).json(req.body);
//       }
//   });
// });


app.get('/usuariosInactivos', (req, res) => {
  
  connection.query('SELECT * FROM Usuario  WHERE eliminado = 1 Order By Id desc',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});

app.get('/tipoServiciosInactivos', (req, res) => {
  
  connection.query('SELECT * FROM tiposervicio  WHERE eliminado = 1 Order By Id desc',[],(error,results) =>{
    if (error) {
      res.status(500).json({error})
      throw console.error('esta mal',error);
    }else{
      console.log(results)
      res.json(results);
    }
  })
});



app.get('/vehiculosInactivos', (req, res) => {
  connection.query(
    `SELECT V.id, V.Patente, CONCAT(C.Nombre, ' ', C.Apellido) AS NombreCliente, TV.nombre AS NombreTipoVehiculo, M.nombre AS NombreModelo, Ma.nombre AS NombreMarca
    FROM Vehiculo AS V
    INNER JOIN usuario AS C ON V.idUsuario = C.id
    INNER JOIN TipoVehiculo AS TV ON V.IdTipoVehiculo = TV.id
    INNER JOIN Modelo AS M ON V.idModelo = M.id
    INNER JOIN Marca AS Ma ON M.idMarca = Ma.id
    WHERE V.eliminado = 1 OR C.eliminado = 1
    ORDER BY V.id DESC;
    
    
  
  `
  ,
    [],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
        console.error('Error en la consulta SQL', error);
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
});



app.get('/update/:id',(req,res) => {
  connection.query('SELECT * FROM Usuario WHERE Id = ?' ,[req.params.id],(error,results,fields) =>{
    if (error){
      console.error("Error al mostrar el usuario", error);
      res.status(500).json ({error:"Error al mostrar el usuario"});
    }
    else{
      res.json(results[0]);
      
    }

  })
})

app.get('/updateTipoServicio/:id',(req,res) => {
  connection.query('SELECT * FROM tiposervicio WHERE Id = ?' ,[req.params.id],(error,results,fields) =>{
    if (error){
      console.error("Error al mostrar el usuario", error);
      res.status(500).json ({error:"Error al mostrar el usuario"});
    }
    else{
      res.json(results[0]);
      
    }

  })
})



app.get('/updateVehiculo/:id', (req, res) => {
  connection.query(
    'SELECT c.id AS idDueño, m.id as idMarca, mo.id as idModelo, tv.id as idTipo, v.id, CONCAT(c.Nombre, " ", c.Apellido) AS Dueño, m.nombre AS Marca, mo.nombre AS Modelo, tv.nombre AS TipoVehiculo, v.Patente ' +
    'FROM Vehiculo v ' +
    'INNER JOIN Usuario c ON v.IdUsuario = c.id ' +
    'INNER JOIN Marca m ON v.idMarca = m.id ' +
    'INNER JOIN Modelo mo ON v.idModelo = mo.id ' +
    'INNER JOIN TipoVehiculo tv ON v.IdTipoVehiculo = tv.id ' +
    'WHERE v.id = ?',
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        console.error('Error al mostrar el vehículo', error);
        res.status(500).json({ error: 'Error al mostrar el vehículo' });
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.delete('/DesactivarUsuario/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE Usuario SET eliminado = 1 WHERE id = ?;', [id], (error, results, fields) => {
    if (error) {
      console.error('Error al borrar el usuario', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      // Segunda consulta para actualizar Vehiculo
      connection.query('UPDATE Vehiculo SET eliminado = 1 WHERE idUsuario IN (SELECT id FROM Usuario WHERE eliminado = 1);', (error, results, fields) => {
        if (error) {
          console.error('Error al borrar los vehículos relacionados', error);
          res.status(500).json({ error: 'Error al borrar los vehículos relacionados' });
        } else {
          res.json(results);
          console.log('Usuario y vehículos relacionados borrados exitosamente');
        }
      });
    }
  });
});


app.delete('/ActivarUsuario/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE Usuario SET eliminado = 0 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al borrar el usuario', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      res.json(results);
      console.log('Usuario borrado exitosamente');
    }
  });
});



app.delete('/ActivarTipoServicio/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE tiposervicio SET eliminado = 0 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al activar el tipo servicio', error);
      res.status(500).json({ error: 'Error al activar el tipo servicio' });
    } else {
      res.json(results);
      console.log(' tipo servicio borrado exitosamente');
    }
  });
});

app.delete('/DesactivarTipoServicio/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE tiposervicio SET eliminado = 1 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al desactivar el tipo servicio', error);
      res.status(500).json({ error: 'Error al desactivar el tipo servicio' });
    } else {
      res.json(results);
      console.log(' tipo servicio borrado exitosamente');
    }
  });
});







app.post('/actualizarUsuario/:id', (req, res) => {
  // Obtén el ID del usuario desde los parámetros de la URL
  const id = req.params.id;

  // Obtén los nuevos valores del cuerpo de la solicitud
  const { nombre, apellido, dni, numero } = req.body;

  // Realiza la actualización en la base de datos
  connection.query(
    'UPDATE usuario SET Nombre = ?, Apellido = ?, DNI = ?, Numero = ? WHERE ID = ?',
    [nombre, apellido, dni, numero, id],
    (error, results, fields) => {
      if (error) {
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      } else {
        res.json(results);
        console.log('Usuario actualizado exitosamente');
      }
    }
  );
});

app.post('/actualizarTipoServicio/:id', (req, res) => {
  // Obtén el ID del usuario desde los parámetros de la URL
  const id = req.params.id;

  // Obtén los nuevos valores del cuerpo de la solicitud
  const { nombre, precio, descripcion } = req.body;

  // Realiza la actualización en la base de datos
  connection.query(
    'UPDATE tiposervicio SET nombre = ?, precio = ?, descripcion = ? WHERE ID = ?',
    [nombre, precio, descripcion, id],
    (error, results, fields) => {
      if (error) {
        console.error('Error al actualizar el Tipo Servicio', error);
        res.status(500).json({ error: 'Error al actualizar el Tipo Servicio' });
      } else {
        res.json(results);
        console.log('Tipo Servicio actualizado exitosamente');
      }
    }
  );
});
app.post('/actualizarVehiculo/:id', (req, res) => {
  // Obtén el ID del usuario desde los parámetros de la URL
  const id = req.params.id;

  // Obtén los nuevos valores del cuerpo de la solicitud
  const { Patente, idDueño, idModelo ,idMarca,idTipo } = req.body;

  // Realiza la actualización en la base de datos
  connection.query(
    'UPDATE vehiculo SET Patente = ?, idUsuario = ?,idModelo = ?, idMarca = ?, idTipoVehiculo = ?  WHERE ID = ?',
    [Patente, idDueño,idModelo ,idMarca,idTipo,id],
    (error, results, fields) => {
      if (error) {
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ error: 'Error al actualizar el vehiculo' });
      } else {
        res.json(results);
        console.log('Usuario actualizado exitosamente');
      }
    }
  );
});

app.get('/clientesEstadisticas', (req, res) => {
  connection.query(
    'SELECT count(id) as Cantidad, Month(fecha) as Mes FROM Usuario WHERE YEAR(fecha) = YEAR(CURDATE())  GROUP BY Month(fecha) ORDER BY Month(fecha) asc',
    [],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
        console.error('Error en la consulta:', error);
      } else {
        // Mapear números de mes a nombres de mes
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        // Crear dos arreglos para labels (nombres de mes) y values
        const labels = results.map(row => monthNames[row.Mes - 1]);
        //Se debe al hecho de que los meses en JavaScript se enumeran desde 0 (enero) hasta 11 (diciembre).
        const values = results.map(row => row.Cantidad);

        // Enviar los datos al cliente en formato JSON
        res.json({ labels, values });
      }
    }
  );
});


app.delete('/DesactivarVehiculo/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE vehiculo SET eliminado = 1 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al borrar el usuario', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      res.json(results);
      console.log('Usuario borrado exitosamente');
    }
  });
});

// app.put('/actualizarVehiculo/:id', (req, res) => {
//   const id = req.params.id;
//   const { Dueño, Marca, idModelo, IdTipoVehiculo, Patente } = req.body;

//   // Primero, busca el ID del cliente (Dueño) en la tabla Cliente
//   connection.query(
//     'SELECT id FROM Cliente WHERE Nombre = ?',
//     [Dueño],
//     (error, clienteResults, fields) => {
//       if (error) {
//         console.error('Error al buscar el ID del cliente', error);
//         res.status(500).json({ error: 'Error al buscar el ID del cliente' });
//       } else {
//         // Luego, busca el ID de Marca en la tabla Marca
//         connection.query(
//           'SELECT id FROM Marca WHERE nombre = ?',
//           [Marca],
//           (error, marcaResults, fields) => {
//             if (error) {
//               console.error('Error al buscar el ID de la marca', error);
//               res.status(500).json({ error: 'Error al buscar el ID de la marca' });
//             } else {
//               // Continúa buscando los IDs de Modelo, TipoVehiculo, etc., en las tablas correspondientes

//               // Finalmente, actualiza el registro en la tabla Vehiculo con los IDs encontrados
//               const idCliente = clienteResults[0].id;
//               const idMarca = marcaResults[0].id;

//               connection.query(
//                 'UPDATE Vehiculo SET idCliente = ?, IdTipoVehiculo = ?, idModelo = ?, Patente = ?, idMarca = ? WHERE id = ?',
//                 [idCliente, IdTipoVehiculo, idModelo, Patente, idMarca, id],
//                 (error, results, fields) => {
//                   if (error) {
//                     console.error('Error al actualizar el vehículo', error);
//                     res.status(500).json({ error: 'Error al actualizar el vehículo' });
//                   } else {
//                     res.json(results);
//                     console.log('Vehículo actualizado exitosamente');
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// });






app.post('/agregarUsuario', (req, res) => {

  const { nombre, apellido, dni, numero } = req.body;

  const query = 'INSERT INTO usuario (nombre, apellido, dni, numero, fecha) VALUES (?, ?, ?, ?, CURDATE())';
  connection.query(query, [nombre, apellido, dni, numero |! null], (error, results, fields) => {
      if (error) {
          console.error('Error al agregar el usuario:', error);
          res.status(500).json({ error: 'Error al agregar el usuario' });
      } else {
          console.log('Usuario agregado exitosamente');
          res.status(200).json(req.body);
      }
  });
});
app.post('/agregarVehiculo', (req, res) => {

  const { idUsuario, idTipoVehiculo, idModelo, Patente,eliminado, idMarca } = req.body;

  const query = 'INSERT INTO vehiculo (idUsuario, idTipoVehiculo, idModelo, Patente, idMarca) VALUES (?,?,?,?,?)';
  connection.query(query, [idUsuario, idTipoVehiculo, idModelo, Patente, idMarca], (error, results, fields) => {
      if (error) {
          console.error('Error al agregar el vehiculo:', error);
          res.status(500).json({ error: 'Error al agregar el vehiculo' });
      } else {
          console.log('Vehiculo agregado exitosamente');
          res.status(200).json(req.body);
      }
  });
});

app.get('/vehiculos', (req, res) => {
  connection.query(
    `SELECT A.id, A.Patente, CONCAT(B.Nombre, ' ', B.Apellido) as Dueño, C.Nombre as Modelo, D.Nombre as Marca, E.nombre as Tipo, B.eliminado
    FROM Vehiculo as A
    INNER JOIN Usuario as B ON B.id = A.idUsuario
    INNER JOIN Modelo as C ON C.id = A.idModelo
    INNER JOIN Marca as D ON D.id = C.idMarca
    INNER JOIN TipoVehiculo as E ON E.id = A.idTipoVehiculo
    WHERE A.eliminado = 0 AND B.eliminado = 0;
    
    
    `,
    (error, results, fields) => {
      // Aquí puedes manejar los resultados de la consulta
      if (error) {
        // Manejar errores aquí
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
      } else {
        // Enviar los resultados como respuesta
        res.json(results);
      }
  })
});


app.post('/agregarVehiculo', (req, res) => {

  const { nombre, apellido, dni, numero } = req.body;

  const query = 'INSERT INTO vehiculo (nombre, apellido, dni, numero) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, apellido, dni, numero |! null], (error, results, fields) => {
      if (error) {
          console.error('Error al agregar el usuario:', error);
          res.status(500).json({ error: 'Error al agregar el usuario' });
      } else {
          console.log('Usuario agregado exitosamente');
          res.status(200).json(req.body);
      }
  });
});
app.delete('/DesactivarVehiculo/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE Vehiculo SET eliminado = 1 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al borrar el usuario', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      res.json(results);
      console.log('Usuario borrado exitosamente');
    }
  });
});



app.delete('/ActivarVehiculo/:id', (req, res) => {
  const id = req.params.id;

  connection.query('UPDATE Vehiculo SET eliminado = 0 WHERE id = ?;', [id], (error, results, field) => {
    if (error) {
      console.error('Error al borrar el usuario', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      res.json(results);
      console.log('Usuario borrado exitosamente');
    }
  });
});


app.post('/agregarServicio', (req, res) => {
  const { idUsuario, idVehiculo, Descripcion, precio,idTipoServicio } = req.body;

  const query = 'INSERT INTO servicio (idUsuario, idVehiculo, Descripcion, Fecha, Hora, precio, idTipoServicio) VALUES (?, ?, ?, CURDATE(), CURTIME(), ?, ?) ';
  
  connection.query(query, [idUsuario, idVehiculo, Descripcion,precio, idTipoServicio], (error, results, fields) => {
    if (error) {
      console.error('Error al agregar el servicio:', error);
      res.status(500).json({ error: 'Error al agregar el servicio' });
    } else {
      console.log('Servicio agregado exitosamente');
      res.status(200).json(req.body);
    }
  });
});
app.post('/agregartiposervicio', (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  const query = 'INSERT INTO tiposervicio (nombre, precio, descripcion) VALUES (?, ?, ?) ';
  
  connection.query(query, [nombre, descripcion, precio], (error, results, fields) => {
    if (error) {
      console.error('Error al agregar el tipo servicio:', error);
      res.status(500).json({ error: 'Error al agregar el tipo servicio' });
    } else {
      console.log('tipo servicio agregado exitosamente');
      res.status(200).json(req.body);
    }
  });
});

app.get('/tiposervicios', (req,res)=>{
  connection.query('SELECT * FROM tiposervicio WHERE eliminado = 0', [], (error,results) =>{
    if (error) {
      console.log("Error al mostrar los Tipos de Servicios");
      res.tastus(500).json({error:"Error al mostrar los tipos de servicios"});
    }else{
      res.json(results);
    }
  })
})

app.get('/servicios',  (req,res)=>{

  const query = `SELECT s.id, v.Patente, s.Descripcion,s.Fecha,s.Hora,CONCAT(u.Nombre, ' ', u.Apellido) as Cliente,s.precio, ts.nombre as TipoServicio, ts.precio
  FROM servicio as s
  INNER JOIN Vehiculo as v on s.idVehiculo = v.id
  INNER JOIN Usuario as u on s.idUsuario = u.id
  INNER JOIN tiposervicio as ts on s.idTipoServicio = ts.id
  
  `
  connection.query(query,[],(error,results) =>{
    if (error) {
      console.log("Error al mostrar los servicios", error)
      res.status(500).json({error: "error al mostrar los servicios"})
    }else{
      res.json(results)
    }
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Realiza la consulta a la base de datos para verificar las credenciales
  connection.query(
    'SELECT * FROM cuentasusuarios WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        console.error('Error en la consulta de inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        if (results.length > 0) {
          // Las credenciales son correctas
          req.session.loggedin = true;
          res.json({ success: true, redirectTo: 'C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas/Admin/admin.html' }); // Redirige a la página de inicio
        } else {
          // Las credenciales son incorrectas
          res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
      }
    }
  );
});



app.get('/inicio', (req, res) => {
  if (req.session.loggedin) {
    // Si el usuario está autenticado, redirige a la página de administración
    res.redirect('C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas/Admin/admin.html');
  } else {
    // Si el usuario no está autenticado, redirige a la página de login
    res.redirect('C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas/Presentacion/cuenta.html');
  }
});


const checkAuth = (req, res, next) => {
  if (req.session.loggedin) {
    next();
  } else {
    res.redirect('C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas/Presentacion/cuenta.html'); // Redirige a la página de inicio si el usuario no está autenticado
  }
};

// Ruta de administración protegida por el middleware de autenticación
app.use('/static', express.static('C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas'));

// Ruta para la página de administración
app.get('/admin', checkAuth, (req, res) => {
  // Envia el archivo HTML de la página de administración desde el directorio estático
  res.sendFile('admin/admin.html', { root: 'C:/Users/tomi_/Desktop/Universidad/Practica Profecionalizante/Lavadero/Vistas' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

