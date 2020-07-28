import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { HeaderComponent } from './inicio/header/header.component';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: InicioComponent },
  { path: 'login', component: FooterComponent,
  children: [
    { path: '', component: InicioComponent },
  ] },
  {
    path:'afiliados',
    component: HeaderComponent,
   loadChildren: './modules/afiliados/afiliados.module#AfiliadosModule',
  },
  {
    path:'usuarios',
    component: HeaderComponent,
   loadChildren: './modules/usuarios/usuarios.module#UsuariosModule',
  },
  {
    path:'estadisticas',
    component: HeaderComponent,
   loadChildren: './modules/estadisticas/estadisticas.module#EstadisticasModule',
  },
  {
    path:'contactos',
    component: HeaderComponent,
   loadChildren: './modules/contactos/contactos.module#ContactosModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
