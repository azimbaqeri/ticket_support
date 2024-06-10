<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';


// cette requête permet d'ajouter un message dans la base de données main avec limitation de 5 messages par ticket
// $sql = "SELECT count(*) as num FROM ticket";
// $stmt = $db->prepare($sql);
// $stmt->execute();
// $row  = $stmt->fetch();

// if ($row["num"] >= 5) {
//     exit;
// }

$json = file_get_contents('php://input');
$ticket = json_decode($json);

$sql = "INSERT INTO ticket (ticket_title, ticket_date_created, ticket_status, ticket_created_by_id)
VALUES (:ticket_title, :ticket_date_created, :ticket_status, :ticket_created_by_id)";

$stmt = $db->prepare($sql);
$stmt->execute([':ticket_title' => $ticket->ticket_title, ':ticket_date_created' => date('Y-m-d'), ':ticket_status' => "1", ':ticket_created_by_id' => $utilisateur->utilisateur_id]);
$last_id = $db->lastInsertId();

$sql = "INSERT INTO message (message_text, message_ticket_id, message_created_by_id) 
VALUES (:message_text, :message_ticket_id, :message_created_by_id)";

$stmt = $db->prepare($sql);
$stmt = $stmt->execute([':message_text' => $ticket->ticket_description, ':message_ticket_id' => $last_id, ':message_created_by_id' => $utilisateur->utilisateur_id]);



echo '{"message" : "Ticket ajoute"}';


?>