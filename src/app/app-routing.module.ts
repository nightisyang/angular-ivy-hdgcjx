import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BasicFormComponent } from './basic-form/basic-form.component';

const routes: Routes = [
  {
    path: 'basic-form',
    component: BasicFormComponent,
  },
  {
    // these are lazily loaded
    path: 'additional',
    loadChildren: () =>
      import('./additional/additional.module').then((m) => m.AdditionalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
