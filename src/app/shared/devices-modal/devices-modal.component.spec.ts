import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesModalComponent } from './devices-modal.component';

describe('DevicesModalComponent', () => {
  let component: DevicesModalComponent;
  let fixture: ComponentFixture<DevicesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
