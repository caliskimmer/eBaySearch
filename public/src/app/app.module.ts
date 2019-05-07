import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResultsComponent } from './results/results.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { DetailsComponent } from './details/details.component';
import { ProductComponent } from './details/product/product.component';
import { PhotosComponent } from './details/photos/photos.component';
import { ShippingComponent } from './details/shipping/shipping.component';
import { SellerComponent } from './details/seller/seller.component';
import { SimilarProductsComponent } from './details/similar-products/similar-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsComponent,
    WishlistComponent,
    DetailsComponent,
    ProductComponent,
    PhotosComponent,
    ShippingComponent,
    SellerComponent,
    SimilarProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTooltipModule,
    HttpClientModule,
    NgbModule,
    RoundProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
