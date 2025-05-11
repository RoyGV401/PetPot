<?php



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

    public function findUserByid($id)
    {
        $link = $this->open();

        $sql = "SELECT * FROM usuario WHERE idUsuario='$id'";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function findUserByMascota($id)
    {
        $link = $this->open();

        $sql = "SELECT usuario.nombre, usuario.correo FROM usuario INNER JOIN mascota on usuario.idusuario=mascota.usuario_idusuario WHERE mascota.idmascota='$id'";

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

        $sql = "SELECT * FROM mascota ";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }
     
    public function showLastpet(){
        $link = $this->open();

        $sql = "SELECT * FROM mascota ORDER BY idMascota DESC LIMIT 1";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function createItemPersonalidad($idMascota, $personalidades){
       
        foreach ($personalidades as $p) {
            $link = $this->open();

        $sql = "INSERT INTO itemPersonalidad (Mascota_idMascota, Personalidad_idPersonalidad) VALUES (?,?)";

        $query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "ii",
            $idMascota, $p
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error insert');

        $this->close($link);

        }
        
        return $resultado;
    }

    public function createubicacion($latitud, $longitud){
       
      
        $link = $this->open();

        $sql = "INSERT INTO ubicacion  VALUES (NULL,?,?)";

        $query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "dd",
            $latitud, $longitud
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error insert');
      

        $sql = "SELECT * FROM ubicacion ORDER BY idUbicaciones DESC LIMIT 1";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');


        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function showPersonalidad($id){
        $link = $this->open();

        $sql = "SELECT p.descripcion 
        FROM mascota m
        JOIN itemPersonalidad ip ON m.idMascota = ip.Mascota_idMascota
        JOIN Personalidad p ON ip.Personalidad_idPersonalidad = p.idPersonalidad
        WHERE m.idMascota = $id";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }
    
    public function showColor($id){
        $link = $this->open();

        $sql = "SELECT c.nombre 
        FROM mascota m
        JOIN color c ON m.Color_idColor = c.idColor
        WHERE m.idMascota = $id";

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

        $sql = "INSERT INTO mascota VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
        
        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sssiiiisiii",
            $p->nombre,
            $p->descripcion,
            $p->fecha_nacimiento,
            $p->Sexo_idSexo,
            $p->Tamanio_idTamanio,
            $p->Historial_medico_idHistorial_medico,
            $p->Raza_idRaza,
            $p->esPeligrosa,
            $p->Color_idColor,
            $p->Usuario_idUsuario,
            $p->Ubicacion_idUbicaciones
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

    public function editUserById($nombre, $pass, $correo, $telefono, $curp, $apelldioP, $apellidoM, $id)
    {
        $link = $this->open();

        $sql = "UPDATE usuario SET nombre=?, contrasenia=SHA1(?), correo=?, telefono=?, curp=?, apellidoP=?, apellidoM=?, token_expira=null, reset_token=null WHERE idUsuario=?";

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "sssssssi",
            $nombre,
            $pass,
            $correo,
            $telefono,
            $curp,
            $apellidoP,
            $apellidoM,
            $id
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error update');

        $this->close($link);

        return $resultado;
    }

    public function showUserMultimedia($id)
    {
        $link = $this->open();

        $sql = "SELECT * FROM Multimedia WHERE Usuario_idUsuario='$id' AND esPerfil='T'";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function createMultimedia($id, $doc){
        $link = $this->open();

        $sql = "INSERT INTO multimedia VALUES(null,?,?)";

        // Prepara la consulta
		$query = mysqli_prepare($link, $sql);

        // Enlaza los parametros (reemplaza comodines)
		// Tipos: i para enteros, s para string, d para double y b para blob
		mysqli_stmt_bind_param(
            $query, 
            "si",
             $doc,
            $id
           
            
        );

        // Ejecuta la query
		$resultado = mysqli_stmt_execute($query) or die('Error update');

        $this->close($link);

        return $resultado;
    }

    public function showPetMultimedia($id){

        $link = $this->open();

        $sql = "SELECT * FROM Multimedia WHERE Mascota_idMascota = '$id'"; 

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query multimedia');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function showEspecieBreed($id)
    {
        $link = $this->open();

        $sql = "SELECT * FROM raza WHERE Especie_idEspecie='$id'";

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }

    public function showPetBreed($id){

        $link = $this->open();

        $sql = "SELECT raza.nombre , raza.Especie_idEspecie FROM raza JOIN mascota on Raza_idRaza = idRaza WHERE idMascota = '$id'"; 

        $result = mysqli_query($link, $sql, MYSQLI_ASSOC) or die('Error query');

        $rows = [];
        while($columns = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $columns;
        }

        $this->close($link);

        return $rows;
    }
}

?>
