<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['idEspecie']) || isset($_POST['idMascota']) 
){
    $db = new DBManager();
    $idMascota= isset($_POST['idMascota']) ? $_POST['idMascota'] : 0;


    if($idMascota != 0) {
        $resultado = $db->showPetBreed($idMascota);
    } else {
        $resultado = $db->showEspecieBreed($_POST['idEspecie']);
    }
    echo json_encode(['success' => true, 'resultado' => $resultado]);
}else
{
    echo json_encode(['success' => false, 'resultado' => $resultado]);
}
    

?>
