import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/pages/users/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  user$!: Observable<User | null>;
  
  private readonly authSvc = inject(AuthService);

  /**
   * El constructor inicializa la propiedad user$ con el userState$ observable desde el servicio
   * authSvc.
   */
  constructor() {
    this.user$ = this.authSvc.userState$;
  }

  /**
   * La función `onSignOut` cierra la sesión del usuario llamando al método `signOut` del objeto
   * `authSvc`.
   */
  async onSignOut(): Promise<void> {
    this.authSvc.signOut();
  }
}
