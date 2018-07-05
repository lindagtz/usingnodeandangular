
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Usuarios } from '../models/usuarios';


@Injectable()

export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }


    signup(user_to_login, gethash = null){
        
        if(gethash  != null){
            user_to_login.gethash = gethash;
        }
        
        let json= JSON.stringify(user_to_login);
        let params= json;


        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url +'login', params, { headers: headers }).map(res => res.json());
        //convertir los datos del user
    }

    getIdentity(){
        //para consultar el localstorage
        let identity= JSON.parse(localStorage.getItem('identity'));
            if(identity!= "undefined"){
                this.identity=identity;
//si encuentra LA IDENTIDAD LO GUARDA SINO ES NULL
            }else{
                this.identity=null;
            }
                return this.identity;
            
    }
    getToken(){
        let token= localStorage.getItem('token');
        if(token != "undefined"){
            this.token=token;
        }else{
            this.token=null;
        }
        return this.token;
        //obtiene el token dela sesion
    }

    ngOnInit(){
        console.log('aqui users chido');
        
    }

    register(user_to_register){
        let params= JSON.stringify(user_to_register);


        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url +'registro', params, { headers: headers }).map(res => res.json());
        //convertir los datos del user
    }
    
    getUsuarios(){
            let headers = new Headers({
                'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            return this._http.get(this.url +'getUsuario', options).map(res => res.json());
        //convertir los datos del user
       
    


    }
  




}