import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../servidor/url.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'; /*IMPORTADO NA PASTA @ANGULAR */

@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.page.html',
  styleUrls: ['./lista-servico.page.scss'],
})
export class ListaServicoPage implements OnInit {

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

  constructor(public http: HttpClient, public servidorUrl: UrlService) {
    
  this.listaServico(); 
  this.servicoItem = []; 

  }

  ngOnInit() {
  }

  listaServico(){
    // Buscar os serviços
                // http://localhost/kibelezati14/admin/lista-servico.php  
    this.http.get(this.servidorUrl.pegarUrl() + 'lista-servico.php').pipe(map(res => res)).subscribe(listaDados => {
      this.servicos = listaDados;
      console.log(this.servicos);

      for (let i = 0; i < this.servicos.length; i++){

        this.servicoItem.push({
          idServico:listaDados[i]['idServico'],
          nomeServico:listaDados[i]['nomeServico'],
          valorServico:listaDados[i]['valorServico'],
          statusServico:listaDados[i]['statusServico'],
          dataCadServico:listaDados[i]['dataCadServico'],
          descricaoServico:listaDados[i]['descricaoServico'],
          fotoServico1:listaDados[i]['fotoServico1'],
          fotoServico2:listaDados[i]['fotoServico2'],
          fotoServico3:listaDados[i]['fotoServico3'],
          fotoServico4:listaDados[i]['fotoServico4'],
          textoServico:listaDados[i]['textoServico'],
          tempoExecServico:listaDados[i]['tempoExecServico'],
          idEmpresa:listaDados[i]['idEmpresa']
        });
      } // FIM FOR

      this.servicoItemTodos = this.servicoItem;

    });

  } // FIM LISTA SERVICO

  // Método de pesquisa
  getItems(ev: any) {
    // Definir o valor da barra de pesquisa
    const val = ev.target.value;

    // Se o valor for um texto (string) vazia não filtre os items
    if (val && val.trim() != '') {
      this.servicoItem = this.servicoItemTodos.filter((servicos) => {
        return (servicos.nomeServico.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }else{
      this.servicoItem = this.servicoItemTodos;
    }
    console.log(this.servicoItem);
  }

}
