/**
 * Clase Habitacion que guardará los datos del Json
 */

class Habitacion{
    /**
     * Constructor de clases de la clase Habitacion
     * @param {any} numero Numero de la Habitacion a guardar
     * @param {any} capacidad Capacidad máxima de la habitacion a guardar
     * @param {any} tSH Si tiene o no tiene el servicio de Habitaciones
     * @param {any} mascotas  Si permite o no las mascotas
     */
    constructor(numero,capacidad,tSH,mascotas){
        this.numero=numero;
        this.capacidad=capacidad;
        this.tSH=tSH;
        this.mascotas=mascotas;
    }
}