import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from './shared/book.model';

@Component({
  selector: 'lms-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {
  bookForm: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewBookComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      txtTitle: ['',],
      txtPublisherName: [''],
    });
  }

  save() {

    let bookDetail = {
      Title: this.bookForm.value.txtTitle,
      PublisherId: this.bookForm.value.txtPublisherName
    };
    this.dialogRef.close(bookDetail);
  }
}
