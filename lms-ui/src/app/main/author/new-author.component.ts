import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorViewModel } from './shared/authorViewModel';

@Component({
  selector: 'lms-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent implements OnInit {
  authorForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewAuthorComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      txtAuthorName: ['',],
    });
  }

  save() {
    let authorDetail = {
      AuthorName: this.authorForm.value.txtAuthorName,
    };
    this.dialogRef.close(authorDetail);
  }
}
