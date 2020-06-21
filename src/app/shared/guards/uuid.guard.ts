import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { validateUUID } from '../utils/util';

@Injectable({
  providedIn: 'root',
})
export class UUIDGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!route.params.uuid) {
      return of(false);
    }

    const test = validateUUID(route.params.uuid);
    if (!test) {
      this.router.navigate(['/dashboard']);
    }
    return of(test);
  }
}
