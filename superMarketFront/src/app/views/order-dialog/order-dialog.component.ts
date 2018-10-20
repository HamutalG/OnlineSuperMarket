import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>) { }

  ngOnInit() {
  }

  printReceipt() {

    setTimeout(() => {
      var data = document.getElementById('customerCart');
      html2canvas(data).then(canvas => {
        //Few necessary setting options  
        var imgWidth = 150;
        var pageHeight = 212;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a5'); // A5 size page of PDF  
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 1) {
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          };
        };
        pdf.save(`pdf name.pdf`); // Generated PDF  
      });
    }, 0);
    let el = document.getElementById("backToStoreBtn") as HTMLElement;
    if (el !== undefined) {
      el.style.display = 'none';
    };

  };

}
