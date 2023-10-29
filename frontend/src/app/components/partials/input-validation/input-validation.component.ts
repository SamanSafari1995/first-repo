import { Component , OnInit , OnChanges, SimpleChanges, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any={
required: 'Should not be Empty',
email: 'Email is not Valid',
minlength: 'Your password must be greater than 6 char',
notMatch: 'Pass and ConfirmPass are not the same',
maxlength: 'The name is too Long :)'
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages:string[] = [];
  constructor () {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }


  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    })

    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }


    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
