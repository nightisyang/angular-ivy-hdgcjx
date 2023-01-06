# angular-ivy-hdgcjx

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-hdgcjx)

## Part 1: simple form
1. Create simple form consist of:
    - [x] text input 
    - [x] number input
    - [x] dropdown input
    - [x] checkbox input

2. click submit button to console.log() the form value, display success message, and reset the form on submit
    - [x] console.log on submit
    - [x] display success message
    - [x] reset the form on submit

3. library involves:
    - [x] bootstrap 5
    - [x] angular form group
    - [x] toastr

4. Goals:
    - [x] able to retrieve value from FormGroup
    - [x] able to update value from FormGroup
    - [x] able to display value from FormGroup
    - [x] able to make use of formControl
    - [x] able to link HTML Template and also Typescript
    
## Part 1a: strict type form, using TypedFormGroup
1. in part 1, simple form were using the UntypedFormGroup. 
    - [x] Convert the current UntypedFormGroup, into TypedFormGroup

2. create a model for the TypedFormGroup
    - [x] TypedFormGroup model

3. Goals:
    - [x] able to implement strictly typed form
    - [x] able to explain the usage scenarios
    - [x] able to add Typed Form Group Model
    
## Part 2: validation
1. From the form created in part 1, add validation message when error input added
    - [x] display error in forms when user enters wrong type in forms

2. Display error message when clicking submit, but the form is invalid
    - [x] prompt using toastr invalid to user when onSubmit()

3. click submit button to display success message when the form is valid.
    - [x] if form is valid, display success prompt using toastr when onSubmit()

4. library involves:
    - bootstrap 5
    - angular form group
    - toastr

## Part 3: Event Listener
1. Add an event listener to the at least 2 of the input eg. string concatenation, bmi calculation 
    - [x] Implemented both examples
2. With every changes on the value, run event listener 
    - [x] Listening to click event on button , call function
3. Display the result from the event listener 
    - [x] function takes values from two input fields, concat and calcs respectively and outputs result

##Part 4: Disable and enable input
1. With the form and inputs created, create an additional button.
    - [x] Created addition button for basicForm
2. Add an event listener to the button, to make the inputs enabled all, disabled all, disabled partially, and enable partially.
    - [x] Listen to click event on button, calls onDisableInput() - function that toggles through presets to disable all inputs, enable all inputs, disable one input, enable one input
3. Console log the form value (including the disabled inputs). tips: use getRawValue() for disabled inputs
 - [x] logged out values for each event, using both control.value and control.getRawValue()

## Part 5: RXJS basic
1. From the function that you created in basic angular form part 3, make it asynchronous (sequential) using RXJS observable. (using mergeMap, concatMap, Observable, etc.)
    - [x] string concat operation is placed in an observable and is only executed when interval has passed. subscription to observable necessary to observe stream.
2. Prove the function run sequential using console.log()
    - [x] done

## Part 6: Angular Lifecycle:
1. Implment angular lifecycles such as:
    - [x] ngOnInit
    - [x] ngAfterViewInit
    - [x] ngOnDestroy

2. Goals:
    - [x] able to know and explain the usage
    - [x] able to differentiate between constructor, and ngOnInit
    - [x] bonus if able to implement additional lifecycles




