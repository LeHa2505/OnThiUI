import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AgreementService } from 'src/app/service/agreement-service/agreement.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LcService } from 'src/app/service/lc-service/lc.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-detail-agreement',
  templateUrl: './detail-agreement.component.html',
  styleUrls: ['./detail-agreement.component.less'],
})
export class DetailAgreementComponent {
  requestForm = {
    status: '',
    name: '',
    agreementID: '',
    applicant: '',
    applicantLegalName: '',
    beneficiary: '',
    issuingBank: '',
    issuingBankCode: '',
    advisingBank: '',
    advisingBankCode: '',
    beneficiaryLegalName: '',
    commodityName: '',
    commodityValue: '',
    paymentMethod: '',
    additionalInformation: '',
    date: null,
    currencyUnit: '',
    requiredDocument: {
      invoice: true,
      otherDocument: '',
    },
  };
  confirmModal?: NzModalRef;
  isVisible = false;
  validateForm!: UntypedFormGroup;
  validateRefuseForm!: UntypedFormGroup;
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');
  isEdit = false;
  updateAgreement = {
    importer: String,
    exporter: String,
    issuingBank: String,
    advisingBank: String,
    commodity: String,
    price: Number,
    paymentMethod: String,
    additionalInfo: String,
    deadline: null,
    requiredDocument: {
      invoice: true,
      otherDocument: '',
    },
  };
  isAccepted: boolean;
  salescontract_id: string;
  listBank = [];
  listCustomer = [];

  reqCreateLC = {
    salesContractID: '',
  };

  isLoading = false;
  currencyUnitList = ['VND', 'USD', 'EUR'];
  isLoadingPage = true;

  constructor(
    private modal: NzModalService,
    private fb: UntypedFormBuilder,
    private agreementSer: AgreementService,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private lcSer: LcService,
    private userSer: UserService
  ) {
    const currentDate = new Date();
    this.validateForm = this.fb.group({
      agreementID: '#demo',
      applicant: this.username,
      applicantLegalName: String,
      beneficiary: [String, [Validators.required]],
      issuingBank: [String, [Validators.required]],
      issuingBankCode: String,
      beneficiaryLegalName: String,
      advisingBank: ['', [Validators.required, this.confirmationValidator]],
      advisingBankCode: String,
      commodityName: [String, [Validators.required]],
      commodityValue: [Number, [Validators.required]],
      paymentMethod: [String, [Validators.required]],
      deadline: [null, [Validators.required]],
      currencyUnit: [String, [Validators.required]],
      additionalInformation: String,
      listOtherDocument: '',
      otherDocument: false,
      invoice: true,
      // date: [format(currentDate, 'dd-MM-yyyy')],
    });

    this.validateRefuseForm = this.fb.group({
      reason: ['', [Validators.required]],
    });
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value == this.validateForm.controls['issuingBank'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getListBank() {
    this.userSer.listBank().subscribe((res) => {
      this.listBank = res;
    });
  }

  getListCustomer() {
    this.userSer.listCustomer().subscribe((res) => {
      let index = res.indexOf(localStorage.getItem('username'));
      res.splice(index, 1);
      this.listCustomer = res;
    });
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to accept this agreement?',
      nzCancelText: 'Cancel',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.agreementSer.approve(this.salescontract_id).subscribe(
            (res) => {
              this.msg.success(res.message);
              this.isAccepted = true;
              this.getDetail();
              reject("Oops, there's a result!");
            },
            (e) => {
              this.msg.error('Approve unsuccessfully!');
            }
          );
        }).catch((error) => console.log(error)),
    });
  }

  showConfirmRequestLC(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to request LC to Issuing Bank?',
      nzCancelText: 'Cancel',
      nzOnOk: () => {},
    });
  }

  showConfirmAcceptLC(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to create LC?',
      nzCancelText: 'Cancel',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.reqCreateLC.salesContractID = this.salescontract_id;
          this.lcSer.create(this.reqCreateLC).subscribe(
            (res) => {
              this.msg.success(res.message);
              this.getDetail();
              reject("Oops, there's a result!");
            },
            (e) => this.msg.error('Create unsuccessfully!')
          );
        }).catch((error) => console.log(error)),
    });
  }

  showModalRefuse(): void {
    this.isVisible = true;
  }

  handleOkRefuse(): void {
    if (this.validateRefuseForm.valid) {
      this.isVisible = false;
      
    } else {
      Object.values(this.validateRefuseForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancelRefuse(): void {
    this.isVisible = false;
  }

  getDetail() {
    this.salescontract_id = this.route.snapshot.paramMap.get('id');
    this.agreementSer.detail(this.salescontract_id).subscribe(
      (res) => {
        this.validateForm.value.advisingBank = this.requestForm.advisingBank =
          res.advisingBank;
        this.requestForm.date = new Date(res.deadlineInDate);
        this.requestForm.applicant = res.importer;
        this.validateForm.value.beneficiary = this.requestForm.beneficiary =
          res.exporter;
        this.validateForm.value.commodityValue = res.price;
        this.requestForm.commodityValue = res.price.split(' ')[0];
        this.requestForm.currencyUnit = res.price.split(' ')[1];
        this.validateForm.value.commodity = this.requestForm.commodityName =
          res.commodity;
        this.validateForm.value.issuingBank = this.requestForm.issuingBank =
          res.issuingBank;
        this.validateForm.value.paymentMethod = this.requestForm.paymentMethod =
          res.paymentMethod;
        this.validateForm.value.additionalInformation =
          this.requestForm.additionalInformation = res.additionalInfo;
        this.requestForm.status = res.status;
        this.requestForm.requiredDocument.invoice =
          res.requiredDocument?.invoice;
        this.requestForm.requiredDocument.otherDocument = res.requiredDocument.otherDocument;
        this.isLoadingPage = false;
        if (res.status == 'created') {
          this.isAccepted = false;
        } else this.isAccepted = true;
      },
      (e) => this.msg.error('Something is wrong!')
    );
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  updateForm() {
    this.isEdit = true;
  }

  saveForm() {
    if (this.validateForm.valid) {
      this.updateAgreement.importer = this.validateForm.value.applicant;
      this.updateAgreement.exporter = this.validateForm.value.beneficiary;
      this.updateAgreement.issuingBank = this.validateForm.value.issuingBank;
      this.updateAgreement.advisingBank = this.validateForm.value.advisingBank;
      this.updateAgreement.commodity = this.validateForm.value.commodityName;
      this.updateAgreement.price =
        this.validateForm.value.commodityValue +
        new String(' ') +
        this.validateForm.value.currencyUnit;
      this.updateAgreement.paymentMethod =
        this.validateForm.value.paymentMethod;
      this.updateAgreement.deadline = this.validateForm.value.deadline;
      this.updateAgreement.additionalInfo =
        this.validateForm.value.additionalInformation;
      this.updateAgreement.requiredDocument.invoice =
        this.validateForm.value.invoice;
      this.updateAgreement.requiredDocument.otherDocument =
        this.validateForm.value.listOtherDocument;
      this.isEdit = false;
      this.agreementSer
        .update(this.updateAgreement, this.salescontract_id)
        .subscribe(
          (res) => {
            this.msg.success(res.message);
            this.getDetail();
          },
          (e) => {
            this.msg.error('Edit unsuccessfully!');
            this.getDetail();
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.getDetail();
    this.getListBank();
    this.getListCustomer();
  }
}
