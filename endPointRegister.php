<?php

require "model_layer/DBManager.php";

if( isset($_POST['usr']) && isset($_POST['pass']) && isset($_POST['correo']) && isset($_POST['telefono']) && isset($_POST['apellidoP']) && isset($_POST['apellidoM']) && isset($_POST['curp'])) 
{
    $db = new DBManager();
    $resultado = $db->addUser($_POST['usr'], $_POST['pass'], $_POST['correo'], $_POST['telefono'],$_POST['apellidoP'],$_POST['apellidoM'],$_POST['curp']);
    echo $resultado;
}
else
{
    die('Error, se requiere el user y pass');
}

?>
