import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/users/services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userState$.pipe(
    take(1),
    tap((res) => console.log(!!res)),
    tap((isLoggedIn) => (isLoggedIn ? router.navigate(['/user/sign-in']) : true))
  );
};
