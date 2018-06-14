import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BorrowerViewModel } from './shared/borrowerViewModel';


@Component({
  selector: 'lms-edit-borrower',
  templateUrl: './edit-borrower.component.html',
  styleUrls: ['./edit-borrower.component.scss']
})
export class EditBorrowerComponent implements OnInit {
  borrowerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditBorrowerComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialInfo = this.defaults as BorrowerViewModel;
  
    this.borrowerForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtName: [initialInfo.Name,],
      txtAddress: [initialInfo.Address,],
      txtPhone: [initialInfo.Phone,]
    });
  }

  save() {
    let borrowerDetail = {
      id: this.borrowerForm.value.id,
      Name: this.borrowerForm.value.txtName,
      Address: this.borrowerForm.value.txtAddress,
      Phone: this.borrowerForm.value.txtPhone,
    };
    this.dialogRef.close(borrowerDetail);
  }
}
