import { FormControl } from "@angular/forms"

export interface BasicFormInterface {
  name: FormControl<string>;
  age: FormControl<number>;
}