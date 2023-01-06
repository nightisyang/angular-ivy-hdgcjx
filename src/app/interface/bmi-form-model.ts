import { FormControl } from '@angular/forms';

export interface BMIInterface {
  weight: FormControl<number>;
  height: FormControl<number>;
}
