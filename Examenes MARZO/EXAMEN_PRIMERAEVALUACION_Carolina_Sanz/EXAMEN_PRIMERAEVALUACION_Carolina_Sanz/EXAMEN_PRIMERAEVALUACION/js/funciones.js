/**
 * Funcion que ejecuta la peticion AJAX para recoger el JSON
 */


function ejecutarLlamadaAjax() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            var series = JSON.parse(peticion.responseText);
            guardarInformacion(series);

        }
    }
    peticion.overrideMimeType("text/plain");
    peticion.open("GET", "https://fpaniaguaformacion.github.io/series.json");
    peticion.send(null);


}
/**
 * Función que guarda la información del Json en un Array de clases Series
 * @param {JSON} series 
 */
function guardarInformacion(series) {


    var arrSeries = new Array();
    var serieJson = series.series;


    for (i = 0; i < serieJson.length; i++) {
        var titulo = serieJson[i].titulo;
        var year = serieJson[i].year;
        var genero = serieJson[i].genero;
        var reparto = serieJson[i].reparto[i].actor;
        var trailer = serieJson[i].trailer;
        var poster = serieJson[i].poster;
        var SerieOb = new Serie(titulo, year, genero, reparto, trailer, poster);
        arrSeries.push(SerieOb);


    }
    console.log(arrSeries);
    crearTabla(arrSeries);
}
/**
 * Funcion que crea la Tabla de HTML en la que se le pasa un array de clases Serie
 * @param {Array} arrSeries  Array de clases Series
 */

function crearTabla(arrSeries) {
    document.body.innerHTML = "";
    var table = document.createElement("table");
    table.setAttribute("border", "1");
    var trCabecera = document.createElement("tr");
    var tdC1 = document.createElement("td");
    var tdC2 = document.createElement("td");
    var tdC3 = document.createElement("td");
    var tdC4 = document.createElement("td");
    var tdC5 = document.createElement("td");
    var tdC6 = document.createElement("td");

    var tnC1 = document.createTextNode("Titulo");
    var tnC2 = document.createTextNode("Year");
    var tnC3 = document.createTextNode("Genero");
    var tnC4 = document.createTextNode("Reparto");
    var tnC5 = document.createTextNode("Trailer");
    var tnC6 = document.createTextNode("Poster");



    tdC1.appendChild(tnC1);
    tdC2.appendChild(tnC2);
    tdC3.appendChild(tnC3);
    tdC4.appendChild(tnC4);
    tdC4.appendChild(tnC5);
    tdC4.appendChild(tnC6);

    trCabecera.appendChild(tdC1);
    trCabecera.appendChild(tdC2);
    trCabecera.appendChild(tdC3);
    trCabecera.appendChild(tdC4);
    trCabecera.appendChild(tdC5);
    trCabecera.appendChild(tdC6);

    table.appendChild(trCabecera);

    if (arrSeries.length != 0) {
        for (let i = 0; i < arrSeries.length; i++) {


            console.log(arrSeries[i].titulo);
            console.log(arrSeries[i].year);
            console.log(arrSeries[i].genero);
            console.log(arrSeries[i].reparto);
            console.log(arrSeries[i].trailer);
            console.log(arrSeries[i].poster);

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");
            var tn1 = document.createTextNode(arrSeries[i].titulo);
            var tn2 = document.createTextNode(arrSeries[i].year);
            var tn3 = document.createTextNode(arrSeries[i].genero);
            var tn4 = document.createTextNode(arrSeries[i].reparto);
            //No me ha dado tiempo a recorrer el array de reparto
            //for (let i = 0; i < arrSeries[i].reparto.length; i++) {
            //    var tn7 = document.createTextNode(arrSeries[i].reparto);
            //}
            var tn5 = document.createTextNode(arrSeries[i].trailer);
            //creas un img
            var img = document.createElement("img");
            //le pones attribute src y le pasas la url
            img.setAttribute("src",arrSeries[i].poster)

            td1.appendChild(tn1);
            td2.appendChild(tn2);
            td3.appendChild(tn3);
            td4.appendChild(tn4);
            td5.appendChild(tn5);
            //lo añades
            td6.appendChild(img);


            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);

            table.appendChild(tr);


        }
        document.body.appendChild(table);
    }
}