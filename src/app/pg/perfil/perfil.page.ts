import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { UrlService } from '../../servidor/url.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public nav: NavController, public servidorUrl: UrlService) {

    console.log(this.servidorUrl.getNomeCliente());
    console.log(this.servidorUrl.getIdCliente());

    this.verificarLogin();

  }

  ngOnInit() {
  }

  verificarLogin() {

    if(localStorage.getItem('userLogado') == 'sim'){

      this.servidorUrl.setIdCliente(localStorage.getItem('idCliente'));
      this.servidorUrl.setNomeCliente(localStorage.getItem('nomeCliente'));
      this.servidorUrl.setEmailCliente(localStorage.getItem('emailCliente'));
      this.servidorUrl.setStatusCliente(localStorage.getItem('statusCliente'));
      this.servidorUrl.setFotoCliente(localStorage.getItem('fotoCliente'));

    }else{

      this.nav.navigateBack('/tabs/pg/login');

    }

  }

  sair() {

    localStorage.clear();
    localStorage.setItem('userLogado', 'nao');
    location.reload();

  }

}
