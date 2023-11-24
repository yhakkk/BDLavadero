USE [BDLavadero]



CREATE TABLE [Marca](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	nombre varchar(50) NOT NULL
)
CREATE TABLE [Modelo](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	idMarca int REFERENCES [Marca] (id),
	nombre varchar(50) NOT NULL
	
)


CREATE TABLE [TipoServicio](
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	nombre varchar(50) NOT NULL


)





CREATE TABLE [TipoVehiculo](
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	nombre varchar(50) NOT NULL


)

CREATE TABLE [Cliente](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	Nombre varchar(50) NOT NULL,
	Apellido varchar(50) NOT NULL,
	Numero varchar(50) NOT NULL,
	Ciudad varchar(50) NOT NULL,
	Pais varchar(50) NOT NULL,
	DNI varchar(15) NOT NULL

)
CREATE TABLE [Vehiculo] (
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	idCliente int REFERENCES [Cliente] (id),
	IdTipoVehiculo int REFERENCES [TipoVehiculo] (id),
	idModelo int REFERENCES [Modelo] (id),
	Patente varchar(50) NOT NULL

)



CREATE TABLE [Servicio](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	idCliente int REFERENCES [Cliente] (Id),
	idVehiculo int REFERENCES [Vehiculo](Id),
	Descripcion varchar(50) NOT NULL,
	Fecha date NOT NULL,
	Hora time NOT NULL

)
CREATE TABLE [SxTS](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	idServicio int REFERENCES [Servicio] (id),
	idTipoServicio int REFERENCES [TipoServicio] (id),
	total money NOT NULL


)
CREATE TABLE [CalcularPrecio](
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	idTipoServicio int REFERENCES[TipoServicio] (id),
	idTipoVehiculo int REFERENCES[TipoVehiculo] (id),
	precio money NOT NULL


)


CREATE TABLE [Configuracion](
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	precioDolar money NOT NULL


)

CREATE TABLE [Perfil](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	nombre varchar(50) NOT NULL

)
CREATE TABLE [Usuario](
	id int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	idPerfil int REFERENCES [Perfil] (id),
	Nombre varchar(50) NOT NULL,
	Apellido varchar(50) NOT NULL,
	DNI int NOT NULL


)