<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['correo']) || isset($_POST['idMascota']) || isset($_POST['idUsuario'])
) {
    $db = new DBManager();

    $p =  isset($_POST['idMascota']) ?  $_POST['idMascota'] : null;
    $c =  isset($_POST['correo']) ?  $_POST['correo'] : null;
    if($p==null&&$c!=null)
    $resultado = $db->findUserByCorreo(
        $_POST['correo']
    );
    else if($p!=null&&$c==null){
        $resultado = $db->findUserByMascota(
        $_POST['idMascota']
    );
    }else{
        $resultado = $db->findUserByid(
        $_POST['idUsuario']);
    }
    
    echo json_encode(['success' => true, 'resultado' => $resultado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
}

?>
