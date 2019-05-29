import { Component, OnInit } from '@angular/core';
import { DevicesService } from './services/devices.service';
import { Device } from './models/device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  devices: Device;

  constructor(private devicesService: DevicesService) {}

  ngOnInit() {}
}
