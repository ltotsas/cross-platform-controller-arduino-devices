import { Injectable } from '@angular/core';
import { Device, FetchedDevice } from '../models/device.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private tmpDevices: Device[] = [];
  private tmpFetchedDevices: FetchedDevice;
  constructor(private httpClient: HttpClient) {}

  list(call: FetchedDevice) {
    this.tmpDevices = [];
    for (let index = 0; index < call.Names.length; index++) {
      this.tmpDevices.push(
        new Device(call.Names[index], call.SNames[index], call.Temps[index], call.Checked[index], call.Opened[index])
      );
    }
    this.tmpFetchedDevices = call;
    return this.tmpDevices;
  }
}
