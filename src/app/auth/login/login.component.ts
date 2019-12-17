import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { LoginService } from './login.service'

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUserPlus = faUserPlus;
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(formData) {
    if (this.loginForm.invalid) {
      alert("Please, inform user and password");
      return;
    }

    this.loginService.logon(formData)
      .subscribe(
        data => {
          localStorage['token'] = data['token'];
          this.router.navigate(['/home']);
        },
        err => {
          let msg: string = "Error: " + JSON.stringify(err);
          if (err['status'] == 401) {
            msg = "Invalid user and password"
          } else
            console.log(err)

          alert(msg)
          // this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );

  }

}
