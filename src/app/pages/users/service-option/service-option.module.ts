import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOptionRoutingModule } from './service-option-routing.module';
import { ServiceOptionComponent } from './service-option.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServiceOptionComponent
  ],
  imports: [
    CommonModule,
    ServiceOptionRoutingModule,
    FormsModule
  ]
})
export class ServiceOptionModule { }
