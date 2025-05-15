import { cargarBotonesHeader, cargarExtras, cargarFuncionCookis, inicia_sesion, registro } from "../main.js";
import { loadHeader, ALERTA, ALERTA_GATO } from "./header.js";
import { buscaUsuario } from "./busqueda_ubicacion.js";


var user;

window.onload = function(){
    onloadThis();
}

async function onloadThis(){
    document.getElementById("extra_elements").innerHTML += ALERTA;
    await cargarInfo();
    await cargarExtras();
    await loadHeader();
    await cargarBotonesHeader();
    await cargarbtn();
    
    
}

async function cargarInfo(){
    user = (await buscaUsuario());

    let inputNombre =document.getElementById("input_nombre");
    let inputContra = document.getElementById("input_contra");
    let inputApeP = document.getElementById("input_apellidoP");
    let inputApeM = document.getElementById("input_apellidoM");
    let inputTel = document.getElementById("input_numero");
    let inputCorreo = document.getElementById("input_correo");
    let inputCurp = document.getElementById("input_curp");
    let inputC2 = document.getElementById("input_confirm_contra");

    inputNombre.value = user.nombre;
    inputApeP.value = user.apellidoP;
    inputApeM.value = user.apellidoM;
    inputTel.value = user.telefono;
    inputCorreo.value = user.correo;
    inputCurp.value = user.curp;

    document.getElementById("btn_actualiza").onclick = async function(){await registro(user.idUsuario,inputNombre,inputContra,inputApeP,inputApeM,inputTel,inputCorreo,inputCurp,inputC2)};
}

async function cargarbtn(){
    document.getElementById('main_logo').onclick = function () {         
    location.href = `./index.html`;
    };      
    
    document.getElementById("btn_log").onclick = function () {
    inicia_sesion(true);
    };

}