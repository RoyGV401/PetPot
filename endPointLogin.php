<?php

require "model_layer/DBManager.php";

if( isset($_POST['usr']) && isset($_POST['pass']) ) 
{
    $db = new DBManager();
    $resultado = $db->findUser($_POST['usr'], $_POST['pass']);
    echo json_encode($resultado);
}
else
{
    die('Error, se requiere el user y pass');
}

?>
