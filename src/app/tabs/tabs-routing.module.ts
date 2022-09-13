import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [ /* Classe Routes */ 
  {
    path: 'tabs/pg', /* Caminho Principal */
    component: TabsPage,
    children: [
      {
        path: 'home', /* Alteração do caminho da pagina */ /* Bloco 01 */
        loadChildren: () => import('../pg/home/home.module').then(m => m.HomePageModule) /* Alteração do caminho da pagina e nome do arquivo */
      },
      {
        path: 'sobre', 
        loadChildren: () => import('../pg/sobre/sobre.module').then(m => m.SobrePageModule) 
      },
      {
        path: 'lista-servico',
        loadChildren: () => import('../pg/lista-servico/lista-servico.module').then(m => m.ListaServicoPageModule) /* OBS: Ele retira o - sozinho */
      },
      {
        path: 'login',
        loadChildren: () => import('../pg/login/login.module').then(m => m.LoginPageModule) 
      },
      {
        path: 'detalhe/:id',
        loadChildren: () => import('../pg/detalhe/detalhe.module').then(m => m.DetalhePageModule) 
      },
      {
        path: 'reserva/:id',
        loadChildren: () => import('../pg/reserva/reserva.module').then(m => m.ReservaPageModule) 
      },
      {
        path: 'cadastro',
        loadChildren: () => import('../pg/cadastro/cadastro.module').then(m => m.CadastroPageModule) 
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pg/perfil/perfil.module').then(m => m.PerfilPageModule) 
      },
      {
        path: '', /* Se não passar por caminho nenhum ↓ */
        redirectTo: '/tabs/pg/home', /* Volta para a pagina principal */
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '', /* Qual pagina é o inicio do aplicativo ↓ */
    redirectTo: '/tabs/pg/home', /* Nesse app a pagina de inicio é a home */
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
