import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from '../../models/category';
import { Product } from '../../models/product';

const jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public expandedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public productInfoEmitter: EventEmitter<Product> = new EventEmitter<Product>();
  public updateProductEmitter: EventEmitter<string> = new EventEmitter<string>();
  public storeState: boolean = true;


  server = "/store/";

  constructor(private http: HttpClient) { }

  public togglseStoreState() {
    this.storeState = !this.storeState;
  };

  handleUpdateProductEmitter(category: string) {
    this.updateProductEmitter.emit(category);
  }

  handleProductInfoEmitter(product: Product) {
    this.productInfoEmitter.emit(product);
  }

  handleExpandedEmitter(isExpanded: boolean) {
    this.expandedEmitter.emit(isExpanded);
  }

  getAllCategories(): Observable<Category[]> {
    return <Observable<Category[]>>this.http.get(this.server + 'categories');
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return <Observable<any[]>>this.http.post(this.server + 'productsByCategory', { catName: category }, jsonHeader);
  }

  addProduct(product: Product): Observable<any> {
    return <Observable<any>>this.http.post(this.server + 'addProduct', product, jsonHeader);
  }

  editProduct(product: Product): Observable<any> {
    return <Observable<any>>this.http.put(this.server + 'editProduct', product, jsonHeader);
  }

  getDates() {
    return <Observable<any>>this.http.get(`${this.server}dates`);
  }
  getNumOfProducts(): Observable<Number> {
    return <Observable<Number>>this.http.get(this.server + 'ProductsNumber');
  }

  public getUserOrderDetails(costumerId): Observable<any> {
    return <Observable<any>>this.http.get('/cart/' + 'userOrderDetails', {
      params: {
        id: costumerId
      }
    });
  }
}
