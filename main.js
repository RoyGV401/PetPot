import { DOGS, CATS, OTHERS, PETS } from "./pet_list.js";
import { createPetSelect } from "./pet_selected.js";

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
      alert();
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
  document.getElementById("div_login").style.visibility = "hidden";
  document.getElementById("btn_login").onclick = function ()
  {
    abrir_login();
  };
  document.getElementById("btn_log").onclick = function () {
    inicia_sesion();
  };
  document.getElementById('main_logo').onclick = function () {
    location.href = `index.html`;
  };

  const whyAdoptBtn = document.getElementById('whyAdopt')
  iniButtons();
  if (whyAdoptBtn != undefined)
  {
    whyAdoptBtn.onclick = function () {
      changeTo('https://www.purina.es/encuentra-mascota/nuevo-perro-en-casa/adopcion/por-que-adoptar-un-perro');
     }
  }
  abrir_login();
}

/*window.onresize = function(){

  anchoVentana = window.innerWidth;
  if(anchoVentana<=677){
    listar_mascotas();
  }
 
No era el problema

 };*/ 


function listar_mascotas(){
  let dmain;
  let mascotas;
  if(document.location.href.includes("perros.html")){
    dmain = document.getElementById("main_div_perros");
    
    mascotas = DOGS; 

  }else if(document.location.href.includes("gatos.html")){
    dmain = document.getElementById("main_div_gatos");

    mascotas= CATS;

  }else{
    dmain = document.getElementById("main_div_otros");
    mascotas= OTHERS;
  }
  if (dmain == undefined) return;

  let i =1;
  mascotas.forEach(mascota => {
    
    let cuadro = document.createElement("div");
    cuadro.id = "div_perro";
    cuadro.innerHTML = `
    <img src = "${mascota.img}" id="${mascota.id}" class="imgPetSelect">
    <h1>${mascota.name}</h1>
    <hr>
      <div class="perso"><h2>Personalidad</h2>
      <li>${mascota.personalidad[0]}</li>
      ${mascota.personalidad[1] ? `<li>${mascota.personalidad[1]}</li>` : ""}
      ${mascota.personalidad[2] ? `<li>${mascota.personalidad[2]}</li>` : ""}
      </div>
    <div class="flexer"> <h2>Sexo: </h2><h6>${mascota.sexo}</h6></div>
    <div class="flexer"><h2>Tamaño: </h2><h6>${mascota.Tamano}</h6></div>
    <div class="flexer"><h2>Color: </h2><h6>${mascota.color}</h6></div>
    <div class="flexer"><h2>Edad: </h2><h6>${mascota.edad}</h6></div>
    <br>
    <div class="flexer"><h2>Cercanía: </h2></div>
  `;


    dmain.appendChild(cuadro);

    i++;
  });

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
          const body = document.getElementsByTagName('body')[0];
          window.doReturnNormally = false;
          body.innerHTML = petInfo;

          
        }
       
      }
    }
  }
  catch(ex)
  {
    alert(ex);
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

function abrir_login(){
  document.getElementById("div_login").style.visibility = "visible";
  document.getElementById("blur").className = "blur";
   
}

function inicia_sesion(){
  const correo = document.getElementById("input_correo").value;
  const contra = document.getElementById("input_contra").value;

  if(user.correo == correo && user.password == contra)
    location.reload();
  
    
}