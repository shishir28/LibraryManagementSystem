import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { AuthorService } from '../../businessService/author.service';
import { author } from '../../domain/author';

export class AuthorController {

  private authorService: AuthorService;
  public addRoutes(api: express.Router) {
    api.post('/api/author', (request: express.Request, response: express.Response) => this.createAuthor(request, response));
    api.put('/api/author/:id', (request: express.Request, response: express.Response) => this.updateAuthor(request, response));
    api.get('/api/author/:id', (request: express.Request, response: express.Response) => this.getAuthor(request, response));
    api.get('/api/author', (request: express.Request, response: express.Response) => this.getAllAuthors(request, response));
    api.delete('/api/author/:id', (request: express.Request, response: express.Response) => this.deleteAuthor(request, response));
  }

  constructor() {
    this.authorService = new AuthorService();
  }

  createAuthor(request: express.Request, response: express.Response) {
    let authorData = new author();
    authorData.BookId = request.body.BookId;
    authorData.AuthorName = request.body.AuthorName;

    this.authorService.createAuthor(authorData).then((authorInstance: author) => {
      return response.status(201).send(authorInstance);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  updateAuthor(request: express.Request, response: express.Response) {
    let authorData = new author();
    authorData.id = request.body.id;
    authorData.BookId = request.body.BookId;
    authorData.AuthorName = request.body.AuthorName;
    var result = this.authorService.updateAuthor(authorData);

    this.authorService.updateAuthor(authorData).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  getAuthor(request: express.Request, response: express.Response){
    const authorId = request.params["id"];
    this.authorService.getAuthor(authorId).then((authorInstance: author) => {
      return response.status(200).send(authorInstance);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  getAllAuthors(request: express.Request, response: express.Response){
    this.authorService.getAllAuthors().then((authors: author[]) => {
      return response.status(200).send(authors);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  deleteAuthor(request: express.Request, response: express.Response) {
    const authorId = request.params["id"];
    this.authorService.deleteAuthor(authorId).then((data: Boolean) => {
      return response.status(204).send();
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }
}