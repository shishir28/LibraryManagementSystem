import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { Publisher } from './shared/publisher.model';
import { PublisherService } from './shared/services/publisher.service'

@Component({
  selector: 'fury-publisherList',
  templateUrl: './publisherList.component.html',
  styleUrls: ['./publisherList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class PublisherListComponent implements OnInit, AfterViewInit, OnDestroy {
 
  subject$: ReplaySubject<Publisher[]> = new ReplaySubject<Publisher[]>(1);
  data$: Observable<Publisher[]> = this.subject$.asObservable();
  publisheres: Publisher[];

  @Input()
  columns: ListColumn[] = [
    { name: 'id', property: 'id', visible: true },
    { name: 'Publisher Name', property: 'Name', visible: true },
    { name: 'Address', property: 'Address', visible: true },
    { name: 'Phone', property: 'Phone', visible: true }    

  ] as ListColumn[];

  


  pageSize = 10;
  dataSource: MatTableDataSource<Publisher> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private borrowerService:PublisherService ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit() {
    this.borrowerService.getAllPublisheres()
    .subscribe(records=> {
      this.publisheres  =  records.map(record=> new Publisher(records));
      this.subject$.next(records);
    });
  

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((publisheres) => {
      this.publisheres = publisheres;
      this.dataSource.data = publisheres;
     
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
