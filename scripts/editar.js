import {loadHeader, ALERTA, ALERTA_GATO} from "./header.js";
import { LOGIN_FORM } from "./login.js";
import { cargarBotonesHeader,
     cargarExtras, 
     cargarFuncionCookis,
      cargarColor,
      cargarMascotas,
       cargarMultimedia,
        cargarPersonalidad,
         changeTo 
         ,enviarAlerta
         ,cargarRaza} from "../main.js";



const personalidades = [
    "Activo",
    "Adaptable",
    "Ágil",
    "Alegre",
    "Alerta",
    "Amable",
    "Amigable",
    "Ansioso",
    "Atrevido",
    "Brillante",
    "Cariñoso",
    "Dedicado",
    "Digno",
    "Dulce",
    "Elegante",
    "Encantador",
    "Energético",
    "Enérgico",
    "Feliz",
    "Fiel",
    "Independiente",
    "Inquisitivo",
    "Inteligente",
    "Juguetón",
    "Leal",
    "Meloso",
    "Optimista",
    "Orientado a la familia",
    "Reservado",
    "Seguro",
    "Sociable",
    "Valiente",
    "Versátil"
];

const colores= [
"Negro"
,"Marrón"
,"Blanco"
,"Crema"
,"Amarillo"
,"Atigrado"
,"Gris"
,"Chocolate"
,"Dorado"
,"Merlé"
,"Naranja"
,"Calicó"
,"Carey (Tortie)"
,"Bicolor"
,"Siames (Punto de color)"
,"Chinchilla"
];

const  especies = [
    "perro",
    "gato",
    "otro"
];
 
//importante
var persos = [];

var raza_perro = {};
var raza_gato = {};
var raza_otro = {};
var raza_buscada = [];

//importante
var petSelected;

//importante
let raza = null;

//importante
let color = null;

let foto = null;

var lat = null;
var lng = null;
var idm;
var usuario;
var ubis;

window.onload = async function(){
   
    cargarExtras();
    cargarFuncionCookis();
    cargarBotonesHeader();
    cargarPersonalidades();
    cargarEspecies();
    
    onLoadThis();
    document.getElementById("extra_elements").innerHTML+= ALERTA;
    document.getElementById("extra_elements").innerHTML+= ALERTA_GATO;
    const urlParams = new URLSearchParams(window.location.search);
    const idMascota = urlParams.get('id');

    ubis = await cargarUbicacion(idMascota);
    var m = await cargarMascotas(idMascota,false);
    m = m.resultado[0];
   initMap(ubis.latitud, ubis.longitud);
    let formData = new FormData();
        formData.append("idMascota",idMascota);
        const response = await fetch('endpointPersonalidad.php', {
          method: 'POST',
          body: formData
        })
         const data =await response.json();
      
          let pp= data.resultado;
    
    let color1 = await cargarColor(idMascota);
    idm = m.idMascota;
    
    document.getElementById("inputNombre").value = m.nombre;
    document.getElementById("inputDescripcion").value = m.descripcion;

    let r = await cargarRaza(idMascota, true);

    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.className = 'btn btn-info me-2 mb-2';
    newBtn.textContent = r.nombre;
    newBtn.id = 'elimi btn_'+r.idRaza; 
    document.getElementById("btns_razas").appendChild(newBtn);
    document.getElementById("div_raza").hidden = true;
    raza = r.idRaza;

    document.getElementById(newBtn.id).addEventListener('click', function (){
       
        document.getElementById("btn_lista_especie").disabled = false;
        document.getElementById("btns_razas").removeChild(newBtn);
        raza = null;
    });

    switch(r.Especie_idEspecie){
            case "1": petSelected="perro"; document.getElementById("btn_lista_especie").innerText = "Perro"; break;
            case "2": petSelected="gato"; document.getElementById("btn_lista_especie").innerText = "Gato"; break;
            case "3": petSelected="otro"; document.getElementById("btn_lista_especie").innerText = "Otro"; document.getElementById("esPeligro").hidden = false; break;
          }
    document.getElementById("btn_lista_especie").disabled = true;      
          
       
    color1.nombre = color1.nombre.replaceAll("\r","");
   
    color = color1.nombre;
    document.getElementById("btn_lista").innerText = color1.nombre;
    
    if(m.Sexo_idSexo==1){
        document.getElementById("macho").checked = true;
    }else{
        document.getElementById("hembra").checked = true;
    }
   
    switch (m.Tamanio_idTamanio) {
        case "1": document.getElementById("pequeno").checked = true; break;
        case "2": document.getElementById("mediano").checked = true; break;
        case "3": document.getElementById("grande").checked = true; break;
    }
    var pp2 = [];
    console.log(pp);


    for (let index = 0; index < pp.length; index++) {
        try{
             pp2.push(pp[index]);
        }catch{

        } 
    }
     
    let btns = document.getElementById("btns_personalidades");
    personalidades.forEach(p => {
        pp2.forEach(p2 => {
         
             if(p==p2.descripcion.replaceAll("\r","")){
                
                const safeId = 'perso btn_' + p.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        
                const newBtn = document.createElement('button');
                newBtn.type = 'button';
                newBtn.className = 'btn btn-info me-2 mb-2';
                newBtn.textContent = p2.descripcion.replaceAll("\r","");
                newBtn.id = 'elimi btn_'+p2.descripcion.replaceAll("\r",""); 
                persos.push({"id":personalidades.indexOf(p2.descripcion.replaceAll("\r",""))+1,"nombre":p2.descripcion.replaceAll("\r","")});
                // Añadimos el botón al contenedor
                btns.appendChild(newBtn);

                document.getElementById(safeId).hidden = true;

                document.getElementById(newBtn.id).addEventListener('click', function (){
                    
                    persos.splice(persos.findIndex(s=> s.nombre == p2.descripcion.replaceAll("\r","")),1);
                    document.getElementById(safeId).hidden = false;
                    btns.removeChild(newBtn);
                 });
             }else{
              //  console.log(p2.descripcion.replaceAll("\r","")+"YYYY"+p);
             }
        
        });
       
    });

     
    document.getElementById("fechaSeleccionada").value = m.fecha_nacimiento;  
    let images = await cargarMultimedia(idMascota,false);
 
    document.getElementById("imagePreview").src =  images[0].documento;
      imagePreview.style.display = 'block';
      foto = images[0].documento;
   
            
}

function onLoadThis(){
    loadHeader();
    cargarCropper();
    

     document.getElementById("esPeligro").hidden = true;
    document.getElementById("div_raza").hidden = true;

    cargarRazas();
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchValue = document.getElementById('searchInput').value;
        buscarRazas(petSelected,searchValue);
      });
     
    cargarColores();

       // Inicializar el datepicker

    $(document).ready(function(){
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            language: 'es',
            autoclose: true,
            todayHighlight: true
        });
        
        // Activar datepicker al hacer clic en el botón del calendario
        $('#botonCalendario').click(function(){
            $('#fechaSeleccionada').datepicker('show');
        });
    });



    document.getElementById("btn_enviar").onclick = async function(){
        if(localStorage.currentUser==0){
            
            enviarAlerta("Debes iniciar sesión");
            return;
        }else{
           // usuario = await buscaUsuario();
           usuario = localStorage.currentUser;

        }

        const nombre = document.getElementById("inputNombre").value;
        const descripcion = document.getElementById("inputDescripcion").value;
        let esp;
        let sexo;
        switch(petSelected){
            case "perro": esp=1; break;
            case "gato": esp=2; break;
            case "otro": esp=3; break;
            default: esp=4; break;
        }
        switch(document.getElementById("macho").checked){
            case true: sexo="1"; break;
            default: sexo=null; break;
        }
        if(sexo==null)
        switch(document.getElementById("hembra").checked){
            case true: sexo="2"; break;
            default: sexo=null; break;
        }
        
        var tamanio = obtenerTamanio()+1;
        let fecha = document.getElementById("fechaSeleccionada").value;
     
        console.log(persos);
        
        if(nombre!=""&&descripcion!=""&&esp!=4&&raza!=null&&sexo!=null&&tamanio>=1&&persos[0]!=null&&fecha!=""&&foto!=null&&color!=null)
        {
           
            let formData = new FormData();
            formData.append("nombre",nombre);
            formData.append("descripcion",descripcion);
            formData.append("fecha_nacimiento",fecha);
            formData.append("Sexo_idSexo",sexo);
            formData.append("Tamanio_idTamanio",tamanio);
            formData.append("Raza_idRaza",raza);
            if(document.getElementById("esPeligro").checked)
                formData.append("esPeligrosa", true);
            formData.append("Color_idColor",colores.indexOf(color)+1);
            formData.append("Usuario_idUsuario",usuario);

            if(lat!=ubis.latitud&&lng!=ubis.longitud){
                await borrarUbicacion(idm);
            }

            let resultado = await guardarUbicacion();
                if(resultado.sucess==false){
                    console.log(resultado);
                    return
                }else{
                    formData.append("Ubicacion_idUbicaciones",resultado.resultado[0].idUbicaciones);
                }

                formData.append("idMascota",idm);
            fetch('endpointSavePet.php', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(data => {
                let formData = new FormData();
                persos.forEach((p,index) => {
                    console.log(p.id);
                    formData.append(`Personalidad_idPersonalidad[]`+index+1,p.id)
                });

                
                    formData.append("idMascota", idm);
                    formData.append("update",true);
                    console.log(formData.get("idMascota"));
                    fetch('endpointSaveitempersonalidad.php', {
                    method: 'POST',
                    body: formData
                    })
                    .then(response => response.json())
                    .then(async data2 => {
                        console.log(data2);
                        await guardarFoto(idm);
                        
                            
                        await enviarAlerta("¡Cambios guardados!");
                        location.href = "./tusMascotas.html";
                    });
               
            });
        }else{
            enviarAlerta("Debes ingresar todos sus datos.");
            console.log("N:"+nombre+"D:"+descripcion+"E:"+esp+"R:"+raza+"S:"+sexo+"T:"+tamanio+"P:"+persos.length+"F:"+fecha+" ")
            
        }
    }
}
//Leer el documento y ver que cosas son importantes para un DBA en un solo doc pDF EN TEAMS A LAS TARDAR entre el 19 y el 23

function obtenerTamanio() {
    // Obtener todos los radio buttons con el nombre "tamano"
    const radios = document.querySelectorAll('input[name="tamano"]');
    
    // Buscar cuál está seleccionado
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return i; // Devuelve el índice del radio seleccionado
        }
    }
    
    return -1; // Devuelve -1 si ninguno está seleccionado
}


// Función para obtener la fecha seleccionada
function obtenerFecha() {
    
    const fecha = $('#fechaSeleccionada').val();
  //  alert(fecha);y
    return fecha;
}

function cargarColores(){
    
    let lista = document.getElementById("lista_color");
    
   // Primero construimos todo el HTML de una vez
    let htmlItems = '';
    colores.forEach(p => {
    // Sanitizamos el ID reemplazando espacios y caracteres especiales
    const safeId = 'color btn_' + p.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    
    htmlItems += `
        <li><button type="button" class="dropdown-item" id="${safeId}">${p}</button></li>
    `;
    });

    // Insertamos todo el HTML de una sola vez
    lista.innerHTML = htmlItems;

    // Ahora añadimos los event listeners
    colores.forEach(p => {
    const safeId = 'color btn_' + p.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    
    document.getElementById(safeId).addEventListener('click', function() {
        color = p;
        document.getElementById("btn_lista").innerText = p;
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const dropdownList = document.getElementById('lista_color');
        const items = dropdownList.querySelectorAll('.dropdown-item');
        
        if (items.length > 5) {
            dropdownList.classList.add('scrollable-dropdown');
        }
    });

}

function accionRaza(){
    
    raza_buscada.forEach(r => {
        document.getElementById("btn_"+r.idRaza).addEventListener("click", function(){
            const newBtn = document.createElement('button');
            newBtn.type = 'button';
            newBtn.className = 'btn btn-info me-2 mb-2';
            newBtn.textContent = r.nombre;
            newBtn.id = 'elimi btn_'+r.idRaza; 
            document.getElementById("btns_razas").appendChild(newBtn);
            document.getElementById("div_raza").hidden = true;
            raza = r.idRaza;
            document.getElementById("btn_lista_especie").disabled = true;

            document.getElementById(newBtn.id).addEventListener('click', function (){
                document.getElementById("div_raza").hidden = false;
                document.getElementById("btn_lista_especie").disabled = false;
                document.getElementById("btns_razas").removeChild(newBtn);
                raza = null;
            });
        }); 
    });
}

function cargarRazas(){
    let btn_esp = document.getElementById("btn_lista_especie");
    especies.forEach(especie => {
        document.getElementById("btn_"+especie).addEventListener("click",function evento(){ 
            document.getElementById("div_raza").hidden = false;
            switch (especie) {
                case 'perro': petSelected = "perro"; document.getElementById("esPeligro").hidden = true; document.getElementById("esPeligrosa").checked = null; btn_esp.innerText = "Perro"; buscarRazas(especie); break;
                case 'gato': petSelected = "gato"; document.getElementById("esPeligro").hidden = true; document.getElementById("esPeligrosa").checked = null; btn_esp.innerText = "Gato"; buscarRazas(especie); break;
                case 'otro': petSelected = "otro"; document.getElementById("esPeligro").hidden = false; btn_esp.innerText = "Otro"; buscarRazas(especie); break;
                default:   break;
            }
        });
    });
}

function cargarEspecies(){
    especies.forEach(especie => {
        let id = especies.indexOf(especie)+1;
            let formData = new FormData();
            formData.append("idEspecie", id);
            fetch('endpointRazas.php', {
                method: 'POST',
                body: formData
              })
                .then(response => response.json())
                .then(data => {
                    switch (id) {
                        case 1: raza_perro = data.resultado; break;
                        case 2: raza_gato = data.resultado;  break;
                        case 3: raza_otro = data.resultado;  break;
                        default: break;
                    }
                   
                });
        
    });
}

function cargarCropper(){
    let cropper;
        const imagePreview = document.getElementById('imagePreview');
        const fileInput = document.getElementById('formFile');
        const previewText = document.getElementById('previewText');
        const cropperControls = document.getElementById('cropperControls');
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    previewText.style.display = 'none';
                    
                    // Inicializar Cropper.js
                    if (cropper) {
                        cropper.destroy();
                    }
                    
                    cropper = new Cropper(imagePreview, {
                        aspectRatio: 453 / 313,
                        viewMode: 1,
                        autoCropArea: 0.8, // Área inicial del 80%
                        responsive: true,
                        movable: true,
                        scalable: true,
                        zoomable: true,
                        rotatable: false,
                        cropBoxMovable: true,
                        cropBoxResizable: true,
                        toggleDragModeOnDblclick: false,
                        ready() {
                            cropperControls.style.display = 'block';
                        }
                    });
                }
                
                reader.readAsDataURL(file);
            }
        });
        
        document.getElementById('cropButton').addEventListener('click', function() {
            if (cropper) {
                // Obtener el canvas recortado con el tamaño exacto
                const canvas = cropper.getCroppedCanvas({
                    width: 453,
                    height: 313,
                    minWidth: 453,
                    minHeight: 313,
                    maxWidth: 453,
                    maxHeight: 313,
                    fillColor: '#fff'
                });
                
                // Convertir a blob y actualizar el input file
                canvas.toBlob((blob) => {
                    const file = new File([blob], 'imagen_recortada.png', { type: 'image/png' });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInput.files = dataTransfer.files;

                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => {
                        foto = reader.result;
                    //console.log(reader.result); // "data:text/plain;base64,SG9sYSwgbXVuZG8h"
                    };

                    
                    // Mostrar resultado final
                    imagePreview.src = canvas.toDataURL();
                    cropper.destroy();
                    cropperControls.style.display = 'none';
                    
                    // Mostrar mensaje de éxito
                    previewText.textContent = 'Imagen recortada lista (453×313 px)';
                    previewText.className = 'text-success d-block p-2';
                    previewText.style.display = 'block';
                }, 'image/png');
            }
        });
        
        document.getElementById('cancelCrop').addEventListener('click', function() {
            if (cropper) {
                cropper.destroy();
                imagePreview.style.display = 'none';
                fileInput.value = '';
                cropperControls.style.display = 'none';
                previewText.textContent = 'Seleccione una imagen para recortar';
                previewText.className = 'text-muted d-block p-2';
                previewText.style.display = 'block';
            }
        });
}


function buscarRazas(especie, texto = null){
    
        raza_buscada = [];
        if(especie=="perro"){
            if(texto!=null){
                raza_perro.forEach(r => {
                    if(r.nombre.toLowerCase().includes(texto.toLowerCase()))
                        raza_buscada.push(r);
                });
            }else
                raza_perro.forEach(r => {
                    raza_buscada.push(r);
        });    
            
        }
        else if(especie=="gato"){
            if(texto!=null){
                raza_gato.forEach(r => {
                    if(r.nombre.toLowerCase().includes(texto.toLowerCase()))
                        raza_buscada.push(r);
                });
            }else
                raza_gato.forEach(r => {
                    raza_buscada.push(r);
                });  
        }
        else{
            if(texto!=null){
                raza_otro.forEach(r => {
                    if(r.nombre.toLowerCase().includes(texto.toLowerCase()))
                        raza_buscada.push(r);
                });
            }else
                raza_otro.forEach(r => {
                    raza_buscada.push(r);
        });  
            
        }
        document.getElementById("lista_raza").innerHTML = ``;
        raza_buscada.forEach(r => {
            document.getElementById("lista_raza").innerHTML += `
                <button id="btn_${r.idRaza}" type="button" class="btn btn-outline-primary btn-list-item">${r.nombre}</button>
            `; 
        });
        accionRaza();
}


function cargarPersonalidades(){
    let lista = document.getElementById("lista_personalidad");
    let btns = document.getElementById("btns_personalidades");
    
   // Primero construimos todo el HTML de una vez
    let htmlItems = '';
    personalidades.forEach(p => {
    // Sanitizamos el ID reemplazando espacios y caracteres especiales
    const safeId = 'perso btn_' + p.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    
    htmlItems += `
        <li><button type="button" class="dropdown-item" id="${safeId}">${p}</button></li>
    `;
    });

    // Insertamos todo el HTML de una sola vez
    lista.innerHTML = htmlItems;

    // Ahora añadimos los event listeners
    personalidades.forEach(p => {
    const safeId = 'perso btn_' + p.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    
    document.getElementById(safeId).addEventListener('click', function() {
        // Creamos el nuevo botón
        
        const newBtn = document.createElement('button');
        newBtn.type = 'button';
        newBtn.className = 'btn btn-info me-2 mb-2';
        newBtn.textContent = p;
        newBtn.id = 'elimi btn_'+p; 
        persos.push({"id":personalidades.indexOf(p)+1,"nombre":p});
        // Añadimos el botón al contenedor
        btns.appendChild(newBtn);

        document.getElementById(safeId).hidden = true;

        document.getElementById(newBtn.id).addEventListener('click', function (){
            persos.splice(persos.indexOf(p),1);
            document.getElementById(safeId) .hidden = false;
            btns.removeChild(newBtn);
            comprobarLargo(lista);
        });
        comprobarLargo(lista);
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const dropdownList = document.getElementById('lista_personalidad');
        const items = dropdownList.querySelectorAll('.dropdown-item');
        
        if (items.length > 5) {
            dropdownList.classList.add('scrollable-dropdown');
        }
    });

}

function comprobarLargo(lista){
    if(persos.length==3){
        btn_lista.disabled = true;
        lista.hidden = true;
    }else{
        btn_lista.disabled = false;
        lista.hidden = false;
    }
}



function initMap(lat, lon) {
    exito(lat,lon)
}

function exito(late, log) {
    
   const myLatLng1 = { lat: Number(late), lng: Number(log) }; 
    
    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng1,
        zoom: 12,


  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,

    });

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    const myLatLng = { lat: lat, lng: log};
    lat= late
    lng= log
    markers.push(
        new google.maps.Marker({
            map,
            title: "Mi ubicación",
            position: myLatLng1,
        })
    );
    
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) return;

        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry) {
                console.log("El lugar no tiene geometría");
                return;
            }

            markers.push(
                new google.maps.Marker({
                    map,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
              lat = place.geometry.location.lat();
            
                lng = place.geometry.location.lng();
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    map.addListener("click", (e) => {
        markers.forEach((marker) => marker.setMap(null));
        markers = [];
        
        markers.push(
            new google.maps.Marker({
                position: e.latLng,
                map: map
            })
        );
        lat = e.latLng.lat();
        lng = e.latLng.lng();
    });
}



// Hacer la función initMap disponible globalmente



async function guardarFoto(id){
    let formData = new FormData();
    formData.append("Mascota_idMascota",id);
    formData.append("documento",foto);

      const response = await fetch('endpointSavemultimedia.php', {
            method: 'POST',
            body: formData
            })
            const data = await response.json();
            console.log(data);
            return data;
}

async function buscaUsuario(){
    let formData = new FormData();
    //console.log(localStorage.currentUser);
    formData.append('correo', localStorage.currentUser);
    const response = await  fetch('endpointshowuser.php', {
        method: 'POST',
        body: formData
      })
   
      const data = await response.json();
       
      return data.resultado[0].idUsuario;
        
}

async function  guardarUbicacion() {
    let formData = new FormData();
    formData.append("latitud",lat);
    formData.append("longitud",lng);

    const response = await fetch('endpointsavelocation.php', {
        method: 'POST',
        body: formData
        })
    const data = await response.json();
       
    return data;
}

async function  borrarUbicacion(idm) {
    let formData = new FormData();
    formData.append("idMascota",idm);
    formData.append("idubicaciones",ubis.idubicaciones)

    const response = await fetch('endpointDeleteUbicacion.php', {
        method: 'POST',
        body: formData
        })
    const data = await response.json();
       
    return data;
}

export async function cargarUbicacion(idm){
    let formData1 = new FormData();
        formData1.append("idMascota",idm);
        const response1 = await fetch('endpointUbicacion.php', {
          method: 'POST',
          body: formData1
        })
         const data1 =await response1.json();
        return  data1.resultado[0];
    
    
    console.log(ubis);
}