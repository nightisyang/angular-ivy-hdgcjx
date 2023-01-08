import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AdditionalRoutingModule } from './additional-routing.module';
import { NameConcatComponent } from './name-concat/name-concat.component';
import { BMICalcComponent } from './bmi-calc/bmi-calc.component';
import { LifecycleDemoComponent } from './lifecycle-demo/lifecycle-demo.component';
import { HelloComponent } from '../hello.component';

// import the components

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    AdditionalRoutingModule,
  ],
  declarations: [
    NameConcatComponent,
    BMICalcComponent,
    LifecycleDemoComponent,
    HelloComponent,
  ],
  exports: [
  ],
})
export class AdditionalModule {}
