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
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../../models/account';
import { Router } from '@angular/router';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_formBuilder, server, router) {
        this._formBuilder = _formBuilder;
        this.server = server;
        this.router = router;
        this.isLinear = true;
        this.passwordError = 'Passwords do not match!';
        this.passHasError = false;
        this.emailError = 'Please enter a valid email!';
        this.emailHasError = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
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
    };
    RegisterComponent.prototype.nextBtn = function (stepper) {
        if (this.firstFormGroup.value.password === this.firstFormGroup.value.confimPassword) {
            this.passHasError = false;
            if (this.firstFormGroup.controls['username'].errors) {
                this.emailHasError = true;
            }
            else {
                stepper.next();
                this.emailHasError = false;
            }
        }
        else {
            this.passHasError = true;
        }
    };
    RegisterComponent.prototype.addAccount = function () {
        var _this = this;
        var account = new Account(this.firstFormGroup.value.ID, this.firstFormGroup.value.username, this.firstFormGroup.value.password, this.secondFormGroup.value.city, this.secondFormGroup.value.street, this.secondFormGroup.value.firstName, this.secondFormGroup.value.lastName);
        this.server.addAccount(account).subscribe(function (response) {
            if (response.hasOwnProperty("hasError")) {
                alert('error!');
            }
            else {
                alert('User registered successfully');
                _this.server.handleInSessionEmitter(response);
            }
            ;
        }, function (err) {
            alert('Error');
        });
        this.router.navigate(['']);
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AuthService, Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map