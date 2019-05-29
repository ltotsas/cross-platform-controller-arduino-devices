import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from './device.component';
import { DevicesService } from './services/devices.service';
import { DeviceListingComponent } from './device-listing/device-listing.component';

@NgModule({
  declarations: [DeviceComponent, DeviceListingComponent],
  entryComponents: [DeviceComponent],
  imports: [CommonModule],
  providers: [DevicesService]
})
export class DeviceModule {}
