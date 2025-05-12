import {loadHeader, ALERTA,ELIMINA} from "./header.js";
import { onMainLoad, changeTo,cargarColor, cargarMascotas, cargarMultimedia, crearTargetaMascota, crearTargetaPersonalidad} from "../main.js";

var mascotas;

window.onload = function(){

    onMainLoad();
    onLoadThis();
   
    document.getElementById("extra_elements").innerHTML+= ALERTA;
    document.getElementById("extra_elements").innerHTML+= ELIMINA;
    
    

       document.getElementById('main_logo').onclick = function () {
      location.href = `index.html`;
    };
  
    try
    {
      document.getElementById("btn_log").onclick = function () {
        inicia_sesion(true);
      };
    } catch{}
}

async function onLoadThis(){
    loadHeader();
    mascotas = await cargarMascotas(localStorage.currentUser,true);
    
         const row = document.createElement("div");
            row.className = "row g-4"; // gap between cards
             document.getElementById("main_div_busqueda").appendChild(row); //checar

    mascotas.resultado.forEach(async m => {
        await crearTargetaMascota(document.getElementById("main_div_busqueda"),m,await cargarColor(m.idMascota),await crearTargetaPersonalidad(m));
        let button = document.createElement("button");
        button.className = "btn btn-danger";
        button.style = "color: aliceblue;"
        button.style = "width: 100%"
        button.innerText = "Adoptado";
        button.id = "btnAdoptado" + m.idMascota;
        document.getElementById("contents").appendChild(button);

        let confirmar = document.getElementById("btn_confirmacion");
        confirmar.id += m.idMascota;

        button.onclick = function(){
          const modal1Element = document.getElementById('modal_elimina');
          const modal1 = new bootstrap.Modal(modal1Element);
          modal1.show();
        }

        confirmar.onclick = function(){
          alert(m.nombre);
        }
      });
    
    
}

