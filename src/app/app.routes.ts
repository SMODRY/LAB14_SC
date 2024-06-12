import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./home/components.routes').then(m => m.DASHBOARD_ROUTES)
  },
];
