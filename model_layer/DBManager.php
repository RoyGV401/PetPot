<?php

require "Mascota.php";

class DBManager {
    private $db;
	private $host;
	private $user;
	private $pass;
    private $port;

    public function __construct() {
        $this->db = "petpotDB";
        $this->host = "localhost";
        $this->user = "root";
        $this->pass = null;
        $this->port = 3306;
    }

    private function open()
    {
        $link = mysqli_connect(
            $this->host, $this->user, $this->pass, $this->db, $this->port
        ) or die('Error al abrir conexion');

        return $link;
    }

    private function close($link)
    {
        mysqli_close($link);
    }

    public function findUser($correo, $pass)
    {
        $link = $this->open();

        $sql = "SELECT * FROM usuario WHERE correo='$correo' AND contrasenia=SHA1('$pass')";
        
        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');
        
        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);
        
        return $rows;
    }

    public function findUserByCorreo($correo)
    {
        $link = $this->open();

        $sql = "SELECT * FROM usuario WHERE correo='$correo'";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function addUser($usr, $pass, $correo, $telefono, $apelldioP, $apellidoM, $curp)
    {
        $link = $this->open();

        $sql = "INSERT INTO usuario(nombre, contrasenia, correo, telefono, apellidoP, apellidoM, curp) VALUES(?, SHA1(?), ?, ?, ?, ?, ?)";

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sssssss",
            $usr, $pass, $correo, $telefono, $apelldioP, $apellidoM, $curp
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error insert');

        $this->close($link);

        return $resultado;
    }

    public function showPets()
    {
        $link = $this->open();

        $sql = "SELECT * FROM mascotas ";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function addPet(Mascota $p)
    {
        $link = $this->open();

        $sql = "INSERT INTO mascota VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sssiiiis",
            $p->nombre,
            $p->descripcion,
            $p->fecha_nacimiento,
            $p->Sexo_idSexo,
            $p->Tamanio_idTamanio,
            $p->Historial_medico_idHistorial_medico,
            $p->Raza_idRaza,
            $p->esPeligrosa 
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error insert');

        $this->close($link);

        return $resultado;
    }

    public function editPet(Mascota $p)
    {
        $link = $this->open();

        $sql = "UPDATE mascotas SET nombre=?, descripcion=?, fecha_nacimiento=?, Sexo_idSexo=?, Tamanio_idTamanio=?, Historial_medico_idHistorial_medico=?, Raza_idRaza=?, esPeligrosa=? WHERE idMascota=" . $p->idMascota;

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sssiiiis",
            $p->nombre,
            $p->descripcion,
            $p->fecha_nacimiento,
            $p->Sexo_idSexo,
            $p->Tamanio_idTamanio,
            $p->Historial_medico_idHistorial_medico,
            $p->Raza_idRaza,
            $p->esPeligrosa 
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error update');

        $this->close($link);

        return $resultado;
    }

    

    

}

?>
