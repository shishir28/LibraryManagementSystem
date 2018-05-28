import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as serveStatic from "serve-static";
import { BookController } from './book.controller';
import { BranchController } from './branch.controller';
import { BorrowerController } from './borrower.controller';
import { PublisherController } from './publisher.controller';
import { AuthorController } from "./author.controller";

class API {
    public api: express.Express;

    constructor() {
        this.api = express();
        this.configureMiddlwares();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const publicDir = path.join(path.resolve(__dirname, '../../public'));
        this.api.use('/', serveStatic(path.resolve(publicDir)));
        this.api.use('/favicon.ico', serveStatic(path.resolve(publicDir, 'favicon.ico')));

        const router = express.Router();
        // need to check if request status is not 404 or oath does not start with api then 
        let bookController = new BookController();
        bookController.addRoutes(this.api);

        let branchController = new BranchController();
        branchController.addRoutes(this.api);

        let borrowerController = new BorrowerController();
        borrowerController.addRoutes(this.api);

        let publisherController = new PublisherController();
        publisherController.addRoutes(this.api);

        let authorController = new AuthorController();
        authorController.addRoutes(this.api);

        router.get('/', (req, res) => {
            res.sendFile(path.join(publicDir, '/index.html'));
        });
        this.api.use('/', router);
    }

    private configureMiddlwares(): void {

        // this.api.use(cors());
        this.api.use(bodyParser.urlencoded({
            extended: true
        }));

        this.api.use(bodyParser.json());
    }
}

export default new API().api