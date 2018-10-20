import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../product/product.component';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() quantityEmitter: EventEmitter<number> = new EventEmitter<number>();
  public product;
  public quantityVal:number = 1;

  constructor(public cartService:CartService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.product = data.product;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onAddProductButton(quantityVal) {
    if(quantityVal >= 1){
      let object = this.product;
      object.quantity = quantityVal;
      this.cartService.addProductFromDialog(object);
      this.dialogRef.close();
    } else{
      alert('Minimum Quantity is 1 unit.');
    };
  };

}
