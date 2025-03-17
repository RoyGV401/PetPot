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
  let dmain = document.getElementById("main_div");
  let perros= [
    {name: "Dogi", raza: "Mestizo", Tamano: "Grande", personalidad: "Tranquilo", img: "prueba1.png"},
    {name: "El loco matias", raza: "Golden", Tamano: "Grande", personalidad: "Jugueton", img: "prueba2.png"},
  ];

  let cuadro = document.createElement("div");
  cuadro.id = "div_perro";

  cuadro.innerHTML = `
    <img src = "${perros[1].img}">
    <h1>${perros[1].name}</h1>
    <hr>
  `;
  
  dmain.appendChild(cuadro);
}