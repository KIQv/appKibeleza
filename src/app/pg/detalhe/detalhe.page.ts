  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';         /* classe responsável por visualizar a URL atual */
  import { UrlService } from '../../servidor/url.service';  /* aqui temos que importar  */
  import { HttpClient } from '@angular/common/http'; 
  import { map } from 'rxjs/operators';
  @Component({
    selector: 'app-detalhe',
    templateUrl: './detalhe.page.html',
    styleUrls: ['./detalhe.page.scss'],
  })
  export class DetalhePage implements OnInit {
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

    constructor(public dadosUrl: ActivatedRoute, 
                public servidorUrl: UrlService,
                public http:HttpClient ) {                        /* é importante declararmos importar as classes que vamos usar */
      this.dadosUrl.params.subscribe(parametroId => {             /* a variavel parametroId recebe todos os valores do método subscribe */
        this.idServico = parametroId.id;                          /* aqui em .id vai o nome que colocamos lá em tabs-routing.module  */
        console.log(this.idServico);                              /* aqui pode entrar um c.log para ver qual id a pg recebe ao abrir */
        this.listaDetalhe();
        this.dados = [];
      })
    }
    ngOnInit() {
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
    }
  }