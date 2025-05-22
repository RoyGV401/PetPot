import {loadHeader, ALERTA,ELIMINA} from "./header.js";
import { onMainLoad, changeTo,cargarColor, cargarMascotas,enviarAlerta, cargarMultimedia, crearTargetaMascota, crearTargetaPersonalidad} from "../main.js";

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
    document.getElementById("main_div_busqueda").innerHTML = "";
         const row = document.createElement("div");
            row.className = "row g-4"; // gap between cards
             document.getElementById("main_div_busqueda").appendChild(row); //checar

    for(const m of mascotas.resultado){

    
        await crearTargetaMascota(document.getElementById("main_div_busqueda"),m,await cargarColor(m.idMascota),await crearTargetaPersonalidad(m));
        console.log("for");
        let button = document.createElement("button");
        button.className = "btn btn-danger";
        button.style = "color: aliceblue;"
        button.style = "width: 100%"
        button.innerText = "Adoptado";
     
        button.id = "btnAdoptado" + m.idMascota;

        let cont = document.getElementById("contents");
        cont.id += m.idMascota;
        
        
        cont.appendChild(button);

        if(m.adoptado=='T')
        button.disabled = true;

        
       button.onclick = function(){
          const modal1Element = document.getElementById('modal_elimina');
          const modal1 = new bootstrap.Modal(modal1Element);
          modal1.show();

                  let confirmar = document.getElementById("btn_confirmacion");
        confirmar.id += m.idMascota;


        confirmar.onclick = async function(){
          
          let formData = new FormData();
          formData.append('idMascota',m.idMascota);
          formData.append('bandera','T');
          
          const response = await  fetch('adoptado.php', {
              method: 'POST',
              body: formData
            })
            const data = await response.json();
            if(data.success){
             
              
              await enviarAlerta("¡Felicidades!")
             
              location.reload();
              
            }else{
              enviarAlerta("Error en guardado")
            }
             
        }
        }


      }
    
    
}

