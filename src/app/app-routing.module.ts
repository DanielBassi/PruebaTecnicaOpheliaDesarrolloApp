import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './Componentes/cliente/cliente.component';
import { FacturaComponent } from './Componentes/factura/factura.component';

const routes: Routes =
  [
    /* Cliente */
    { path: '', component: ClienteComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
