import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { BorrowerViewModel } from './shared/borrowerViewModel';
import { BorrowerService } from './shared/services/borrower.service';
import { NewBorrowerComponent } from './new-borrower.component';
import { EditBorrowerComponent } from './edit-borrower.component';



@Component({
  selector: 'lms-borrowerList',
  templateUrl: './borrowerList.component.html',
  styleUrls: ['./borrowerList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class BorrowerListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<BorrowerViewModel[]> = new ReplaySubject<BorrowerViewModel[]>(1);
  data$: Observable<BorrowerViewModel[]> = this.subject$.asObservable();
  borrowers: BorrowerViewModel[];

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
  dataSource: MatTableDataSource<BorrowerViewModel> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private borrowerService: BorrowerService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  updateBorrower(borrower) {
    this.dialog.open(EditBorrowerComponent, {
      data: borrower
    }).afterClosed().subscribe((borrower) => {
      if (borrower) {
        this.borrowerService.editBorrower(borrower)
          .subscribe(response => {
            if (response.statusCode == 204) {              
              this.borrowerService.getAllBorrowers()
              .subscribe(records => {
                this.borrowers = records.map(record => new BorrowerViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  createBorrower() {
    this.dialog.open(NewBorrowerComponent).afterClosed().subscribe((borrower: BorrowerViewModel) => {
      if (borrower) {
        this.borrowerService.addBorrower(borrower)
          .subscribe(response => {
            if (response.statusCode == 201) {
              this.borrowerService.getAllBorrowers()
              .subscribe(records => {
                this.borrowers = records.map(record => new BorrowerViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  deleteBorrower(borrower) {    
    this.borrowerService.deleteBorrower(borrower).subscribe(response => {      
      if (response.statusCode == 204) {        
        const index = this.borrowers.findIndex((existingBorrower) => existingBorrower.id === borrower.id);
        this.borrowers.splice(index, 1);
        this.subject$.next(this.borrowers);
      } else if (response.statusCode == 500) {
        alert('oops');
      }
    });
  }

  ngOnInit() {
    this.borrowerService.getAllBorrowers()
      .subscribe(records => {
        this.borrowers = records.map(record => new BorrowerViewModel(records));
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
