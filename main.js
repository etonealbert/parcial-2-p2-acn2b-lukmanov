
const API_ENDPOINT = 'api.php';

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggle = document.getElementById('themeToggle');
const addGameForm = document.getElementById('addGameForm');
const resultsCount = document.getElementById('resultsCount');
const clearFiltersBtn = document.getElementById('clearFilters');
const loadingState = document.getElementById('loadingState');

let currentFilters = {
    search: '',
    category: 'all'
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    loadGames();
    
    setupEventListeners();
});

function initTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    
    const savedTheme = urlTheme || localStorage.getItem('retroVaultTheme') || 'light';
    
    setTheme(savedTheme);
}

function setTheme(theme) {
    const isDark = theme === 'dark';
    
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (isDark) {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Arcade';
    } else {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Claro';
    }
    
    localStorage.setItem('retroVaultTheme', theme);
    
    const url = new URL(window.location);
    url.searchParams.set('theme', theme);
    window.history.replaceState({}, '', url);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    
    const themeName = newTheme === 'dark' ? 'Modo Arcade 🕹️' : 'Modo Nintendo ☀️';
    showToast(`¡Tema cambiado a ${themeName}!`, 'info');
}

async function loadGames(filters = {}) {
    try {
        showLoading(true);
        
        const params = new URLSearchParams();
        
        if (filters.search && filters.search.trim()) {
            params.append('search', filters.search.trim());
        }
        
        if (filters.category && filters.category !== 'all') {
            params.append('category', filters.category);
        }
        
        const queryString = params.toString();
        const url = queryString ? `${API_ENDPOINT}?${queryString}` : API_ENDPOINT;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            renderGames(result.data);
            updateResultsCount(result.count, filters);
        } else {
            throw new Error(result.message || 'Error al cargar los juegos');
        }
        
    } catch (error) {
        console.error('Error loading games:', error);
        showError('Error al cargar los juegos. Por favor, intenta de nuevo.');
    } finally {
        showLoading(false);
    }
}

function renderGames(games) {
    // Clear existing content
    gamesGrid.innerHTML = '';
    
    if (!games || games.length === 0) {
        showEmptyState();
        return;
    }
    
    // Create and append game cards
    games.forEach((game, index) => {
        const card = createGameCard(game, index);
        gamesGrid.appendChild(card);
    });
}

/**
 * Create a game card element
 * @param {Object} game - Game data object
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Game card element
 */
function createGameCard(game, index) {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    // Sanitize data for display
    const title = escapeHTML(game.title);
    const description = escapeHTML(game.description);
    const category = escapeHTML(game.category);
    const categoryClass = category.toLowerCase();
    const image = game.image || `https://placehold.co/400x600?text=${encodeURIComponent(title)}`;
    
    card.innerHTML = `
        <div class="card-image-container">
            <img 
                src="${image}" 
                alt="${title}" 
                class="card-image"
                loading="lazy"
                onerror="this.src='https://placehold.co/400x600?text=Sin+Imagen'"
            >
            <span class="card-badge ${categoryClass}">${getCategoryEmoji(category)} ${category}</span>
        </div>
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
        </div>
    `;
    
    return card;
}

/**
 * Get emoji for a category
 * @param {string} category - Game category
 * @returns {string} Emoji for the category
 */
function getCategoryEmoji(category) {
    const emojis = {
        'Platformer': '🏃',
        'RPG': '⚔️',
        'Shooter': '🔫',
        'Puzzle': '🧩',
        'Fighting': '🥊'
    };
    return emojis[category] || '🎮';
}

/**
 * Show empty state when no games found
 */
function showEmptyState() {
    gamesGrid.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🎮</div>
            <h3 class="empty-title">¡No se encontraron juegos!</h3>
            <p class="empty-description">
                Intenta con otros filtros o agrega un nuevo juego a la colección.
            </p>
        </div>
    `;
}

/**
 * Show/hide loading state
 * @param {boolean} isLoading - Loading state
 */
function showLoading(isLoading) {
    if (isLoading) {
        gamesGrid.innerHTML = `
            <div class="loading" id="loadingState">
                <div class="loading-spinner"></div>
                <p class="loading-text">Cargando juegos retro...</p>
            </div>
        `;
    }
}


function showError(message) {
    gamesGrid.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⚠️</div>
            <h3 class="empty-title">¡Oops! Algo salió mal</h3>
            <p class="empty-description">${message}</p>
        </div>
    `;
}

/**
 * Update results count display
 * @param {number} count - Number of results
 * @param {Object} filters - Current filters
 */
function updateResultsCount(count, filters) {
    const hasFilters = (filters.search && filters.search.trim()) || 
                       (filters.category && filters.category !== 'all');
    
    let text = `🎮 ${count} juego${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
    
    if (hasFilters) {
        clearFiltersBtn.style.display = 'inline-block';
        
        if (filters.search && filters.search.trim()) {
            text += ` para "${filters.search}"`;
        }
        if (filters.category && filters.category !== 'all') {
            text += ` en ${filters.category}`;
        }
    } else {
        clearFiltersBtn.style.display = 'none';
    }
    
    resultsCount.textContent = text;
}

// ==========================================
// FORM HANDLING
// ==========================================


async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        title: document.getElementById('gameTitle').value.trim(),
        category: document.getElementById('gameCategory').value,
        description: document.getElementById('gameDescription').value.trim(),
        image: document.getElementById('gameImage').value.trim()
    };
    
    // Client-side validation
    if (!validateFormData(formData)) {
        return;
    }
    
    try {
        // Show loading state on button
        const submitBtn = addGameForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner" style="width:20px;height:20px;border-width:2px;"></span> Guardando...';
        submitBtn.disabled = true;
        
        // Send POST request
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message with SweetAlert2
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: '¡Juego agregado con éxito!',
                confirmButtonText: '¡Genial!',
                confirmButtonColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent-primary').trim() || '#e52521',
                background: getComputedStyle(document.documentElement)
                    .getPropertyValue('--bg-card').trim() || '#ffffff',
                color: getComputedStyle(document.documentElement)
                    .getPropertyValue('--text-primary').trim() || '#1a1a1a',
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            
            // Reset form
            addGameForm.reset();
            
            // Refresh the games grid
            clearFilters();
            
        } else {
            // Show error with SweetAlert2
            const errorMessage = result.errors ? result.errors.join('<br>') : result.message;
            
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                html: errorMessage,
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#e74c3c'
            });
        }
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error adding game:', error);
        
        Swal.fire({
            icon: 'error',
            title: '¡Error de conexión!',
            text: 'No se pudo conectar con el servidor. Por favor, intenta de nuevo.',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#e74c3c'
        });
        
        // Restore button
        const submitBtn = addGameForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<span class="submit-icon">➕</span> Agregar Juego';
        submitBtn.disabled = false;
    }
}


function validateFormData(data) {
    const errors = [];
    
    if (!data.title) {
        errors.push('El título es obligatorio');
    }
    
    if (!data.category) {
        errors.push('Debes seleccionar una categoría');
    }
    
    if (!data.description) {
        errors.push('La descripción es obligatoria');
    }
    
    if (!data.image) {
        errors.push('La URL de la imagen es obligatoria');
    } else if (!isValidURL(data.image)) {
        errors.push('La URL de la imagen no es válida');
    }
    
    if (errors.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: '¡Campos incompletos!',
            html: errors.join('<br>'),
            confirmButtonText: 'Revisar',
            confirmButtonColor: '#f39c12'
        });
        return false;
    }
    
    return true;
}

/**
 * Check if a string is a valid URL
 * @param {string} string - URL to validate
 * @returns {boolean} Validation result
 */
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// ==========================================
// FILTERING
// ==========================================

/**
 * Handle search input with debounce
 */
let searchTimeout;
function handleSearchInput() {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        currentFilters.search = searchInput.value;
        loadGames(currentFilters);
    }, 300); // 300ms debounce
}

/**
 * Handle category filter change
 */
function handleCategoryChange() {
    currentFilters.category = categoryFilter.value;
    loadGames(currentFilters);
}

/**
 * Clear all filters and reload games
 */
function clearFilters() {
    searchInput.value = '';
    categoryFilter.value = 'all';
    currentFilters = { search: '', category: 'all' };
    loadGames(currentFilters);
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================


function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    
    searchInput.addEventListener('input', handleSearchInput);
    
    categoryFilter.addEventListener('change', handleCategoryChange);
    
    clearFiltersBtn.addEventListener('click', clearFilters);
    
    addGameForm.addEventListener('submit', handleFormSubmit);
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            handleSearchInput();
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function escapeHTML(text) {
    if (!text) return '';
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


function showToast(message, type = 'success') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-card').trim() || '#ffffff',
        color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-primary').trim() || '#1a1a1a',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    
    Toast.fire({
        icon: type,
        title: message
    });
}

