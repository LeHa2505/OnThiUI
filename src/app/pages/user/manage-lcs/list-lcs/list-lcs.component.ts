import { Component } from '@angular/core';
import { LcService } from 'src/app/service/lc-service/lc.service';

@Component({
  selector: 'app-list-lcs',
  templateUrl: './list-lcs.component.html',
  styleUrls: ['./list-lcs.component.less'],
})
export class ListLCsComponent {
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');
  listOfData = [];
  isLoading = true;

  constructor(private lcSer: LcService) {}

  getColorByStatus(status: string): string {
    if (status === 'advising_bank_rejected') {
      return '#f81d22'; // Màu đỏ
    } else if (status === 'advising_bank_approved') {
      return '#0b8235'; // Màu xanh lá cây
    }
    // Màu mặc định hoặc cho trạng thái khác
    return '#000000d9';
  }

  getList() {
    this.lcSer.list().subscribe((res) => {
      this.listOfData = res;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getList();
  }
}
