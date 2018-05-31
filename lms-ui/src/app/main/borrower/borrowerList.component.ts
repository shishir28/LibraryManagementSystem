import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { Borrower } from './shared/borrower.model';
import { BorrowerService } from './shared/services/borrower.service'

@Component({
  selector: 'lms-borrowerList',
  templateUrl: './borrowerList.component.html',
  styleUrls: ['./borrowerList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class BorrowerListComponent implements OnInit, AfterViewInit, OnDestroy {
 
  subject$: ReplaySubject<Borrower[]> = new ReplaySubject<Borrower[]>(1);
  data$: Observable<Borrower[]> = this.subject$.asObservable();
  borrowers: Borrower[];

  @Input()
  columns: ListColumn[] = [
    { name: 'id', property: 'id', visible: true },
    { name: 'Name', property: 'Name', visible: true },
    { name: 'Address', property: 'Address', visible: true },
	{ name: 'Phone', property: 'Phone', visible: true },
	

  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Borrower> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private borrowerService:BorrowerService ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit() {
    this.borrowerService.getAllBorrowers()
    .subscribe(records=> {
      this.borrowers  =  records.map(record=> new Borrower(records));
      this.subject$.next(records);
    });
  

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((borrowers) => {
      this.borrowers = borrowers;
      this.dataSource.data = borrowers;
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
