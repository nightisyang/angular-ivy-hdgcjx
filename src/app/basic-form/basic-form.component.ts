import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormGroup,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { BasicFormInterface } from '../interface/basic-form-model';
import { FirstLastNameInterface } from '../interface/firstlast-name-model';
import { BMIInterface } from '../interface/bmi-form-model';

/** Place Model/Interface in separate folder
 * interface model for basicForm
 * interface BasicFormType {
 *    name: FormControl<string>;
 *    age: FormControl<number>;
 *  }
 */

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent implements OnInit {
  // UntypedFormGroup is a non-strongly-typed version of FormGroup
  // basicForm: UntypedFormGroup;

  // change from the above to strongly typed version of FormGroup
  // FormGroup - Tracks the value and validity state of a group of FormControl instances.
  // FormControl - Tracks the value and validation status of an individual form control.

  // basicForm contains a group of values and these values are FormControl <any> types
  // assign type from BasicFormType interface
  basicForm: FormGroup<BasicFormInterface>;
  nameForm: FormGroup<FirstLastNameInterface>;
  BMIForm: FormGroup<BMIInterface>;
  resNameConcat: string;
  resBMICalc: string;
  toggleVal: number = 0;
  toggle = {
    0: {
      btnName: 'Disable All Inputs',
      btnClass: 'btn-danger',
      method: () => {
        console.log('disabling all...');
        this.basicForm.disable();
        this.basicFormValRawVal();
      },
    },
    1: {
      btnName: 'Enable All Inputs',
      btnClass: 'btn-primary',
      method: () => {
        console.log('enabling all...');
        this.basicForm.enable();
        this.basicFormValRawVal();
      },
    },
    2: {
      btnName: 'Disable Name Input',
      btnClass: 'btn-danger',
      method: () => {
        console.log(
          'disabling name... watch name property dissapear in basicForm.val'
        );
        this.name.disable();
        this.basicFormValRawVal();
      },
    },
    3: {
      btnName: 'Enable Name Input',
      btnClass: 'btn-primary',
      method: () => {
        console.log('enabling name...');
        this.name.enable();
        this.basicFormValRawVal();
      },
    },
  };
  basicFormValRawVal = (): void => {
    console.log('basicForm Val:', this.basicForm.value);
    console.log('basicForm rawVal :', this.basicForm.getRawValue());
  };

  /** DEPRECATED https://angular.io/api/forms/FormBuilder#methods
   *FormBuilder is syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray, also infers types
   *code is from initForm() - declaring it directly from fb assigns type through type inferrence
   *if basicForm: FormGroup is declared, it's is assigned to <any>
   *https://blog.angular-university.io/angular-typed-forms/ see common pitfalls
   *basicForm = this.fb.group({
   *  name: [''],
   *  age: 0,
   *});
   */

  constructor(
    /**
     *
     * - in order to use FormBuilder, need to import the ReactiveFormsModule & FormsModule
     */
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // create and init the form
    this.initForm();
    this.initNameForm();
    this.initBMIForm();
  }

  initForm() {
    /** DEPRECATED https://angular.io/api/forms/FormBuilder#methods
     * FormBuilder is syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray, also infers types
     * this.basicForm = this.fb.group({
     *   name: [''],
     *  age: 0,
     * });
     */

    // official way to assign types
    // https://stackoverflow.com/a/72708372
    this.basicForm = this.fb.group({
      name: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      age: new FormControl<number | null>(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
      ]),
    });
  }

  initNameForm() {
    this.nameForm = this.fb.group({
      firstname: new FormControl<string | null>('', Validators.required),
      lastname: new FormControl<string | null>('', Validators.required),
    });
  }

  initBMIForm() {
    this.BMIForm = this.fb.group({
      weight: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      height: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  get name() {
    return this.basicForm.controls.name;
  }

  get age() {
    return this.basicForm.controls.age;
  }

  get firstname() {
    return this.nameForm.controls.firstname;
  }

  get lastname() {
    return this.nameForm.controls.lastname;
  }

  get weight() {
    return this.BMIForm.controls.weight;
  }

  get height() {
    return this.BMIForm.controls.height;
  }

  onSubmit() {
    console.log('submitted');
    // logs out value of form
    const basicFormVal = this.basicForm.value;
    console.log(basicFormVal, this.basicForm.valid);

    // toastr prompt and return if form invalid
    if (this.basicForm.invalid) {
      this.toastr.warning(
        'Values entered are not valid, please re-enter values',
        'Invalid Form'
      );
      return;
    }

    // toastr prompt
    this.toastr.success(
      `Form Submitted! Name: ${basicFormVal.name} Age: ${basicFormVal.age}`,
      'Values logged in console and form reset!'
    );

    // const nameControl = this.basicForm.get('name');
    // const ageControl = this.basicForm.get('age');

    // use this to allow compiler to detect error, 'name' might be mispelled in .get('name')
    // const nameControl = this.basicForm.controls.name;
    // const ageControl = this.basicForm.controls.age;

    // assigning the wrong types not possible due to type safety from inferred type from FormBuilder
    // console.log(nameControl.setValue(1)); // expected to error out
    // console.log(ageControl.setValue('asdfasd')); // expected to error out

    // resets form value after submission

    this.name.reset();
    this.age.reset();
  }

  onDisableInput() {
    // calls function in toggle object to respective state assigned by toggleVal
    this.toggle[this.toggleVal].method();

    // increments toggleVal to cycle through presets
    this.toggleVal++;
    // reassignes toggleVal to 0 when out of range
    if (this.toggleVal === 4) {
      this.toggleVal = 0;
    }
  }

  onNameClick() {
    console.log('button pressed');
    // const firstnameCtrl = this.nameForm.controls.firstname;
    // const lastnameCtrl = this.nameForm.controls.lastname;
    // console.log(firstnameCtrl.value, lastnameCtrl.value);

    // error handling, if invalid prompt invalid and return
    if (this.nameForm.invalid) {
      this.toastr.error(
        'Please enter a valid firstname or lastname',
        'Invalid names'
      );
      return;
    }

    // https://www.learnrxjs.io/learn-rxjs/operators/creation/create

    const concatObsrv = Observable.create((observer) => {
      let value = 0;

      const interval = setInterval(() => {
        if (value % 2 === 0) {
          observer.next(value);
          // concatenate firstname and lastname after two seconds
          // this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;
          // this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');
        }

        if (value === 10) {
          console.log('executing string concat');
          this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;
          this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');
        }
        value++;
      }, 1000);

      return () => clearInterval(interval);
    });

    const subscribe = concatObsrv.subscribe((val) => console.log(val));

    setTimeout(() => {
      subscribe.unsubscribe();
    }, 11000);

    // concatenate firstname and lastname
    // this.resNameConcat = `${this.firstname.value} ${this.lastname.value}`;

    // names valid, prompt success
    // this.toastr.success(`Hello ${this.resNameConcat}!`, 'Welcome!');
    console.log('this log is at the end of function');
  }

  onBMIClick() {
    console.log('calculating...');

    console.log(this.weight.value, this.height.value);

    if (this.BMIForm.invalid) {
      this.toastr.error(
        'Weight or Height values are not valid!',
        'Invalid values'
      );

      return;
    }

    const heightInM = this.height.value / 100;

    const bmi = this.weight.value / (heightInM * heightInM);
    let bmiCategory: string;

    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Healty weight';
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
    } else if (bmi >= 30) {
      bmiCategory = 'Obesity';
    }

    this.resBMICalc = `${bmi.toFixed(1)} - ${bmiCategory}`;

    this.toastr.success(`You are ${bmiCategory}!`, 'BMI Calculated!');
  }
}
