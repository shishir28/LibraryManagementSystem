import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PublisherService } from '../publisher/shared/services/publisher.service';

import { BookViewModel } from './shared/bookViewModel';
import { PublisherViewModel } from '../publisher/shared/publisherViewModel';


@Component({
  selector: 'lms-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {
  bookForm: FormGroup;
  public publishers: PublisherViewModel[];
  public selectedPublisherId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<NewBookComponent>,
    private formBuilder: FormBuilder,
    private publisherService: PublisherService) {
  }

  ngOnInit() {
    this.publisherService.getAllPublishers()
      .subscribe(publishers => {
        this.publishers = publishers;
      })

    this.bookForm = this.formBuilder.group({
      txtTitle: ['',],
    });
  }

  save() {
    let bookDetail = {
      Title: this.bookForm.value.txtTitle,
      PublisherId: this.selectedPublisherId
    };
    this.dialogRef.close(bookDetail);
  }
}
