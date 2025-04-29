import { LOGIN_FORM } from "./scripts/login.js";
import { DOGS, CATS, OTHERS, PETS } from "./scripts/pet_list.js";
import { createPetSelect } from "./scripts/pet_selected.js";
import { USERS } from "./scripts/users.js";
import {loadHeader} from "./scripts/header.js";
import {CUERPO} from "./scripts/busqueda.js";





var user ={}

function changeTo(path) {
  location.href = `${path}`;
}

//IMPORANTE: Ahora todo lo que se quiera hacer al cargar se debe colocar en la funcion onLoad, dado que JS solo reconoce el último window.onload, asi que
//colocar varios practicamente no hace nada, siendo que solo se ejecutará el último.
window.onload = function () {
  localStorage.currentUser = 0;
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



function getCookieValue(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}


function onLoad() {
  listar_mascotas();
  changeBodyToPet();
  checkForReturn();
  const cuerpoPlace = document.getElementById("mainCuerpo");

  const barra_busqueda = document.getElementById("busqueda");
  barra_busqueda.addEventListener("input", () => {
    if(barra_busqueda.value==""){
      cuerpoPlace.hidden = true;
    }else{
      cuerpoPlace.hidden = false;
      cuerpoPlace.innerHTML = CUERPO;
      let dmain = document.getElementById("main_div_busqueda");
      var mascotas = [];
      let sexoM;
      let tamM;
      
      fetch('endpointshowpets.php', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            data.resultado.forEach(d => 
              {
                let formData = new FormData();
                formData.append("idMascota",d.idMascota);
                fetch('endpointMultimedia.php', {
                  method: 'POST',
                  body: formData
                })
                .then(response => response.json())
                .then(data2 => 
                  { 
                    var tex = d.nombre+d.descripcion;
                    if(d.Sexo_idSexo==1){
                      tex += "macho"; sexoM="Macho";}
                    else{
                      tex += "hembra"; sexoM="Hembra";}
                    switch (d.Tamanio_idTamanio) {
                      case '1': tex += "grande"; tamM ="Grande"; break;
                      case '2': tex += "mediano"; tamM ="Mediano"; break;
                      case '3': tex += "pequeño"; tamM= "Pequeño"; break;
                      default: break;
                    }
                    if(tex.trim().toLowerCase().includes(barra_busqueda.value)){
                      mascotas.push(d);
                    }

                    const row = document.createElement("div");
                    row.className = "row g-4"; // gap between cards

                    mascotas.forEach((mascota) => {
                      const col = document.createElement("div");
                      col.className = "col-sm-12 col-md-4 mt-3 col-lg-4"; // adjust based on screen size

                      const card = document.createElement("div");
                      card.className = "card h-100 max-height-1 w-100 p-4 shadow-sm";
                      
                      let formData2 = new FormData();
                      formData2.append("idMascota",mascota.idMascota);

                      fetch('endpointpersonalidad.php', {
                        method: 'POST',
                        body: formData2
                      })
                      .then(response => response.json())
                      .then(data3 => 
                        {
                          console.log(data3);
                          if(!isNaN(Date.parse(mascota.fecha_nacimiento))){
                            alert(Date.parse(mascota.fecha_nacimiento));
                            //PROBAR DESPUES
                            var hoy = new Date();
                            var edad = hoy.getFullYear() - Date.parse(mascota.fecha_nacimiento).getFullYear();
                            var m = hoy.getMonth() - cumpleanos.getMonth();

                            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                                edad--;
                            }
                          }
                          
                          fetch('endpointcolor.php', {
                            method: 'POST',
                            body: formData2
                          })
                          .then(response => response.json())
                          .then(data4 => 
                            {
                              const personalidades = data3.resultado;
                              let personalityString = "";
                              personalidades.forEach(k => {
                              personalityString += `
                              <p class="h6"> <i class="bi bi-award"></i> ${k.descripcion}</p>
                              `
                              });
                              mascota.color = data4.resultado[0].nombre;
                              card.innerHTML = `
                              <img src="${data2.resultado[0].documento}" class="card-img-top img-fluid rounded imgPetSelect" id="${mascota.idMascota}"  alt="${mascota.nombre}"></img>
                              <div class="card-body d-flex flex-column">
                              <h5 class="card-title text-center h3 fw-bold">${mascota.nombre}</h5>
                              <hr>
                              <div class="mb-3">
                              <h6 class="fw-bold">Personalidad:</h6>
                                ${personalityString}
                              </div>  
                              <p class="mb-1"><strong>Sexo:</strong> ${sexoM}</p>
                              <p class="mb-1"><strong>Tamaño:</strong> ${tamM}</p>
                              <p class="mb-1"><strong>Color:</strong> ${mascota.color}</p>
                          
                              <p class="mb-3"><strong>Edad:</strong> ${mascota.fecha_nacimiento}</p>
                              <div class="mt-auto">
                              <p class="fw-semibold text-muted"><strong>Cercanía:</strong> [Aquí puedes agregar distancia o zona]</p>
                              </div>
                              </div>
                              `;

                              col.appendChild(card);
                              dmain.appendChild(col);
                            });
                        });
                      });
                    dmain.appendChild(row);
                  });
              });
           }
        });
    }
  });


    
    const formData = new FormData();
    const userCorreo = getCookieValue("userCorreo");
    
  
      formData.append('correo', userCorreo);
      fetch('endpointshowuser.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          user = data.resultado[0];
          console.log(data);
          if (data.resultado.length > 0)
            {
              localStorage.currentUser=user.correo;
            }else{
              localStorage.currentUser = 0;
            }

            loadHeader();
  
    document.getElementById('main_logo').onclick = function () {
      location.href = `index.html`;
    };
  
    try
    {
      document.getElementById("btn_log").onclick = function () {
        inicia_sesion(true);
      };
    } catch{}

      });
    
  
 
    
 


  
  const extra = document.getElementById('extra_elements');
  if (!extra.innerHTML.includes(LOGIN_FORM))
  {
    extra.innerHTML = extra.innerHTML + `
    ${LOGIN_FORM}
  `;
  }
    


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

  const pRecuperar = document.getElementById("btn_recuperar");
  
  try{
    pRecuperar.onclick = function (){
      document.getElementById("form-recuperar").addEventListener('submit',function(e){
        e.preventDefault();
        enviar();
      })
    };
  }catch{
  }

  try
  {
    document.getElementById("input_correo").value="";
    document.getElementById("input_contra").value="";
    document.getElementById('login_warning').innerHTML=""
  } catch {}

  const inputs = document.querySelectorAll('.pincode-input');
    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
    });

    document.getElementById("btn_enviar_corroborar").onclick = function submitPincode() {
      
      
      let pincode = '';
      inputs.forEach(input => {
        pincode += input.value;
      });
      if (pincode.length === 6) {

        const formData = new FormData();
        formData.append('correo',sessionStorage.getItem("correo", inputCorreo.value));
       

        fetch('endpointshowuser.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            user = data.resultado[0];
            if(pincode==user.reset_token){
              
              const tokenExpira = new Date(user.token_expira);
              const ahora = new Date();

              if (ahora < tokenExpira) {
                document.querySelectorAll('.modal.show').forEach(modalElement => {
                  const modalInstance = bootstrap.Modal.getInstance(modalElement);
                  if (modalInstance) {
                    modalInstance.hide();
                  }
                });
                
                const modal1Element = document.getElementById('recuperarForm3');
                const modal1 = new bootstrap.Modal(modal1Element);
                modal1.show();
              }else{
                alert("El token expiró");
              }
            }else{
              alert("Token incorrecto");
            }
        });
      } else {
        alert('Por favor complete los 6 caracteres.');
      }
    }
    
    const inputCorreo = document.getElementById("input_correoR");
    document.getElementById("ver_correo").disabled = true;
   

    inputCorreo.addEventListener("input", () => {
      var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if(expReg.test(inputCorreo.value))
      {
        const formData = new FormData();
          formData.append('correo', inputCorreo.value);
          fetch('endpointshowuser.php', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              if(data.resultado.length>0){
                document.getElementById("ver_correo").disabled = false;
              }else{
                document.getElementById("ver_correo").disabled = true;
              }
                
          });
      }
      
    });

    document.getElementById("ver_correo").onclick = function (){
      sessionStorage.setItem("correo", inputCorreo.value);
    }
  

    document.getElementById("btn_enviar_new_pass").onclick = function (){
      let contraNew = document.getElementById("input_contra_new").value;
      let confirmNew = document.getElementById("input_confirm_contra_new").value;
      if(contraNew==confirmNew){

        const formData =  new FormData();
        formData.append("nombre",user.nombre);
        formData.append("correo",user.correo);
        formData.append("contrasenia",contraNew);
        formData.append("apellidoP",user.apellidoP);
        formData.append("apellidoM",user.apellidoM);
        formData.append("curp",user.curp);
        formData.append("telefono",user.telefono);
        formData.append("idUsuario",user.idUsuario);

        fetch('endpointupdateuser.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
           if(data.resultado){
            alert("Cambios realizados con exito");
          }else{
            alert("No se realizaron");
          }
        });
      }else{
        alert("Las contraseñas no son iguales");
      }
    }


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
  const recu = document.getElementById("btn-check-outlined");

  const formData = new FormData();
  formData.append('correo', correo);
  formData.append('pass', contra);

  fetch('endpointlogin.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      
      data.forEach(d => {
        if(recu.checked){
          document.cookie = "userCorreo=" + d.correo + "; expires=" + new Date(Date.now() + 30*24*60*60*1000).toUTCString() + "; path=/";
        }else{
          document.cookie = "userCorreo=" + d.correo + "; path=/";
        }
       
        location.reload();
      });   
    });
}

function enviar(){
  
  const email = document.getElementById("input_correoR").value;
  const formData = new FormData();
  formData.append('email', email);

  fetch('enviar_correo.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    
  })
  .catch(error => {
 
    console.error(error);
  });
}



