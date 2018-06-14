import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublisherService } from '../publisher/shared/services/publisher.service';

import { BookViewModel } from './shared/bookViewModel';
import { PublisherViewModel } from '../publisher/shared/publisherViewModel';

@Component({
  selector: 'lms-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  public publishers: PublisherViewModel[];
  public selectedPublisherId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EditBookComponent>,
    private formBuilder: FormBuilder,
    private publisherService: PublisherService) {
  }

  ngOnInit() {

    let initialInfo = this.defaults as BookViewModel;

    this.publisherService.getAllPublisheres()
      .subscribe(publishers => {
        this.publishers = publishers;
        this.selectedPublisherId = initialInfo.PublisherId
      })

    this.bookForm = this.formBuilder.group({
      id: [initialInfo.id],
      txtTitle: [initialInfo.Title,],
      txtPublisherId: [initialInfo.PublisherId],
    });
  }

  save() {
    let bookDetail = {
      id: this.bookForm.value.id,
      Title: this.bookForm.value.txtTitle,
      PublisherId: this.selectedPublisherId
    };
    this.dialogRef.close(bookDetail);
  }
}
