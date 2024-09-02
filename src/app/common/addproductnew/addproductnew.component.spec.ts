import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductnewComponent } from './addproductnew.component';

describe('AddproductnewComponent', () => {
  let component: AddproductnewComponent;
  let fixture: ComponentFixture<AddproductnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddproductnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
