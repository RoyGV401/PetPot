<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['idMascota']) || isset($POST['idUsuario']) 
){
    $db = new DBManager();
    $idMascota= isset($_POST['idMascota']) ? $_POST['idMascota'] : 0;


    if($idMascota != 0) {
        $resultado = $db->showPetMultimedia($idMascota);
    } else {
        $resultado = $db->showUserMultimedia($_POST['idUsuario']);
    }
    echo json_encode(['success' => true, 'resultado' => $resultado]);
}
    

?>
