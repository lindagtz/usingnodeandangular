import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Gastos } from '../models/b_gastos';


@Component({
    selector: 'gastos',
    templateUrl: '../views/gastos.html',

})

export class GastosComponent implements OnInit{
    public titulo: string;
   


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
  

    ){
        this.titulo= 'Gastos';
        
    }
    ngOnInit(){
      
       console.log('gastos cargado');
       
       }

     





    }