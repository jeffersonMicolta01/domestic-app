import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  template: `<app-auth-form [action]="'signUp'"/>`,
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

}
