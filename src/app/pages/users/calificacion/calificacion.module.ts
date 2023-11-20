import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionRoutingModule } from './calificacion-routing.module';
import { CalificacionComponent } from './calificacion.component';
import { FormControl, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CalificacionComponent
  ],
  imports: [
    CommonModule,
    CalificacionRoutingModule,
    FormControl,
    FormsModule
  ]
})
export class CalificacionModule { }
