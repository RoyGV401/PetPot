import {loadHeader} from "./header.js";

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

window.onload = function(){
    onload();
}

function onload(){
    loadHeader();
    cargarCropper();
    cargarPersonalidades();
    cargarEspecies();
    document.getElementById("div_raza").hidden = true;

    cargarRazas();
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchValue = document.getElementById('searchInput').value;
        console.log('Valor buscado:', searchValue);
        buscarRazas(petSelected,searchValue);
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
                case 'perro': petSelected = "perro"; btn_esp.innerText = "Perro"; buscarRazas(especie); break;
                case 'gato': petSelected = "gato"; btn_esp.innerText = "Gato"; buscarRazas(especie); break;
                case 'otro': petSelected = "otro";btn_esp.innerText = "Otro"; buscarRazas(especie); break;
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
        persos.push(p);
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