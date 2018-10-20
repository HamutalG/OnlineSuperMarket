import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../../models/account';
import { Router } from '@angular/router';

export interface city {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  passwordError: String = 'Passwords do not match!';
  passHasError: Boolean = false;
  emailError: String = 'Please enter a valid email!'
  emailHasError: Boolean = false;

  cities: city[] = [
    {value: 'Jerusalem', viewValue: 'Jerusalem'},
    {value: 'Tel-Aviv', viewValue: 'Tel Aviv'},
    {value: 'Beer-Sheva', viewValue: "Be'er-Sheva"},
    {value: 'Eilat', viewValue: "Eilat"},
    {value: 'Rishon Le-Zion', viewValue: "Rishon Le-Zion"},
    {value: 'Haifa', viewValue: "Haifa"},
    {value: 'Modiin', viewValue: "Modiin"},
    {value: 'Kiryat Gat', viewValue: "Kiryat Gat"},
    {value: 'Holon', viewValue: "Holon"},
    {value: 'Herzeliya', viewValue: "Herzeliya"}
  ];

  constructor(private _formBuilder: FormBuilder, private server: AuthService, private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      ID: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confimPassword: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  nextBtn(stepper) {
    if (this.firstFormGroup.value.password === this.firstFormGroup.value.confimPassword) {
      this.passHasError = false;

      if (this.firstFormGroup.controls['username'].errors) {

        this.emailHasError = true;

      } else {
        stepper.next();
        this.emailHasError = false;
      }
    } else {
      this.passHasError = true;
    }

  }

  addAccount() {
    let account = new Account(this.firstFormGroup.value.ID,
      this.firstFormGroup.value.username,
      this.firstFormGroup.value.password,
      this.secondFormGroup.value.city,
      this.secondFormGroup.value.street,
      this.secondFormGroup.value.firstName,
      this.secondFormGroup.value.lastName);

    this.server.addAccount(account).subscribe(response => {
      if (response.hasOwnProperty("hasError")) {
        alert('error!');
      } else {
        alert('User registered successfully');
        this.server.handleInSessionEmitter(response);
      };
    }, err => {
      alert('Error');
    });

    this.router.navigate(['']);

  }
}




