export const LOGIN_FORM = `

 <div class="modal fade" id="whyCurp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header col-12">
            <div class="container justify-content-center">
                <p class="h2  fw-bolder pt-2">¿Porqué necesitamos tu CURP?</p>
            </div>
        </div>

        <div class="modal-body">
          <p class="h6">
            Solicitamos tu CURP como parte de un proceso responsable de adopción. Esta información nos permite verificar que no existan antecedentes relacionados con maltrato animal u otras situaciones que puedan poner en riesgo el bienestar de las mascotas.  <br><br>Nuestro objetivo es asegurar que cada animal encuentre un hogar seguro, amoroso y adecuado. Tu información será tratada con total confidencialidad y solo será utilizada para este fin.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal">Entendido</button>
        </div>
      </div>
    </div>
  </div>


    <div class="modal fade" id="confirmLogOut" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header col-12">
            <div class="container justify-content-center">
                <p class="h2  fw-bolder pt-2">Cerrar Sesión</p>
            </div>
        </div>

        <div class="modal-body">
          <p class="h5">
            ¿Está seguro que desea cerrar sesión?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="localStorage.currentUser = 0; document.cookie= 'userCorreo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; window.location.reload();">Salir</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>


    <div class="modal fade" id="registerForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog div_login">
      <div class="modal-content  text-center bg-orange-alpha">
            <div class="modal-header col-12">
                <div class="container justify-content-center">
                    <p class="h2 text-white fw-bolder pt-2">Registro</p>
                </div>
            </div>
    

        <div class="modal-body">
            
            <div id="div_login">

                <div class="row">
                    <div class="col-12">
                        <div class="image-logo-container">

                            <div class="image">
                              <img src="resources/cabexa.png" class="avatar">
                              <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
                              <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
                            </div>
                            <div class="cortina"></div>
          
                          </div>
                    </div>
                </div>

                <div class="row py-1">

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                          <p class="text-white mb-1">Nombre(s):</p>
                          <input id="input_nombre" class="form-control" type="text" placeholder="Nombre(s)">
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                          <p class="text-white mb-1">Apellido paterno:</p>
                          <input id="input_apellidoP" class="form-control" type="text" placeholder="Apellido(s)">
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                            <p class="text-white mb-1">Apellido materno:</p>
                            <input id="input_apellidoM" class="form-control" type="text" placeholder="Apellido(s)">
                          </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                          <p class="text-white mb-1">Correo electrónico:</p>
                          <input id="input_correo" class="form-control" type="email" placeholder="Correo@email.com">
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                            <p class="text-white mb-1">Número de teléfono:</p>
                            <input id="input_numero" class="form-control" type="number" placeholder="Número de teléfono">
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                            <p class="text-white mb-1">CURP:</p>
                            <input id="input_curp" class="form-control" type="text" placeholder="...">
                        </div>
                        
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                          <p class="text-white mb-1">Contraseña:</p>
                          <input id="input_contra" class="form-control" type="password" placeholder="...">
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                          <p class="text-white mb-1">Confirmar contraseña:</p>
                          <input id="input_confirm_contra" class="form-control" type="password" placeholder="...">
                        </div>
                  
                       
                      
 
                    <div class="col-lg-6 col-md-12 col-sm-12 py-1">
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 py-1">
                    </div>
                </div>

                <div class="row pt-3 pb-1">
                    <a class="text-white h6" href="index.html" data-bs-toggle="modal" data-bs-target="#whyCurp">¿Porqué solicitamos tu CURP?</a>
                </div>
                
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-primary text-white font-helvetica fw-bold col-6" id="btn_regis">Registrarme</button>
                </div>

              </div>
        </div>
        
        <div class="modal-footer">
            <div class="container">
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-primary text-white font-helvetica fw-bold col-6" data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn_regis">Acceder</button> 
                </div>
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-magnus-orange text-white font-helvetica fw-bold col-6" data-bs-dismiss="modal" id="btn_cancel_login">Salir</button>
                </div>
            </div>
          
        </div>
        
      </div>
    </div>
  </div>

   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog div_login">
      <div class="modal-content  text-center bg-orange-alpha">
            <div class="modal-header col-12">
                <div class="container justify-content-center">
                    <p class="h2 text-white fw-bolder pt-2">Inicio de sesión</p>

                </div>
            </div>
    

        <div class="modal-body">
            
            <div id="div_login">

                <div class="row">
                    <div class="col-12">
                        <div class="image-logo-container">

                            <div class="image">
                              <img src="resources/cabexa.png" class="avatar">
                              <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
                              <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
                            </div>
                            <div class="cortina"></div>
          
                          </div>
                    </div>
                </div>

                <div class="row py-1">

                        <div class="form-group col-lg-12 col-md-12 col-sm-12 py-1">
                          <p class="text-white mb-1">Tu correo electrónico:</p>
                          <input id="input_correo_log" class="form-control" type="text" placeholder="Correo@email.com">
                        </div>
                        <div class="form-group col-lg-12 col-md-12 col-sm-12 py-1">
                          <p class="text-white mb-1">Tu contraseña:</p>
                          <input id="input_contra_log" class="form-control" type="password" placeholder="Contraseña">
                        </div>
                      
 
                    <div class="col-lg-6 col-md-12 col-sm-12 py-1">
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 py-1">
                    </div>
                </div>

                <div class="row pt-3 pb-1">
                    <a class="btn text-white h6" id="btn_recuperar" href="index.html"  data-bs-toggle="modal" data-bs-target="#recuperarForm">¿Olvidaste tu contraseña?</a>
                </div>
                
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-primary text-white font-helvetica fw-bold col-6" id="btn_log">Acceder</button>
                </div>


                <div class="row py-1">
                    <p id="login_warning"></p>
                </div>

              </div>
        </div>
        
        <div class="modal-footer">
            <div class="container">
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-primary text-white font-helvetica fw-bold col-6" id="btn_regis" data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#registerForm">Registrarme</button> 
                </div>
                <div class="row py-1 justify-content-center">
                    <button class="btn btn-lg bg-magnus-orange text-white font-helvetica fw-bold col-6" data-bs-dismiss="modal" id="btn_cancel_login">Salir</button>
                </div>
            </div>
          
        </div>
        
      </div>
    </div>
  </div>

  
  <div class="modal fade" id="recuperarForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog ">
      <div class="modal-content div_login">
          <div class="modal-header">
              <h1 class="text-white">Recupera tu contraseña</h1>
          </div>
          <div class="modal-body justify-content-center">
              <div class="image-logo-container">
                  <div class="image">
                    <img src="resources/cabexa.png" class="avatar">
                    <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
                    <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
                  </div>
                  <div class="cortina"></div>
              </div>
              <form id="form-recuperar">
                  <input id="input_correoR"  class="form-control" type="email" name ="email" placeholder="Correo@email.com" required>
                  <br>
                  <br>
                  <button type="submit"  class="btn important_button"  href="index.html"  data-bs-toggle="modal" data-bs-target="#recuperarForm2" id="ver_correo">Enviar</button>
                  <p id="mensaje_recu"></p>
              </form>
              <br>    
              <button class="cancel_button" id="btn_cancel_login" data-bs-dismiss="modal">Salir</button>
          </div>
      </div>
   </div>
</div>


<div class="modal fade" id="recuperarForm2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog ">
      <div class="modal-content div_login">
          <div class="modal-header">
              <h1 class="text-white">Recupera tu contraseña</h1>
          </div>
          <div class="modal-body justify-content-center">
              <div class="image-logo-container">
                  <div class="image">
                    <img src="resources/cabexa.png" class="avatar">
                    <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
                    <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
                  </div>
                  <div class="cortina"></div>
              </div>
                <form id="pincode-form" class="d-flex justify-content-center">
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                  <input type="text" class="form-control pincode-input" maxlength="1" pattern="[A-Za-z1-9]" required>
                </form>
                <br>
                 <button id="btn_enviar_corroborar" class="btn btn-primary">Enviar</button>
              <br>
              <br>
              <button class="cancel_button" id="btn_cancel_login" data-bs-dismiss="modal">Salir</button>
          </div>
      </div>
   </div>
</div>


<div class="modal fade" id="recuperarForm3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog ">
      <div class="modal-content div_login">
          <div class="modal-header">
              <h1 class="text-white">JIJIJA</h1>
          </div>
          <div class="modal-body justify-content-center">
              <div class="image-logo-container">
                  <div class="image">
                    <img src="resources/cabexa.png" class="avatar">
                    <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
                    <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
                  </div>
                  <div class="cortina"></div>
              </div>
              <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                <p class="text-white mb-1">Contraseña:</p>
                <input id="input_contra_new" class="form-control" type="password" placeholder="...">
              </div>
              <div class="form-group col-lg-6 col-md-6 col-sm-12 py-1">
                <p class="text-white mb-1">Confirmar contraseña:</p>
                <input id="input_confirm_contra_new" class="form-control" type="password" placeholder="...">
              </div>
                <br>
                 <button id="btn_enviar_new_pass" class="btn btn-primary">Enviar</button>
              <br>
              <br>
              <button class="cancel_button" id="btn_cancel_login" data-bs-dismiss="modal">Salir</button>
          </div>
      </div>
   </div>
</div>
`;

export function borrarCookie() {
  document.cookie = `userCorreo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}




    

