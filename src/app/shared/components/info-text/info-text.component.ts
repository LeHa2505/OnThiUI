import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-info-text',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.less']
})
export class InfoTextComponent {
  @Input('label') labelName: string;
  @Input('value') value: string;
  

}
