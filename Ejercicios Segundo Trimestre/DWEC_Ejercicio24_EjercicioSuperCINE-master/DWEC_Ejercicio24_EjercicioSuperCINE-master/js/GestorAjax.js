var peliculas = new Array();
function ejecutarLlamadaAjax(){
    var request = new XMLHttpRequest();
    var titulo = document.querySelector("#titulo").value;
    request.onreadystatechange=function(){
        if(request.readyState==4){
            if(request.status==200){
                var datos = request.responseText;
                var jsonDatos = JSON.parse(datos);
                if (jsonDatos.Response!="False"){
                    procesarRespuesta(jsonDatos);
                    alert("Película añadida");
                    document.querySelector("#titulo").value = "";
                } else {
                    alert(jsonDatos.Error);
                }
            } else {
                console.log("ERROR");
            }
        } 
    }
    request.overrideMimeType("text/plain");
    request.open("GET","http://www.omdbapi.com?apikey=INSERTARAPIKEY&t=" + titulo, true);
    request.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    request.send();
}
function procesarRespuesta(datos){
    var p = new Pelicula(
        datos.Title,
        datos.Director,
        datos.Poster,
        datos.Plot,
        datos.Ratings
    );
    peliculas.push(p);
}
function mostrarDatos(){
    for (var i=0;i<peliculas.length;i++){
        peliculas[i].mostrarDatos();
    }
}