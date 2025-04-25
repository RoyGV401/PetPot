<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['nombre']) && isset($_POST['contrasenia']) &&
    isset($_POST['correo']) && isset($_POST['telefono']) &&
    isset($_POST['apellidoP']) && isset($_POST['apellidoM']) &&
    isset($_POST['curp'])
) {
    $db = new DBManager();
    $resultado = $db->addUser(
        $_POST['nombre'], $_POST['contrasenia'], $_POST['correo'],
        $_POST['telefono'], $_POST['apellidoP'], $_POST['apellidoM'],
        $_POST['curp']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
