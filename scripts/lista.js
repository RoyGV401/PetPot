import { cargarMascotas, generarTexto, crearTargetaMascota, cargarColor , crearTargetaPersonalidad, cargarRaza, cargarBotonesHeader,cargarExtras,cargarFuncionBarra, cargarPersonalidad, inicia_sesion} from "../main.js";
import { ALERTA,ALERTA_GATO,MAIL,CONTACTA, loadHeader } from "./header.js";
import { personalidades } from "./adopcion.js";


var tex;
var mascotas = [];
window.onload = async function(){
    document.getElementById("extra_elements").innerHTML+= ALERTA;
    document.getElementById("extra_elements").innerHTML += ALERTA_GATO;
    document.getElementById("extra_elements").innerHTML += MAIL;
    document.getElementById("extra_elements").innerHTML += CONTACTA;
    cargarFuncionBarra2();
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
    mascotas = await cargarMascotas();
    
        document.getElementById("macho").onclick = async function(){
         await cargarMascos(document.getElementById("busqueda").value);
        }
        document.getElementById("hembra").onclick = async function(){
         await cargarMascos(document.getElementById("busqueda").value);
        }
        document.getElementById("pequeno").onclick = async function(){
         await cargarMascos(document.getElementById("busqueda").value);
        }
        document.getElementById("mediano").onclick = async function(){
         await cargarMascos(document.getElementById("busqueda").value);
        }
        document.getElementById("grande").onclick = async function(){
         await cargarMascos(document.getElementById("busqueda").value);
        }
        

    await cargarMascos();
    await cargarP();

     document.getElementById("fechaSeleccionada").value = m.fecha_nacimiento;  
        let images = await cargarMultimedia(idMascota,false);
     
        document.getElementById("imagePreview").src =  images[0].documento;
          imagePreview.style.display = 'block';
          foto = images[0].documento;
       
                  document.getElementById('main_logo').onclick = function () {
         
          location.href = `./index.html`;
        };
      
        try
        {
          document.getElementById("btn_log").onclick = function () {
            inicia_sesion(true);
          };
        } catch{}
}

function cargarFuncionBarra2(){
      const barra_busqueda = document.getElementById("busqueda");
      try
      {
        barra_busqueda.addEventListener("input", async () => {
            cargarMascos(barra_busqueda.value);
        });
      }
      catch{};
}

async function cargarMascos(palabra=null){
   
    
    let dmain = document.getElementById("mainCuerpo");
    dmain.innerHTML = `
       
                     
                     
                  
    `;
    
    const urlParams = new URLSearchParams(window.location.search);
    const idEspecie = urlParams.get('id');
    const titles = document.getElementById("titles");
    const imagen = document.getElementById("img_logo_section");
    switch(idEspecie){
        case '1': titles.innerHTML = "Perros"; imagen.src = "./resources/perros_blanco.png"; break;
        case '2': titles.innerHTML = "Gatos"; imagen.src = "./resources/cat_logo_white.png"; break;
        case '3': titles.innerHTML = "Otros"; imagen.src = "./resources/turtle_logo_white.png"; break;


    }

    let r;

    mascotas.forEach(async m => {
        r = await cargarRaza(m.idMascota, true);
        
        if(r.Especie_idEspecie!=idEspecie)
            return
        tex = await generarTexto(m);
        var ppp = []
        if(document.querySelector('input[name="ppp"]:checked')!=null)
         document.querySelectorAll('input[name="ppp"]:checked').forEach(e=>{
            ppp.push(e.id);
        })

        
        if(palabra==""||palabra==undefined||tex.trim().toLowerCase().includes(palabra.trim().toLowerCase())){

            var sexo = document.querySelector('input[name="sexo"]:checked');
            var tamano = document.querySelector('input[name="tamano"]:checked');
            var persona = document.querySelector('input[name="persos"]:checked');
            const pirso = await cargarPersonalidad(m.idMascota);
            
            var b = true;
            
            if(ppp.length>0){
                b=false;
            ppp.forEach(p => {
                pirso.forEach(p2 => {
                    if(p==p2.descripcion.replaceAll("\r",""))
                    {
                        b=true;
                        return;
                    }
                });
            });
        }
            
            if(sexo==null){
               sexo ={'id':null}
            }
            if(tamano==null){
               tamano = {'id':null}
            }
            if(persona==null){
               persona = {'id':null}
            }
               switch (sexo.id){
                  case 'macho': sexo.id = 1;break;
                  case 'hembra' : sexo.id = 2;break;
               }
               switch (tamano.id){
                  case 'grande': tamano.id = 1 ;break;
                  case 'mediano': tamano.id = 2;break;
                  case 'pequeno': tamano.id = 3; break;
               }
               
            if(sexo.id==m.Sexo_idSexo&&tamano.id==m.Tamanio_idTamanio||sexo.id==null && tamano.id==null|| sexo.id==m.Sexo_idSexo && tamano.id == null || tamano.id== m.Tamanio_idTamanio && sexo.id == null){
            if(b==true)
              personalidades.some(async (p,index) => {
                  if(index==persona.id||persona.id==null){
                     let color = await cargarColor(m.idMascota);
                     await crearTargetaMascota(dmain,m,color,await crearTargetaPersonalidad(m));
                     return true;
                  }
                     return false;
               });
            }

              

               




        }
        
    });
}

async function cargarP() {
    personalidades.forEach(p => {
        const safeId = p;
        const div = document.createElement("div");
        div.className = "form-check";
       
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "form-check-input";
        input.name = "ppp";
        input.id = safeId;
        input.onclick=function(){
            cargarMascos(document.getElementById("busqueda").value);
        };

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlfor = safeId;
        label.textContent = p;

        div.appendChild(input);
        div.appendChild(label)
        document.getElementById("boxPerso").appendChild(div);
       

     

        // Asignar el evento justo después de crearlo
        
    });
}
