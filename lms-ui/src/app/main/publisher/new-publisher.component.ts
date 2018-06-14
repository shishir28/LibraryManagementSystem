import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lms-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.scss']
})
export class NewPublisherComponent implements OnInit {
  publisherForm: FormGroup;  

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewPublisherComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.publisherForm = this.formBuilder.group({
      txtName: ['',],
      txtAddress: ['',],
      txtPhone: ['',],
    });
  }

  save() {
    let publisherDetail = {
      Name: this.publisherForm.value.txtName,
      Address: this.publisherForm.value.txtAddress,
      Phone: this.publisherForm.value.txtPhone,
    };
    debugger;
    this.dialogRef.close(publisherDetail);
  }
}
