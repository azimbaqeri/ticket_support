<?php
require_once 'header_init.php';

if (empty($_GET['utilisateur_id'])) {
    echo '{"message" : "Article introuvable"}';
    http_response_code(404);
    exit;
}
$utilisateur_id = $_GET['utilisateur_id'];

$sql = "SELECT utilisateur_id, utilisateur_email, utilisateur_firstname, utilisateur_lastname, role_name FROM utilisateur inner join role on role.role_id = utilisateur.utilisateur_role_id where utilisateur_id = :id order by utilisateur_id ASC";
$stmt = $db->prepare($sql);
$stmt->execute([":id" => $utilisateur_id]);
$utilisateur = $stmt->fetch();

if (!$utilisateur){
    echo '{"message" : "Article introuvable"}';
    http_response_code(404);
    exit;
}


echo json_encode($utilisateur);

?>