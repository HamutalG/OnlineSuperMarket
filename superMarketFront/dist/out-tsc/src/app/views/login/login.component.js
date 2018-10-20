var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../models/login';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(server) {
        this.server = server;
        this.passwordError = 'Incorrect password!';
        this.passHasError = false;
        this.emailError = 'Incorrect email!';
        this.emailHasError = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.server.checkSession().subscribe(function (data) {
            if (!data.hasOwnProperty("hasError")) {
                _this.server.handleInSessionEmitter(data);
            }
        });
    };
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        var currentUser = new Login(this.loginUsername, this.loginPassword);
        this.server.loginUser(currentUser).subscribe(function (data) {
            if (!data.hasOwnProperty("hasError")) {
                //login success
                _this.server.handleInSessionEmitter(data);
                _this.server.checkSession().subscribe(function (data) { console.log(data); });
                _this.passHasError = false;
                _this.emailHasError = false;
            }
            else {
                if (data.hasError == "Invalid Email Address.") {
                    _this.emailHasError = true;
                    _this.passHasError = false;
                }
                else {
                    _this.passHasError = true;
                    _this.emailHasError = false;
                }
            }
        });
        this.loginPassword = "";
        this.loginUsername = "";
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map