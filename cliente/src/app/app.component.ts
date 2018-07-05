import { Component, OnInit } from '@angular/core';
import { UserService } from './services/usuarios.services';
import { Usuarios } from './models/usuarios';
import { Router, ActivatedRoute, Params } from '@angular/router';

//mandamos a llamar el modelo de usuarios para usarlo posteriormente


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
 public title = 'Demoledores';
 public usuarios: Usuarios;
 public usuarios_registrar: Usuarios;
 public identity;
 public token;
 public errorMessage;
 //para ver si el user esta logueado o no

constructor(  
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService:UserService
    
){
  this.usuarios = new Usuarios('','','','','','','');

  //vacio para irse modificando
}


ngOnInit(){
 this.identity= this._userService.getIdentity();
 //sacar el user logueado
 this.token= this._userService.getToken();
//sacar el token del user logueado

}

public onSubmit(){
  console.log(this.usuarios);

this._userService.signup(this.usuarios).subscribe(
  response => {
    let identity=response.usuarios;
    this.identity = identity;
    //guardar el usuuario logueado y sus datos...
    //lo que nos devuelve al loguear si es correcto
  
  if(!this.identity._id){
    alert("El usuario no está identificado");
  }else{

    localStorage.setItem('identity', JSON.stringify(identity));
    // conseguir el hash o token para enviarlo a las peticiones que lo requieren
    //guaradr datos de sesion
    this._userService.signup(this.usuarios, 'true').subscribe(
      response => {
        let token=response.token;
        this.token = token;
        //guardar el usuuario logueado y sus datos...
        //lo que nos devuelve al loguear si es correcto
      
      if(this.token.length <= 0){
        alert("El token no se creo");
      }else{
        //si se genero el token, se crea elemento en storage

        localStorage.setItem('token', token);
        this.usuarios = new Usuarios('','','','','','','');
        //se le asigna aqui para que al cerrar sesion se borren los datos en el formulario
      }
    
        console.log(response); 
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

    console.log(response); 
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

//cerrar sesion, remover los datos guardados de localstorage

logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
//remueve los elementos guardados en la memoria
//limpia la variable localstorage
  localStorage.clear();
  this.identity=null;
  this.token=null;
  this._router.navigate(['/']);
}

}
