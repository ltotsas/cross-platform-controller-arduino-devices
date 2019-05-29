import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss']
})
export class CreateGroupModalComponent implements OnInit {
  validateForm: FormGroup;
  @Input() currentGroup: string;
  constructor(private modal: NzModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      name: [null, [Validators.required]],
      color: [null, [Validators.required]]
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
