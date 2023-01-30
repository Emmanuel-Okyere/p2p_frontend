import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppAuthService} from "../app.auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorOccurredMessage:string= "";
  errorOccurred:boolean = false;
  isLoading:boolean = false;
  constructor(private router: Router, private auth:AppAuthService) {
  }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "emailAddress": new FormControl(null, [Validators.required,Validators.email]),
      "password": new FormControl(null,[Validators.required,Validators.minLength(7)])
    })
  }
  routeToRegister() {
    this.router.navigate(["register"])
  }

  onSubmit(){
    this.isLoading = true;
    this.auth.loginUser(this.loginForm.value.emailAddress,this.loginForm.value.password).subscribe(resData=>{
      if (resData.status==="success"){
        this.isLoading = false;
        this.router.navigate(["dashboard"]);
      }
      else if (resData.status==="failure"){
        this.errorOccurred=true;
        this.errorOccurredMessage=resData.message;
        this.isLoading = false;
        setTimeout(() => {this.errorOccurred=false},3000)
      }      }, error => {
      this.errorOccurred=true;
      this.errorOccurredMessage="Unknown Error Occurred";
    })
  }
}
