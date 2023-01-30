import { Component } from '@angular/core';
import {AppAuthService} from "../app.auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private authService:AppAuthService) {
  }
  onLogout() {
    this.authService.logout();
  }
}
