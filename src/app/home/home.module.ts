import { ParamsModalComponent } from './../shared/params-modal/params-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { DeviceListingComponent } from '../devices/device-listing/device-listing.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GroupsListingComponent } from '../groups/groups-listing/groups-listing.component';
import { DevicesModalComponent } from '../shared/devices-modal/devices-modal.component';
import { CreateGroupModalComponent } from '@app/shared/create-group-modal/create-group-modal.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    HomeRoutingModule,
    NgZorroAntdModule,
    DragDropModule
  ],
  entryComponents: [HomeComponent, DevicesModalComponent, CreateGroupModalComponent, ParamsModalComponent],
  declarations: [HomeComponent, DeviceListingComponent, GroupsListingComponent],
  providers: [QuoteService]
})
export class HomeModule {}
