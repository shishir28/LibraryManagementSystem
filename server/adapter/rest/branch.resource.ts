import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { BranchService } from '../../businessService/branch.service';
import { branch } from '../../domain/branch';

export class BranchController {

  private branchService: BranchService;
  public addRoutes(api: express.Router) {
    api.post('/api/branch', (request: express.Request, response: express.Response) => this.createBranch(request, response));
    api.put('/api/branch/:id', (request: express.Request, response: express.Response) => this.updateBranch(request, response));
    api.get('/api/branch/:id', (request: express.Request, response: express.Response) => this.getBranch(request, response));
    api.get('/api/branch', (request: express.Request, response: express.Response) => this.getAllBranchs(request, response));
    api.delete('/api/branch/:id', (request: express.Request, response: express.Response) => this.deleteBranch(request, response));
  }

  constructor() {
    this.branchService = new BranchService();
  }

  createBranch(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let branchData = new branch();
    branchData.BranchName = request.body.BranchName;
    branchData.Address = request.body.Address;
    var result = this.branchService.createBranch(branchData);

    result.then(data => {
      if (data.id > 0) {
        return response.status(201).send(data);
      } else {
        return response.status(412);
      }
    });
  }


  updateBranch(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    let branchData = new branch();
    branchData.id = request.body.id;
    branchData.BranchName = request.body.BranchName;
    branchData.Address = request.body.Address;
    var result = this.branchService.updateBranch(branchData);

    result.then(data => {
      if (data) {
        return response.status(204).send(data);
      } else {       
        return response.status(412).send();        
      }
    });
  }

  getBranch(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    const branchId = request.params["id"];
    var result = this.branchService.getBranch(branchId);

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412).send();
      }
    });
  }

  getAllBranchs(request: express.Request, response: express.Response): expressServeStaticCore.Response {
    var result = this.branchService.getAllBranches();

    result.then(data => {
      if (data) {
        return response.status(200).send(data);
      } else {
        return response.status(412);
      }
    });
  }

  deleteBranch(request: express.Request, response: express.Response) {
    let result = response.status(500).send({ 'message': 'Dummy deleteBranch Test' });
    return result;
  }
}