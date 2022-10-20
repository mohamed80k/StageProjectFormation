import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable()
export class sessionGaurdService implements CanActivate{
    constructor(private authservice : AuthService, private router : Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if(localStorage.getItem('user') ){
            return true;
        }

        
        
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}
