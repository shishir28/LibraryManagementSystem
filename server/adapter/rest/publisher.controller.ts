import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { PublisherService } from '../../businessService/publisher.service';
import { publisher } from '../../domain/publisher';

export class PublisherController {

  private publisherService: PublisherService;
  public addRoutes(api: express.Router) {
    api.post('/api/publisher', (request: express.Request, response: express.Response) => this.createPublisher(request, response));
    api.put('/api/publisher/:id', (request: express.Request, response: express.Response) => this.updatePublisher(request, response));
    api.get('/api/publisher/:id', (request: express.Request, response: express.Response) => this.getPublisher(request, response));
    api.get('/api/publisher', (request: express.Request, response: express.Response) => this.getAllPublishers(request, response));
    api.delete('/api/publisher/:id', (request: express.Request, response: express.Response) => this.deletePublisher(request, response));
  }

  constructor() {
    this.publisherService = new PublisherService();
  }

  createPublisher(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let publisherData = new publisher();
    publisherData.Name = request.body.Name;
    publisherData.Address = request.body.Address;
    publisherData.Phone = request.body.Phone;

    var result = this.publisherService.createPublisher(publisherData);

    result.then(data => {
      if (data.id > 0) {
        return response.status(201).send(data);
      } else {
        return response.status(412);
      }
    });
  }


  updatePublisher(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let publisherData = new publisher();
    publisherData.id = request.body.id;
    publisherData.Name = request.body.Name;
    publisherData.Address = request.body.Address;
    publisherData.Phone = request.body.Phone;
    var result = this.publisherService.updatePublisher(publisherData);

    result.then(data => {
      if (data) {
        return response.status(204).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getPublisher(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    const publisherId = request.params["id"];
    var result = this.publisherService.getPublisher(publisherId);

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getAllPublishers(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    var result = this.publisherService.getAllPublishers();

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  deletePublisher(request: express.Request, response: express.Response) {
    let result = response.status(500).send({ 'message': 'Dummy deletePublisher Test' });
    return result;
  }
}