import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RezeptDetailsPage } from './rezept-details.page';

describe('RezeptDetailsPage', () => {
  let component: RezeptDetailsPage;
  let fixture: ComponentFixture<RezeptDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
