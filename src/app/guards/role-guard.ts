import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('usuarioBuy&Sell')!);
  const roles: string[] = route.data['roles'];

  if(!roles.includes(user.rol)) {
    router.navigate(['/403error']);
    return false;
  }
  return true;
};
