import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add.component';
import {ItemService} from './item.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddComponent',() => {
    let comp :AddComponent;
    let fixture : ComponentFixture<AddComponent>;

    beforeEach(async()=>{
        await TestBed.configureTestingModule({

            declarations:[AddComponent],
            imports:[ReactiveFormsModule,RouterTestingModule,HttpClientModule],
            providers:[{ provide:ItemService, useClass:ItemService }]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(AddComponent);
            comp = fixture.componentInstance;
        });
    });

    it('should create Add Component instance',() => {
        expect(comp).toBeTruthy();
    });

    it(`should have as title 'Add Item'`,() => {
        comp.btnText = "Add";
        fixture.detectChanges();
        const btn = fixture.debugElement.nativeElement.querySelector('.AddItemHeader');
        expect(btn.innerHTML).toBe('Add Item');
    });

    it(`should have as title 'Edit Item'`,() => {
        comp.btnText = "Edit";
        fixture.detectChanges();
        const head = fixture.debugElement.nativeElement.querySelector('.AddItemHeader');
        expect(head.innerHTML).toBe('Edit Item');
    });

})

