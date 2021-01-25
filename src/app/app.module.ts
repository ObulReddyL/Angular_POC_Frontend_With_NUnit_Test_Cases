import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AddComponent} from './Items/add.component';
import {DetailsComponent} from './Items/details.component';
import {ErrorComponent} from './Items/error.component';
import {ItemService} from './Items/item.service';

@NgModule({
  declarations: [
    AppComponent,AddComponent,DetailsComponent,ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})

export class AppModule { }
