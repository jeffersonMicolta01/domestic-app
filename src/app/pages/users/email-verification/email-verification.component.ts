import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, tap } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent {
  /* `usuario$!: Observable<Usuario | null>;` está declarando una propiedad `usuario$` de tipo
  `Observable<Usuario | nulo>`. El símbolo `!` indica que la propiedad está definitivamente
  asignada, lo que significa que no será nula ni indefinida. */
  user: User | null = null;

  private readonly authSvc = inject(AuthService);

  /**
   * La función constructora se suscribe al userState$ observable del servicio authSvc, filtra los
   * valores nulos y registra el objeto de usuario en la consola.
   */
  constructor() {
    this.authSvc.userState$
      .pipe(
        filter((authState) => authState !== null),
        tap((user) => (this.user = user)),
        tap(()=>this.authSvc.signOut)
      )
      .subscribe();
  }

  onResendemail(): void {
    if (this.user) {
      this.authSvc.sendEmailVerification(this.user);
    }
  }
}
