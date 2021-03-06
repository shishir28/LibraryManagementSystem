import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { PublisherService } from '../../businessService/publisher.service';
import { } from "automapper-ts/dist/automapper";
import { Publisher } from '../../domain/Publisher';
import { PublisherViewModel } from '../viewModel/publisherViewModel';

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

  createPublisher(request: express.Request, response: express.Response) {
    let publisherData = new Publisher();
    publisherData.Name = request.body.Name;
    publisherData.Address = request.body.Address;
    publisherData.Phone = request.body.Phone;

    this.publisherService.createPublisher(publisherData).then((publisherInstance: Publisher) => {
      let result = (automapper.map('Publisher', 'PublisherViewModel', publisherInstance) as PublisherViewModel);
      return response.status(201).send(result);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  updatePublisher(request: express.Request, response: express.Response) {
    let publisherData = new Publisher();
    publisherData.id = request.body.id;
    publisherData.Name = request.body.Name;
    publisherData.Address = request.body.Address;
    publisherData.Phone = request.body.Phone;
    var result = this.publisherService.updatePublisher(publisherData);

    this.publisherService.updatePublisher(publisherData).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  getPublisher(request: express.Request, response: express.Response){
    const publisherId = request.params["id"];
    this.publisherService.getPublisher(publisherId).then((publisherInstance: Publisher) => {
      let result = (automapper.map('Publisher', 'PublisherViewModel', publisherInstance) as PublisherViewModel);
      return response.status(200).send(result);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  getAllPublishers(request: express.Request, response: express.Response){
    this.publisherService.getAllPublishers().then((publishers: Publisher[]) => {
      let result = (automapper.map('Publisher', 'PublisherViewModel', publishers) as PublisherViewModel[]);
      return response.status(200).send(result);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  deletePublisher(request: express.Request, response: express.Response) {
    const publisherId = request.params["id"];
    this.publisherService.deletePublisher(publisherId).then((data: Boolean) => {
      return response.status(204).send();
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }
}