import 'automapper-ts/dist/automapper'

import { Book } from './domain/Book';
import { BookViewModel } from "./adapter/viewModel/bookViewModel";


// export class Mapper {

//     constructor() {
//     }

//     public bootstrapMapping() {
//         automapper.initialize((config: AutoMapperJs.IConfiguration) => {
//             config.createMap('Book', 'BookViewModel')
//                         .forMember('PublisherName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('publisher.Name')) ;
//         });

//     }
// }


export class AutoMapperBootStrapper {

    constructor() {
    }

    public bootstrap() {
        automapper.initialize((config: AutoMapperJs.IConfiguration) => {
            config.createMap('Book', 'BookViewModel')
                        .forMember('PublisherName', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('publisher.Name')) ;
        });

    }
}


