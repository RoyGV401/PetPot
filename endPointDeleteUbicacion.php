<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['idMascota'])&&isset($_POST['idubicaciones'])
) {
    $db = new DBManager();
    $resultado = $db->DeleteUbicacion(
        $_POST['idMascota'],
        $_POST['idubicaciones']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
