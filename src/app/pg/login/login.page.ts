import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../servidor/url.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string; /*Variavel do tipo texto*/
  senha:string; /*Variavel do tipo texto*/
  dadosLogin: any;

  constructor(public servidorUrl: UrlService, public http: HttpClient, public nav:NavController) {

    this.email = "an.ma@gmail.com";
    this.senha = "123";
    /* REMOVER NO FINAL DOS TESTES */

   }

  ngOnInit() {
    /* document.querySelector('ion-tab-bar').style.display = 'none' */
  }

  async Logar(){
    if(this.email == "" || this.senha == ""){
      console.log('Preencha todos os campos');
      this.servidorUrl.Alerta('KiBeleza','Atenção','Preencha todos os campos')
     
    }else{
     this.http.get(this.servidorUrl.pegarUrl() + 'Login.php?email=' + this.email + '&senha=' + this.senha)
     .pipe(map(rep => rep))
     .subscribe(data =>{

      this.dadosLogin = data;
      console.log(this.dadosLogin);
      
      if(this.dadosLogin[0].msg.Logado == 'Sim'){
        if(this.dadosLogin[0].Dados.statusCliente == 'ATIVO'){
          this.servidorUrl.Alerta('KiBeleza','Atenção', this.dadosLogin[0].Dados.nomeCliente + ', seja bem vindo');

          // Pegar os dados do usuario local storage
          localStorage.setItem('idCliente', this.dadosLogin[0].Dados.idCliente);
          localStorage.setItem('nomeCliente', this.dadosLogin[0].Dados.nomeCliente);
          localStorage.setItem('emailCliente', this.dadosLogin[0].Dados.emailCliente);
          localStorage.setItem('statusCliente', this.dadosLogin[0].Dados.statusCliente);
          localStorage.setItem('fotoCliente', this.dadosLogin[0].Dados.fotoCliente);
          localStorage.setItem('userLogado', 'sim');

          this.servidorUrl.setIdCliente(localStorage.getItem('idCliente'));
          this.servidorUrl.setNomeCliente(this.dadosLogin[0].Dados.nomeCliente);
          this.servidorUrl.setEmailCliente(this.dadosLogin[0].Dados.emailCliente);
          this.servidorUrl.setStatusCliente(this.dadosLogin[0].Dados.statusCliente);
          this.servidorUrl.setFotoCliente(this.dadosLogin[0].Dados.fotoCliente);

          this.nav.navigateBack('/tabs/pg/perfil');
          /* document.querySelector('ion-tab-bar').style.display = 'flex' */
        }else{
          this.servidorUrl.Alerta('KiBeleza','Atenção', this.dadosLogin[0].Dados.nomeCliente + ', fale com um adm');
        }
        }else{
          this.servidorUrl.Alerta('KiBeleza','Atenção','Usuario ou senha invalido');
        }
     })
    }
  }
}