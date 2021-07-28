import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
