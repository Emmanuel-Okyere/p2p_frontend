import {Component, OnInit} from '@angular/core';
import {AppAuthService} from "./app.auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:AppAuthService) {}
  title = 'p2p-frontend';

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
