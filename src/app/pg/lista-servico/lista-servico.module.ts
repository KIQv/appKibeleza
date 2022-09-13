import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaServicoPageRoutingModule } from './lista-servico-routing.module';

import { ListaServicoPage } from './lista-servico.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaServicoPageRoutingModule
  ],
  declarations: [ListaServicoPage]
})
export class ListaServicoPageModule {}
