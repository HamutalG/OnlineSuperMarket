import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-totals',
  templateUrl: './home-totals.component.html',
  styleUrls: ['./home-totals.component.css']
})
export class HomeTotalsComponent implements OnInit {

  numberOfProducts;
  numberOfOrders;
  notiState: any[] = [];

  constructor(private authService: AuthService,
    private storeService: StoreService,
    private cartService: CartService,
  private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.storeService.getNumOfProducts().subscribe(pNum => {
      this.numberOfProducts = pNum
    });
    this.cartService.getOrdersNumber().subscribe(oNum => {
      this.numberOfOrders = oNum
    });

    this.authService.idEmitt.subscribe(cId => {
      this.getUserData(cId);
    });
  }

  public getUserData(cId) {
    this.storeService.getUserOrderDetails(cId).subscribe(data => {
      if (!data.hasOwnProperty('hasError')) {
        this.notiState[1] = data;
        if ((data.hasOwnProperty('cart') && data.cart.hasOwnProperty('products')) ?
         (data.cart.products.length > 0 ? true : false) : false) {
          this.notiState[0] = 'cart';
        } else if (data.orders.length > 0) {
          this.notiState[0] = 'orders';
          this.notiState[1].orders = data.orders[data.orders.length-1];
        } else {
          this.notiState[0] = 'welcome';
        };
      };
      this.cdRef.markForCheck();
    });
  }
}
