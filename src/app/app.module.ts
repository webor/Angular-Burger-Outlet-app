import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { FetchProductService } from './services/fetch-products.service';
import { AppComponent } from './app.component';
import { ProductComponent } from './product-list/product-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductService } from './services/product-list.service';
import { OrderDetailService } from './services/order-detail.service';
import { StoreService } from './services/store.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FilterRatingComponent } from './filter-rating/filter-rating.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailComponent,
    ProductItemComponent,
    ProductComponent,
    HeaderNavbarComponent,
    NotFoundComponent,
    SearchBarComponent,
    SideNavComponent,
    FilterRatingComponent,
    FilterCategoryComponent,
    HomePageComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    RouterModule.forRoot( [ 
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'menu',
        component: ProductComponent
      },
      {
        path: 'cart',
        component: OrderDetailComponent
      },
      {
        path: 'checkout',
        component: CheckoutPageComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      } 
    ] ),
  ],

  /**
   * when You add a dependency as a provider in a module angular will 
   * create a single instance of that class Singleton
   */
  providers: [
    FetchProductService,
    ProductService,
    OrderDetailService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
