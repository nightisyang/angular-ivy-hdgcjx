import { Component } from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  templateUrl: './lifecycle-demo.component.html',
  styleUrls: ['./lifecycle-demo.component.css'],
})
export class LifecycleDemoComponent {
  surprise: boolean = false;

  toggleSurprise() {
    this.surprise = !this.surprise;
  }
}
