import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserInterface';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Wellcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
   }

   register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Wellcome to Foodmine ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
     }))

   }

   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    window.location.reload();
   }

  private setUserToLocalStorage(user:User){
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if(userJson) return JSON.parse(userJson) as User;

    return new User();
  }
}