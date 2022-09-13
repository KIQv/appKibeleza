import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaServicoPage } from './lista-servico.page';

const routes: Routes = [
  {
    path: '',
    component: ListaServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaServicoPageRoutingModule {}
