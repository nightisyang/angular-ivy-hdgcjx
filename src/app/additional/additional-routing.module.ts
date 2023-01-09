import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameConcatComponent } from './name-concat/name-concat.component';
import { BMICalcComponent } from './bmi-calc/bmi-calc.component';
import { LifecycleDemoComponent } from './lifecycle-demo/lifecycle-demo.component';
import { HelloComponent } from '../hello.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'bmi', component: BMICalcComponent },
  { path: 'name-concat', component: NameConcatComponent },
  { path: 'lifecycle', component: LifecycleDemoComponent },
  { path: 'hello', component: HelloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalRoutingModule {}
