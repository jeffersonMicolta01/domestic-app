import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionRoutingModule } from './calificacion-routing.module';
import { CalificacionComponent } from './calificacion.component';



@NgModule({
  declarations: [
    CalificacionComponent
  ],
  imports: [
    CommonModule,
    CalificacionRoutingModule,

  ]
})
export class CalificacionModule { }
