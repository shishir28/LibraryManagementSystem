import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { BorrowerService } from '../../businessService/borrower.service';
import { borrower } from '../../domain/borrower';

export class BorrowerController {

  private borrowerService: BorrowerService;
  public addRoutes(api: express.Router) {
    api.post('/api/borrower', (request: express.Request, response: express.Response) => this.createBorrower(request, response));
    api.put('/api/borrower/:id', (request: express.Request, response: express.Response) => this.updateBorrower(request, response));
    api.get('/api/borrower/:id', (request: express.Request, response: express.Response) => this.getBorrower(request, response));
    api.get('/api/borrower', (request: express.Request, response: express.Response) => this.getAllBorrowers(request, response));
    api.delete('/api/borrower/:id', (request: express.Request, response: express.Response) => this.deleteBorrower(request, response));
  }

  constructor() {
    this.borrowerService = new BorrowerService();
  }

  createBorrower(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let borrowerData = new borrower();
    borrowerData.Name = request.body.Name;
    borrowerData.Address = request.body.Address;
    borrowerData.Phone = request.body.Phone;
    
    var result = this.borrowerService.createBorrower(borrowerData);

    result.then(data => {
      if (data.id > 0) {
        return response.status(201).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  updateBorrower(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let borrowerData = new borrower();
    borrowerData.Name = request.body.Name;
    borrowerData.Address = request.body.Address;
    borrowerData.Phone = request.body.Phone;
    var result = this.borrowerService.updateBorrower(borrowerData);

    result.then(data => {
      if (data) {
        return response.status(204).send(data);
      } else {       
        return response.status(412).send();        
      }
    });
  }

  getBorrower(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    const borrowerId = request.params["id"];
    var result = this.borrowerService.getBorrower(borrowerId);

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getAllBorrowers(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    var result = this.borrowerService.getAllBorrowers();

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  deleteBorrower(request: express.Request, response: express.Response) {
    let result = response.status(500).send({ 'message': 'Dummy deleteBorrower Test' });
    return result;
  }
}