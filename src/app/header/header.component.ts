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
  routesToHide: string[];

  constructor(
    private route: Router,
    private loginService: LoginService
  ) {
    this.routesToHide = [
      '/login', '/users'
    ];
    this.routeEvent(this.route);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd)
        this.show = this.routesToHide.indexOf(e.url) == -1;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

}
