import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lms-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() current: string;
  @Input() crumbs: any[];

  constructor() {
  }

  ngOnInit() {
  }

}
