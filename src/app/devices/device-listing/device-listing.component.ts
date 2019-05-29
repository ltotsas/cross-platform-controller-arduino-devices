import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';
import { DevicesState } from '@app/devices/state/devices.store';
import { AddDeviceToGroup, RemoveDeviceFromGroup } from '../../groups/state/groups-actions';
import { GroupsState } from '@app/groups/state/groups-state';
import { pipe } from '@angular/core/src/render3';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-device-listing',
  templateUrl: './device-listing.component.html',
  styleUrls: ['./device-listing.component.css']
})
export class DeviceListingComponent implements OnInit {
  @Select(DevicesState.getDevices) devices$: Observable<Device[]>;
  @Select(DevicesState.getNumberOfDevices) noDevices$: Observable<number>;
  @Select(GroupsState.getGroups) groups$: Observable<any>;

  isLoading: boolean;

  constructor(private store: Store) {
    this.groups$.subscribe(g => console.log(g));
  }

  ngOnInit() {
    this.isLoading = true;
    this.devices$.pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
