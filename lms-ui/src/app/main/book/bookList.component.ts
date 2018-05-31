import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../core/common/list/list-column.model';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { Book } from './shared/book.model';
import { BookService } from './shared/services/book.service'
import { NewBookComponent } from './new-book.component';
import { EditBookComponent } from './edit-book.component';

@Component({
  selector: 'lms-bookList',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class BookListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<Book[]> = new ReplaySubject<Book[]>(1);
  data$: Observable<Book[]> = this.subject$.asObservable();
  books: Book[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Title', property: 'Title', visible: true, isModelProperty: true },
    { name: 'Publisher Name', property: 'PublisherName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },

  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Book> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private bookService: BookService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  updateBook(book) {
    this.dialog.open(EditBookComponent, {
      data: book
    }).afterClosed().subscribe((book) => {
      debugger;

      if (book) {
        this.bookService.editBook(book)
          .subscribe(response => {
            if (response.statusCode == 204) {
             
              const index = this.books.findIndex((existingBook) => existingBook.id === book.id);
              this.books[index] = book;
              this.subject$.next(this.books);
            } else if (response.statusCode == 412) {
              alert('oops');
            }
          });
      }
    });

  }

  createBook() {
    this.dialog.open(NewBookComponent).afterClosed().subscribe((book: Book) => {
      if (book) {
        this.bookService.addBook(book)
          .subscribe(response => {
            if (response.statusCode == 201) {
              let book = response.responseBody as Book;
              this.books.push(book);
              this.subject$.next(this.books);
            } else if (response.statusCode == 412) {
              alert('oops');
            }
          });
      }
    });
  }

  ngOnInit() {
    this.bookService.getAllBooks()
      .subscribe(records => {
        this.books = records.map(record => new Book(records));
        this.subject$.next(records);
      });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((books) => {
      this.books = books;
      this.dataSource.data = books;
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
