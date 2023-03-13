import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppAuthService} from "../app.auth.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit {
  constructor(private router: Router, private auth: AppAuthService) {
  }

  profileForm: FormGroup | any;
  // telephoneForm: FormGroup | any;
  // nextOfKinForm: FormGroup | any;

  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(resData => {
      if (resData.status === "success") {
        this.profileForm = new FormGroup({
          "fullName": new FormControl({value:resData.userProfile.user.fullName, disabled:true}, [Validators.required]),
          "username": new FormControl({value:resData.userProfile.user.username,disabled:true}, [Validators.required]),
          "emailAddress": new FormControl({value:resData.userProfile.user.emailAddress,disabled:true}, [Validators.email, Validators.required]),
          "dateOfBirth": new FormControl(resData.userProfile.dateOfBirth, [Validators.required]),
          "digitalAddress": new FormControl(resData.userProfile.digitalAddress, [Validators.required]),
          "userTelephoneNumber":new FormControl(null, [Validators.required]),
          "nextOfKinFullName":new FormControl(resData.userProfile.nextOfKin.fullName, [Validators.required]),
          "nextOfKinEmailAddress":new FormControl(resData.userProfile.nextOfKin.emailAddress, [Validators.required]),
        })
      }
      else {
        alert(resData.message)
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.getRawValue());
    // console.log(this.nextOfKinForm.value);
  }

}
