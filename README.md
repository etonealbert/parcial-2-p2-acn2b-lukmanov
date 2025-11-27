# 🎮 Bóveda de Juegos Retro

Una aplicación web completa para gestionar una biblioteca de videojuegos clásicos, desarrollada con **PHP, HTML, CSS y JavaScript**.

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


```bash

# Iniciar el servidor de desarrollo de PHP
php -S localhost:8000

# Abrir en el navegador: http://localhost:8000
```


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


