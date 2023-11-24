USE [BDLavadero]
--INSERT INTO [Cliente] (Nombre,Apellido,Numero,Ciudad,Pais,DNI) VALUES ('Juan','Perez','3534235978','Villa Maria','Argentina','44899234');

--UPDATE Cliente SET Nombre = 'Tomas';

--SELECT id, Nombre, Apellido 
--FROM Cliente AS A 
--WHERE A.Nombre LIKE '%O%' OR A.Apellido LIKE '%O%';

 --UPDATE Vehiculo SET idCliente = 1, IdTipoVehiculo = 1, idModelo = 1;
--INSERT INTO [Vehiculo] (Patente) VALUES ('34K45T');
--UPDATE Vehiculo SET idCliente = 1,IdTipoVehiculo = 1, idModelo = 1;
--INSERT INTO [Modelo]  (nombre) VALUES ('308');
--INSERT INTO [Marca] (nombre) VALUES ('Peugeot');
--UPDATE Modelo SET idMarca = 1;
--select * from modelo;
--select * from marca;
--SELECT A.id,A.Patente, B.Nombre  +' '+ B.Apellido as Dueño,C.Nombre as Modelo, D.Nombre as Marca, E.nombre as Tipo FROM Vehiculo as A
--INNER JOIN Cliente as B ON (B.id = A.idCliente)
--INNER JOIN Modelo as C ON (C.id = A.idModelo)
--INNER JOIN Marca as D ON (D.id = C.idMarca)
--INNER JOIN TipoVehiculo as E ON (E.id = A.idTipoVehiculo);








