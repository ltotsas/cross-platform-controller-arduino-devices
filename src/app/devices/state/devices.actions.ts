import { Device } from '../models/device.model';

export class SetDevicesState {
  static type = '[DevicesState] Set state';
  constructor(public devices: Device[]) {}
}

export class UpdateGroupOnDevice {
  static type = '[UpdateDevice] Set group to device';
  constructor(public device: Device) {}
}
