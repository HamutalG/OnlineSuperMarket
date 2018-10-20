import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements Resolve<any> {

  constructor(private authService:AuthService){}

  public resolve = async()=>{
    if(!this.authService.isAuth){
      let varo = await this.authService.subscribableSessionCheck();
    };
    return null;
  };
}
