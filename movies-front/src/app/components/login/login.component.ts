import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private localStorage: LocalstorageService) { }

  ngOnInit(): void {
  }
  login(data: any) {
    this.userService.login(data).subscribe(res => {
       this.localStorage.setItem('token', res.data.token);
       this.router.navigate([""]);
    }, error => {
      console.log(error);
    });
  }
}
