import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router'
import {ItemService} from './item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl:'./add.component.html',
    styleUrls:['./add.component.css']
})

export class AddComponent implements OnInit{
   
    itemForm: FormGroup = new FormGroup({});
    id;  sub; btnText :string = "Add"; itemId;
    isFormValid :boolean = true;
    errorMsg : string="";
    imageError: string;
    isImageSaved: boolean;
    itemImageBase64: string;

    constructor( public fb : FormBuilder, private router : Router, 
        private _ItemService:ItemService,private _Activatedroute:ActivatedRoute){

    }
   
    ngOnInit() {

        this.itemForm = new FormGroup({
            ItemId: new FormControl(0),
            Name: new FormControl('',[Validators.required]),
            Description: new FormControl(),
            Price: new FormControl(),
            ItemImageBase64: new FormControl()
          })


        this.sub=this._Activatedroute.paramMap.subscribe(params => { 
            
             this.id = +params.get('id'); 
             if(this.id > 0){
                this.btnText = "Update";
             let item=this._ItemService.getById(this.id).subscribe(data => { 

                if(data!=undefined ){
                this.itemForm.get("ItemId").setValue(data[0].ItemId);
                this.itemForm.get("Name").setValue(data[0].Name);
                this.itemForm.get("Description").setValue(data[0].Description);
                this.itemForm.get("Price").setValue(data[0].Price);
                this.itemForm.get("ItemImageBase64").setValue(data[0].ItemImageBase64);
                this.itemImageBase64 = data[0].ItemImageBase64;
                }
             });
            }
         });
    }

    submitForm(){

        if(this.isValidForm()){
            this.itemId  = this.itemForm.get("ItemId").value;
            this.itemForm.get("ItemImageBase64").setValue(this.itemImageBase64);
            
            if(this.itemId > 0){//update
                this._ItemService.update(this.itemId,this.itemForm.value).subscribe(res=>{

                    this.router.navigate(['']);
                })
            }
            else{//Add

                this._ItemService.create(this.itemForm.value).subscribe(res=>{

                    this.router.navigate(['']);
                });
            }
        
        }
    }

    isValidForm(): boolean{
        
        this.errorMsg ="";
        this.isFormValid = true;

        if(this.itemForm.get("Name").value ==""){

            this.errorMsg ="Please fill all mandatory details.";
            this.isFormValid = false;
            return false;
        }
        
        let priceValue = this.itemForm.get("Price").value;


        if(priceValue != null && priceValue!="" && isNaN(Number(priceValue.toString()))){

            this.errorMsg ="Price as numeric. Please enter valid number.";
            this.isFormValid = false;
            return false;
        }

        return true;
    }

    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                        const imgBase64Path = e.target.result;
                        this.itemImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    removeImage() {
        this.itemImageBase64 = null;
        this.isImageSaved = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}