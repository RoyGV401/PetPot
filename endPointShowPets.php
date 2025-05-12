<?php

require "model_layer/DBManager.php";

    $p = isset($_POST['idMascota']) ? $_POST['idMascota'] : null;
    $d = isset($_POST['idUsuario']) ? $_POST['idUsuario'] : null;
    $db = new DBManager();
    if($p==null&&$d==null)
        $resultado = $db->showPets();
    else if($d==null)
        $resultado = $db->showPet($p);
    else
        $resultado = $db->showPetsUser($d);

    echo json_encode(['success' => true, 'resultado' => $resultado]);

?>
