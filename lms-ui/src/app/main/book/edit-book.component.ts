import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from './shared/book.model';

@Component({
  selector: 'lms-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditBookComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    
    let initialInfo = this.defaults as Book;
    this.bookForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtTitle: [initialInfo.Title,],
      txtPublisherName: [initialInfo.PublisherName,],
    });  
  }

  save() {
    let bookDetail = {
      id: this.bookForm.value.id,
      Title: this.bookForm.value.txtTitle,
      PublisherName: this.bookForm.value.txtPublisherName
    };
    this.dialogRef.close(bookDetail);
  }
}
