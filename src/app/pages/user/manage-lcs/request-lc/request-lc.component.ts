import { Component, ElementRef } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { AgreementService } from 'src/app/service/agreement-service/agreement.service';
import { LcService } from 'src/app/service/lc-service/lc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-lc',
  templateUrl: './request-lc.component.html',
  styleUrls: ['./request-lc.component.less'],
})
export class RequestLCComponent {
  validateRequestLCForm!: UntypedFormGroup;
  bankList = ['Any Bank', 'ABC Bank', 'ADE Bank'];
  availableByList = [
    { label: 'Payment at sight', value: 'Payment at sight', checked: true },
    { label: 'Deferred payment', value: 'Deferred payment' },
    { label: 'Acceptance', value: 'Acceptance' },
    { label: 'Negotiation', value: 'Negotiation' },
  ];
  formOfDocumentCreditList = [
    'IRREVOCABLE',
    'REVOCABLE',
    'CONFIRM',
    'UNCONFIRM',
    'TRANSFERABLE',
    'BACK TO BACK',
  ];
  applicableRules = ['eUCP', 'UCP'];
  currencyUnitList = ['VND', 'USD'];
  isEnglish = false;
  shipmentTranshipment = ['Allowed', 'Not allowed'];
  shipmentDateChoice = ['Latest date of shipment', 'Shipment period'];
  typeDocuments = ['Transport Document'];
  salescontract_id: string;

  constructor(
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private el: ElementRef,
    private route: ActivatedRoute,
    private agreementSer: AgreementService,
    private lcSer: LcService
  ) {}

  getContractDetail() {
    this.salescontract_id = this.route.snapshot.paramMap.get('id');
    this.agreementSer.detail(this.salescontract_id).subscribe((res) => {
      
    })
  }

  scrollToTarget(position: String) {    
    const targetElement =
      this.el.nativeElement.querySelector('#' + position);
    if (targetElement) {      
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  submitForm(): void {
    if (this.validateRequestLCForm.valid) {
    } else {
      Object.values(this.validateRequestLCForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateRequestLCForm.get('nickname')!.clearValidators();
      this.validateRequestLCForm.get('nickname')!.markAsPristine();
    } else {
      this.validateRequestLCForm
        .get('nickname')!
        .setValidators(Validators.required);
      this.validateRequestLCForm.get('nickname')!.markAsDirty();
    }
    this.validateRequestLCForm.get('nickname')!.updateValueAndValidity();
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

  ngOnInit(): void {
    const currentDate = new Date();
    this.validateRequestLCForm = this.fb.group({
      applicant: 'Demo Corporation',
      applicantLegalName: 'Demo Corporation',
      applicantLEICode: 'LEI--Demo Corp',
      applicantCode: 'SWIFT--Demo Corp',
      applicantAddress: 'Vietnam',

      beneficiary: ['Beneficiary', [Validators.required]],
      beneficiaryLegalName: 'Beneficiary Corp',
      beneficiaryLEICode: 'LEI--Beneficiary Corp',
      beneficiaryCode: 'SWIFT--Beneficiary Corp',
      beneficiaryAddress: 'Beneficiary address',

      issuingBank: ['Issuing bank', [Validators.required]],
      issuingBankLegalName: ['Issuing bank', [Validators.required]],
      issuingBankLEICode: 'LEI--Issuing Bank Corp',
      issuingBankCode: 'BIC--Issuing Bank Corp',
      issuingBankBranch: 'Issuing Bank Branch',
      allowChange: false,

      advisingBank: ['Advising bank', [Validators.required]],
      advisingBankLegalName: ['Advising bank', [Validators.required]],
      advisingBankLEICode: 'LEI--Advising Corp',
      advisingBankCode: 'BIC--Advising Bank Corp',
      advisingBankAddress: 'Advising Bank address',

      creditAvaiIableBanks: [this.bankList[0]],
      availableByList: [this.availableByList, [Validators.required]],
      paymentConditions: '',

      date: format(currentDate, 'dd-MM-yyyy'),
      formOfDocument: [this.formOfDocumentCreditList[0], [Validators.required]],
      applicableRules: [this.applicableRules[0], [Validators.required]],
      currencyUnit: [this.currencyUnitList[0], [Validators.required]],
      amount: [Number, [Validators.required]],
      tolerancePLus: Number,
      toleranceMinus: Number,
      additionalAmount: Number,
      expiredDate: [null, [Validators.required]],

      partialShipment: String,
      transhipment: String,
      shipmentDate: [String, [Validators.required]],
      description: ['', [Validators.required]],

      commodityName: [String, [Validators.required]],
      commodityValue: [Number, [Validators.required]],
      paymentMethod: ['Digital money', [Validators.required]],
      additionalInformation: null,
      nickname: null,
      required: false,
    });

  }
}
