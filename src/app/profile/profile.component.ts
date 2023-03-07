import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppAuthService} from "../app.auth.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{
  constructor(private router: Router, private auth:AppAuthService) {
  }
  profileForm: FormGroup | any;

  ngOnInit(): void {
    this.profileForm = new FormGroup({

    })
  }


}
