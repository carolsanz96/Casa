var database;
var firebase;
var request=new XMLHttpRequest();
function inicializar(){
    var config={
        apiKey: "AIzaSyBKgkX870b3uHDs3wliCbPTadSy9aRmxMo",
        authDomain: "preparacionExamen.firebaseapp.com",
        databaseURL: "https://preparacionexamen-7d105.firebaseio.com/",
        storageBucket: "bucket.appspot.com"
    };
    firebase.initializeApp(config);
    database=firebase.database();
}

function realizarLlamada(){
    request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200){
            var data=JSON.parse(request.responseText);
            console.log(data);
            generarHtml(data);
        }
    }
    request.overrideMimeType("text/plain");
    request.open("GET","http://localhost/preparacionExamen/json/juegos_jquery.json");
    request.send(null);
}

function generarHtml(data){
   var array=data.videojuegos;

    console.log(array);
    array.forEach(element=>{   
        var div=document.createElement("div");

        var plataforma=document.createElement("p");
        var textoPlataforma=document.createTextNode(element.plataforma)
        plataforma.appendChild(textoPlataforma);

        var titulo=document.createElement("p");
        var textoTitulo=document.createTextNode(element.titulo);
        titulo.appendChild(textoTitulo);

        var precio=document.createElement("p");
        //Observa esta linea de abajo y dime que esta mal
        var textoPrecio=document.createTextNode(element.precio);
        precio.appendChild(textoPrecio);

        div.append(plataforma);
        div.append(titulo);
        div.append(precio);

        $("#juegos").append(div);

        database.ref("Videojuegos/"+element.titulo).set({
            plataforma:element.plataforma,
            titulo: element.titulo,
            precio: element.precio
        });
    });
}

function conectarFirebase(){
    var videojuegos = firebase.database().ref('Videojuegos');
    database = firebase.database();
    videojuegos.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapShot){ 
            var plataforma=childSnapShot.val().plataforma;
            var titulo=childSnapShot.val().titulo;
            var precio=childSnapShot.val().precio;   

            console.log(plataforma);
            console.log(titulo);
            console.log(precio);
        });
    });
}

function cambiarPagina(){
    $(location).attr('href', 'http://localhost/preparacionExamen/index.html');
}

function cargar(){
    if(localStorage.email!=undefined){
        document.querySelector("#email").value=localStorage.email;
        document.querySelector("#password").value=localStorage.password;
        document.querySelector("#recordar").checked=true;
    }
}

function validar(){
    var email=document.querySelector("#email").value;
    var password=document.querySelector("#password").value;
    var recordar=document.querySelector("#ck").checked;
    if(recordar){
        //almacenar
        localStorage.email=email;
        localStorage["password"]=password;
    }else{
        localStorage.clear();
    }
}