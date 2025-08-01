<?php
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);

// SUPPRIME TOUT CE BLOC !
// $allowed_origins = ['http://localhost:3000', 'http://localhost:3001'];
// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
//     header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
//     header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
// }
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     exit(0);
// }

// RESTE NORMAL
use App\Kernel;
require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
