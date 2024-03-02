import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AgreementService } from 'src/app/service/agreement-service/agreement.service';
import { LcService } from 'src/app/service/lc-service/lc.service';

@Component({
  selector: 'app-list-agreement',
  templateUrl: './list-agreement.component.html',
  styleUrls: ['./list-agreement.component.less'],
})
export class ListAgreementComponent implements OnInit {
  listOfData = [];
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');
  reqCreateLC = {
    salesContractID: '',
  };
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private agreementSer: AgreementService,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {}

  detail(id: number) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
    });
  }

  getList() {
    this.agreementSer.list().subscribe((res) => {
      this.listOfData = res;
      this.isLoading = false;
    });
  }

  deleteAgreement(id: String) {
    let deleteItem = this.listOfData.find(i => i.salescontract_id === id);
    this.agreementSer.delete(id).subscribe(
      (res) => {
        this.msg.success(res.message);
        this.listOfData = this.listOfData.filter(data => {return data !== deleteItem})
        // this.getList();
      },
      (e) => this.msg.error('Something is wrong!')
    );
  }

  showDeleteConfirm(id: String): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this agreement?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAgreement(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getList();
  }
}
