<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['correo'])
) {
    $db = new DBManager();
    $resultado = $db->findUserByCorreo(
        $_POST['correo']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
