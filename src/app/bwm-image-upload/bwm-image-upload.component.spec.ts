import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BwmImageUploadComponent } from './bwm-image-upload.component';

describe('BwmImageUploadComponent', () => {
  let component: BwmImageUploadComponent;
  let fixture: ComponentFixture<BwmImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BwmImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BwmImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
