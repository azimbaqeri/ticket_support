<?php
require_once 'header_init.php';

$json = file_get_contents('php://input');
$utilisateur = json_decode($json);



$stmt = $db->prepare("SELECT utilisateur_id, utilisateur_email, utilisateur_firstname, utilisateur_lastname, utilisateur_password, role_name FROM utilisateur inner join role on role.role_id = utilisateur.utilisateur_role_id where utilisateur_email = :utilisateur_email");
$stmt->bindValue(':utilisateur_email', $utilisateur->utilisateur_email);

$stmt->execute();
$utilisateurBdd = $stmt->fetch();

//si utilisateur pas dans la BD

if (!$utilisateurBdd || !password_verify($utilisateur->utilisateur_password, $utilisateurBdd['utilisateur_password'])) {
    echo  '{"message" : "Login ou mot de passe incorrect"}';
    http_response_code(403);
    exit;
}

function base64UrlEncode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

$payload = json_encode([
    'utilisateur_id' => $utilisateurBdd['utilisateur_id'],
    'role_name' => $utilisateurBdd['role_name'],
    'utilisateur_email' => $utilisateurBdd['utilisateur_email'],
    'utilisateur_firstname' => $utilisateurBdd['utilisateur_firstname'],
    'utilisateur_lastname' => $utilisateurBdd['utilisateur_lastname'],

]);


// Encoder en Base64 URL-safe
$base64UrlHeader = base64UrlEncode($header);
$base64UrlPayload = base64UrlEncode($payload);

// Créer la signature
$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'votre_cle_secrete', true);
$base64UrlSignature = base64UrlEncode($signature);

// Assembler le token
$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

echo '{"jwt" : "' . $jwt . '"}';
