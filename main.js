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
  location.href = `${path}.html`;
}

//IMPORANTE: Ahora todo lo que se quiera hacer al cargar se debe colocar en la funcion onLoad, dado que JS solo reconoce el último window.onload, asi que
//colocar varios practicamente no hace nada, siendo que solo se ejecutará el último.
window.onload = function () {
  onLoad();
}


function onLoad() {
  listar_perros();
  listar_gatos();
  document.getElementById('main_logo').onclick = function () {
    location.href = `index.html`;
  };
}




function listar_gatos() {
  let dmain = document.getElementById("main_div_gatos");
  if (dmain == undefined) return 0;
  const perros = [
    { name: "Dogi", raza: "Mestizo", Tamano: "Grande", personalidad: "Tranquilo", img: "resources/prueba1.png", sexo: "Macho", color: "Cafe", edad: "5 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },

  ];

  let i = 1;
  perros.forEach(perro => {

    let cuadro = document.createElement("div");
    cuadro.id = "div_perro";
    cuadro.innerHTML = `
    <img src = "${perro.img}" onclick="takeToPet()">
    <h1>${perro.name}</h1>
    <hr>
      <div class="perso"><h2>Personalidad</h2>
      <li>${perro.personalidad}</li>
      </div>
    <div class="flexer"> <h2>Sexo: </h2><h6>${perro.sexo}</h6></div>
    <div class="flexer"><h2>Tamaño: </h2><h6>${perro.Tamano}</h6></div>
    <div class="flexer"><h2>Color: </h2><h6>${perro.color}</h6></div>
    <div class="flexer"><h2>Edad: </h2><h6>${perro.edad}</h6></div>
    <br>
    <div class="flexer"><h2>Cercanía: </h2></div>
  `;


    dmain.appendChild(cuadro);

    i++;
  });

}

function listar_perros() {
  let dmain = document.getElementById("main_div_perros");
  if (dmain == undefined) return 0;
  const perros = [
    { name: "Dogi", raza: "Mestizo", Tamano: "Grande", personalidad: "Tranquilo", img: "resources/prueba1.png", sexo: "Macho", color: "Cafe", edad: "5 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },
    { name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "resources/prueba2.png", sexo: "Hembra", color: "Blanco", edad: "3 años" },

  ];

  let i = 1;
  perros.forEach(perro => {

    let cuadro = document.createElement("div");
    cuadro.id = "div_perro";
    cuadro.innerHTML = `
    <img src = "${perro.img}" onclick="takeToPet()">
    <h1>${perro.name}</h1>
    <hr>
      <div class="perso"><h2>Personalidad</h2>
      <li>${perro.personalidad}</li>
      </div>
    <div class="flexer"> <h2>Sexo: </h2><h6>${perro.sexo}</h6></div>
    <div class="flexer"><h2>Tamaño: </h2><h6>${perro.Tamano}</h6></div>
    <div class="flexer"><h2>Color: </h2><h6>${perro.color}</h6></div>
    <div class="flexer"><h2>Edad: </h2><h6>${perro.edad}</h6></div>
    <br>
    <div class="flexer"><h2>Cercanía: </h2></div>
  `;


    dmain.appendChild(cuadro);

    i++;
  });

}


function takeToPet() {
  location.href = `pet_selected.html`;
}