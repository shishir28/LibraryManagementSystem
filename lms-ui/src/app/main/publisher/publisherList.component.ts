import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { PublisherViewModel } from './shared/publisherViewModel';
import { PublisherService } from './shared/services/publisher.service';
import { NewPublisherComponent } from './new-publisher.component';
import { EditPublisherComponent } from './edit-publisher.component';


@Component({
  selector: 'lms-publisherList',
  templateUrl: './publisherList.component.html',
  styleUrls: ['./publisherList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class PublisherListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<PublisherViewModel[]> = new ReplaySubject<PublisherViewModel[]>(1);
  data$: Observable<PublisherViewModel[]> = this.subject$.asObservable();
  publishers: PublisherViewModel[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Name', property: 'Name', visible: true, isModelProperty: true },
    { name: 'Address', property: 'Address', visible: true, isModelProperty: true },
    { name: 'Phone', property: 'Phone', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },


  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<PublisherViewModel> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private publisherService: PublisherService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  updatePublisher(publisher) {
    this.dialog.open(EditPublisherComponent, {
      data: publisher
    }).afterClosed().subscribe((publisher) => {
      if (publisher) {
        debugger;
        this.publisherService.editPublisher(publisher)
          .subscribe(response => {
            if (response.statusCode == 204) {
              this.publisherService.getAllPublishers()
                .subscribe(records => {
                  this.publishers = records.map(record => new PublisherViewModel(records));
                  this.subject$.next(records);
                });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  createPublisher() {
    this.dialog.open(NewPublisherComponent).afterClosed().subscribe((publisher: PublisherViewModel) => {
      if (publisher) {
        debugger;

        this.publisherService.addPublisher(publisher)
          .subscribe(response => {
            if (response.statusCode == 201) {
              this.publisherService.getAllPublishers()
                .subscribe(records => {
                  this.publishers = records.map(record => new PublisherViewModel(records));
                  this.subject$.next(records);
                });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  deletePublisher(publisher) {
    this.publisherService.deletePublisher(publisher).subscribe(response => {
      if (response.statusCode == 204) {
        const index = this.publishers.findIndex((existingPublisher) => existingPublisher.id === publisher.id);
        this.publishers.splice(index, 1);
        this.subject$.next(this.publishers);
      } else if (response.statusCode == 500) {
        alert('oops');
      }
    });
  }

  ngOnInit() {
    this.publisherService.getAllPublishers()
      .subscribe(records => {
        this.publishers = records.map(record => new PublisherViewModel(records));
        this.subject$.next(records);
      });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((publishers) => {
      this.publishers = publishers;
      this.dataSource.data = publishers;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }
}
