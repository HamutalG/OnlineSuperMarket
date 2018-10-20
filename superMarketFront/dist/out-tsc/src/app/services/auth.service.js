var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
var jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.server = "/users/";
        this.inSessionEmitter = new EventEmitter();
        this.isManagerEmitter = new EventEmitter();
        this.isAuth = false;
        this.isManager = false;
    }
    AuthService.prototype.handleIsManagerEmitter = function (isIt) {
        this.isManagerEmitter.emit(isIt);
    };
    AuthService.prototype.addAccount = function (account) {
        return this.http.post(this.server + 'register', account, jsonHeader);
    };
    AuthService.prototype.loginUser = function (login) {
        return this.http.post(this.server + 'login', login, jsonHeader);
    };
    AuthService.prototype.handleInSessionEmitter = function (account) {
        if (!account.hasOwnProperty("msg") && !account.hasOwnProperty("hasError")) {
            this.isAuth = true;
            this.inSessionEmitter.emit(account);
        }
        else
            this.inSessionEmitter.emit(undefined);
    };
    AuthService.prototype.subscribableSessionCheck = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkSession().subscribe(function (response) {
                console.log(response);
                if (response.role) {
                    if (response.role == 'manager') {
                        _this.handleIsManagerEmitter(true);
                    }
                    else {
                        _this.handleIsManagerEmitter(false);
                    }
                }
                _this.handleInSessionEmitter(response);
                setTimeout(function () { return resolve(null); }, 0);
            });
        });
    };
    AuthService.prototype.checkSession = function () {
        return this.http.get(this.server + 'checkSession');
    };
    AuthService.prototype.handleLogout = function () {
        this.isAuth = false;
        return this.http.get(this.server + 'logout');
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map