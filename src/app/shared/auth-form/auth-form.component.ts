import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, filter } from 'rxjs';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AuthService } from 'src/app/pages/users/services/auth.service';

const actionType = {
  signIn: {
    action: 'signIn',
    title: 'Sign In',
  },
  signUp: {
    action: 'signUp',
    title: 'Sign up',
  },
} as const;

type ActionType = keyof typeof actionType;

@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class AuthFormComponent implements OnInit {
  @Input() action!: ActionType;
  form!: FormGroup;
  title!: string;

  user$!: Observable<any>;
  private readonly authSvc = inject(AuthService);

  /* El código `private readonly fb = inject(FormBuilder);` utiliza la inyección de dependencia para
   inyectar el servicio `FormBuilder` en la propiedad `fb` de la clase. Esto permite que la clase
   utilice el servicio `FormBuilder` para crear y administrar formularios. */
  private readonly fb = inject(FormBuilder);
  private readonly emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  /**
   * La función ngOnInit inicializa la variable de título según el tipo de acción y luego llama a la
   * función initForm.
   */
  ngOnInit(): void {
    this.title =
      this.action === actionType.signIn.action
        ? actionType.signIn.title
        : actionType.signUp.title;
    this.initForm();

    this.user$ = this.authSvc.userState$;
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.action === actionType.signIn.action
      ? this.authSvc.signIn(email, password)
      : this.authSvc.signUp(email, password);
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName?.invalid && fieldName.touched;
  }

  signInGoogle(): void {
    //este sera el metodo que utilizaremos para iniciar sesion con google.
    this.authSvc.signInGoogle();
  }

  /**
   * La función inicializa un formulario con campos de correo electrónico y contraseña, aplicando
   * validadores obligatorios y de patrón/longitud a cada campo.
   */
  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
}
