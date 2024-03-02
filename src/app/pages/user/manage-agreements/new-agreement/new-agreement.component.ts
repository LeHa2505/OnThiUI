import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AgreementService } from 'src/app/service/agreement-service/agreement.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-new-agreement',
  templateUrl: './new-agreement.component.html',
  styleUrls: ['./new-agreement.component.less'],
})
export class NewAgreementComponent implements OnInit {
  validateNewAgreementForm!: UntypedFormGroup;
  newAgreement = {
    importer: String,
    exporter: String,
    issuingBank: String,
    advisingBank: String,
    commodity: String,
    price: String,
    paymentMethod: String,
    additionalInfo: String,
    deadline: null,
    requiredDocument: {
      invoice: true,
      otherDocument: '',
    },
  };
  listBank = [];
  listCustomer = [];
  currencyUnitList = ['VND', 'USD', 'EUR'];
  isLoading = false;
  checkOptionsOne = [
    { label: 'Invoice', value: 'Invoice', checked: true },
    { label: 'Other document', value: 'otherDocument' },
  ];
  otherDocument: boolean = false;
  invoice: boolean = true;
  listOtherDocument: any;

  constructor(
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private userSer: UserService,
    private agreementSer: AgreementService,
    private route: Router
  ) {}

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

  async submitForm(): Promise<void> {
    if (this.validateNewAgreementForm.valid) {
      this.isLoading = true;
      this.newAgreement.importer =
        this.validateNewAgreementForm.value.applicant;
      this.newAgreement.exporter =
        this.validateNewAgreementForm.value.beneficiary;
      this.newAgreement.issuingBank =
        this.validateNewAgreementForm.value.issuingBank;
      this.newAgreement.advisingBank =
        this.validateNewAgreementForm.value.advisingBank;
      this.newAgreement.commodity =
        this.validateNewAgreementForm.value.commodityName;
      this.newAgreement.price =
        this.validateNewAgreementForm.value.amount +
        new String(' ') +
        this.validateNewAgreementForm.value.currencyUnit;
      this.newAgreement.paymentMethod =
        this.validateNewAgreementForm.value.paymentMethod;
      this.newAgreement.deadline =
        this.validateNewAgreementForm.value.deadline.toLocaleDateString();
      this.newAgreement.additionalInfo =
        this.validateNewAgreementForm.value.additionalInformation;
      this.newAgreement.requiredDocument.invoice =
        this.validateNewAgreementForm.value.invoice;
      this.newAgreement.requiredDocument.otherDocument =
        this.validateNewAgreementForm.value.listOtherDocument;
      this.agreementSer.create(this.newAgreement).subscribe(
        (res) => {
          this.msg.success(res.message);
          this.isLoading = false;
          this.route.navigate(['/agreements', res.salescontract_id]);
        },
        (e) => {
          this.msg.error('Create salescontract unsuccessfully');
          this.isLoading = false;
        }
      );
    } else {
      Object.values(this.validateNewAgreementForm.controls).forEach(
        (control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateNewAgreementForm.get('nickname')!.clearValidators();
      this.validateNewAgreementForm.get('nickname')!.markAsPristine();
    } else {
      this.validateNewAgreementForm
        .get('nickname')!
        .setValidators(Validators.required);
      this.validateNewAgreementForm.get('nickname')!.markAsDirty();
    }
    this.validateNewAgreementForm.get('nickname')!.updateValueAndValidity();
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value ==
      this.validateNewAgreementForm.controls['issuingBank'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    const currentDate = new Date();
    this.validateNewAgreementForm = this.fb.group({
      agreementID: '#demo',
      applicant: localStorage.getItem('username'),
      applicantLegalName: '',
      beneficiary: ['', [Validators.required]],
      issuingBank: ['', [Validators.required]],
      issuingBankCode: '',
      beneficiaryLegalName: '',
      advisingBank: ['', [Validators.required, this.confirmationValidator]],
      advisingBankCode: '',
      commodityName: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      deadline: [null, [Validators.required]],
      currencyUnit: [this.currencyUnitList[0], [Validators.required]],
      amount: [Number, [Validators.required]],
      listOtherDocument: '',
      otherDocument: false,
      invoice: true,
      additionalInformation: '',
      date: [format(currentDate, 'dd-MM-yyyy')],
      required: false,
    });

    this.getListBank();
    this.getListCustomer();
  }
}
