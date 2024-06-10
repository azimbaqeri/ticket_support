<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

if($utilisateur->role_name != "Administrateur" && $utilisateur->role_name != "Intervenant"){
    echo '{"message" : "Vous n\'avez pas les droits"}';
    http_response_code(403);
    exit;
}

$sql = "SELECT utilisateur_id , utilisateur_email, utilisateur_firstname, utilisateur_lastname , role_name FROM utilisateur inner join role on role.role_id = utilisateur.utilisateur_role_id";
$utilisateurs = $db->query($sql)->fetchAll();


echo json_encode($utilisateurs);


?>