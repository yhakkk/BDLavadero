USE [BDLavadero]

INSERT [dbo].[TipoServicio] ([Nombre]) VALUES ('Lavado Basico')
INSERT [dbo].[TipoServicio] ([Nombre]) VALUES ('Lavado Completo')
INSERT [dbo].[TipoServicio] ([Nombre]) VALUES ('Lavado Premium')


INSERT [dbo].[Perfil] ([Nombre]) VALUES ('Administrador')
INSERT [dbo].[Perfil] ([Nombre]) VALUES ('Usuario')

INSERT [dbo].[Configuracion] (precioDolar) VALUES ('2.5')
INSERT [dbo].[Configuracion] (precioDolar) VALUES ('5')
INSERT [dbo].[Configuracion] (precioDolar) VALUES ('10')

INSERT [dbo].[TipoVehiculo] (nombre) VALUES ('2 ruedas')
INSERT [dbo].[TipoVehiculo] (nombre) VALUES ('4 ruedas')
INSERT [dbo].[TipoVehiculo] (nombre) VALUES ('4 ruedas chata')

INSERT  [dbo].[Cliente] (Pais) VALUES ('Argentina')

INSERT INTO [Cliente] (Nombre,Apellido,Numero,Ciudad,Pais,DNI) VALUES ('Juan','Perez','3534235978','Villa Maria','Argentina','44899234');