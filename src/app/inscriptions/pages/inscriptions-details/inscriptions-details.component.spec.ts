import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsDetailsComponent } from './inscriptions-details.component';

describe('InscriptionsDetailsComponent', () => {
  let component: InscriptionsDetailsComponent;
  let fixture: ComponentFixture<InscriptionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
