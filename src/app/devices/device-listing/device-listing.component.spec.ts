import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListingComponent } from './device-listing.component';

describe('DeviceComponentComponent', () => {
  let component: DeviceListingComponent;
  let fixture: ComponentFixture<DeviceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceListingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
