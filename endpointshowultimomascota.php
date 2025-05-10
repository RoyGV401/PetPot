<?php

require "model_layer/DBManager.php";

    $db = new DBManager();
    $resultado = $db->showLastPet();
    echo json_encode($resultado);

?>
