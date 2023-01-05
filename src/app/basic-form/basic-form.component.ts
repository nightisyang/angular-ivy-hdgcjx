import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent implements OnInit {
  basicForm: UntypedFormGroup;
  constructor(
    /**
     * - in order to use FormBuilder, need to import the ReactiveFormsModule & FormsModule
     */
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // create and init the form
    this.initForm();
  }

  initForm() {
    this.basicForm = this.fb.group({
      name: [''],
      age: 0,
    });
  }

  onSubmit() {
    console.log('submitted');
    // logs out value of form
    const basicFormVal = this.basicForm.value;
    console.log(basicFormVal);

    // toastr prompt
    this.toastr.success(
      `Form Submitted! Name: ${basicFormVal.name} Age: ${basicFormVal.age}`,
      'Values logged in console and form reset!'
    );

    // resets form value after submission
    const nameControl = this.basicForm.get('name');
    const ageControl = this.basicForm.get('age');

    nameControl.reset();
    ageControl.reset();
  }
}
