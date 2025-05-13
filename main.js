import { LOGIN_FORM } from "./scripts/login.js";
import { DOGS, CATS, OTHERS, PETS } from "./scripts/pet_list.js";
import { createPetSelect } from "./scripts/pet_selected.js";
import { USERS } from "./scripts/users.js";
import {loadHeader, ALERTA,ALERTA_GATO, CONTACTA, MAIL} from "./scripts/header.js";
import {CUERPO} from "./scripts/busqueda.js";
import { cargarUbicacion } from "./scripts/editar.js";
import { getProximity } from "./scripts/busqueda_ubicacion.js";

var mascotas;


var user ={}

export function changeTo(path) {
  location.href = `${path}`;
}

//IMPORANTE: Ahora todo lo que se quiera hacer al cargar se debe colocar en la funcion onMainLoad, dado que JS solo reconoce el último window.onload, asi que
//colocar varios practicamente no hace nada, siendo que solo se ejecutará el último.
window.onload = function () {
  onMainLoad();
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



export function getCookieValue(cname) {
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
  return 0;
}


export async function onMainLoad() {

    document.getElementById("extra_elements").innerHTML+= ALERTA;
    document.getElementById("extra_elements").innerHTML += ALERTA_GATO;
        document.getElementById("extra_elements").innerHTML += MAIL;
    document.getElementById("extra_elements").innerHTML += CONTACTA;


  listar_mascotas();
  changeBodyToPet();
  checkForReturn();

  // -------------CARGAR ELEMENTOS QUE USAN FETCH-----------
  await cargarMascotas();
  cargarFuncionBarra();
 
  if(localStorage.currentUser==0||localStorage.currentUser=="null"){
    cargarFuncionCookis();
  }
 

  
    
 
  // ---------------CARGAR LOGIN EN EL HTML-----------------
  cargarExtras();

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
    
//--------------CARGAR FUNCIONALIDAD DE BOTONES----------------

  cargarBotonesHeader();

//--------------CARGAR MASCOTAS AL AZAR EN EL CARRUSEL---------------

  loadPetsToCarousel();

}

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
          onMainLoad();
          
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

export async function checkForReturn()
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
          document.cookie = "userCorreo=" + d.idUsuario + "; expires=" + new Date(Date.now() + 30*24*60*60*1000).toUTCString() + "; path=/";
        }else{
          localStorage.currentUser = d.idUsuario;
        }
        enviarAlerta("¡Bienvenido!")
        location.reload();
      });   
    });
}

export function enviar(){
  
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

export async function cargarMascotas(id=null,esUsuario=null){
    const modal1Element = document.getElementById('modal_gat');
    const modal1 = new bootstrap.Modal(modal1Element);
   
    try{
       modal1.show();
       if(id==null&&esUsuario==null){
           const response = await fetch('endpointshowpets.php', {
            method: 'POST',
        })
          const data = await response.json();
          mascotas = data.resultado;
        }else if(esUsuario==false){
            let formData = new FormData();
            formData.append("idMascota",id);
           const response = await fetch('endpointshowpets.php', {
          method: 'POST',
          body: formData
        })
          const data = await response.json();
          return data;
        }else{
          
          let formData = new FormData();
            formData.append("idUsuario",id);
           const response = await fetch('endpointshowpets.php', {
          method: 'POST',
          body: formData
        })
          const data = await response.json();
          return data;
        }      
    }catch(error){
      console.log("Error cargar mascotas",error);
    }finally{
    setTimeout(() => modal1.hide(), 470); 
    }
       
}

export async function cargarMultimedia(id,esUsuario){
        let formData = new FormData();
        if(esUsuario)
          formData.append("idUsuario",id);
        else
          formData.append("idMascota",id);

       const response = await fetch('endpointMultimedia.php', {
          method: 'POST',
          body: formData
        })
          const data =await response.json();
          return data.resultado;
}

export async function cargarPersonalidad(id){

        let formData = new FormData();
        formData.append("idMascota",id);
        const response = await fetch('endpointPersonalidad.php', {
          method: 'POST',
          body: formData
        })
         const data =await response.json();
       console.log(data);
          return data.resultado;
}

export async function cargarColor(id){
        let formData = new FormData();
        formData.append("idMascota",id);

      const response = await fetch('endpointColor.php', {
          method: 'POST',
          body: formData
        })
          const data =await response.json();
          return data.resultado[0];

}

export async function cargarRaza(id, esMascota){
    let formData = new FormData();
        if(esMascota)
          formData.append("idMascota",id);
        else
          formData.append("idEspecie",id);

       const response = await fetch('endpointRazas.php', {
          method: 'POST',
          body: formData
        })
          const data =await response.json();
     
          return data.resultado[0];
}

export function cargarFuncionBarra(){
   const cuerpoPlace = document.getElementById("mainCuerpo");

  const barra_busqueda = document.getElementById("busqueda");



  try
  {
    barra_busqueda.addEventListener("input", () => {
      if(barra_busqueda.value==""){
        cuerpoPlace.hidden = true;
      }else{
        cuerpoPlace.hidden = false;
        cuerpoPlace.innerHTML = CUERPO;
        let dmain = document.getElementById("main_div_busqueda");
        
         const row = document.createElement("div");
            row.className = "row g-4"; // gap between cards
             dmain.appendChild(row); //checar
             let mas = mascotas.filter(s=>s.adoptado!='T');
             
        mas.forEach(async m => {
          
          var tex="";
           tex+= m.nombre+m.descripcion;
           let color = await cargarColor(m.idMascota);
         
           tex += color.nombre
           
           let raza = await cargarRaza(m.idMascota,true)
       
           tex+=raza.nombre;
           
           let personalidades = await cargarPersonalidad(m.idMascota);
           personalidades.forEach(p => {
              tex+=p.descripcion;
           });
      

           switch(raza.Especie_idEspecie){
            case "1": tex+= "perros"; break;
            case "2": tex+= "gatos"; break;
            case "3":  break;

          }
          

           switch (m.Tamanio_idTamanio) {
            case '1': tex += "grande"; break;
            case '2': tex += "mediano"; break;
            case '3': tex += "pequeño"; break;
            default: break;
           }
          
           if(tex.trim().toLowerCase().includes(barra_busqueda.value.trim().toLowerCase())){
              if(m.Sexo_idSexo==1){
                tex += "macho";}
              else{
                tex += "hembra";}
              crearTargetaMascota(dmain,m,color,await crearTargetaPersonalidad(m));
             

           }
           
           
        });
      }
    });
  }
  catch{};
}

export async function cargarFuncionCookis(){
 
    const userCorreo = getCookieValue("userCorreo");
    localStorage.currentUser = userCorreo;
    
}

export async function cargarBotonesHeader(){
 
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
                 
                   document.getElementById("mensaje_alerta").innerText = "¡Usuario registrado!";
                  const modal1Element = document.getElementById('alertModal6');
                  const modal1 = new bootstrap.Modal(modal1Element);
                  modal1.show();
                  let temporizador;
                  let tiempoRestante = 2;
                  temporizador = setInterval(() => {
                      tiempoRestante--; 
                      if (tiempoRestante <= 0) {
                          clearInterval(temporizador);
                          modal1.hide();
                          location.reload();
                      }
                  }, 1000);
                         // Recargar para ver los cambios
                      }
                    });
          }else{
             document.getElementById("mensaje_alerta").innerText = "La contraseña debe de ser de minimo 8 caracteres, maximo 15, un digito y un caracter especial sin espacios";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
          }
        }else{
          document.getElementById("mensaje_alerta").innerText = "Las contraseñas no son iguales.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
        }
      }else{
        document.getElementById("mensaje_alerta").innerText = "Ingrese un correo electrónico válido."
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
      }
    }else{
      document.getElementById("mensaje_alerta").innerText = "Ingrese todos los datos para continuar.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
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
                document.getElementById("mensaje_alerta").innerText = "El token expiró.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
              }
            }else{
              document.getElementById("mensaje_alerta").innerText = "Token incorrecto.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
            }
        });
      } else {
        document.getElementById("mensaje_alerta").innerText = "Por favor complete los 6 caracteres.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
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
            document.getElementById("mensaje_alerta").innerText = "Cambios realizados con éxito.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
          }else{
            document.getElementById("mensaje_alerta").innerText = "Cambios no efectuados.";
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
          }
        });
      }else{
        document.getElementById("mensaje_alerta").innerText = "Las contraseñas no son iguales."
            const modal1Element = document.getElementById('alertModal6');
            const modal1 = new bootstrap.Modal(modal1Element);
            modal1.show();
            let temporizador;
            let tiempoRestante = 2;
            temporizador = setInterval(() => {
                tiempoRestante--; 
                if (tiempoRestante <= 0) {
                    clearInterval(temporizador);
                    modal1.hide();
                }
            }, 1000);
      }
    }

}

export async function cargarExtras(){
  const extra = document.getElementById('extra_elements');
  if (!extra.innerHTML.includes(LOGIN_FORM))
  {
    extra.innerHTML = extra.innerHTML + `
    ${LOGIN_FORM}
  `;
  }
}

export async function crearTargetaMascota(dmain,m,color,personalityString){
  
            const col = document.createElement("div");
            col.className = "col-sm-12 col-md-4 mt-3 col-lg-4"; // adjust based on screen size

            col.innerHTML = `
              <div id=cardo${m.idMascota} class= "card h-100 max-height-1 w-100 p-4 shadow-sm"></div>
            `;
            dmain.appendChild(col);

            const card = document.getElementById("cardo"+m.idMascota);
           
            

            let sexoM;
            let imagenes = await cargarMultimedia(m.idMascota,false);
            let tamM;
            
             if(m.Sexo_idSexo==1){
              sexoM="Macho";}
            else{
              sexoM="Hembra";}
            
              switch (m.Tamanio_idTamanio) {
            case '1':  tamM ="Grande"; break;
            case '2':  tamM ="Mediano"; break;
            case '3':  tamM= "Pequeño"; break;
            default: break;
           }

            card.innerHTML = `
              <img src="${imagenes[0].documento}" class="card-img-top img-fluid rounded imgPetSelect" id="${m.idMascota}"  alt="${m.nombre}"></img>
              <div class="card-body d-flex flex-column" id="card${m.idMascota}">
              <h5 class="card-title text-center h3 fw-bold">${m.nombre}</h5>
              <hr>
                <div class="mb-3">
                <h6 class="fw-bold">Personalidad:</h6>
                  ${personalityString}
                </div>  
              <p class="mb-1"><strong>Sexo:</strong> ${sexoM}</p>
              <p class="mb-1"><strong>Tamaño:</strong> ${tamM}</p>
              <p class="mb-1"><strong>Color:</strong> ${color.nombre}</p>
          
              <p class="mb-3"><strong>Edad:</strong> ${m.fecha_nacimiento}</p>
                <div class="mt-auto">
                <p id="cerca${m.idMascota}" class="fw-semibold text-muted"></p>
                </div>
              </div>
              <div class="row">
              <div class="col-3"></div>
              <div id="contents" class="col-6"></div>
              <div class="col-3"></div>
              </div>
              `;
              
             const rawDistance = await getProximity(m);
             if(rawDistance!="Desconocida"){
            const distance = rawDistance.toFixed(1);
            document.getElementById("cerca"+m.idMascota).innerHTML = `<strong>Cercanía:</strong> ${distance} Km`;
             }else{
              document.getElementById("cerca"+m.idMascota).innerHTML = ``
             }
           
               //--------------CARGAR FUNCIÓN REDIRECCIÓN PANTALLA ADOPTAR----------
              asginarAbrirVistaMascota(m);  
}

export async function crearTargetaPersonalidad(m) {
    let personalidades = await cargarPersonalidad(m.idMascota)
    var personalityString="";
      personalidades.forEach(p => {
        personalityString += `
        <p class="h6"> <i class="bi bi-award"></i> ${p.descripcion}</p>
        `
        
      });
      return personalityString;

}

export async function asginarAbrirVistaMascota(m){
  let user = await obtenerUserByPet(m.idMascota);
  document.getElementById("card"+m.idMascota).onclick=async function(){
   if(localStorage.currentUser==m.Usuario_idUsuario){
       location.href = `editarMascota.html?id=${encodeURIComponent(m.idMascota)}`;
      }
      else{
        await abrirV(m,user);
      }
        
  }
}

async function obtenerUserByPet(m) {
  const formData = new FormData();
  formData.append("idMascota",m)
  
        const response = await fetch('endpointshowuser.php', {
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        console.log(data);
        return data.resultado[0];
} 

async function obtenerUserByID(id) {
    let formData = new FormData();
    
    formData.append('idUsuario',id);
    const response = await  fetch('endpointshowuser.php', {
        method: 'POST',
        body: formData
      })
   
      const data = await response.json();
       
      return data.resultado[0];
}


export async function enviarAlerta(alerta) {
  document.getElementById("mensaje_alerta").innerText = alerta;
  const modal2Element = document.getElementById('alertModal6');
  const modal2 = new bootstrap.Modal(modal2Element);
  modal2.show();

  return new Promise((resolve) => {  
      let temporizador;
      let tiempoRestante = 2;
      temporizador = setInterval(() => {
          tiempoRestante--;
          if (tiempoRestante <= 0) {
              clearInterval(temporizador);
              modal2.hide();
      
              modal2Element.addEventListener('hidden.bs.modal', resolve, { once: true });
          }
      }, 1000);
  });
}

async function initMap(late,log,esp){

  const opciones = {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 0
    };

  
  if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(async (position) => {
               await exi(position,esp,late, log);
            },
            async (err) => {
               await error(esp, lat, lng);
            },
            opciones
        );
      } else {
          enviarAlerta("Tu navegador no soporta geolocalización");
      }

  



}

async function exi(position,esp,late,log){
  let img;
  switch(esp){
    case '1': img = 'resources/marker3.png'; break;
    case '2': img = 'resources/marker_gato.png'; break;
    case '3': img = 'resources/marker_turt.png'; break;
  }

 const myLatLng1 = { lat: Number(late), lng: Number(log) }; 
  
  const map = await new google.maps.Map(document.getElementById("map"), {
      center: myLatLng1,
      zoom: 15,


mapTypeControl: false,
scaleControl: false,
streetViewControl: false,

  });
  
  await google.maps.event.trigger(map, 'resize');
  await map.setCenter(myLatLng1); // Re-centrar después del resize
  let markers = [];
  markers.push(
      new google.maps.Marker({
          map,
          title: "Ubicación de la mascota",
          position: myLatLng1,
          icon: {
            url: img,
            scaledSize: new google.maps.Size(48.1, 68.25),
            anchor: new google.maps.Point(25, 50),
            origin: new google.maps.Point(0, 0),
          }
      })
  );

   markers.push(
      new google.maps.Marker({
          map,
          title: "Tu ubicacion",
          position: {lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)},
          icon: {
            url: 'resources/markador_user.png',
            scaledSize: new google.maps.Size(48.1, 68.25),
            anchor: new google.maps.Point(25, 50),
            origin: new google.maps.Point(0, 0),
          }
      })
  );
} 

function error(esp,late,log){
  
    let img;
  switch(esp){
    case '1': img = 'resources/marker3.png'; break;
    case '2': img = 'resources/marker_gato.png'; break;
    case '3': img = 'resources/marker_turt.png'; break;
  }

 const myLatLng1 = { lat: Number(late), lng: Number(log) }; 
  
  const map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng1,
      zoom: 15,


mapTypeControl: false,
scaleControl: false,
streetViewControl: false,

  });
  
  google.maps.event.trigger(map, 'resize');
  map.setCenter(myLatLng1); // Re-centrar después del resize
  let markers = [];
  markers.push(
      new google.maps.Marker({
          map,
          title: "Ubicación de la mascota",
          position: myLatLng1,
          icon: {
            url: img,
            scaledSize: new google.maps.Size(48.1, 68.25),
            anchor: new google.maps.Point(25, 50),
            origin: new google.maps.Point(0, 0),
          }
      })
  );

}

export async function loadPetsToCarousel() {
  if (document.location.href.includes("index.html")) {
    const response = await fetch('endpointshowpets.php', {
      method: 'POST',
    });
    const petsTo = await response.json();
    const result = petsTo.resultado;
    const toShow = [];
    const limit = result.length > 1 || 1;

    for (let j = 0; j < limit; j++) {
      const rand = Math.ceil(Math.random() * result.length);
      const cuPet = result[rand - 1];
      toShow.push(cuPet);
    }

    const carousel = document.getElementById('petCarousel');

    for (const c of toShow) {
      const imagenes = await cargarMultimedia(c.idMascota, false);
      carousel.innerHTML += `
        <div class="carousel-item active">
          <div class="row g-0 align-items-center">
            <div class="col-md-6">
              <img
                class="img-fluid w-100 h-100 object-fit-cover"
                style="max-height: 400px"
                alt="Imagen de ${c.nombre}"
                src="${imagenes[0].documento ?? ''}" />
            </div>
            <div class="col-md-6 bg-obish-gray text-white p-4 d-flex flex-column justify-content-center" style="min-height: 400px">
              <h2 class="fw-bold h2">¡Hola! soy <span class="text-warning">${c.nombre}</span></h2>
              <p class="h5 py-2">${c.descripcion}</p>
              <a href="#" class="btn btn-primary btn-lg text-white fw-bolder align-self-start">Adóptame</a>
            </div>
          </div>
        </div>
      `;
    }
  }
}

export async function abrirV(m,user) {
    let usuario = await obtenerUserByID(localStorage.currentUser);
        let usuario2 = await obtenerUserByID(m.Usuario_idUsuario);
       const modal1Element = document.getElementById('modal_conta');
        const modal1 = new bootstrap.Modal(modal1Element);
         setTimeout(()=>{ modal1.show(); },400);
  
      
        
            
              let ubis = await cargarUbicacion(m.idMascota);
            let es = await cargarRaza(m.idMascota,true);
         
              initMap(ubis.latitud, ubis.longitud,es.Especie_idEspecie);
              
              
         

      
         document.getElementById("descMas").innerText = m.descripcion;
         document.getElementById("nombreUsr").innerText = "Nombre: " + user.nombre;
         document.getElementById("corrUsr").innerText = "Correo: " +user.correo;
         document.getElementById("nombreMas").innerText =  m.nombre;
       
         
         document.getElementById("btn_mail").onclick = async function (){
          if(localStorage.currentUser==0){
            enviarAlerta("Debe iniciar sesión");
          }else if(document.getElementById("inputMensaje").value == ""){
               enviarAlerta("Ingresa un mensaje");
            }
            else{
              const modal1Element = document.getElementById('modal_gat');
              const modal1 = new bootstrap.Modal(modal1Element);
              let formData = new FormData();
              
                const modal = bootstrap.Modal.getInstance(document.getElementById('modal_mail'));
                // Cerrar el modal
                modal.hide();
              try{
                modal1.show()
                
              formData.append('email_r', usuario2.correo);
              formData.append('email', usuario.correo);
              formData.append('mascota', m.nombre);
              formData.append('usuario_r', usuario2.nombre);
              formData.append('usuario', usuario.nombre);
              formData.append('cuerpo',document.getElementById("inputMensaje").value);

              const response = await  fetch('enviar_mensaje.php', {
                  method: 'POST',
                  body: formData
                })
            
                const data = await response.json();
                 enviarAlerta("¡Correo enviado!");
                  
              }catch(e){
                console.log(e);
                enviarAlerta("Error al enviar correo");
                modal.show();
              }finally{
                setTimeout(() => modal1.hide(),470)
              }
              
            }
          }
}