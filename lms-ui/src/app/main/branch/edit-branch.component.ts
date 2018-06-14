import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BranchViewModel } from './shared/branchViewModel';


@Component({
  selector: 'lms-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent implements OnInit {
  branchForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditBranchComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialInfo = this.defaults as BranchViewModel;
  
    this.branchForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtBranchName: [initialInfo.BranchName,],
      txtAddress: [initialInfo.Address,],
    });
  }

  save() {
    let branchDetail = {
      id: this.branchForm.value.id,
      BranchName: this.branchForm.value.txtBranchName,
      Address: this.branchForm.value.txtAddress,
    };
    this.dialogRef.close(branchDetail);
  }
}
