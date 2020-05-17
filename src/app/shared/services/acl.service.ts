import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AclService {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  public isAllowed(resource: string): boolean {
    const {accessToken, user} = this.authService;
    if (!accessToken || !user) {
      return false;
    }
    const isAllowed: any = user.permissions.filter(res => res.indexOf(resource) !== -1);
    return isAllowed.length > 0;
  }
}
