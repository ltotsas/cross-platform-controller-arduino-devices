import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { LoaderComponent } from './loader/loader.component';
import { DevicesModalComponent } from './devices-modal/devices-modal.component';
import { ModalService } from '../core/services/modal.service';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ParamsModalComponent } from './params-modal/params-modal.component';

@NgModule({
  imports: [IonicModule, CommonModule, NgZorroAntdModule],
  declarations: [LoaderComponent, DevicesModalComponent, CreateGroupModalComponent, ParamsModalComponent],
  exports: [LoaderComponent]
})
export class SharedModule {}
