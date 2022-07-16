import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuth } from 'src/app/store/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  isAuth: boolean = false;

  constructor(
    private router: Router,
    private store: Store
  ) { 
    this.store.select(selectIsAuth).subscribe(isAuthData => this.isAuth = isAuthData);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {      
      if(!this.isAuth) {        
        this.router.navigate(['/']).then(() => false)
      }
      return true;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.isAuth) {        
        this.router.navigate(['/']).then(() => false)
      }
      return true;
  }
}
