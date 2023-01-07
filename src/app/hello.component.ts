import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements OnInit, OnDestroy {
  constructor(private toastr: ToastrService) {}
  @Input() name: string;

  ngOnInit() {
    this.toastr.success('Hello!', 'Greeting from ngOnInit()');
  }

  ngOnDestroy() {
    this.toastr.error('Goodbye! Safe journey!', '-xoxo <hello> ngOnDestroy()');
  }
}
