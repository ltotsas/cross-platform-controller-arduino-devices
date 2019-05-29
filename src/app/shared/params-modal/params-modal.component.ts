import { GroupParameters } from './../../groups/models/group.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GroupsState } from '@app/groups/state/groups-state';

@Component({
  selector: 'app-params-modal',
  templateUrl: './params-modal.component.html',
  styleUrls: ['./params-modal.component.scss']
})
export class ParamsModalComponent implements OnInit {
  validateForm: FormGroup;
  @Input() currentGroup: string;
  params: GroupParameters;

  constructor(private modal: NzModalRef, private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.store
      .select(GroupsState.groupParams)
      .pipe(map(t => t(this.currentGroup)))
      .subscribe(parms => (this.params = parms[0]));
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      amplitude: [this.params.amplitude, [Validators.required]],
      setpoint: [this.params.setpoint, [Validators.required]],
      fansignal: [this.params.fansignal, [Validators.required]],
      active_interval: [this.params.active_interval, [Validators.required]],
      passive_interval: [this.params.passive_interval, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls != null) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.modal.destroy({ data: this.validateForm.value });
  }
}
