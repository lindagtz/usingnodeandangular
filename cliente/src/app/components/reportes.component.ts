import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'obras',
    templateUrl: '../views/obras.html',

})

export class ObrasComponent implements OnInit{
    public titulo: string;
   


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
  

    ){
        this.titulo= 'Obras';
        
    }
    ngOnInit(){
      
       console.log('obras cargado');
       
       }

     





    }