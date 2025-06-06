import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateRole: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];
  const actualRole = auth.getRole();

  if (auth.isLoggedIn() && expectedRoles.includes(actualRole || '')) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
