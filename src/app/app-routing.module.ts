import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutPageModule),
  },
  {
    path: '',
    redirectTo: 'template',
    pathMatch: 'full',
  },
  {
    path: 'template',
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
