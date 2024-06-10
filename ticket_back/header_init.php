<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, authorization");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Aucun contenu n'est nécessaire, juste une réponse 204 (No Content)
    header("HTTP/1.1 204 No Content");
    exit;
}
try {
    $db =  new PDO("mysql: host=localhost; dbname=ticket_angular; charset=utf8", "root", '', [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>