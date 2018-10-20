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
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
var StartShoppingComponent = /** @class */ (function () {
    function StartShoppingComponent(server, authServer, searchService) {
        this.server = server;
        this.authServer = authServer;
        this.searchService = searchService;
        this.expanded = true;
        this.categories = [];
        this.products = [];
        this.isManager = false;
        this.hasQuery = false;
        this.searchProducts = [];
        this.notFound = false;
        this.showSearch = true;
        this.state = true;
    }
    StartShoppingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchService.setSearchBarState(this.state);
        this.searchService.hasSearchQueryEmitter.subscribe(function (hasSearchQuery) {
            _this.hasQuery = hasSearchQuery;
            if (_this.hasQuery) {
                setTimeout(function () {
                    _this.searchService.searchQuery().subscribe(function (searchResults) {
                        if (!(searchResults.hasOwnProperty('msg'))) {
                            _this.searchProducts = searchResults;
                            _this.notFound = false;
                        }
                        else {
                            _this.notFound = true;
                        }
                    });
                }, 0);
            }
            _this.authServer.isManagerEmitter.subscribe(function (isIt) {
                console.log(isIt);
                _this.isManager = isIt;
            });
        });
        this.server.expandedEmitter.subscribe(function (data) {
            _this.expanded = data;
        });
        this.server.getAllCategories().subscribe(function (data) {
            data.forEach(function (category) {
                _this.categories.push(category.name);
            });
            console.log(_this.isManager);
        });
        this.server.updateProductEmitter.subscribe(function (category) {
            _this.productsCategory(null, category);
        });
    };
    StartShoppingComponent.prototype.productsCategory = function (e, category) {
        var _this = this;
        this.server.getProductsByCategory(e ? e.tab.textLabel : category).subscribe(function (data) {
            _this.products = data;
        });
    };
    StartShoppingComponent = __decorate([
        Component({
            selector: 'app-start-shopping',
            templateUrl: './start-shopping.component.html',
            styleUrls: ['./start-shopping.component.css']
        }),
        __metadata("design:paramtypes", [StoreService, AuthService, SearchService])
    ], StartShoppingComponent);
    return StartShoppingComponent;
}());
export { StartShoppingComponent };
//# sourceMappingURL=start-shopping.component.js.map