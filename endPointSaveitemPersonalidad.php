<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['idMascota'])&&isset($_POST['Personalidad_idPersonalidad'])
) {
    $db = new DBManager();
    $p = isset($_POST['update']) ? $_POST['idMascota'] :null;

    if($p==null){
        $resultado = $db->createItemPersonalidad(
        $_POST['idMascota'],
        $_POST['Personalidad_idPersonalidad']
    );
    }else{
        $resultado = $db->updateItemPersonalidad(
        $_POST['idMascota'],
        $_POST['Personalidad_idPersonalidad']
    );
    }
    
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
