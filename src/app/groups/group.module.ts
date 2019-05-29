import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupsListingComponent } from './groups-listing/groups-listing.component';
import { GroupsService } from './services/groups.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  declarations: [GroupComponent, GroupsListingComponent],
  entryComponents: [GroupComponent],
  imports: [CommonModule, DragDropModule, NgZorroAntdModule],
  providers: [GroupsService]
})
export class GroupModule {}
