import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/users/services/auth.service';

export const onlyLoggedInGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  /* El código crea una función de protección llamada "onlyLoggedInGuard" que se puede usar para
  proteger rutas en una aplicación Angular. */
  return authService.userState$.pipe(
    take(1),
    tap((isLoggedIn) =>
      !!isLoggedIn ? true : router.navigate(['/user/sign-in'])
    )
  );
};
