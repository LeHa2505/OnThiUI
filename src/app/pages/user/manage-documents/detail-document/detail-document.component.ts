import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { LcService } from 'src/app/service/lc-service/lc.service';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.less'],
})
export class DetailDocumentComponent implements OnInit {
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');
  lcDetail: any;
  lc_id = '';
  isLoadingPage = true;
  files: any;
  tabs: Array<{
    name: string;
    data: any;
    table: any;
    disabled: boolean;
  }> = [];
  nzTabPosition: NzTabPosition = 'left';
  selectedIndex = 0;

  constructor(
    private fb: FormBuilder,
    private lcSer: LcService,
    private msg: NzMessageService,
    private route: ActivatedRoute
  ) {}
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {
    console.log(args);
  }

  getDetailLC() {
    this.lc_id = this.route.snapshot.paramMap.get('id');
    this.lcSer.detail(this.lc_id).subscribe(
      (res) => {
        this.isLoadingPage = false;
        this.lcDetail = res;
        this.files = res.files;
        this.getListDocument();
      },
      (e) => {
        this.msg.error('Something is wrong!');
      }
    );
  }

  data: any;

  getListDocument() {
    const keysArray = Object.keys(this.files);

    for (let index = 0; index < keysArray.length; index++) {
      const nameKey = keysArray[index];
      this.data = null;
      this.data = this.files[nameKey];
      // Sử dụng combinedData khi tạo tab
      this.tabs.push({
        name: keysArray[index],
        disabled: null,
        data: this.getFields(),
        table: this.getReversedTableData(),
      });
    }
  }

  // getTableData(): any[] {
  //   if (this.data && this.data.table) {
  //     return this.data.table;
  //   }
  //   return [];
  // }

  getReversedTableData(): any[] {
    if (this.data && this.data.table) {
      const reversedTable = [];
  
      // Lặp qua các cột
      for (let i = 0; i < this.data.table[0].values.length; i++) {
        const reversedRow = {
          values: []
        };
  
        // Lặp qua các hàng
        for (let j = 0; j < this.data.table.length; j++) {
          reversedRow.values.push(this.data.table[j].values[i]);
        }
  
        reversedTable.push(reversedRow);
      }
  
      return reversedTable;
    }
    return [];
  }

  getFields(): { label: string; value: string }[] {
    if (!this.data || !this.data) {
      return [];
    }

    const fields = [];

    for (const key in this.data) {
      if (this.data.hasOwnProperty(key) && key !== 'table') {
        const label = key;
        const value = this.data[key];
        fields.push({ label, value });
      }
    }
    return fields;
  }

  ngOnInit(): void {
    this.getDetailLC();
    // for (let i = 0; i < 30; i++) {
    //   this.tabs.push({
    //     name: `Document ${i}`,
    //     disabled: null,
    //     content: `Content of tab ${i}`,
    //   });
    // }
  }
}
