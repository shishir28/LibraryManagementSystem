
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as serveStatic from "serve-static";


class App {
  public express;

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const router = express.Router();
    const root = path.join(path.resolve(__dirname, 'public'));

    // // Static assets
    this.express.use('/', serveStatic(path.resolve(root)));
    this.express.use('/favicon.ico', serveStatic(path.resolve(root, 'favicon.ico')));

    router.get('/', (req, res) => {
      res.sendFile(path.join(root, '/index.html'));

    })
    this.express.use('/', router)
  }
}

export default new App().express