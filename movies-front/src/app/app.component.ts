import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;
  isLoggedIn = false;
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
  }
  changeTheme() {
    if(this.darkMode)
      this.setDarkTheme();
    else
      this.setLightTheme();
  }

  setDarkTheme() {
    document.getElementById('body')?.classList.remove('light-theme');
    document.getElementById('body')?.classList.add('dark-theme');
  }

  setLightTheme() {
    document.getElementById('body')?.classList.remove('dark-theme');
    document.getElementById('body')?.classList.add('light-theme');
  }
}
