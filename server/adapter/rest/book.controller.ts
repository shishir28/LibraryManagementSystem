import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { BookService } from '../../businessService/book.service';
import { book } from '../../domain/book';

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

  createBook(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let bookData = new book();
    bookData.Title = request.body.Title;
    bookData.PublisherName = request.body.PublisherName;
    var result = this.bookService.createBook(bookData);

    result.then(data => {
      if (data.id > 0) {
        return response.status(201).send(data);
      } else {
        return response.status(412);
      }
    });
  }


  updateBook(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let bookData = new book();
    bookData.id = request.body.id;
    bookData.Title = request.body.Title;
    bookData.PublisherName = request.body.PublisherName;
    var result = this.bookService.updateBook(bookData);

    result.then(data => {
      if (data) {
        return response.status(204).send(data);
      } else {       
        return response.status(412).send();        
      }
    });
  }

  getBook(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    const bookId = request.params["id"];
    var result = this.bookService.getBook(bookId);

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getAllBooks(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    var result = this.bookService.getAllBooks();

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  deleteBook(request: express.Request, response: express.Response) {
    let result = response.status(500).send({ 'message': 'Dummy deleteBook Test' });
    return result;
  }
}