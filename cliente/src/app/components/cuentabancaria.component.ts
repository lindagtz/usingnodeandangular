import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cuentabancaria } from '../models/cuentabancaria';


@Component({
    selector: 'cuentabancaria',
    templateUrl: '../views/cuentabancaria.html',

})

export class CuentabancariaComponent implements OnInit{
    public titulo: string;
   


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
  

    ){
        this.titulo= 'Cuenta-bancaria';
        
    }
    ngOnInit(){
      
       console.log('cb cargado');
       
       }

     





    }