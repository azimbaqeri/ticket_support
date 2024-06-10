<?php
require_once 'header_init.php';
require_once 'extraction_jwt.php';


if(isset($_GET['utilisateur_id'])&& $_GET['utilisateur_id']==$utilisateur->utilisateur_id) {
    $sql = "SELECT * FROM ticket WHERE ticket_created_by_id = :ticket_created_by_id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':ticket_created_by_id' => $_GET['utilisateur_id']]);
    $utilisateurs = $stmt->fetchAll();
} else {
    $sql = "SELECT * FROM ticket";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $utilisateurs = $stmt->fetchAll();
}




echo json_encode($utilisateurs);
