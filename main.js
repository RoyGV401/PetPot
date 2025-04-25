import { LOGIN_FORM } from "./scripts/login.js";
import { DOGS, CATS, OTHERS, PETS } from "./scripts/pet_list.js";
import { createPetSelect } from "./scripts/pet_selected.js";
import { USERS } from "./scripts/users.js";
import {loadHeader} from "./scripts/header.js";





const user ={
  correo:"luis@gmail.com",
  password: "Luis1234."
}

function changeTo(path) {
  location.href = `${path}`;
}

//IMPORANTE: Ahora todo lo que se quiera hacer al cargar se debe colocar en la funcion onLoad, dado que JS solo reconoce el último window.onload, asi que
//colocar varios practicamente no hace nada, siendo que solo se ejecutará el último.
window.onload = function () {

  onLoad();
}

window.doReturnNormally = true;

let radios = document.querySelectorAll("[type='radio']");
radios.forEach((x) => {
  x.dataset.val = x.checked; // guardamos el estado del radio button dentro del elemento
  x.addEventListener(
    "click",
    (e) => {
      let element = e.target;
      if (element.dataset.val == "false") {
        element.dataset.val = "true";
        element.checked = true;
      } else {
        element.dataset.val = "false";
        element.checked = false;
      }
    },
    true
  );
});





function onLoad() {
  listar_mascotas();
  changeBodyToPet();
  checkForReturn();
  loadHeader();
  let map;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map_canvas"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  initMap();

  try
  {
    const currentUser = localStorage.currentUser;
    if (currentUser != undefined)
    {
      const user = USERS.find(u => u.id == currentUser);
      const btnAcceder = document.getElementById('welcome_user');
      btnAcceder.innerHTML = `¡Hola ${user.nombre}!`;
    }

  } catch{}
  {
    const extra = document.getElementById('extra_elements');
    if (!extra.innerHTML.includes(LOGIN_FORM))
    {
      extra.innerHTML = extra.innerHTML + `
      ${LOGIN_FORM}
    `;
    }
    
  }

  try
  {
   

  } catch (ex)
  {
    console.log(ex)
  }

  document.getElementById('main_logo').onclick = function () {
    location.href = `index.html`;
  };

  try
  {
    document.getElementById("btn_log").onclick = function () {
      inicia_sesion(true);
    };
  } catch{}

  const whyAdoptBtn = document.getElementById('whyAdopt')
  iniButtons();
  if (whyAdoptBtn != undefined)
  {
    whyAdoptBtn.onclick = function () {
      changeTo('https://www.purina.es/encuentra-mascota/nuevo-perro-en-casa/adopcion/por-que-adoptar-un-perro');
     }
  }
  //abrir_login();

  document.getElementById("btn_regis").onclick = function ()
  {
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var regexp_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    let inputNombre =document.getElementById("input_nombre");
    let inputContra = document.getElementById("input_contra");
    let inputApeP = document.getElementById("input_apellidoP");
    let inputApeM = document.getElementById("input_apellidoM");
    let inputTel = document.getElementById("input_numero");
    let inputCorreo = document.getElementById("input_correo");
    let inputCurp = document.getElementById("input_curp");
    let inputC2 = document.getElementById("input_confirm_contra");



    if(inputNombre.value!=null && inputContra!=null && inputApeP!= null && inputApeM!= null && inputTel!=null && inputCorreo!=null
   && inputC2 != null && inputCurp !=null 
    ){
      var esValido = expReg.test(inputCorreo.value);
      if(esValido==true){
        if(inputContra.value==inputC2.value){
          if(regexp_pass.test(inputContra.value)){
            const formData = new FormData();
            formData.append('nombre', inputNombre.value);
            formData.append('contrasenia', inputContra.value);
            formData.append('correo',inputCorreo.value);
            formData.append('telefono',inputTel.value);
            formData.append('apellidoP', inputApeP.value);
            formData.append('apellidoM', inputApeM.value);
            formData.append('curp', inputCurp.value);

            fetch('endpointregister.php', {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                if (data.success) {
                 
                  alert('Usuario registrado!');
                  location.reload(); // Recargar para ver los cambios
                }
              });
          }else{
            alert("La contraseña debe de ser de minimo 8 caracteres, maximo 15, un digito y un caracter especial sin espacios")
          }
        }else{
          alert("Las contraseñas no son iguales");
        }
      }else{
        alert("Ingrese un correo electronico valido");
      }
    }else{
      alert("Debe ingresar todos los datos para continuar");
    }
  };


}

/*window.onresize = function(){

  anchoVentana = window.innerWidth;
  if(anchoVentana<=677){
    listar_mascotas();
  }
 
No era el problema

 };*/ 


function listar_mascotas() {
  let dmain;
  let mascotas;
  if (document.location.href.includes("perros.html")) {
    dmain = document.getElementById("main_div_perros");
    mascotas = DOGS;
  } else if (document.location.href.includes("gatos.html")) {
    dmain = document.getElementById("main_div_gatos");
    mascotas = CATS;
  } else {
    dmain = document.getElementById("main_div_otros");
    mascotas = OTHERS;
  }
  if (!dmain) return;

  // Clear previous content

  // Create a responsive row container
  const row = document.createElement("div");
  row.className = "row g-4"; // gap between cards

  mascotas.forEach((mascota) => {
    const col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 mt-3 col-lg-4"; // adjust based on screen size

    const card = document.createElement("div");
    card.className = "card h-100 max-height-1 w-100 p-4 shadow-sm";
    const personalidades = mascota.personalidad;
    let personalityString = "";
    personalidades.forEach(k => {
      personalityString += `
       <p class="h6"> <i class="bi bi-award"></i> ${k}</p>
      `
    });


    card.innerHTML = `
      <img src="${mascota.img}" class="card-img-top img-fluid rounded imgPetSelect" id="${mascota.id}"  alt="${mascota.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center h3 fw-bold">${mascota.name}</h5>
        <hr>
        <div class="mb-3">
          <h6 class="fw-bold">Personalidad:</h6>
            ${personalityString}
        </div>
        <p class="mb-1"><strong>Sexo:</strong> ${mascota.sexo}</p>
        <p class="mb-1"><strong>Tamaño:</strong> ${mascota.Tamano}</p>
        <p class="mb-1"><strong>Color:</strong> ${mascota.color}</p>
        <p class="mb-3"><strong>Edad:</strong> ${mascota.edad}</p>
        <div class="mt-auto">
          <p class="fw-semibold text-muted"><strong>Cercanía:</strong> [Aquí puedes agregar distancia o zona]</p>
        </div>
      </div>
    `;

    col.appendChild(card);
    dmain.appendChild(col);
  });

  dmain.appendChild(row);
}


function changeBodyToPet()
{
  try
  {
    const petImages = document.getElementsByClassName('imgPetSelect');
    for (let p of petImages) {
      p.onclick = function () {
        const petId = p.id;
        let choosenPet = "";
        PETS.every(pet => {
          if (petId == pet.id)
          {
            choosenPet = pet;
            return false;
          }
          else 
          return true;
        });
        if (choosenPet != "")
        {
          const petInfo = createPetSelect(choosenPet);
          const body = document.getElementById('blur');
          window.doReturnNormally = false;
          document.getElementById('extra_elements').innerHTML = ""
          body.innerHTML = petInfo;
          onLoad();
          
        }
       
      }
    }
  }
  catch(ex)
  {
    
  }
}

function iniButtons()
{
  try
  {
      const btnCat = document.getElementById('checkCats').onclick = function (){ changeTo('gatos.html')};
      const btnDog = document.getElementById('checkDogs').onclick = function (){ changeTo('perros.html')};
      const btnOthers = document.getElementById('checkOthers').onclick = function (){ changeTo('otros.html')};
  }
  catch{}
}

function checkForReturn()
{
 
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      if (window.doReturnNormally == false)
        {  
          history.go(1);
          window.location.reload();
        }
      }

}





function inicia_sesion(isFromClick){
  const correo = document.getElementById("input_correo_log").value;
  const contra = document.getElementById("input_contra_log").value;
  const user = USERS.find(u => u.email==correo);

  const txtAlert = document.getElementById('login_warning');

  if (user != undefined)
  {
    if(user.email == correo && user.password == contra)
    {
      localStorage.currentUser=user.id;
 
      location.reload();
    }
    else
    {
      al
      txtAlert.innerHTML = "Correo o contraseña incorrectos";
      txtAlert.style.opacity=1;
    }
  }
  else 
  {
    const txtAlert = document.getElementById('login_warning');
    txtAlert.innerHTML = "Correo o contraseña incorrectos";
    txtAlert.style.opacity=1;
  }
  setTimeout(()=>{
    txtAlert.innerHTML = "";
    txtAlert.style.opacity=0;

  },2000);
}

