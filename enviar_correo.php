<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 $email = $_POST['email'];

 $conexion = new mysqli("localhost", "root", null, "petpotDB");
 $stmt = $conexion->prepare("SELECT idUsuario FROM usuario WHERE correo = ?");
 $stmt->bind_param("s", $email);
 $stmt->execute();
 $resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    die("Correo no encontrado");
}

$token = bin2hex(random_bytes(3));
$expira = date("Y-m-d H:i:s", time() + 3600);

$stmt = $conexion->prepare("UPDATE usuario SET reset_token = ?, token_expira = ? WHERE correo = ?");
$stmt->bind_param("sss", $token, $expira, $email);
$stmt->execute();


$to=$email;
$subject="Recupera tu contraseña PetPot";
$message="Código para recuperar tu contraseña: $token.";
$message .= "Si usted no solicitó este cambio, ignore este mensaje."; 
$headers='From: pet.potsm@.com'."\r\n".
'Reply-To: pet.potsm@gmail.com';

if(mail($to, $subject, $message, $headers)){
	echo "correo enviado con exito";
}else{
	echo "el correo no se pudo enviar";
}
}

?>
