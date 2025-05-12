import {loadHeader, ALERTA} from "./header.js";
import { onMainLoad, changeTo,cargarColor, cargarMascotas, cargarMultimedia, crearTargetaMascota, crearTargetaPersonalidad} from "../main.js";

var mascotas;

window.onload = function(){

    onMainLoad();
    onLoadThis();
   
    document.getElementById("extra_elements").innerHTML+= ALERTA;

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
        crearTargetaMascota(document.getElementById("main_div_busqueda"),m,await cargarColor(m.idMascota),await crearTargetaPersonalidad(m));
    });
    
    
}

