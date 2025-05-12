
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
        const result = petsTo.resultado;
        const toShow = result;
        for (const c of toShow) 
        {
            const imagenes = await cargarMultimedia(c.idMascota, false);
            searchResults.innerHTML += `
              <div class="carousel-item active">
                <div class="row g-0 align-items-center">
                  <div class="col-md-6">
                    <img
                      class="img-fluid w-100 h-100 object-fit-cover"
                      style="max-height: 400px"
                      alt="Imagen de ${c.nombre}"
                      src="${imagenes[0].documento ?? ''}" />
                  </div>
                  <div class="col-md-6 bg-obish-gray text-white p-4 d-flex flex-column justify-content-center" style="min-height: 400px">
                    <h2 class="fw-bold h2">¡Hola! soy <span class="text-warning">${c.nombre}</span></h2>
                    <p class="h5 py-2">${c.descripcion}</p>
                    <a href="#" class="btn btn-primary btn-lg text-white fw-bolder align-self-start">Adóptame</a>
                  </div>
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

async function crearTarjetaMascota(dmain,m,color,personalityString){
  
    const col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 mt-3 col-lg-4"; // adjust based on screen size

    col.innerHTML = `
      <div id=card${m.idMascota} class= "card h-100 max-height-1 w-100 p-4 shadow-sm"></div>
    `;
    dmain.appendChild(col);

    const card = document.getElementById("card"+m.idMascota);
   
    

    let sexoM;
    let imagenes = await cargarMultimedia(m.idMascota,false);
    let tamM;
    
     if(m.Sexo_idSexo==1){
      sexoM="Macho";}
    else{
      sexoM="Hembra";}
    
      switch (m.Tamanio_idTamanio) {
    case '1':  tamM ="Grande"; break;
    case '2':  tamM ="Mediano"; break;
    case '3':  tamM= "Pequeño"; break;
    default: break;
   }

    card.innerHTML = `
      <img src="${imagenes[0].documento}" class="card-img-top img-fluid rounded imgPetSelect" id="${m.idMascota}"  alt="${m.nombre}"></img>
      <div class="card-body d-flex flex-column">
      <h5 class="card-title text-center h3 fw-bold">${m.nombre}</h5>
      <hr>
      <div class="mb-3">
      <h6 class="fw-bold">Personalidad:</h6>
        ${personalityString}
      </div>  
      <p class="mb-1"><strong>Sexo:</strong> ${sexoM}</p>
      <p class="mb-1"><strong>Tamaño:</strong> ${tamM}</p>
      <p class="mb-1"><strong>Color:</strong> ${color.nombre}</p>
  
      <p class="mb-3"><strong>Edad:</strong> ${m.fecha_nacimiento}</p>
      <div class="mt-auto">
      <p class="fw-semibold text-muted"><strong>Cercanía:</strong> [Aquí puedes agregar distancia o zona]</p>
      </div>
      </div>
      `;
}