import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nz-pagination
      style="text-align:center"
      [(nzPageIndex)]="currentPage"
      [nzTotal]="total"
      [nzSize]="'small'"
      [(nzPageSize)]="currentSize"
      nzShowSizeChanger
      (nzPageIndexChange)="
        emitPage.emit({ page: currentPage, size: currentSize })
      "
      (nzPageSizeChange)="
        emitPage.emit({ page: currentPage, size: currentSize })
      "
    ></nz-pagination>
  `,
})
export class PaginationComponent {
  @Input() total: number = 0;
  @Output() emitPage: EventEmitter<any> = new EventEmitter();
  currentPage = 1;
  currentSize = 10;
  pageSize: any;
  getPage(page: number) {
    this.currentPage = page;
  }
  getSize(size: number) {
    this.currentSize = size;
  }
  ngOnInit(): void {
    this.emitPage.emit({ page: this.currentPage, size: this.currentSize });
  }
}
