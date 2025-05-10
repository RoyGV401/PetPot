<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['latitud'])&&
    isset($_POST['longitud'])
    
 
) {
    $db = new DBManager();
    $resultado = $db->createUbicacion(
        $_POST['latitud'],
        $_POST['longitud']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
