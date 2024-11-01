import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPersonajesComponent } from './components/lista-personajes/lista-personajes.component';

const routes: Routes = [
  { path: '', redirectTo: '/personajes', pathMatch: 'full' },
  { path: 'personajes', component: ListaPersonajesComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
