import { AuthService } from '../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable() // If you want to inject services into services you have add this annotation

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
          this.router.navigate(['/login']); 
        }
        return isAuth;
    }


}