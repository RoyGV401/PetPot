
window.addEventListener('load', function () {
    const range = this.document.getElementById('range');
    let searchRange = 6;
    range.value = 6;
    const currentRange = this.document.getElementById('currentRange');
    range.addEventListener('input', ()=>{
        updateSearch();
        searchRange = range.value != 0 ? range.value : 1;
        currentRange.innerHTML = searchRange + "km"
    });

    const btnPerros = this.document.getElementById('btnPerros');
    const btnGatos = this.document.getElementById('btnGatos');
    const btnOtros = this.document.getElementById('btnOtros');
    const searchResults = this.document.getElementById('searchResults');

    btnPerros.addEventListener('click', ()=>{
        updateSearch();
        const act = btnPerros.getAttribute('isActive');
        if (act == "true")
        {
            btnPerros.classList.remove('btn-primary');
            btnPerros.classList.add('btn-secondary');
            btnPerros.setAttribute('isActive', 'false');
        }
        else
        {
            btnPerros.classList.add('btn-primary');
            btnPerros.classList.remove('btn-secondary');
            btnPerros.setAttribute('isActive', 'true');
        }
    });
    btnGatos.addEventListener('click', ()=>{
        updateSearch();
        const act = btnGatos.getAttribute('isActive');
        if (act == "true")
        {
            btnGatos.classList.remove('btn-primary');
            btnGatos.classList.add('btn-secondary');
            btnGatos.setAttribute('isActive', 'false');
        }
        else
        {
            btnGatos.classList.add('btn-primary');
            btnGatos.classList.remove('btn-secondary');
            btnGatos.setAttribute('isActive', 'true');
        }
    });
    btnOtros.addEventListener('click', ()=>{
        updateSearch();
        const act = btnOtros.getAttribute('isActive');
        if (act == "true")
        {
            btnOtros.classList.remove('btn-primary');
            btnOtros.classList.add('btn-secondary');
            btnOtros.setAttribute('isActive', 'false');
        }
        else
        {
            btnOtros.classList.add('btn-primary');
            btnOtros.classList.remove('btn-secondary');
            btnOtros.setAttribute('isActive', 'true');
        }
    });

    async function updateSearch()
    {
        const response = await fetch('endpointshowpets.php', {
            method: 'POST',
        });
        searchResults.innerHTML = '';
        const petsTo = await response.json();
        const result = petsTo.resultado.filter(s=>s.adoptado!='T');
        const toShow = result;
        
       

        for (const c of toShow) 
        {
            console.log(JSON.stringify(c))
            const imagenes = await cargarMultimedia(c.idMascota, false);
            const col = document.createElement("div");
            const rawDistance = await getProximity(c);
            const distance = rawDistance.toFixed(1);
            if (Math.round(distance) > searchRange) return;
            col.className = "col-sm-12 col-md-4 mt-3 col-lg-4"; // adjust based on screen size
            col.innerHTML = `
              <div id=card${c.idMascota} class= "card h-100 max-height-1 w-100 p-4 shadow-sm"></div>
            `;
            searchResults.appendChild(col);
            
            let sexoM;
            let tamM;
            
            if(c.Sexo_idSexo==1){
              sexoM="Macho";}
            else{
              sexoM="Hembra";}
            
            switch (c.Tamanio_idTamanio) 
            {
                case '1':  tamM ="Grande"; break;
                case '2':  tamM ="Mediano"; break;
                case '3':  tamM= "Pequeño"; break;
                default: break;
            }

            let personalityString = await getPersonalityString(c);
            console.log(personalityString)
            getProximity(c)
            const card = document.getElementById("card"+c.idMascota);
            card.innerHTML = 
            ` 
              <img src="${imagenes[0].documento}" class="card-img-top img-fluid rounded imgPetSelect" id="${c.idMascota}"  alt="${c.nombre}"></img>
              <div class="card-body d-flex flex-column">
              <h5 class="card-title text-center h3 fw-bold">${c.nombre}</h5>
              <hr>
              <div class="mb-3">
              <h6 class="fw-bold">Personalidad:</h6>
                ${personalityString}
              </div>  
              <p class="mb-1"><strong>Sexo:</strong> ${sexoM}</p>
              <p class="mb-1"><strong>Tamaño:</strong> ${tamM}</p>
          
              <p class="mb-3"><strong>Edad:</strong> ${c.fecha_nacimiento}</p>
              <div class="mt-auto">
              <p class="fw-semibold text-muted"><strong>Cercanía:</strong> ${distance} km</p>
              </div>
              </div>
            `;
          }
    }

    updateSearch();

});

async function cargarMultimedia(id,esUsuario){
    let formData = new FormData();
    if(esUsuario)
      formData.append("idUsuario",id);
    else
      formData.append("idMascota",id);

   const response = await fetch('endpointMultimedia.php', {
      method: 'POST',
      body: formData
    })
      const data =await response.json();
      return data.resultado;
}


 async function getPersonalityString(m) {
    let personalidades = await cargarPersonalidad(m.idMascota)
    var personalityString="";
      personalidades.forEach(p => {
        personalityString += `
        <p class="h6"> <i class="bi bi-award"></i> ${p.descripcion}</p>
        `
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