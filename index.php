<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Bóveda de Juegos Retro - Tu biblioteca de videojuegos clásicos">
    <title>🎮 Bóveda de Juegos Retro</title>
    
    <!-- CSS Styles -->
    <link rel="stylesheet" href="style.css">
    
    <!-- SweetAlert2 CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>">
</head>
<body>
    <!-- ===================== HEADER SECTION ===================== -->
    <header class="header">
        <div class="header-content">
            <div class="header-top">
                <!-- Logo and Title -->
                <div class="logo">
                    <span class="logo-icon">🕹️</span>
                    <h1>Bóveda de Juegos Retro</h1>
                </div>
                
                <!-- Theme Toggle Button -->
                <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">
                    <span class="theme-icon">☀️</span>
                    <span class="theme-text">Modo Claro</span>
                </button>
            </div>
            
            <!-- Search and Filter Controls -->
            <div class="controls">
                <!-- Search Input -->
                <div class="search-wrapper">
                    <input 
                        type="text" 
                        id="searchInput" 
                        class="search-input" 
                        placeholder="Buscar juegos por nombre..."
                        aria-label="Buscar juegos"
                    >
                </div>
                
                <!-- Category Filter -->
                <div class="filter-wrapper">
                    <select id="categoryFilter" class="category-select" aria-label="Filtrar por categoría">
                        <option value="all">📁 Todas las Categorías</option>
                        <option value="Platformer">🏃 Plataformas</option>
                        <option value="RPG">⚔️ RPG</option>
                        <option value="Shooter">🔫 Shooter</option>
                        <option value="Puzzle">🧩 Puzzle</option>
                        <option value="Fighting">🥊 Lucha</option>
                    </select>
                </div>
            </div>
        </div>
    </header>

    <!-- ===================== MAIN CONTENT ===================== -->
    <main class="main-container">
        <!-- Results Information Bar -->
        <div class="results-info" id="resultsInfo">
            <span class="results-count" id="resultsCount">Cargando juegos...</span>
            <button id="clearFilters" class="clear-filters" style="display: none;">
                🔄 Limpiar Filtros
            </button>
        </div>
        
        <!-- Games Grid Container -->
        <div id="gamesGrid" class="games-grid">
            <!-- Loading State -->
            <div class="loading" id="loadingState">
                <div class="loading-spinner"></div>
                <p class="loading-text">Cargando juegos retro...</p>
            </div>
        </div>

        <!-- ===================== ADD GAME FORM ===================== -->
        <section class="form-section">
            <div class="form-header">
                <span class="form-icon">🎮</span>
                <h2>Agregar Nuevo Juego</h2>
            </div>
            
            <form id="addGameForm" class="add-game-form">
                <div class="form-row">
                    <!-- Game Title -->
                    <div class="form-group">
                        <label for="gameTitle" class="form-label">
                            <span>📝</span> Título del Juego
                        </label>
                        <input 
                            type="text" 
                            id="gameTitle" 
                            name="title" 
                            class="form-input" 
                            placeholder="Ej: Super Mario Bros"
                            required
                        >
                    </div>
                    
                    <!-- Game Category -->
                    <div class="form-group">
                        <label for="gameCategory" class="form-label">
                            <span>📁</span> Categoría
                        </label>
                        <select id="gameCategory" name="category" class="form-select" required>
                            <option value="">-- Seleccionar categoría --</option>
                            <option value="Platformer">🏃 Plataformas</option>
                            <option value="RPG">⚔️ RPG</option>
                            <option value="Shooter">🔫 Shooter</option>
                            <option value="Puzzle">🧩 Puzzle</option>
                            <option value="Fighting">🥊 Lucha</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <!-- Image URL -->
                    <div class="form-group full-width">
                        <label for="gameImage" class="form-label">
                            <span>🖼️</span> URL de la Imagen
                        </label>
                        <input 
                            type="url" 
                            id="gameImage" 
                            name="image" 
                            class="form-input" 
                            placeholder="https://placehold.co/400x600?text=NombreDelJuego"
                            required
                        >
                    </div>
                </div>
                
                <div class="form-row">
                    <!-- Description -->
                    <div class="form-group full-width">
                        <label for="gameDescription" class="form-label">
                            <span>📄</span> Descripción
                        </label>
                        <textarea 
                            id="gameDescription" 
                            name="description" 
                            class="form-textarea" 
                            placeholder="Escribe una breve descripción del juego en español..."
                            required
                        ></textarea>
                    </div>
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="submit-btn">
                    <span class="submit-icon">➕</span>
                    Agregar Juego
                </button>
            </form>
        </section>
    </main>

    <!-- ===================== FOOTER ===================== -->
    <footer class="footer">
        <p class="footer-text">
            Desarrollado por <strong>Albert Lukmanov</strong>
            <br>
            📧 <a href="mailto:albert.lukmanov@davinci.edu.ar" style="color: inherit; text-decoration: none;">albert.lukmanov@davinci.edu.ar</a>
            <br>
            <span style="font-size: 0.9em; opacity: 0.8;">
                🎮 Bóveda de Juegos Retro © <?php echo date('Y'); ?>
            </span>
        </p>
    </footer>

    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>

