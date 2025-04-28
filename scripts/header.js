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
                <li><a class="dropdown-item mt-3 h5" href="#">Tus mascotas</a></li>
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
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="#"
                    >Soy rescatista</a
                  >
                </li>
                <li class="nav-item pb-0 pt-0">
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="#"
                    >Busco adoptar</a
                  >
                </li>
                <li class="nav-item pb-0 pt-0">
                  <a class="nav-link fw-normal hov-txt-white-to-brown pb-0 pt-0" href="#"
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
        if (data.resultado[0].idUsuario != undefined)
          {
            welcome.innerHTML = `¡Hola ${data.resultado[0].nombre}!`;
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
