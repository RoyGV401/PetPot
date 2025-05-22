import { crearTargetaMascota, enviarAlerta, cargarColor, cargarRaza, obtenerUserByPet, calcularEdad, cargarMultimedia,cargarBotonesHeader, abrirV } from "../main.js";
import {loadHeader, ALERTA,ALERTA_GATO, CONTACTA, MAIL} from "./header.js";
import { cargarbtn } from "./configuracion.js";

window.addEventListener('load', async function () {
    if(location.href.includes("busqueda.html")){
         document.getElementById("extra_elements").innerHTML+= ALERTA;
    document.getElementById("extra_elements").innerHTML += ALERTA_GATO;
        document.getElementById("extra_elements").innerHTML += MAIL;
    document.getElementById("extra_elements").innerHTML += CONTACTA;
    await loadHeader();
    await cargarBotonesHeader();
    await cargarbtn();


    const range = this.document.getElementById('range');
    let searchRange = 6;
    range.value = 6;
    const currentRange = this.document.getElementById('currentRange');
    range.addEventListener('change', async ()=>{
       await updateSearch();
        searchRange = range.value != 0 ? range.value : 1;
        currentRange.innerHTML = searchRange + "km"
    });
    const dmain = this.document.getElementById("mainCuerpo");
const modal1Element = document.getElementById('modal_gat');
    const modal1 = new bootstrap.Modal(modal1Element);
   
    
    async function updateSearch()
    {
        
        // Dentro de tu función:
allMarkers.forEach(m => m.setMap(null)); // Quitar todos los markers del mapa
allMarkers = []; // Limpiar el array
        const response = await fetch('endpointshowpets.php', {
            method: 'POST',
        });
        dmain.innerHTML = '';
        const petsTo = await response.json();
        const result = petsTo.resultado.filter(s=>s.adoptado!='T');
        const toShow = result;
       const row = document.createElement("div");
        row.className = "row g-4"; // gap between cards
        dmain.appendChild(row);

        toShow.forEach(async c => {
            console.log(JSON.stringify(c))
            const rawDistance = await getProximity(c);
            const distance = rawDistance.toFixed(1);
            



if (!(Math.round(distance) > searchRange)) {
    let personalityString = await getPersonalityString(c,true);
    let personalityString2 = await getPersonalityString(c,false);
    console.log(personalityString)
    let color = await cargarColor(c.idMascota);
    await crearTargetaMascota(dmain,c,color,personalityString2);
    let image = await cargarMultimedia(c.idMascota,false);

    let ubis = await cargarUbicacion(c.idMascota);
    let es = await cargarRaza(c.idMascota,true);
    let myLatLng1 = {lat: Number(ubis.latitud), lng: Number(ubis.longitud)}
    let img;
    switch(es.Especie_idEspecie){
        case '1': img = './resources/marker3.png'; break;
        case '2': img = './resources/marker_gato.png'; break;
        case '3': img = './resources/marker_turt.png'; break;
    }

    const marker = new google.maps.Marker({
        map,
        title: "Ubicación de la mascota",
        position: myLatLng1,
        icon: {
            url: img,
            scaledSize: new google.maps.Size(48.1, 68.25),
            anchor: new google.maps.Point(25, 50),
            origin: new google.maps.Point(0, 0),
        }
    });
    
    const infowindow = new google.maps.InfoWindow({
        content: `
            <div class="marker-menu" style="background-color: #f23b0d">
             <img src="${image[0].documento}" style="max-width:12rem" id="${c.idMascota}" alt="${c.nombre}">
          <div class="card-body d-flex flex-column" id="card${c.idMascota}">
          <h5 class="card-title text-center h3 fw-bold text-center" style="color: aliceblue">${c.nombre}</h5>
          <h6 class="card-title text-center h5 fw-bold text-center" style="color: aliceblue">${es.nombre}</h6>
          <hr>
            <div class="m-2 p-3" style="background-color:rgb(242 166 90); border-radius: 5%">
            <h6 class="fw-bold" style="color:aliceblue">Personalidad:</h6>
              ${personalityString}
            </div>  
          <h6 style="color:aliceblue"><strong>Color:</strong> ${color.nombre}</h6>
            <h6 style="color:aliceblue"><strong>Edad:</strong> ${calcularEdad(c)}</h6>
            <button id="si${c.idMascota}"style="width: 100%; background-color: rgb(242 166 90); color: aliceblue;" class="btn">Contactar dueño</button>

            </div>
        `,
        maxWidth: "3rem",

    });

infowindow.addListener('domready', () => {
    const button = document.getElementById("si"+c.idMascota);
    button.addEventListener('click', async () => {
        await abrirV(c, await obtenerUserByPet(c.idMascota));
    });
});
    marker.addListener("click", async function () {
         if (currentInfoWindow) {
        currentInfoWindow.close(); // Cerrar el InfoWindow anterior
    }
    currentInfoWindow = infowindow; // Guardar el nuevo como actual
    infowindow.open(map, marker); 
    });

    allMarkers.push(marker); // <-- Guardar el marker globalmente
}

    });

          

    }


    
    try{
         modal1.show();
        updateSearch();
            
 initMap()
    }finally{
    setTimeout(() => modal1.hide(), 1000); 
    }
    }
     
});

let allMarkers = []; // Global
let currentInfoWindow = null;

var map;

 async function getPersonalityString(m,esMapa) {
    let personalidades = await cargarPersonalidad(m.idMascota)
    var personalityString="";
      personalidades.forEach(p => {
        if(esMapa)
        personalityString += `
        <p class="h6" style="color:aliceblue"> <i class="bi bi-award"></i> ${p.descripcion}</p>
        `;
        else
        personalityString += `
        <p class="h6" style="color:black"> <i class="bi bi-award"></i> ${p.descripcion}</p>
        `;        
      });
      return personalityString;

}

async function cargarPersonalidad(id){

    let formData = new FormData();
    formData.append("idMascota",id);
    const response = await fetch('endpointPersonalidad.php', {
      method: 'POST',
      body: formData
    })
     const data =await response.json();
   console.log(data);
      return data.resultado;
}

export async function getProximity(pet) {
    const petLocation = await cargarUbicacion(pet.idMascota);
    const petLat = petLocation.latitud;
    const petLon = petLocation.longitud;

    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (posicion) => {
                    const coordenadas = posicion.coords;
                    const userLat = coordenadas.latitude;
                    const userLon = coordenadas.longitude;
                    const distance = getDistanceFromLatLonInKm(userLat, userLon, petLat, petLon);
                    resolve(distance);
                },
                (error) => {
                    console.error("ERROR:", error);
                    resolve("Desconocida"); 
                }
            );
        });
    } else {
        return "Desconocida";
    }
}


async function cargarUbicacion(idm){
    let formData1 = new FormData();
        formData1.append("idMascota",idm);
        const response1 = await fetch('endpointUbicacion.php', {
          method: 'POST',
          body: formData1
        })
         const data1 =await response1.json();
        return  data1.resultado[0];
}

async function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
//FUENTE: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


function initMap() {
    const opciones = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            exito,
            error,
            opciones
        );
    } else {
        enviarAlerta("No se pudo obtener la localización");
        location.href = "index.html";

    }
}

function exito(posicion) {
    const coordenadas = posicion.coords;
    
        map = new google.maps.Map(document.getElementById("map1"), {
        center: { lat: coordenadas.latitude, lng: coordenadas.longitude },
        zoom: 12,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,

    });

   
    let markers = [];
    const myLatLng = { lat: coordenadas.latitude, lng: coordenadas.longitude };

    markers.push(
        new google.maps.Marker({
            map,
            title: "Mi ubicación",
            position: myLatLng,
            icon: {
            url: './resources/markador_user.png',
            scaledSize: new google.maps.Size(48.1, 68.25),
            anchor: new google.maps.Point(25, 50),
            origin: new google.maps.Point(0, 0),
          }
        })
    );
    
}

async function error(err) {
  await enviarAlerta("No se pudo obtener la ubicación");
  location.href = "index.html";
}

// Hacer la función initMap disponible globalmente
window.initMap = initMap;


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

export async function buscaUsuario(){
    let formData = new FormData();
    //console.log(localStorage.currentUser);
    formData.append('idUsuario', localStorage.currentUser);
    const response = await  fetch('endpointshowuser.php', {
        method: 'POST',
        body: formData
      })
   
      const data = await response.json();
       
      return data.resultado[0];
        
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