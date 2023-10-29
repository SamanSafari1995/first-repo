import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  isSubmitted: boolean = false;
  returnUrl:string = ''
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['' , [Validators.required , Validators.maxLength(5)]],
      email: ['' , [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      address: ['', Validators.required]
    },{
      validators:PasswordsMatchValidator('password', 'confirmPass')
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user:IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPass: fv.confirmPass,
      address: fv.address
    };

    this.userService.register(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
