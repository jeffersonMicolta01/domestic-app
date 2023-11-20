import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { onlyLoggedInGuard } from './shared/guards/only-logged-in.guard';

const routes: Routes = [
  {
    path: 'user/sign-up',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/users/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'user/sign-in',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/users/sign-in/sign-in.module').then(
        (m) => m.SignInModule
      ),
  },
  {
    path: 'user/profile',
    canActivate: [onlyLoggedInGuard],
    loadChildren: () =>
      import('./pages/users/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'user/email-verification',
    loadChildren: () =>
      import('./pages/users/email-verification/email-verification.module').then(
        (m) => m.EmailVerificationModule
      ),
  },
  {
    path: 'user/forgot-password',
    loadChildren: () =>
      import('./pages/users/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user/supplier',
    loadChildren: () =>
      import('./pages/users/supplier/supplier.module').then(
        (m) => m.SupplierModule
      ),
  },
  {
    path: 'user/service-option',
    loadChildren: () =>
      import('./pages/users/service-option/service-option.module').then(
        (m) => m.ServiceOptionModule
      ),
  },
  {
    path: 'user/calificacion',
    loadChildren: () =>
      import('./pages/users/calificacion/calificacion.module').then(
        (m) => m.CalificacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
