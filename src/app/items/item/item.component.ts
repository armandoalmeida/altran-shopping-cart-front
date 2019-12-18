import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from '../items.service'
import { ItemModel } from '../item.model';

@Component({
  selector: 'sc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  item: ItemModel;
  edit:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.item = new ItemModel(null, null, null);
    this.edit = false;
    let itemId = this.route.snapshot.paramMap.get("id");
    if (itemId) {
      this.itemService.get(itemId).subscribe(item => {
        this.item = item;
        this.edit = true;
        this.configureForm();
      });
    }
    this.configureForm();
  }

  configureForm() {
    this.itemForm = this.formBuilder.group({
      name: [this.item.name, [Validators.required, Validators.minLength(3)]],
      value: [this.item.value, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]]
    });

  }

  onSubmit(formData) {
    if (this.itemForm.invalid) {
      alert("Please, complete all required fields (*)");
      return;
    }

    this.item = Object.assign(this.item, formData);

    this.itemService.save(this.item, this.edit).subscribe(
      item => {
        this.router.navigate(['/items']);
      },
      err => { alert(err.error.message) }
    )
  }

}
