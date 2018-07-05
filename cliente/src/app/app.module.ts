import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <== add the imports!
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';


import { UsuariosComponent } from './components/usuarios.component';
import { HomeComponent } from './components/home.component';
import { ObrasComponent } from './components/obras.component';
import { CuentabancariaComponent } from './components/cuentabancaria.component';
import { GastosComponent } from './components/gastos.component';
import { SaveUsuariosComponent } from './components/save-usuarios.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuariosComponent,
    ObrasComponent,
    CuentabancariaComponent,
    GastosComponent,
    SaveUsuariosComponent

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing                        
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
