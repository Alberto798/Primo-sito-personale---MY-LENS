import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FungaComponent } from './funga.component';

describe('FungaComponent', () => {
  let component: FungaComponent;
  let fixture: ComponentFixture<FungaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FungaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FungaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
