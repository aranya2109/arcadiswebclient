import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ProductComponent } from './Product/product.component';
import { ProductFormComponent } from './ProductForm/productform.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './Services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [ProductService],
  entryComponents: [ProductFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
