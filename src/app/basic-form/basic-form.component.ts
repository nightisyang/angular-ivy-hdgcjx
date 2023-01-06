import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormGroup,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicFormInterface } from '../interface/basic-form-model';
import { FirstLastNameInterface } from '../interface/firstlast-name-model';

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
      age: new FormControl<number | null>(null, [
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
    const nameControl = this.basicForm.controls.name;
    const ageControl = this.basicForm.controls.age;

    // assigning the wrong types not possible due to type safety from inferred type from FormBuilder
    // console.log(nameControl.setValue(1)); // expected to error out
    // console.log(ageControl.setValue('asdfasd')); // expected to error out

    // resets form value after submission

    nameControl.reset();
    ageControl.reset();
  }
}
