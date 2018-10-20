var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { RegisterComponent } from './views/register/register.component';
import { StartShoppingComponent } from './views/start-shopping/start-shopping.component';
import { UserGuardGuard } from './guards/resolvers/user-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
var routes = [
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
        canActivate: [RegisterGuard]
    },
    {
        path: 'startShopping',
        component: StartShoppingComponent,
        resolve: { user: UserGuardGuard },
        canActivate: [AuthGuard]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map