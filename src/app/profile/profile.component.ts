import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppAuthService} from "../app.auth.service";
import {
  formRequest,
  NextOfKin,
  userProfile,
  UserProfileRequest,
  UserProfileResponse
} from "../models/UserProfile.model";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit {
  constructor(private router: Router, private auth: AppAuthService) {
  }

  profileForm: FormGroup | any;
  formInputs: formRequest = {} as formRequest;
  errorOccurredMessage:string= "";
  errorOccurred:boolean = false;
  isLoading:boolean = false;
  nextOfKin:NextOfKin | null = {} as NextOfKin;
  usersProfile:UserProfileRequest = {} as UserProfileRequest;




  usersSaveProfile:UserProfileRequest = {} as UserProfileRequest;
  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(resData => {
      if (resData.status === "success") {
          this.nextOfKin = resData.userProfile.nextOfKin?resData.userProfile.nextOfKin: null;
          let next = !!this.nextOfKin;
          let tel = !!resData.userProfile.telephoneNumber

          this.profileForm = new FormGroup({
          "fullName": new FormControl({value:resData.userProfile.user.fullName, disabled:true}, [Validators.required]),
          "username": new FormControl({value:resData.userProfile.user.username,disabled:true}, [Validators.required]),
          "emailAddress": new FormControl({value:resData.userProfile.user.emailAddress,disabled:true}, [Validators.email, Validators.required]),
          "dateOfBirth": new FormControl(resData.userProfile?.dateOfBirth, [Validators.required]),
          "digitalAddress": new FormControl(resData.userProfile?.digitalAddress, [Validators.required]),
          "userTelephoneNumber":new FormControl({value:resData.userProfile?.telephoneNumber?.at(0)?.number, disabled:tel}, [Validators.required]),
          "nextOfKinFullName":new FormControl({value:this.nextOfKin?.fullName , disabled:next}, [Validators.required]),
          "nextOfKinEmailAddress":new FormControl({value:this.nextOfKin?.emailAddress , disabled:next}, [Validators.required]),
        })
      }
      else {
        alert(resData.message)
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.formInputs = this.profileForm.getRawValue();
    console.log(this.formInputs)
    this.usersSaveProfile.dateOfBirth = this.formInputs.dateOfBirth;
    this.usersSaveProfile.digitalAddress = this.formInputs.digitalAddress;
    this.usersSaveProfile.nextOfKin ={
      fullName: this.formInputs.nextOfKinFullName,
      emailAddress:  this.formInputs.nextOfKinEmailAddress,
    };
    this.usersSaveProfile.telephoneNumber = [{number: this.formInputs.userTelephoneNumber}]
    console.log(this.usersSaveProfile)
    this.auth.saveUserProfile(this.usersSaveProfile).subscribe(resData => {
      if(resData.status==="success"){
        this.errorOccurredMessage = resData.message;
        this.isLoading = false;
        this.errorOccurred=false;
      }
      else{
        this.errorOccurred=true;
        this.errorOccurredMessage="An Error Occurred";
        this.isLoading = false;
        setTimeout(() => {this.errorOccurred=false},3000)
      }      }, error => {
      this.errorOccurred=true;
    });
  }

}
