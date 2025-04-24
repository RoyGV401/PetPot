<?php

require "model_layer/DBManager.php";
$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['nombre']) && isset($data['contrasenia']) &&
    isset($data['correo']) && isset($data['telefono']) &&
    isset($data['apellidoP']) && isset($data['apellidoM']) &&
    isset($data['curp'])
) {
    $db = new DBManager();
    $resultado = $db->addUser(
        $data['nombre'], $data['contrasenia'], $data['correo'],
        $data['telefono'], $data['apellidoP'], $data['apellidoM'],
        $data['curp']
    );
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
