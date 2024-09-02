import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildnewComponent } from './childnew.component';

describe('ChildnewComponent', () => {
  let component: ChildnewComponent;
  let fixture: ComponentFixture<ChildnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
