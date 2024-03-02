import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent {
  @Input() selectedValue: any = '';
  @Input() listOption: any = [];
  @Input() labelField: string = '';
  @Input() valueField: string = '';
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter();

  ngDoCheck(): void {
    setTimeout(() => {
      this.selectedValueChange.emit(this.selectedValue);
    }, 0);
  }
}
