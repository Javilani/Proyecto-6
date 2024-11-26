
# Proyecto 6 - Mongo DB

Este es el backend de una aplicación diseñada para una fundación de adopción de gatos. Proporciona funcionalidades como la gestión de usuarios, gatos disponibles para adopción y donaciones. La aplicación está construida con Node.js, Express y MongoDB, y cuenta con autenticación mediante tokens y documentación interactiva con Swagger.

#### Tecnologías utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs RESTful.
- **Mongoose**: ODM para modelar datos en MongoDB.
- **JWT**: Autenticación segura mediante tokens.
- **Swagger**: Generación de documentación interactiva para la API.

## 🌟 Funcionalidades

### Usuarios
- **Crear usuario**: Permite registrar nuevos usuarios en la plataforma.
- **Abrir sesión**: Los usuarios pueden iniciar sesión y obtener un token JWT.
- **Mantener sesión activa**: Verificación del token JWT para sesiones activas mediante `verifyToken`.
- **Actualizar datos del usuario**: Permite a los usuarios modificar su información personal.
- **Eliminar usuario**: Los usuarios pueden eliminar su cuenta de la plataforma.

### Gatos
- **Crear gato**: Registra un nuevo gato disponible para adopción.
- **Mostrar todos los gatos**: Lista todos los gatos disponibles.
- **Mostrar un gato en específico**: Obtiene los detalles de un gato a través de su ID.
- **Actualizar datos del gato**: Permite editar la información de un gato.
- **Eliminar gato**: Remueve a un gato del registro.

### Donaciones
- **Crear donación**: Registra una nueva donación con un monto predefinido.
- **Mostrar todas las donaciones**: Lista todas las donaciones realizadas.
- **Mostrar una donación en específico**: Obtiene los detalles de una donación a través de su ID.
- **Actualizar datos de la donación**: Permite modificar la información de una donación.
- **Eliminar donación**: Remueve un registro de donación.

## 🔧 Configuración Inicial

### Requisitos previos
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Instalación
1. **Clona este repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>

2. **Accede al directorio del proyecto:**

        cd <NOMBRE_DEL_PROYECTO>
3. **Instala las dependencias necesarias:**

        npm install

### Variables de Entorno

        PORT=3000
        MONGO_URI=mongodb://localhost:27017/adopcionGatos
        JWT_SECRET=tu_secreto_jwt

### Ejecutar el Proyecto
Para iniciar el servidor en modo desarrollo:

        npm run dev

Para iniciar el servidor en modo producción:

        npm start

## 📖 Documentación de la API
La API está documentada con Swagger. Para acceder a la documentación interactiva, inicia el servidor y visita:

        http://localhost:3000/api-docs

## 🛠️ Endpoints Principales

Usuarios
- POST /users/create - Registrar un nuevo usuario.
- GET /users/login - Iniciar sesión.
- GET /users/verify - Mantener la sesión abierta.
- PUT /users/update - Actualizar datos del usuario.
- DELETE /users/delete - Eliminar un usuario.
Gatos
- POST /cats - Crear un nuevo gato.
- GET /cats/readall - Obtener el listado de gatos disponibles.
- GET /cats/readone/:id - Obtener un gato por su ID 
- PUT /cats/update/:id - Actualizar información de un gato.
- DELETE /cats/delete/:id - Eliminar un gato.
Donaciones
- POST /donations/create - Realizar una donación.
- GET /donations/readall - Obtener el historial de donaciones.
- GET /donations/readone/:id - Obtener una donación por su ID.
- PUT /donations/update/:id - Actualizar información de una donación.
- DELETE /donations/delete/:id - Eliminar una donación.


## 📂 Estructura del Proyecto

        /Proyecto 6
        ├── app.js                        
        │
        ├── config/
        │   └── db.js
        │
        ├── controllers/               
        │    ├── catController.js 
        │    ├── donationController.js    
        │    └── userController.js  
        |          
        ├── middleware/
        │   └── authorization.js
        │
        ├── models/               
        │    ├── Cat.js 
        │    ├── Donation.js    
        │    └── User.js 
        │
        ├── routes/               
        │    ├── cats.js 
        │    ├── donations.js    
        │    └── users.js 
        |
        ├── package-lock.json
        ├── package.json
        └── README.md                 

## 🌐 Proyecto en Producción

El backend de este proyecto está desplegado en [Render](https://render.com). Puedes acceder al servicio en el siguiente enlace:

**URL del Proyecto en Producción**:  

https://proyecto-6-tvf2.onrender.com

Utiliza esta URL para verificar el funcionamiento de la API desde la documentación de Swagger:

http://proyecto-6-tvf2.onrender.com/api-docs
## Authors

- Javier Lagos

## Screenshots

![App Screenshot](https://res.cloudinary.com/de2p3kdgv/image/upload/v1732579667/swagger-proy6_nn9dse.png)

![App Screenshot](https://res.cloudinary.com/de2p3kdgv/image/upload/v1732579683/swagger-proy6-3_ytrfj2.png)

![App Screenshot](https://res.cloudinary.com/de2p3kdgv/image/upload/v1732579676/swagger-proy6-2_cukrpu.png)
