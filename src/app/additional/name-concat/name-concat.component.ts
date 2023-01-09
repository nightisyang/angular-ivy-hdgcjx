import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { of, Observable, mergeMap } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
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

    // emit delay value
    const source = of(2000, 1000);

    const printNameAsync = (val) => {
      return new Observable((subscribe) => {
        console.log(val);
        this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;
        this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');

        subscribe.next(this.resNameConcat);
        subscribe.complete();
      });
    };

    // map value from source into inner observable, when complete emit results and move to next
    const example = source.pipe(
      mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val))),
      mergeMap((val) => printNameAsync(val))
    );

    const subscribe = example.subscribe((val) =>
      console.log(`With concatMap: ${val}`)
    );

    // console.log('executing string concat');
    // this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;
    // this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');

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
