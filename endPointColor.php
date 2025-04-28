<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['idMascota'])
) {
    $db = new DBManager();
    $resultado = $db->showColor(
        $_POST['idMascota']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
