import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Timestamp, timestamp } from 'rxjs';
import { LcService } from 'src/app/service/lc-service/lc.service';

@Component({
  selector: 'app-event-contract',
  templateUrl: './event-contract.component.html',
  styleUrls: ['./event-contract.component.less'],
})
export class EventContractComponent {
  isLoadingPage = true;
  salesContractCreatedEvents: any;
  docUploadedEvents: any;
  LcStatusChangedEvents: any;
  LcRejectedEvents: any;
  LcCreatedEvents: any;
  LcApprovedEvents: any;
  lc_id = '';

  constructor(
    private lcSer: LcService,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private el: ElementRef,
  ) {}

  getEventContract() {
    this.lc_id = this.route.snapshot.paramMap.get('id');
    this.lcSer.getContractEvent(this.lc_id).subscribe((res) => {
      this.salesContractCreatedEvents = res.salesContractCreatedEvent;
      this.docUploadedEvents = res.docUploadedEvent;
      this.LcStatusChangedEvents = res.LcStatusChangedEvent;
      this.LcRejectedEvents = res.LcRejectedEvent;
      this.LcCreatedEvents = res.LcCreatedEvent;
      this.LcApprovedEvents = res.LcApprovedEvent;
      this.isLoadingPage = false;
    }, (e) => {this.msg.error('Something is wrong!')});
  }

  parseToDate(timeStamp: any): string{
    let time = new Date(timeStamp);
    return time.toLocaleDateString();
  }

  scrollToTarget(position: String) {
    const targetElement = this.el.nativeElement.querySelector('#' + position);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    this.getEventContract();
  }
}
