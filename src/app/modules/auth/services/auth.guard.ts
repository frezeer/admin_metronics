import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.authService.user || !this.authService.token) {
      this.authService.logout();
      return false
    }
    let token = this.authService.token;
    let expiration = (JSON.parse(atob(token.split('.')[1]))).exp; //extrae el tiempo de expiracion del token
    if(Math.floor(Date.now() / 1000) >= expiration) { //compara el tiempo actual con el de expiracion
      this.authService.logout();//si el token ha expirado, cierra sesion
      return false;
    }
    return true;
  }
}
