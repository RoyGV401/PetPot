<?php
require "model_layer/Mascota.php";
require "model_layer/DBManager.php";

if (
    isset($_POST['nombre']) &&
    isset($_POST['descripcion']) &&
    isset($_POST['fecha_nacimiento']) &&
    isset($_POST['Sexo_idSexo']) &&
    isset($_POST['Tamanio_idTamanio']) &&
    isset($_POST['Raza_idRaza'])&&
    isset($_POST['Color_idColor'])&&
    isset($_POST['Usuario_idUsuario'])
) {
    $db = new DBManager();
    $p = new Mascota();
    $p-> idMascota= isset($_POST['idMascota']) ? $_POST['idMascota'] : 0;
    $p-> nombre= $_POST['nombre'];
    $p-> descripcion= $_POST['descripcion']; 
    $p-> fecha_nacimiento= $_POST['fecha_nacimiento']; 
    $p-> Sexo_idSexo= $_POST['Sexo_idSexo']; 
    $p-> Tamanio_idTamanio= $_POST['Tamanio_idTamanio']; 
    $p-> Historial_medico_idHistorial_medico= isset($_POST['Historial_medico_idHistorial_medico']) ? $_POST['Historial_medico_idHistorial_medico'] : null; 
    $p-> Raza_idRaza= isset($_POST['Raza_idRaza']) ? $_POST['Raza_idRaza'] : null; 
    $p-> esPeligrosa= isset($_POST['esPeligrosa']) ? $_POST['esPeligrosa'] : "F";
    $p-> Color_idColor = $_POST['Color_idColor'];
    $p-> Usuario_idUsuario = $_POST['Usuario_idUsuario'];


    if($p->idMascota != 0) {
        echo $db->editPet($p);
    } else {
        $resultado = $db->addPet($p);
        echo json_encode(['success' => true, 'resultado' => $resultado]);
    }
}else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios']);
}

?>
