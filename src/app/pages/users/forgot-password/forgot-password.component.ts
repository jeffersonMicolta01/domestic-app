import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  private authSvc = inject(AuthService);
  title = 'Reset your password';
  email!: FormControl;
  isEmailSent = false;

 

  /* El "patrón de correo electrónico privado de solo lectura" es un patrón de expresión regular que se
  utiliza para validar direcciones de correo electrónico. Comprueba si la dirección de correo
  electrónico sigue un formato específico. */
  private readonly emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

 /**
  * La función comprueba si la entrada del correo electrónico no es válida y ha sido tocada.
  * @returns un valor booleano.
  */
  hasError(): boolean {
    return !! this.email.invalid && this.email.touched;
  }

  constructor(private router: Router) {}

  /**
   * La función `onSubmit` es una función asincrónica que maneja el envío de un formulario, envía un
   * correo electrónico para restablecer la contraseña utilizando un servicio de autenticación y
   * registra cualquier error que ocurra.
   * @param {Event} event - El parámetro "evento" es de tipo "Evento" y representa el evento que
   * desencadenó el envío del formulario. Se utiliza para evitar el comportamiento de envío de
   * formulario predeterminado llamando al método `stopPropagation()`.
   */
  async onSubmit(event: Event): Promise<void> {
    event?.stopPropagation();
    try {
      this.isEmailSent = true;
      await this.authSvc.sendPasswordResetEmail(this.email?.value);
      setTimeout(() => {
        this.isEmailSent = false;
        // Redirección, por ejemplo:
        this.router.navigate(['/user/sign-in']);
      }, 4000);
    } catch (error: unknown) {
      this.isEmailSent = false;
      console.log('Reset Password', error);
    }
  }

  /**
   * La función ngOnInit se llama cuando se inicializa el componente y llama a la función
   * iniEmailfield.
   */
  ngOnInit(): void {
    this.iniEmailfield();
  }

  /**
   * La función inicializa un campo de formulario de correo electrónico con la validación requerida y
   * una validación de patrón utilizando una expresión regular.
   */
  private iniEmailfield(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]);
  }
}
