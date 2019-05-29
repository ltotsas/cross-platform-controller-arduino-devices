import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../groups/models/group.model';

@Component({
  selector: 'app-devices-modal',
  templateUrl: './devices-modal.component.html',
  styleUrls: ['./devices-modal.component.scss']
})
export class DevicesModalComponent implements OnInit {
  _defGroup: Group;
  _curGroup: Group;
  devicesToBeAdded: string[] = [];
  devicesToBeRemoved: string[] = [];

  @Input() devices$: Observable<Group[]>;
  @Input() currentGroup: string;

  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
    this.devices$.subscribe(groups => {
      groups.map(group => {
        if (group.name === 'default') {
          this._defGroup = group;
        }
        if (group.name === this.currentGroup) {
          this._curGroup = group;
        }
      });
    });
  }

  devChecked(event: any, dev: string) {
    if (event.checked === true) {
      this.devicesToBeAdded.push(dev);
    }
  }

  devRemoved(event: any, dev: string) {
    if (event.checked === true) {
      this.devicesToBeRemoved.push(dev);
    }
  }

  destroyModal(): void {
    this.modal.destroy({ added: this.devicesToBeAdded, removed: this.devicesToBeRemoved });
  }
}
