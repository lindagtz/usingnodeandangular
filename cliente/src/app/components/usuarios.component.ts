import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/usuarios.services';
import { Usuarios } from '../models/usuarios';


@Component({
    selector: 'usuarios',
    templateUrl: '../views/usuarios.html',
    providers: [UserService]
})

export class UsuariosComponent implements OnInit{
    public titulo: string;
    public usuarios: Usuarios[];
    public usuarios_registrar: Usuarios;
    public identity;
    public token;
    public url:string;
    public errorMessage;
    public alertMessage;
    public next_page;
    public prev_page;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
        
    ){
        this.titulo= 'Listado de users';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url= GLOBAL.url;
        this.usuarios_registrar = new Usuarios('','','','','','','');
        this.next_page=1;
        this.prev_page=1;
    }

    ngOnInit(){
        console.log('users cargado');
        this.getUsuarios();
        
    }

    onSubmitRegister(){
        console.log(this.usuarios_registrar);
        this._userService.register(this.usuarios_registrar).subscribe(
            response =>{
                    this.alertMessage="Se guardo correctamente!";

            },
            error => {
            var errorMessage = <any>error;
        
            if(errorMessage != null){
            var body = JSON.parse(error._body);
            this.errorMessage = body.message;
            //convertirlo al mensaje que teniamos en el body n l back
            //para mandar la variable error al frontend con angular 
            console.log(error); 
            }
        }
        
        );
    }

    getUsuarios(){
        this._route.params.forEach((params: Params) =>{
       
        this._userService.getUsuarios().subscribe(
            response =>{
                if(!response.usuarios){
                    this._router.navigate(['/']);
                }else{
                    this.usuarios= response.usuarios;
                }
            },
            error => {
                var errorMessage = <any>error;
            
                if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                //convertirlo al mensaje que teniamos en el body n l back
                //para mandar la variable error al frontend con angular 
                console.log(error); 
                }

        }
        
  );
    });


    
    }

}