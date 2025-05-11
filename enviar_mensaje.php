<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 $email = $_POST['email'];
 $email_r = $_POST['email_r'];
 $cuerpo = $_POST['cuerpo'];
 $usuario = $_POST['usuario'];
$usuario_r = $_POST['usuario_r'];
 $mascota = $_POST['mascota'];


 $conexion = new mysqli("localhost", "root", null, "petpotDB");
 $stmt = $conexion->prepare("SELECT idUsuario FROM usuario WHERE correo = ?");
 $stmt->bind_param("s", $email_r);
 $stmt->execute();
 $resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    die("Correo no encontrado");
}


$to=$email_r;
$subject="Mensaje sobre $mascota";

$message = '
	 <html>
	 	<head><title>Mensaje sobre '.$mascota.'</title></head>
			<body>
				<p>
					Hola '.$usuario_r.' parece que el usuario '.$usuario.'	 quiere saber más sobre '.$mascota.', pues envió el siguiente mensaje:
				</p>
				<p>
					"'.$cuerpo.'"
				</p>
				<p>
					Puedes continuar la comunicación con el hacia '.$email.'
				</p>
            </body>
    </html>
';



$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .='From: pet.potsm@.com'."\r\n".
'Reply-To:'. $email;

if(mail($to, $subject, $message, $headers)){
	echo json_encode( "correo enviado con exito");
}else{
	echo json_encode("el correo no se pudo enviar");
}
}

?>
