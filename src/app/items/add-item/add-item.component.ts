import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { ItemService } from '../items.service'

@Component({
  selector: 'sc-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService
  ) { }


  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]]
    });
  }

  onSubmit(formData) {
    if (this.itemForm.invalid) {
      alert("Please, complete all required fields (*)");
      return;
    }

    this.itemService.save(formData).subscribe(
      item => {
        // alert("Item created!");
        this.router.navigate(['/']);
      },
      err => { alert(JSON.stringify(err)) }
    )
  }

}
