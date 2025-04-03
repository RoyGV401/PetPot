export const LOGIN_FORM = `
  <div class="div_login" id="div_login">
    <h1>Inicio de sesión</h1>
    <div class="image-logo-container">
      <div class="image">
        <img src="resources/cabexa.png" class="avatar">
        <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
        <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
      </div>
      <div class="cortina">
        
      </div>
    </div>
    <input id="input_correo" type="text" placeholder="Correo@email.com">
    <input id="input_contra" type="password" placeholder="Contraseña">
    <br>
    <br>

    <button class="important_button" id="btn_log">Acceder</button>
    <p id="login_warning"></p>
    <div class="linea-con-texto">
      <span class="texto-centro">  O   </span>
    </div>
    <button class="important_button" id="btn_regis">Registro</button>
    <br>    <br>

    <button class="cancel_button" id="btn_cancel_login">Salir</button>
  </div>
  
`;

export const REGISTER_FORM = `
  <div class="div_login" id="div_login">
    <h1>Registro</h1>
    <div class="image-logo-container">
      <div class="image">
        <img src="resources/cabexa.png" class="avatar">
        <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
        <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
      </div>
      <div class="cortina">
        
      </div>
    </div>
    <input id="input_nombre" type="text" placeholder="Nombre(s)">
    <input id="input_apellidos" type="text" placeholder="Apellido(s)"><br><br>

    <input id="input_correo" type="email" placeholder="Correo@email.com">
    <input id="input_numero" type="number" placeholder="Número de teléfono"><br><br>

        <input id="input_contra" type="password" placeholder="Contraseña...">
    <input id="input_confirm_contra" type="password" placeholder="Confirmar contraseña...">
    <br>


    <button class="important_button" id="btn_confirm_register">Registrarme</button>
    <p id="login_warning"></p>
    <div class="linea-con-texto">
      <span class="texto-centro">  O   </span>
    </div>
    <br>   
    <button class="important_button" id="btn_acceder_login">Acceder</button>
    <br>    
    <button class="cancel_button" id="btn_cancel_login">Salir</button>
    
  </div>
  
`;