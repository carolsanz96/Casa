//Variable en la que guardaremos las busquedas
var textoBusqueda;
//funcion que se ejecuta cuando la pagina se haya cargado
$(document).ready(function () {
    inicializar();
    //lanza la busqueda a flirck
    $("#buscarReq").click(function () {
        textoBusqueda = $("#cajaBuscar").val();
        peticionFlickrs(textoBusqueda);
    })
    //Pasa a la seccion de buscar
    $("#bBuscar").click(function () {
        $("#favoritos").css("left", "-150%");
        $("#principal").css("left", "-200%");
        $("#buscar").css("left", "0%");
    })
    //Pasa a la seccion de favoritos
    $("#bfavoritos").click(function () {
        document.getElementById("mostrar").innerHTML = " ";
        $("#principal").css("left", "-200%");
        $("#buscar").css("left", "-150%");
        recuperaFavs();
        $("#favoritos").css("left", "0%");

    })
    //Pasa a la seccion principal
    $("#bprincipal").click(function () {
        $("#principal").css("left", "0%");
        $("#buscar").css("left", "-200%");
        $("#favoritos").css("left", "-200%");
    })




});

//esta función es llamada en el click del boton de buscar
//Busca el parametro "busqueda" en la bases de datos de Flirck
function peticionFlickrs(busqueda) {
    $.ajax({
        url: "https://api.flickr.com/services/rest/",
        dataType: "json",
        data: {
            method: "flickr.photos.search",
            api_key: "8e548eac5c97ed8fe70db6b8bfc95790",
            text: busqueda,//parametro por el que buscará
            format: "json",
            nojsoncallback: "1"
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        method: "GET",
        timeout: 1000,
        success: function (data, textStatus, jqXHR) {
            //Aquí le digo que si la busqueda no ha retornado nada salte un error
            if (data.photos.photo.length == 0) {
                textStatus = "notfound";
                errores(textStatus);
            } else {
                crearImagenes(data.photos.photo);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            errores(jqXHR, textStatus, errorThrown)

        }


    });
}
//Funcion que se conecta a la base de datos de firebase y muestra las fotos a las que has dado me gusta
function recuperaFavs() {
    var refPeliculas = database.ref("/img");
    refPeliculas.on('value', function (snapshot) {
        //llama a la función para crear las fichas de imagenes en la seccion de favoritos
        crearImgFav(snapshot);
    });

}
//Función a la que se le llama cuando existe un error, se le pasa el parametro
//"textStatus", que retorna el texto de error
function errores(textStatus) {

    if (textStatus == "timeout") {
        alert("Error TimeOut, el tiempo de espera se ha agotado. Realice la busqueda de nuevo por favor");
    } else if (textStatus == "error") {
        alert("Se ha producido un error, por favor contacte con el administrador si el error persiste");
    } else if (textStatus == "notfound") {
        alert("La foto que busca no se ha encontrado, realice otra busqueda por favor");
    } else if (textStatus == "fail") {
        alert("La busqueda ha fallado");
    }
}

var arrayFav = [];
//función que crea las fichas de las imagenes de favoritos
function crearImgFav(imagenes) {
    var iterador = 0;
    var divImagenes = document.getElementById("mostrarFavs");
    divImagenes.innerHTML = "";

    imagenes.forEach(imagen => {

        var buttonCorazon = document.createElement("input");
        var textTitulo = document.createElement("p");
        var texto = document.createTextNode("Titulo: " + imagen.val().title);
        textTitulo.appendChild(texto);
        buttonCorazon.setAttribute("type", "button");
        buttonCorazon.setAttribute("value", "Borrar de Favoritos");
        buttonCorazon.setAttribute("class", "bBorrar");
        buttonCorazon.setAttribute("id", iterador);
        buttonCorazon.setAttribute("title", imagen.val().title);
        var divFichaImg = document.createElement("div");
        divFichaImg.setAttribute("class", "fichaImagen");
        /* var url = "https://farm" + imagen.farm + ".staticflickr.com/" +
             imagen.server + "/" + imagen.id + "_" + imagen.secret + ".jpg"
        */
        var url = imagen.val().url;
        var img = document.createElement("img");
        img.setAttribute("src", url);
        img.setAttribute("class", "img");
        img.setAttribute("width", "250");
        divFichaImg.appendChild(img);
        divFichaImg.appendChild(textTitulo);
        divFichaImg.appendChild(buttonCorazon);
        divImagenes.appendChild(divFichaImg);
        iterador++;
    });
    $(".bBorrar").click(function () {
        var title = $(this).attr("title");
        var refImg = database.ref("/img/" + title);
        refImg.remove();
        recuperaFavs();
        alert("Borrado satisfactoriamente");

    })


}
//funcion que elimina cualquier caracter especial del titulo para poder guardarlo en la base de datos
function splitear(stringASplitear) {
    var resultado = "";
    var spliteado = stringASplitear.split(" ");
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("/");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("#");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split(".");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("$");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("[");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("]");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }
    var spliteado = resultado.split("@");
    resultado = "";
    for (i = 0; i < spliteado.length; i++) {
        resultado = resultado + spliteado[i];
    }

    return resultado;
}
//funcion que crea las fichas de las imagenes de la seccion de busqueda
function crearImagenes(imagenesArr) {
    var iterador = 0;
    var divImagenes = document.getElementById("mostrar");

    divImagenes.innerHTML = "";
    imagenesArr.forEach(imagen => {

        var buttonCorazon = document.createElement("button");
        buttonCorazon.setAttribute("class", "bCorazon");
        buttonCorazon.setAttribute("id", iterador);
        var imgCorazon = document.createElement("img");
        imgCorazon.setAttribute("src", "img/corazon.png");
        imgCorazon.setAttribute("width", "20");
        buttonCorazon.appendChild(imgCorazon);
        var divFichaImg = document.createElement("div");
        divFichaImg.setAttribute("class", "fichaImagen");
        /* var url = "https://farm" + imagen.farm + ".staticflickr.com/" +
             imagen.server + "/" + imagen.id + "_" + imagen.secret + ".jpg"
        */
        var titulo="";
        var url = creaUrl(imagen);
        var img = document.createElement("img");
        img.setAttribute("src", url);
        img.setAttribute("class", "img");
        img.setAttribute("width", "250");
        if(imagen.title==""||imagen.title==null||imagen.title==" "){
            titulo="SIN TÍTULO"
        }else{
            titulo=imagen.title;
        }
        
        buttonCorazon.setAttribute("title", splitear(titulo));
        divFichaImg.appendChild(img);
        divFichaImg.appendChild(buttonCorazon);
        divImagenes.appendChild(divFichaImg);
        iterador++;
    });
//binding del click en el boton de favoritos para guardarla en la base de datos
//Guardo los titulos y las url
    $(".bCorazon").click(function () {
        $(this).css("background-color", "red");
        var id = $(this).attr("id");
        arrayFav.push(imagenesArr[id]);

        var titles = $(this).attr("title");
        guardaBaseDeDatos(arrayFav, database, titles);
        arrayFav.splice(0);
        $(this).prop() = false;

    });
}
//Función que crea las url de las imagenes
function creaUrl(imagen) {

    var url = "https://farm" + imagen.farm + ".staticflickr.com/" +
        imagen.server + "/" + imagen.id + "_" + imagen.secret + ".jpg"
    return url;
}
var database;
//funcion que incializa la aplicacion, en la que se crea la conexion a la base de datos
function inicializar() {
    var config = {
        apiKey: "AIzaSyAg7wcm2VbL9eiPVj6h1el_4Wvr9eZDGOg",
        authDomain: "practica2dwec-hfa.firebaseapp.com",
        databaseURL: "https://practica2dwec-hfa.firebaseio.com/",
        storageBucket: "bucket.appspot.com"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}
//funcion que guarda en base de datos las fotos a las que se le da favorito
function guardaBaseDeDatos(arrayFav, database, arrTitles) {
    arrayFav.forEach(imagen => {
        var url = creaUrl(imagen);

        var title = arrTitles;
        database.ref("/img/" + title).set({
            url: url,
            title: title
        });
    });

    alert("Guardado como Favorito Puede ver sus favoritos en la pagina de Favoritos");
}