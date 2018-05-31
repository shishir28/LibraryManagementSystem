import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { Author } from './shared/author.model';
import { AuthorService } from './shared/services/author.service'

@Component({
  selector: 'fury-authorList',
  templateUrl: './authorList.component.html',
  styleUrls: ['./authorList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class AuthorListComponent implements OnInit, AfterViewInit, OnDestroy {
 
  subject$: ReplaySubject<Author[]> = new ReplaySubject<Author[]>(1);
  data$: Observable<Author[]> = this.subject$.asObservable();
  authors: Author[];

  @Input()
  columns: ListColumn[] = [
    { name: 'id', property: 'id', visible: true },
    { name: 'Book Id', property: 'BookId', visible: true },
    { name: 'Author Name', property: 'AuthorName', visible: true }

  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Author> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private authorService:AuthorService ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit() {
    this.authorService.getAllAuthors()
    .subscribe(records=> {
      this.authors  =  records.map(record=> new Author(records));
      this.subject$.next(records);
    });
  

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((authors) => {
      this.authors = authors;
      this.dataSource.data = authors;
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
