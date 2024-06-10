<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';


if($utilisateur->role_name =="Etudiant"){

        $sql = "SELECT * FROM message 
        inner join ticket on message.message_ticket_id = ticket.ticket_id
        inner join utilisateur on message.message_created_by_id = utilisateur.utilisateur_id
        inner join role on role.role_id = utilisateur.utilisateur_role_id
        WHERE ticket.ticket_id = :ticket_id AND message_created_by_id = :utilisateur_id order by message_id ASC";
        $stmt = $db->prepare($sql);

        $stmt->execute([':ticket_id' => $_GET['ticket_id'], ':utilisateur_id' => $utilisateur->utilisateur_id]);

        $utilisateurs = $stmt->fetchAll();
} else {
        $sql = "SELECT * FROM message 
        inner join ticket on message.message_ticket_id = ticket.ticket_id
        inner join utilisateur on message.message_created_by_id = utilisateur.utilisateur_id
        inner join role on role.role_id = utilisateur.utilisateur_role_id
        WHERE ticket.ticket_id = :ticket_id order by message_id ASC";
        $stmt = $db->prepare($sql);

        $stmt->execute([':ticket_id' => $_GET['ticket_id']]);

        $utilisateurs = $stmt->fetchAll();
}



echo json_encode($utilisateurs);



?>