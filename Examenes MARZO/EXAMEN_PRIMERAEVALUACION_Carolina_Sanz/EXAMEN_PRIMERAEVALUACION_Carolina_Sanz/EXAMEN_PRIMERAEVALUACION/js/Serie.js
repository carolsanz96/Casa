class Serie{
    /**
     * Constructor de clases de la clase Habitacion
     * @param {any} titulo Numero de la Habitacion a guardar
     * @param {any} year Capacidad máxima de la habitacion a guardar
     * @param {any} genero Si tiene o no tiene el servicio de Habitaciones
     * @param {any} reparto  Si permite o no las mascotas
     * @param {any} trailer
     * @param {any} poster
     */
    constructor(titulo,year,genero,reparto,trailer,poster){
        this.titulo=titulo;
        this.year=year;
        this.genero=genero;
        this.reparto=reparto;
        this.trailer=trailer;
        this.poster=poster;

    }
}