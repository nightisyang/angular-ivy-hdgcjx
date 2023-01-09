import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { FirstLastNameInterface } from '../../interface/firstlast-name-model';

@Component({
  selector: 'app-name-concat',
  templateUrl: './name-concat.component.html',
  styleUrls: ['./name-concat.component.css'],
})
export class NameConcatComponent implements OnInit {
  nameForm: FormGroup<FirstLastNameInterface>;
  resNameConcat: string;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.initNameForm();
  }

  initNameForm() {
    this.nameForm = this.fb.group({
      firstname: new FormControl<string | null>('', Validators.required),
      lastname: new FormControl<string | null>('', Validators.required),
    });
  }

  onNameClick() {
    console.log('button pressed');

    // error handling, if invalid prompt invalid and return
    if (this.nameForm.invalid) {
      this.toastr.error(
        'Please enter a valid firstname or lastname',
        'Invalid names'
      );
      return;
    }

    // https://www.learnrxjs.io/learn-rxjs/operators/creation/create
    // making an observable
    const concatObsrv = Observable.create((observer) => {
      let value = 0;

      const interval = setInterval(() => {
        // emit a value every 2 seconds
        if (value % 2 === 0) {
          observer.next(value);
        }

        // execute the following when 10 seconds has passed
        if (value === 10) {
          console.log('executing string concat');
          this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;
          this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');
        }

        // increment value every 1000ms interval
        value++;
      }, 1000);

      // observable returns clearInterval when unsubscribed
      return () => clearInterval(interval);
    });

    // initiate subscription to observable
    const subscribe = concatObsrv.subscribe((val) => console.log(val));

    // after 11 seconds, unsubscribe, concatObsrv will return clearInterval
    setTimeout(() => {
      subscribe.unsubscribe();
    }, 11000);

    // concatenate firstname and lastname
    // this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;

    // names valid, prompt success
    // this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');
    console.log('this log is at the end of function');
  }

  get firstname() {
    return this.nameForm.controls.firstname;
  }

  get lastname() {
    return this.nameForm.controls.lastname;
  }
}
