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
    console.log(this.basicForm.value);

    // resets form value after submission
    this.basicForm.get('name').reset();
    this.basicForm.get('age').reset();

    // toastr prompt
    this.toastr.success(
      'Form Submitted!',
      'Values logged in console and form reset!'
    );
  }
}
