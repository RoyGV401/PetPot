<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['id'])
) {
    $db = new DBManager();
    $resultado = $db->findUserById(
        $_POST['id']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
