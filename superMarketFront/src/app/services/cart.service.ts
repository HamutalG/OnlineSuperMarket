import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cart } from '../../models/cart';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Order } from '../../models/order';

const jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  public productsInCartEmitter: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  public currentCartEmitter: EventEmitter<Cart> = new EventEmitter<Cart>();
  public quantityEmitter: EventEmitter<number> = new EventEmitter<number>();

  server = "/cart/";
  // customerID: string;
customerID = this.authService.user ? this.authService.user.ID: null;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit(){
    this.attachUserId();
  };

  public attachUserId() {
    // this.authService.idEmitt.subscribe(id => {
    //   this.customerID = id;
    // });
  }

  handleCurrentCartEmitter(cart: Cart) {
    this.currentCartEmitter.emit(cart);
  }

  handleProductInCartEmitter(products: Product[]) {
    this.productsInCartEmitter.emit(products);
    let newCart = new Cart();
    newCart.products = products;
    newCart.cartDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    newCart.isClosed = false;

    let price = 0;
    products.forEach(product => {
      price += (product.price * product.quantity);
    });
    newCart.totalPrice = price;
    this.authService.checkSession().subscribe(data => {
      newCart.customerID = data.ID;
      this.saveCart(newCart).subscribe(data => {

        this.handleCurrentCartEmitter(data);
      });

    });
  }

  public addProductFromDialog(product) {
    this.quantityEmitter.emit(product);
  };

  saveCart(cart: Cart): Observable<Cart> {
    return <Observable<Cart>>this.http.post(this.server + "addCart", cart, jsonHeader);
  }

  updateCart(cart: Cart): Observable<Cart> {
    return <Observable<Cart>>this.http.put(this.server + "updateCart", cart, jsonHeader);
  }

  getCart(): Observable<Cart> {
    return <Observable<Cart>>this.http.get(this.server + `getCart?query=${this.customerID}`);
  }

  newOrder(order: Order): Observable<Order> {
    return <Observable<Order>>this.http.post("/orders/newOrder", order, jsonHeader);
  }

  getOrdersNumber(): Observable<Number> {
    return <Observable<Number>>this.http.get("/orders/OrdersNumber");
  }



}
