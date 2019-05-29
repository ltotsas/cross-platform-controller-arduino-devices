import { DevicesService } from './../../devices/services/devices.service';
import { Injectable } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Store } from '@ngxs/store';
import { FetchedDevice, Device } from '@app/devices/models/device.model';
import { Observable } from 'rxjs';
import { SetDevicesState } from '../../devices/state/devices.actions';
import { GetSocketState } from '../state/socket-actions';
import { environment } from '@env/environment';
import { SetGroupsState } from '@app/groups/state/groups-actions';

const rws = new ReconnectingWebSocket(environment.socketUrl);

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  devices$: Device[];
  socketState = 3;
  checkConnection: Observable<number>;

  constructor(private store: Store, private deviceService: DevicesService) {
    rws.addEventListener('open', () => {
      this.handleOpen();
    });
    rws.addEventListener('close', () => {
      this.handleOpen();
    });
    rws.addEventListener('message', (msg: any) => {
      const as: FetchedDevice = JSON.parse(msg.data);
      this.store.dispatch(new SetDevicesState(this.deviceService.list(as)));
      this.store.dispatch(new SetGroupsState(as.Names));
    });
  }

  handleOpen(): any {
    if (this.socketState !== rws.readyState) {
      this.store.dispatch(new GetSocketState(rws.readyState));
      this.socketState = rws.readyState;
    }
  }
}
