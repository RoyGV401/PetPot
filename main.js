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

function changeTo(path)
{
  location.href = `${path}.html`;
}

window.onload = function() {

  //Logo returns to landing page
  document.getElementById('main_logo').onclick = function(){
    location.href = `index.html`;
  };
}



window.onload = function listar_perros(){
  let dmain;
  let mascotas;
  if(document.location.href.includes("perros.html")){
    dmain = document.getElementById("main_div_perros");

    mascotas= [
      {name: "Dogi", raza: "Mestizo", Tamano: "Grande", personalidad: "Tranquilo", img: "prueba1.png",sexo:"Macho",color:"Cafe", edad:"5 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
      {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png",sexo:"Hembra", color:"Blanco", edad:"3 años"},
  
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
  }
  

  let i =1;
  mascotas.forEach(mascota => {
    
    let cuadro = document.createElement("div");
    cuadro.id = "div_perro";
    cuadro.innerHTML = `
    <img src = "${mascota.img}">
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

