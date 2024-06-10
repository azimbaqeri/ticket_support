<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

// cette requête permet d'ajouter un message dans la base de données main avec limitation de 5 messages par ticket
// $sql = "SELECT count(*) as num FROM message";
// $stmt = $db->prepare($sql);
// $stmt->execute();
// $row  = $stmt->fetch();

// if ($row["num"] >= 5) {
//     exit;
// }


$json = file_get_contents('php://input');
$message = json_decode($json);

$sql = "INSERT INTO message (message_text, message_ticket_id, message_created_by_id) 
VALUES (:message_text, :message_ticket_id, :message_created_by_id)";

$stmt = $db->prepare($sql);
$stmt = $stmt->execute([':message_text' => $message->message_text, ':message_ticket_id' => $message->ticket_id, ':message_created_by_id' => $utilisateur->utilisateur_id]);



echo '{"message" : "Message ajoute"}';
http_response_code(201);

// echo json_encode($utilisateur->utilisateur_id);