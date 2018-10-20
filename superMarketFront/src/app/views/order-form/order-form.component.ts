import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from '../register/register.component';
import { AuthService } from '../../services/auth.service';

import { MatDialog } from '@angular/material';
import { OrderDialogComponent } from 'src/app/views/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Output() orderEmitter: EventEmitter<any> = new EventEmitter<any>();
  public orderFormGroup: FormGroup;
  private today = new Date();
  private nextMonth = new Date(new Date().getFullYear(), (new Date().getMonth() + 1) % 12 + 1, 0);

  public disabledShippingDates: any[] = [];

  cities: city[] = [
    { value: 'Jerusalem', viewValue: 'Jerusalem' },
    { value: 'Tel-Aviv', viewValue: 'Tel Aviv' },
    { value: 'Beer-Sheva', viewValue: "Be'er-Sheva" },
    { value: 'Eilat', viewValue: "Eilat" },
    { value: 'Rishon Le-Zion', viewValue: "Rishon Le-Zion" },
    { value: 'Haifa', viewValue: "Haifa" },
    { value: 'Modiin', viewValue: "Modiin" },
    { value: 'Kiryat Gat', viewValue: "Kiryat Gat" },
    { value: 'Holon', viewValue: "Holon" },
    { value: 'Herzeliya', viewValue: "Herzeliya" }
  ];

  constructor(public server: StoreService,
    public _formBuilder: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getFutureDates();
    this.createFormGroup();
  }

  public createFormGroup() {
    this.orderFormGroup = this._formBuilder.group({
      city: [
        '',
        [
          Validators.required
        ]
      ],
      street: [
        '',
        [
          Validators.required
        ]
      ],
      creditCard: [
        '',
        [
          Validators.required
        ]
      ],
      shippingDate: [
        '',
        [
          Validators.required
        ]
      ]
    });
  };

  public onSubmit() {

    let str = this.orderFormGroup.value.creditCard.toString();
    let last4Digits = str.substr(str.length - 4);
    let order = {
      customerId: this.authService.user.ID,
      city: this.orderFormGroup.value.city,
      street: this.orderFormGroup.value.street,
      shippingDate: new Date(this.orderFormGroup.value.shippingDate),
      updatedAt: new Date(),
      last4Digits: last4Digits
    };
    this.orderEmitter.emit(order);
  };

  public applyUserInfo() {
    this.orderFormGroup.get('city').setValue(this.authService.user.city);
    this.orderFormGroup.get('street').setValue(this.authService.user.street);
  };

  public getFutureDates() {
    this.server.getDates().subscribe(result => {
      if (!result.hasOwnProperty('hasError')) {
        this.filterDates(result);
      };
    })
  };

  public filterDates(futureDates) {
    let disabledDates = [];
    for (let i = 0; i < futureDates.length; i++) {
      let added = false;
      let counter = 0;
      const date = futureDates[i];
      for (let j = 0; j < futureDates.length; j++) {
        const dateB = futureDates[j];
        if (dateB[0] == date[0] &&
          dateB[1] == date[1] &&
          dateB[2] == date[2]) {
          counter++;
        };
        for (let k = 0; k < disabledDates.length; k++) {
          const existDate = disabledDates[k];
          if (date[0] == existDate[0] &&
            date[1] == existDate[1] &&
            date[2] == existDate[2]) {
            added = true;
          };
        };
      };
      if (counter >= 3 && !added) {
        disabledDates.push(date);
      };
    };
    this.disabledShippingDates = disabledDates;
  };

  dateFilter() {
    if (this.disabledShippingDates !== null) {
      let disabledDates = this.disabledShippingDates;
      return (date: Date) => {
        for (let i = 0; i < disabledDates.length; i++) {
          let disabled = disabledDates[i];
          if (date.getFullYear() == disabled[0] &&
            date.getMonth() % 12 + 1 == disabled[1] &&
            date.getDate() == disabled[2]) {
            return false;
          };
        };
        return true;
      };
    };
  };


}
