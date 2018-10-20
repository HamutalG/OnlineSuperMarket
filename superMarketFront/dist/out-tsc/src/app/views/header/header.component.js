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
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
var HeaderComponent = /** @class */ (function () {
    /*  currentRoute: string = ""; */
    function HeaderComponent(server, route, searchService) {
        this.server = server;
        this.route = route;
        this.searchService = searchService;
        this.doesExistQuery = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchService.searchState$.subscribe(function (state) { _this.state = state; });
        this.searchService.hasSearchQueryEmitter.subscribe(function (doesQueryExists) { _this.doesExistQuery = doesQueryExists; });
        this.server.inSessionEmitter.subscribe(function (account) {
            _this.user = account;
        });
        /* console.log(this.route.events.subscribe(data=>{
          return this.route.url;
          
        })); */
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        this.server.handleLogout().subscribe(function (data) {
            _this.server.handleInSessionEmitter(data);
        });
    };
    HeaderComponent.prototype.searchInput = function (query) {
        if (query) {
            this.searchService.handleHasSearchQueryEmitter(true);
            this.searchService.searchTerm = query;
        }
        else {
            this.searchService.handleHasSearchQueryEmitter(false);
        }
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, Router, SearchService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map