<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

if ($utilisateur->role_name != "Administrateur") {
    echo '{"message" : "Vous n\'avez pas les droits"}';
    http_response_code(403);
    exit;
}

$utilisateur_id = $_GET['utilisateur_id'];

// cette requête permet d'ajouter un message dans la base de données main avec limitation de 5 messages par ticket
if ($utilisateur_id == 1 || $utilisateur_id == 2 || $utilisateur_id == 3) {
    echo '{"message" : "Vous ne pouvez pas supprimer cet utilisateur"}';
    http_response_code(403);
    exit;
} else {
    try {
        $sql = "DELETE FROM utilisateur WHERE utilisateur_id = :utilisateur_id";

        $stmt = $db->prepare($sql);

        $stmt->execute([":utilisateur_id" => $utilisateur_id]);
    } catch (PDOException $e) {
        echo '{"message" : "Vous ne pouvez pas supprimer cet utilisateur, car cet utilisateur a un ticket"}';
        http_response_code(500);
        exit;
    }
}

echo '{"message" : "L\'article a bien été supprimé"}';
