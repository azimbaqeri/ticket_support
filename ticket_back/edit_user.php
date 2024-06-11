<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

if (empty($_GET['utilisateur_id'])) {
    echo '{"message" : "Utilisateur ID manquant"}';
    http_response_code(404);
    exit;
}




if ($utilisateur->role_name != "Administrateur") {
    echo '{"message" : "Vous n\'avez pas les droits"}';
    http_response_code(403);
    exit;
}

$utilisateur_id = $_GET['utilisateur_id'];

// cette requête permet d'ajouter un message dans la base de données main avec limitation de modification
if ($utilisateur_id == 1 || $utilisateur_id == 2 || $utilisateur_id == 3) {
    echo '{"message" : "Vous ne pouvez pas modifier cet utilisateur"}';
    http_response_code(403);
    exit;
}


$json = file_get_contents('php://input');
$utilisateur = json_decode($json);

$sql = "SELECT role_id, utilisateur_password FROM utilisateur inner join role on role.role_id = utilisateur.utilisateur_role_id WHERE utilisateur_id = :utilisateur_id";
$stmt = $db->prepare($sql);
$stmt->execute([':utilisateur_id' => $utilisateur_id]);
$utilisateur_exist = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$utilisateur_exist) {
    echo '{"message" : "Utilisateur inconnu"}';
    http_response_code(400);
    exit;
}

if (empty($utilisateur->utilisateur_password)) {
    $passwordHash = $utilisateur_exist['utilisateur_password'];
} else {
    $passwordHash = password_hash($utilisateur->utilisateur_password, PASSWORD_DEFAULT);
}

$sql = "SELECT role_id FROM role WHERE role_name = :role_name";
$stmt = $db->prepare($sql);
$stmt->execute([':role_name' => $utilisateur->role_name]);
$role = $stmt->fetch(PDO::FETCH_ASSOC);
$role_id = $role['role_id'];


$sql = "UPDATE utilisateur SET utilisateur_email=:utilisateur_email, utilisateur_password=:utilisateur_password, utilisateur_firstname =:utilisateur_firstname, utilisateur_lastname =:utilisateur_lastname, utilisateur_role_id =:utilisateur_role_id WHERE utilisateur_id = :utilisateur_id";
$stmt = $db->prepare($sql);


$stmt->bindValue(':utilisateur_email', $utilisateur->utilisateur_email, PDO::PARAM_STR);
$stmt->bindValue(':utilisateur_password', $passwordHash, PDO::PARAM_STR);
$stmt->bindValue(':utilisateur_firstname', $utilisateur->utilisateur_firstname, PDO::PARAM_STR);
$stmt->bindValue(':utilisateur_lastname', $utilisateur->utilisateur_lastname, PDO::PARAM_STR);
$stmt->bindValue(':utilisateur_role_id', $role_id, PDO::PARAM_INT);
$stmt->bindValue(':utilisateur_id', $utilisateur_id, PDO::PARAM_INT);
$stmt->execute();

echo '{"message" : "l\'utilisateur a été mis à jour"}';
http_response_code(201);
exit;
