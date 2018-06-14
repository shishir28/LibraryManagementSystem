import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';


import { BorrowerViewModel } from './shared/borrowerViewModel';


@Component({
  selector: 'lms-new-borrower',
  templateUrl: './new-borrower.component.html',
  styleUrls: ['./new-borrower.component.scss']
})
export class NewBorrowerComponent implements OnInit {
  borrowerForm: FormGroup;  

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewBorrowerComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.borrowerForm = this.formBuilder.group({
      txtName: ['',],
      txtAddress: ['',],
      txtPhone: ['',],
    });
  }

  save() {
    let borrowerDetail = {
      Name: this.borrowerForm.value.txtName,
      Address: this.borrowerForm.value.txtAddress,
      Phone: this.borrowerForm.value.txtPhone,
    };
    this.dialogRef.close(borrowerDetail);
  }
}
