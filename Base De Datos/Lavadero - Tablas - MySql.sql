CREATE DATABASE BDLavadero;

USE BDLavadero;

CREATE TABLE Marca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Modelo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idMarca INT,
    nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (idMarca) REFERENCES Marca(id)
);

CREATE TABLE TipoServicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE TipoVehiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Numero VARCHAR(50) NOT NULL,
    Ciudad VARCHAR(50) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    DNI VARCHAR(15) NOT NULL
);

CREATE TABLE Vehiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario INT,
    IdTipoVehiculo INT,
    idModelo INT,
    Patente VARCHAR(50) NOT NULL,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (IdTipoVehiculo) REFERENCES TipoVehiculo(id),
    FOREIGN KEY (idModelo) REFERENCES Modelo(id)
);

CREATE TABLE Servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT,
    idVehiculo INT,
    Descripcion VARCHAR(50) NOT NULL,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Cliente(Id),
    FOREIGN KEY (idVehiculo) REFERENCES Vehiculo(Id)
);

CREATE TABLE SxTS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idServicio INT,
    idTipoServicio INT,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idServicio) REFERENCES Servicio(id),
    FOREIGN KEY (idTipoServicio) REFERENCES TipoServicio(id)
);

CREATE TABLE CalcularPrecio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idTipoServicio INT,
    idTipoVehiculo INT,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idTipoServicio) REFERENCES TipoServicio(id),
    FOREIGN KEY (idTipoVehiculo) REFERENCES TipoVehiculo(id)
);

CREATE TABLE Configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    precioDolar DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Perfil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idPerfil INT,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    DNI INT NOT NULL,
    FOREIGN KEY (idPerfil) REFERENCES Perfil(id)
);
