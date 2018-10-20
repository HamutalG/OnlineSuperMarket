import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Product } from '../../../models/product';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../../models/cart';
import { Subscription } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material';
import { OrderDialogComponent } from 'src/app/views/order-dialog/order-dialog.component';

@Component({
  selector: 'app-start-shopping',
  templateUrl: './start-shopping.component.html',
  styleUrls: ['./start-shopping.component.css']
})
export class StartShoppingComponent implements OnInit, OnDestroy {
  @ViewChild('customerCart') customerCart: CartComponent;
  public subscriptions = new Subscription();

  expanded: boolean = true;
  categories: String[] = [];
  products: Product[] = [];
  hasQuery: boolean = false;
  searchProducts: Product[] = [];
  notFound: boolean = false;
  showSearch: boolean = true;
  state: boolean = true;
  isManager: boolean;

  constructor(private cartService: CartService,
    public server: StoreService,
    private authServer: AuthService,
    private searchService: SearchService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.subscribeGettingQuantity();

    this.searchService.setSearchBarState(this.state);

    this.searchService.hasSearchQueryEmitter.subscribe(hasSearchQuery => {
      this.hasQuery = hasSearchQuery;
      if (this.hasQuery) {
        setTimeout(() => {
          this.searchService.searchQuery().subscribe(searchResults => {
            if (!(searchResults.hasOwnProperty('msg'))) {
              this.searchProducts = searchResults;
              this.notFound = false;
            } else {
              this.notFound = true;
            }
          });
        }, 0);
      }
    });

    this.server.expandedEmitter.subscribe(data => {
      this.expanded = data;
    });

    this.server.getAllCategories().subscribe(data => {
      data.forEach(category => {
        this.categories.push(category.name);
      });
    });

    this.server.updateProductEmitter.subscribe(category => {
      this.productsCategory(null, category);
    });


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  productsCategory(e, category) {
    this.server.getProductsByCategory(e ? e.tab.textLabel : category).subscribe(data => {
      this.products = data;
    });
  };

  public checkUserRole(): boolean {
    /// return true if manager :) 
    return (this.authServer.user && this.authServer.user.role == 'manager');
  };


  public subscribeGettingQuantity() {
    this.subscriptions.add(
      this.cartService.quantityEmitter.subscribe(product => {
        let exists = false;
        this.customerCart.productsInCart.forEach((existProd, i) => {

          if (existProd._id == product._id && !exists) {

            this.customerCart.productsInCart[i].quantity += product.quantity;
            exists = true;
          };
        });
        if (!exists) {
          this.customerCart.productsInCart.push(product);
        };
        this.cartService.handleProductInCartEmitter(this.customerCart.productsInCart);
      })
    );
  };

  public handleOrder(pOrder) {
    pOrder.total = this.customerCart.currentCart.totalPrice;
    pOrder.productsBought = this.customerCart.productsInCart;
    this.cartService.newOrder(pOrder).subscribe(data => {

      if (!(data.hasOwnProperty("hasError"))) {
        const dialogRef = this.dialog.open(OrderDialogComponent, {
          width: '400px',
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });

      }
    });
  }


}