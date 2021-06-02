'use strict'
//NODOS
const nodoEntrada     = document.querySelector("#entradaTarea");
const btnAdd          = document.querySelector("#btnAdd");

let lista_asignadas   = document.querySelector("#asignadas");
let lista_completas   = document.querySelector("#completadas");

let lista_tareas = {
    lista_asignadas: [],
    lista_completas: []
};

// PREGUNTAR LOCAL STORAGE

let tareas_almacenadas = JSON.parse(localStorage.getItem("tareas"));
    console.log (tareas_almacenadas);
    
if (tareas_almacenadas) {
    lista_tareas = tareas_almacenadas;

    for ( let i = 0; i<lista_tareas.lista_asignadas.length; i++ ){

        pintaTarea (lista_tareas.lista_asignadas[i],"asignadas");
    }
    for ( let i = 0; i<lista_tareas.lista_completas.length; i++ ){

        pintaTarea (lista_tareas.lista_completas [i],"completadas");
    }
    
}
       


function pintaTarea ( tarea , dondePintar){

   
       
    //CREAR ELEMENTO
    if (tarea !== ""){ 
        
        //CREAR DIV CON VARIABLE TAREA
        let elemento    = document.createElement ('div');       
        let nodoSpan    = document.createElement ('span');
        let texto       = document.createTextNode (tarea); 
        nodoSpan.appendChild (texto);
        elemento.appendChild (nodoSpan);
        elemento.classList.add ('tarea'); 

        //CREAR DIV BOTONES
        let nodoBotones = document.createElement('div');
        let btnCheck    = document.createElement ('i');
        let btnTrash    = document.createElement ('i');
        
        nodoBotones.appendChild (btnCheck);
        nodoBotones.appendChild (btnTrash);
        elemento.appendChild (nodoBotones);

        btnCheck.classList.add ('fas', 'fa-check', 'btnCheck');
        btnTrash.classList.add ('far', 'fa-trash-alt', 'btnTrash');
        
        
        //PINTAR ELEMENTO EN POR HACER Y DEJAR INPUT VACÍO
        if( dondePintar=="asignadas" ){
            
            lista_asignadas.appendChild (elemento);

        }else if(dondePintar=="completadas"){

            lista_completas.appendChild( elemento );
            btnCheck.classList.add ('check');
            btnTrash.classList.add ('check');
            nodoSpan.classList.add ('check');
        }

        nodoEntrada.value = "";
        
        
    
        guardarLS ();

        // BORRAR ELEMENTO DE CADA LISTA
        btnTrash.addEventListener("click", function() {                
            
            if (elemento.parentNode == lista_asignadas) {
            lista_asignadas.removeChild(elemento);
            deleteArray (lista_tareas.lista_asignadas, tarea);
                console.log (lista_tareas)
            eliminarLS_asignadas ();
            }
            else {
                if (elemento.parentNode == lista_completas) {
                lista_completas.removeChild (elemento);
                deleteArray (lista_tareas.lista_completas, tarea);
                console.log (lista_tareas)
                eliminarLS_completas ();
                }
            }
        });

        // PINTAR EN COMPLETADAS Y BORRAR DE POR HACER
        btnCheck.addEventListener("click", function() { 
            
            if (elemento.parentNode == lista_asignadas) {    
                lista_asignadas.removeChild (elemento);
                lista_completas.appendChild (elemento);
                btnCheck.classList.add ('check');
                btnTrash.classList.add ('check');
                nodoSpan.classList.add ('check');
                
                lista_tareas.lista_completas.push (tarea);
                deleteArray (lista_tareas.lista_asignadas, tarea);
                console.log (lista_tareas);
                guardarLS ();                 
            }
            else {
                if (elemento.parentNode == lista_completas) {                   
                lista_completas.removeChild (elemento);
                lista_asignadas.appendChild (elemento);
                btnCheck.classList.remove ('check');
                btnTrash.classList.remove ('check');
                nodoSpan.classList.remove ('check');

                deleteArray (lista_tareas.lista_completas, tarea);
                lista_tareas.lista_asignadas.push (tarea);
                console.log (lista_tareas) 
                
                guardarLS ()       
                }    
            }                       
        })            
    }    
};
btnAdd.addEventListener ("click", ()=>{
     //COGER VALOR DE INPUT
        let tarea  = nodoEntrada.value;
        lista_tareas.lista_asignadas.push (tarea);
        pintaTarea(tarea,"asignadas")
    }
 );

//AÑADIR TAREAS A ARRAY PARA LOCAL STORAGE
function deleteArray (array, item) {
    let t = array.indexOf (item);
    console.log (t);

    if ( t !== -1) {
        array.splice ( t, 1);
    }
}

//FUNCIONES DE GESTIÓN DEL LOCAL STORAGE
function guardarLS () {
    let json_lista = JSON.stringify(lista_tareas)
    localStorage.setItem ("tareas",json_lista)
    console.log (lista_tareas)
};

function eliminarLS_asignadas () {
    let json_lista_asignadas = JSON.stringify(lista_asignadas)
    localStorage.removeItem ("tareas",json_lista_asignadas)
    console.log (lista_tareas)
}
function eliminarLS_completas () {
    let json_lista_completas = JSON.stringify(lista_completas)
    localStorage.removeItem ("tareas",json_lista_completas)
    console.log (lista_tareas)
}
