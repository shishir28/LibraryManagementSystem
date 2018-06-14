import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchViewModel } from './shared/branchViewModel';


@Component({
  selector: 'lms-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.scss']
})
export class NewBranchComponent implements OnInit {
  branchForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewBranchComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.branchForm = this.formBuilder.group({
      txtBranchName: ['',],
      txtAddress: ['',],
    });
  }

  save() {
    let branchDetail = {
      BranchName: this.branchForm.value.txtBranchName,
      Address: this.branchForm.value.txtAddress,
    };
    this.dialogRef.close(branchDetail);
  }
}
