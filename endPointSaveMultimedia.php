<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['Mascota_idMascota'])&&isset($_POST['documento'])
) {
    $db = new DBManager();
    $resultado = $db->createMultimedia(
        $_POST['Mascota_idMascota'],
        $_POST['documento']

    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
