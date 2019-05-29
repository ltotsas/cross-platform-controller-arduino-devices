import { GroupsService } from '../../groups/services/groups.service';
import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DevicesModalComponent } from '@app/shared/devices-modal/devices-modal.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { GroupsState } from '@app/groups/state/groups-state';
import { AddDeviceToGroup, CreateNewGroup, RemoveDeviceFromGroup } from '../../groups/state/groups-actions';
import { CreateGroupModalComponent } from '../../shared/create-group-modal/create-group-modal.component';
import { ParamsModalComponent } from '../../shared/params-modal/params-modal.component';

@Injectable()
export class ModalService {
  @Select(GroupsState.getGroups) groups$: Observable<any>;

  constructor(private modalService: NzModalService, private store: Store, private groupsService: GroupsService) {}

  createDevListingModal(groupName: string): void {
    const modal: NzModalRef = this.modalService.create({
      nzWrapClassName: 'vertical-center-modal',
      nzTitle: 'Edit group',
      nzContent: DevicesModalComponent,
      nzComponentParams: {
        devices$: this.groups$,
        currentGroup: groupName
      },
      nzFooter: [
        {
          label: 'Submit',
          shape: 'default',
          onClick: componentInstance => {
            componentInstance.destroyModal();
          }
        },
        {
          label: 'Cancel',
          shape: 'default',
          onClick: () => modal.destroy()
        }
      ]
    });
    // Return a result when closed
    modal.afterClose.subscribe((result: any) => {
      if (result.added !== '') {
        result.added.map((dev: any) => {
          this.store.dispatch(new AddDeviceToGroup(dev, groupName));
        });
      }
      if (result.removed !== '') {
        result.removed.map((dev: any) => {
          this.store.dispatch(new RemoveDeviceFromGroup(dev, groupName));
        });
      }
      console.log('[afterClose] The result is:', result);
    });
  }

  createNewGroupModal(groupName: string): void {
    const modal: NzModalRef = this.modalService.create({
      nzWrapClassName: 'vertical-center-modal',
      nzTitle: 'Create a group',
      nzContent: CreateGroupModalComponent,
      nzComponentParams: {
        currentGroup: groupName
      },
      nzFooter: [
        {
          label: 'Submit',
          shape: 'default',
          onClick: componentInstance => {
            componentInstance.submitForm();
          }
        },
        {
          label: 'Cancel',
          shape: 'default',
          onClick: () => modal.destroy()
        }
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result: any) => {
      if (result.data !== '') {
        const color = result.data['color'];
        const name = result.data['name'];
        this.store.dispatch(new CreateNewGroup(name, color));
      }
      console.log('[afterClose] The result is:', result.data['color']);
    });
  }

  changeParamsModal(groupName: string): NzModalRef {
    const modal: NzModalRef = this.modalService.create({
      nzWrapClassName: 'vertical-center-modal',
      nzTitle: 'Change parameters',
      nzContent: ParamsModalComponent,
      nzComponentParams: {
        currentGroup: groupName
      },
      nzFooter: [
        {
          label: 'Submit',
          shape: 'default',
          onClick: componentInstance => {
            componentInstance.submitForm();
          }
        },
        {
          label: 'Cancel',
          shape: 'default',
          onClick: () => modal.destroy()
        }
      ]
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    return modal;
  }
}
