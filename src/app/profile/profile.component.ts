import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppAuthService} from "../app.auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit {
  constructor(private router: Router, private auth: AppAuthService) {
  }

  profileForm: FormGroup | any;
  telephoneForm: FormGroup | any;
  nextOfKinForm: FormGroup | any;

  ngOnInit(): void {
    this.auth.getUserProfile().subscribe(resData => {
      if (resData.status === "success") {
        // this.router.navigate(["dashboard"]);
      }
      this.profileForm = new FormGroup({
        "fullName": new FormControl(null, [Validators.required]),
        "username": new FormControl(null, [Validators.required]),
        "emailAddress": new FormControl(null, [Validators.email, Validators.required]),
        "dateOfBirth": new FormControl(null, [Validators.required])
      })
    });
  }
}
