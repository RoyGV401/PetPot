<?php

require "model_layer/DBManager.php";

if (
    isset($_POST['nombre']) &&
    isset($_POST['descripcion']) &&
    isset($_POST['fecha_nacimiento']) &&
    isset($_POST['Sexo_idSexo']) &&
    isset($_POST['Tamanio_idTamanio']) &&
    isset($_POST['Historial_medico_idHistorial_medico']) &&
    isset($_POST['Raza_idRaza']) &&
    isset($_POST['esPeligrosa']) &&
    isset($_POST['idMascota'])
) {
    $db = new DBManager();
    $p = new Mascota();
    $p-> idMascota= isset($_POST['idMascota']) ? $_POST['idMascota'] : 0;
    $p-> nombre= $_POST['nombre'];
    $p-> descripcion= $_POST['descripcion']; 
    $p-> fecha_nacimiento= $_POST['fecha_nacimiento']; 
    $p-> Sexo_idSexo= $_POST['Sexo_idSexo']; 
    $p-> Tamanio_idTamanio= $_POST['Tamanio_idTamanio']; 
    $p-> Historial_medico_idHistorial_medico= isset($_POST['Historial_medico_idHistorial_medico']) ? $_POST['Historial_medico_idHistorial_medico'] : null; 
    $p-> Raza_idRaza= isset($_POST['Raza_idRaza']) ? $_POST['Raza_idRaza'] : null; 
    $p-> esPeligrosa= $_POST['esPeligrosa']; 

    if($p->idMascota != 0) {
        echo $db->editPet($p);
    } else {
        echo $db->addPet($p);
    }
}

?>
