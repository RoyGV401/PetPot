<?php

require "model_layer/DBManager.php";
$db = new DBManager();

    if(isset($_POST['idMascota'])&&isset($_POST['bandera'])){
        $resultado = $db->updateAdoptado($_POST['idMascota'],$_POST['bandera']);
    }else{
        die("error");
    }
   
    echo json_encode(['success' => true, 'resultado' => $resultado]);
?>
