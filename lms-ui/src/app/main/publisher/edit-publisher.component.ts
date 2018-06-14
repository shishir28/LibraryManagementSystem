import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublisherViewModel } from './shared/publisherViewModel';

@Component({
  selector: 'lms-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.scss']
})
export class EditPublisherComponent implements OnInit {
  publisherForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditPublisherComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialInfo = this.defaults as PublisherViewModel;
  
    this.publisherForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtName: [initialInfo.Name,],
      txtAddress: [initialInfo.Address,],
      txtPhone: [initialInfo.Phone,]
    });
  }

  save() {
    let publisherDetail = {
      id: this.publisherForm.value.id,
      Name: this.publisherForm.value.txtName,
      Address: this.publisherForm.value.txtAddress,
      Phone: this.publisherForm.value.txtPhone,
    };
    this.dialogRef.close(publisherDetail);
  }
}
