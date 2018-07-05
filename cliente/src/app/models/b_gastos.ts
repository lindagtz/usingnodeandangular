export class Gastos{
    constructor(
        public descripcion: string,
        public cantidad: number,
        public precio: number,
        public total: number,
        public idcuentaBancaria: string,
        public fecha_gasto:Date,
        public idObra: string,
        public foto: string,
        public factura:string


    ){}

}