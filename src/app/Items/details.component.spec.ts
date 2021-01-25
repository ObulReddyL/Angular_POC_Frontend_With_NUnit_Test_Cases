import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details.component';
import {ItemService} from './item.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const listServiceStub = {
    get() {
      const dataMock = [ 
        {ItemId:1,Name:'Item1',Description:"desc1",Price:200,ItemImageBase64:"base"},
        {ItemId:2,Name:'Item2',Description:"desc2",Price:300,ItemImageBase64:"base2"}
        ]
      return of( dataMock );
    }
  };

describe("DetailsComponent", () => {

    let comp : DetailsComponent;
    let fixture : ComponentFixture<DetailsComponent>;
    let itemService : ItemService;
    
    beforeEach(async() => {

        TestBed.configureTestingModule({
            declarations:[DetailsComponent],
            imports:[ReactiveFormsModule,RouterTestingModule,HttpClientModule],
            providers:[{ provide:ItemService, useClass:ItemService }]
        }).compileComponents().then(() =>{

            fixture = TestBed.createComponent(DetailsComponent);
            comp = fixture.componentInstance;
        });

        spyOn(window, "confirm");
    });

    it('should create Details Component instance',() => {

        fixture = TestBed.createComponent(DetailsComponent);
            comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });

    it("should return details page header", () => {

        fixture.detectChanges();
        const head = fixture.debugElement.nativeElement.querySelector('#headDeatils');
        expect(head.innerHTML).toBe('All Items');
    });

    it("should return 0 Items", () =>{
        const rows = fixture.debugElement.nativeElement.querySelectorAll('.tdItemImage');
        expect(rows.length).toEqual(0);
    });

    it("should return non zero Items", () =>{
         listServiceStub.get().subscribe(mockData=>{comp.items = mockData });
        fixture.detectChanges();
        const rows = fixture.debugElement.nativeElement.querySelectorAll('.tdItemImage');
        expect(rows.length).toBeGreaterThanOrEqual(1);
    });

    it("should return total items", () =>{

        listServiceStub.get().subscribe(mockData=>{comp.items = mockData });
       fixture.detectChanges();
       const rows = fixture.debugElement.nativeElement.querySelectorAll('.tdItemImage');
       expect(rows.length).toEqual(comp.items.length);

   });

    it("should show message in table when table is empty", () => {
        fixture.detectChanges();
        const btn = fixture.debugElement.nativeElement.querySelector('.emptytable');
        expect(btn.innerText).toBe('Please Add Items while using Add Item button.');

    });

    it('should return true when click on Delete button', () => {

        listServiceStub.get().subscribe(mockData=>{comp.items = mockData });
        fixture.detectChanges();
        spyOn(comp, 'deleteItem');
      
        let button = fixture.debugElement.nativeElement.querySelector('#btnDelete');
        button.click(1);
      
        fixture.whenStable().then(() => {
          expect(comp.deleteItem).toBe('true');
        });
      });
})

