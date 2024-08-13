import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterdisplayComponent } from './counterdisplay.component';

describe('CounterdisplayComponent', () => {
  let component: CounterdisplayComponent;
  let fixture: ComponentFixture<CounterdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
