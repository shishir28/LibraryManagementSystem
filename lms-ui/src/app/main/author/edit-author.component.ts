import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthorViewModel } from './shared/authorViewModel';

@Component({
  selector: 'lms-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditAuthorComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialInfo = this.defaults as AuthorViewModel;
  
    this.authorForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtAuthorName: [initialInfo.AuthorName,],
    });
  }

  save() {
    let authorDetail = {
      id: this.authorForm.value.id,
      AuthorName: this.authorForm.value.txtAuthorName,
    };
    this.dialogRef.close(authorDetail);
  }
}
