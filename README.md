# 🎮 Bóveda de Juegos Retro

Una aplicación web completa para gestionar una biblioteca de videojuegos clásicos, desarrollada con **PHP, HTML, CSS y JavaScript**.

## 📋 Descripción del Proyecto

Este proyecto es una **Biblioteca de Videojuegos Retro** que permite:
- Visualizar una colección de juegos clásicos (SNES, Sega, Arcade)
- Filtrar juegos por categoría (Platformer, RPG, Shooter, Puzzle, Fighting)
- Buscar juegos por nombre o descripción
- Agregar nuevos juegos a la colección
- Cambiar entre tema claro (Nintendo) y oscuro (Arcade/Neon)

## 🗂️ Estructura del Proyecto

```
parcial-2-p2-acn2b-lukmanov/
├── data.json          # Base de datos JSON con juegos retro
├── api.php           
├── index.php          
├── style.css     
├── main.js         
├── .gitignore        
└── README.md          
```

## 🚀 Instalación y Ejecución

### Requisitos
- PHP 7.4 


### Opción 1: Servidor de desarrollo PHP
```bash
# Navegar al directorio del proyecto
cd parcial-2-p2-acn2b-lukmanov

# Iniciar el servidor de desarrollo de PHP
php -S localhost:8000

# Abrir en el navegador: http://localhost:8000
```

## 📁 Descripción de Archivos

### `data.json`
Base de datos JSON con 18 juegos clásicos. Cada juego tiene:
- `id`: Identificador único
- `title`: Nombre del juego
- `category`: Categoría (Platformer, RPG, Shooter, Puzzle, Fighting)
- `description`: Descripción en español
- `image`: URL de la imagen del juego

### `api.php`
API REST que maneja:
- **GET**: Lectura y filtrado de juegos
  - `?category=RPG` - Filtrar por categoría
  - `?search=mario` - Buscar por texto
  - Combinación de ambos parámetros
- **POST**: Agregar nuevos juegos con validación de campos

### `style.css`
Estilos CSS con:
- **Variables CSS** para fácil mantenimiento de temas
- **Tema Claro (Nintendo)**: Fondos blancos, acentos rojos
- **Tema Oscuro (Arcade/Neon)**: Fondo negro, bordes neón (verde/rosa/cyan)
- **Diseño Responsivo**: Grid de 1-4 columnas según el tamaño de pantalla
- **Animaciones**: Entradas de tarjetas, efectos hover, transiciones suaves

### `index.php`
Interfaz de usuario con:
- Header con logo, buscador, filtro de categoría y botón de tema
- Grid de tarjetas de juegos
- Formulario para agregar nuevos juegos
- Footer con créditos

### `main.js`
Lógica de JavaScript incluyendo:
- Carga de datos con `fetch()`
- Filtrado en tiempo real (con debounce)
- Gestión de temas con `localStorage` y URL params
- Envío de formulario con validación
- Notificaciones con **SweetAlert2**

## 🎨 Características de Diseño

### Tema Claro (Nintendo)
- Fondo: Blanco/Gris claro
- Acentos: Rojo (#e52521) - inspirado en NES
- Texto: Negro/Gris oscuro
- Estilo: Limpio y minimalista

### Tema Oscuro (Arcade/Neon)
- Fondo: Negro (#0a0a0f)
- Acentos: Magenta (#ff00ff), Cyan (#00ffff), Verde (#00ff88)
- Efectos: Brillos neón, líneas de escaneo
- Estilo: Retro arcade con efectos luminosos

## 🛠️ Tecnologías Utilizadas

- **PHP 7.4+**: Backend y API REST
- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript (ES6+)**: Fetch API, async/await, módulos
- **SweetAlert2**: Notificaciones elegantes


## 📱 Diseño Responsivo

| Dispositivo | Columnas |
|-------------|----------|
| Móvil (<640px) | 1 columna |
| Tablet (640-1024px) | 2 columnas |
| Desktop (1024-1400px) | 3 columnas |
| Desktop grande (>1400px) | 4 columnas |

## ⌨️ Atajos de Teclado

- `Ctrl/Cmd + K`: Enfocar barra de búsqueda
- `Escape`: Limpiar búsqueda (cuando está enfocada)

## 📝 Categorías de Juegos

| Categoría | Emoji | Color |
|-----------|-------|-------|
| Platformer | 🏃 | Azul |
| RPG | ⚔️ | Morado |
| Shooter | 🔫 | Rojo |
| Puzzle | 🧩 | Verde |
| Fighting | 🥊 | Naranja |

## 🔧 API Endpoints

### GET /api.php
```bash
# Obtener todos los juegos
GET /api.php

# Filtrar por categoría
GET /api.php?category=RPG

# Buscar por texto
GET /api.php?search=mario

# Combinar filtros
GET /api.php?category=Platformer&search=super
```

### POST /api.php
```bash
# Agregar nuevo juego
POST /api.php
Content-Type: application/json

{
  "title": "Nombre del Juego",
  "category": "Platformer",
  "description": "Descripción en español",
  "image": "https://placehold.co/400x600?text=Juego"
}
```

## 👨‍💻 Autor

Proyecto desarrollado de Albert Lukmanov 


