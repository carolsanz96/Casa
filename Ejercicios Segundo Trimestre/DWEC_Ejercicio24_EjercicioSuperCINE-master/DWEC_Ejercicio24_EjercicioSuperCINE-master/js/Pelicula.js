class Pelicula {
    constructor(titulo, director, imagen, sinopsis, ratings) {
      this.titulo = titulo;
      this.director = director;
      this.imagen =  imagen;
      this.sinopsis = sinopsis;
      this.rating = this.calcularRating(ratings);
    }

    calcularRating(ratings){
        var r=0;
        for(var i=0;i<ratings.length;i++){
            if (ratings[i].Source=="Internet Movie Database"){
                r = r + ((Number)(ratings[i].Value.substring(0,ratings[i].Value.indexOf("/")) * 10));
            } else if (ratings[i].Source=="Rotten Tomatoes"){
                r = r + (Number)(ratings[i].Value.substring(0,ratings[i].Value.indexOf("%")));
            } else if (ratings[i].Source=="Metacritic"){
                r = r + (Number)(ratings[i].Value.substring(0,ratings[i].Value.indexOf("/")));
            }
        }
        var rating;
        if (ratings.length>0) {
            rating = r / ratings.length;
        } else {
            rating = "RATING NO DISPONIBLE";
        }
        return rating;
    }

    mostrarDatos(){
        console.log("***************************");
        console.log(this.titulo);
        console.log(this.director);
        console.log(this.imagen);
        console.log(this.sinopsis);
        console.log(this.rating);
    }

}
