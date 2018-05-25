import * as express from "express";
import api from './adapter/rest/api';

class App {
  public express:express.Express;

  constructor() {
    this.express = api
  }
}

export default new App().express