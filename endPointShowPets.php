<?php

require "model_layer/DBManager.php";


    $db = new DBManager();
    $resultado = $db->showPets();
    echo json_encode(['success' => true, 'resultado' => $resultado]);

?>
