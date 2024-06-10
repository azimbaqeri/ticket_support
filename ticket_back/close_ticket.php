<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';

$ticket_id = $_GET['ticket_id'];

$sql = "UPDATE ticket SET ticket_status = :ticket_status, ticket_date_closed = :ticket_date_closed WHERE ticket_id = :ticket_id";

$stmt = $db->prepare($sql);
$stmt = $stmt->execute([':ticket_status' => "0", ':ticket_id' => $ticket_id, ':ticket_date_closed' => date('Y-m-d')]);



echo '{"message" : "Ticket ferme"}';
http_response_code(201);
