<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

if ($utilisateur->role_name != "Administrateur") {
    echo '{"message" : "Vous n\'avez pas les droits"}';
    http_response_code(403);
    exit;
}

$ticket_id = $_GET['ticket_id'];

$sql = "DELETE FROM message WHERE message_ticket_id = :ticket_id";
$stmt = $db->prepare($sql);
$stmt->execute([":ticket_id" => $ticket_id]);

$sql = "DELETE FROM ticket WHERE ticket_id = :ticket_id";
$stmt = $db->prepare($sql);
$stmt->execute([":ticket_id" => $ticket_id]);

echo '{"message" : "Le ticket a bien été supprimé"}';

?>