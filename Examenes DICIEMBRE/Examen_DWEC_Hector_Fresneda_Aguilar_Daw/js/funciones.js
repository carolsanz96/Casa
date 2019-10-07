/**
 * Funcion que ejecuta la peticion AJAX para recoger el JSON
 */
function ejecutarLlamadaAjax() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            var habitaciones = JSON.parse(peticion.responseText);
            guardarInformacion(habitaciones);

        }
    }
    peticion.overrideMimeType("text/plain");
    peticion.open("GET", "https://fpaniaguaformacion.github.io/habitaciones.json");
    peticion.send(null);


}
/**
 * Función que guarda la información del Json en un Array de clases Habitacion
 * @param {JSON} habitaciones Array de clases Habitacion
 */
function guardarInformacion(habitaciones) {

    var capacidadForm = document.getElementById("despNumHuespedes").value;
    var tSHForm;
    if (document.getElementById("siSh").checked) {
        tSHForm = true;
    } else {
        tSHForm = false;
    }
    var mascotasForm;
    if (document.getElementById("siMascotas").checked) {
        mascotasForm = true;
    } else {
        mascotasForm = false;
    }

    var habitacionFormulario = new Habitacion(0, capacidadForm, tSHForm, mascotasForm);

    var arrHabitaciones = new Array();
    var habitacionJson = habitaciones.hotel;


    for (i = 0; i < habitacionJson.length; i++) {
        var numero = habitacionJson[i].numero;
        var capacidad = habitacionJson[i].capacidad;
        var tSH = habitacionJson[i].tSH;
        var mascotas = habitacionJson[i].mascotas;
        if (habitacionFormulario.capacidad == capacidad && habitacionFormulario.mascotas == mascotas && habitacionFormulario.tSH == tSH) {
            var habitacionOb = new Habitacion(numero, capacidad, tSH, mascotas);
            arrHabitaciones.push(habitacionOb);

        } else {
            console.log("no");
        }

    }
    console.log(arrHabitaciones);
    crearTabla(arrHabitaciones);
}
/**
 * Funcion que crea la Tabla de HTML en la que se le pasa un array de clases Habitacion
 * @param {Array} arrHabitaciones  Array de clases Habitacion
 */

function crearTabla(arrHabitaciones) {
    document.body.innerHTML="";
    var table = document.createElement("table");
    table.setAttribute("border","1");
    var trCabecera=document.createElement("tr");
    var tdC1=document.createElement("td");
    var tdC2=document.createElement("td");
    var tdC3=document.createElement("td");
    var tdC4=document.createElement("td");

    var tnC1 = document.createTextNode("Numero"); 
    var tnC2 = document.createTextNode("Capacidad");
    var tnC3 = document.createTextNode("Servicio de habitaciones");
    var tnC4 = document.createTextNode("Mascotas");



    tdC1.appendChild(tnC1);
    tdC2.appendChild(tnC2);
    tdC3.appendChild(tnC3);
    tdC4.appendChild(tnC4);

    trCabecera.appendChild(tdC1);
    trCabecera.appendChild(tdC2);
    trCabecera.appendChild(tdC3);
    trCabecera.appendChild(tdC4);

    table.appendChild(trCabecera);

    if (arrHabitaciones.length != 0) {
        for (let i = 0; i<arrHabitaciones.length; i++) {
            
            
           console.log(arrHabitaciones[i].numero);
            
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var tn1 = document.createTextNode(arrHabitaciones[i].numero); 
            var tn2 = document.createTextNode(arrHabitaciones[i].capacidad)
            if(document.createTextNode(arrHabitaciones[i].tSH)==true){
                var tn3 = document.createTextNode("Si")
            }else{
                var tn3 = document.createTextNode("No")
            }
            if(document.createTextNode(arrHabitaciones[i].mascotas)==true){
                var tn4 = document.createTextNode("Si")
            }else{
                var tn4 = document.createTextNode("No")
            }

            td1.appendChild(tn1);
            td2.appendChild(tn2);
            td3.appendChild(tn3);
            td4.appendChild(tn4);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            table.appendChild(tr);
           

        }
        document.body.appendChild(table);
    }
}