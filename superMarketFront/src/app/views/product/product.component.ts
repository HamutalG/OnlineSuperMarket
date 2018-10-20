import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../../models/product';
import { StoreService } from '../../services/store.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/views/dialog/dialog.component';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';


export interface DialogData {
  quantity: number;
  product: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() isManager: boolean;


  constructor(private server: StoreService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  showInfo() {
    this.server.handleProductInfoEmitter(this.product);
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { product:this.product }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  };


}
