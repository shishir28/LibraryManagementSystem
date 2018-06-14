import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { BranchViewModel } from './shared/branchViewModel';
import { BranchService } from './shared/services/branch.service';
import { NewBranchComponent } from './new-branch.component';
import { EditBranchComponent } from './edit-branch.component';


@Component({
  selector: 'lms-branchList',
  templateUrl: './branchList.component.html',
  styleUrls: ['./branchList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class BranchListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<BranchViewModel[]> = new ReplaySubject<BranchViewModel[]>(1);
  data$: Observable<BranchViewModel[]> = this.subject$.asObservable();
  branches: BranchViewModel[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'id', property: 'id', visible: true, isModelProperty: true },
    { name: 'BranchName', property: 'BranchName', visible: true, isModelProperty: true },
    { name: 'Address', property: 'Address', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },


  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<BranchViewModel> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private branchService: BranchService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  updateBranch(branch) {
    this.dialog.open(EditBranchComponent, {
      data: branch
    }).afterClosed().subscribe((branch) => {
      if (branch) {
        this.branchService.editBranch(branch)
          .subscribe(response => {
            if (response.statusCode == 204) {              
              this.branchService.getAllBranches()
              .subscribe(records => {
                this.branches = records.map(record => new BranchViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  createBranch() {
    this.dialog.open(NewBranchComponent).afterClosed().subscribe((branch: BranchViewModel) => {
      if (branch) {
        this.branchService.addBranch(branch)
          .subscribe(response => {
            if (response.statusCode == 201) {
              this.branchService.getAllBranches()
              .subscribe(records => {
                this.branches = records.map(record => new BranchViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  deleteBranch(branch) {    
    this.branchService.deleteBranch(branch).subscribe(response => {      
      if (response.statusCode == 204) {        
        const index = this.branches.findIndex((existingBranch) => existingBranch.id === branch.id);
        this.branches.splice(index, 1);
        this.subject$.next(this.branches);
      } else if (response.statusCode == 500) {
        alert('oops');
      }
    });
  }

  ngOnInit() {
    this.branchService.getAllBranches()
      .subscribe(records => {
        this.branches = records.map(record => new BranchViewModel(records));
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
