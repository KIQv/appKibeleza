import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../servidor/url.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';         /* classe responsável por visualizar a URL atual */
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  reserva:any;

  idServico:any;
  dadosDetalhe:any;
  
  dados: Array<{
    idServico: any,
    nomeServico: any,
    valorServico: any,
    statusServico: any,
    dataCadServico: any,
    descricaoServico: any,
    fotoServico1: any,
    fotoServico2: any,
    fotoServico3: any,
    fotoServico4: any,
    textoServico: any,
    tempoExecServico: any,
    idEmpresa: any
  }>;

  servicos:any;

  servicoItem: Array<{
    idServico: any,
    nomeServico: any,
    valorServico: any,
    statusServico: any,
    dataCadServico: any,
    descricaoServico: any,
    fotoServico1: any,
    fotoServico2: any,
    fotoServico3: any,
    fotoServico4: any,
    textoServico: any,
    tempoExecServico: any,
    idEmpresa: any
  }>;

  servicoItemTodos: Array<{
    idServico: any,
    nomeServico: any,
    valorServico: any,
    statusServico: any,
    dataCadServico: any,
    descricaoServico: any,
    fotoServico1: any,
    fotoServico2: any,
    fotoServico3: any,
    fotoServico4: any,
    textoServico: any,
    tempoExecServico: any,
    idEmpresa: any
  }>;

  funcs: any;

  codFunc: any;
  dataReserva: any;

  dataMin: String = moment().format();
  codCliente = localStorage.getItem('idCliente');
  codServico = localStorage.getItem('codServico');

  constructor(public nav: NavController, public servidorUrl: UrlService, public dadosUrl: ActivatedRoute, public http:HttpClient, public formConst: FormBuilder) {

    this.dadosUrl.params.subscribe(parametroId => {             /* a variavel parametroId recebe todos os valores do método subscribe */
      this.idServico = parametroId.id;                          /* aqui em .id vai o nome que colocamos lá em tabs-routing.module  */
      console.log(this.idServico);                              /* aqui pode entrar um c.log para ver qual id a pg recebe ao abrir */
      this.listaDetalhe();
      this.dados = [];
    });

    this.reserva = this.formConst.group({
      codFunc: ['', Validators.required],
      dataReserva: ['', Validators.required],
      codCliente: this.codCliente,
      codServico: this.codServico,
    });

    this.listaFunc();

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

  listaDetalhe(){
    this.http.get(this.servidorUrl.pegarUrl() + 'detalhe.php?idServico=' + this.idServico)             
    .pipe(map(res => res)).subscribe(data => {                                              /* map irá mapear tudo em res, e irá transformar em objeto inteligente res - com o http do angular ele já reconhece como .json nativamente */
      this.dadosDetalhe = data;
      console.log(this.dadosDetalhe); // 
                                                        /* aqui pode entrar um c.log para ver o .json  */
      for (let i = 0; i < this.dadosDetalhe.length; i++) {                                  /* este for alimenta a array dados com todos os dados */
        this.dados.push({
          idServico:data[i]['idServico'],
          nomeServico:data[i]['nomeServico'],
          valorServico:data[i]['valorServico'],
          statusServico:data[i]['statusServico'],
          dataCadServico:data[i]['dataCadServico'],
          descricaoServico:data[i]['descricaoServico'],
          fotoServico1:data[i]['fotoServico1'],
          fotoServico2:data[i]['fotoServico2'],
          fotoServico3:data[i]['fotoServico3'],
          fotoServico4:data[i]['fotoServico4'],
          textoServico:data[i]['textoServico'],
          tempoExecServico:data[i]['tempoExecServico'],
          idEmpresa:data[i]['idEmpresa']
        });
      }

      console.log(this.dados[0].nomeServico);
      localStorage.setItem('codServico',this.dados[0].idServico);

    });   
  };

  listaFunc(){
    // Buscar os serviços
                // http://localhost/kibelezati14/admin/lista-servico.php  
    this.http.get(this.servidorUrl.pegarUrl() + 'lista-func.php').pipe(map(res => res)).subscribe(listaDados => {
      this.servicos = listaDados;
      console.log(this.servicos);
      this.funcs = listaDados;
    });
  }; // FIM LISTA SERVICO

  async cadReserva(){
    if(this.codFunc == undefined || this.dataReserva == undefined){
      this.servidorUrl.Alerta('KiBeleza', 'Atenção', localStorage.getItem('nomeCliente') + ', Preencha todos os campos');
    }else{
      this.cadDados(this.reserva.value).subscribe(
        data => {
          console.log('Teste de cadastro')
          this.servidorUrl.Alerta('KiBeleza', 'Atenção', localStorage.getItem('nomeCliente') + ', sua reserva foi realizada com sucesso!')
          this.nav.navigateBack('/tabs/pg/login')

        },
        err => {
          this.servidorUrl.Alerta('KiBeleza', 'Atenção', localStorage.getItem('nomeCliente') + ', erro ao realizar a reserva, tente novamente mais tarde.');
        }
      );
    }
  };
  cadDados(dadosCad){
    let cabecalho = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.servidorUrl.pegarUrl()+'reserva.php', dadosCad, {
      headers: cabecalho
    }).pipe(map((res) => { return res }));
  };
}