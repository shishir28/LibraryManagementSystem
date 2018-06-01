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

  createBorrower(request: express.Request, response: express.Response) {
    let borrowerData = new borrower();
    borrowerData.Name = request.body.Name;
    borrowerData.Address = request.body.Address;
    borrowerData.Phone = request.body.Phone;

    this.borrowerService.createBorrower(borrowerData).then((borrowerInstance: borrower) => {
      return response.status(201).send(borrowerInstance);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }


  updateBorrower(request: express.Request, response: express.Response) {
    let borrowerData = new borrower();
    borrowerData.Name = request.body.Name;
    borrowerData.Address = request.body.Address;
    borrowerData.Phone = request.body.Phone;
    var result = this.borrowerService.updateBorrower(borrowerData);

    this.borrowerService.updateBorrower(borrowerData).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  getBorrower(request: express.Request, response: express.Response){
    const borrowerId = request.params["id"];
    this.borrowerService.getBorrower(borrowerId).then((borrowerInstance: borrower) => {
      return response.status(200).send(borrowerInstance);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  getAllBorrowers(request: express.Request, response: express.Response){
    this.borrowerService.getAllBorrowers().then((borrowers: borrower[]) => {
      return response.status(200).send(borrowers);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  deleteBorrower(request: express.Request, response: express.Response) {
    const borrowerId = request.params["id"];
    this.borrowerService.deleteBorrower(borrowerId).then((data: Boolean) => {
      return response.status(204).send();
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }
}