import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class RegisterGuard implements CanActivate {

  constructor(private router: Router, private authServer: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let allowed = this.authServer.isAuth;
    if (allowed) {
      this.router.navigate(['']);
      allowed = !allowed;
    }else{
      allowed = !allowed;
    }

    return allowed;
  }
}
