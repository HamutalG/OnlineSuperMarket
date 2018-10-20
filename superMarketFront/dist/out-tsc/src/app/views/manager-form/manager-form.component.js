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
import { Product } from '../../../models/product';
import { StoreService } from '../../services/store.service';
var ManagerFormComponent = /** @class */ (function () {
    function ManagerFormComponent(_formBuilder, server) {
        this._formBuilder = _formBuilder;
        this.server = server;
    }
    ManagerFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.managerFormGroup = this._formBuilder.group({
            productName: ['', Validators.required],
            productCategory: ['', Validators.required],
            productQuantity: ['', Validators.required],
            imgUrl: ['', Validators.required],
            productPrice: ['', Validators.required]
        });
        this.server.productInfoEmitter.subscribe(function (info) {
            _this.currentProduct = info;
            _this.imgURL = info.image;
            _this.productName = info.name;
            _this.productCategory = info.category;
            _this.productQuantity = info.quantity;
            _this.productPrice = info.price;
            _this._id = info._id;
        });
    };
    ManagerFormComponent.prototype.saveProduct = function () {
        var _this = this;
        var product = new Product(this.managerFormGroup.value.productName, this.managerFormGroup.value.productCategory, this.managerFormGroup.value.productQuantity, this.managerFormGroup.value.imgUrl, this.managerFormGroup.value.productPrice);
        this.server.addProduct(product).subscribe(function (response) {
            console.log(response);
            if (response.hasOwnProperty("hasError")) {
                alert('error!');
            }
            else {
                alert('Product added successfully!');
                _this.managerFormGroup.reset();
            }
            ;
        }, function (err) {
            alert('Error');
        });
    };
    ManagerFormComponent.prototype.updateProduct = function () {
        var _this = this;
        var product = new Product(this.managerFormGroup.value.productName, this.managerFormGroup.value.productCategory, this.managerFormGroup.value.productQuantity, this.managerFormGroup.value.imgUrl, this.managerFormGroup.value.productPrice);
        product._id = this._id;
        this.server.editProduct(product).subscribe(function (response) {
            if (response.hasOwnProperty("hasError")) {
                alert('error!');
            }
            else {
                alert('Product updated successfully!');
                _this.managerFormGroup.reset();
                _this.currentProduct = undefined;
                _this.server.handleUpdateProductEmitter(product.category);
            }
            ;
        }, function (err) {
            alert('Error');
        });
    };
    ManagerFormComponent = __decorate([
        Component({
            selector: 'app-manager-form',
            templateUrl: './manager-form.component.html',
            styleUrls: ['./manager-form.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, StoreService])
    ], ManagerFormComponent);
    return ManagerFormComponent;
}());
export { ManagerFormComponent };
//# sourceMappingURL=manager-form.component.js.map