import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListingComponent } from './groups-listing.component';

describe('GroupsListingComponent', () => {
  let component: GroupsListingComponent;
  let fixture: ComponentFixture<GroupsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsListingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
