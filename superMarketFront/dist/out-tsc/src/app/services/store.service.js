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
var StoreService = /** @class */ (function () {
    function StoreService(http) {
        this.http = http;
        this.expandedEmitter = new EventEmitter();
        this.productInfoEmitter = new EventEmitter();
        this.updateProductEmitter = new EventEmitter();
        this.server = "/store/";
    }
    StoreService.prototype.handleUpdateProductEmitter = function (category) {
        this.updateProductEmitter.emit(category);
    };
    StoreService.prototype.handleProductInfoEmitter = function (product) {
        this.productInfoEmitter.emit(product);
    };
    StoreService.prototype.handleExpandedEmitter = function (isExpanded) {
        this.expandedEmitter.emit(isExpanded);
    };
    StoreService.prototype.getAllCategories = function () {
        return this.http.get(this.server + 'categories');
    };
    StoreService.prototype.getProductsByCategory = function (category) {
        return this.http.post(this.server + 'productsByCategory', { catName: category }, jsonHeader);
    };
    StoreService.prototype.addProduct = function (product) {
        return this.http.post(this.server + 'addProduct', product, jsonHeader);
    };
    StoreService.prototype.editProduct = function (product) {
        return this.http.put(this.server + 'editProduct', product, jsonHeader);
    };
    StoreService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], StoreService);
    return StoreService;
}());
export { StoreService };
//# sourceMappingURL=store.service.js.map