import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { HomeTotalsComponent } from './views/home-totals/home-totals.component';
import { StartShoppingComponent } from './views/start-shopping/start-shopping.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CartComponent } from './views/cart/cart.component';
import { ProductComponent } from './views/product/product.component';
import { ManagerFormComponent } from './views/manager-form/manager-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './views/dialog/dialog.component';
import {MatTableModule} from '@angular/material/table';
import { OrderFormComponent } from './views/order-form/order-form.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { OrderDialogComponent } from './views/order-dialog/order-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomepageComponent,
    AboutUsComponent,
    HomeTotalsComponent,
    StartShoppingComponent,
    CartComponent,
    ProductComponent,
    ManagerFormComponent,
    DialogComponent,
    OrderFormComponent,
    OrderDialogComponent
  ],
  entryComponents: [DialogComponent,OrderDialogComponent],
  

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
