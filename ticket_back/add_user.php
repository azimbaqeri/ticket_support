<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';


// cette requête permet d'ajouter un message dans la base de données main avec limitation de 5 utilisateurs
$sql = "SELECT count(*) as num FROM utilisateur";
$stmt = $db->prepare($sql);
$stmt->execute();
$row  = $stmt->fetch();

if ($row["num"] >= 5) {
    exit;
}

$json = file_get_contents('php://input');
$utilisateur = json_decode($json);

$sql= "SELECT role_id FROM role WHERE role_name = :role_name";
$stmt = $db->prepare($sql);
$stmt->execute([':role_name' => $utilisateur->role_name]);
$role = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$role){
    echo '{"message" : "Role inconnu"}';
    http_response_code(400);
    exit;
}

$role_id = $role['role_id'];

$passwordHash = password_hash($utilisateur->utilisateur_password, PASSWORD_DEFAULT);

$sql = "INSERT INTO 
utilisateur (utilisateur_email, utilisateur_password, utilisateur_firstname, utilisateur_lastname, utilisateur_role_id) 
VALUES 
(:utilisateur_email, :utilisateur_password, :utilisateur_firstname, :utilisateur_lastname, :utilisateur_role_id)";

$stmt = $db->prepare($sql);


    $stmt->bindValue(':utilisateur_email', $utilisateur->utilisateur_email, PDO::PARAM_STR);
    $stmt->bindValue(':utilisateur_password', $passwordHash, PDO::PARAM_STR);
    $stmt->bindValue(':utilisateur_firstname', $utilisateur->utilisateur_firstname, PDO::PARAM_STR);
    $stmt->bindValue(':utilisateur_lastname', $utilisateur->utilisateur_lastname, PDO::PARAM_STR);
    $stmt->bindValue(':utilisateur_role_id', $role_id, PDO::PARAM_INT);
    $stmt->execute();

echo '{"message" : "l\'utilisateur a été ajouté"}';
http_response_code(201);

//debagdumpparams
