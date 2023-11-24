USE BDLavadero;

INSERT INTO TipoServicio (Nombre) VALUES ('Lavado Basico');
INSERT INTO TipoServicio (Nombre) VALUES ('Lavado Completo');
INSERT INTO TipoServicio (Nombre) VALUES ('Lavado Premium');

INSERT INTO Perfil (Nombre) VALUES ('Administrador');
INSERT INTO Perfil (Nombre) VALUES ('Usuario');

INSERT INTO Configuracion (precioDolar) VALUES (2.5);
INSERT INTO Configuracion (precioDolar) VALUES (5);
INSERT INTO Configuracion (precioDolar) VALUES (10);

INSERT INTO TipoVehiculo (nombre) VALUES ('2 ruedas');
INSERT INTO TipoVehiculo (nombre) VALUES ('4 ruedas');
INSERT INTO TipoVehiculo (nombre) VALUES ('4 ruedas chata');

INSERT INTO Cliente (Pais) VALUES ('Argentina');

INSERT INTO Cliente (Nombre, Apellido, Numero, Ciudad, Pais, DNI) 
VALUES ('Juan', 'Perez', '3534235978', 'Villa Maria', 'Argentina', '44899234');
