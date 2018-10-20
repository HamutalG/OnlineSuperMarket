import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsername: String;
  loginPassword: String;
  passwordError: String = 'Incorrect password!';
  passHasError: Boolean = false;
  emailError: String = 'Incorrect email!'
  emailHasError: Boolean = false;

  constructor(private server: AuthService) { }

  ngOnInit() {
    this.server.checkSession().subscribe(data => {
      if (!data.hasOwnProperty("hasError")) {
        this.server.handleInSessionEmitter(data);
      }
    });
  }

  loginUser() {
    let currentUser = new Login(this.loginUsername, this.loginPassword);
    this.server.loginUser(currentUser).subscribe(data => {

      if (data !== null ? (!data.hasOwnProperty("hasError")) : false) {

        //login success
        this.server.handleInSessionEmitter(data);

        this.server.checkSession().subscribe(data => { console.log(data) });

        this.passHasError = false;
        this.emailHasError = false;
      } else {
        if (data.hasError == "Invalid Email Address.") {
          this.emailHasError = true;
          this.passHasError = false;
        } else {
          this.passHasError = true;
          this.emailHasError = false;
        }
      }
    });
    this.loginPassword = "";
    this.loginUsername = "";

  }
}
