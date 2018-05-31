import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { Branch } from './shared/branch.model';
import { BranchService } from './shared/services/branch.service'

@Component({
  selector: 'lms-branchList',
  templateUrl: './branchList.component.html',
  styleUrls: ['./branchList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class BranchListComponent implements OnInit, AfterViewInit, OnDestroy {
 
  subject$: ReplaySubject<Branch[]> = new ReplaySubject<Branch[]>(1);
  data$: Observable<Branch[]> = this.subject$.asObservable();
  branches: Branch[];

  @Input()
  columns: ListColumn[] = [
    { name: 'id', property: 'id', visible: true },
    { name: 'Branch Name', property: 'BranchName', visible: true },
    { name: 'Address', property: 'Address', visible: true }

  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Branch> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private borrowerService:BranchService ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit() {
    this.borrowerService.getAllBranches()
    .subscribe(records=> {
      this.branches  =  records.map(record=> new Branch(records));
      this.subject$.next(records);
    });
  

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((branches) => {
      this.branches = branches;
      this.dataSource.data = branches;
     
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
