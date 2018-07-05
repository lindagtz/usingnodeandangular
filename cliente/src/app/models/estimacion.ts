export class Estimacion{
    constructor(
        public nombre: string,
        public monto: number,
        public extras: String,
        public subtotal: number,
        public iva: number,
        public total: number,
        public fecha_inicio:Date,
        public fecha_fin:Date,
        public idObra:string,
        public idProveedor:string



    ){}
}