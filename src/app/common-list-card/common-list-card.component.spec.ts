import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListCardComponent } from './common-list-card.component';

describe('CommonListCardComponent', () => {
  let component: CommonListCardComponent;
  let fixture: ComponentFixture<CommonListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
