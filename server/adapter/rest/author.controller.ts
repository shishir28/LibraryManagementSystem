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

  createAuthor(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let authorData = new author();
    authorData.BookId = request.body.BookId;
    authorData.AuthorName = request.body.AuthorName;
    var result = this.authorService.createAuthor(authorData);

    result.then(data => {
      if (data.id > 0) {
        return response.status(201).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  updateAuthor(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let authorData = new author();
    authorData.id = request.body.id;
    authorData.BookId = request.body.BookId;
    authorData.AuthorName = request.body.AuthorName;
    var result = this.authorService.updateAuthor(authorData);

    result.then(data => {
      if (data) {
        return response.status(204).send(data);
      } else {       
        return response.status(412).send();        
      }
    });
  }

  getAuthor(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    const authorId = request.params["id"];
    var result = this.authorService.getAuthor(authorId);

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getAllAuthors(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    var result = this.authorService.getAllAuthors();
    console.log('getAllAuthors');
    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  deleteAuthor(request: express.Request, response: express.Response) {
    let result = response.status(500).send({ 'message': 'Dummy deleteAuthor Test' });
    return result;
  }
}