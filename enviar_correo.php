<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 $email = $_POST['email'];
 
$to=$email;
$subject="RECUPERAR";
$message="este es un correo con xampp";
$headers='From: pet.potsm@.com'."\r\n".
'Reply-To: pet.potsm@gmail.com';

if(mail($to, $subject, $message, $headers)){
	echo "correo enviado con exito";
}else{
	echo "el correo no se pudo enviar";
}
}

?>
