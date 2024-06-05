import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.less']
})
export class FileInfoComponent {
  @Input() isDownloading: boolean = false;
  @Input() fileType: string;
  @Input() isDownloaded: boolean = false;
  @Input() file: any;
  @Input() fileName: any;
  @Input() fileSize: any;
  @Input() link: any;
}
