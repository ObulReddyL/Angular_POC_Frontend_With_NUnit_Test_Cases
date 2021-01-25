import {Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ItemService} from './item.service';
import {ItemModel} from './item.model';

@Component({
    templateUrl:'./details.component.html',
    styleUrls:['./details.component.css']
})

export class DetailsComponent{

    items: ItemModel[] = [];
    today :any ;
    isGridEmpty : boolean = false;
    constructor(private router : Router, public _ItemService: ItemService) { }
  
    ngOnInit() {
  
     this.fetchGridItems();
    }

    deleteItem(itemId: number) {  
        if (confirm("Are you sure you want to delete this ?")) {   
        this._ItemService.delete(itemId).subscribe(res=>{

            this.fetchGridItems();  
        });  
      }  
    }

    fetchGridItems(){
        this._ItemService.getAll().subscribe((data: ItemModel[])=>{
            this.items = data;
            if(data.length > 0){
                this.isGridEmpty = true;
            }
            else{
                this.isGridEmpty = false;
            }
          })  
    }
}