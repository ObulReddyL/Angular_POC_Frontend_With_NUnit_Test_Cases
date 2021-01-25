import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './Items/add.component';
import {DetailsComponent} from './Items/details.component';
import {ErrorComponent} from './Items/error.component';

const routes: Routes = [
  { path: 'home', component: DetailsComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: AddComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
