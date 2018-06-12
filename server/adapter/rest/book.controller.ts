import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { BookService } from '../../businessService/book.service';
import { Book } from '../../domain/Book';

export class BookController {

  private bookService: BookService;
  public addRoutes(api: express.Router) {
    api.post('/api/book', (request: express.Request, response: express.Response) => this.createBook(request, response));
    api.put('/api/book/:id', (request: express.Request, response: express.Response) => this.updateBook(request, response));
    api.get('/api/book/:id', (request: express.Request, response: express.Response) => this.getBook(request, response));
    api.get('/api/book', (request: express.Request, response: express.Response) => this.getAllBooks(request, response));
    api.delete('/api/book/:id', (request: express.Request, response: express.Response) => this.deleteBook(request, response));
  }

  constructor() {
    this.bookService = new BookService();
  }

  createBook(request: express.Request, response: express.Response) {
    let bookData = new Book();
    bookData.Title = request.body.Title;
    bookData.PublisherId = request.body.PublisherId;

    this.bookService.createBook(bookData).then((bookInstance: Book) => {
      return response.status(201).send(bookInstance);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }


  updateBook(request: express.Request, response: express.Response) {
    let bookData = new Book();
    bookData.id = request.body.id;
    bookData.Title = request.body.Title;
    bookData.PublisherId = request.body.PublisherId;
    var result = this.bookService.updateBook(bookData);

    this.bookService.updateBook(bookData).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  getBook(request: express.Request, response: express.Response){
    const bookId = request.params["id"];
    this.bookService.getBook(bookId).then((bookInstance: Book) => {
      return response.status(200).send(bookInstance);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  getAllBooks(request: express.Request, response: express.Response){
    this.bookService.getAllBooks().then((books: Book[]) => {
      return response.status(200).send(books);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  deleteBook(request: express.Request, response: express.Response) {
    const bookId = request.params["id"];
    this.bookService.deleteBook(bookId).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }
}