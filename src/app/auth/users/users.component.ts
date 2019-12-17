import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router';

import { UsersService } from './users.service'
import { UserModel } from './users.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'sc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  edit: boolean;
  user: UserModel;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.edit = false;
    this.user = new UserModel(null, null, null, null);
    if (this.router.url == '/profile') {
      this.usersService.getUserById().subscribe(user => {
        this.user = user;
        this.user.password = '';
        this.edit = true;
        this.configureForm();
      })
    }
    this.configureForm();
  }

  configureForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(formData) {
    if (this.userForm.invalid) {
      alert("Please, complete all required fields (*)");
      return;
    }

    let result = this.usersService.saveUser(formData);
    if (this.edit)
      result = this.usersService.updateUser(formData);
    
    result.subscribe(
      user => { this.redirect() },
      err => { alert(err.error.message) }
    )
  }

  redirect(): void {
    let operation = this.edit ? 'updated' : 'created';
    let navigate = this.edit ? '/' : '/login';
    alert(`Account ${operation}!`);
    this.router.navigate([navigate]);
  }

}
