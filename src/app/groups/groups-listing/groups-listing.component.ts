import { ParamsMaker } from './../models/group.model';
import { ModalService } from './../../core/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DevicesState } from '@app/devices/state/devices.store';
import { GroupsState } from '@app/groups/state/groups-state';
import { Device } from '../../devices/models/device.model';
import {
  SortDevicesFromGroup,
  SetGroupState,
  SetGroupOpen,
  SetGroupToBlink,
  SetGroupParams
} from '../state/groups-actions';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups-listing',
  templateUrl: './groups-listing.component.html',
  styleUrls: ['./groups-listing.component.css']
})
export class GroupsListingComponent implements OnInit {
  @Select(DevicesState.getDevices) devices$: Observable<Device[]>;
  @Select(DevicesState.getNumberOfDevices) noDevices$: Observable<number>;
  @Select(GroupsState.getGroups) groups$: Observable<any>;
  @Select(GroupsState.getNumberOfGroups) noGroups$: Observable<number>;

  basket: Device[] = [];

  constructor(private store: Store, private groupsService: GroupsService, public modalService: ModalService) {}

  ngOnInit() {}

  sort(event: CdkDragDrop<string[]>) {
    this.store.dispatch(
      new SortDevicesFromGroup(event.previousIndex, event.currentIndex, event.container.data['name'])
    );
  }

  start(ids: string[], state: number, groupName: string) {
    let status;
    if (state === 0) {
      state = 1;
      status = 'start';
    } else {
      state = 0;
      status = 'stop';
    }
    this.groupsService.setState(status, ids).subscribe(() => {
      // if everything went ok error checking
    });
    this.store.dispatch(new SetGroupState(state, groupName));
  }

  open(ids: string[], openned: number, groupName: string) {
    if (openned === 0) {
      this.groupsService.openGroup(ids).subscribe(() => {
        // if everything went ok error checking
      });
      openned = 1;
    } else {
      this.groupsService.closeGroup(ids).subscribe(() => {
        // if everything went ok error checking
      });
      openned = 0;
    }
    this.store.dispatch(new SetGroupOpen(openned, groupName));
  }

  identify(ids: string[], blink: number, groupName: string) {
    if (blink === 0) {
      this.groupsService.blinkGroup(ids).subscribe(() => {
        // if everything went ok error checking
      });
      blink = 1;
    } else {
      this.groupsService.blinkGroupStop(ids).subscribe(() => {
        // if everything went ok error checking
      });
      blink = 0;
    }
    this.store.dispatch(new SetGroupToBlink(blink, groupName));
  }

  params(ids: string[], groupName: string) {
    this.modalService.changeParamsModal(groupName).afterClose.subscribe((result: any) => {
      if (result.data !== '') {
        const params = ParamsMaker.create({
          amplitude: result.data['amplitude'],
          setpoint: result.data['setpoint'],
          fansignal: result.data['fansignal'],
          active_interval: result.data['active_interval'],
          passive_interval: result.data['passive_interval']
        });
        this.groupsService.setGroupParameters(ids, params).subscribe();
        this.store.dispatch(new SetGroupParams(params, groupName));
      }
    });
  }
}
