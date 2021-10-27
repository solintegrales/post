import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private usrSvc: UserService,
              private router: Router ){}

              canActivate(
                next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> |
                Promise<boolean | UrlTree> | boolean | UrlTree {
                return this.usrSvc.user$.pipe(
                  map(user => {
                    if (!user) {
                      this.router.navigate(['/login']);
                      console.log('NO SE ENCUENTRA LOGUEADO');
                      return false;
                    }
                    return true;
                  })
                );
              }
}
