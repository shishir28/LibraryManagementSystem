// import {Book} from "./domain/Book";
// import {BookViewModel } from "./adapter/viewModel/bookViewModel";
import 'automapper-ts/dist/automapper';

export class AutoMapperBootStrapper {

    constructor() {
    }

    public bootstrap() {
        automapper.initialize((config: AutoMapperJs.IConfiguration) => {
            config.createMap('Book', 'BookViewModel')
                .forMember('PublisherName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('publisher.Name'));
        });
    }
}