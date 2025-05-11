//Este archivo está dedicado a cargar únicamente elementos universales, es decir, que existan en todos los archivos, como los forms de login o el header.

export const HEADER = `
        <nav class="navbar navbar-light bg-white basic-shadow">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                id="main_logo"
                src="resources/logo.png"
                alt=""
                width="220"
                class="d-inline-block align-text-top"
              />
            </a>

            
            <a class="navbar-brand" href="#">
               <button  type="button"  class="btn btn-primary btn-lg text-white fw-bold " data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn_login">

                Acceder
              </button>
            </a>
           
          
            <div class="dropdown user-logged-options">
              <button class="btn btn-lg btn-primary text-white fw-bold dropdown-toggle m-0" id="welcome_user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                ¡Hola! user
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item mt-3 h5" href="./tusMascotas.html">Tus mascotas</a></li>
                <li><a class="dropdown-item mt-3 h5" href="#">Configuracion</a></li>
                <li><a class="dropdown-item mt-3 h5" href="#" data-bs-toggle="modal" data-bs-target="#confirmLogOut">Salir</a></li>
              </ul>
            </div>


          </div>
        </nav>

        <nav id="second_bar" class="navbar generic-transition-1 basic-shadow navbar-expand-lg navbar-light bg-orange-alpha pt-0 pb-0">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 h6">
                <li class="nav-item pb-0 pt-0">
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="#"
                    >Búsqueda por ubicación</a
                  >
                </li>
                <li class="nav-item pb-0 pt-0">
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="adopcion.html"
                    >Dar en adopción</a
                  >
                </li>
                <li class="nav-item pb-0 pt-0">
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="#"
                    >¿Quiénes Somos?</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>

        
`;

export function loadHeader() {
  
  const headerPlace = document.getElementById("mainHeader");
  const user = localStorage.currentUser;
  headerPlace.innerHTML = HEADER;

  const loginBtn = document.getElementById('btn_login');
  const welcome = document.getElementById('welcome_user');
  const secondBar = document.getElementById('second_bar');


  if (user != 0 && user != undefined) {
    
    loginBtn.style.visibility = "hidden";
    loginBtn.style.width = 0;
    const formData = new FormData();
    formData.append("correo",user);
    fetch('endpointshowuser.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.resultado[0] != undefined)
          {
            welcome.innerHTML = `¡Hola ${data.resultado[0].nombre}!`;
            localStorage.currentUser = data.resultado[0].idUsuario;
          }
    });
  }
  else
  {
    
    welcome.style.visibility = "hidden";
    welcome.style.width = 0;
    
  }

  var lastScrollTop = 0;

  window.addEventListener("scroll", (e) =>{
    
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop) 
    {
    secondBar.style.opacity=0;  
    secondBar.classList.add('uninteractable');
   } else if (st < lastScrollTop) {
     secondBar.style.opacity=1; 
     secondBar.classList.remove('uninteractable');

   } 
   lastScrollTop = st <= 0 ? 0 : st; 
  });
}

export const ALERTA = `

  <div class="modal fade" id="alertModal6" tabindex="-1" style="z-index:99999999999999999" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <h5 class="modal-title text-center" id="mensaje_alerta">Agregado!</h5>
                </div>
                
                
              </div>
            </div>
          </div>
`;

export const ALERTA_GATO = `
  <div class="modal fade" id="modal_gat" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background: transparent; border: none;">
        <div class="modal-body p-0">
          <div class="image-logo-container position-relative">
            <div class="image">
              <img src="resources/cabexa.png" class="avatar">
              <img src="resources/ojos.png" id="ojos" class="ojos ojos1">
              <img src="resources/ojos2.png" id="ojos2" class="ojos ojos2">
            </div>
           
          </div>
           <h3 class="text-center" style="color:aliceblue;">Cargando..</h3>
        </div>
      </div>
    </div>
  </div>
`;


export const CONTACTA = `
 <div class="modal fade"  id="modal_conta" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background: transparent; border: none;">
        <div class="modal-body p-0">
          <div class="container-sm rounded-m my-3 py-2 pt-3" style=" background-color: rgb(253 236 220);">
            <div class="container my-1 px-2">
              <div class="container my-4" >
                <div class="px-3">
                  <h3 id="nombreMas" style=" font-size: 1.6rem;">NOMBRE</h3>
                </div>
                <div class="card h-25  p-4 m-3 shadow-sm">
                  <h3 style=" font-size: 1.4rem;">Descripción:</h3>
                  <h3 style=" font-size: 1rem;" id="descMas"></h3>
                  <hr>
                  <h3 style=" font-size: 1.4rem;">Información del dueño:</h3>
                  <h3 style=" font-size: 1rem;" id="nombreUsr"></h3>
                  <h3 style=" font-size: 1rem;" id="corrUsr"></h3>
                </div>
                <div class="row mt-4">
                  <div class="col-3"></div>
                  <div class="col-6">
                    <button class=" btn btn-primary w-100 text-center" style="color:aliceblue;">Contactar</button>
                  </div>
                  <div class="col-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>                
  </div>

`;