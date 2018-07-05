import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import componentes
import { UsuariosComponent } from './components/usuarios.component';
import { HomeComponent } from './components/home.component';
import { ObrasComponent } from './components/obras.component';
import { CuentabancariaComponent } from './components/cuentabancaria.component';
import { GastosComponent } from './components/gastos.component';
import { SaveUsuariosComponent } from './components/save-usuarios.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'obras', component: ObrasComponent},
    {path: 'cuenta-bancaria', component: CuentabancariaComponent},
    {path: 'gastos', component: GastosComponent},
    {path: 'guardar-usuario', component: SaveUsuariosComponent},
    



    {path: '**', component: HomeComponent}





];
//configurar el router y las rutas basicas

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);