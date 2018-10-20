import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.css']
})
export class ManagerFormComponent implements OnInit {

  managerFormGroup: FormGroup;
  productName: string;
  productCategory: string;
  productPrice: number;
  imgURL: string;
  currentProduct: Product;
  _id: number;

  constructor(private _formBuilder: FormBuilder, private server: StoreService) { }

  ngOnInit() {
    this.managerFormGroup = this._formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productQuantity: ['', Validators.required],
      imgUrl: ['', Validators.required],
      productPrice: ['', Validators.required]
    });

    this.server.productInfoEmitter.subscribe(info => {
      this.currentProduct = info;
      this.imgURL = info.image;
      this.productName = info.name;
      this.productCategory = info.category;
      this.productPrice = info.price;
      this._id = info._id;
    });
  }

  saveProduct() {

    let product = new Product(this.managerFormGroup.value.productName,
      this.managerFormGroup.value.productCategory,
      this.managerFormGroup.value.imgUrl,
      this.managerFormGroup.value.productPrice);

    this.server.addProduct(product).subscribe(response => {
      console.log(response);
      if (response.hasOwnProperty("hasError")) {
        alert('error!');
      } else {
        alert('Product added successfully!');
        this.managerFormGroup.reset();
      };
    }, err => {
      alert('Error');
    });
  }

  updateProduct() {

    var product = new Product(this.managerFormGroup.value.productName,
      this.managerFormGroup.value.productCategory,
      this.managerFormGroup.value.imgUrl,
      this.managerFormGroup.value.productPrice);
    product._id = this._id;

    this.server.editProduct(product).subscribe(response => {
   
      if (response.hasOwnProperty("hasError")) {
        alert('error!');
      } else {
        alert('Product updated successfully!');
        this.managerFormGroup.reset();
        this.currentProduct = undefined;
        this.server.handleUpdateProductEmitter(product.category);
      };
    }, err => {
      alert('Error');
    });
  }
}
