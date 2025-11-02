# Formulario al Ritual 🔮

🌙 Sistema de Registro “Formulario al Ritual” 🔮

Proyecto completo que combina un frontend en React con un backend en Node.js y PostgreSQL, permitiendo el registro y gestión de usuarios.

## Descripción General

El sistema “Formulario al Ritual” está compuesto por:

Frontend (React): Formulario con validaciones y diseño temático para el registro de usuarios al "Aquelarre".

Backend (Node.js + Express + PostgreSQL): API REST que gestiona la creación, consulta y almacenamiento de los usuarios registrados.

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener:

-Node.js 

-npm 

-PostgreSQL

pgAdmin 4 


proyecto-completo/
├── backend-usuarios/          # API REST (Backend)
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── formulario-aquelarre/      # Interfaz de usuario (Frontend)
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── ...
    ├── public/
    ├── package.json
    └── README.md



## Instalación del Proyecto Completo
Clonar el Repositorio
```bash
git clone https://github.com/Elizabeth-linda/Formulario-al-ritual.git
cd Formulario-al-ritual
```

## Configuración del Backend (API REST)
## Servidor básico con Express

Inicializar el proyecto:
```bash
npm init -y
```

## Instalar dependencias:

```bash
npm install express cors pg
```

Crear server.js con un endpoint base:
```bash
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor activo ');
});

app.listen(3000, () => console.log(' Servidor en http://localhost:3000'));
```

## Base de datos PostgreSQL

Crear base de datos:
```bash
CREATE DATABASE usuarios_db;
```

Crear tabla:
```bash
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  correo VARCHAR(100),
  contraseña VARCHAR(100),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Configurar db.js:
```bash
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usuarios_db',
  password: 'TU_CONTRASEÑA',
  port: 5432,
});

module.exports = pool;
```

## API REST CRUD

Endpoint GET /usuarios
```bash
app.get('/usuarios', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM usuarios');
  res.json(rows);
});
```

Endpoint POST /usuarios
```bash
app.post('/usuarios', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  if (!nombre || !correo || !contraseña)
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });

  const result = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, contraseña]
  );

  res.status(201).json({ mensaje: ' Usuario registrado', usuario: result.rows[0] });
});
```

## Probar con Postman:

GET → http://localhost:3000/usuarios

POST → http://localhost:3000/usuarios

## Configuración del Frontend (React)
Instalación
```bash
cd formulario-aquelarre
npm uninstall react react-dom
npm install react@18.2.0 react-dom@18.2.0
npm install
```

Ejecución
```bash
PORT=3001 npm start
```
Estructura del Frontend

App.js: Componente principal con formulario y lógica de validación.

App.css: Estilos personalizados con tipografía y temática mística.

index.js: Punto de entrada de la aplicación React.
## Características

- Formulario con validación
- Diseño responsive 
- Efectos visuales y tipografía especial
- Validación de campos con mensajes de error específicos

## Tecnologías Utilizadas

- React
- CSS3 con Gradientes y Animaciones
- HTML5
- Google Fonts (UnifrakturCook)

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

### Prerrequisitos
- **Node.js** 
- **npm** 
- **Git**

### Pasos para ejecutar

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Elizabeth-linda/Formulario-al-ritual..git

```

2. **Navegar al directorio del proyecto:**

```bash
cd formulario-ritual
```

3. **Instalar dependencias:**

```bash
npm install
```
4. **Ejecutar en modo desarrollo:**

```bash
npm start
```
5. **Abrir en el navegador:**
La aplicación se abrirá automáticamente en http://localhost:3000

## Validaciones Implementadas

**Nombre**	

- Mínimo 5 caracteres
- Solo letras y espacios
- No puede estar vacío
  
**Correo**
- Formato de email válido
- No puede estar vacío

**Contraseña**

- Mínimo 8 caracteres
- Debe incluir mayúscula
- Debe incluir número
- Debe incluir símbolo especial



















