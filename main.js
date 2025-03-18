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

function changeTo(path) {
  location.href = `${path}`;
}

//IMPORANTE: Ahora todo lo que se quiera hacer al cargar se debe colocar en la funcion onLoad, dado que JS solo reconoce el último window.onload, asi que
//colocar varios practicamente no hace nada, siendo que solo se ejecutará el último.
window.onload = function () {
  onLoad();
}


function onLoad() {
  listar_mascotas();
  document.getElementById('main_logo').onclick = function () {
    location.href = `index.html`;
  };
  const whyAdoptBtn = document.getElementById('whyAdopt')
  if (whyAdoptBtn != undefined)
  {
    whyAdoptBtn.onclick = function () {
      changeTo('https://www.purina.es/encuentra-mascota/nuevo-perro-en-casa/adopcion/por-que-adoptar-un-perro');
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


function listar_mascotas(){
  let dmain;
  let mascotas;
  if(document.location.href.includes("perros.html")){
    dmain = document.getElementById("main_div_perros");
    
    mascotas= [
      {name: "Dogi", raza: "Mestizo", Tamano: "Grande", personalidad: "Tranquilo", img: "resources/prueba1.png",sexo:"Macho",color:"Cafe", edad:"5 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "Filis el perro feliz", raza: "Golden", Tamano: "Mediano", personalidad: "Enojado", img: "resources/prueba3.png",sexo:"Macho", color:"Blanco", edad:"3 años"},
      {name: "Jotchua", raza: "Golden", Tamano: "Chico", personalidad: "Triste", img: "resources/prueba4.png",sexo:"Macho", color:"Dorado", edad:"2 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
  
    ];

  }else if(document.location.href.includes("gatos.html")){
    dmain = document.getElementById("main_div_gatos");

    mascotas= [
      {name: "Ñango", raza: "Naranja", Tamano: "Mediano", personalidad: "Enojado", img: "resources/cat_orange_angry.gif",sexo:"Hembra",color:"Naranja", edad:"9 años"},
      {name: "Flabio", raza: "Naranja", Tamano: "Chico", personalidad: "Loco", img: "resources/crunchy_cat_2.jpg",sexo:"Macho",color:"Blanco", edad:"9 años"},
      {name: "FlipFloppa", raza: "Rojo", Tamano: "Grande", personalidad: "Alegre", img: "resources/big-floppa-mad-floppa.gif",sexo:"Macho", color:"Naranja", edad:"1 años"},
    ];

  }else{
    dmain = document.getElementById("main_div_otros");
    mascotas= [
      {name: "Remi", raza: "Tortuga", Tamano: "Chico", personalidad: "Tranquilo", img: "resources/turti.png",sexo:"Macho",color:"Verde", edad:"5 años"},
    ];
  }
  if (dmain == undefined) return;

  let i =1;
  mascotas.forEach(mascota => {
    
    let cuadro = document.createElement("div");
    cuadro.id = "div_perro";
    cuadro.innerHTML = `
    <img src = "${mascota.img}" onclick="changeTo('pet_selected.html')">
    <h1>${mascota.name}</h1>
    <hr>
      <div class="perso"><h2>Personalidad</h2>
      <li>${mascota.personalidad}</li>
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
