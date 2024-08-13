import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterbtnComponent } from './counterbtn.component';

describe('CounterbtnComponent', () => {
  let component: CounterbtnComponent;
  let fixture: ComponentFixture<CounterbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
