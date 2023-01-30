import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AppAuthService} from "../app.auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean = false;
  errorOccurred: Boolean = false;
  creationSuccess:boolean = false;
  successMessage:string = "User Created";
  errorThatOccurred:string = "";
  constructor(private router:Router, private authService:AppAuthService) {
  }
  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const emailAddress = form.value.emailAddress;
    const username = form.value.username;
    const fullName = form.value.fullName;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    this.isLoading = true;
    this.authService.signUp(username,fullName,emailAddress,password,confirmPassword).subscribe(resData => {
      this.creationSuccess=true;
      this.successMessage = resData.message;

      form.reset()
      setTimeout(()=>{
          this.creationSuccess = false;
          this.isLoading = false;
          this.router.navigate(["login"])
          },2000
        )
    },
      error => {
        this.isLoading = false;
        this.errorOccurred = true;
        this.errorThatOccurred = error.error.message;
        setTimeout(()=>{
          this.errorOccurred = false;
          },10000
        )
      }
      );
  }

  onRouteToLogin(){
    this.router.navigate(["login"])
  }
}
