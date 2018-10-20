import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { RegisterComponent } from './views/register/register.component';
import { StartShoppingComponent } from './views/start-shopping/start-shopping.component';
import { UserGuardGuard } from './guards/resolvers/user-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    resolve: { user: UserGuardGuard }
  },
  {
    path: 'login',
    component: HomepageComponent,
    resolve: { user: UserGuardGuard }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[RegisterGuard]
  },
  {
    path: 'startShopping',
    component: StartShoppingComponent,
    resolve: { user: UserGuardGuard },
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
