<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['correo']) || isset($_POST['idMascota'])
) {
    $db = new DBManager();

    $p =  isset($_POST['idMascota']) ?  $_POST['idMascota'] : null;
    if($p==null)
    $resultado = $db->findUserByCorreo(
        $_POST['correo']
    );
    else
    $resultado = $db->findUserByMascota(
        $_POST['idMascota']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
