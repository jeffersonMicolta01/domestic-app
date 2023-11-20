import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceOptionComponent } from './service-option.component';

const routes: Routes = [{ path: '', component: ServiceOptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceOptionRoutingModule { }
