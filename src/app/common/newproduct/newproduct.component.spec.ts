import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductComponent } from './newproduct.component';

describe('NewproductComponent', () => {
  let component: NewproductComponent;
  let fixture: ComponentFixture<NewproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
