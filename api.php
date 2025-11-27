<?php
/**
 * API Endpoint for Retro Video Game Library
 * Handles GET requests for filtering games and POST requests for adding new games
 */

// Set headers for JSON response and CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Path to the data file
define('DATA_FILE', __DIR__ . '/data.json');

/**
 * Read games data from JSON file
 * @return array Array of games or empty array if file doesn't exist
 */
function readGamesData(): array {
    if (!file_exists(DATA_FILE)) {
        return [];
    }
    
    $jsonContent = file_get_contents(DATA_FILE);
    $games = json_decode($jsonContent, true);
    
    return is_array($games) ? $games : [];
}

/**
 * Write games data to JSON file
 * @param array $games Array of games to save
 * @return bool Success status
 */
function writeGamesData(array $games): bool {
    $jsonContent = json_encode($games, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents(DATA_FILE, $jsonContent) !== false;
}

/**
 * Filter games by category
 * @param array $games Array of games
 * @param string $category Category to filter by
 * @return array Filtered games
 */
function filterByCategory(array $games, string $category): array {
    if (empty($category) || $category === 'all') {
        return $games;
    }
    
    return array_values(array_filter($games, function($game) use ($category) {
        return strtolower($game['category']) === strtolower($category);
    }));
}

/**
 * Filter games by search term (searches in title and description)
 * @param array $games Array of games
 * @param string $searchTerm Term to search for
 * @return array Filtered games
 */
function filterBySearch(array $games, string $searchTerm): array {
    if (empty($searchTerm)) {
        return $games;
    }
    
    $searchTerm = strtolower(trim($searchTerm));
    
    return array_values(array_filter($games, function($game) use ($searchTerm) {
        $titleMatch = strpos(strtolower($game['title']), $searchTerm) !== false;
        $descMatch = strpos(strtolower($game['description']), $searchTerm) !== false;
        $categoryMatch = strpos(strtolower($game['category']), $searchTerm) !== false;
        
        return $titleMatch || $descMatch || $categoryMatch;
    }));
}

/**
 * Validate game data for required fields
 * @param array $gameData Game data to validate
 * @return array Array with 'valid' boolean and 'errors' array
 */
function validateGameData(array $gameData): array {
    $errors = [];
    
    if (empty($gameData['title'])) {
        $errors[] = 'El título es obligatorio';
    }
    
    if (empty($gameData['category'])) {
        $errors[] = 'La categoría es obligatoria';
    }
    
    if (empty($gameData['description'])) {
        $errors[] = 'La descripción es obligatoria';
    }
    
    if (empty($gameData['image'])) {
        $errors[] = 'La URL de la imagen es obligatoria';
    }
    
    // Validate category is one of the allowed values
    $allowedCategories = ['Platformer', 'RPG', 'Shooter', 'Puzzle', 'Fighting'];
    if (!empty($gameData['category']) && !in_array($gameData['category'], $allowedCategories)) {
        $errors[] = 'La categoría no es válida';
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
}

/**
 * Generate a new unique ID for a game
 * @param array $games Existing games array
 * @return int New unique ID
 */
function generateNewId(array $games): int {
    if (empty($games)) {
        return 1;
    }
    
    $maxId = max(array_column($games, 'id'));
    return $maxId + 1;
}

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Read all games
        $games = readGamesData();
        
        // Get query parameters
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        
        // Apply filters
        if (!empty($category) && $category !== 'all') {
            $games = filterByCategory($games, $category);
        }
        
        if (!empty($search)) {
            $games = filterBySearch($games, $search);
        }
        
        // Return filtered results
        echo json_encode([
            'success' => true,
            'count' => count($games),
            'data' => $games
        ], JSON_UNESCAPED_UNICODE);
        break;
        
    case 'POST':
        // Get JSON input
        $inputJSON = file_get_contents('php://input');
        $gameData = json_decode($inputJSON, true);
        
        // Check if JSON was parsed correctly
        if ($gameData === null) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Datos JSON inválidos',
                'errors' => ['El formato de los datos no es válido']
            ], JSON_UNESCAPED_UNICODE);
            break;
        }
        
        // Validate the game data
        $validation = validateGameData($gameData);
        
        if (!$validation['valid']) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validation['errors']
            ], JSON_UNESCAPED_UNICODE);
            break;
        }
        
        // Read existing games
        $games = readGamesData();
        
        // Create new game object
        $newGame = [
            'id' => generateNewId($games),
            'title' => htmlspecialchars(trim($gameData['title']), ENT_QUOTES, 'UTF-8'),
            'category' => $gameData['category'],
            'description' => htmlspecialchars(trim($gameData['description']), ENT_QUOTES, 'UTF-8'),
            'image' => filter_var($gameData['image'], FILTER_SANITIZE_URL)
        ];
        
        // Add to games array
        $games[] = $newGame;
        
        // Save to file
        if (writeGamesData($games)) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => '¡Juego agregado con éxito!',
                'data' => $newGame
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al guardar el juego',
                'errors' => ['No se pudo escribir en el archivo de datos']
            ], JSON_UNESCAPED_UNICODE);
        }
        break;
        
    default:
        // Method not allowed
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Método no permitido',
            'errors' => ['Solo se permiten métodos GET y POST']
        ], JSON_UNESCAPED_UNICODE);
        break;
}
?>

