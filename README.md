# CloudTestPro Mockup Server

**CloudTestPro Mockup Server** es una aplicación web para **crear, gestionar y simular API endpoints REST** de forma rápida y sencilla.  
Ideal para pruebas de integraciones, desarrollo de frontends, y validaciones de flujo sin necesidad de un backend real.

## 🚀 Características

-   Crear endpoints mock personalizados (ruta, método, headers y respuesta).
    
-   Validar y formatear JSON en headers y body.
    
-   Simular respuestas de API completas.
    
-   Eliminar mocks individualmente o limpiar todos.
    
-   Visualizar detalles completos de cada mock (URL, headers, body).
    
-   URL pública de referencia:
    
```arduino
https://mockup.cloudtestpro.com
```


## 🛠️ Tecnologías utilizadas

-   React
    
-   React Router DOM
    
-   Framer Motion (animaciones)
    
-   TailwindCSS (estilos)


## 📦 Instalación

1.  Clona el repositorio:

```bash
git clone https://github.com/fredwinrosales/cloudtestpro-mockups-app.git
cd cloudtestpro-mockups-app
``` 
    
2.  Instala las dependencias:
```bash
npm install
``` 
    
3.  Inicia el servidor de desarrollo:
```bash
npm run dev
```
    
4.  Accede a la aplicación en:

```arduino
http://localhost:5173
``` 

## ✨ ¿Cómo funciona?

1.  Define el **método HTTP**, la **ruta**, los **headers** y opcionalmente el **body** de respuesta.
    
2.  Guarda el mock.
    
3.  Visualiza el detalle de tu mock, incluyendo la URL completa:
    
```arduino
https://mockup.cloudtestpro.com/api-mock/{userId}/{tu-ruta}
``` 
    
4.  Navega a tu Mock y simula peticiones.


## 📋 Ejemplo rápido

**Crear un Mock:**

-   Método: `GET`
    
-   Ruta: `/users`
    
-   Headers:
```json
{  "Content-Type":  "application/json"  }
``` 
    
-   Body:
```json
{
    "users": [
        {
            "id": 1,
            "name": "Alice"
        },
        {
            "id": 2,
            "name": "Bob"
        }
    ]
}
```
    

**Acceder al Mock:**
```bash
https://mockup.cloudtestpro.com/api-mock/user123/users
``` 

## 🧹 Futuras mejoras (roadmap)

-   Autenticación por usuario.
    
-   Exportar e importar mocks.
    
-   Soporte para mock de respuestas dinámicas (variables en las respuestas).
    
-   Buscador de mocks.

## 📄 Licencia

MIT © [@fredwinrosales](https://www.linkedin.com/in/fredwin-rosales-22a85711/)