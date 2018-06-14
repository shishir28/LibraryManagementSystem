import * as express from "express";
import * as expressServeStaticCore from "express-serve-static-core"
import { BranchService } from '../../businessService/branch.service';

import { } from "automapper-ts/dist/automapper";
import { Branch } from '../../domain/Branch';
import { BranchViewModel } from '../viewModel/branchViewModel';


export class BranchController {

  private branchService: BranchService;
  public addRoutes(api: express.Router) {
    api.post('/api/branch', (request: express.Request, response: express.Response) => this.createBranch(request, response));
    api.put('/api/branch/:id', (request: express.Request, response: express.Response) => this.updateBranch(request, response));
    api.get('/api/branch/:id', (request: express.Request, response: express.Response) => this.getBranch(request, response));
    api.get('/api/branch', (request: express.Request, response: express.Response) => this.getAllBranches(request, response));
    api.delete('/api/branch/:id', (request: express.Request, response: express.Response) => this.deleteBranch(request, response));
  }

  constructor() {
    this.branchService = new BranchService();
  }

  createBranch(request: express.Request, response: express.Response) {
    let branchData = new Branch();
    branchData.BranchName = request.body.BranchName;
    branchData.Address = request.body.Address;

    this.branchService.createBranch(branchData).then((branchInstance: Branch) => {
      let result = (automapper.map('Branch', 'BranchViewModel', branchInstance) as BranchViewModel);
      return response.status(201).send(result);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  updateBranch(request: express.Request, response: express.Response) {
    let branchData = new Branch();
    branchData.id = request.body.id;
    branchData.BranchName = request.body.BranchName;
    branchData.Address = request.body.Address;
    var result = this.branchService.updateBranch(branchData);

    this.branchService.updateBranch(branchData).then((data: Boolean) => {
      return response.status(204).send(data);
    }).catch((error: Error) => {
      return response.status(409).send(error);
    });
  }

  getBranch(request: express.Request, response: express.Response){
    const branchId = request.params["id"];
    this.branchService.getBranch(branchId).then((branchInstance: Branch) => {
      let result = (automapper.map('Branch', 'BranchViewModel', branchInstance) as BranchViewModel);
      return response.status(200).send(result);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  getAllBranches(request: express.Request, response: express.Response){
    this.branchService.getAllBranches().then((branches: Branch[]) => {
      let result = (automapper.map('Branch', 'BranchViewModel', branches) as BranchViewModel[]);
      return response.status(200).send(result);
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }

  deleteBranch(request: express.Request, response: express.Response) {
    const branchId = request.params["id"];
    this.branchService.deleteBranch(branchId).then((data: Boolean) => {
      return response.status(204).send();
    }).catch((error: Error) => {
      return response.status(500).send(error);
    });
  }
}