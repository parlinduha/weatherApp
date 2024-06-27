import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'template', // Rute default diarahkan ke 'template'
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplatePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
