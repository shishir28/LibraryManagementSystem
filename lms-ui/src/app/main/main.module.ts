import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { bookConfig } from './book/book.module';
import { borrowerConfig } from './borrower/borrower.module';
import { branchConfig } from './branch/branch.module';
import { publisherConfig } from './publisher/publisher.module';
import { authorConfig } from './author/author.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        ...bookConfig.imports,
        ...borrowerConfig.imports,
        ...publisherConfig.imports,
        ...authorConfig.imports,
    ],

    declarations: [
        ...bookConfig.declarations,
        ...borrowerConfig.declarations,
        ...branchConfig.declarations,
        ...publisherConfig.declarations,
        ...authorConfig.declarations,
    ],
    entryComponents: [
        ...bookConfig.entryComponents,
        ...borrowerConfig.entryComponents,
        ...branchConfig.entryComponents,
        ...publisherConfig.entryComponents,
        ...authorConfig.entryComponents,

    ],
    exports: [
        ...bookConfig.exports,
        ...borrowerConfig.exports,
        ...branchConfig.exports,
        ...publisherConfig.exports,
        ...authorConfig.exports,
    ],
    providers: [
        ...bookConfig.providers,
        ...borrowerConfig.providers,
        ...branchConfig.providers,
        ...publisherConfig.providers,
        ...authorConfig.providers,
    ]
})
export class MainModule { }
