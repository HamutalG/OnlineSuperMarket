import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Product } from '../../../models/product';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../../models/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentCart: Cart;
  expanded: boolean = true;
  productsInCart: Product[] = [];

  constructor(public server: StoreService,
     private cartService: CartService) { }

  ngOnInit() {
    this.cartService.currentCartEmitter.subscribe(cart => {
      if (cart) {
        this.currentCart = cart;
        this.productsInCart = cart.products;
      }
    });

    this.cartService.getCart().subscribe(cartFromDB => {

      if (!(cartFromDB.hasOwnProperty("hasError"))) {
        this.cartService.handleCurrentCartEmitter(cartFromDB);
      }
    });

    this.cartService.productsInCartEmitter.subscribe(data => {
      this.productsInCart = data;
    });;
  }

  hideOrShow(e) {
    this.expanded = !this.expanded;
    this.server.handleExpandedEmitter(this.expanded);
    console.log(this.currentCart);
  }

  deleteCartItem(e) {

    let itemToDeleteName = e.path[2].childNodes[2].innerText;
    this.currentCart.products.map((item, i) => {

      if (item.name == itemToDeleteName) {
        this.currentCart.products.splice(i, 1);
      };
      this.cartService.handleProductInCartEmitter(this.currentCart.products);

    });

    this.cartService.updateCart(this.currentCart).subscribe(cart => {
      console.log(cart);
    });


  }




}
