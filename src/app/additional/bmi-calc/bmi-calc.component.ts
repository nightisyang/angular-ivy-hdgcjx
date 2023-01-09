import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BMIInterface } from '../../interface/bmi-form-model';

@Component({
  selector: 'app-bmi-calc',
  templateUrl: './bmi-calc.component.html',
  styleUrls: ['./bmi-calc.component.css'],
})
export class BMICalcComponent implements OnInit {
  BMIForm: FormGroup<BMIInterface>;
  resBMICalc: string;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.initBMIForm();
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

  get weight() {
    return this.BMIForm.controls.weight;
  }

  get height() {
    return this.BMIForm.controls.height;
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
      bmiCategory = 'Obese';
    }

    this.resBMICalc = `${bmi.toFixed(1)} - ${bmiCategory}`;

    this.toastr.success(`You are ${bmiCategory}!`, 'BMI Calculated!');
  }
}
