import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { AuthorViewModel } from './shared/authorViewModel';
import { AuthorService } from './shared/services/author.service';
import { NewAuthorComponent } from './new-author.component';
import { EditAuthorComponent } from './edit-author.component';


@Component({
  selector: 'lms-authorList',
  templateUrl: './authorList.component.html',
  styleUrls: ['./authorList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class AuthorListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<AuthorViewModel[]> = new ReplaySubject<AuthorViewModel[]>(1);
  data$: Observable<AuthorViewModel[]> = this.subject$.asObservable();
  authores: AuthorViewModel[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'id', property: 'id', visible: true, isModelProperty: true },
    { name: 'AuthorName', property: 'AuthorName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },


  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<AuthorViewModel> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private authorService: AuthorService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  updateAuthor(author) {
    this.dialog.open(EditAuthorComponent, {
      data: author
    }).afterClosed().subscribe((author) => {
      if (author) {
        this.authorService.editAuthor(author)
          .subscribe(response => {
            if (response.statusCode == 204) {              
              this.authorService.getAllAuthores()
              .subscribe(records => {
                this.authores = records.map(record => new AuthorViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  createAuthor() {
    this.dialog.open(NewAuthorComponent).afterClosed().subscribe((author: AuthorViewModel) => {
      if (author) {
        this.authorService.addAuthor(author)
          .subscribe(response => {
            if (response.statusCode == 201) {
              this.authorService.getAllAuthores()
              .subscribe(records => {
                this.authores = records.map(record => new AuthorViewModel(records));
                this.subject$.next(records);
              });
            } else if (response.statusCode == 409) {
              alert('oops');
            }
          });
      }
    });
  }

  deleteAuthor(author) {    
    this.authorService.deleteAuthor(author).subscribe(response => {      
      if (response.statusCode == 204) {        
        const index = this.authores.findIndex((existingAuthor) => existingAuthor.id === author.id);
        this.authores.splice(index, 1);
        this.subject$.next(this.authores);
      } else if (response.statusCode == 500) {
        alert('oops');
      }
    });
  }

  ngOnInit() {
    this.authorService.getAllAuthores()
      .subscribe(records => {
        this.authores = records.map(record => new AuthorViewModel(records));
        this.subject$.next(records);
      });


    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((authores) => {
      this.authores = authores;
      this.dataSource.data = authores;
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
