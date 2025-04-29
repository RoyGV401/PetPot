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

var persos = [];

window.onload = function(){
    onload();
}

function onload(){
    loadHeader();
    cargarCropper();
    cargarPersonalidades();

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