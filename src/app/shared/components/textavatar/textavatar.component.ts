import { Component } from '@angular/core';
const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'app-textavatar',
  templateUrl: './textavatar.component.html',
  styleUrls: ['./textavatar.component.css'],
})
export class TextavatarComponent {
  text: string = userList[3];
  color: string = colorList[3];
  gap = 4;
  change(): void {
    let idx = userList.indexOf(this.text);
    ++idx;
    if (idx === userList.length) {
      idx = 0;
    }
    this.text = userList[idx];
    this.color = colorList[idx];
  }
}
