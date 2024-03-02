import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less'],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() listBreadCrumb: any = [];

  lengthListBreadCrumb = 0;

  constructor() {}

  ngOnInit() {
    this.lengthListBreadCrumb = this.listBreadCrumb.length;
  }

  ngOnChanges(change: SimpleChanges) {
    this.lengthListBreadCrumb = change['listBreadCrumb'].currentValue.length;
  }
}
