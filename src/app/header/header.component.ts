import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LoginService } from '../auth/login/login.service'

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  show: boolean;

  constructor(
    private route: Router,
    private loginService: LoginService
  ) {
    this.routeEvent(this.route);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url == '/login') {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

}
