
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { environment } from 'src/environments/environment.development';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', canActivate: [OktaAuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  }, 
];

const skipauthRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },



  
];

@NgModule({
  imports: [RouterModule.forRoot(environment.userauthentication ? routes : skipauthRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }